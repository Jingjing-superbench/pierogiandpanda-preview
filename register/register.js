const STORAGE_KEY = 'jingjing-dan-preview-rsvp';
const form = document.querySelector('#signup-form');
const steps = [...document.querySelectorAll('.form-step')];
const backButton = document.querySelector('#back-button');
const nextButton = document.querySelector('#next-button');
const submitButton = document.querySelector('#submit-button');
const errorMessage = document.querySelector('#form-error');
const progress = document.querySelector('#progress-bar');
const savedNote = document.querySelector('#saved-note');
const success = document.querySelector('#registration-success');
const languageButtons = [...document.querySelectorAll('[data-set-lang]')];
let currentStep = 0;
let language = 'en';

const copy = {
  en: {
    begin: 'Begin response', continue: 'Continue', review: 'Review answers',
    notAnswered: 'Not answered', guest: 'Guest', none: 'None provided', notProvided: 'Not provided', noPreference: 'No preference selected',
    coming: 'Coming', cannot: "Can't come", yes: 'Yes', no: 'No',
    labels: ['Alex · Welcome Dinner', 'Alex · Wedding Day', 'Welcome Dinner', 'Wedding Day', 'Dietary restrictions', 'Dietary restrictions', 'Email', 'Phone', 'Contact by'],
  },
  zh: {
    begin: '开始填写回执', continue: '继续', review: '核对信息',
    notAnswered: '尚未回答', guest: '同行嘉宾', none: '未填写', notProvided: '未提供', noPreference: '未选择偏好',
    coming: '出席', cannot: '无法出席', yes: '是', no: '否',
    labels: ['Alex · 欢迎晚宴', 'Alex · 婚礼庆典', '欢迎晚宴', '婚礼庆典', '饮食限制', '饮食限制', '电子邮箱', '电话号码', '联系方式'],
  },
};

function translateValue(value) {
  if (language === 'en') return value;
  const map = {
    Coming: copy.zh.coming,
    "Can't come": copy.zh.cannot,
    Yes: copy.zh.yes,
    No: copy.zh.no,
    'Not answered': copy.zh.notAnswered,
    'None provided': copy.zh.none,
    'Not provided': copy.zh.notProvided,
    'Text message': '短信',
  };
  return map[value] || value;
}

function setLanguage(nextLanguage) {
  language = nextLanguage === 'zh' ? 'zh' : 'en';
  document.documentElement.dataset.lang = language;
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  for (const button of languageButtons) button.setAttribute('aria-pressed', String(button.dataset.setLang === language));
  for (const field of document.querySelectorAll('[data-placeholder-en]')) {
    field.placeholder = field.dataset[`placeholder${language === 'zh' ? 'Zh' : 'En'}`];
  }
  localStorage.setItem('jingjing-dan-language', language);
  syncGuestDetails();
  updateButtons();
  if (currentStep === steps.length - 1) renderReview();
}

function values() {
  const data = new FormData(form);
  return {
    alexWelcome: data.get('alex-welcome') || 'Not answered',
    alexWedding: data.get('alex-wedding') || 'Not answered',
    guestName: data.get('guest-name') || 'Guest',
    guestWelcome: data.get('guest-welcome') || 'Not answered',
    guestWedding: data.get('guest-wedding') || 'Not answered',
    alexDietary: data.get('alex-dietary') || 'None provided',
    guestDietary: data.get('guest-dietary') || 'None provided',
    email: data.get('email') || 'Not provided',
    phone: data.get('phone') || 'Not provided',
    contact: data.getAll('contact'),
  };
}

function setValue(name, value) {
  if (Array.isArray(value)) {
    for (const input of form.querySelectorAll(`[name="${name}"]`)) input.checked = value.includes(input.value);
    return;
  }
  const inputs = form.querySelectorAll(`[name="${name}"]`);
  if (!inputs.length) return;
  if (inputs[0].type === 'radio') {
    for (const input of inputs) input.checked = input.value === value;
  } else {
    inputs[0].value = value;
  }
}

