<template>
  <base-page image-url="/img/clubhouse-green.webp">
    <template #header>
      Page Not Found
    </template>
    <div class="px-4 py-8 text-center">
      The page you were looking for could not be found.
    </div>
  </base-page>
</template>

<script>
import BasePage from '@/components/layout/BasePage';

export default {
  components: { BasePage },
};
</script>
