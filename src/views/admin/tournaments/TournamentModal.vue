<template>
  <base-modal :is-open="isOpen" @close="close">
    <template v-slot:header>
      {{ modalHeader }}
    </template>

    <template v-slot:body>
      <base-label>Tournament Name</base-label>
      <base-input :value="tournament.name" />
      <div class="grid grid-cols-2 gap-4">
        <div>
          <base-label>Start Date</base-label>
          <date-picker :value="tournament.startDate" />
        </div>
        <div>
          <base-label>End Date</base-label>
          <date-picker :value="tournament.endDate" />
        </div>
      </div>
    </template>

    <template v-slot:footer>
      <div class="flex justify-end">
        <base-button class="mr-3" type="secondary" @click="close">
          Cancel
        </base-button>
        <base-button :loading="saving" @click="save">
          Save
        </base-button>
      </div>
    </template>
  </base-modal>
</template>

<script>
import { DateTime } from 'luxon';

import BaseButton from '@/components/BaseButton';
import BaseInput from '@/components/forms/BaseInput';
import BaseLabel from '@/components/forms/BaseLabel';
import BaseModal from '@/components/modals/base-modal';
import DatePicker from '@/components/forms/DatePicker';
import { mapActions } from 'vuex';

export default {
  components: { BaseButton, BaseInput, BaseModal, BaseLabel, DatePicker },

  props: {
    players: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      isOpen: false,
      tournament: {
        name: '',
        startDate: DateTime.local(),
        endDate: DateTime.local(),
      },
      modalHeader: 'Create Tournament',
      saving: false,
    };
  },

  methods: {
    ...mapActions('tournaments', ['saveTournament']),

    open(tournament) {
      this.isOpen = true;

      if (tournament.id > 0) {
        this.modalHeader = 'Edit Tournament';
        this.tournament = { ...tournament };
      } else {
        this.modalHeader = 'Create Tournament';
        this.tournament = {
          id: 0,
          name: '',
          startDate: DateTime.local(),
          endDate: DateTime.local().plus({ days: 1 }),
        };
      }
    },

    save() {
      this.saving = true;

      this.saveTournamenet(this.tournament)
        .then(() => { this.close(); })
        .finally(() => { this.saving = false; });
    },

    close() {
      this.isOpen = false;
    },
  },
};
</script>
