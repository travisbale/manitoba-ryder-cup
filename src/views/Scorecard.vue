<template>
  <div>
    <score-bar />
    <div class="p-4">
      <div class="mb-4">
        <div class="font-semibold text-2xl">
          {{ courseName }}
        </div>
        <div class="text-grey-600">
          {{ yards }} Yards, Par {{ par }}
        </div>
      </div>
      <router-link v-for="i in 18" :key="i" :to="{ name: 'hole', params: { id: 0, number: i }}" class="block">
        <div class="border rounded border-grey-300 w-full px-6 py-3 mb-4 shadow">
          <div class="flex items-center justify-between">
            <div class="text-center">
              <div class="font-bold text-6xl leading-none">
                {{ i }}
              </div>
              <div class="text-grey-700 text-sm">
                Par 5
              </div>
            </div>
            <div class="text-center pt-2">
              <div class="text-sm leading-none">
                Fordyce / Milnes
              </div>
              <div class="inline-block rounded mt-2 text-3xl px-3" :class="scores[i].blueScore < scores[i].redScore ? 'bg-blue-700 text-white' : ''">
                {{ scores[i].blueScore }}
              </div>
            </div>
            <div class="text-center pt-2">
              <div class="text-sm leading-none text-white">
                Alignment issue
              </div>
              <div class="text-3xl font-bold uppercase rounded mt-2" :class="{ 'bg-blue-700 text-white': scores[i].leader === 'blue', 'bg-red-700 text-white': scores[i].leader === 'red' }">
                {{ scores[i].status }}
              </div>
            </div>
            <div class="text-center pt-2">
              <div class="text-sm leading-none">
                Bale / Ray
              </div>
              <div class="inline-block rounded mt-2 text-3xl px-3" :class="scores[i].redScore < scores[i].blueScore ? 'bg-red-700 text-white' : ''">
                {{ scores[i].redScore }}
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import ScoreBar from '@/components/ScoreBar';

export default {
  components: { ScoreBar },

  data() {
    return {
      courseName: 'Rossmere Golf & Country Club',
      yards: 6215,
      par: 70,
      scores: [{
        blueScore: 5,
        status: 'AS',
        redScore: 5,
        leader: null,
      },
      {
        blueScore: 4,
        status: '1 up',
        redScore: 5,
        leader: 'blue',
      },
      {
        blueScore: 5,
        status: '1 up',
        redScore: 5,
        leader: 'blue',
      },
      {
        blueScore: 5,
        status: 'AS',
        redScore: 4,
        leader: null,
      },
      {
        blueScore: 4,
        status: 'AS',
        redScore: 4,
        leader: null,
      },
      {
        blueScore: 5,
        status: '1 up',
        redScore: 4,
        leader: 'red',
      },
      {
        blueScore: '–',
        status: '–',
        redScore: '–',
        leader: '–',
      },
      {
        blueScore: '–',
        status: '–',
        redScore: '–',
        leader: '–',
      },
      {
        blueScore: '–',
        status: '–',
        redScore: '–',
        leader: '–',
      },
      {
        blueScore: '–',
        status: '–',
        redScore: '–',
        leader: '–',
      },
      {
        blueScore: '–',
        status: '–',
        redScore: '–',
        leader: '–',
      },
      {
        blueScore: '–',
        status: '–',
        redScore: '–',
        leader: '–',
      },
      {
        blueScore: '–',
        status: '–',
        redScore: '–',
        leader: '–',
      },
      {
        blueScore: '–',
        status: '–',
        redScore: '–',
        leader: '–',
      },
      {
        blueScore: '–',
        status: '–',
        redScore: '–',
        leader: '–',
      },
      {
        blueScore: '–',
        status: '–',
        redScore: '–',
        leader: '–',
      },
      {
        blueScore: '–',
        status: '–',
        redScore: '–',
        leader: '–',
      },
      {
        blueScore: '–',
        status: '–',
        redScore: '–',
        leader: '–',
      },
      {
        blueScore: '–',
        status: '–',
        redScore: '–',
        leader: '–',
      },
      {
        blueScore: '–',
        status: '–',
        redScore: '–',
        leader: '–',
      },
      {
        blueScore: '–',
        status: '–',
        redScore: '–',
        leader: '–',
      },
      {
        blueScore: '–',
        status: '–',
        redScore: '–',
        leader: '–',
      },
      ],
    };
  },
};
</script>
