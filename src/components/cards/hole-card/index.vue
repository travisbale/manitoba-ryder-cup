<template>
  <router-link :to="{ name: 'hole', params: { matchId, number }}" class="block">
    <base-card class="mb-4">
      <div class="flex">
        <div class="text-center mr-8">
          <div class="font-bold text-6xl leading-none">
            {{ number }}
          </div>
          <div class="text-sm text-grey-700">
            Par {{ par }}
          </div>
        </div>
        <div class="flex-grow">
          <div class="flex justify-between">
            <div class="text-center pt-2">
              <div class="inline-block rounded ml-3 mb-3 text-3xl px-3 leading-normal border border-grey-300"
                   :class="{'text-white bg-blue-700': blueTeamStrokes < redTeamStrokes}"
              >
                {{ blueTeamStrokes }}
              </div>
            </div>
            <div class="text-center pt-2 w-28">
              <div class="text-3xl font-bold uppercase rounded mb-3 leading-normal border border-grey-300">
                {{ "AS" }}
              </div>
            </div>
            <div class="text-center pt-2">
              <div class="inline-block rounded mr-3 mb-3 text-3xl px-3 leading-normal border border-grey-300"
                   :class="{'text-white bg-red-700': redTeamStrokes < blueTeamStrokes}"
              >
                {{ redTeamStrokes }}
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="text-sm leading-none text-grey-700">
              {{ blueTeamName }}
            </div>
            <div class="text-sm leading-none text-grey-700">
              {{ redTeamName }}
            </div>
          </div>
        </div>
      </div>
    </base-card>
  </router-link>
</template>

<script>
import BaseCard from '@/components/cards/base-card';

export default {
  components: { BaseCard },

  props: {
    number: {
      type: Number,
      required: true,
    },

    par: {
      type: Number,
      required: true,
    },

    matchId: {
      type: Number,
      required: true,
    },

    participants: {
      type: Array,
      required: true,
    },

    scores: {
      type: Array,
      required: true,
    },
  },

  computed: {
    blueTeamName() {
      return this.getTeamName('Blue');
    },

    redTeamName() {
      return this.getTeamName('Red');
    },

    blueTeamStrokes() {
      return this.getTeamStrokes('Blue');
    },

    redTeamStrokes() {
      return this.getTeamStrokes('Red');
    },
  },

  methods: {
    getTeamName(team) {
      // Reduce the list of players to only those on the given team
      const players = this.participants.filter((p) => p.team === team);

      if (players.length === 1) {
        // Singles match team name is just the player's last name
        return players[0].lastName;
      }

      // Team of two is both last names separated by "/"
      return `${players[0].lastName} / ${players[1].lastName}`;
    },

    getTeamStrokes(team) {
      if (this.scores.length === 0) return '-';

      // Get the IDs of the players on the team
      const ids = this.participants.filter((p) => p.team === team).map((p) => p.playerId);
      // Reduce the list of scores to the team members' scores
      const scores = this.scores.filter((s) => ids.includes(s.playerId));
      // Return the minimum of the player's scores
      return Math.min(...scores.map((s) => s.strokes));
    },
  },
};
</script>
