'use strict';

var gCurrLang = 'en';

const gTrans = {
  mainTitle: {
    en: 'Welcome to my 馃摎 shop',
    he: `讘专讜讻讛 讛讘讗讛 诇讞谞讜转 讛 馃摎 砖诇讬`,
  },
  addBtn: {
    en: 'Add a new Book',
    he: '诇讞抓 诇讛讜住驻转 住驻专 讞讚砖',
  },
  id: {
    en: 'ID',
    he: '住讬诪谉 诪讝讛讛',
  },
  title: {
    en: 'Title',
    he: '讻讜转专转',
  },
  price: {
    en: 'Price',
    he: '诪讞讬专',
  },
  actions: {
    en: 'Actions',
    he: '驻注讜诇讜转',
  },
  currency: {
    en: 'USD',
    he: 'ILS',
  },
  readBtn: {
    en: 'Read',
    he: '拽专讗',
  },
  updateBtn: {
    en: 'Update',
    he: '注讚讻谉',
  },
  delBtn: {
    en: 'Delete',
    he: '诪讞拽',
  },
  langLabel: {
    en: 'Pick a Language:',
    he: '讘讞专 砖驻讛:',
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