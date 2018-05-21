import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import TopicChosen from './views/TopicChosen.vue';
import Battle from './views/Battle.vue';
import Record from './views/Record.vue';
import Personal from './views/Personal.vue';
import Ranking from './views/Ranking.vue';
import ModeChosen from './views/ModeChosen.vue';

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
      path: '/personal',
      name: 'personal',
      component: Personal,
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
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking,
    },
    {
      path: '/mode-chosen',
      name: 'mode-chosen',
      component: ModeChosen,
    },
  ],
});
