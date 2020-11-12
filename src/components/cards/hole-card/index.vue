<template>
  <router-link :to="{ name: 'hole', params: { id: 0, number }}" class="block">
    <base-card class="mb-4">
      <div class="flex justify-between">
        <div class="text-center">
          <div class="font-bold text-6xl leading-none">
            {{ number }}
          </div>
          <div class="text-sm text-grey-700">
            Par {{ par }}
          </div>
        </div>
        <div class="text-center pt-2">
          <div class="inline-block rounded mb-3 text-3xl px-3 border border-grey-300 shadow">
            {{ "-" }}
          </div>
          <div class="text-sm leading-none">
            Fordyce / Milnes
          </div>
        </div>
        <div class="text-center pt-2">
          <div class="text-3xl font-bold uppercase rounded mb-3 border border-grey-300 shadow">
            {{ "AS" }}
          </div>
          <div class="text-sm leading-none text-white">
            Alignment issue
          </div>
        </div>
        <div class="text-center pt-2">
          <div class="inline-block rounded mb-3 text-3xl px-3 border border-grey-300 shadow">
            {{ "-" }}
          </div>
          <div class="text-sm leading-none">
            Bale / Ray
          </div>
        </div>
      </div>
    </base-card>
  </router-link>
</template>

<script>
import BaseCard from '@/components/cards/base-card';

export default {
  components: { BaseCard },

  props: {
    number: {
      type: Number,
      required: true,
    },

    par: {
      type: Number,
      required: true,
    },
  },
};
</script>
