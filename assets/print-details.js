(function () {
  let closedDetails = [];
  window.addEventListener('beforeprint', function () {
    closedDetails = Array.from(document.querySelectorAll('details:not([open])'));
    closedDetails.forEach(function (detail) { detail.open = true; });
  });
  window.addEventListener('afterprint', function () {
    closedDetails.forEach(function (detail) { detail.open = false; });
    closedDetails = [];
  });
}());
