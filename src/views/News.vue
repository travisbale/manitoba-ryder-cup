<template>
  <base-page image-url="/img/glen-abbey.webp">
    <template v-slot:header>
      News & Media
    </template>
    <div class="p-4 pt-6">
      <p v-if="articles.length === 0" class="text-center">
        There are currently no published articles.
      </p>
      <router-link v-for="article in articles" :key="article.id"
                   :to="{ name: 'article', params: { articleId: article.id }}"
                   v-bind="article" class="block"
      >
        <article-card v-bind="article" class="mb-4" />
      </router-link>
      <floating-action-button v-if="hasPermission('create:articles')" type="add" />
    </div>
  </base-page>
</template>

<script>
import { DateTime } from 'luxon';
import { mapGetters } from 'vuex';

import ArticleCard from '@/components/cards/article-card';
import BasePage from '@/components/layout/BasePage';
import FloatingActionButton from '@/components/buttons/FloatingActionButton';

export default {
  components: { ArticleCard, BasePage, FloatingActionButton },

  data() {
    return {
      articles: [
        {
          id: 1,
          title: 'L.O.T.S... We\'re Back for 2021',
          imagePath: '/img/lots.jpg',
          publishedDate: DateTime.fromISO('2021-09-07'),
          author: 'Jon Ray',
        },
      ],
    };
  },

  computed: {
    ...mapGetters('currentUser', ['hasPermission']),
  },
};
</script>
