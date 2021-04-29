<template>
  <div>
    <div class="h-screen bg-cover relative" style="background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(img/golf-ball.webp)">
      <site-nav transparent />
      <div class="p-4 text-white text-center">
        <div class="font-raleway-light tracking-widest text-3xl my-4">
          Welcome to
        </div>
        <div class="font-raleway-bold text-8xl leading-tight tracking-tight mb-48">
          The DGA Tour
        </div>
      </div>
      <div class="text-center absolute w-full" style="bottom: 100px">
        <router-link :to="{ name: 'schedule' }" class="block">
          <base-button class="text-xl font-raleway-semibold py-4" type="transparent">
            Tournament Schedule
          </base-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton';
import SiteNav from '@/components/site-navigation';

export default {
  components: { BaseButton, SiteNav },
};
</script>
