// Simple progressive enhancement: theme toggle + client-side search on /blog
(() => {
  const q = new URLSearchParams(location.search).get('q');
  if (q && document.querySelectorAll('li')) {
    const items = Array.from(document.querySelectorAll('li'));
    items.forEach(li => {
      const m = li.innerText.toLowerCase().includes(q.toLowerCase());
      li.style.display = m ? '' : 'none';
    });
  }
})();