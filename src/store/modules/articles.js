import { DateTime } from 'luxon';

export default {
  namespaced: true,

  state: {
    articles: [
      {
        id: 2,
        title: 'Captain Phin',
        imageUrl: '/img/captain-phin.jpg',
        publishedDate: DateTime.fromISO('2021-09-09'),
        author: 'Tournament Commissioner',
        html: `
          <p class="mb-6">
            With 20% of this year's field being a MB Ryder rookie, Captain Phin is looking to guide and land his team to
            2021 Glory. He has had his struggles at tournaments this year, including not qualifying for the Manitoba mid-am.
            But he's not the only Manitoba Mid-Am embarrassment that is in this year's Ryder field - we are still unsure if
            he goes for team loser mid-am, or avoids them at all costs.
          </p>
          <p class="mb-6">
            Phin has secured 6.5 out of 12 points in his last three years for his teams. If he can go 4 for 4 this year,
            we see no doubt of a successful landing of the trophy touching his lips for back to back years.
          </p>
          <p class="mb-6">
            A heroic captaincy will follow the basics that Jeff Probst instills in our brains year after year: Outwit (can he
            formulize a successful draft), Outplay (can he perform on the course), and Outlast (can he last the night at
            the Fire & Water Bistro).
          </p>`,
      },
      {
        id: 3,
        title: 'Captain Macaulay',
        imageUrl: '/img/captain-macaulay.jpg',
        publishedDate: DateTime.fromISO('2021-09-09'),
        author: 'Tournament Commissioner',
        html: `
          <p class="mb-6">
            Some may call him Captain America, as Jordan Spieth has the same hate for him as Jordan does towards Patty
            Reed. Moving Jordan's ball at 2016 Hazeltine was a gesture none of us can comprehend, but it's these acts of
            outrageousness that could write this Captain's name in the MB Ryder history books.
          </p>
          <p class="mb-6">
            However, this Killarney Killer has no handicap bargaining power as this is not a net tournament. We still
            expect him to try and take strokes from the other team as early as the first stages of this year's draft.
            This same bargaining power won him the right for first pick overall or deferral in the draft, the match
            which was all but done after 10 holes.
          </p>
          <p class="mb-6">
            Expect a plentiful of birdies from him, as well as a push for aggressiveness and eagles from his teammates.
            A rookie skipper that needs to prove his draft picking abilities.
          </p>`,
      },
      {
        id: 1,
        title: 'L.O.T.S... We\'re Back for 2021',
        imageUrl: '/img/lots.jpg',
        publishedDate: DateTime.fromISO('2021-09-07'),
        author: 'Jon Ray',
        html: `
          <p class="mb-6">
            Our 4th visit to Lake of the Sandhills will feature the first ever September Ryder, where time is not on the heavy drinker's side.
            Early tee times and too much time for refills in the evenings, could pose problems for those not "managing their caps".
          </p>
          <p class="mb-6">
            With great success of last year's MM Scotch, the format will again include four different formats:
            Four ball and MM Scotch on Friday, followed by Alternate Shot and Singles on Saturday.
          </p>
          <p>
            Important items to note for the 13th Annual MB Ryder Cup:
          </p>
          <ul class="list-disc list-outside mb-6 ml-6">
            <li>Three players will be teeing it up for their first ever Ryder: Bale, Martin, and Mansfield</li>
            <li>7 Golds, 4 Blues, and 5 Whites, make up the field</li>
            <li>Practice that short game because the 19th hole will award you with more than a round of drinks this time around</li>
          </ul>
          <p>
            We are less than two weeks away, and only eight will come out as Lords of the Sandhills.
          </p>`,
      },
    ],
  },

  getters: {
    getArticle: (state) => (articleId) => {
      return state.articles.find((a) => a.id === articleId) || {};
    },
  },
};
