/* Reusable multiple-choice retrieval drill with immediate feedback.
 *
 * Markup contract:
 *   <div class="quiz" data-quiz>
 *     <div class="quiz-q" data-answer="b">
 *       <p class="prompt">Question text</p>
 *       <ul class="quiz-opts">
 *         <li data-opt="a">First option</li>
 *         <li data-opt="b">Second option</li>
 *       </ul>
 *       <p class="why">Shown once answered. Explain *why*, don't just confirm.</p>
 *     </div>
 *     <p class="score" data-score></p>
 *   </div>
 *
 * Option order is shuffled on load so the correct answer never sits in a
 * memorable position. One attempt per question — guessing again would turn
 * retrieval practice into recognition.
 */
(function () {
  'use strict';

  function shuffle(nodes) {
    const arr = nodes.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    const parent = arr[0].parentNode;
    arr.forEach(function (n) { parent.appendChild(n); });
  }

  function initQuiz(quiz) {
    const questions = Array.from(quiz.querySelectorAll('.quiz-q'));
    const scoreEl = quiz.querySelector('[data-score]');
    let answered = 0;
    let correct = 0;

    function updateScore() {
      if (!scoreEl) return;
      if (answered === 0) {
        scoreEl.textContent = questions.length + ' questions · one attempt each';
        return;
      }
      let txt = correct + ' of ' + answered + ' correct';
      if (answered === questions.length) {
        txt += correct === questions.length
          ? ' — all of them. Ready for the next lesson.'
          : ' — reread the sections you missed, then ask me about them.';
      }
      scoreEl.textContent = txt;
    }

    questions.forEach(function (q) {
      const opts = Array.from(q.querySelectorAll('.quiz-opts li'));
      shuffle(opts);

      opts.forEach(function (opt) {
        opt.setAttribute('role', 'button');
        opt.tabIndex = 0;

        function choose() {
          if (q.classList.contains('done')) return;
          q.classList.add('done');
          const right = opt.dataset.opt === q.dataset.answer;
          opt.classList.add(right ? 'picked-right' : 'picked-wrong');
          if (!right) {
            opts.forEach(function (o) {
              if (o.dataset.opt === q.dataset.answer) o.classList.add('reveal');
            });
          }
          answered++;
          if (right) correct++;
          updateScore();
        }

        opt.addEventListener('click', choose);
        opt.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(); }
        });
      });
    });

    updateScore();
  }

  function init() {
    document.querySelectorAll('[data-quiz]').forEach(initQuiz);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
