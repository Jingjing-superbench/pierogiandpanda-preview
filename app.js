const searchParams = new URLSearchParams(window.location.search);

const translations = [
  ['.primary-navigation a[href="#home"]', 'Home', '首页'],
  ['.primary-navigation a[href="#details"]', 'Details', '详情'],
  ['.primary-navigation a[href="#travel"]', 'Travel', '行程'],
  ['.primary-navigation a[href="#attire"]', 'Attire', '着装'],
  ['.primary-navigation a[href="#faq"]', 'FAQ', '常见问题'],
  ['.primary-navigation .rsvp-link', 'RSVP', '回复邀请'],
  ['.invitation-eyebrow:not(.invitation-eyebrow-secondary)', 'Joyfully invite you', '诚挚邀请您'],
  ['.invitation-eyebrow-secondary', 'To their wedding celebration', '参加我们的婚礼庆典'],
  ['.wedding-place', 'The Slate <i>·</i> Phuket', 'The Slate <i>·</i> 普吉岛', true],
  ['.personalized-frame .section-kicker', 'This invitation is reserved for', '此请柬为以下宾客预留'],
  ['.guest-names > span', 'Honoured Guest', '尊贵的宾客'],
  ['.guest-supporting-copy', 'Your invitation details will appear here.', '您的邀请详情将在此显示。'],
  ['#celebrations-heading', 'Two beautiful days in Phuket', '在普吉岛共度美好两日'],
  ['.celebration-panel:first-of-type .event-date', 'Friday, 30 July 2027', '2027年7月30日，星期五'],
  ['#welcome-dinner-heading', 'Welcome Dinner', '欢迎晚宴'],
  ['.celebration-panel:first-of-type .event-time time', '6:00 PM', '晚上6:00'],
  ['.celebration-panel:nth-of-type(2) .event-date', 'Saturday, 31 July 2027', '2027年7月31日，星期六'],
  ['#ceremony-heading', 'Wedding Ceremony', '婚礼仪式'],
  ['.celebration-panel:nth-of-type(2) .event-time time', '3:50 PM', '下午3:50'],
  ['.celebration-panel:nth-of-type(2) .event-place', 'The Slate <i>·</i> Phuket', 'The Slate <i>·</i> 普吉岛', true],
  ['.reception-note', 'Reception to follow.', '仪式后将举行婚宴。'],
  ['#countdown-heading', 'Countdown', '婚礼倒计时'],
  ['[data-countdown-days] + .countdown-label', 'Days', '天'],
  ['[data-countdown-hours] + .countdown-label', 'Hours', '小时'],
  ['[data-countdown-minutes] + .countdown-label', 'Minutes', '分钟'],
  ['[data-countdown-seconds] + .countdown-label', 'Seconds', '秒'],
  ['.countdown-destination', 'The Slate <i>·</i> Phuket', 'The Slate <i>·</i> 普吉岛', true],
  ['#venue-heading', 'The Venue', '婚礼场地'],
  ['.venue-location', 'Nai Yang Beach <i>·</i> Phuket <i>·</i> Thailand', '奈扬海滩 <i>·</i> 普吉岛 <i>·</i> 泰国', true],
  ['.welcome-copy .section-number', 'Friday, 30 July 2027', '2027年7月30日，星期五'],
  ['#welcome-heading', 'Welcome Dinner', '欢迎晚宴'],
  ['.welcome-time time', '6:00 PM', '晚上6:00'],
  ['.welcome-note', 'Please allow time for the bridge crossing before dinner. Join us for an intimate evening of local flavours.', '晚宴前请预留时间乘坐木筏过桥。诚邀您与我们共度温馨夜晚，品尝当地风味。'],
  ['.welcome-attire', 'Attire: Tropical colours · Please avoid black and white.', '着装：热带色彩 · 请避免黑色和白色。'],
  ['.programme-date', 'Saturday, 31 July 2027', '2027年7月31日，星期六'],
  ['#programme-heading', 'Wedding Programme', '婚礼流程'],
  ['.programme-item:nth-child(1) .programme-moment time', '3:50 PM', '下午3:50'],
  ['.programme-item:nth-child(1) h3', 'Ceremony', '婚礼仪式'],
  ['.programme-item:nth-child(2) .programme-moment', 'Afterwards', '仪式后'],
  ['.programme-item:nth-child(2) h3', 'Cocktail Hour', '鸡尾酒会'],
  ['.programme-item:nth-child(3) .programme-moment', 'Evening', '晚上'],
  ['.programme-item:nth-child(3) h3', 'Dinner & Dancing', '晚宴与舞会'],
  ['.attire-copy .section-number', 'Wedding Day', '婚礼当天'],
  ['#attire-heading', 'Formal Attire', '正式着装'],
  ['.attire-copy > p:nth-of-type(2)', 'We kindly ask guests to dress in formal attire in shades of tan, grey or blue. Please avoid black and white.', '诚请宾客选择棕褐色、灰色或蓝色系的正式着装，并避免黑色和白色。'],
  ['.attire-copy > p:nth-of-type(3)', 'A regular tie, open collar or pocket square is welcome. Bow ties are not required.', '可搭配普通领带、敞领或口袋巾，无需佩戴领结。'],
  ['.attire-copy > p:nth-of-type(4)', 'The ceremony and cocktails are outdoors, so please consider appropriate footwear.', '婚礼仪式和鸡尾酒会将在户外举行，请选择合适的鞋履。'],
  ['.attire-swatch-tan', 'Tan', '棕褐色'],
  ['.attire-swatch-grey', 'Grey', '灰色'],
  ['.attire-swatch-blue', 'Blue', '蓝色'],
  ['.travel-heading-group .section-number', 'Phuket', '普吉岛'],
  ['#travel-heading', 'Travel & Stay', '行程与住宿'],
  ['.travel-heading-group > p:last-child', 'Confirmed arrangements will be shared here as soon as they are available.', '相关安排确认后，我们会尽快在此更新。'],
  ['.travel-detail:nth-child(1) .travel-label', 'Hotel booking arrangements', '酒店预订安排'],
  ['.travel-detail:nth-child(2) .travel-label', 'Group rates', '团体房价'],
  ['.travel-detail:nth-child(3) .travel-label', 'Transport information', '交通信息'],
  ['.travel-detail:nth-child(1) h3', 'To be confirmed', '待确认'],
  ['.travel-detail:nth-child(2) h3', 'To be confirmed', '待确认'],
  ['.travel-detail:nth-child(3) h3', 'To be confirmed', '待确认'],
  ['.faq-heading-group .section-number', 'Guest Notes', '宾客须知'],
  ['#faq-heading', 'Frequently Asked Questions', '常见问题'],
  ['.faq-item:nth-child(1) summary', 'What is the dress code?', '婚礼当天的着装要求是什么？'],
  ['.faq-item:nth-child(1) p', 'Formal attire in shades of tan, grey or blue. Please avoid black and white. Bow ties are not required.', '请穿棕褐色、灰色或蓝色系的正式着装，并避免黑色和白色。无需佩戴领结。'],
  ['.faq-item:nth-child(2) summary', 'What time does the wedding begin?', '婚礼几点开始？'],
  ['.faq-item:nth-child(2) p', 'The ceremony begins at 3:50 PM on Saturday, 31 July 2027.', '婚礼仪式将于2027年7月31日星期六下午3:50开始。'],
  ['.faq-item:nth-child(3) summary', 'Where should I stay?', '我应该住在哪里？'],
  ['.faq-item:nth-child(3) p', 'Hotel booking arrangements and any group rates are not yet confirmed. Details will be shared here when available.', '酒店预订安排及团体房价尚未确认。详情确定后会在此公布。'],
  ['.faq-item:nth-child(4) summary', 'Will the ceremony be outdoors?', '婚礼仪式会在户外举行吗？'],
  ['.faq-item:nth-child(4) p', 'Yes. The ceremony and cocktails are outdoors, so please consider appropriate footwear.', '是的。婚礼仪式和鸡尾酒会将在户外举行，请选择合适的鞋履。'],
  ['.faq-item:nth-child(5) summary', 'Will transport be provided?', '会提供交通安排吗？'],
  ['.faq-item:nth-child(5) p', 'Guests who book a stay of three nights or more receive complimentary airport pickup. Otherwise, The Slate is approximately a 10-minute taxi ride from Phuket International Airport. We recommend downloading the Grab app, or you can use the airport taxi service on arrival.', '预订入住三晚或以上的宾客可享免费机场接送。否则，从普吉国际机场乘出租车前往 The Slate 约需10分钟。建议提前下载 Grab 应用，抵达后也可使用机场出租车服务。'],
  ['.faq-item:nth-child(6) summary', 'May I bring a +1?', '我可以携伴参加吗？'],
  ['.faq-item:nth-child(6) p', 'Your invitation will show whether a +1 has been included. We kindly ask that only the guests named on the invitation attend, and we appreciate your understanding.', '您的邀请函会注明是否包含一位同行宾客。诚请仅由邀请函上列名的宾客出席，感谢您的理解。'],
  ['.faq-item:nth-child(7) summary', 'May I bring my child?', '我可以带孩子参加吗？'],
  ['.faq-item:nth-child(7) p', 'Your invitation will show whether your child has been included. The hotel also offers childcare services at an additional cost. If you would like to receive childcare information, please indicate this in your RSVP response.', '您的邀请函会注明是否包括孩子。酒店亦提供额外收费的儿童看护服务。如需相关信息，请在回复邀请时注明。'],
  ['#rsvp-heading', 'Will you join us in Phuket?', '您会来普吉岛与我们相聚吗？'],
  ['.rsvp-supporting-copy', 'We look forward to celebrating with you.', '期待与您共同庆祝。'],
  ['.rsvp-button', 'Respond to the invitation', '回复邀请'],
];

