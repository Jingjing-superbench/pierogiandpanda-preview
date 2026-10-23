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
let currentStep = 0;

function values() {
  const data = new FormData(form);
  return {
    alexWelcome: data.get('alex-welcome') || 'Not answered',
    alexWedding: data.get('alex-wedding') || 'Not answered',
    guestName: data.get('guest-name') || 'Guest',
    guestWelcome: data.get('guest-welcome') || 'Not answered',
    guestWedding: data.get('guest-wedding') || 'Not answered',
    dietary: data.get('dietary') || 'None provided',
    alcohol: data.get('alcohol') || 'Not answered',
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
    setValue('dietary', saved.dietary === 'None provided' ? '' : saved.dietary);
    setValue('alcohol', saved.alcohol);
    setValue('email', saved.email === 'Not provided' ? '' : saved.email);
    setValue('phone', saved.phone === 'Not provided' ? '' : saved.phone);
    setValue('contact', saved.contact || []);
    savedNote.hidden = false;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function validateStep() {
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

function reviewRow(label, value) {
  return `<div><dt>${label}</dt><dd>${value}</dd></div>`;
}

function renderReview() {
  const data = values();
  document.querySelector('#review-content').innerHTML = [
    reviewRow('Alex · Welcome Dinner', data.alexWelcome),
    reviewRow('Alex · Wedding Day', data.alexWedding),
    reviewRow(`${data.guestName} · Welcome Dinner`, data.guestWelcome),
    reviewRow(`${data.guestName} · Wedding Day`, data.guestWedding),
    reviewRow('Dietary', data.dietary),
    reviewRow('Alcohol', data.alcohol),
    reviewRow('Email', data.email),
    reviewRow('Phone', data.phone),
    reviewRow('Contact by', data.contact.length ? data.contact.join(', ') : 'No preference selected'),
  ].join('');
}

function showStep(index) {
  currentStep = index;
  steps.forEach((step, i) => step.classList.toggle('is-active', i === index));
  backButton.hidden = index === 0;
  nextButton.hidden = index === steps.length - 1;
  submitButton.hidden = index !== steps.length - 1;
  nextButton.textContent = index === 0 ? 'Begin registration' : index === steps.length - 2 ? 'Review answers' : 'Continue';
  progress.style.width = `${((index + 1) / steps.length) * 100}%`;
  errorMessage.hidden = true;
  if (index === steps.length - 1) renderReview();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

nextButton.addEventListener('click', () => {
  if (!validateStep()) return;
  showStep(currentStep + 1);
});

backButton.addEventListener('click', () => showStep(currentStep - 1));

form.addEventListener('input', (event) => {
  event.target.closest('fieldset, .signup-label')?.classList.remove('has-error');
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

loadSaved();
showStep(0);
