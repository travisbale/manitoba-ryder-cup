<template>
  <div class="p-4 rounded-full bg-indigo-800 hover:bg-indigo-900 shadow-lg fixed bottom-0 right-0 m-8 text-white">
    <add-icon v-if="action === 'add'" class="w-10 h-10 overflow-hidden text-white" v-on="$listeners" />
    <div v-if="action === 'edit'" class="w-10 h-10 flex justify-center items-center">
      <edit-icon class="overflow-hidden text-white" v-on="$listeners" />
    </div>
  </div>
</template>

<script>
import AddIcon from '@/components/icons/AddIcon';
import EditIcon from '@/components/icons/EditIcon';

export default {
  components: { AddIcon, EditIcon },

  props: {
    action: {
      type: String,
      default: 'add',
      validator: (action) => ['add', 'edit'].indexOf(action) !== -1,
    },
  },
};
</script>