const translatedAttributes = [
  ['.primary-navigation', 'aria-label', 'Wedding website', '婚礼网站'],
  ['.language-control', 'aria-label', 'Language selection', '语言选择'],
  ['.countdown-grid', 'aria-label', 'Time remaining until the wedding ceremony', '距离婚礼仪式的剩余时间'],
  ['.attire-palette', 'aria-label', 'Requested attire colours: tan, grey and blue', '建议着装颜色：棕褐色、灰色和蓝色'],
  ['.venue-photograph img', 'alt', 'Aerial atmosphere concept of a tropical resort estate beside the sea at sunset', '热带海滨庄园日落航拍氛围概念图'],
  ['.welcome-photograph img', 'alt', 'Black Ginger restaurant at The Slate in Phuket', '普吉岛 The Slate 酒店的 Black Ginger 餐厅'],
  ['.attire-visual img', 'alt', 'Illustrated guests in tan, grey and blue formal attire raising champagne glasses', '宾客身着棕褐色、灰色和蓝色正式服装举杯的插画'],
];

let currentLanguage = 'en';

function preferredLanguage() {
  try {
    return window.localStorage.getItem('wedding-language') === 'zh' ? 'zh' : 'en';
  } catch {
    return 'en';
  }
}

function localizedText(english, chinese) {
  return currentLanguage === 'zh' ? chinese : english;
}

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
  if (currentLanguage === 'zh') return `${partySize}位宾客`;
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
    line.textContent = currentLanguage === 'zh' && name === '& Guest' ? '与嘉宾' : name;
    return line;
  }));

  if (currentLanguage === 'zh') {
    const celebrationScope = record.invitedToBothCelebrations ? '两场庆典' : '婚礼庆典';
    messageElement.textContent = `${guestCountLabel(record.partySize)}诚邀参加${celebrationScope}。`;
  } else {
    const celebrationScope = record.invitedToBothCelebrations
      ? 'both celebrations'
      : 'the wedding celebration';
    messageElement.textContent = `${guestCountLabel(record.partySize)} warmly invited to ${celebrationScope}.`;
  }
}

