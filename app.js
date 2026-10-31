const opening = document.querySelector('#opening');
const invitation = document.querySelector('#invitation');
const envelopeTrigger = document.querySelector('#envelope-trigger');
const skipOpening = document.querySelector('#skip-opening');
const closeInvitationButton = document.querySelector('#close-invitation');
const languageButtons = [...document.querySelectorAll('[data-set-lang]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function setLanguage(language) {
  const next = language === 'zh' ? 'zh' : 'en';
  document.documentElement.dataset.lang = next;
  document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
  for (const button of languageButtons) {
    button.setAttribute('aria-pressed', String(button.dataset.setLang === next));
  }
  localStorage.setItem('jingjing-dan-language', next);
}

function revealInvitation({ animate = true } = {}) {
  if (!opening || !invitation) return;
  const shouldAnimate = animate && !reducedMotion.matches;
  opening.classList.add('is-opening');
  const delay = shouldAnimate ? 2850 : 20;
  window.setTimeout(() => {
    opening.classList.add('is-leaving');
    invitation.removeAttribute('aria-hidden');
    invitation.setAttribute('aria-hidden', 'false');
    document.body.classList.add('invitation-open');
    sessionStorage.setItem('jingjing-dan-opened', 'true');
    window.scrollTo({ top: 0, behavior: 'auto' });
    startReveals();
    window.setTimeout(() => { opening.hidden = true; }, shouldAnimate ? 620 : 20);
  }, delay);
}

function closeInvitation() {
  if (!opening || !invitation) return;
  window.scrollTo({ top: 0, behavior: 'auto' });
  invitation.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('invitation-open');
  opening.hidden = false;
  opening.classList.remove('is-opening', 'is-leaving');
  sessionStorage.removeItem('jingjing-dan-opened');
  envelopeTrigger?.focus({ preventScroll: true });
}

function startReveals() {
  const items = [...document.querySelectorAll('.reveal')];
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  items.forEach((item) => observer.observe(item));
}

function updateCountdown() {
  const target = new Date('2027-07-31T15:50:00+07:00').getTime();
  const remaining = target - Date.now();
  const grid = document.querySelector('.countdown-grid');
  const finished = document.querySelector('#countdown-finished');
  if (remaining <= 0) {
    if (grid) grid.hidden = true;
    if (finished) finished.hidden = false;
    return;
  }
  const units = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000),
  };
  for (const [id, value] of Object.entries(units)) {
    const element = document.querySelector(`#${id}`);
    if (element) element.textContent = String(value).padStart(id === 'days' ? 3 : 2, '0');
  }
}

for (const button of languageButtons) {
  button.addEventListener('click', () => setLanguage(button.dataset.setLang));
}
envelopeTrigger?.addEventListener('click', () => revealInvitation({ animate: true }));
skipOpening?.addEventListener('click', () => revealInvitation({ animate: false }));
closeInvitationButton?.addEventListener('click', closeInvitation);

setLanguage(localStorage.getItem('jingjing-dan-language') || 'en');
updateCountdown();
window.setInterval(updateCountdown, 1000);

if (!document.documentElement.classList.contains('js')) {
  invitation?.setAttribute('aria-hidden', 'false');
  startReveals();
}
