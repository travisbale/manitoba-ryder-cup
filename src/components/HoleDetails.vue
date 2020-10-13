<template>
  <tr class="border-b border-grey-400 text-center">
    <td class="px-4 py-2 border-r border-grey-300">
      {{ number }}
    </td>
    <td class="px-3 py-2 border-r border-grey-300">
      {{ par }}
    </td>
    <td class="px-3 py-2 border-r border-grey-500" :class="blueColorClass">
      {{ blueScore }}
    </td>
    <td class="px-3 py-2 border-r border-grey-500 font-bold shadow-2xl" :class="matchColorClass">
      {{ matchScore }}
    </td>
    <td class="px-3 py-2" :class="redColorClass">
      {{ redScore }}
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      required: true,
    },

    par: {
      type: Number,
      required: true,
    },

    redScore: {
      type: Number,
      required: true,
    },

    matchScore: {
      type: String,
      required: true,
    },

    blueScore: {
      type: Number,
      required: true,
    },

    leader: {
      type: String,
      required: true,
    },
  },

  computed: {
    redColorClass() {
      return {
        'bg-red-300': this.redScore < this.blueScore,
      };
    },

    blueColorClass() {
      return {
        'bg-blue-300': this.blueScore < this.redScore,
      };
    },

    matchColorClass() {
      return {
        'bg-blue-300': this.leader === 'blue',
        'bg-red-300': this.leader === 'red',
        'bg-white': this.leader === 'null',
      };
    },
  },
};
</script>
