<template>
  <div class="flex justify-center">
    <div class="w-4/5 mt-8">
      <div class="flex justify-center">
        <img class="h-48 mb-8" src="/img/manitoba-ryder-cup.png" alt="Manitoba Ryder Cup" />
      </div>
      <h2 class="font-open-sans-bold text-3xl uppercase mb-8">
        Login
      </h2>
      <base-alert v-if="errorMessage" variant="danger">
        {{ errorMessage }}
      </base-alert>
      <base-label>Email</base-label>
      <base-input v-model="email" type="email" placeholder="example@email.com" />
      <base-label>Password</base-label>
      <base-input v-model="password" type="password" @keyup.enter="login" />
      <base-button class="w-full mt-8 py-4" :loading="loggingIn" @click="login">
        {{ loginButtonText }}
      </base-button>
    </div>
  </div>
</template>

<script>
import BaseAlert from '@/components/BaseAlert.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseLabel from '@/components/forms/BaseLabel.vue';
import BaseInput from '@/components/forms/BaseInput.vue';
import HttpStatus from 'http-status-codes';
import { mapActions } from 'vuex';

export default {
  components: {
    BaseAlert, BaseButton, BaseLabel, BaseInput,
  },

  data() {
    return {
      email: '',
      password: '',
      loggingIn: false,
      errorMessage: '',
    };
  },

  computed: {
    loginButtonText() {
      return this.loggingIn ? 'Logging In' : 'Login';
    },
  },

  methods: {
    ...mapActions({ submitCredentials: 'auth/login' }),

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
          this.$router.push({ name: 'leaderboard' });
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
