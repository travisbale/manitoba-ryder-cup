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
    path: '/schedule',
    name: 'schedule',
    component: () => import(/* webpackChunkName: "schedule" */ '../views/Schedule.vue'),
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
    path: '/news',
    name: 'news',
    component: () => import(/* webpackChunkName: "news" */ '../views/News.vue'),
  },
  {
    path: '/news/article/:articleId',
    name: 'article',
    component: () => import(/* webpackChunkName: "article" */ '../views/Article.vue'),
    props: (route) => ({
      articleId: parseInt(route.params.articleId),
    }),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/players',
    name: 'players',
    component: () => import(/* webpackChunkName: "players" */ '../views/Players.vue'),
  },
  {
    path: '/players/:playerId',
    name: 'player',
    component: () => import(/* webpackChunkName: "player" */ '../views/Player.vue'),
    props: (route) => ({
      playerId: parseInt(route.params.playerId),
    }),
  },
  {
    path: '/admin/players/:playerId',
    name: 'edit-player',
    component: () => import(/* webpackChunkName: "editPlayer" */ '../views/admin/players/EditPlayer.vue'),
    props: (route) => ({
      playerId: parseInt(route.params.playerId),
    }),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin/tournaments/:tournamentId',
    name: 'edit-tournament',
    component: () => import(/* webpackChunkName: "editTournament" */ '../views/admin/tournaments/EditTournament.vue'),
    props: (route) => ({
      tournamentId: parseInt(route.params.tournamentId),
    }),
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
    path: '/not-found',
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
      if (!requiresAdmin || store.getters.currentUser.isAdmin) {
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
