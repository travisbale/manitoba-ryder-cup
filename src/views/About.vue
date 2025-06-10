<template>
  <base-page image-url="/img/mountain-course.webp">
    <template #header>
      Tour History
    </template>
    <div class="p-4 pt-6">
      <p class="text-center">
        There is no tour history
      </p>
    </div>
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
