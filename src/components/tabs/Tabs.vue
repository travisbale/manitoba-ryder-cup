<template>
  <div>
    <ul class="flex shadow-md text-grey-500">
      <li v-for="(tab, index) in tabs" :key="tab.title" class="flex-grow" @click="selectTab(index)">
        <div class="font-raleway-bold uppercase tracking-wide pt-5 pb-3 text-center"
             :class="{ 'border-deep-purple-800 border-b-4 text-deep-purple-800': tab.isActive }"
        >
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
      tabs: [],
    };
  },

  mounted() {
    this.$children.forEach((child, index) => {
      this.tabs.push(child);
      child.isActive = (index === this.selectedIndex);
    });

    this.selectTab(0);
  },

  methods: {
    selectTab(selectedIndex) {
      this.selectedIndex = selectedIndex;

      this.tabs.forEach((tab, index) => {
        tab.isActive = (index === selectedIndex);
      });
    },
  },
};
</script>
