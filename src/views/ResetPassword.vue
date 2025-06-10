<template>
  <base-page image-url="/img/fairway.webp">
    <template #header>
      Reset Password
    </template>
    <div class="p-4 pt-6">
      <base-alert v-if="errorMessage" variant="error" class="mb-6">
        {{ errorMessage }}
      </base-alert>
      <base-input v-model="password" type="password" label="New Password" />
      <base-input v-model="confirmPassword" type="password" label="Confirm New Password" />
      <base-button class="w-full py-4 mt-4" :loading="registering" @click="registerUser">
        Change Password
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

export default {
  components: { BaseAlert, BaseButton, BaseInput, BasePage },

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
      changing: false,
    };
  },

  methods: {
    ...mapActions('currentUser', ['changePassword']),

    registerUser() {
      if (this.password === '' || this.password == null) {
        this.errorMessage = 'Password cannot be empty';
      } else if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
      } else {
        this.changing = true;

        this.changePassword({ token: this.token, password: this.password }).then(() => {
          this.errorMessage = '';
          this.$router.push({ name: 'news' }).then(() => {
            this.$toaster.push('Password has been changed');
          });
        })
          .catch(() => { this.errorMessage = 'Password reset failed'; })
          .finally(() => { this.changing = false; });
      }
    },
  },
};
</script>
