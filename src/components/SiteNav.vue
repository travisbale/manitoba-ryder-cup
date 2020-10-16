<template>
  <div>
    <nav class="flex items-center justify-between px-4 py-3 bg-grey-900">
      <div class="flex items-center">
        <button type="button" class="block text-grey-200 hover:text-white mr-4" @click="openNav">
          <menu-icon />
        </button>
        <div v-show="navOpen" class="z-10 fixed inset-0 transition-opacity" @keydown.esc="closeNav">
          <div class="absolute inset-0 bg-black opacity-50" tabindex="0" @click="closeNav" />
        </div>
        <aside class="transform fixed w-64 h-screen left-0 top-0 duration-300 ease-in-out bg-grey-900 z-20 text-grey-300" :class="translationClass">
          <div class="p-4 font-semibold text-lg border-b border-grey-800 mb-2">
            Manitoba Ryder Cup
          </div>
          <router-link :to="{ name: 'news' }" class="flex items-center px-4 py-2" @click.native="navOpen = false">
            <article-icon class="mr-4" />
            News
          </router-link>
          <router-link :to="{ name: 'leaderboard' }" class="flex items-center px-4 py-2" @click.native="navOpen = false">
            <leaderboard-icon class="mr-4" />
            Leaderboard
          </router-link>
          <router-link :to="{ name: 'players' }" class="flex items-center px-4 py-2" @click.native="navOpen = false">
            <groups-icon class="mr-4" />
            Players
          </router-link>
          <div v-if="isUserLoggedIn">
            <div class="border-t border-grey-800 my-2" />
            <router-link :to="{ name: 'profile', params: { name: 'name' }}" class="flex items-center px-4 py-2" @click.native="navOpen = false">
              <person-icon class="mr-4" />
              My Profile
            </router-link>
            <router-link :to="{ name: 'scorecards' }" class="flex items-center px-4 py-2" @click.native="navOpen = false">
              <golf-course-icon class="mr-4" />
              My Matches
            </router-link>
          </div>
          <div v-else class="fixed bottom-0 w-full p-4">
            <router-link :to="{ name: 'login' }" class="block" @click.native="navOpen = false">
              <base-button class="w-full py-4">
                Sign in
              </base-button>
            </router-link>
          </div>
        </aside>
        <router-link :to="{ name: 'leaderboard' }" class="block text-grey-200 text-lg font-semibold">
          Manitoba Ryder Cup
        </router-link>
      </div>

      <div v-if="isUserLoggedIn" class="relative" @keydown.escape="menuOpen = false">
        <button type="button" class="relative block text-grey-200 hover:text-white" @click="toggleMenu">
          <vertical-more-icon class="focus:outline-none" />
        </button>
        <div v-if="menuOpen" class="fixed inset-0 h-full w-full" tabindex="-1" @click="menuOpen = false" />
        <div v-if="menuOpen" class="absolute z-10 right-0 mt-2 w-48 py-2 bg-white border border-grey-300 rounded shadow-xl" @click="menuOpen = false">
          <router-link v-if="isUserLoggedIn" :to="{ name: 'account' }" class="block px-4 py-2">
            Account Settings
          </router-link>
          <a v-if="isUserLoggedIn" href="#" class="block px-4 py-2" @click="logUserOut">Logout</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ArticleIcon from '@/components/icons/ArticleIcon.vue';
import BaseButton from '@/components/BaseButton.vue';
import GolfCourseIcon from '@/components/icons/GolfCourseIcon.vue';
import GroupsIcon from '@/components/icons/GroupsIcon.vue';
import LeaderboardIcon from '@/components/icons/LeaderboardIcon.vue';
import PersonIcon from '@/components/icons/PersonIcon.vue';
import MenuIcon from '@/components/icons/MenuIcon.vue';
import VerticalMoreIcon from '@/components/icons/VerticalMoreIcon.vue';

export default {
  components: {
    ArticleIcon,
    BaseButton,
    GolfCourseIcon,
    GroupsIcon,
    PersonIcon,
    LeaderboardIcon,
    MenuIcon,
    VerticalMoreIcon,
  },

  data() {
    return {
      navOpen: false,
      menuOpen: false,
    };
  },

  computed: {
    ...mapState('auth', ['user']),

    translationClass() {
      return {
        'translate-x-0': this.navOpen,
        '-translate-x-full': !this.navOpen,
      };
    },

    isUserLoggedIn() {
      return this.user != null;
    },
  },

  created() {
    // Check to see if the user is currently logged in
    this.refresh();
  },

  methods: {
    ...mapActions('auth', ['refresh', 'logout']),

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
