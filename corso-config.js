// Legge config.json e aggiorna il numero di corso mostrato nella pagina.
// Ogni pagina che lo include puo' opzionalmente definire prima:
//   var TITLE_TEMPLATE = 'Testo pagina {CORSO} rev.N';
// e/o marcare con class="corso-label" gli elementi dove va scritto il testo (es. "233°").
// Il campo #corsoInput (se presente, come in index.html) viene precompilato col solo numero.
(function () {
  fetch('config.json?t=' + Date.now())
    .then(function (r) { return r.json(); })
    .then(function (cfg) {
      var corso = (cfg && cfg.corso) ? cfg.corso : '233°';
      var corsoNumero = (cfg && cfg.corsoNumero) ? cfg.corsoNumero : corso.replace(/[^0-9]/g, '');

      document.querySelectorAll('.corso-label').forEach(function (el) {
        el.textContent = corso;
      });

      if (typeof TITLE_TEMPLATE !== 'undefined' && TITLE_TEMPLATE) {
        document.title = TITLE_TEMPLATE.replace('{CORSO}', corso);
      }

      var corsoInput = document.getElementById('corsoInput');
      if (corsoInput) {
        corsoInput.value = corsoNumero;
        corsoInput.placeholder = corsoNumero;
      }
    })
    .catch(function () {
      // Se config.json non e' raggiungibile, restano i valori gia' scritti nella pagina.
    });
})();
