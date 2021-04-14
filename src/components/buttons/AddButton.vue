<template>
  <div class="p-4 rounded-full bg-indigo-800 hover:bg-indigo-900 shadow-lg fixed bottom-0 right-0 m-8">
    <add-icon class="w-10 h-10 overflow-hidden text-white" v-on="$listeners" />
  </div>
</template>

<script>
import AddIcon from '@/components/icons/AddIcon';

export default {
  components: { AddIcon },
};
</script>
