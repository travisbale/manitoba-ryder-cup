<template>
  <div class="flex justify-center flex-grow bg-cover" :style="style">
    <div class="w-4/5">
      <page-header class="text-white mt-16 mb-8">
        Welcome Back
      </page-header>
      <base-alert v-if="errorMessage" variant="danger" class="mb-6">
        {{ errorMessage }}
      </base-alert>
      <base-input v-model="email" type="email" placeholder="Email Address" class="mb-6" />
      <base-input v-model="password" type="password" placeholder="Password" class="mb-12" @keyup.enter="login" />
      <base-button class="w-full" :loading="loggingIn" @click="login">
        {{ loginButtonText }}
      </base-button>
    </div>
  </div>
</template>

<script>
import HttpStatus from 'http-status-codes';
import { mapActions } from 'vuex';

import BaseAlert from '@/components/BaseAlert';
import BaseButton from '@/components/BaseButton';
import BaseInput from '@/components/forms/BaseInput';
import PageHeader from '@/components/typography/PageHeader';

export default {
  components: { BaseAlert, BaseButton, BaseInput, PageHeader },

  data() {
    return {
      email: '',
      password: '',
      loggingIn: false,
      errorMessage: '',
      imageUrl: 'img/empty-course.jpg',
    };
  },

  computed: {
    loginButtonText() {
      return this.loggingIn ? 'Logging In' : 'Login';
    },

    style() {
      return `background-image: url(${this.imageUrl})`;
    },
  },

  created() {
    this.$emit('set-bg-image', 'img/tee-it-up.jpg');
  },

  methods: {
    ...mapActions({ submitCredentials: 'currentUser/login' }),

    login() {
      this.loggingIn = true;

      const creds = {
        email: this.email,
        password: this.password,
      };

      this.submitCredentials(creds).then(() => {
        if (this.$route.params.nextUrl != null) {
        // Redirect the user to whatever page theyi were trying to access
          this.$router.push(this.$route.params.nextUrl);
        } else {
        // Otherwise take them to the dashboard page
          this.$router.push({ name: 'leaderboard', params: { tournamentId: 1 } });
        }
      }).catch((error) => {
        this.password = '';

        if (error.response && error.response.status === HttpStatus.UNAUTHORIZED) {
          this.errorMessage = 'Incorrect username or password';
        } else {
          this.errorMessage = 'Sorry, something went wrong';
        }
      }).finally(() => { this.loggingIn = false; });
    },
  },
};
</script>
