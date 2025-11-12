(function() {
  const root = document.documentElement;
  const btn = document.querySelector('.theme-toggle');
  const KEY = 'theme';

  // Load saved theme if any
  const saved = localStorage.getItem(KEY);
  if (saved) root.setAttribute('data-theme', saved);

  // Toggle on click
  btn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem(KEY, next);
  });
})();
