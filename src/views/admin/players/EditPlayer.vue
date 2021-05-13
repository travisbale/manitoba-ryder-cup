<template>
  <base-page image-url="/img/ocean-hills.webp">
    <template v-slot:header>
      <div v-if="playerId > 0">
        Edit Player
      </div>
      <div v-else>
        Create Player
      </div>
    </template>
    <div class="p-4">
      <base-input v-if="playerId == 0" v-model="email" label="Email" :valid.sync="isFirstNameValid" required />
      <base-input v-model="firstName" label="First Name" :valid.sync="isLastNameValid" required />
      <base-input v-model="lastName" label="Last Name" :valid.sync="isEmailValid" required />
      <file-upload v-model="pictureList" accept="image/*" label="Profile Picture" />
      <base-textarea v-model="biography" label="Scouting Report" />

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
import BaseTextarea from '@/components/forms/BaseTextarea';
import FileUpload from '@/components/forms/FileUpload';

export default {
  components: { BaseButton, BaseInput, BasePage, BaseTextarea, FileUpload },

  props: {
    playerId: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      saving: false,
      player: {},
      isFirstNameValid: true,
      isLastNameValid: true,
      isEmailValid: true,
      pictureList: null,
    };
  },

  computed: {
    ...mapGetters('players', ['getPlayer']),

    firstName: {
      get() {
        return this.player.firstName || '';
      },
      set(value) {
        this.player.firstName = value;
      },
    },

    lastName: {
      get() {
        return this.player.lastName || '';
      },
      set(value) {
        this.player.lastName = value;
      },
    },

    email: {
      get() {
        return this.player.email || '';
      },
      set(value) {
        this.player.email = value;
      },
    },

    biography: {
      get() {
        return this.player.biography || '';
      },
      set(value) {
        this.player.biography = value;
      },
    },

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
    this.fetchPlayer(this.playerId).then((player) => {
      this.player = player;
    });
  },

  methods: {
    ...mapActions('players', ['fetchPlayer', 'savePlayer', 'savePlayerPhoto']),

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
                this.$router.push(this.getPreviousPage());
              }).finally(() => { this.saving = false; });
            } else {
              this.$router.push(this.getPreviousPage());
            }
          })
          .finally(() => { this.saving = false; });
      }
    },

    getPreviousPage() {
      if (this.playerId > 0) {
        return { name: 'player', param: { playerId: this.playerId } };
      }
      return { name: 'players' };
    },

    validatePlayer() {
      return this.isFirstNameValid && this.isLastNameValid && this.isEmailValid;
    },
  },
};
</script>
