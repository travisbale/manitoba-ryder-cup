<template>
  <router-link :to="{ name: 'scorecard', params: { id, courseId, teeColorId }}" class="block">
    <div class="flex items-center text-center py-2">
      <div class="w-2/5 p-2 shadow-md rounded-l border border-r-0 border-grey-300 bg-gradient-to-r truncate" :class="blueTeamClasses">
        {{ blueTeam }}
      </div>
      <div class="w-1/5 py-3 shadow-lg rounded border border-grey-300 font-semibold bg-white uppercase tracking-wide">
        {{ score }}
      </div>
      <div class="w-2/5 p-2 shadow-md rounded-r border border-l-0 border-grey-300 bg-gradient-to-l truncate" :class="redTeamClasses">
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

    players: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      score: 'AS',
      leadingTeam: null,
    };
  },

  computed: {
    redTeam() {
      if (this.players.length === 2) {
        return this.players[0].lastName;
      }

      return `${this.players[0].lastName} / ${this.players[1].lastName}`;
    },

    blueTeam() {
      if (this.players.length === 2) {
        return this.players[1].lastName;
      }

      return `${this.players[2].lastName} / ${this.players[3].lastName}`;
    },

    redTeamClasses() {
      return {
        'from-red-600 to-red-100': this.leadingTeam === 'Red',
        'from-grey-200': this.leadingTeam !== 'Red',
      };
    },

    blueTeamClasses() {
      return {
        'from-blue-600 to-blue-100': this.leadingTeam === 'Blue',
        'from-grey-200': this.leadingTeam !== 'Blue',
      };
    },
  },
};
</script>
