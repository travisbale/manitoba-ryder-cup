<template>
  <div class="lg:container lg:mx-auto">
    <div class="p-4">
      <page-header>
        Courses
      </page-header>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import PageHeader from '@/components/typography/PageHeader';

export default {
  components: { PageHeader },

  data() {
    return {};
  },

  computed: {
    ...mapState('courses', ['courses']),
  },

  created() {
    this.getCourses();
  },

  methods: {
    ...mapActions('courses', ['getCourses']),
  },

};
</script>
