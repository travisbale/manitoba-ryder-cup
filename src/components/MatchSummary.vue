<template>
  <router-link :to="{ name: 'scorecard', params: { id }}" class="block">
    <div class="flex items-center text-center py-1">
      <div class="w-2/5 py-1 bg-gradient-to-l" :class="blueGradientClass">
        {{ blueName }}
      </div>
      <div class="w-1/5 py-2 shadow-md rounded border border-grey-400 font-semibold bg-white capitalize tracking-tight">
        {{ score }}
      </div>
      <div class="w-2/5 py-1 bg-gradient-to-r" :class="redGradientClass">
        {{ redName }}
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

    blueName: {
      type: String,
      required: true,
    },

    redName: {
      type: String,
      required: true,
    },

    score: {
      type: String,
      required: true,
    },
  },

  data() {
    return {};
  },

  computed: {
    redGradientClass() {
      return {
        'from-red-400': this.id > 1 && this.id !== 4,
        'from-grey-200': this.id < 2 || this.id === 4,
      };
    },

    blueGradientClass() {
      return {
        'from-blue-400': this.id === 0,
        'from-grey-200': this.id > 0,
      };
    },
  },
};
</script>
