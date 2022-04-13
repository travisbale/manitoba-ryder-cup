<template>
  <base-page image-url="/img/glen-abbey.webp">
    <template v-slot:header>
      News & Media
    </template>
    <div class="p-4 pt-6 bg-grey-100">
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
import { mapGetters, mapState } from 'vuex';

import ArticleCard from '@/components/cards/article-card';
import BasePage from '@/components/layout/BasePage';
import FloatingActionButton from '@/components/buttons/FloatingActionButton';

export default {
  components: { ArticleCard, BasePage, FloatingActionButton },

  computed: {
    ...mapGetters('currentUser', ['hasPermission']),
    ...mapState('articles', ['articles']),
  },
};
</script>
