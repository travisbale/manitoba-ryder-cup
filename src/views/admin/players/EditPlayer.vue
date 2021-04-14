<template>
  <base-page>
    <template v-slot:header>
      Edit Player
    </template>
    <div class="p-4">
      <section-header class="mb-4">
        Player Details
      </section-header>
      <base-input v-model="player.email" label="Email" />
      <base-input v-model="player.firstName" label="First Name" />
      <base-input v-model="player.lastName" label="Last Name" />

      <div class="flex justify-end mt-8">
        <router-link :to="getPreviousPage()" class="block">
          <base-button type="secondary" class="mr-2">
            Cancel
          </base-button>
        </router-link>
        <base-button :loading="saving" @click="clickSavePlayer">
          Save
        </base-button>
      </div>
    </div>
  </base-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import BaseButton from '@/components/buttons/BaseButton';
import BaseInput from '@/components/forms/BaseInput';
import BasePage from '@/components/layout/BasePage';
import SectionHeader from '@/components/typography/SectionHeader';

export default {
  components: { BaseButton, BaseInput, BasePage, SectionHeader },

  props: {
    playerId: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      saving: false,
      player: {
        firstName: '',
        lastName: '',
        email: '',
        hdcp: 0,
      },
    };
  },

  computed: {
    ...mapGetters('players', ['getPlayer']),
  },

  methods: {
    ...mapActions('players', ['savePlayer']),

    clickSavePlayer() {
      this.saving = true;

      this.savePlayer(this.player)
        .then(() => { this.$router.push(this.getPreviousPage()); })
        .finally(() => { this.saving = false; });
    },

    getPreviousPage() {
      if (this.playerId > 0) {
        return { name: 'player', param: { playerId: this.playerId } };
      }
      return { name: 'players' };
    },
  },
};
</script>