const currentGuestRecord = readGuestRecord();

function setLanguage(language, { persist = true } = {}) {
  currentLanguage = language === 'zh' ? 'zh' : 'en';

  translations.forEach(([selector, english, chinese, useHtml = false]) => {
    const element = document.querySelector(selector);
    if (!element) return;
    const value = localizedText(english, chinese);
    if (useHtml) element.innerHTML = value;
    else element.textContent = value;
  });

  translatedAttributes.forEach(([selector, attribute, english, chinese]) => {
    document.querySelector(selector)?.setAttribute(attribute, localizedText(english, chinese));
  });

  document.documentElement.lang = currentLanguage === 'zh' ? 'zh-Hans' : 'en';
  document.title = localizedText('Jingjing & Dan · 31 July 2027', 'Jingjing 与 Dan · 2027年7月31日');
  document.querySelector('meta[name="description"]')?.setAttribute(
    'content',
    localizedText(
      'Jingjing and Dan invite you to their wedding celebration at The Slate, Phuket.',
      'Jingjing 与 Dan 诚邀您参加在普吉岛 The Slate 举行的婚礼庆典。',
    ),
  );

  document.querySelectorAll('[data-language]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.language === currentLanguage));
  });

  renderGuestInvitation(currentGuestRecord);

  if (persist) {
    try {
      window.localStorage.setItem('wedding-language', currentLanguage);
    } catch {
      // The language still works when browser storage is unavailable.
    }
  }
}

document.querySelectorAll('[data-language]').forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.language));
});

setLanguage(preferredLanguage(), { persist: false });

window.__weddingLanguage = {
  set: setLanguage,
  get current() { return currentLanguage; },
};

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
    if (countdownStatus) {
      countdownStatus.textContent = localizedText('The celebration has begun.', '庆典已经开始。');
    }
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
