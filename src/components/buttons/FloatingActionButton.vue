<template>
  <div>
    <!-- Add some padding to the bottom of the page so the button doesn't completely osbscure the content -->
    <div class="mb-8" />
    <button type="button"
            class="flex items-center p-4 rounded-full bg-deep-purple-800 shadow-lg fixed bottom-0 right-0 m-4 text-white"
            v-on="$listeners"
    >
      <add-icon v-if="action === 'add'" />
      <edit-icon v-if="action === 'edit'" />
    </button>
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
