<template>
  <div class="h-screen flex flex-col">
    <site-nav />
    <router-view />
  </div>
</template>

<script>
import SiteNav from '@/components/site-navigation';

export default {
  components: { SiteNav },
};
</script>
