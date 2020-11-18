<template>
  <base-page image-url="/img/sunset-green.webp">
    <template v-slot:header>
      History
    </template>
  </base-page>
</template>

<script>
import BasePage from '@/components/layout/BasePage';

export default {
  components: { BasePage },

  data() {
    return {};
  },
};
</script>
