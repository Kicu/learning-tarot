/* Reusable self-graded flashcard drill for retrieval practice.
 *
 * Markup contract:
 *   <div class="flash" data-flash>
 *     <script type="application/json">
 *       { "decks": [ { "label": "Wands",
 *                      "cards": [ { "name": "Ace of Wands",
 *                                   "hook": "Root of the Powers of Fire",
 *                                   "picture": "One literal sentence.",
 *                                   "meaning": "The line to say aloud." } ] } ] }
 *     </script>
 *   </div>
 *
 * The card front shows only the name; the learner answers aloud, reveals,
 * and grades themselves. A missed card re-enters the queue a few cards
 * ahead, so it comes back within the same sitting. With more than one
 * deck an "All" deck is offered automatically.
 */
(function () {
  'use strict';

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function el(tag, className, text) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (text) n.textContent = text;
    return n;
  }

  function initFlash(root) {
    var data = JSON.parse(root.querySelector('script[type="application/json"]').textContent);
    var decks = data.decks.slice();
    if (decks.length > 1) {
      var all = [];
      decks.forEach(function (d) { all = all.concat(d.cards); });
      decks.push({ label: 'All ' + all.length, cards: all });
    }

    var picker = el('div', 'flash-decks');
    var stage = el('div', 'flash-stage');
    var progress = el('p', 'flash-progress');
    root.appendChild(picker);
    root.appendChild(stage);
    root.appendChild(progress);

    var queue = [], total = 0, firstTry = 0, retried = 0;

    decks.forEach(function (deck) {
      var b = el('button', 'drill-reset', deck.label);
      b.addEventListener('click', function () { start(deck); });
      picker.appendChild(b);
    });

    function start(deck) {
      queue = shuffle(deck.cards.map(function (c) {
        return { name: c.name, hook: c.hook, picture: c.picture, meaning: c.meaning, missed: false };
      }));
      total = queue.length;
      firstTry = 0;
      retried = 0;
      showFront();
    }

    function updateProgress() {
      var done = firstTry + retried;
      progress.textContent = done + ' of ' + total + ' cleared · ' + queue.length + ' in the queue';
    }

    function showFront() {
      if (!queue.length) { showDone(); return; }
      var card = queue[0];
      stage.innerHTML = '';
      stage.appendChild(el('p', 'flash-name', card.name));
      var hint = el('p', 'flash-hint', 'Say the scene and the meaning aloud, then check.');
      stage.appendChild(hint);
      var reveal = el('button', 'drill-reset flash-main', 'Reveal');
      reveal.addEventListener('click', showBack);
      stage.appendChild(reveal);
      reveal.focus();
      updateProgress();
    }

    function showBack() {
      var card = queue[0];
      stage.innerHTML = '';
      stage.appendChild(el('p', 'flash-name', card.name));
      var back = el('div', 'flash-back');
      [['The scene', card.picture], ['At the table', card.meaning], ['Title · posture', card.hook]]
        .forEach(function (pair) {
          var line = el('p', 'flash-line');
          line.appendChild(el('span', 'flash-label', pair[0]));
          line.appendChild(document.createTextNode(pair[1]));
          back.appendChild(line);
        });
      stage.appendChild(back);

      var actions = el('div', 'flash-actions');
      var knew = el('button', 'drill-reset flash-knew', 'Knew it');
      var missed = el('button', 'drill-reset flash-missed', 'Missed it');
      knew.addEventListener('click', function () {
        queue.shift();
        if (card.missed) retried++; else firstTry++;
        showFront();
      });
      missed.addEventListener('click', function () {
        queue.shift();
        card.missed = true;
        queue.splice(Math.min(queue.length, 3 + Math.floor(Math.random() * 3)), 0, card);
        showFront();
      });
      actions.appendChild(knew);
      actions.appendChild(missed);
      stage.appendChild(actions);
      knew.focus();
      updateProgress();
    }

    function showDone() {
      stage.innerHTML = '';
      stage.appendChild(el('p', 'flash-name', 'Done.'));
      var summary = total + ' cards · ' + firstTry + ' known on first sight · ' + retried + ' needed retries.';
      stage.appendChild(el('p', 'flash-hint', summary +
        (retried === 0 ? ' Come back in two days, not in two minutes.' : ' Run the same deck once more, then leave it until the next sitting.')));
      progress.textContent = 'Pick a deck above to go again.';
    }

    progress.textContent = 'Pick a deck to start.';
  }

  function init() {
    document.querySelectorAll('[data-flash]').forEach(initFlash);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
