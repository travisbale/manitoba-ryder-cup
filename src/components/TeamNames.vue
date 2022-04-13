<template>
  <div class="w-2/5 justify-end px-3 py-4 rounded-t leading-tight" :class="borderColor">
    <div class="font-italic">
      {{ getMember(1).firstName }}
    </div>
    <div class="font-bold uppercase">
      {{ getMember(1).lastName }}
    </div>
    <div v-if="members.length > 1">
      <div class="font-italic mt-4">
        {{ getMember(2).firstName }}
      </div>
      <div class="font-bold uppercase">
        {{ getMember(2).lastName }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    members: {
      type: Array,
      required: true,
    },

    teamColor: {
      type: String,
      required: true,
    },
  },

  computed: {
    borderColor() {
      return {
        'border-r-4 border-red-800 text-right': this.teamColor === 'Red',
        'border-l-4 border-blue-800': this.teamColor === 'Blue',
      };
    },
  },

  methods: {
    getMember(index) {
      if (this.members.length >= index) {
        return this.members[index - 1];
      }

      return {
        firstName: 'Player',
        lastName: index === 1 ? 'One' : 'Two',
      };
    },
  },
};
</script>
