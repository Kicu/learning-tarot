(function () {
  'use strict';

  const links = document.querySelectorAll('.card-thumb');
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;

  const dialog = document.createElement('dialog');
  dialog.className = 'card-preview';
  dialog.setAttribute('aria-labelledby', 'card-preview-title');
  dialog.innerHTML = '<header><h2 id="card-preview-title" tabindex="-1" autofocus></h2></header><img alt="">';
  document.body.appendChild(dialog);

  const title = dialog.querySelector('h2');
  const image = dialog.querySelector('img');
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });

  links.forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      title.textContent = link.dataset.cardName;
      image.alt = link.querySelector('img').alt;
      image.src = link.href;
      dialog.showModal();
    });
  });
}());
