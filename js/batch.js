// Batching for any hands-free drill: cut an ordered pool into consecutive
// groups of N so a sitting can be five items instead of forty-eight.
//
// THE PROBLEM THIS SOLVES. A pool is often far larger than a useful sitting:
// 48 idiom sentences, 86 words in dagelijks-leven, 307 in op-aan-af. When the
// material is new you want five at a time, and only then the next five. Three
// surfaces needed that and each had a different answer or none: the index's
// lesson test hard-coded sets of 30, the practice page's EN -> NL cards drilled
// the whole deck, and Zinnen herhalen drilled a whole level.
//
// WHAT IS SHARED AND WHAT IS NOT. The arithmetic, the size list, and the
// remembered choice live here. The DOM does not: index.html and the practice
// pages have separate stylesheets (`set-row` versus `rec-level-row`), so
// buildPicker takes the class names from its caller. One renderer that knew
// about both stylesheets would be a worse abstraction than two callers passing
// three strings.
//
// A batch composes WITH whatever grouping a surface already has rather than
// replacing it: Zinnen herhalen still picks a level first, then a group inside
// that level.
//
// chunk() is pure and exported for the console / tests, the way window.nlSRS
// and window.nlAnnotate already are.
//
// Classic script, no ES module: these pages open by double-click over file://.
window.Batch = (function () {
  "use strict";

  var SIZES = [5, 10, 15, 20]; // "alles" is size 0, appended by the picker
  var KEY = "nl-batch-size";

  // PURE. Consecutive groups, the last holding the remainder.
  // size 0 (or >= the length) means a single group of everything, which is
  // what "alles" selects and what every surface did before batching existed.
  function chunk(list, size) {
    var out = [];
    if (!list || !list.length) return out;
    if (!size || size >= list.length) return [list.slice()];
    for (var i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
    return out;
  }

  // The last size you chose, so you pick 5 once rather than every session.
  // 0 = alles. An unreadable store just means "no preference yet".
  function lastSize() {
    try {
      var v = parseInt(localStorage.getItem(KEY), 10);
      return isNaN(v) ? 0 : v;
    } catch (e) {
      return 0;
    }
  }
  function saveSize(n) {
    try { localStorage.setItem(KEY, String(n)); } catch (e) {}
  }

  function label(size) { return size ? size + " tegelijk" : "alles"; }

  // Build the picker into `host`: a row of size buttons, then one row per
  // group. Re-renders itself in place when a size is chosen, so the group list
  // always matches the selected size.
  //
  // opts:
  //   pool        array to split
  //   classes     { size, sizeOn, row, head, sub } class names from the caller
  //   describe(items)      -> the small text under a group row (optional)
  //   headLabel(i, n, its) -> the group row's heading (optional)
  //   onPick(items, i, groups) -> start drilling that group
  function buildPicker(host, pool, opts) {
    opts = opts || {};
    var cls = opts.classes || {};
    var size = lastSize();

    function draw() {
      host.innerHTML = "";
      var bar = document.createElement("div");
      bar.className = cls.sizeBar || "batch-sizes";
      SIZES.concat([0]).forEach(function (n) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = (cls.size || "batch-size") + (n === size ? " " + (cls.sizeOn || "on") : "");
        b.textContent = label(n);
        b.addEventListener("click", function () {
          size = n;
          saveSize(n);
          draw();
        });
        bar.appendChild(b);
      });
      host.appendChild(bar);

      var groups = chunk(pool, size);
      groups.forEach(function (items, i) {
        var row = document.createElement("button");
        row.type = "button";
        row.className = cls.row || "set-row";
        var head = document.createElement("span");
        head.className = cls.head || "set-row-head";
        head.textContent = opts.headLabel
          ? opts.headLabel(i + 1, groups.length, items)
          : groups.length > 1
            ? "Groep " + (i + 1) + " van " + groups.length + " · " + items.length
            : "Alles · " + items.length;
        row.appendChild(head);
        if (opts.describe) {
          var sub = document.createElement("span");
          sub.className = cls.sub || "set-row-words";
          sub.textContent = opts.describe(items);
          row.appendChild(sub);
        }
        row.addEventListener("click", function () {
          if (opts.onPick) opts.onPick(items, i, groups);
        });
        host.appendChild(row);
      });
    }

    draw();
  }

  return {
    SIZES: SIZES,
    chunk: chunk,
    lastSize: lastSize,
    saveSize: saveSize,
    label: label,
    buildPicker: buildPicker,
  };
})();

// exposed the way index.html exposes window.nlSRS, so the pure bit can be
// exercised from the console: nlBatch.chunk([1,2,3,4,5], 2)
window.nlBatch = window.Batch;
