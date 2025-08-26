import { DateTime } from 'luxon';

export default {
  namespaced: true,
  state: {
    articles: [
      {
        id: 10,
        title: 'McInnes vs. Milnes',
        showTitle: true,
        publishedDate: DateTime.fromISO('2025-08-26'),
        imageUrl: '/img/mcinnes-milnes.jpg',
        html: `
          <div class="mb-12">
            <p class="mb-4">
              Following a draft filled with surprises, Teams McInnes and Milnes are locked in for this year’s highly
              anticipated Manitoba Ryder Cup. While neither captain is known for vocal leadership, both stepped up
              during the draft and stamped their identities firmly on their squads.
            </p>
            <p class="mb-4">
              The battle lines are clearly drawn: Team McInnes features players most at home threading shots through
              the trees of Niakwa, Rossmere, and his beloved Elmhurst. In contrast, Team Milnes leans into its
              linksland roots, stacking the roster with players from the open grounds of Southwood and Western
              Manitoba—a nod to his English heritage.
            </p>
            <p>
              With this year’s event taking place just weeks before the USA vs. Europe Ryder Cup at Bethpage Black,
              the 2025 profiles carry a distinctly international flavor.
            </p>
          </div>
          <div class="mb-8">
            <div class="mb-4">
              <strong>Dan Mcinnes — Captain Team USA</strong>
            </div>
            <p class="mb-4">
              Known for his intense glare and uncompromising attitude, McInnes might carry a Scottish name, but he’s
              embraced the swagger of a brash American captain à la Keegan Bradley. Built more like Brooks Koepka,
              his game resembles the steady, tactical styles of Collin Morikawa or Brian Harman.
            </p>
            <p class="mb-4">
              His shot-shaping and disciplined play suit the tree-lined fairways of Clear Lake. But questions remain: Will
              his unique brand of motivation resonate with his team? (See: Opus Dei scenes from The Da Vinci
              Code...). Once the matches begin, this top-rated Blue player gives his side a clear edge in any contest.
            </p>
            <p class="mb-4">
              Despite the on-paper advantage, there’s one lingering concern—availability. Rumor has it McInnes played
              just 52% of the holes during a recent visit to Canada’s #1-ranked course. He’d be wise to brush up on the
              official Ryder Cup rulebook to avoid leading his team off the course—and to the 19th hole—too early.
            </p>
          </div>
          <div class="mb-8">
            <div class="mb-4">
              <strong>Nigel Milnes — Captain Team Europe</strong>
            </div>
            <p class="mb-4">
              A man of few words with a quiet demeanour, Milnes shares the attributes with Europe’s 2023 Ryder Cup
              captain Luke Donald. Diminutive in stature but not in impact, Milnes is known for his precision iron
              play—a game tailor-made for Clear Lake’s demanding layout (and, some say, your local Tuesday morning
              ladies’ league).
            </p>
            <p class="mb-4">
              Milnes’ height, playing style, and post-round behavior all evoke memories of Team Europe legend Ian
              Woosnam. Known to find an extra gear once beer sales open, the real challenge for Milnes may be
              managing consumption more than club selection. Now elevated to a leadership role, one question looms:
              Can he strike the right balance between leadership and libation?
            </p>
            <p class="mb-12">
              One thing's not in doubt: his commitment. In 2023, Milnes crossed international borders with a sprained
              MCL just to compete. And while some of his top draft picks raised a few eyebrows, Milnes will look to
              prove that his vision leads to a masterpiece, not a paint-by-numbers performance on match day.
            </p>
            <p>
              Stay tuned for a full analysis, where we’ll compare the rosters of Team McInnes (Team USA) and Team
              Milnes (Team Europe) with direct player comparisons.
            </p>
          </div>
        `,
      },
      {
        id: 9,
        title: 'Player Stock Report',
        showTitle: true,
        publishedDate: DateTime.fromISO('2025-07-30'),
        imageUrl: '/img/technical-analysis-chart.jpg',
        html: `
          <p class="mb-6">
            The draft is set for this Friday, August 1st, and following an even match at Elmhurst Country
            Club, Captain Dan McInnis edged out Captain Nigel Milnes. As a result, McInnis now holds the
            strategic advantage of choosing either the first overall pick or deferring for the coveted second
            and third selections.
          </p>
          <p class="mb-6">
            While a full analysis of each player will be released once the teams are finalized, this
            ghostwriter (and self-appointed draft pundit) offers a few early thoughts on notable player
            trajectories heading into draft night.
          </p>

          <div class="flex my-4 pt-2">
          <svg class="w-12 h-12 mr-2" viewBox="0 0 48 48" fill="none">
            <path d="M40.9999 27.0007L40.9999 15.0007L29 15.0007" stroke-width="4" stroke="#388e3c" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 37.0002L16.3385 24.5002L26.1846 30.5002L41 15.0002" stroke="#388e3c" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
            <h2 class="text-2xl font-semibold mt-1">Buy</h2>
          </div>
          <p class="mb-6">
            <strong>Connor Macaulay</strong>
            <br>
            A top-15 finish at the Manitoba Amateur is impressive. Going 7-0* against another Ryder Cup
            competitor (*without “cap nonsense”) during the recent US golf trip sends this player&#39;s stock to
            the moon.
          </p>
          <p class="mb-6">
            <strong>Mike Kalic</strong>
            <br>
            Returning for his second Ryder appearance, the man known as the &quot;McInnis Whisperer&quot; is back
            with a stronger game and a legendary Gold+ rating when the beer cart is in proximity.
          </p>
          <p class="mb-6">
            <strong>Jon Ray</strong>
            <br>
            With his second career hole-in-one (and now one a golf course that remains available to play),
            this player is coming in hot just in time for draft night.
          </p>
          <p class="mb-6">
            <strong>Stu Shiells</strong>
            <br>
            With weddings scheduled for Ryder Cup weekend at Danceland, Elkhorn Resort, and the
            Wishing Well, this player is highly motivated to keep his matches short and efficient.
          </p>
          <p class="mb-6">
            <strong>Garry Hargreaves</strong>
            <br>
            Course knowledge is critical at CLGC, and no competitor is more familiar than Garry. The only
            player in draft who has won a championship at the prestigious Tamarack Golf Tournament, this
            match play specialist will look to channel his junior success. Also owns the title for the most
            enthusiastic celebration in Ryder Cup history.
          </p>

          <div class="flex my-4 pt-2">
            <svg class="w-12 h-12 mr-2" fill="#fbc02d" viewBox="0 0 24 24">
              <path d="M23 13H2v-2h21v2z"/>
            </svg>
            <h2 class="text-2xl font-semibold mt-1">Hold</h2>
          </div>
          <p class="mb-6">
            <strong>Travis Bale</strong>
            <br>
            With draft groupings now set, this player—long known for seeking any edge (note: this isn’t a
            net event)—can finally shift into Ryder-ready mode. Expect the 97s to become 79s soon
            enough.
          </p>
          <p class="mb-6">
            <strong>Blair Horn</strong>
            <br>
            Don't be fooled by the self-doubt, this course suits his precision game perfectly. The only
            question: can he finally escape the ghost of Taylor Riedel from Ryder Cups past?
          </p>
          <p class="mb-6">
            <strong>Jason Gunnlaugson</strong>
            <br>
            Despite limited action this season, he’s off on a week-long BC golf trip to get into form. Insider
            note: he always golfs in pants—an edge when temperatures drop at CLGC.
          </p>
          <p class="mb-6">
            <strong>Harbinder Benning</strong>
            <br>
            The Ryder’s high-beta stock. This player has lost—and found—his game (and spiritual
            alignment) more often than a kid misplaces a water bottle. While not quite rated Gold+, there&#39;s
            serious upside here if a captain can help him “find religion.”
          </p>
          <p class="mb-6">
            <strong>Keith Van Walleghem</strong>
            <br>
            Now living in the alternate universe of Wheat City Golf Club&#39;s Thursday night league, he&#39;s kept
            his game (and scores) under wraps. A dependable glue guy with a Gold+ pedigree… once he
            gets his farm chores done.
          </p>

          <div class="flex my-4 pt-2">
            <svg class="w-12 h-12 mr-2" viewBox="0 0 24 24" fill="none">
              <path d="M21 17L13 9L9 13L3 7M21 17H15M21 17V11" stroke-width="2.5" stroke="#d32f2f" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h2 class="text-2xl font-semibold mt-1">Sell</h2>
          </div>
          <p class="mb-6">
            <strong>Adam Sefton / Iain McDonald</strong>
            <br>
            This isn’t a knock on their 2025 seasons, but no one expects them to replicate their 2024 clutch
            heroics for Team Martin. Reality likely returns in 2025. Adam’s stock gets a slight bump for
            being the only competitor who traveled to Bandon Dunes twice in consecutive months.
          </p>
          <p class="mb-6">
            <strong>Evan Martin</strong>
            <br>
            Somehow both the coldest and hottest player in the field. After captaining the 2024 champs and
            again earning the title of &quot;Best Looking Member at Rossmere&quot; (per the cart girls—better luck
            next year, Fordyce), his 2025 play has been subpar. Still, his tactical mind makes him an asset.
            Expect him to go early in the blue group.
          </p>
          <p class="mb-12">
            <strong>Jusin Rabe</strong>
            <br>
            Traveling for golf is one thing—but for baseball? Priorities, please. Still, this Ryder vet brings
            value with deep CLGC knowledge. The only player to record a hole-in-one in Ryder Cup play,
            he’ll look to rekindle that magic on the 17th hole this year.
          </p>

        <p class="mb-6">
          Stay tuned for full team breakdowns post draft...
        </p>
        `,
      },
      {
        id: 8,
        title: 'Ryder Goes to Kenosee',
        showTitle: true,
        publishedDate: DateTime.fromISO('2024-07-31'),
        imageUrl: '/img/golf-kenosee.jpg',
        author: 'Ryder Commissioner',
        html: `
          <p class="mb-6">
            As selected by the Ryder Cup Competition Committee, Evan Martin and Travis Bale will be the two captains for the 2024 Ryder Cup.
            Both players are Rossmere Golf and Country Club royalty (meaning that they respect the homes located on holes nos. 1, 2, 3, 6, 7,
            13, 16, and 17), and are taking the role of captain very seriously. Upon getting the call, Evan immediatley began following
            fellow Ryder Cup competitors on Golf Canada to track scoring. Travis has decided to use his time elsewhere, working on his
            patented "LET'S GO!" chant so it can be heard on the other side of Kenosee Lake.
          </p>
          <p class="mb-6">
            This year the tournament will feature three rounds at the prestigious Golf Kenosee golf couse, and one round at the White
            Bear Lake Golf Course. In order to maximize the number of shots everyone gets to hit at White Bear, the Ryder Cup Committee has
            decided to start the event with Fourball Friday morning, followed by Alternate Shot in the afternoon both taking place at Golf
            Kenosee. Then Saturday morning the competitors will begin the day with MM Scotch at White Bear before heading back to Kenosee
            for Singles.
          </p>
          <p class="mb-6">
            The teams are set and the players are ready. With the narrow fairways, tee advantages look to play a large roll in this year's
            event. Will we finally have a Ryder Cup come down to the final putt? Or will the writing be on the wall long before Saturday
            afternoon? September can't come soon enough!
          </p>
        `,
      },
      {
        id: 7,
        title: 'Ryder Returns to Cragun\'s',
        showTitle: true,
        publishedDate: DateTime.fromISO('2023-07-07'),
        imageUrl: '/img/cragun.jpg',
        author: 'Ryder Commissioner',
        html: `
          <p class="mb-6">
            Back for the second time, the Ryder Cup finally returns to the site of arguably the best Ryder in now its 15th year
            of competiton. From the Ryder’s humble beginning of setting up tents at the Morden campground, the Ryder Cup has grown
            to an annual competition with a cast of characters that truly bring the life of the tournament. This year, twenty four
            competitors eagerly anticipate testing their game at the newly finished Lehman 18 and renovated Dutch course and then
            relaxing with one (or more) Legacy Teas!
          </p>
          <p class="mb-6">
            With the newly renovated courses, the tournament director has reformatted the schedule of play with MM Scotch leading
            the tournament off with fourball filling in the afternoon session. The standard Alternate Shot and Singles will follow
            on Saturday.  With all twenty four players returning, the field will be made up of  2 Golds, 7 Silvers, 5 Blacks, 6
            Blues and 4  Whites.
          </p>
          <p class="mb-6">
            With the draft taking place this weekend, and balls in the air less than two weeks away, team captains St- Hilaire and
            Gunnlaugson look to lead their team to glory.
          </p>
        `,
      },
      {
        id: 6,
        title: 'The Whiskey Room Awaits',
        showTitle: true,
        publishedDate: DateTime.fromISO('2022-05-30'),
        imageUrl: '/img/whiskey-room.jpg',
        author: 'Ryder Commissioner',
        html: `
          <p class="mb-6">
            Ladies and gentlemen, the time you've been waiting for is upon us. The field has been set, and the colors have
            been finalized. On Friday morning, the 2022 Manitoba Ryder Cup will be underway!
          </p>
          <p class="mb-6">
            After hours and hours of arguments, debates, and deliberations, the decision was made to move to a five color
            system. To keep the singles and fourball matches competitive, players will be pitted against players who are
            within one color grouping either above or below them. The modified scotch and alternate shot matches are less
            prescriptive, the only restriction being that teams must be evenly matched. As always, there are no repeat
            pairings throughout the weekend.
          </p>
          <p class="mb-6">
            With the draft less than 84 hours away, both captains have undoubtedly begun preparing their respective draft
            strategies. But come Saturday evening, when it's all said and done, only one captain will be etching their name into
            the Ryder history books and hoisting the Cup in the famous Whiskey Room at the Lake of the Woods Brewery. The other,
            will only be able to imagine what could have been as they reflect upon their mistakes and ponder how it all went so
            horribly wrong. Who will get the better of whom in what's sure to be another classic Zander/Rohan showdown? Only
            time will tell which team is going to come out on top...
          </p>
        `,
      },
      {
        id: 5,
        title: 'Ontario, More to Discover!',
        showTitle: true,
        imageUrl: '/img/husky-the-musky.jpg',
        publishedDate: DateTime.fromISO('2022-04-19'),
        author: 'Ryder Commissioner',
        html: `
          <p class="mb-6">
            After a tumultuous couple of COVID ridden years, the Ryder Cup will make its glorious return to June in 2022.
            And after spraying dozens of balls towards the Ontario shoreline during last year's event at Buffalo Point,
            it only made sense that we go the extra mile and officially cross the border to find our next venue in Kenora
            for 2022.
          </p>
          <p class="mb-6">
            This year's event will feature the same four formats that by now veteran participants should be very familiar
            with. The tournament will begin Friday morning with Fourball, followed by MM Scotch in the afternoon. Play
            will continue Saturday morning with Alternate shot, and will be concluded in the afternoon with the Singles
            matches.
          </p>
          <p class="mb-6">
            With the first tee time less than 2 months away, preparations are well underway as serious golfers have begun
            fine tuning their swings in the simulator, while serious drinkers having been ramping up their tolerances on
            the curling ice.
          </p>
          <p class="mb-6">
            Stay tuned for more updates as the field is finalized and the start of the event approaches.
          </p>
        `,
      },
      {
        id: 4,
        title: 'In Memoriam...',
        showTitle: false,
        imageUrl: '/img/rip-dm.jpg',
        publishedDate: DateTime.fromISO('2022-04-12'),
        author: 'Ryder Commissioner',
        html: `
          <p class="mb-6">
            It is with great sadness that we must announce the inability of our colleague and friend, DM, to participate in
            the 2022 Manitoba Ryder Cup.
          </p>
          <p class="mb-6">
            DM had been a staple at Manitoba's most prestigious golf event for over 5 years, and during that time he had
            established a reputation as a fierce competitor, heavy drinker, and above all, an outstanding teammate.
            Unfortunately, as all CAs know all too well, "Month End" comes for us all and it waits for no one.
          </p>
          <p class="mb-6">
            While you may not be with us in Kenora this year, know that we will hold you in our hearts forever.
          </p>
          <p class="mb-6">
            Godspeed, DM, until we meet again...
          </p>
        `,
      },
      {
        id: 2,
        title: 'Captain Phin',
        showTitle: true,
        imageUrl: '/img/captain-phin.jpg',
        publishedDate: DateTime.fromISO('2021-09-09'),
        author: 'Ryder Commissioner',
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
        showTitle: true,
        imageUrl: '/img/captain-macaulay.jpg',
        publishedDate: DateTime.fromISO('2021-09-09'),
        author: 'Ryder Commissioner',
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
        showTitle: true,
        imageUrl: '/img/lots-sign.jpg',
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
