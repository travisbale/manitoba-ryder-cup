<template>
  <div class="font-semibold" :class="textColor">
    <div v-if="statusText.indexOf('UP') != -1" class="flex items-center">
      <span class="text-6xl">{{ statusText.substring(0, statusText.indexOf(' ')) }}</span>
      <span class="text-3xl font-bold pt-2 tracking-tighter">
        {{ statusText.substring(statusText.indexOf(' ') + 1) }}
      </span>
    </div>
    <div v-else-if="statusText.indexOf('&') != -1" class="flex items-center">
      <span class="text-6xl">{{ statusText.substring(0, statusText.indexOf(' ')) }}</span>
      <span class="text-4xl pt-1 mx-1">
        &
      </span>
      <span class="text-6xl">{{ statusText.substring(statusText.indexOf('&') + 2) }}</span>
    </div>
    <div v-else class="text-5xl py-1">
      {{ statusText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    statusText: {
      type: String,
      required: true,
    },

    matchStatus: {
      type: Number,
      required: true,
    },
  },

  computed: {
    textColor() {
      return {
        'text-blue-800': this.matchStatus < 0,
        'text-red-800': this.matchStatus > 0,
        'text-grey-900': this.matchStatus === 0,
      };
    },
  },
};
</script>
