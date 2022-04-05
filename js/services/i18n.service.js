'use strict';

var gCurrLang = 'en';

const gTrans = {
  mainTitle: {
    en: 'Welcome to my 📚 shop',
    he: `ברוכה הבאה לחנות ה 📚 שלי`,
  },
  addBtn: {
    en: 'Add a new Book',
    he: 'לחץ להוספת ספר חדש',
  },
  id: {
    en: 'ID',
    he: 'סימן מזהה',
  },
  title: {
    en: 'Title',
    he: 'כותרת',
  },
  price: {
    en: 'Price',
    he: 'מחיר',
  },
  actions: {
    en: 'Actions',
    he: 'פעולות',
  },
  currency: {
    en: 'USD',
    he: 'ILS',
  },
  readBtn: {
    en: 'Read',
    he: 'קרא',
  },
  updateBtn: {
    en: 'Update',
    he: 'עדכן',
  },
  delBtn: {
    en: 'Delete',
    he: 'מחק',
  },
  langLabel: {
    en: 'Pick a Language:',
    he: 'בחר שפה:',
  },
};

function setLang(lang) {
  gCurrLang = lang;
}

function makeTrans() {
  const transElements = document.querySelectorAll('[data-trans]');

  transElements.forEach((el) => {
    const transData = el.dataset['trans'];
    const newTxt = doTrans(transData);
    el.innerText = newTxt
  });


}

function doTrans(transData) {
  const key = gTrans[transData];
  if (!key) return 'UNKNOWN';
  const translated = key[gCurrLang];
  if (!translated) return key['en'];
  return translated;
}

function formatCurrency(num) {
  const formatC = (gCurrLang === 'he')?'he-IL': 'en-US';
  const currencyName = (gCurrLang === 'he')?'ILS': 'USD';
  return new Intl.NumberFormat(formatC, { style: 'currency', currency: currencyName }).format(num)
}

function getCurrLang(){
  return gCurrLang
}