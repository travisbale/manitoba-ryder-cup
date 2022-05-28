<template>
  <div class="flex items-center border-b" :class="tileClasses" v-on="$listeners">
    <img class="h-16 w-16 object-cover object-center mr-4 rounded-full border border-grey-200"
         :src="photoPath || '/img/default-avatar.webp'" alt="Avatar"
    />
    <div class="mt-1">
      <div class="font-semibold text-xl leading-tight">
        {{ fullName }}
      </div>
      <tier-badge :tier="tier" />
    </div>
    <div v-if="deletable" class="flex flex-grow justify-end">
      <trash-icon class="text-grey-400" @click="deletePlayer" />
    </div>
  </div>
</template>

<script>
import TierBadge from '@/components/badges/TierBadge';
import TrashIcon from '@/components/icons/TrashIcon';

export default {
  components: { TierBadge, TrashIcon },

  props: {
    id: {
      type: Number,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    photoPath: {
      type: String,
      required: true,
    },
    tier: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    deletable: {
      type: Boolean,
      default: false,
    },
    selectedColor: {
      type: String,
      default: 'Blue',
      validator: (color) => ['Red', 'Blue'].indexOf(color) !== -1,
    },
  },

  computed: {
    tileClasses() {
      return {
        'bg-red-50 border-red-100': this.selected && this.selectedColor === 'Red',
        'bg-blue-50 border-blue-100': this.selected && this.selectedColor === 'Blue',
        'border-grey-300': !this.selected,
      };
    },
  },

  methods: {
    deletePlayer() {
      this.$emit('delete-player');
    },
  },
};
</script>
