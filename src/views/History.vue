<template>
  <base-page image-url="/img/sunset-green.jpg">
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
