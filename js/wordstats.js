// Per-word attempt history: on which try did you get this word right?
//
// WHAT THIS ANSWERS. The drill already loops a flagged card until a clean
// round, so every run ends with "you got this on attempt N". Nothing kept that
// number: closing the overlay threw the mistake set away, and the SRS store
// (nl-srs-v1) answers a different question — WHEN should this come back — not
// HOW BADLY it went. This file keeps the second number, so the index can show a
// 1st / 2nd / 3rd-try breakdown per lesson and a refresher can drill the
// weakest words first.
//
// THE DERIVATION, AND WHY IT NEEDS NO CHANGE TO THE ENGINE. Drill's round 1
// holds the whole pool; round 2 holds only what you flagged in round 1; and so
// on. So a word's attempt count is just the number of rounds it appeared in,
// and it "resolves" in the first round where it appears unflagged. onRoundEnd
// is therefore the only hook required, and js/drill.js keeps knowing nothing
// about what an item is.
//
// SHAPE OF THE STORE (localStorage "nl-wordstats-v1"):
//   { v:1, words: { "verb:eten": { n, f, a, open, t } } }
//     n    runs recorded for this word
//     f    how many of those were right on the first attempt
//     a    attempts in the LAST run (1 = right first time, 2, 3, ...)
//     open the last run was closed before the word was ever answered right
//     t    ms timestamp of that last run
//   a/open/t drive ordering; n/f drive the percentages.
//
// WHAT IS NOT RECORDED. A run closed before its first round ever completed
// tells us nothing — no card's fate is known yet — so it writes nothing at all.
// Recording it would mark every word in the group as failed for the crime of
// being on screen when you hit Sluiten.
//
// The pure half (fold / rank / queue / summary) takes state as an argument and
// never touches localStorage, the way nlSRS.applyResults already does. That is
// what makes it testable — see js/wordstats.test.js.
//
// Classic script, no ES module: these pages open by double-click over file://.
window.WordStats = (function () {
  "use strict";

  var KEY = "nl-wordstats-v1";
  var MAX_RANK = 3; // "3rd try or worse" is the floor; deeper is not worth splitting

  // Same formula the SRS store uses, so the two agree per word. Disambiguates
  // identical spellings across kinds (e.g. "licht" the noun vs the adjective).
  function keyOf(w) { return w.k + ":" + w.t; }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var s = JSON.parse(raw);
        if (s && typeof s === "object") {
          s.words = s.words || {};
          return s;
        }
      }
    } catch (e) {}
    return { v: 1, words: {} };
  }

  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  /**
   * Track one run. Feed it the keys it started with, then the flagged keys at
   * every round boundary; it works out each word's attempt count.
   *
   *   var t = WordStats.startRun(keys);
   *   t.round(missedKeys);   // once per round end
   *   t.done();              // true once nothing is unresolved
   *   t.results();           // [{key, a, open}] — safe to call at any point
   */
  function startRun(keys) {
    var attempts = {}, pending = {}, resolved = {}, rounds = 0, first = null;
    (keys || []).forEach(function (k) {
      attempts[k] = 1;
      pending[k] = 1;
    });

    return {
      round: function (missed) {
        var miss = {};
        (missed || []).forEach(function (k) { miss[k] = 1; });
        var ok = 0, total = 0;
        Object.keys(pending).forEach(function (k) {
          total++;
          if (miss[k]) {
            attempts[k]++; // flagged: it comes back, so this was another attempt
          } else {
            ok++;
            resolved[k] = attempts[k];
            delete pending[k];
          }
        });
        rounds++;
        if (first === null) first = { total: total, ok: ok };
      },
      done: function () { return !Object.keys(pending).length; },
      // The first round is the only one that covers the whole pool, so it is
      // the group's "how much did I know cold" score.
      first: function () { return first; },
      results: function () {
        if (!rounds) return []; // nothing completed a round: nothing is known
        var out = [];
        Object.keys(resolved).forEach(function (k) {
          out.push({ key: k, a: resolved[k], open: false });
        });
        // still flagged when the run ended: we know it was wrong a-1 times and
        // never confirmed right. It is recorded at that count, not worse — a
        // word abandoned after one miss is a first-try miss, nothing more.
        Object.keys(pending).forEach(function (k) {
          out.push({ key: k, a: attempts[k], open: true });
        });
        return out;
      },
    };
  }

  // PURE: fold a run's results into the state. Mutates and returns it, the way
  // nlSRS.applyResults does.
  function fold(state, results, now) {
    var words = state.words || (state.words = {});
    (results || []).forEach(function (r) {
      var rec = words[r.key] || { n: 0, f: 0, a: 1, open: false, t: 0 };
      rec.n++;
      if (r.a === 1 && !r.open) rec.f++;
      rec.a = r.a;
      rec.open = !!r.open;
      rec.t = now;
      words[r.key] = rec;
    });
    return state;
  }

  // PURE: how deep the last run went wrong. 0 = right first time, 1 = wrong at
  // the first try, 2 = wrong at the second, 3 = wrong at the third or later.
  function rank(rec) {
    if (!rec) return -1; // never drilled
    return Math.min(Math.max((rec.a || 1) - 1, 0), MAX_RANK);
  }

  // PURE: the refresher queue. Words you have drilled at least once, worst
  // first; inside a rank, the ones you have not seen for longest first, so the
  // list keeps cycling instead of hammering the same five words. An unresolved
  // word wins its rank's tie-break: it was never confirmed right.
  function queue(state, words) {
    var w = (state && state.words) || {};
    return (words || [])
      .filter(function (x) { return !!w[keyOf(x)]; })
      .map(function (x) { return { w: x, r: w[keyOf(x)] }; })
      .sort(function (a, b) {
        var ra = rank(a.r), rb = rank(b.r);
        if (ra !== rb) return rb - ra;
        var oa = a.r.open ? 1 : 0, ob = b.r.open ? 1 : 0;
        if (oa !== ob) return ob - oa;
        return (a.r.t || 0) - (b.r.t || 0);
      })
      .map(function (x) { return x.w; });
  }

  // PURE: the per-lesson breakdown shown on an index row. Buckets a word by the
  // attempt its LAST run ended on: 1st, 2nd, 3rd-or-more. `weak` is everything
  // that is not a clean first try.
  function summary(state, words) {
    var w = (state && state.words) || {};
    var out = { tested: 0, a1: 0, a2: 0, a3: 0, weak: 0, runs: 0, firstOk: 0 };
    (words || []).forEach(function (x) {
      var rec = w[keyOf(x)];
      if (!rec) return;
      out.tested++;
      out.runs += rec.n || 0;
      out.firstOk += rec.f || 0;
      var a = Math.max(rec.a || 1, 1);
      if (a === 1 && !rec.open) out.a1++;
      else if (a === 2) out.a2++;
      else out.a3++;
    });
    out.weak = out.a2 + out.a3;
    return out;
  }

  return {
    KEY: KEY,
    keyOf: keyOf,
    load: load,
    save: save,
    startRun: startRun,
    fold: fold,
    rank: rank,
    queue: queue,
    summary: summary,
  };
})();

// exposed like nlSRS / nlBatch so the pure bits can be poked from the console:
// nlWordStats.queue(nlWordStats.load(), VOCAB).slice(0, 10)
window.nlWordStats = window.WordStats;
