// Keep research demos quiet when the reader leaves them or changes tabs.
// Playback starts only when the reader uses each video's native controls.
const videos = [...document.querySelectorAll('video')];
videos.forEach(video => {
  video.addEventListener('play', () => {
    videos.forEach(other => { if (other !== video) other.pause(); });
  });
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) videos.forEach(video => video.pause());
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (!entry.isIntersecting) entry.target.pause(); });
  });
  videos.forEach(video => observer.observe(video));
}

// Collapse on initialization; content remains readable without JavaScript.
for (const button of document.querySelectorAll('.section-toggle')) {
  const content = document.getElementById(button.getAttribute('aria-controls'));
  if (!content) continue;
  content.hidden = true;
  button.setAttribute('aria-expanded', 'false');
  button.hidden = false;
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    content.hidden = expanded;
    button.setAttribute('aria-expanded', String(!expanded));
    button.setAttribute('aria-label', `${expanded ? 'Expand' : 'Collapse'} ${button.dataset.sectionName}`);
    button.textContent = expanded ? '+' : '−';
    if (expanded) content.querySelectorAll('video').forEach(video => video.pause());
  });
}

// Reveal the performances before the browser follows an in-page dance link.
document.querySelectorAll('a[href="#dance"]').forEach(link => {
  link.addEventListener('click', () => {
    const toggle = document.querySelector('#dance .section-toggle');
    if (toggle && toggle.getAttribute('aria-expanded') === 'false') toggle.click();
  });
});
