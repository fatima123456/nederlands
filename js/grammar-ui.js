// Grammar drill UI, shared by index.html and every grammar-<slug>.html page.
//
// js/drill.js owns the loop (rounds, tempo, speech, flag-and-redrill). This file
// owns everything grammar-specific that both surfaces need identically:
//   * how a card is drawn, including the rule line under the answer
//   * the rules reference view (rule -> sub-rules -> examples)
//   * the level + direction picker
//   * per-case miss counts in localStorage
//
// It also injects the drill overlay and picker markup when the host page lacks
// them, so a lesson page needs no copy of that HTML. (The CSS *is* duplicated between index.html
// and the lesson template, matching how practice-template.html already works.)
//
// Classic script, no ES module: these pages open by double-click over file://.
window.GrammarUI = (function () {
  "use strict";

  var G = null;             // the GRAMMAR bundle from data/grammar.js
  var GKEY = "nl-grammar";  // per-case miss counts
  var MKEY = "nl-grammar-marks"; // "0" = annotation switched off by the user

  var OPS = {
    produce: "zeg het in het Nederlands",
    errorfix: "verbeter de fout",
    choice: "kies de juiste vorm",
    cloze: "vul in",
  };

  function el(id) { return document.getElementById(id); }
  function esc(s) { return Drill.esc(s); }

  // ---- markup ------------------------------------------------------------
  // index.html already carries the drill overlay (it is shared with the word
  // test) and the popups. A lesson page carries none of it, so inject what is
  // missing rather than duplicating the HTML in the template.
  var OVERLAY_HTML =
    '<div class="test-modal" id="test-modal">' +
      '<button class="test-exit" id="test-exit" type="button">Sluiten</button>' +
      '<div class="test-title" id="test-title"></div>' +
      '<div class="test-setup" id="test-setup"></div>' +
      '<div class="test-play" id="test-play">' +
        '<div class="test-label" id="test-label"></div>' +
        '<div class="test-text" id="test-text"></div>' +
        '<div class="test-sub" id="test-sub"></div>' +
        '<div class="test-controls">' +
          '<button class="test-ctrl mistake" id="test-mistake" type="button">Markeer fout</button>' +
          '<button class="test-ctrl" id="test-toggle" type="button">Pauze</button>' +
          '<span class="test-count" id="test-count"></span>' +
        "</div>" +
        '<div class="test-progress"><span id="test-bar"></span></div>' +
      "</div>" +
    "</div>";

  var PICKER_HTML =
    '<div class="rev-modal" id="set-modal">' +
      '<div class="rev-modal-box">' +
        '<div class="rev-modal-head">' +
          '<span id="set-modal-title">Kies</span>' +
          '<button id="set-modal-close" type="button">Sluiten</button>' +
        "</div>" +
        '<div class="rev-modal-list" id="set-modal-list"></div>' +
      "</div>" +
    "</div>";

  function inject(html) {
    var d = document.createElement("div");
    d.innerHTML = html;
    document.body.appendChild(d.firstChild);
  }

  function ensureMarkup() {
    if (!el("test-modal")) inject(OVERLAY_HTML);
    if (!el("set-modal")) inject(PICKER_HTML);
    // wire the closers once, for whichever popups we own
    var sm = el("set-modal");
    if (sm && !sm.dataset.wired) {
      sm.dataset.wired = "1";
      el("set-modal-close").addEventListener("click", function () { sm.classList.remove("open"); });
      sm.addEventListener("click", function (e) { if (e.target === sm) sm.classList.remove("open"); });
    }
  }

  // ---- annotation on/off -------------------------------------------------
  // Marks and the tang bracket are ON by default: the examples are a reference
  // you scan, and an unannotated one makes you do the work the page exists to
  // do for you. Switching them off is one class on <body>, so the DOM is built
  // once and the plain sentence is always a click away.
  function marksOn() {
    try { return localStorage.getItem(MKEY) !== "0"; } catch (e) { return true; }
  }
  function applyMarks(on) {
    document.body.classList.toggle("no-marks", !on);
    try { localStorage.setItem(MKEY, on ? "1" : "0"); } catch (e) {}
  }

  // ---- data --------------------------------------------------------------
  function init(bundle) {
    G = bundle;
    // Cards travel between lessons (mixed review), so stamp each with its slug
    // once here instead of threading it through every call.
    Object.keys(G.lessons || {}).forEach(function (slug) {
      G.lessons[slug].cards.forEach(function (c) { c._slug = slug; });
    });
    ensureMarkup();
    document.body.classList.toggle("no-marks", !marksOn());
    return G;
  }

  function caseOf(L, id) {
    for (var i = 0; i < L.cases.length; i++) if (L.cases[i].id === id) return L.cases[i];
    return null;
  }

  function missCounts() {
    try { return (JSON.parse(localStorage.getItem(GKEY)) || {}).caseMisses || {}; }
    catch (e) { return {}; }
  }

  function recordMisses(cards) {
    if (!cards || !cards.length) return;
    var st;
    try { st = JSON.parse(localStorage.getItem(GKEY)) || {}; } catch (e) { st = {}; }
    st.caseMisses = st.caseMisses || {};
    cards.forEach(function (c) {
      var k = c._slug + ":" + c.case;
      st.caseMisses[k] = (st.caseMisses[k] || 0) + 1;
    });
    try { localStorage.setItem(GKEY, JSON.stringify(st)); } catch (e) {}
  }

  // ---- rules review -----------------------------------------------------
  // The reference view: each RULE is a heading with its intro, and under it its
  // SUB-RULES, numbered, each with a short Dutch title, the one-line note used
  // as drill feedback, and 2-3 examples of the same pattern. One translation
  // toggle per sub-rule rather than per example, so reading stays cheap.
  // The legend is not decoration: five marks is more than a reader will infer,
  // and without it the boxes are noise. It doubles as the on/off switch.
  var LEGEND = [
    ["1", "tk-first", "eerste deel"],
    ["2", "tk-verb", "werkwoord"],
    ["", "tk-end", "eindgroep"],
    ["", "tk-conj", "voegwoord"],
    ["", "tk-pp", "voorzetselgroep"],
    ["", "tk-sep", "scheidbaar deel"],
    ["", "tk-te", "te"],
  ];

  function buildLegend() {
    var bar = document.createElement("div");
    bar.className = "marks-bar";
    var items = document.createElement("div");
    items.className = "marks-legend";
    LEGEND.forEach(function (l) {
      var chip = document.createElement("span");
      chip.className = "tk " + l[1];
      chip.textContent = l[2];
      if (l[0]) chip.setAttribute("data-slot", l[0]);
      items.appendChild(chip);
    });
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "marks-toggle";
    function label() { btn.textContent = marksOn() ? "markeringen uit" : "markeringen aan"; }
    label();
    btn.addEventListener("click", function () {
      applyMarks(!marksOn());
      label();
    });
    bar.appendChild(items);
    bar.appendChild(btn);
    return bar;
  }

  function renderRules(container, L, opts) {
    opts = opts || {};
    var misses = opts.showMisses ? missCounts() : null;
    container.innerHTML = "";
    container.appendChild(buildLegend());
    L.rules.forEach(function (rule) {
      var head = document.createElement("div");
      head.className = "rules-group";
      head.textContent = rule.title;
      container.appendChild(head);
      var intro = document.createElement("p");
      intro.className = "rules-intro";
      intro.textContent = rule.intro;
      container.appendChild(intro);

      L.cases.filter(function (c) { return c.rule === rule.id; }).forEach(function (cs, n) {
        var block = document.createElement("div");
        block.className = "subrule";

        var top = document.createElement("div");
        top.className = "subrule-head";
        var name = document.createElement("span");
        name.className = "subrule-title";
        name.textContent = n + 1 + ". " + cs.title;
        if (cs.drill === false) {
          var tag = document.createElement("span");
          tag.className = "subrule-tag";
          tag.textContent = "alleen om te weten";
          name.appendChild(tag);
        }
        var missed = misses ? misses[L._slug + ":" + cs.id] : 0;
        if (missed) {
          var badge = document.createElement("span");
          badge.className = "subrule-miss";
          badge.textContent = missed + "x fout";
          name.appendChild(badge);
        }
        var tgl = document.createElement("button");
        tgl.className = "rev-tr-toggle";
        tgl.type = "button";
        tgl.textContent = "vertaling";
        top.appendChild(name);
        top.appendChild(tgl);
        block.appendChild(top);

        var note = document.createElement("p");
        note.className = "subrule-note";
        note.textContent = cs.note;
        block.appendChild(note);

        // `points` unpacks a case that one line cannot carry. It renders HERE
        // only: the drill shows `note` alone, because feedback under an answer
        // has to be readable in the second it is on screen.
        if (cs.points && cs.points.length) {
          var ul = document.createElement("ul");
          ul.className = "subrule-points";
          cs.points.forEach(function (pt) {
            var li = document.createElement("li");
            li.textContent = pt;
            ul.appendChild(li);
          });
          block.appendChild(ul);
        }

        var ens = [];
        // a contrast sub-rule shows both forms on adjacent lines, labelled, so
        // the difference is on screen instead of left to the reader to infer
        if (cs.compare) {
          var cmp = document.createElement("div");
          cmp.className = "compare";
          // The PAIR is the unit of meaning here, so it is a real element: the
          // two forms and their shared translation live in one box, and the
          // separator between boxes says which line belongs with which.
          cs.compare.pairs.forEach(function (pr) {
            var group = document.createElement("div");
            group.className = "compare-pair";
            [[cs.compare.labelA, pr[0]], [cs.compare.labelB, pr[1]]].forEach(function (side) {
              var line = document.createElement("div");
              line.className = "compare-line";
              var lab = document.createElement("span");
              lab.className = "compare-label";
              lab.textContent = side[0];
              var txt = document.createElement("span");
              Annotate.into(txt, side[1], { diagram: true });
              line.appendChild(lab);
              line.appendChild(txt);
              group.appendChild(line);
            });
            var en = document.createElement("div");
            en.className = "example-en compare-en";
            en.textContent = pr[2];
            en.hidden = true;
            ens.push(en);
            group.appendChild(en);
            cmp.appendChild(group);
          });
          block.appendChild(cmp);
        }
        (cs.examples || []).forEach(function (ex) {
          var row = document.createElement("div");
          row.className = "example";
          var nl = document.createElement("div");
          nl.className = "example-nl";
          Annotate.into(nl, ex[0], { diagram: true });
          var en = document.createElement("div");
          en.className = "example-en";
          en.textContent = ex[1];
          en.hidden = true;
          ens.push(en);
          row.appendChild(nl);
          row.appendChild(en);
          block.appendChild(row);
        });
        tgl.addEventListener("click", function () {
          var show = ens.length && ens[0].hidden;
          ens.forEach(function (en) { en.hidden = !show; });
          tgl.textContent = show ? "verberg" : "vertaling";
        });

        container.appendChild(block);
      });
    });
  }

  // ---- how a card is drawn ----------------------------------------------
  // A `produce` front is ENGLISH (say the Dutch), so it is styled like the word
  // test's prompt. Every other type puts Dutch on the front to work on, and
  // errorfix marks it as the wrong sentence it is.
  function renderFront(c, x) {
    var cls = c.type === "errorfix" ? " g-wrong" : c.type === "produce" ? " g-prompt" : "";
    x.text.innerHTML =
      '<div class="g-op">' + esc(c.op || OPS[c.type] || "zet om") + "</div>" +
      '<div class="g-front' + cls + '">' + esc(c.front) + "</div>" +
      (c.options ? '<div class="g-opts">' + c.options.map(esc).join("  ·  ") + "</div>" : "");
    x.fitText(x.text.querySelector(".g-front"), x.container, 0.13,
      { nowrap: false, maxHeightFrac: 0.3 });
    x.sub.innerHTML = "";
  }

  // The rule line is ALWAYS under the answer, but quiet. Flagging a card
  // promotes it and adds the case's model sentence, so the pattern appears next
  // to the mistake at the moment you admit it.
  // The answer itself carries the INLINE marks only: fitText() wraps this
  // element, and an inline-grid cannot wrap, so the tang would clip on a narrow
  // window. The tang belongs to the model line below, which has a fixed size
  // and a line to itself, and only appears once you flag the card. That is the
  // moment the diagram is worth its space: you have just admitted the mistake.
  function renderBack(c, x) {
    var L = G && G.lessons[c._slug];
    var cs = L ? caseOf(L, c.case) : null;
    x.text.innerHTML =
      '<div class="g-front g-nl"></div>' +
      (cs
        ? '<div class="g-rule' + (x.flagged ? " strong" : "") + '">' + esc(cs.note) + "</div>" +
          (x.flagged ? '<div class="g-model"></div>' : "")
        : "");
    Annotate.into(x.text.querySelector(".g-nl"), c.back);

    var model = x.text.querySelector(".g-model");
    if (model) {
      if (cs.compare) {
        // a contrast case is only taught by both sides, so diagram both
        [[cs.compare.labelA, cs.compare.pairs[0][0]],
         [cs.compare.labelB, cs.compare.pairs[0][1]]].forEach(function (side) {
          var row = document.createElement("div");
          row.className = "g-model-row";
          var lab = document.createElement("span");
          lab.className = "g-model-label";
          lab.textContent = side[0];
          row.appendChild(lab);
          row.appendChild(Annotate.render(side[1], { diagram: true }));
          model.appendChild(row);
        });
      } else {
        model.appendChild(Annotate.render(cs.examples[0][0], { diagram: true }));
      }
    }
    // A flagged card shows three things at once (answer, promoted rule, model
    // diagram) inside a viewport whose bottom is owned by the fixed controls,
    // so the answer gives up height to make room rather than pushing the model
    // underneath them.
    x.fitText(x.text.querySelector(".g-nl"), x.container, x.flagged ? 0.12 : 0.16,
      { nowrap: false, maxHeightFrac: x.flagged ? 0.24 : 0.34 });
    x.sub.innerHTML = "";
  }

  // ---- running a drill ---------------------------------------------------
  // A card's `back` is authored WITH marks, so everything that treats it as
  // text (speech, and the pacing derived from its length) has to strip them
  // first. Reading "[2 ga]" aloud is the failure this prevents.
  function backText(c) { return Annotate.plain(c.back); }

  // Sentences need more thinking time than a single word, hence the slower
  // defaults and the self-paced option for transformations that take real work.
  function runOpts() {
    return {
      tempos: [["Normaal tempo", 1], ["Meer denktijd", 1.6], ["Zelf verder", null]],
      renderFront: renderFront,
      renderBack: renderBack,
      speakText: backText,
      thinkMs: function (c, pace) { return (4000 + backText(c).length * 90) * pace; },
      repeatMs: function (c, pace) { return (3500 + backText(c).length * 70) * pace; },
      promptLabel: "Zeg de juiste vorm…",
      onRoundEnd: recordMisses,
      onClose: function () {},
    };
  }

  function start(drill, title, cards) {
    drill.start(cards, title, runOpts());
  }

  // A drill instance bound to the injected overlay, for pages that have no
  // other drill of their own. index.html passes its existing instance instead:
  // two instances over the same nodes would double-bind the buttons.
  function createDrill() {
    ensureMarkup();
    var d = Drill.create({
      nodes: {
        modal: el("test-modal"), title: el("test-title"), setup: el("test-setup"),
        play: el("test-play"), label: el("test-label"), text: el("test-text"),
        sub: el("test-sub"), count: el("test-count"), bar: el("test-bar"),
        done: el("test-done"), toggleBtn: el("test-toggle"), mistakeBtn: el("test-mistake"),
      },
      renderFront: renderFront,
      renderBack: renderBack,
      speakText: backText,
      thinkMs: function (c, pace) { return (4000 + backText(c).length * 90) * pace; },
      repeatMs: function (c, pace) { return (3500 + backText(c).length * 70) * pace; },
      onRoundEnd: recordMisses,
    });
    el("test-exit").addEventListener("click", d.close);
    return d;
  }

  // ---- level + direction picker -----------------------------------------
  function openLevels(name, cards, drill) {
    ensureMarkup();
    var listEl = el("set-modal-list");
    el("set-modal-title").textContent = name + " — kies een set";
    listEl.innerHTML = "";

    function addRow(label, subtitle, picked) {
      var row = document.createElement("button");
      row.type = "button";
      row.className = "set-row";
      var head = document.createElement("span");
      head.className = "set-row-head";
      head.textContent = label;
      var sub = document.createElement("span");
      sub.className = "set-row-words";
      sub.textContent = subtitle;
      row.appendChild(head);
      row.appendChild(sub);
      row.addEventListener("click", function () {
        el("set-modal").classList.remove("open");
        start(drill, name + " — " + label, picked);
      });
      listEl.appendChild(row);
    }

    var levels = [];
    cards.forEach(function (c) { if (levels.indexOf(c.level) < 0) levels.push(c.level); });
    levels.sort(function (a, b) { return a - b; });
    levels.forEach(function (lv) {
      var picked = cards.filter(function (c) { return c.level === lv; });
      var ops = picked.map(function (c) { return c.op || OPS[c.type] || c.type; });
      addRow("Niveau " + lv + " · " + picked.length + " kaarten",
        ops.slice(0, 5).join(", ") + (ops.length > 5 ? ", …" : ""), picked);
    });

    // direction filters: producing (EN -> NL) is the realistic drill, converting
    // (NL -> NL) covers the contrasts English cannot ask for, plus error fixing
    var prod = cards.filter(function (c) { return c.type === "produce"; });
    var conv = cards.filter(function (c) { return c.type !== "produce"; });
    if (prod.length && conv.length) {
      addRow("Alleen produceren · " + prod.length + " kaarten",
        "EN → NL, zoals je het echt zegt", prod);
      addRow("Alleen omzetten · " + conv.length + " kaarten",
        "NL → NL, contrasten en fouten verbeteren", conv);
    }
    addRow("Alles · " + cards.length + " kaarten", "alle niveaus door elkaar", cards);
    el("set-modal").classList.add("open");
  }

  return {
    init: init, ensureMarkup: ensureMarkup, caseOf: caseOf,
    renderRules: renderRules, marksOn: marksOn, applyMarks: applyMarks,
    renderFront: renderFront, renderBack: renderBack,
    start: start, createDrill: createDrill, openLevels: openLevels,
    recordMisses: recordMisses, missCounts: missCounts, OPS: OPS,
  };
})();
