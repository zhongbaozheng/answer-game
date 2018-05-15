import Vue from 'vue';
import VueMaterial from 'vue-material';
import VueSocketio from 'vue-socket.io';
import io from 'socket.io-client';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './http';

const whiteList = ['/login', '/register'];
router.beforeEach((to, from, next) => {
  if (!store.state.user && whiteList.indexOf(to.path) === -1) {
    next({ path: '/login' });
  } else {
    next();
  }
});

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(VueSocketio, io('http://207wd53175.imwork.net:56025/match'));
Vue.component('icon', Icon);
new Vue({
  sockets: {
    connect() {
      console.log('match socket connected');
    },
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app');
