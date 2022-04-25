<template>
  <div>
    <div v-if="participatingPlayers.length === 0" class="text-center mt-6">
      There are no players playing for this team
    </div>
    <div>
      <player-tile
        v-for="(player, index) in participatingPlayers"
        :key="index"
        v-bind="player"
        class="p-4"
        :deletable="true"
        @delete-player="removePlayer(player)"
      />
    </div>
    <player-selection-modal
      :is-open="modalOpen"
      :saving="addingPlayers"
      :team-color="teamColor"
      :players="availablePlayers"
      :selection-max="selectionMax"
      @close="modalOpen = false"
      @add-players="addPlayers"
    />
    <floating-action-button v-if="selectionMax > 0" action="add" @click="modalOpen = true" />
  </div>
</template>

<script>
import FloatingActionButton from '@/components/buttons/FloatingActionButton';
import PlayerSelectionModal from '@/components/modals/PlayerSelectionModal';
import PlayerTile from '@/components/tiles/PlayerTile';
import { mapActions } from 'vuex';

export default {
  components: { FloatingActionButton, PlayerSelectionModal, PlayerTile },

  props: {
    tournamentId: {
      type: Number,
      required: true,
    },

    matchId: {
      type: Number,
      required: true,
    },

    format: {
      type: String,
      required: true,
    },

    teamColor: {
      type: String,
      required: true,
      validator: (teamColor) => ['Red', 'Blue'].indexOf(teamColor) !== -1,
    },

    participatingPlayers: {
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

  computed: {
    selectionMax() {
      switch (this.format) {
        case 'Singles': return 1 - this.participatingPlayers.length;
        default: return 2 - this.participatingPlayers.length;
      }
    },
  },

  methods: {
    ...mapActions('matches', ['saveParticipants', 'deleteParticipants']),

    addPlayers(selectedPlayers) {
      const payload = {
        tournamentId: this.tournamentId,
        matchId: this.matchId,
        teamColor: this.teamColor,
        players: selectedPlayers,
      };
      this.addingPlayers = true;

      this.saveParticipants(payload).then(() => {
        this.modalOpen = false;
        this.$toaster.success('Players added');
      }).catch((error) => {
        if (error && error.response && error.response.data) {
          this.$toaster.error(error.response.data.message);
        }
      }).finally(() => {
        this.addingPlayers = false;
      });
    },

    removePlayer(player) {
      const payload = {
        tournamentId: this.tournamentId,
        matchId: this.matchId,
        players: [player],
      };

      this.deleteParticipants(payload).then(() => {
        this.$toaster.success('Player removed');
      }).catch((error) => {
        if (error && error.response && error.response.data) {
          this.$toaster.error(error.response.data.message);
        }
      });
    },
  },
};
</script>
