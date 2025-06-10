<template>
  <base-modal :is-open="isOpen" v-on="$listeners">
    <template #header>
      Add Participants
    </template>
    <template #body>
      <div v-if="players.length === 0" class="text-center">
        There are no players available to be selected
      </div>
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
    <template #footer>
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
import BaseButton from '@/components/buttons/BaseButton';
import BaseModal from '@/components/modals/base-modal';
import PlayerTile from '@/components/tiles/PlayerTile';

export default {
  components: { BaseButton, BaseModal, PlayerTile },

  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    saving: {
      type: Boolean,
      default: false,
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
    selectionMax: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      playerSelections: [],
      totalSelected: 0,
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

    isOpen(newValue) {
      // Clear the list of selected players when the modal closes
      if (!newValue) {
        this.playerSelections.forEach((s) => { s.selected = false; });
        this.totalSelected = 0;
      }
    },
  },

  methods: {
    close() {
      this.$emit('close');
    },

    selectPlayer(index) {
      const isSelected = this.playerSelections[index].selected;

      if (isSelected) {
        this.playerSelections[index].selected = false;
        this.totalSelected--;
      } else if (this.selectionMax === 0 || this.totalSelected < this.selectionMax) {
        this.playerSelections[index].selected = true;
        this.totalSelected++;
      } else {
        this.$toaster.error('Cannot add more players');
      }
    },

    getSelectedPlayers() {
      return this.playerSelections.filter((s) => s.selected).map((s) => s.player);
    },

    addPlayers() {
      this.$emit('add-players', this.getSelectedPlayers());
    },
  },
};
</script>
