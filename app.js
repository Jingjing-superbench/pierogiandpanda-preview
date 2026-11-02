const searchParams = new URLSearchParams(window.location.search);

function normalizeGuestRecord(record) {
  if (!record || typeof record !== 'object') return null;

  const suppliedNames = Array.isArray(record.names)
    ? record.names
    : [record.name, record.plusOne ? '& Guest' : null];
  const names = suppliedNames
    .filter((name) => typeof name === 'string' && name.trim())
    .map((name) => name.trim())
    .slice(0, 4);

  if (!names.length) return null;

  const inferredSize = names.length;
  const suppliedSize = Number.parseInt(record.partySize, 10);
  const partySize = Number.isFinite(suppliedSize)
    ? Math.min(Math.max(suppliedSize, 1), 20)
    : inferredSize;

  return {
    names,
    partySize,
    invitedToBothCelebrations: record.invitedToBothCelebrations !== false,
  };
}

function readGuestRecord() {
  const productionRecord = normalizeGuestRecord(window.__WEDDING_GUEST__);
  if (productionRecord) return productionRecord;

  if (searchParams.get('preview') !== '1') return null;

  const primaryName = searchParams.get('guest');
  if (!primaryName) return null;

  return normalizeGuestRecord({
    names: [primaryName, searchParams.get('companion')],
    partySize: searchParams.get('count'),
    invitedToBothCelebrations: searchParams.get('both') !== '0',
  });
}

function guestCountLabel(partySize) {
  if (partySize === 1) return 'One guest is';
  if (partySize === 2) return 'Two guests are';
  return `${partySize} guests are`;
}

function renderGuestInvitation(record) {
  if (!record) return;

  const namesElement = document.querySelector('[data-guest-names]');
  const messageElement = document.querySelector('[data-guest-message]');
  if (!namesElement || !messageElement) return;

  namesElement.replaceChildren(...record.names.map((name) => {
    const line = document.createElement('span');
    line.textContent = name;
    return line;
  }));

  const celebrationScope = record.invitedToBothCelebrations
    ? 'both celebrations'
    : 'the wedding celebration';
  messageElement.textContent = `${guestCountLabel(record.partySize)} warmly invited to ${celebrationScope}.`;
}

renderGuestInvitation(readGuestRecord());

const countdownSection = document.querySelector('.countdown-section');
const countdownFields = {
  days: document.querySelector('[data-countdown-days]'),
  hours: document.querySelector('[data-countdown-hours]'),
  minutes: document.querySelector('[data-countdown-minutes]'),
  seconds: document.querySelector('[data-countdown-seconds]'),
};
const countdownStatus = document.querySelector('[data-countdown-status]');
const countdownTargetIso = countdownSection?.dataset.eventTime;
const countdownTargetMs = countdownTargetIso ? Date.parse(countdownTargetIso) : Number.NaN;
let countdownInterval = null;

function writeCountdownUnit(unit, value, minimumLength = 2) {
  const field = countdownFields[unit];
  if (field) field.textContent = String(value).padStart(minimumLength, '0');
}

function updateCountdown(now = Date.now()) {
  if (!Number.isFinite(countdownTargetMs)) return null;

  const remaining = Math.max(0, countdownTargetMs - now);
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  writeCountdownUnit('days', days, 3);
  writeCountdownUnit('hours', hours);
  writeCountdownUnit('minutes', minutes);
  writeCountdownUnit('seconds', seconds);

  if (remaining === 0) {
    if (countdownInterval !== null) {
      window.clearInterval(countdownInterval);
      countdownInterval = null;
    }
    if (countdownStatus) countdownStatus.textContent = 'The celebration has begun.';
  }

  return { days, hours, minutes, seconds, remaining };
}

if (Number.isFinite(countdownTargetMs)) {
  const initialCountdown = updateCountdown();
  if (initialCountdown?.remaining > 0) {
    countdownInterval = window.setInterval(updateCountdown, 1000);
  }
}

window.__weddingCountdown = {
  targetIso: countdownTargetIso,
  targetMs: countdownTargetMs,
  update: updateCountdown,
  get intervalActive() { return countdownInterval !== null; },
};

const faqItems = [...document.querySelectorAll('.faq-item')];
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) otherItem.open = false;
    });
  });
});
