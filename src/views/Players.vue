<template>
  <div class="lg:container lg:mx-auto">
    <div class="p-4">
      <h1 class="font-bold text-3xl">
        Tournament Participants
      </h1>
      <div class="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <player-card v-for="player in players" :key="player.id" v-bind="player" class="mt-4" />
      </div>
    </div>
  </div>
</template>

<script>
import PlayerCard from '@/components/PlayerCard.vue';

export default {
  components: { PlayerCard },

  data() {
    return {
      players: [{
        id: 0,
        firstName: 'Nigel',
        lastName: 'Milnes',
        pictureUrl: 'img/milnes.png',
        confidence: 4.5,
        wins: 1,
        losses: 5,
        ties: 2,
        cups: 1,
        bio: '*Shake Shake Shake* That\'s not the sound of a maraca if you are around N Milnes for the day.',
        level: 'white',
      },
      {
        id: 1,
        firstName: 'Ian',
        lastName: 'Fordyce',
        pictureUrl: 'img/fordyce.png',
        confidence: 3,
        wins: 4,
        losses: 7,
        ties: 7,
        cups: 3,
        bio: 'A generous man who can be found taking the “courtesy gun” even when he hits the green on shotgun par 3s, he is also known to donate his putters to the trees.',
        level: 'blue',
      },
      {
        id: 2,
        firstName: 'Jon',
        lastName: 'Ray',
        pictureUrl: 'img/ray.png',
        confidence: 3,
        wins: 12,
        losses: 17,
        ties: 7,
        cups: 4,
        bio: 'Long bombs and chunked chips, it’s aaaallll in the hips.',
        level: 'gold',
      }],
    };
  },
};
</script>
