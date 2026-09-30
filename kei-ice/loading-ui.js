(function () {
  const stages = [
    { match: '[model] settings request', progress: 12, label: 'Loading model settings...' },
    { match: '[model] moc request', progress: 26, label: 'Loading model data...' },
    { match: '[model] physics request', progress: 42, label: 'Loading physics...' },
    { match: '[model] loadMotion', progress: 58, label: 'Loading motion...' },
    { match: '[model] texture phase', progress: 74, label: 'Loading textures...' },
    { match: '[model] texture loaded', progress: 92, label: 'Finishing render...' }
  ];

  function getNodes() {
    const progressNode = document.getElementById('loading-progress');

    return {
      overlay: document.getElementById('loading-overlay'),
      statusNode: document.getElementById('fallback-status'),
      progressNode,
      barNode: document.getElementById('loading-bar')
    };
  }

  function setStatus(label, progress) {
    const { statusNode, progressNode, barNode } = getNodes();

    if (statusNode && label) {
      statusNode.textContent = label;
      statusNode.style.display = '';
    }

    if (progressNode) {
      progressNode.style.width = progress + '%';
    }

    if (barNode) {
      barNode.setAttribute('aria-valuenow', String(progress));
    }
  }

  function finishLoading() {
    const { overlay, progressNode, barNode } = getNodes();

    if (!overlay || !progressNode) {
      return;
    }

    progressNode.style.width = '100%';

    if (barNode) {
      barNode.setAttribute('aria-valuenow', '100');
    }

    window.setTimeout(function () {
      overlay.classList.add('is-hidden');
    }, 120);

    window.setTimeout(function () {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 320);
  }

  window.__debugPush = function (line) {
    for (const stage of stages) {
      if (line.indexOf(stage.match) !== -1) {
        setStatus(stage.label, stage.progress);
        break;
      }
    }

    if (line.indexOf('[fatal]') !== -1) {
      setStatus(line.replace('[fatal] ', ''), 100);
      return;
    }

    if (line.indexOf('[model] texture loaded') !== -1) {
      finishLoading();
    }
  };

  window.addEventListener('DOMContentLoaded', function () {
    setStatus('Initializing...', 10);
  });
})();
