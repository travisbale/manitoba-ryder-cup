<template>
  <base-page image-url="/img/fairway.webp">
    <template #header>
      Reset Password
    </template>
    <div class="p-4 pt-6">
      <div v-if="emailSent">
        <p class="mb-8">
          If the email address you provided is linked to an account you will receive an email with instructions
          on how to reset your password.
        </p>
      </div>
      <div v-else>
        <p class="mb-8">
          To reset your password, please provide the email address associated with your Manitoba Ryder Cup account.
        </p>
        <base-input v-model="email" type="email" label="Email Address" />
        <base-button class="w-full py-4 mt-4" :loading="sending" @click="sendResetInstructions">
          Send Reset Instructions
        </base-button>
      </div>
    </div>
  </base-page>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton';
import BaseInput from '@/components/forms/BaseInput';
import BasePage from '@/components/layout/BasePage';

import axios from '@/lib/axios';

export default {
  components: { BasePage, BaseButton, BaseInput },

  data() {
    return {
      email: '',
      sending: false,
      emailSent: false,
    };
  },

  methods: {
    sendResetInstructions() {
      // console.log('send instructions');
      this.sending = true;

      axios.post('forgot-password', { email: this.email }).finally(() => {
        this.sending = false;
        this.emailSent = true;
      });
    },
  },
};
</script>
