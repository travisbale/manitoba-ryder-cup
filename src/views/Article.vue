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
      <p class="mb-6">
        Our 4th visit to Lake of the Sandhills will feature the first ever September Ryder, where time is not on the heavy drinker's side.
        Early tee times and too much time for refills in the evenings, could pose problems for those not "managing their caps".
      </p>
      <p class="mb-6">
        With great success of last year's MM Scotch, the format will again include four different formats:
        Four ball and MM Scotch on Friday, followed by Alternate Shot and Singles on Saturday.
      </p>
      <p>
        Important items to note for the 13th Annual MB Ryder Cup:
      </p>
      <ul class="list-disc list-outside mb-6 ml-6">
        <li>
          Three players will be teeing it up for their first ever Ryder: Bale, Martin, and Mansfield
        </li>
        <li>7 Golds, 4 Blues, and 5 Whites, make up the field</li>
        <li>Practice that short game because the 19th hole will award you with more than a round of drinks this time around</li>
      </ul>
      <p>
        We are less than two weeks away, and only eight will come out as Lords of the Sandhills.
      </p>
    </div>
  </base-page>
</template>

<script>
import { DateTime } from 'luxon';

import BasePage from '@/components/layout/BasePage';

export default {
  components: { BasePage },

  props: {
    articleId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      article: {
        id: 1,
        title: 'L.O.T.S... We\'re Back for 2021',
        imageUrl: '/img/lots.jpg',
        publishedDate: DateTime.fromISO('2021-09-07'),
        author: 'Jon Ray',
      },
    };
  },

  methods: {
    printDate(date) {
      return date.toLocaleString(DateTime.DATE_FULL);
    },
  },
};
</script>
