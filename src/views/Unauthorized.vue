<template>
  <base-page image-url="/img/links-course.webp">
    <template v-slot:header>
      Unauthorized
    </template>
    <div class="px-4 py-8 text-center">
      You don't have access to this page
    </div>
  </base-page>
</template>

<script>
import BasePage from '@/components/layout/BasePage';

export default {
  components: { BasePage },
};
</script>
