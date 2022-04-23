<template>
  <base-page image-url="/img/fox-harbr.webp">
    <template v-slot:header>
      <div v-if="matchId > 0">
        Edit Match
      </div>
      <div v-else>
        Create Match
      </div>
    </template>
    <tabs>
      <tab title="Details" class="px-4 py-6">
        <match-details v-bind="match" />
      </tab>
      <tab title="Red Team">
        <match-participants team-color="Red" :match-id="matchId" />
      </tab>
      <tab title="Blue Team">
        <match-participants team-color="Blue" :match-id="matchId" />
      </tab>
    </tabs>
  </base-page>
</template>

<script>
import BasePage from '@/components/layout/BasePage';
import Tab from '@/components/tabs/Tab';
import Tabs from '@/components/tabs/Tabs';

import MatchDetails from './components/MatchDetails';
import MatchParticipants from './components/MatchParticipants';

export default {
  components: { BasePage, Tab, Tabs, MatchDetails, MatchParticipants },

  props: {
    matchId: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      match: {
        id: 0,
      },
    };
  },
};
</script>
