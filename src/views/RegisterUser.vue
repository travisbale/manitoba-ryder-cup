<template>
  <base-page image-url="/img/clubhouse-green.webp">
    <template #header>
      Create Account
    </template>
    <div class="p-4 pt-6">
      <section-header class="mb-4">
        Set password
      </section-header>
      <p class="mb-8">
        Set a password to finish creating your account. After creating your
        account you will be able to log in and save scores for your matches.
      </p>
      <base-alert v-if="errorMessage" variant="error" class="mb-6">
        {{ errorMessage }}
      </base-alert>
      <base-input v-model="password" type="password" label="Password" />
      <base-input v-model="confirmPassword" type="password" label="Confirm Password" />
      <base-button class="w-full py-4 mt-4" :loading="registering" @click="registerUser">
        Complete Registration
      </base-button>
    </div>
  </base-page>
</template>

<script>
import { mapActions } from 'vuex';

import BaseAlert from '@/components/BaseAlert';
import BaseButton from '@/components/buttons/BaseButton';
import BaseInput from '@/components/forms/BaseInput';
import BasePage from '@/components/layout/BasePage';
import SectionHeader from '@/components/typography/SectionHeader';

export default {
  components: { BaseAlert, BaseButton, BaseInput, BasePage, SectionHeader },

  props: {
    token: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      errorMessage: '',
      password: '',
      confirmPassword: '',
      registering: false,
    };
  },

  methods: {
    ...mapActions('currentUser', ['register']),

    registerUser() {
      if (this.password === '' || this.password == null) {
        this.errorMessage = 'Password cannot be empty';
      } else if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
      } else {
        this.registering = true;

        this.register({ token: this.token, password: this.password }).then(() => {
          this.errorMessage = '';
          this.$router.push({ name: 'news' }).then(() => {
            this.$toaster.push('Account created');
          });
        })
          .catch(() => { this.errorMessage = 'Registration failed'; })
          .finally(() => { this.registering = false; });
      }
    },
  },
};
</script>
