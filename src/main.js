import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import VueProgressBar from 'vue-progressbar'
// import 'element-ui/lib/theme-default/index.css';    // 默认主题
import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";


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

Vue.use(VueProgressBar, options)
Vue.use(ElementUI);
Vue.use(VueAxios, axios);

// Vue.prototype.$axios = axios;

// new Vue({
//     router,
//     render: h => h(App)
// }).$mount('#app');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
//   store,
  template: '<App/>',
  components: { App }
})
