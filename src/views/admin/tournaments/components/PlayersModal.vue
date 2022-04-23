<template>
  <base-modal :is-open="isOpen" v-on="$listeners">
    <template v-slot:header>
      Add Participants
    </template>
    <template v-slot:body>
      <div class="-m-4">
        <player-tile
          v-for="(player, index) in players"
          :key="index"
          v-bind="player"
          :selected="playerSelections[index].selected"
          :selected-color="teamColor"
          class="p-4"
          @click="selectPlayer(index)"
        />
      </div>
    </template>
    <template v-slot:footer>
      <div class="flex justify-end">
        <base-button type="secondary" class="mr-2" @click="close">
          Cancel
        </base-button>
        <base-button :loading="saving" @click="addPlayers()">
          Add
        </base-button>
      </div>
    </template>
  </base-modal>
</template>

<script>
import { mapActions } from 'vuex';

import BaseButton from '@/components/buttons/BaseButton';
import BaseModal from '@/components/modals/base-modal';

import PlayerTile from './PlayerTile';

export default {
  components: { BaseButton, BaseModal, PlayerTile },

  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    tournamentId: {
      type: Number,
      required: true,
    },
    teamColor: {
      type: String,
      required: true,
      validator: (teamColor) => ['Red', 'Blue'].indexOf(teamColor) !== -1,
    },
    players: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      saving: false,
      playerSelections: [],
    };
  },

  watch: {
    players(newValues) {
      this.playerSelections = [];

      newValues.forEach((p) => {
        this.playerSelections.push({
          player: p,
          selected: false,
        });
      });
    },
  },

  methods: {
    ...mapActions('players', ['saveTeamMembers']),

    close() {
      this.playerSelections.forEach((s) => { s.selected = false; });
      this.$emit('close');
    },

    selectPlayer(index) {
      this.playerSelections[index].selected = !this.playerSelections[index].selected;
    },

    getSelectedPlayers() {
      return this.playerSelections.filter((s) => s.selected).map((s) => s.player);
    },

    deselectPlayer(player) {
      const index = this.selectedPlayers.findIndex((p) => p.id === player.id);
      this.selectedPlayers.splice(index, 1);
    },

    addPlayers() {
      this.saving = true;

      this.saveTeamMembers({
        tournamentId: this.tournamentId,
        teamColor: this.teamColor,
        players: this.getSelectedPlayers(),
      }).then(() => {
        this.close();
        this.$toaster.success('Players added');
      }).catch((error) => {
        if (error.response && error.response.data) {
          this.$toaster.error(error.response.data.message);
        }
      }).finally(() => {
        this.saving = false;
      });
    },
  },
};
</script>
