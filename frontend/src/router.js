import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import TopicChosen from './views/TopicChosen.vue';
import Battle from './views/Battle.vue';
import Record from './views/Record.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/topic-chosen',
      name: 'topic-chosen',
      component: TopicChosen,
    },
    {
      path: '/battle',
      name: 'battle',
      component: Battle,
    },
    {
      path: '/record',
      name: 'record',
      component: Record,
    },
  ],
});
