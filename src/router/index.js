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
    path: '/scorecards',
    name: 'scorecards',
    component: () => import(/* webpackChunkName: "scorecards" */ '../views/Scorecards.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/scorecard/:id/',
    name: 'scorecard',
    component: () => import(/* webpackChunkName: "scorecard" */ '../views/Scorecard.vue'),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/scorecard/:id/hole/:number',
    name: 'hole',
    component: () => import(/* webpackChunkName: "scorecard" */ '../views/Hole.vue'),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/news',
    name: 'news',
    component: () => import(/* webpackChunkName: "news" */ '../views/News.vue'),
  },
  {
    path: '/players',
    name: 'players',
    component: () => import(/* webpackChunkName: "players" */ '../views/Players.vue'),
  },
  {
    path: '/profile/:name',
    name: 'profile',
    component: () => import(/* webpackChunkName: "players" */ '../views/Profile.vue'),
    props: true,
  },
  {
    path: '/players/:id',
    name: 'player',
    component: () => import(/* webpackChunkName: "player" */ '../views/Player.vue'),
    props: true,
  }],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // Return the user to their previous position when using back/forward buttons
      return savedPosition;
    }
    // Scroll to top for all other route navigations
    return { x: 0, y: 0 };
  },
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
