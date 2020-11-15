<template>
  <div class="h-screen flex flex-col">
    <site-navigation />
    <router-view />
  </div>
</template>

<script>
import SiteNavigation from '@/components/site-navigation';

export default {
  components: { SiteNavigation },
};
</script>
