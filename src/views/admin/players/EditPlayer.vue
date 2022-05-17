<template>
  <base-page back-link-text="Tour Players" :back-link-route="{ name: 'players' }" image-url="/img/ocean-hills.webp">
    <template v-slot:header>
      <div v-if="playerId > 0">
        Edit Player
      </div>
      <div v-else>
        Add New Player
      </div>
    </template>
    <div class="p-4 pt-6">
      <base-input v-model="player.email" :disabled="playerId > 0" label="Email" :valid.sync="isFirstNameValid" required />
      <base-input v-model="player.firstName" label="First Name" :valid.sync="isLastNameValid" required />
      <base-input v-model="player.lastName" label="Last Name" :valid.sync="isEmailValid" required />
      <file-upload v-model="pictureList" accept="image/*" label="Profile Picture" />
      <base-label class="mb-2">
        Player Tier
      </base-label>
      <div class="flex">
        <base-radio v-model="player.tier" name="tier" value="white" label="White" class="mr-20" />
        <base-radio v-model="player.tier" name="tier" value="blue" label="Blue" class="mr-20" />
        <base-radio v-model="player.tier" name="tier" value="gold" label="Gold" class="mr-20" />
      </div>
      <base-textarea v-model="player.biography" label="Scouting Report" />

      <div class="flex justify-between mt-8">
        <div>
          <base-button v-if="player.id > 0" type="primary" :disabled="invitationSent" @click="sendInvitation">
            Send Invitation
          </base-button>
        </div>

        <div class="flex justify-end">
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
    </div>
  </base-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import BaseButton from '@/components/buttons/BaseButton';
import BaseInput from '@/components/forms/BaseInput';
import BaseLabel from '@/components/forms/BaseLabel';
import BasePage from '@/components/layout/BasePage';
import BaseRadio from '@/components/forms/BaseRadio';
import BaseTextarea from '@/components/forms/BaseTextarea';
import FileUpload from '@/components/forms/FileUpload';

export default {
  components: { BaseButton, BaseInput, BaseLabel, BasePage, BaseRadio, BaseTextarea, FileUpload },

  props: {
    playerId: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      saving: false,
      player: { email: '', firstName: '', lastName: '', biography: '', tier: 'white' },
      isFirstNameValid: true,
      isLastNameValid: true,
      isEmailValid: true,
      pictureList: null,
      invitationSent: false,
    };
  },

  computed: {
    ...mapGetters('players', ['getPlayer']),

    picture() {
      if (this.pictureList != null) {
        const formData = new FormData();
        formData.append('photo', this.pictureList[0], this.pictureList[0].name);
        return formData;
      }

      return null;
    },
  },

  mounted() {
    if (this.playerId > 0) {
      this.fetchPlayer(this.playerId).then((player) => {
        this.player = player;
      });
    }
  },

  methods: {
    ...mapActions('players', ['fetchPlayer', 'savePlayer', 'savePlayerPhoto', 'sendAccountCreationEmail']),

    clickSavePlayer() {
      if (this.firstName === '') this.isFirstNameValid = false;
      if (this.lastName === '') this.isLastNameValid = false;
      if (this.email === '') this.isEmailValid = false;

      if (this.validatePlayer()) {
        this.saving = true;

        this.savePlayer(this.player)
          .then((player) => {
            if (this.picture) {
              this.savePlayerPhoto({ playerId: player.id, formData: this.picture }).then(() => {
                this.goToPreviousPage();
              }).finally(() => { this.saving = false; });
            } else {
              this.goToPreviousPage();
            }
          })
          .finally(() => { this.saving = false; });
      }
    },

    sendInvitation() {
      this.sendAccountCreationEmail(this.player.id).then(() => {
        this.$toaster.success('Account creation email sent');
        this.invitationSent = true;
      });
    },

    getPreviousPage() {
      if (this.playerId > 0) {
        return { name: 'player', param: { playerId: this.playerId } };
      }
      return { name: 'players' };
    },

    goToPreviousPage() {
      this.$router.push(this.getPreviousPage()).then(() => {
        if (this.playerId > 0) {
          this.$toaster.success('Player updated');
        } else {
          this.$toaster.success('Player created');
        }
      });
    },

    validatePlayer() {
      return this.isFirstNameValid && this.isLastNameValid && this.isEmailValid;
    },
  },
};
</script>
