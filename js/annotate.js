// Sentence annotation: turn a marked-up Dutch string into a visible diagram of
// its own grammar rule.
//
// THE MODEL. A lesson example is authored once, with its grammatically loaded
// tokens wrapped inline:
//
//     "[1 Straks] [2 ga] ik naar de stad."
//     "Ik [2 blijf] thuis [c omdat] ik geen tijd [e heb]."
//     "[1 Ik] [2 heb] mijn moeder [g bezocht]."
//
// From that single act of authoring, two layers are rendered:
//
//   1. INLINE MARKS — each marked token is boxed/badged in place, so the
//      sentence still reads as a sentence but says where the verb sits.
//   2. THE TANG — a bracket drawn UNDER the line, spanning the two poles of
//      the clause. It is DERIVED from the marks (see brace()), never authored.
//      That is the invariant worth protecting: there is no second structure to
//      keep in sync, and a mislabelled sentence produces a visibly wrong
//      bracket instead of a silently wrong one.
//
// Marks are RULE-RELATIVE, not a parse. You mark what the case is teaching, so
// the same sentence carries different marks under different rules: case 1e
// wraps a whole subclause in one [1 ...] because "this counts as one element"
// IS the rule, while case 2a leaves that clause's parts separate. A sentence
// covered in every mark that could apply teaches nothing.
//
// Adding a role is a decision about every future lesson, so
// `.claude/commands/grammar.md` tells the lesson author to stop and ask rather
// than invent one. `p` was added that way: case 2e (a prepositional phrase may
// stand after the verb cluster) is ABOUT the PP, and with no mark for it the
// diagram showed two identical brackets and the moving part was invisible.
// `s` and `t` arrived the same way, for the separable-verb lesson: the stranded
// prefix of "bel ... op" is neither a non-finite verb (`g`) nor a
// voorzetselgroep (`p`), so without a role of its own the marks described an
// ordinary V2 sentence and the bel ... op tang did not draw at all.
//
// parse() and brace() are pure and exported for the console / tests; only
// render() touches the DOM.
//
// Classic script, no ES module: these pages open by double-click over file://.
window.Annotate = (function () {
  "use strict";

  // role -> what it means, and the badge shown above it inline. A role with no
  // badge is marked but unnumbered (the end group and the conjunction are
  // located by their shape, not by a slot number).
  var ROLES = {
    "1": { cls: "tk-first", badge: "1" },   // eerste zinsdeel
    "2": { cls: "tk-verb", badge: "2" },    // finite verb, slot 2
    e:   { cls: "tk-verb", badge: "eind" }, // finite verb driven to the end
    g:   { cls: "tk-end", badge: "" },      // non-finite verb in the end group
    c:   { cls: "tk-conj", badge: "" },     // conjunction: picks the schema
    p:   { cls: "tk-pp", badge: "" },       // voorzetselgroep: the movable block
    s:   { cls: "tk-sep", badge: "deel" },  // scheidbaar deel: the stranded prefix
    t:   { cls: "tk-te", badge: "" },       // te, the infinitive marker
  };

  var MARK_RE = /\[([12egcpst])\s+([^\]]+)\]/g;

  // PURE. "Ik [2 heb] het [g gedaan]." ->
  //   [{text:"Ik", role:null}, {text:"heb", role:"2"}, ...]
  // Unmarked runs are split on whitespace so every token owns a grid column;
  // a marked token stays whole however many words it holds ("[1 Omdat het
  // regent,]" is ONE element, which is the whole point of that example).
  //
  // Whitespace is what separates tokens, so text touching a mark with no space
  // between joins it. That is what keeps "[g bezocht]." from becoming a
  // free-floating full stop with its own grid column and its own space in the
  // string handed to speech.
  function parse(str) {
    var tokens = [];
    function pushPlain(chunk) {
      if (!chunk) return;
      var glued = !/^\s/.test(chunk) && tokens.length > 0;
      chunk.trim().split(/\s+/).forEach(function (w, i) {
        if (!w) return;
        if (glued && i === 0) tokens[tokens.length - 1].text += w;
        else tokens.push({ text: w, role: null });
      });
    }
    var last = 0, m;
    MARK_RE.lastIndex = 0;
    while ((m = MARK_RE.exec(str)) !== null) {
      pushPlain(str.slice(last, m.index));
      tokens.push({ text: m[2].trim(), role: m[1] });
      last = m.index + m[0].length;
    }
    pushPlain(str.slice(last));
    return tokens;
  }

  // PURE. The two poles of the clause, as 1-based token indices, or null.
  //
  //   1. a conjunction with verbs after it -> subclause: the poles are the
  //      conjunction and the last verb of the cluster it pushed to the end.
  //   2. otherwise a slot-2 verb with an end group -> main clause: the poles
  //      are the finite verb and the last thing in the end group.
  //   3. otherwise nothing to span. A plain V2 sentence has one verb and no
  //      second pole, so it gets the slot ruler alone.
  //
  // `s` closes a bracket because a stranded prefix IS the second pole: "bel je
  // vanavond op" is a tang, and the whole separable-verb lesson is that span.
  // `t` deliberately does not: the infinitive it marks always follows it, so
  // `te` could only ever close the bracket one token too early.
  function brace(tokens) {
    var conj = -1, v2 = -1, lastEnd = -1, i;
    for (i = 0; i < tokens.length; i++) {
      var r = tokens[i].role;
      if (r === "c" && conj < 0) conj = i;
      else if (r === "2" && v2 < 0) v2 = i;
      if (r === "e" || r === "g" || r === "s") lastEnd = i;
    }
    if (conj >= 0 && lastEnd > conj) return { from: conj + 1, to: lastEnd + 1 };
    if (v2 >= 0 && lastEnd > v2) return { from: v2 + 1, to: lastEnd + 1 };
    return null;
  }

  // The Dutch text with every mark stripped, for speech and for plain contexts.
  function plain(str) {
    return parse(str).map(function (t) { return t.text; }).join(" ");
  }

  // Does this string carry any annotation at all?
  function marked(str) {
    MARK_RE.lastIndex = 0;
    return MARK_RE.test(str);
  }

  // ---- rendering ---------------------------------------------------------
  // Two shapes, because the contexts differ in what they can survive:
  //
  //   inline (default) — a plain <span> of token spans. Wraps like text, so it
  //     is safe inside anything Drill.fitText() shrinks and re-wraps.
  //   diagram (opts.diagram) — an inline-grid, one column per token, with the
  //     slot ruler on row 2 and the derived brace on rows 3-4. Cannot wrap, so
  //     it belongs only where the sentence has a line to itself.
  function render(str, opts) {
    opts = opts || {};
    var tokens = parse(str);

    if (!opts.diagram) {
      var span = document.createElement("span");
      span.className = "annot";
      tokens.forEach(function (t, i) {
        span.appendChild(tokenEl(t, i === tokens.length - 1));
        if (i < tokens.length - 1) span.appendChild(document.createTextNode(" "));
      });
      return span;
    }

    var g = document.createElement("span");
    g.className = "tang";
    g.style.gridTemplateColumns = "repeat(" + tokens.length + ", max-content)";
    tokens.forEach(function (t, i) {
      var w = tokenEl(t, false);
      w.style.gridColumn = i + 1;
      g.appendChild(w);
      // the ruler: only numbered roles get a tick under them
      var info = t.role && ROLES[t.role];
      if (info && info.badge) {
        var tick = document.createElement("span");
        tick.className = "slot" + (t.role === "1" ? " slot-soft" : "");
        tick.style.gridColumn = i + 1;
        tick.textContent = info.badge;
        g.appendChild(tick);
      }
    });

    var b = brace(tokens);
    if (b) {
      var span2 = b.from + " / " + (b.to + 1);
      var bar = document.createElement("i");
      bar.className = "brace";
      bar.style.gridColumn = span2;
      g.appendChild(bar);
      var lab = document.createElement("span");
      lab.className = "blabel";
      lab.style.gridColumn = span2;
      lab.textContent = tokens[b.from - 1].text + " … " + tokens[b.to - 1].text;
      g.appendChild(lab);
    }
    return g;
  }

  // One token. The badge rides on a data attribute so CSS can hide every badge
  // at once when marks are switched off, without rebuilding the DOM.
  function tokenEl(t, isLast) {
    var el = document.createElement("span");
    var info = t.role && ROLES[t.role];
    el.className = "tk" + (info ? " " + info.cls : "");
    el.textContent = t.text;
    if (info && info.badge) el.setAttribute("data-slot", info.badge);
    if (isLast) el.classList.add("tk-last");
    return el;
  }

  // Replace an element's contents with the rendered sentence.
  function into(el, str, opts) {
    el.innerHTML = "";
    el.appendChild(render(str, opts));
    return el;
  }

  return {
    parse: parse, brace: brace, plain: plain, marked: marked,
    render: render, into: into, ROLES: ROLES,
  };
})();

// exposed the way index.html exposes window.nlSRS, so the pure bits can be
// exercised from the console: nlAnnotate.brace(nlAnnotate.parse("…"))
window.nlAnnotate = window.Annotate;
