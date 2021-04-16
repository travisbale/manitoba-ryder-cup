<template>
  <div class="flex flex-col">
    <site-navigation />
    <div class="lg:container lg:mx-auto">
      <div v-if="breadcrumbText != null" class="bg-grey-800 text-grey-300 text-sm p-1">
        <router-link :to="breadcrumbRoute" class="flex items-center">
          <left-chevron-icon />
          {{ breadcrumbText }}
        </router-link>
      </div>
      <image-header v-if="$slots.header" :image-url="imageUrl">
        <slot name="header" />
      </image-header>
      <slot />
    </div>
  </div>
</template>

<script>
import ImageHeader from '@/components/typography/ImageHeader';
import LeftChevronIcon from '@/components/icons/LeftChevronIcon';
import SiteNavigation from '@/components/site-navigation';

export default {
  components: { ImageHeader, LeftChevronIcon, SiteNavigation },

  props: {
    imageUrl: {
      type: String,
      default: '/img/ocean-flag.webp',
    },

    breadcrumbText: {
      type: String,
      default: null,
    },

    breadcrumbRoute: {
      type: Object,
      default: null,
    },
  },

};
</script>
