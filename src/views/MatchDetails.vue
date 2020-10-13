<template>
  <div>
    <score-bar />
    <table class="w-full">
      <thead class="bg-grey-500">
        <th class="px-4 py-2 border-r border-grey-300">
          Hole
        </th>
        <th class="px-3 py-2 border-r border-grey-300">
          Par
        </th>
        <th class="px-3 py-2 border-r border-grey-300">
          Milnes
        </th>
        <th class="px-3 py-2 border-r border-grey-300">
          Score
        </th>
        <th class="px-3 py-2">
          Fordyce
        </th>
      </thead>
      <tbody>
        <hole-details :number="1" :par="3" :red-score="4" match-score="AS" :blue-score="4" leader="null" />
        <hole-details :number="2" :par="3" :red-score="3" match-score="1 Up" :blue-score="4" leader="red" />
        <hole-details :number="3" :par="3" :red-score="4" match-score="1 Up" :blue-score="4" leader="red" />
        <hole-details :number="4" :par="3" :red-score="5" match-score="AS" :blue-score="4" leader="null" />
        <hole-details :number="5" :par="3" :red-score="4" match-score="AS" :blue-score="4" leader="null" />
        <hole-details :number="6" :par="3" :red-score="4" match-score="AS" :blue-score="4" leader="null" />
        <hole-details :number="7" :par="3" :red-score="4" match-score="AS" :blue-score="4" leader="null" />
        <hole-details :number="8" :par="3" :red-score="3" match-score="1 Up" :blue-score="4" leader="red" />
        <hole-details :number="9" :par="3" :red-score="4" match-score="1 Up" :blue-score="4" leader="red" />
        <hole-details :number="10" :par="3" :red-score="4" match-score="1 Up" :blue-score="4" leader="red" />
        <hole-details :number="11" :par="3" :red-score="4" match-score="1 Up" :blue-score="4" leader="red" />
        <hole-details :number="12" :par="3" :red-score="4" match-score="AS" :blue-score="3" leader="null" />
        <hole-details :number="13" :par="3" :red-score="4" match-score="1 Up" :blue-score="3" leader="blue" />
        <hole-details :number="14" :par="3" :red-score="4" match-score="1 Up" :blue-score="4" leader="blue" />
        <hole-details :number="15" :par="3" :red-score="4" match-score="1 Up" :blue-score="4" leader="blue" />
        <hole-details :number="16" :par="3" :red-score="3" match-score="AS" :blue-score="4" leader="null" />
        <hole-details :number="17" :par="3" :red-score="4" match-score="AS" :blue-score="4" leader="null" />
        <hole-details :number="18" :par="3" :red-score="4" match-score="AS" :blue-score="4" leader="null" />
      </tbody>
    </table>
  </div>
</template>

<script>
import HoleDetails from '@/components/HoleDetails.vue';
import ScoreBar from '@/components/ScoreBar.vue';

export default {
  components: { HoleDetails, ScoreBar },

  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {};
  },
};
</script>
