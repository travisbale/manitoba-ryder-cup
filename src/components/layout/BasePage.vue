<template>
  <div class="flex flex-col">
    <site-navigation />
    <score-bar v-if="tournamentId > 0" :tournament-id="tournamentId" />
    <div class="lg:container lg:mx-auto">
      <image-header v-if="$slots.header" :image-url="imageUrl" class="mb-2">
        <slot name="header" />
      </image-header>
      <slot />
    </div>
  </div>
</template>

<script>
import ImageHeader from '@/components/typography/ImageHeader';
import ScoreBar from '@/components/ScoreBar';
import SiteNavigation from '@/components/site-navigation';

export default {
  components: { ImageHeader, ScoreBar, SiteNavigation },

  props: {
    imageUrl: {
      type: String,
      default: '/img/ocean-flag.webp',
    },

    tournamentId: {
      type: Number,
      default: 0,
    },
  },

};
</script>