function loadSaved() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return;
    setValue('alex-welcome', saved.alexWelcome);
    setValue('alex-wedding', saved.alexWedding);
    setValue('guest-name', saved.guestName === 'Guest' ? '' : saved.guestName);
    setValue('guest-welcome', saved.guestWelcome);
    setValue('guest-wedding', saved.guestWedding);
    setValue('alex-dietary', (saved.alexDietary || saved.dietary) === 'None provided' ? '' : (saved.alexDietary || saved.dietary || ''));
    setValue('guest-dietary', saved.guestDietary === 'None provided' ? '' : (saved.guestDietary || ''));
    setValue('email', saved.email === 'Not provided' ? '' : saved.email);
    setValue('phone', saved.phone === 'Not provided' ? '' : saved.phone);
    setValue('contact', saved.contact || []);
    savedNote.hidden = false;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function syncGuestDetails() {
  const guestNameField = form.elements['guest-name'];
  const guestComing = [...form.querySelectorAll('[name="guest-welcome"], [name="guest-wedding"]')]
    .some((input) => input.checked && input.value === 'Coming');
  guestNameField.required = guestComing;
  const enteredName = guestNameField.value.trim();
  const label = document.querySelector('#guest-dietary-name');
  if (label) label.textContent = enteredName || (language === 'zh' ? '同行嘉宾' : 'Your guest');
}

function validateStep() {
  syncGuestDetails();
  const controls = [...steps[currentStep].querySelectorAll('input, textarea')];
  let valid = true;
  for (const control of controls) {
    if (!control.checkValidity()) {
      valid = false;
      control.closest('fieldset, .signup-label')?.classList.add('has-error');
    } else {
      control.closest('fieldset, .signup-label')?.classList.remove('has-error');
    }
  }
  errorMessage.hidden = valid;
  if (!valid) controls.find((control) => !control.checkValidity())?.focus();
  return valid;
}

function addReviewRow(container, label, value) {
  const row = document.createElement('div');
  const term = document.createElement('dt');
  const detail = document.createElement('dd');
  term.textContent = label;
  detail.textContent = value;
  row.append(term, detail);
  container.append(row);
}

function renderReview() {
  const data = values();
  const container = document.querySelector('#review-content');
  const text = copy[language];
  container.replaceChildren();
  addReviewRow(container, text.labels[0], translateValue(data.alexWelcome));
  addReviewRow(container, text.labels[1], translateValue(data.alexWedding));
  addReviewRow(container, `${data.guestName} · ${text.labels[2]}`, translateValue(data.guestWelcome));
  addReviewRow(container, `${data.guestName} · ${text.labels[3]}`, translateValue(data.guestWedding));
  addReviewRow(container, `Alex Chen · ${text.labels[4]}`, translateValue(data.alexDietary));
  if (data.guestName !== 'Guest') addReviewRow(container, `${data.guestName} · ${text.labels[5]}`, translateValue(data.guestDietary));
  addReviewRow(container, text.labels[6], data.email);
  addReviewRow(container, text.labels[7], data.phone);
  addReviewRow(container, text.labels[8], data.contact.length ? data.contact.map(translateValue).join(', ') : text.noPreference);
}

function updateButtons() {
  const text = copy[language];
  nextButton.textContent = currentStep === 0 ? text.begin : currentStep === steps.length - 2 ? text.review : text.continue;
}

function showStep(index) {
  currentStep = index;
  syncGuestDetails();
  steps.forEach((step, position) => step.classList.toggle('is-active', position === index));
  backButton.hidden = index === 0;
  nextButton.hidden = index === steps.length - 1;
  submitButton.hidden = index !== steps.length - 1;
  progress.style.width = `${((index + 1) / steps.length) * 100}%`;
  errorMessage.hidden = true;
  updateButtons();
  if (index === steps.length - 1) renderReview();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

for (const button of languageButtons) button.addEventListener('click', () => setLanguage(button.dataset.setLang));
nextButton.addEventListener('click', () => {
  if (!validateStep()) return;
  showStep(currentStep + 1);
});
backButton.addEventListener('click', () => showStep(currentStep - 1));
form.addEventListener('input', (event) => {
  event.target.closest('fieldset, .signup-label')?.classList.remove('has-error');
  syncGuestDetails();
  errorMessage.hidden = true;
});
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = values();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, savedAt: new Date().toISOString() }));
  form.hidden = true;
  savedNote.hidden = true;
  success.hidden = false;
  progress.style.width = '100%';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.querySelector('#edit-response').addEventListener('click', () => {
  success.hidden = true;
  form.hidden = false;
  savedNote.hidden = false;
  showStep(1);
});

setLanguage(localStorage.getItem('jingjing-dan-language') || 'en');
loadSaved();
showStep(0);
