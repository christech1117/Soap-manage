import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import VueProgressBar from 'vue-progressbar';

import "../static/css/main.sass";
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

import VeeValidate, { Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Validator.addLocale(zh_CN);

const options = {
  color: '#00d1b2',
  failedColor: '#874b4b',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'vee-fields',
  delay: 0,
  locale: 'zh_CN',
  strict: true,
  enableAutoClasses: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input|blur',
  inject: true
}
// 修正默認錯誤提示
const dictionary = {
  zh_CN: {
    messages: {
      email: () => '信箱格式不正確',
      numeric: () => '請輸入數字',
      required:(field) => "請輸入" + field,
      min: (field, length) => '請輸入至少' + length + '個字',
      max: (field, length) => '最多只能輸入' + length + '個字'
    }
  }
}

Vue.use(VueProgressBar, options)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(VeeValidate, config)
Validator.updateDictionary(dictionary)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
//   store,
  template: '<App/>',
  components: { App }
})
