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
        <aside class="transform fixed w-64 h-screen left-0 top-0 duration-300 ease-in-out bg-grey-900 z-20 text-grey-200" :class="translationClass">
          Nav Menu
        </aside>
        <router-link :to="{ name: 'leaderboard' }" class="block text-grey-200 text-lg font-semibold">
          Manitoba Ryder Cup
        </router-link>
      </div>

      <router-link v-if="!isUserLoggedIn" :to="{ name: 'login' }" class="block text-grey-200" @click.native="menuOpen = false">
        <login-icon />
      </router-link>
      <div v-else class="relative" @keydown.escape="menuOpen = false">
        <button type="button" class="relative block text-grey-200 hover:text-white" @click="toggleMenu">
          <vertical-more-icon class="focus:outline-none" />
        </button>
        <div v-if="menuOpen" class="fixed inset-0 h-full w-full" tabindex="-1" @click="menuOpen = false" />
        <div v-if="menuOpen" class="absolute z-10 right-0 mt-2 w-48 py-2 bg-white border border-grey-300 rounded shadow-xl" @click="menuOpen = false">
          <router-link :to="{ name: 'account' }" class="block px-4 py-2">
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
import LoginIcon from '@/components/svg/LoginIcon.vue';
import MenuIcon from '@/components/svg/MenuIcon.vue';
import VerticalMoreIcon from '@/components/svg/VerticalMoreIcon.vue';

export default {
  components: { LoginIcon, MenuIcon, VerticalMoreIcon },

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
