<template>
  <base-page back-link-text="News & Media" :back-link-route="{ name: 'news' }">
    <div class="flex justify-center items-center h-60 md:h-72 text-center bg-cover bg-center"
         :style="`background-image: linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)), url('${article.imageUrl}')`"
    >
      <div class="text-white">
        <h1 class="font-raleway-bold text-4xl leading-none mb-4">
          {{ article.title }}
        </h1>
      </div>
    </div>
    <div class="p-4 pt-6 text leading-relaxed">
      <div class="font-semibold mb-1">
        By {{ article.author }}
      </div>
      <div class="text-sm text-grey-600 mb-4">
        {{ printDate(article.publishedDate) }}
      </div>
      <!-- eslint-disable-next-line -->
      <div v-html="article.html" />
    </div>
  </base-page>
</template>

<script>
import { DateTime } from 'luxon';

import BasePage from '@/components/layout/BasePage';
import { mapGetters } from 'vuex';

export default {
  components: { BasePage },

  props: {
    articleId: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapGetters('articles', ['getArticle']),

    article() {
      return this.getArticle(this.articleId);
    },
  },

  methods: {
    printDate(date) {
      return date.toLocaleString(DateTime.DATE_FULL);
    },
  },
};
</script>
