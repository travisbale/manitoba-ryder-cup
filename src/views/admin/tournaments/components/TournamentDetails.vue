<template>
  <div>
    <base-input v-model="name" label="Tournament Name" required />
    <div class="grid grid-cols-2 gap-4">
      <div>
        <date-picker v-model="startDate" label="Start Date" required />
      </div>
      <div>
        <date-picker v-model="endDate" label="End Date" required />
      </div>
    </div>
    <base-input v-model="location" label="Tournament Location" />
    <div class="flex justify-end px-4">
      <router-link :to="getPreviousPage()" class="block">
        <base-button type="secondary" class="mr-2">
          Cancel
        </base-button>
      </router-link>
      <base-button :loading="saving" @click="clickSaveTournament">
        Save
      </base-button>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon';
import { mapActions } from 'vuex';

import BaseButton from '@/components/buttons/BaseButton';
import BaseInput from '@/components/forms/BaseInput';
import DatePicker from '@/components/forms/DatePicker';

export default {
  components: { BaseButton, BaseInput, DatePicker },

  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: DateTime,
      required: true,
    },
    endDate: {
      type: DateTime,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      saving: false,
    };
  },

  methods: {
    ...mapActions('tournaments', ['fetchTournament', 'saveTournament']),

    clickSaveTournament() {
      const tournament = {
        id: this.id,
        name: this.name,
        startDate: this.startDate,
        endDate: this.endDate,
        location: this.location,
      };

      this.saving = true;

      this.saveTournament(tournament)
        .then(() => {
          this.$router.push(this.getPreviousPage()).then(() => {
            this.$toaster.success(this.id > 0 ? 'Tournament updated' : 'Tournament created');
          });
        })
        .finally(() => { this.saving = false; });
    },

    getPreviousPage() {
      if (this.id > 0) {
        return { name: 'leaderboard', params: { tournamentId: this.id } };
      }
      return { name: 'schedule' };
    },
  },
};
</script>
