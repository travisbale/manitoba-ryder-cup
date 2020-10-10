import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from '@/lib/axios';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'leaderboard',
    component: () => import(/* webpackChunkName: "leaderboard" */ '../views/Leaderboard.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/match/:id',
    name: 'matchDetails',
    component: () => import(/* webpackChunkName: "match" */ '../views/MatchDetails.vue'),
    props: true,
  },
  {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue'),
    meta: {
      requiresAuth: true,
    },
  }],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth) && from.name !== 'login') {
    axios.post('refresh', null, { xsrfCookieName: 'csrf_refresh_token' })
      .then(() => next())
      .catch(() => next({ name: 'login' }));
  } else {
    next();
  }
});

export default router;
