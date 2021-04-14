<template>
  <div>
    <ul class="flex mb-3 border-b border-grey-300">
      <li v-for="(tab, index) in $children" :key="tab.title" @click="selectTab(index)">
        <div class="border border-grey-300 px-4 py-2 rounded-md">
          {{ tab.title }}
        </div>
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: 0,
    };
  },

  mounted() {
    this.selectTab(0);
  },

  methods: {
    selectTab(selectedIndex) {
      this.selectedIndex = selectedIndex;

      this.$children.forEach((tab, index) => {
        tab.isActive = (index === selectedIndex);
      });
    },
  },
};
</script>
