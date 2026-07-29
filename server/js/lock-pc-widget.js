'use strict';
(function () {
  const LOCK_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>';

  function tiles() {
    return Array.from(document.querySelectorAll('[data-dashboard-widget="lockpc"]'));
  }

  function paint(mount) {
    mount.innerHTML = `<div class="lockpc-icon">${LOCK_SVG}</div>`;
    
    // On click, send lock workstation action
    mount.addEventListener('click', () => {
      fetch('/actions/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'lockWorkstation' })
      }).catch(console.error);
    });
  }

  function renderWidgets() {
    const ts = tiles();
    ts.forEach(tile => {
      const mount = tile.querySelector('.lockpc-widget-mount');
      if (mount && !mount.querySelector('.lockpc-icon')) {
        paint(mount);
      }
    });
  }

  window.LockPcWidget = { renderWidgets };
})();
