<template>
  <div>
    <div v-for="(round, index) in rounds" :key="index" class="flex justify-between mb-2">
      <div>
        Round {{ round.number }}
      </div>
      <div @click="removeRound(index)">
        X
      </div>
    </div>
    <base-button type="secondary" @click="addRound()">
      Add Round
    </base-button>
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton';

export default {
  components: { BaseButton },

  data() {
    return {
      rounds: [],
    };
  },

  methods: {
    addRound() {
      this.rounds.push({
        number: this.rounds.length + 1,
      });
    },

    removeRound(index) {
      this.rounds.splice(index, 1);
    },
  },
};
</script>
