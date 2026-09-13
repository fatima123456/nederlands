// Display of a verb's principal parts.
//
// THE PROBLEM THIS SOLVES. A flashcard that shows only `eten` teaches the
// infinitive and nothing else: not `je eet`, not `at`, not whether the perfect
// takes heb or ben. All of that is authored in vocabulary/verbs.csv and now
// reaches the page via data/vocab.js, so the only work left is showing it in a
// form that answers those questions rather than restating the raw column.
//
// THE CSV CONVENTION, confirmed across all 329 verb rows:
//
//   pres "zoek / zoekt"  first form is the IK-form, second the JIJ/HIJ-form
//   pres "eet"           one form whose finite word ends in -t: ik, jij and hij
//                        really are identical, because Dutch never doubles the t
//   pres "bel op"        one form whose finite word does NOT end in -t: this is
//                        the ik-form ONLY. The jij/hij form (belt op) is absent
//                        from the CSV, for 101 of the 329 verbs.
//   aux  "is/heeft"      both auxiliaries are correct for this verb; kept whole
//   past "wilde / wou"   two past forms, likewise kept whole
//
// So only `pres` is split. A slash anywhere else means "either is right", which
// is a different claim and must not be relabelled as a person distinction.
//
// The third case is why presentLine() has three branches instead of two. We do
// NOT derive the missing form: stem + t is right for "bel" but wrong for "ga"
// (gaat, not gat), and a flashcard that invents a wrong form is worse than one
// that shows less. An incomplete row prints "ik bel op" and stops there.
//
// Everything here is pure: callers build the DOM. Exposed as window.nlVerbForms
// for console checks, matching js/annotate.js and the SRS helpers in index.html.
window.VerbForms = (function () {
  "use strict";

  function slash(s) {
    return String(s || "").split("/").map(function (x) { return x.trim(); })
      .filter(Boolean);
  }

  // The finite word of a present form: "bel op" -> "bel", "eet" -> "eet".
  function finite(f) { return String(f || "").split(/\s+/)[0]; }

  // PURE. present is one of:
  //   { ik, jij }        both forms authored
  //   { all }            one form, invariant across ik/jij/hij
  //   { ik, partial }    one form, and it is only the ik-form
  function parts(w) {
    var pres = slash(w && w.pres);
    var present;
    if (pres.length > 1) present = { ik: pres[0], jij: pres[1] };
    else if (!pres.length) present = { all: "" };
    else if (/t$/.test(finite(pres[0]))) present = { all: pres[0] };
    else present = { ik: pres[0], partial: true };
    return {
      present: present,
      past: (w && w.past) || "",
      // The plural past is a separate form, not a spelling variant: it carries
      // the voicing the singular hides (las/lazen), the vowel that lengthens
      // (at/aten) and the outright irregulars (was/waren, had/hadden). Shown
      // for weak verbs too, boring as werkte/werkten is, because only seeing
      // both every time teaches you to expect the interesting ones.
      pastPlural: (w && w.pastPl) || "",
      // The auxiliary belongs WITH the participle. "gegeten" on its own never
      // tells you whether to say heb or ben, which is the actual mistake.
      perfect: w && w.pp ? ((w.aux ? w.aux + " " : "") + w.pp) : "",
    };
  }

  // "ik zoek · je, hij zoekt"  |  "ik, je, hij eet"  |  "ik bel op"
  function presentLine(w) {
    var p = parts(w).present;
    if (p.all !== undefined) return p.all ? "ik, je, hij " + p.all : "";
    if (p.partial) return "ik " + p.ik;
    return "ik " + p.ik + " · je, hij " + p.jij;
  }

  // "streed · streden · heeft gestreden"  |  "zou · zouden"  (no participle)
  function pastLine(w) {
    var p = parts(w);
    return [p.past, p.pastPlural, p.perfect].filter(Boolean).join(" · ");
  }

  // Two lines, for a card reveal that has vertical room.
  function rows(w) {
    return [presentLine(w), pastLine(w)].filter(Boolean);
  }

  // One line, for the words popup where the forms sit beside the term.
  function line(w) {
    return rows(w).join(" · ");
  }

  return { parts: parts, presentLine: presentLine, pastLine: pastLine,
           rows: rows, line: line };
})();

window.nlVerbForms = window.VerbForms;
