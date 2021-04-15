<template>
  <div class="p-4 rounded-full bg-indigo-800 hover:bg-indigo-900 shadow-lg fixed bottom-0 right-0 m-4 text-white">
    <add-icon v-if="action === 'add'" class="overflow-hidden text-white" v-on="$listeners" />
    <edit-icon v-if="action === 'edit'" class="overflow-hidden text-white" v-on="$listeners" />
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
