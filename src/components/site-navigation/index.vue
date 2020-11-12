<template>
  <div>
    <nav class="flex items-center justify-between py-3 bg-grey-900">
      <div class="flex items-center">
        <img class="h-16 w-16 object-contain mr-2" src="/img/manitoba-ryder-cup.png" alt="Manitoba Ryder Cup" />
        <router-link :to="{ name: 'leaderboard' }" class="block text-grey-200 text-2xl font-semibold">
          Manitoba Ryder Cup
        </router-link>
      </div>
      <div>
        <button type="button" class="block text-grey-200 hover:text-white mr-3" @click="openNav">
          <menu-icon class="h-12 w-12 focus:outline-none" />
        </button>
        <div v-show="navOpen" class="z-10 fixed inset-0 transition-opacity" @keydown.esc="closeNav">
          <div class="absolute inset-0 bg-black opacity-50" tabindex="0" @click="closeNav" />
        </div>
        <aside class="transform fixed w-84 h-screen right-0 top-0 duration-300 ease-in-out bg-grey-900 z-20 text-grey-300" :class="translationClass">
          <div class="px-4 pt-4 pb-3 mb-2 font-semibold text-sm tracking-wide bg-grey-800 uppercase">
            Manitoba Ryder Cup
          </div>
          <menu-link to="leaderboard" @click.native="navOpen = false">
            <leaderboard-icon class="mr-4" />
            Leaderboard
          </menu-link>
          <menu-link to="players" @click.native="navOpen = false">
            <groups-icon class="mr-4" />
            Players
          </menu-link>
          <menu-link to="news" @click.native="navOpen = false">
            <newspaper-icon class="mr-4" />
            News
          </menu-link>
          <menu-link to="about" @click.native="navOpen = false">
            <trophy-icon class="mr-4" />
            Tournament Info
          </menu-link>
          <menu-link to="history" @click.native="navOpen = false">
            <history-icon class="mr-4" />
            Past Results
          </menu-link>

          <div v-if="isAdmin">
            <menu-header>
              Admin
            </menu-header>
            <menu-link to="tournament-setup" @click.native="navOpen = false">
              <bracket-icon class="mr-4" />
              Tournament Setup
            </menu-link>
            <menu-link to="courses" @click.native="navOpen = false">
              <add-users-icon class="mr-4" />
              Player Management
            </menu-link>
            <menu-link to="courses" @click.native="navOpen = false">
              <publish-icon class="mr-4" />
              Press Releases
            </menu-link>
            <menu-link to="courses" @click.native="navOpen = false">
              <golf-course-icon class="mr-4" />
              Course Management
            </menu-link>
          </div>

          <menu-header>
            Account
          </menu-header>
          <div v-if="isLoggedIn">
            <menu-link to="profile" :params="{ name: 'name' }" @click.native="navOpen = false">
              <person-icon class="mr-4" />
              Profile
            </menu-link>
            <menu-link to="scorecards" @click.native="navOpen = false">
              <golf-ball-icon class="mr-4" />
              Scorecards
            </menu-link>
            <menu-link to="login" @click.native="logUserOut">
              <login-icon class="mr-4" />
              Logout
            </menu-link>
          </div>
          <div v-else>
            <menu-link to="login" @click.native="navOpen = false">
              <login-icon class="mr-4" />
              Sign in
            </menu-link>
          </div>
        </aside>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import AddUsersIcon from '@/components/icons/AddUsersIcon';
import BracketIcon from '@/components/icons/BracketIcon';
import GolfBallIcon from '@/components/icons/GolfBallIcon';
import GolfCourseIcon from '@/components/icons/GolfCourseIcon';
import GroupsIcon from '@/components/icons/GroupsIcon';
// import InfoIcon from '@/components/icons/InfoIcon';
import HistoryIcon from '@/components/icons/HistoryIcon';
import LeaderboardIcon from '@/components/icons/LeaderboardIcon';
import LoginIcon from '@/components/icons/LoginIcon';
import MenuIcon from '@/components/icons/MenuIcon';
import NewspaperIcon from '@/components/icons/NewspaperIcon';
import PersonIcon from '@/components/icons/PersonIcon';
import PublishIcon from '@/components/icons/PublishIcon';
import TrophyIcon from '@/components/icons/TrophyIcon';

import MenuHeader from './MenuHeader';
import MenuLink from './MenuLink';

export default {
  components: {
    AddUsersIcon,
    NewspaperIcon,
    BracketIcon,
    GolfCourseIcon,
    GolfBallIcon,
    GroupsIcon,
    HistoryIcon,
    // InfoIcon,
    LeaderboardIcon,
    LoginIcon,
    MenuIcon,
    MenuLink,
    MenuHeader,
    PersonIcon,
    PublishIcon,
    TrophyIcon,
  },

  data() {
    return {
      navOpen: false,
      menuOpen: false,
    };
  },

  computed: {
    ...mapState('currentUser', ['currentUser']),
    ...mapGetters('currentUser', ['isLoggedIn', 'isAdmin']),

    translationClass() {
      return {
        'translate-x-0': this.navOpen,
        'translate-x-full': !this.navOpen,
      };
    },
  },

  created() {
    // Check to see if the user is currently logged in
    this.refresh();
  },

  methods: {
    ...mapActions('currentUser', ['refresh', 'logout']),

    openNav() {
      this.navOpen = true;
    },

    closeNav() {
      this.navOpen = false;
    },

    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },

    logUserOut() {
      this.logout().then(() => {
        console.log('logged out');
      }).catch((error) => {
        console.log(error);
      }).finally(() => { this.closeNav(); });
    },
  },
};
</script>
