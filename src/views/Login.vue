<template>
  <div class="h-screen flex flex-col">
    <site-navigation />
    <div class="flex justify-center flex-grow bg-cover" :style="style">
      <div class="w-4/5 md:w-3/4 lg:w-2/5 lg:container lg:mx-auto">
        <h1 class="font-bold text-3xl text-center text-white mt-16 mb-12">
          Welcome Back
        </h1>
        <base-alert v-if="errorMessage" variant="error" class="mb-6">
          {{ errorMessage }}
        </base-alert>
        <base-input v-model="email" type="email" placeholder="Email Address" class="mb-6" />
        <base-input v-model="password" type="password" placeholder="Password" @keyup.enter="login" />
        <router-link :to="{ name: 'forgot-password'}" class="block">
          <div class="flex justify-end mb-12 -mt-5 mr-1 text-sm text-purple-800 underline">
            Forgot your password?
          </div>
        </router-link>
        <base-button class="w-full py-4" :loading="loggingIn" @click="login">
          {{ loginButtonText }}
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import HttpStatus from 'http-status-codes';
import { mapActions } from 'vuex';

import BaseAlert from '@/components/BaseAlert';
import BaseButton from '@/components/buttons/BaseButton';
import BaseInput from '@/components/forms/BaseInput';
import SiteNavigation from '@/components/site-navigation';

export default {
  components: { BaseAlert, BaseButton, BaseInput, SiteNavigation },

  data() {
    return {
      email: '',
      password: '',
      loggingIn: false,
      errorMessage: '',
      imageUrl: 'img/empty-course.webp',
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
      if (this.email === '' || this.password === '') {
        this.errorMessage = 'Email and password are required';
      } else {
        this.loggingIn = true;

        const creds = {
          email: this.email,
          password: this.password,
        };

        this.submitCredentials(creds).then(() => {
          this.$router.push({ name: 'news' }).then(() => {
            this.$toaster.success('Logged in');
          });
        }).catch((error) => {
          this.password = '';

          if (error.response && error.response.status === HttpStatus.UNAUTHORIZED) {
            this.errorMessage = error.response.data.message;
          } else {
            this.errorMessage = 'Sorry, something went wrong';
          }
        }).finally(() => { this.loggingIn = false; });
      }
    },
  },
};
</script>
