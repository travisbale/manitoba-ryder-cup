<template>
  <div>
    <div class="h-screen bg-cover relative" style="background-image: url(img/golf-ball.jpg)">
      <site-nav transparent />
      <div class="p-4 text-white text-center">
        <div class="font-raleway-light tracking-widest text-3xl my-4">
          Welcome to
        </div>
        <div class="font-raleway-bold text-6xl leading-tight tracking-tight mb-48">
          The Manitoba Ryder Cup
        </div>
      </div>
      <div class="text-center absolute w-full" style="bottom: 100px">
        <router-link :to="{ name: 'leaderboard', params: { tournamentId }}" class="block">
          <base-button class="text-xl font-raleway-semibold" transparent>
            Current Standings
          </base-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton';
import SiteNav from '@/components/site-navigation';

export default {
  components: { BaseButton, SiteNav },

  data() {
    return {
      tournamentId: 1,
    };
  },
};
</script>
