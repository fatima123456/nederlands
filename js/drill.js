// Hands-free drill engine, shared by every practice surface.
//
// WHAT THIS OWNS (the hard part, and the reason it exists as one file):
//   * round structure — the flag-and-redrill loop. A flagged card stays on screen
//     and finishes its turn, then leads the next round; unflagged cards drop out.
//     Repeat until a clean round, then either stop or replay the whole pool.
//   * timing — think pause, repeat pause, and a watchdog in case speech never ends
//   * speech (Flemish voice preferred) and the beep cue on each new prompt
//   * pause / resume, on whichever side of the card you paused
//   * real fullscreen, and treating "left fullscreen" as "close"
//   * progress bar, position counter, mistake-button state
//
// WHAT THIS DOES NOT OWN: what a card looks like. The engine never inspects an
// item. Callers pass renderFront / renderBack / speakText, so a word deck can
// draw one huge Dutch word while a grammar deck draws a sentence plus its rule.
// That is the seam: control flow here, pixels in the caller.
//
// Classic script on purpose (no ES module): these pages open by double-click
// over file://, where module loading is blocked by CORS.
window.Drill = (function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function shuffle(a) {
    a = a.slice();
    for (var k = a.length - 1; k > 0; k--) {
      var j = Math.floor(Math.random() * (k + 1));
      var t = a[k]; a[k] = a[j]; a[j] = t;
    }
    return a;
  }

  // Size `el` to fill `container` without clipping. Start from a cap bounded by
  // viewport height AND width, then, if the text overflows, scale down by the
  // ratio (text width is ~linear in font-size, so one pass fits). A floor keeps
  // long text legible. nowrap suits a single word; sentences want wrapping, in
  // which case we bound by height instead of width.
  function fitText(el, container, capFrac, opts) {
    if (!el) return;
    opts = opts || {};
    var nowrap = opts.nowrap !== false;
    var frac = capFrac || 0.42;
    var startPx = Math.min(window.innerHeight * frac, window.innerWidth * frac * 2.2);
    startPx = Math.max(startPx, 28);
    el.style.fontSize = startPx + "px";
    el.style.whiteSpace = nowrap ? "nowrap" : "normal";
    var availW = (container && container.clientWidth) || window.innerWidth;
    if (nowrap) {
      var actual = el.scrollWidth;
      if (actual > availW && actual > 0) {
        el.style.fontSize = Math.max(startPx * (availW / actual), 20) + "px";
      }
      return;
    }
    // Wrapping text. The height budget alone is not enough: it says nothing
    // about a single token that is wider than the column, and .test-text sets
    // overflow-wrap: break-word, so the browser "fixes" that by chopping the
    // word mid-letter. On a 375px phone that turns a gloss like
    // "belly / stomach" into "stomac" + "h", which is unreadable.
    //
    // So bound by width FIRST, with break-word suspended: an over-long token
    // then genuinely overflows, which makes it measurable, and the same ratio
    // trick as the nowrap branch scales it down until it fits. break-word is
    // restored afterwards as the last resort below the 20px floor.
    // Iterated, not the single pass the nowrap branch uses: text width is only
    // roughly linear in font-size, so one ratio step lands a few percent over
    // on a long compound. The 0.98 nudge stops it converging from above
    // forever, and the guard keeps a pathological case bounded.
    var px = startPx, guard = 0;
    el.style.overflowWrap = "normal";
    var wide = el.scrollWidth;
    while (wide > availW && wide > 0 && px > 20 && guard++ < 12) {
      px = Math.max(px * (availW / wide) * 0.98, 20);
      el.style.fontSize = px + "px";
      wide = el.scrollWidth;
    }
    guard = 0;
    var maxH = window.innerHeight * (opts.maxHeightFrac || 0.45);
    while (el.scrollHeight > maxH && px > 20 && guard++ < 24) {
      px = px * 0.9;
      el.style.fontSize = px + "px";
    }
    el.style.overflowWrap = "";
  }

  function speak(text) {
    if (!text || !window.speechSynthesis) return null;
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "nl-BE";
    u.rate = 0.8;
    var voices = speechSynthesis.getVoices();
    // Prefer a Flemish (Belgian) voice; fall back to any Dutch voice.
    var v = voices.find(function (x) {
      return x.lang && x.lang.toLowerCase().indexOf("nl-be") === 0;
    }) || voices.find(function (x) {
      return x.lang && x.lang.toLowerCase().indexOf("nl") === 0;
    });
    if (v) u.voice = v;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    return u;
  }

  var pingCtx = null;
  // Null rather than a throw when the browser has no Web Audio: callers either
  // sit inside ping()'s try/catch or hand the result to unlockAudio, which
  // treats a missing context as nothing to unlock.
  function audioCtx() {
    try {
      if (!pingCtx) pingCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {}
    return pingCtx;
  }

  // iOS Safari refuses to speak unless the page has already spoken once from
  // inside a real user gesture, and it hands out every AudioContext suspended
  // for the same reason. Neither applies on the desktop, which is why the drill
  // works on the Mac and would be silent on the phone: speak() is first called
  // from a timer in showBack(), and by then the gesture is long gone.
  //
  // Both unlocks are one-shot per page load, so this runs from the tempo
  // button's click handler — the first tap of any drill — and then gets out of
  // the way. Dependencies come in as arguments rather than being read off the
  // globals so it can be exercised without a browser (js/drill.test.js).
  var unlocked = false;
  function unlockAudio(synth, ctx) {
    if (unlocked) return false;
    unlocked = true;
    try {
      if (synth) {
        // A blank, silent utterance IS the unlock: nothing is heard, but speech
        // has started from within the gesture, which is all Safari asks for.
        // Cancelling first clears anything a previous run left queued, which
        // Safari otherwise keeps paused indefinitely.
        synth.cancel();
        var u = new SpeechSynthesisUtterance(" ");
        u.volume = 0;
        synth.speak(u);
      }
    } catch (e) {}
    try {
      if (ctx && ctx.state === "suspended") ctx.resume();
    } catch (e) {}
    return true;
  }

  // A hands-free drill sits untouched with the phone face-up, so the screen
  // sleeps after half a minute and takes the audio with it. iOS also drops the
  // lock whenever the tab is hidden and does not hand it back, hence the
  // re-request on visibilitychange. Every call is guarded: failing to hold the
  // lock must degrade to "the screen dims", never to "the drill breaks".
  var wakeLock = null, wakeWanted = false;
  function holdWake() {
    wakeWanted = true;
    try {
      if (!navigator.wakeLock || wakeLock) return;
      navigator.wakeLock.request("screen").then(function (l) {
        wakeLock = l;
        l.addEventListener("release", function () { wakeLock = null; });
      }, function () {});
    } catch (e) {}
  }
  function releaseWake() {
    wakeWanted = false;
    try { if (wakeLock) wakeLock.release(); } catch (e) {}
    wakeLock = null;
  }
  document.addEventListener("visibilitychange", function () {
    if (wakeWanted && !document.hidden) holdWake();
  });

  function ping() {
    try {
      var ac = audioCtx();
      if (ac.state === "suspended") ac.resume();
      var t = ac.currentTime;
      var osc = ac.createOscillator();
      var gain = ac.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, t);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.3, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      osc.connect(gain).connect(ac.destination);
      osc.start(t); osc.stop(t + 0.26);
    } catch (e) {}
  }

  // Enter/exit the browser's true fullscreen (Safari needs the webkit prefix).
  // Wrapped in try/catch: if denied, the overlay still covers the viewport via
  // its fixed-position CSS, so practice degrades rather than breaking.
  function enterFs(el) {
    try {
      var req = el.requestFullscreen || el.webkitRequestFullscreen;
      if (req && !document.fullscreenElement && !document.webkitFullscreenElement) {
        var r = req.call(el);
        if (r && r.catch) r.catch(function () {});
      }
    } catch (e) {}
  }
  function exitFs() {
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        var ex = document.exitFullscreen || document.webkitExitFullscreen;
        if (ex) {
          var r = ex.call(document);
          if (r && r.catch) r.catch(function () {});
        }
      }
    } catch (e) {}
  }

  /**
   * cfg:
   *   nodes: {modal,title,setup,play,label,text,sub,count,bar,done,toggleBtn,mistakeBtn}
   *   tempos: [[label, pace]...]  pace === null means self-paced (tap to advance)
   *   renderFront(item, ctx) / renderBack(item, ctx)
   *      ctx = {text, sub, label, container, flagged, fitText, esc}
   *      Each sets its own innerHTML and does its own text fitting.
   *   speakText(item) -> string spoken when the back is shown
   *   thinkMs(item, pace) / repeatMs(item, pace)
   *   promptLabel / repeatLabel: the small line above the card
   *   onRoundEnd(missedThisRound)  -> called each time a round completes
   *   onFinish(missedThisRound)    -> called instead when a clean round ends AND
   *                                   terminateOnCleanRound is true
   *   onClose()                    -> teardown hook for the caller
   */
  function create(cfg) {
    var n = cfg.nodes;
    var pool = [], queue = [], pos = 0, pace = 1;
    var phase = "front", playing = false, timer = null;
    var mistakes = new Set();
    var terminate = false;
    // Effective callbacks for the run in progress. start() may override any of
    // them, so ONE instance can drive several kinds of deck (words, grammar,
    // mixed review) over the same overlay. Creating a second instance on the
    // same nodes would double-bind the buttons, so don't.
    var run = cfg;

    function manual() { return pace === null; }

    function progress() {
      var len = queue.length || 1;
      n.bar.style.width = ((pos + 1) / len) * 100 + "%";
      var label = pos + 1 + " / " + queue.length;
      var marked = mistakes.size;
      n.count.textContent = marked
        ? label + " · " + marked + " gemarkeerd om te herhalen"
        : label;
      var c = queue[pos];
      if (c) {
        var on = mistakes.has(c);
        n.mistakeBtn.textContent = on ? "Gemarkeerd" : "Markeer fout";
        n.mistakeBtn.classList.toggle("marked", on);
      }
    }

    function ctx(item) {
      return {
        text: n.text, sub: n.sub, label: n.label, container: n.text,
        flagged: mistakes.has(item), fitText: fitText, esc: esc,
      };
    }

    // phase 1: prompt on screen, silence while you attempt the answer aloud
    function showFront() {
      var c = queue[pos];
      if (!c) return;
      phase = "front";
      run.renderFront(c, ctx(c));
      n.label.textContent = (run.promptLabel || "Zeg het in het Nederlands…") +
        (manual() ? " (tik)" : "");
      progress();
      if (playing) ping();
      if (!playing || manual()) return;
      clearTimeout(timer);
      timer = setTimeout(showBack, run.thinkMs(c, pace));
    }

    // phase 2: flip to the answer, speak it, pause to repeat aloud, advance
    function showBack() {
      var c = queue[pos];
      if (!c) return;
      phase = "back";
      run.renderBack(c, ctx(c));
      n.label.textContent = (run.repeatLabel || "Herhaal nu…") +
        (manual() ? " (tik)" : "");
      clearTimeout(timer);
      var wait = manual() ? 0 : run.repeatMs(c, pace);
      var u = playing && window.speechSynthesis ? speak(run.speakText(c)) : null;
      if (manual()) return; // self-paced: a tap advances
      if (!u) { timer = setTimeout(advance, wait); return; }
      u.onend = function () {
        if (!playing) return;
        clearTimeout(timer);
        timer = setTimeout(advance, wait);
      };
      timer = setTimeout(advance, wait + 6000); // watchdog if onend never fires
    }

    function advance() {
      clearTimeout(timer);
      pos++;
      if (pos >= queue.length) {
        // round over: the next one replays only the cards still marked wrong
        var miss = pool.filter(function (c) { return mistakes.has(c); });
        if (run.onRoundEnd) run.onRoundEnd(miss);
        if (terminate && !miss.length) {
          stopClocks();
          if (run.onFinish) run.onFinish(miss);
          return;
        }
        pos = 0;
        mistakes = new Set();
        queue = shuffle(miss.length ? miss : pool);
      }
      showFront();
    }

    function toggle() {
      if (manual()) { // self-paced: tapping moves forward instead of pausing
        if (phase === "front") showBack(); else advance();
        return;
      }
      if (playing) {
        playing = false;
        clearTimeout(timer);
        if (window.speechSynthesis) speechSynthesis.cancel();
        n.toggleBtn.textContent = "Verder";
        n.label.textContent = "Gepauzeerd";
      } else {
        playing = true;
        n.toggleBtn.textContent = "Pauze";
        if (phase === "back") showBack(); else showFront();
      }
    }

    // flag (or unflag) the current card. It stays on screen and finishes its turn,
    // so you still see and hear the answer, then leads the next round. Re-renders
    // the back so a flagged card can show more (e.g. promote its rule).
    function mark() {
      var c = queue[pos];
      if (!c) return;
      if (mistakes.has(c)) mistakes.delete(c); else mistakes.add(c);
      progress();
      if (phase === "back") run.renderBack(c, ctx(c));
    }

    function stopClocks() {
      playing = false;
      clearTimeout(timer);
      if (window.speechSynthesis) speechSynthesis.cancel();
    }

    function begin() {
      mistakes = new Set();
      queue = shuffle(pool);
      pos = 0;
      n.setup.style.display = "none";
      n.play.classList.add("show");
      n.toggleBtn.style.display = manual() ? "none" : "";
      playing = true;
      holdWake();
      showFront();
    }

    // Open on the tempo picker. Must be called from inside a click handler for
    // the fullscreen request to be granted.
    function start(items, titleText, opts) {
      opts = opts || {};
      // per-run overrides: renderers, timings, labels, tempos, callbacks
      run = Object.assign({}, cfg, opts);
      pool = items.slice();
      terminate = !!opts.terminateOnCleanRound;
      mistakes = new Set();
      n.title.textContent = titleText;
      n.setup.innerHTML = "";
      (run.tempos || [["Normaal tempo", 1], ["Meer denktijd", 1.7]]).forEach(function (opt) {
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = opt[0];
        // The only guaranteed user gesture in a whole run: everything after
        // this is on a timer. So the audio unlock has to happen here.
        b.addEventListener("click", function () {
          unlockAudio(window.speechSynthesis, audioCtx());
          pace = opt[1];
          begin();
        });
        n.setup.appendChild(b);
      });
      n.setup.style.display = "flex";
      n.play.classList.remove("show");
      if (n.done) n.done.classList.remove("show");
      n.modal.classList.add("open");
      enterFs(n.modal);
    }

    function close() {
      stopClocks();
      releaseWake();
      n.modal.classList.remove("open");
      n.play.classList.remove("show");
      if (n.done) n.done.classList.remove("show");
      exitFs();
      if (run.onClose) run.onClose();
    }

    // Re-run the current renderer so text refits after a resize / rotate.
    function refit() {
      if (!n.modal.classList.contains("open")) return;
      var c = queue[pos];
      if (!c || !n.play.classList.contains("show")) return;
      if (phase === "back") run.renderBack(c, ctx(c)); else run.renderFront(c, ctx(c));
    }

    n.toggleBtn.addEventListener("click", toggle);
    n.mistakeBtn.addEventListener("click", mark);
    n.play.addEventListener("click", function (e) {
      if (!e.target.closest("button")) toggle();
    });
    window.addEventListener("resize", refit);
    window.addEventListener("orientationchange", refit);
    // Leaving fullscreen (e.g. Esc) mid-drill ends the session. The .open guard
    // makes close()'s own exitFs() a no-op here, so there is no loop.
    function onFsChange() {
      var fs = document.fullscreenElement || document.webkitFullscreenElement;
      if (!fs && n.modal.classList.contains("open")) close();
    }
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);

    return {
      start: start,
      close: close,
      stopClocks: stopClocks,
      // live marks for the round in progress (a caller persisting mid-session
      // state needs these; onRoundEnd only fires at round boundaries)
      liveMistakes: function () { return Array.from(mistakes); },
      showDone: function () {
        n.play.classList.remove("show");
        n.setup.style.display = "none";
        if (n.done) n.done.classList.add("show");
      },
    };
  }

  return {
    create: create, fitText: fitText, speak: speak, shuffle: shuffle, esc: esc,
    unlockAudio: unlockAudio, // exported for js/drill.test.js
  };
})();
