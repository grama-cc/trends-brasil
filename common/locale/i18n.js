/* @flow */
import { i18n_en_us } from './i18n_en_us';
import { i18n_pt_br } from './i18n_pt_br';

const i18nObj = {
  en_us: i18n_en_us,
  pt_br: i18n_pt_br,
};

export function i18n(key, lang) {
  //get browser locale
  let l = null
  let obj

  if(global.navigator){
    l = global.navigator.language.toLowerCase()
  }

  if (l === 'pt-br' || lang === 'port') {
    obj = i18nObj.pt_br
  } else {
    // Default language
    obj = i18nObj.en_us
  }

  const str = key.split('.').reduce((o, i) => o[i], obj);
  if (str instanceof Array) {
    return str;
  }

  return new Function(`return \`${str}\`;`).call(lang);
}





