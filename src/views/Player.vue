<template>
  <base-page image-url="/img/ocean-hills.webp">
    <template v-slot:header>
      Player Profile
    </template>
    <div class="p-4">
      {{ id }}
    </div>
  </base-page>
</template>

<script>
import BasePage from '@/components/layout/BasePage';

export default {
  components: { BasePage },

  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {};
  },
};
</script>
