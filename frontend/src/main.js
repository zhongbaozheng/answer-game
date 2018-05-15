import Vue from 'vue';
import VueMaterial from 'vue-material';
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
Vue.component('icon', Icon);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
