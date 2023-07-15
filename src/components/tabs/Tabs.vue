<template>
  <div>
    <div class="flex shadow-md text-grey-500">
      <a v-for="(tab, index) in tabs" :key="tab.title" :href="tab.href" class="flex-grow" @click="selectTab(index)">
        <div class="font-raleway-bold uppercase tracking-wide pt-5 pb-3 text-center"
             :class="{ 'border-deep-purple-800 border-b-4 text-deep-purple-800': tab.isActive }"
        >
          {{ tab.title }}
        </div>
      </a>
    </div>
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
    const { hash } = this.$route;

    this.$children.forEach((child, index) => {
      this.tabs.push(child);

      if (hash !== '#' && hash === child.href) {
        this.selectedIndex = index;
      } else {
        child.isActive = false;
      }
    });

    this.selectTab(this.selectedIndex);
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
