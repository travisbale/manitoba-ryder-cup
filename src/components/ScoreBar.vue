<template>
  <router-link :to="{ name: 'leaderboard' }" class="block sticky top-0">
    <div class="flex align-center justify-between bg-blue-grey-900 text-grey-200">
      <div class="w-1/2 flex items-center px-4 py-2 bg-gradient-to-r from-blue-900">
        <div class="mr-4 text-4xl font-semibold">
          4.5
        </div>
        <div class="text-lg pt-1">
          Sefton
        </div>
      </div>
      <div class="w-1/2 flex items-center justify-end px-4 py-2 bg-gradient-to-l from-red-900">
        <div class="mr-4 pt-1 text-lg">
          Rabe
        </div>
        <div class="text-4xl font-semibold">
          6.5
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
