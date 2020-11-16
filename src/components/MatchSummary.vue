<template>
  <router-link :to="{ name: 'scorecard', params: { matchId: id }}" class="block">
    <div class="flex items-center text-center py-2">
      <div class="w-2/5 p-2 shadow rounded-l border border-r-0 border-grey-300 bg-gradient-to-r truncate" :class="blueTeamClasses">
        {{ blueTeam }}
      </div>
      <div class="w-1/5 py-3 text-lg shadow-md rounded border border-grey-300 font-bold bg-white uppercase tracking-wide">
        {{ score.status }}
      </div>
      <div class="w-2/5 p-2 shadow rounded-r border border-l-0 border-grey-300 bg-gradient-to-l truncate" :class="redTeamClasses">
        {{ redTeam }}
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },

    courseId: {
      type: Number,
      required: true,
    },

    teeColorId: {
      type: Number,
      required: true,
    },

    participants: {
      type: Array,
      required: true,
    },

    score: {
      type: Object,
      required: true,
    },
  },

  computed: {
    redTeam() {
      return this.getTeamName('Red');
    },

    blueTeam() {
      return this.getTeamName('Blue');
    },

    redTeamClasses() {
      return {
        'bg-red-300 font-semibold': this.score.leader === 'Red',
        'bg-grey-200': this.score.leader !== 'Red',
      };
    },

    blueTeamClasses() {
      return {
        'bg-blue-300 font-semibold': this.score.leader === 'Blue',
        'bg-grey-200': this.score.leader !== 'Blue',
      };
    },
  },

  methods: {
    getTeamName(team) {
      const players = this.participants.filter((p) => p.team === team);

      if (players.length === 1) {
        return players[0].lastName;
      }

      return `${players[0].lastName} / ${players[1].lastName}`;
    },
  },
};
</script>
