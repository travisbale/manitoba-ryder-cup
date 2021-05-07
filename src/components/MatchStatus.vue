<template>
  <div>
    <div v-if="statusText.indexOf('UP') != -1">
      <span>{{ statusText.substring(0, statusText.indexOf(' ')) }}</span>
      <span class="tracking-tighter" :class="shrinkWords ? fontSize : ''">
        {{ statusText.substring(statusText.indexOf(' ') + 1) }}
      </span>
    </div>
    <div v-else-if="statusText.indexOf('&') != -1">
      <span>{{ statusText.substring(0, statusText.indexOf(' ')) }}</span>
      <span class="tracking-tighter" :class="fontSize">
        &
      </span>
      <span>{{ statusText.substring(statusText.indexOf('&') + 2) }}</span>
    </div>
    <div v-else>
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

    fontSize: {
      type: String,
      default: 'text-base',
    },

    shrinkWords: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
