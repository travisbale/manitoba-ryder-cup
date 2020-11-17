import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'splash',
    component: () => import(/* webpackChunkName: "splash" */ '../views/Splash.vue'),
  },
  {
    path: '/tournaments/:tournamentId',
    name: 'leaderboard',
    component: () => import(/* webpackChunkName: "leaderboard" */ '../views/Leaderboard.vue'),
    props: (route) => ({
      tournamentId: parseInt(route.params.tournamentId),
    }),
  },
  {
    path: '/tournaments/:tournamentId/matches/:matchId',
    name: 'scorecard',
    component: () => import(/* webpackChunkName: "scorecard" */ '../views/Scorecard.vue'),
    props: (route) => ({
      tournamentId: parseInt(route.params.tournamentId),
      matchId: parseInt(route.params.matchId),
    }),
  },
  {
    path: '/tournaments/:tournamentId/matches/:matchId/hole/:number',
    name: 'hole',
    component: () => import(/* webpackChunkName: "scorecard" */ '../views/Hole.vue'),
    props: (route) => ({
      tournamentId: parseInt(route.params.tournamentId),
      matchId: parseInt(route.params.matchId),
      number: parseInt(route.params.number),
    }),
    meta: {
      requiresAuth: true,
    },
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
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/history',
    name: 'history',
    component: () => import(/* webpackChunkName: "history" */ '../views/History.vue'),
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import(/* webpackChunkName: "courses" */ '../views/Courses.vue'),
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
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/admin/Admin.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin/tournaments',
    name: 'tournament-setup',
    component: () => import(/* webpackChunkName: "tournamentSetup" */ '../views/admin//tournaments/TournamentSetup.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin/tournaments/:id',
    name: 'tournament-form',
    component: () => import(/* webpackChunkName: "tournamentSetup" */ '../views/admin/tournaments/TournamentForm.vue'),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: () => import(/* webpackChunkName: "unauthorized" */ '../views/Unauthorized.vue'),
  },
  {
    path: '/404',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue'),
  },
  {
    path: '*',
    redirect: '/not-found',
  }],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // Return the user to their previous position when using back/forward buttons
      return savedPosition;
    }
    // Scroll to top when navigating to all other routes
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);

  // Check if the user is going to a page that requires authentication and they didn't just login
  if ((requiresAuth || requiresAdmin) && from.name !== 'login') {
    // Try to get a new access token and redirect the user to the appropriate page
    store.dispatch('currentUser/refresh').then(() => {
      if (!requiresAdmin || store.getters.user.isAdmin) {
        next();
      } else {
        next({ name: 'unauthorized' });
      }
    }).catch(() => next({ name: 'login' }));
  } else {
    next();
  }
});

export default router;
