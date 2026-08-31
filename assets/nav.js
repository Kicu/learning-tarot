/* Shared lesson footer navigation.
 *
 * Markup contract (lesson pages only):
 *   <div class="lesson-nav">
 *     <a href="../reference/deck-map.html">A Map of the 78 Cards</a>  <!-- this lesson's reference links, optional -->
 *   </div>
 *   <script src="../assets/nav.js"></script>
 *
 * The div holds only the lesson's own reference links. This script prepends
 * the Course home link, inserts Previous/Next from the LESSONS manifest, and
 * labels the reference links it found. Adding a lesson = one line in LESSONS;
 * the previous lesson's "Next" updates by itself. An entry with file: null is
 * planned but not yet written and renders as plain text in the Next slot.
 */
(function () {
  'use strict';

  var LESSONS = [
    { file: '0001-where-tarot-comes-from.html', title: '01 · Where Tarot Comes From' },
    { file: '0002-deck-anatomy.html', title: '02 · The Anatomy of the Deck' },
    { file: '0003-four-suits-four-problems.html', title: '03 · The Four Suits as Four Kinds of Problem' },
    { file: '0004-numbers-as-a-narrative-arc.html', title: '04 · Numbers 1–10 as a Narrative Arc' },
    { file: '0005-why-the-seven-of-swords-shows-a-thief.html', title: '05 · Why the Seven of Swords Shows a Thief' },
    { file: '0006-court-cards-four-postures.html', title: '06 · The Court Cards as Four Postures' },
    { file: '0007-suit-cards-by-heart.html', title: '07 · The Suit Cards by Heart' },
    { file: '0008-first-eleven-trumps.html', title: '08 · The First Eleven Trumps' },
    { file: '0009-last-ten-trumps-and-the-fool.html', title: '09 · The Last Ten Trumps, and the Fool' },
    { file: '0010-the-three-card-spread.html', title: '10 · The Three-Card Spread' },
    { file: '0011-the-celtic-cross.html', title: '11 · The Celtic Cross' },
    { file: null, title: '12 · Reading Aloud — not yet written, just ask' }
  ];

  var nav = document.querySelector('.lesson-nav');
  if (!nav) return;

  var here = decodeURIComponent(location.pathname.split('/').pop());
  var i;
  for (i = 0; i < LESSONS.length; i++) {
    if (LESSONS[i].file === here) break;
  }
  if (i === LESSONS.length) return;

  var refs = Array.prototype.slice.call(nav.querySelectorAll('a'));
  nav.textContent = '';

  function label(text) {
    var s = document.createElement('span');
    s.className = 'nav-label';
    s.textContent = text;
    nav.appendChild(s);
  }

  function link(href, text) {
    var a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    nav.appendChild(a);
  }

  link('../index.html', 'Course home');

  if (i > 0) {
    label('Previous');
    link(LESSONS[i - 1].file, '← ' + LESSONS[i - 1].title);
  }

  if (refs.length) {
    label('Reference');
    refs.forEach(function (a) { nav.appendChild(a); });
  }

  if (i + 1 < LESSONS.length) {
    var next = LESSONS[i + 1];
    label('Next');
    if (next.file) {
      link(next.file, next.title + ' →');
    } else {
      var s = document.createElement('span');
      s.textContent = next.title;
      nav.appendChild(s);
    }
  }
}());
