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
    <players-modal
      :is-open="modalOpen"
      :tournament-id="tournamentId"
      :team-color="teamColor"
      :players="availablePlayers"
      @close="modalOpen = false"
    />
    <floating-action-button action="add" @click="modalOpen = true" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import FloatingActionButton from '@/components/buttons/FloatingActionButton';
import PlayerTile from './PlayerTile';

import PlayersModal from './PlayersModal';

export default {
  components: { FloatingActionButton, PlayersModal, PlayerTile },

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
    };
  },

  methods: {
    ...mapActions('players', ['deleteTeamMembers']),

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

    deleteParticipant(playerId) {
      console.log(`playerId: ${playerId}`);
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
