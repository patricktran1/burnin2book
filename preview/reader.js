/* reader.js — small conveniences for the reading preview: progress hairline,
   arrow-key navigation, and "continue reading" on the contents page. No frameworks. */
(function () {
  var bar = document.querySelector('.progress span');
  function update() {
    if (!bar) return;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();

  var prev = document.querySelector('a[rel="prev"]');
  var next = document.querySelector('a[rel="next"]');
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowRight' && next) window.location.href = next.getAttribute('href');
    if (e.key === 'ArrowLeft' && prev) window.location.href = prev.getAttribute('href');
  });

  try {
    var here = location.pathname.split('/').pop() || 'index.html';
    if (document.body.classList.contains('reading')) {
      var h1 = document.querySelector('.chapter-head h1');
      localStorage.setItem('burnin-v2-last', JSON.stringify({ href: here, title: h1 ? h1.textContent : here }));
    } else if (document.body.classList.contains('home')) {
      var last = JSON.parse(localStorage.getItem('burnin-v2-last') || 'null');
      var wrap = document.querySelector('.continue');
      var link = document.getElementById('continue-link');
      if (last && wrap && link && last.href && last.href !== 'index.html') {
        link.href = last.href;
        link.textContent = 'Continue reading: ' + last.title;
        wrap.hidden = false;
      }
    }
  } catch (err) { /* storage unavailable; ignore */ }
})();
