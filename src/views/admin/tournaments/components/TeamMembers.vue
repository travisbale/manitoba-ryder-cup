<template>
  <div>
    <div v-if="members.length === 0" class="text-center mt-6">
      There are no players assigned to this team
    </div>
    <div>
      <player-tile
        v-for="(member, index) in members"
        :key="index"
        v-bind="member"
        class="p-4"
        :deletable="true"
        @delete-player="removeMember(member)"
      />
    </div>
    <player-selection-modal
      :is-open="modalOpen"
      :saving="addingPlayers"
      :team-color="teamColor"
      :players="availablePlayers"
      @close="modalOpen = false"
      @add-players="addPlayers"
    />
    <floating-action-button action="add" @click="modalOpen = true" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import FloatingActionButton from '@/components/buttons/FloatingActionButton';
import PlayerSelectionModal from '@/components/modals/PlayerSelectionModal';
import PlayerTile from '@/components/tiles/PlayerTile';

export default {
  components: { FloatingActionButton, PlayerSelectionModal, PlayerTile },

  props: {
    tournamentId: {
      type: Number,
      required: true,
    },
    teamColor: {
      type: String,
      required: true,
      validator: (teamColor) => ['Red', 'Blue'].indexOf(teamColor) !== -1,
    },
    members: {
      type: Array,
      required: true,
    },
    availablePlayers: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      modalOpen: false,
      addingPlayers: false,
    };
  },

  methods: {
    ...mapActions('players', ['saveTeamMembers', 'deleteTeamMembers']),

    toggleSelected(player) {
      const index = this.selectedPlayers.findIndex((p) => p.id === player.id);

      if (index < 0) {
        this.selectedPlayers.push(player);
      } else {
        this.selectedPlayers.splice(index, 1);
      }
    },

    getTeamBackgroundClass(teamColor) {
      return {
        'bg-blue-800': teamColor === 'Blue',
        'bg-red-800': teamColor === 'Red',
      };
    },

    deleteParticipant() {
      // console.log(`playerId: ${playerId}`);
    },

    addPlayers(selectedPlayers) {
      this.addingPlayers = true;

      this.saveTeamMembers({
        tournamentId: this.tournamentId,
        teamColor: this.teamColor,
        players: selectedPlayers,
      }).then(() => {
        this.modalOpen = false;
        this.$toaster.success('Players added');
      }).catch((error) => {
        if (error.response && error.response.data) {
          this.$toaster.error(error.response.data.message);
        }
      }).finally(() => {
        this.addingPlayers = false;
      });
    },

    removeMember(member) {
      this.deleteTeamMembers({
        tournamentId: this.tournamentId,
        teamColor: this.teamColor,
        players: [member],
      }).then(() => {
        this.$toaster.success('Player removed');
      }).catch((error) => {
        if (error.response && error.response.data) {
          this.$toaster.error(error.response.data.message);
        }
      });
    },
  },
};
</script>
