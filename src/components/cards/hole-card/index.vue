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
          <div class="flex justify-between text-3xl">
            <div class="text-center pt-2">
              <div class="inline-block rounded ml-2 mb-3 px-3 leading-normal border border-grey-300 whitespace-pre"
                   :class="{'text-white bg-blue-800': blueTeamScore < redTeamScore}"
              >
                {{ blueTeamScore }}
              </div>
            </div>
            <div class="text-center pt-2 w-28">
              <div class="font-semibold uppercase rounded mb-3 leading-normal border whitespace-pre"
                   :class="{
                     'bg-red-50 border-red-100': matchStatus > 0,
                     'bg-blue-50 border-blue-100': matchStatus < 0,
                     'border-grey-300': matchStatus == 0 || matchStatus == null
                   }"
              >
                <match-status :status-text="statusText" font-size="text-2xl" shrink-words />
              </div>
            </div>
            <div class="text-center pt-2">
              <div class="inline-block rounded mr-2 mb-3 px-3 leading-normal border border-grey-300 whitespace-pre"
                   :class="{'text-white bg-red-800': redTeamScore < blueTeamScore}"
              >
                {{ redTeamScore }}
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
import MatchStatus from '@/components/MatchStatus';

export default {
  components: { BaseCard, MatchStatus },

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

    blueTeamScore: {
      type: Number,
      default: null,
    },

    redTeamScore: {
      type: Number,
      default: null,
    },

    matchStatus: {
      type: Number,
      default: null,
    },

    statusText: {
      type: String,
      default: ' ',
    },
  },

  computed: {
    blueTeamName() {
      return this.getTeamName('Blue');
    },

    redTeamName() {
      return this.getTeamName('Red');
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
  },
};
</script>
