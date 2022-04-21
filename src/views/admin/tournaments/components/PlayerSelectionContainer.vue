<template>
  <player-tile v-bind="player" :selected="selected" class="p-4" @click="selectPlayer" />
</template>

<script>
import PlayerTile from './PlayerTile';

export default {
  components: { PlayerTile },

  props: {
    player: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      selected: false,
    };
  },

  methods: {
    selectPlayer() {
      this.selected = !this.selected;

      if (this.selected) {
        this.$emit('player-selected', this.player);
      } else {
        this.$emit('player-deselected', this.player);
      }
    },
  },
};
</script>
