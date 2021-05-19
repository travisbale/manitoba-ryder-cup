<template>
  <div>
    <nav class="py-2" :class="{ 'transparent': transparent, 'bg-grey-900': !transparent }">
      <div class="flex items-center justify-between lg:container lg:mx-auto">
        <div class="flex items-center h-12">
          <router-link v-if="!transparent" :to="homeLink" class="text-white text-xl font-semibold">
            <div v-if="backLinkText === ''" class="flex items-center">
              <img v-if="!transparent" class="h-12 w-12 object-contain mr-2" src="/img/manitoba-ryder-cup.webp" alt="Manitoba Ryder Cup" />
              DGA Tour
            </div>
            <div v-else class="flex items-center">
              <arrow-left-icon class="ml-2 mr-4" />
              <span>{{ backLinkText }}</span>
            </div>
          </router-link>
        </div>
        <div>
          <button type="button" class="block text-white hover:text-white mr-3" @click="openNav">
            <menu-icon class="focus:outline-none" :class="{ 'h-12 w-12': transparent }" />
          </button>
          <div v-show="navOpen" class="z-10 fixed inset-0 transition-opacity" @keydown.esc="closeNav">
            <div class="absolute inset-0 bg-black opacity-50" tabindex="0" @click="closeNav" />
          </div>
          <aside class="transform fixed w-80 h-screen right-0 top-0 duration-300 ease-in-out bg-grey-900 z-20 text-white" :class="translationClass">
            <div class="px-4 pt-4 pb-3 mb-2 font-semibold text-sm tracking-wide bg-deep-purple-800 bg-opacity-75">
              DGA Professional Tour
            </div>
            <menu-link to="schedule" @click.native="navOpen = false">
              <calendar-icon class="mr-4" />
              Schedule
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
              Tour History
            </menu-link>

            <menu-header>
              Account
            </menu-header>
            <div v-if="isLoggedIn">
              <menu-link to="scorecards" @click.native="navOpen = false">
                <golf-ball-icon class="mr-4" />
                My Rounds
              </menu-link>
              <a class="flex items-center px-4 py-2" @click="logUserOut">
                <login-icon class="mr-4" />
                Logout
              </a>
            </div>
            <div v-else>
              <menu-link to="login" @click.native="navOpen = false">
                <login-icon class="mr-4" />
                Login
              </menu-link>
            </div>
          </aside>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon';
import CalendarIcon from '@/components/icons/CalendarIcon';
import GolfBallIcon from '@/components/icons/GolfBallIcon';
import GroupsIcon from '@/components/icons/GroupsIcon';
import LoginIcon from '@/components/icons/LoginIcon';
import MenuIcon from '@/components/icons/MenuIcon';
import NewspaperIcon from '@/components/icons/NewspaperIcon';
import TrophyIcon from '@/components/icons/TrophyIcon';

import MenuHeader from './MenuHeader';
import MenuLink from './MenuLink';

export default {
  components: {
    ArrowLeftIcon,
    CalendarIcon,
    NewspaperIcon,
    GolfBallIcon,
    GroupsIcon,
    LoginIcon,
    MenuIcon,
    MenuLink,
    MenuHeader,
    TrophyIcon,
  },

  props: {
    transparent: {
      type: Boolean,
      default: false,
    },

    backLinkText: {
      type: String,
      default: '',
    },

    backLinkRoute: {
      type: Object,
      default: null,
    },
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
    ...mapGetters('tournaments', ['currentTournament']),

    translationClass() {
      return {
        'translate-x-0': this.navOpen,
        'translate-x-full': !this.navOpen,
      };
    },

    homeLink() {
      return this.backLinkRoute || { name: 'schedule' };
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
      this.logout()
        .then(() => {
          this.$toaster.basic('Logged out');
        })
        .finally(() => { this.closeNav(); });
    },
  },
};
</script>
