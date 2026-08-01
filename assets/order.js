/* Reusable sequencing drill: click items in the correct order.
 *
 * Markup contract:
 *   <div class="order" data-order>
 *     <ul class="order-pool">
 *       <li data-pos="3" data-reveal="1781">Event description</li>
 *       <li data-pos="1" data-reveal="1440">Another event</li>
 *     </ul>
 *     <ol class="order-built"></ol>
 *     <p class="score" data-score></p>
 *     <button class="drill-reset">Start over</button>
 *   </div>
 *
 * data-pos is the 1-indexed correct position. data-reveal is optional and is
 * shown only after a correct placement — so the item labels themselves can
 * withhold the answer (e.g. describe an event without naming its year).
 *
 * A wrong click flashes and costs a mistake but does not place the item, so the
 * learner must actually retrieve the order rather than brute-force it.
 */
(function () {
  'use strict';

  function shuffle(nodes) {
    var arr = nodes.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    var parent = arr[0].parentNode;
    arr.forEach(function (n) { parent.appendChild(n); });
  }

  function initOrder(root) {
    var pool = root.querySelector('.order-pool');
    var built = root.querySelector('.order-built');
    var scoreEl = root.querySelector('[data-score]');
    var resetBtn = root.querySelector('.drill-reset');
    var items = Array.prototype.slice.call(pool.querySelectorAll('li'));
    var total = items.length;
    var next = 1;
    var mistakes = 0;

    function updateScore() {
      if (!scoreEl) return;
      if (next > total) {
        scoreEl.textContent = mistakes === 0
          ? 'Complete, no mistakes — that is the timeline in storage, not just recognition.'
          : 'Complete with ' + mistakes + (mistakes === 1 ? ' mistake' : ' mistakes') + '. Reset and run it again cold.';
      } else {
        scoreEl.textContent = 'Earliest to latest · ' + (next - 1) + ' of ' + total + ' placed'
          + (mistakes ? ' · ' + mistakes + (mistakes === 1 ? ' mistake' : ' mistakes') : '');
      }
    }

    function reset() {
      next = 1;
      mistakes = 0;
      built.innerHTML = '';
      items.forEach(function (li) { li.classList.remove('taken', 'wrong'); });
      shuffle(items);
      updateScore();
    }

    items.forEach(function (li) {
      li.setAttribute('role', 'button');
      li.tabIndex = 0;

      function pick() {
        if (li.classList.contains('taken') || next > total) return;

        if (Number(li.dataset.pos) !== next) {
          mistakes++;
          li.classList.add('wrong');
          setTimeout(function () { li.classList.remove('wrong'); }, 550);
          updateScore();
          return;
        }

        li.classList.add('taken');
        var placed = document.createElement('li');
        placed.textContent = li.textContent;
        if (li.dataset.reveal) {
          var yr = document.createElement('span');
          yr.className = 'yr-reveal';
          yr.textContent = li.dataset.reveal;
          placed.appendChild(yr);
        }
        built.appendChild(placed);
        next++;
        updateScore();
      }

      li.addEventListener('click', pick);
      li.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); }
      });
    });

    if (resetBtn) resetBtn.addEventListener('click', reset);
    reset();
  }

  function init() {
    document.querySelectorAll('[data-order]').forEach(initOrder);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
