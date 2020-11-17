<template>
  <base-page image-url="/img/mountain-course.jpg">
    <template v-slot:header>
      Tournament Info
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
