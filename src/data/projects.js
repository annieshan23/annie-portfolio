// Project metadata. Edit titles, briefs, tags, tabs, and links here without
// touching layout code. Images are referenced by filename in public/images.
// Reminder: keep all copy free of dashes (no hyphens, en dashes, em dashes).

// Data section sub tabs.
export const dataTabs = [
  { id: 'analysis', label: 'Data Analysis', tools: 'SQL · Excel' },
  { id: 'viz', label: 'Data Visualization', tools: 'Tableau' },
  { id: 'ml', label: 'Machine Learning', tools: 'R · Python' },
]

// Data projects. `tabs` controls which sub tabs a project appears under
// (a project can appear in more than one). `template` selects the detail layout:
//   'A' → analysis / consulting spine (Question, Setup, Work, Payoff)
//   'B' → modeling on public data, slide driven
//
// `landingRank` is the ONLY thing that controls the landing page's "selected
// data work" section. Give a project a number to feature it there; the landing
// shows only the numbered projects, sorted ascending (1 first). Leave the field
// off to keep a project on the /data page but OFF the landing. To change which
// six (or however many) appear, or their order, just edit these numbers.
export const dataProjects = [
  {
    slug: 'sql-ecommerce-analytics',
    landingRank: 2,
    // Placed first so it leads the /data Data Analysis tab (array order drives
    // the /data page; the landing uses landingRank instead).
    image: '/images/projects/sql-ecommerce-analytics/thumb.png',
    title: 'E-commerce Analytics for an Online Retailer, from Clicks to Revenue',
    tag: 'data analysis',
    brief:
      'A full SQL analysis of an online store, tracing visitors from the ad they click to the order they place, and turning six raw tables into decisions a growth team can act on.',
    tabs: ['analysis'],
    template: 'C',
    badge: 'dataset',
    badgeLabel: 'public dataset · end to end SQL',
    imageLabel: 'conversion funnel hero',
    meta: {
      tools: 'MySQL',
      methods: 'Conversion funnels, CTEs and temporary tables, subqueries, CASE WHEN pivots',
      dataset: 'Maven Fuzzy Factory',
    },
    // Template C content: the Question, Setup, Work, Takeaways rhythm with SQL
    // code blocks. Featured code stays short (skeleton only); the GitHub link
    // carries the full queries. No dashes in any copy.
    detail: {
      hero: 'sqlFunnel',
      question: {
        heading: "Where does an online store's revenue really come from, and where does it leak?",
        body:
          'The company spent heavily on paid search but had no clear read on which campaigns paid off, where visitors dropped off, or which products drove growth. Every answer lived in raw tables. I used SQL to turn six sprawling tables into decisions the marketing and product teams could act on.',
      },
      setup: {
        heading: 'Six tables, one customer journey',
        body:
          'The data traces every visitor from the ad they clicked, through the pages they viewed, to the order they placed. Joining sessions to pageviews to orders let me follow the full journey and measure it at every step.',
        tables: [
          'website_sessions',
          'website_pageviews',
          'orders',
          'order_items',
          'products',
          'order_item_refunds',
        ],
      },
      work: {
        heading: 'Five analyses, one growth story',
        subhead: 'Each analysis pairs a business question, the SQL behind it, and what it revealed.',
        featured: [
          {
            title: 'Conversion funnel',
            question: 'Where do buyers drop off between landing and checkout?',
            approach:
              'I flagged each pageview as a funnel step, rolled those up to one row per session, then counted how many reached each stage.',
            code: `-- Flag each funnel page, then roll up to one row per session
CREATE TEMPORARY TABLE session_flags SELECT
  website_session_id,
  MAX(CASE WHEN pageview_url = '/cart' THEN 1 ELSE 0 END) AS to_cart
  -- ...one flag per funnel page (products, shipping, billing, thankyou)
FROM website_pageviews GROUP BY website_session_id;

-- Count sessions reaching each stage
SELECT COUNT(DISTINCT website_session_id) AS sessions,
  COUNT(DISTINCT CASE WHEN to_cart = 1 THEN website_session_id END) AS to_cart
  -- ...through to_thankyou
FROM session_flags;`,
            finding:
              'The biggest drop came at the billing page. An A/B test of a redesigned billing page then lifted the session to order rate.',
          },
          {
            title: 'Channel portfolio',
            question: 'How do paid, brand, direct, and organic channels compare over time?',
            approach:
              'I bucketed each session into a channel with CASE WHEN, then pivoted the counts by month and expressed each channel as a share of paid nonbrand.',
            code: `-- Bucket sessions into channels, then pivot by month
SELECT YEAR(created_at) AS yr, MONTH(created_at) AS mo,
  COUNT(DISTINCT CASE WHEN channel = 'paid_nonbrand' THEN website_session_id END) AS nonbrand
  -- ...brand, direct, organic and each as a share of nonbrand
FROM (
  SELECT website_session_id, created_at,
    CASE WHEN utm_campaign = 'nonbrand' THEN 'paid_nonbrand'
         WHEN utm_campaign = 'brand' THEN 'paid_brand'
         WHEN utm_source IS NULL AND http_referer IS NULL THEN 'direct_type_in'
         ELSE 'organic_search' END AS channel
  FROM website_sessions
) t GROUP BY 1, 2;`,
            finding:
              'Brand and direct traffic grew as a share of paid nonbrand over time, a sign the brand was gaining its own pull rather than relying only on bought clicks.',
          },
        ],
        cards: [
          {
            title: 'Traffic source analysis',
            question: 'Which paid campaigns actually drive revenue, not just clicks?',
            technique:
              "Traced each session's UTM source and campaign back to the orders table, then calculated a true session to order conversion rate for each source.",
            finding:
              'gsearch nonbrand drove the most traffic but converted at only 2.8%, below the 4% benchmark, so we were overbidding for low intent clicks. A follow up comparison by device also showed desktop converting far higher than mobile (3.7% versus 0.9%), which guided a shift in bids toward desktop.',
          },
          {
            title: 'Seasonality',
            question: 'When are our customers most active across the year, the week, and the day?',
            technique:
              'Aggregated session and order volume by month and week to find seasonal peaks, then built a weekday by hour pivot using AVG to map demand across the week.',
            finding:
              'Clear seasonal peaks emerged around holiday periods, informing inventory and staffing plans, and the weekday by hour view identified the busiest windows to guide live chat support hours.',
          },
          {
            title: 'Product analysis',
            question: 'How did sales and conversion shift after a second product launched?',
            technique:
              'Tracked product level sales trends by month, then measured conversion rate and revenue per session across the launch, plus product level pathing and click through before and after.',
            finding:
              'Revenue rose after the second product launched, but overall product sales dipped the following month, flagging a need to actively promote the new product rather than assume it would grow on its own.',
          },
        ],
      },
    },
    links: { github: 'https://github.com/annieshan23/ecommerce-sql-analysis' },
  },
  {
    slug: 'online-learning-behavior',
    landingRank: 1,
    image: '/images/projects/online-learning-behavior/thumb.png',
    title: 'Customer Behavior Analysis for an Online Learning Platform',
    subtitle:
      'An end to end business analysis: extracting behavioral data from a 30k row database with SQL, then building a five tab interactive Tableau dashboard that follows the student journey from onboarding to churn.',
    tag: 'data analysis and visualization',
    brief:
      'An end to end analysis of an online learning platform, from SQL extraction of a 30k row database to a five tab interactive Tableau dashboard covering engagement, conversion, and retention.',
    // Cross listed: appears under both the Data Analysis and Data Visualization
    // tabs on the /data page. The same detail page is reached from either tab.
    tabs: ['analysis', 'viz'],
    template: 'D',
    badge: 'dataset',
    badgeLabel: 'End to end BA project with SQL and Tableau',
    liveDashboard: true,
    imageLabel: 'online learning dashboard hero',
    meta: {
      tools: 'MySQL · Tableau',
      scope: '12 SQL extracts · 15+ sheets · 5 connected dashboards',
      dataset: '365 platform data, 30k+ rows',
    },
    // Template D content: the Question, Extraction, Dashboard, Reveals rhythm.
    // Featured SQL stays short (skeleton only); the GitHub link carries the full
    // 12 queries. No dashes in any copy.
    detail: {
      hero: 'onlineLearning',
      question: {
        heading:
          "How do you turn a student's every click into a story about who stays, who pays, and who leaves?",
        body:
          'An online learning company had rich behavioral data on lectures, quizzes, exams, and subscriptions, but no single view of the customer journey. Leadership wanted to know how to measure engagement, how long students stay, what drives free to paid conversion, and where the platform loses people, so they could act to lift retention.',
      },
      extraction: {
        heading: 'Shaping 30k rows into dashboard ready tables',
        intro:
          'SQL queries are the first step, pulling the relevant data out of the raw activity logs and shaping it into clean tables, one per business question. Here is a demonstration of a couple of the queries and the logic behind them.',
        featured: [
          {
            title: 'Free to paid conversion buckets',
            approach:
              'Grouped students by minutes watched to see how engagement relates to converting from free to paid.',
            code: `-- Bucket students by minutes watched, then measure conversion
SELECT watch_bucket,
  COUNT(DISTINCT student_id) AS students,
  SUM(paid) / COUNT(DISTINCT student_id) AS conv_rate
  -- ...CASE WHEN groups minutes watched into buckets
FROM student_engagement
GROUP BY watch_bucket;`,
          },
          {
            title: 'Career track certification funnel',
            approach:
              'Traced students from enrollment through the nine required course exams to final certification.',
            code: `-- Count students at each stage of the certification funnel
SELECT COUNT(DISTINCT enrolled_id) AS enrolled,
  COUNT(DISTINCT exam_passed_id) AS exams_passed,
  COUNT(DISTINCT certified_id) AS certified
FROM career_track_funnel;`,
          },
        ],
      },
      dashboard: {
        heading: 'Five connected views, one live story',
        body:
          'The five tabs share filters and parameters, so the whole student journey is explorable in one place. The dashboard below is fully interactive; use its own tabs to move between Overview, Engagement, Cohorts, Exams, and Learning.',
        embedUrl:
          'https://public.tableau.com/views/5_Learning-Workbook2_17856127753480/Overview?:showVizHome=no&:embed=true&:tabs=yes&:toolbar=yes',
      },
      reveals: {
        heading: 'One insight from each view',
        blocks: [
          {
            title: 'Overview',
            text:
              'Top rated courses and key KPIs at a glance, with clear gaps between the most and least engaging content.',
            bg: '#F3EEF7',
            border: '#7E5C9E',
          },
          {
            title: 'Engagement',
            text:
              'Engaged students rise and dip with clear seasonal patterns, and paying students stay engaged far longer than free ones.',
            bg: '#EDEFF7',
            border: '#5A6BB0',
          },
          {
            title: 'Cohorts',
            text:
              'Cohort analysis by join period shows where retention fades, and that the early months decide long term loyalty.',
            bg: '#EAF1F0',
            border: '#4E8F86',
          },
          {
            title: 'Exams and certificates',
            text:
              'The career track funnel drops off sharply at the nine exam requirement, the clearest barrier to certification.',
            bg: '#F7EFEA',
            border: '#B07A55',
          },
          {
            title: 'Student learning',
            text:
              'Minutes watched tracks with subscription length up to a point, pinpointing the engagement threshold where students commit to paying.',
            bg: '#F3EEF7',
            border: '#8E6DA0',
            full: true,
          },
        ],
      },
    },
    links: {
      github: 'https://github.com/annieshan23/365-customer-behavior-dashboard',
      dashboard:
        'https://public.tableau.com/app/profile/xinhui.shan/viz/5_Learning-Workbook2_17856127753480/Overview',
    },
  },
  {
    slug: 'dance-nonprofit-dashboard',
    image: '/images/projects/dance-nonprofit/thumb.jpg',
    landingRank: 3,
    title: 'Unified Analytics Dashboard for a Dance Nonprofit',
    tag: 'data analysis',
    brief:
      'Four disconnected platforms brought into one honest view of how a nonprofit reaches and keeps its audience.',
    tabs: ['analysis', 'viz'],
    template: 'A',
    badge: 'nda',
    badgeLabel: 'real client engagement, figures anonymized under NDA',
    liveDashboard: true,
    imageLabel: 'data flow hero',
    meta: {
      role: 'Led cross platform buyer matching and enrollment analysis, contributed to ticketing, donations and dashboards',
      tools:
        'Excel: VLOOKUP, XLOOKUP, UNIQUE, COUNTIF, SUMIF, pivot tables\nTableau: Dual axis chart, scatter plot, time series',
      timeline: 'Eight weeks',
      team: 'Northwestern CMI',
    },
    // Full body content for the Template A detail page. Kept here so copy can be
    // edited without touching layout. All copy is free of dashes.
    detail: {
      hero: 'danceDataFlow', // selects the custom SVG hero in DataProject.jsx
      question: {
        heading:
          'How does a data rich nonprofit actually use data scattered across four separate platforms?',
        body:
          'The organization collected plenty of data, but each platform spoke its own language, with different metrics, different reports, and no common customer ID to tie them together. Leadership had no shared view of who their audience was, where revenue actually came from, or whether the families they worked so hard to reach ever came back. Reports lived in separate systems, so every question meant stitching numbers together by hand. The real question was not what to measure, but how to see the whole picture at once.',
      },
      setup: {
        intro:
          'Four systems, each built for a different job, none designed to talk to the others.',
        sources: [
          { name: 'DRT', role: 'ticketing', color: '#C98A98' },
          { name: 'iClassPro', role: 'enrollment', color: '#8FB089' },
          { name: 'Neon CRM', role: 'donations', color: '#A99BD0' },
          { name: 'Classbug', role: 'historical reference', color: '#8FA0B4' },
        ],
        challenge:
          'The systems shared no common customer ID, so the same family could look like four different people. We built a match key from email and phone, then validated it with a performer name signal, to reconcile the four sources into one source of truth.',
      },
      // Five pillars. The two Annie led are marked led: true and placed first.
      // A star alone marks them, with no other label.
      pillars: [
        {
          title: 'Ticket buyer matching',
          question: 'Who is actually buying tickets, and can we recognize them across systems?',
          method:
            'Entity resolution. Built a match key from email and phone, validated with a performer name signal, to link buyers across platforms.',
          finding:
            'Most buyers resolved to a single identity, revealing that a small core of families drives a large share of ticket revenue.',
        },
        {
          title: 'Student enrollment, retention and tenure',
          question: 'Are we losing students, or never fully acquiring them in the first place?',
          method:
            'Cohort and tenure analysis across enrollment history, reframing the problem from churn to acquisition.',
          finding:
            'Most attrition happened early in a student tenure, so the opportunity was converting first year students into returning ones, not chasing long term churn.',
        },
        {
          title: 'Ticket selling',
          question: 'Which performances and channels actually drive ticket sales?',
          method: 'Sales breakdowns across shows, seasons, and buyer segments.',
          finding:
            'Sales concentrated around a few flagship performances, with clear room to lift the quieter ones.',
        },
        {
          title: 'Donations, efficiency scoring',
          question: 'Where do donations come from, and which efforts are worth the effort?',
          method: 'Donor segmentation and a simple efficiency score weighing return against effort.',
          finding:
            'A handful of donor relationships carried most of the giving, so broad appeals returned far less than focused stewardship.',
        },
        {
          title: 'Discovery touchpoints',
          question: 'How do new families first find the organization?',
          method: 'Mapped first touch and discovery signals across the available records.',
          finding:
            'Word of mouth and community events outperformed paid channels as the way families discovered the organization.',
        },
      ],
      payoff: {
        body:
          'We delivered four separate dashboards, one per platform, because a single unified view was not feasible at the time. The metrics were too sparse and inconsistent across systems to reconcile into one reliable picture, and saying so honestly was itself a finding. Before the organization could see itself whole, it first had to standardize what it collects.',
        recommendations: [
          'Adopt a shared customer ID across platforms so one family can be recognized everywhere.',
          'Standardize the handful of metrics that matter most, so each system measures them the same way.',
          'Focus on early retention and the small core of high value families, where the data shows the biggest return.',
        ],
      },
      reporting: {
        heading: 'From analysis to a story leadership could act on',
        body:
          'After integrating the four platforms and analyzing the data, the final deliverable was an insight report that turned the findings into a clear narrative for leadership, pairing each result with a recommendation they could act on. A few excerpts from the report:',
        images: [
          { src: '/images/projects/dance-nonprofit/report-1.png', label: 'report excerpt 1' },
          { src: '/images/projects/dance-nonprofit/report-2.png', label: 'report excerpt 2' },
        ],
      },
      extension: {
        heading: 'A unified Tableau dashboard, built on simulated data',
        body:
          'To show what a single view could look like, I built a unified Tableau dashboard on simulated data that mirrors the real structure of the four platforms.',
        // Paste the Tableau public embed URL here to make the iframe live.
        embedUrl:
          'https://public.tableau.com/views/CMIDummyDashboard/Dashboard1?:showVizHome=no&:embed=true&:toolbar=yes',
      },
    },
    links: { dashboard: 'https://public.tableau.com/views/CMIDummyDashboard/Dashboard1' },
  },
  {
    slug: 'relay-retention',
    landingRank: 4,
    image: '/images/projects/relay-retention/thumb.jpg',
    title: "Customer Retention Strategy for Relay's Delivery Service",
    tag: 'marketing analytics',
    brief:
      'Survival models that separate high engagement customers from those quietly about to churn.',
    tabs: ['ml'],
    template: 'B',
    badge: 'dataset',
    badgeLabel: 'public dataset, statistical modeling in R',
    imageLabel: 'kaplan meier hero',
    meta: {
      tools: 'R · survival · ggplot2',
      models: [
        'survival analysis',
        'AFT models',
        'Kaplan Meier',
        'Cox PH',
        'logistic regression',
        'probit',
        'likelihood ratio test',
      ],
    },
    // Slide driven Template B content. Slide images stay as labeled placeholders
    // until exported PNGs are dropped in. All copy is free of dashes.
    detail: {
      hero: 'kaplanMeier',
      question: {
        heading: 'For an online grocery service, retention is the whole game',
        body:
          'Relay is an online grocery delivery service, the kind of business that lives or dies on repeat orders. Winning a customer once is easy; keeping them ordering week after week is the real challenge, and the one that decides whether the business grows. So the question became which customer behaviors actually keep people coming back, and how long before a quiet customer is gone for good. Retention turned out to hide two separate questions, and each needed a different model to answer.',
        points: [
          {
            label: 'Who stays',
            text: 'A binary outcome. Is a customer retained or churned by the end of the window?',
          },
          {
            label: 'How long they stay',
            text: 'A duration. How much time passes before a customer churns, and what shortens it?',
          },
        ],
      },
      setup: {
        eyebrow: '02 / the framework',
        heading: 'Three behavioral levers a marketing team can pull',
        intro:
          'The public dataset covers 6,133 delivery customers, each described by three groups of behavior.',
        stats: [
          { number: 6133, label: 'customers' },
          { number: 3, label: 'behavioral levers' },
        ],
        levers: [
          {
            name: 'Email engagement',
            text: 'How consistently a customer opens and acts on emails.',
            icon: 'mail',
            bg: '#EFEAF7',
            border: '#7E5C9E',
            iconTile: '#7E5C9E',
            heading: '#4A2F5E',
            chipBg: '#E0D5EC',
            chipText: '#5A4076',
            vars: ['esent', 'eopenrate', 'eclickrate'],
          },
          {
            name: 'Purchase behavior',
            text: 'Order frequency, value, and how recently they last bought.',
            icon: 'cart',
            bg: '#EAEEF7',
            border: '#5A6BB0',
            iconTile: '#5A6BB0',
            heading: '#33407A',
            chipBg: '#D6DDF0',
            chipText: '#3B4A85',
            vars: ['avgorder', 'ordfreq'],
          },
          {
            name: 'Service adoption',
            text: 'Whether a customer takes up added services that deepen the relationship.',
            icon: 'refresh',
            bg: '#E8F1EF',
            border: '#4E8F86',
            iconTile: '#4E8F86',
            heading: '#2E5B54',
            chipBg: '#D4E6E2',
            chipText: '#356B62',
            vars: ['paperless', 'refill', 'doorstep'],
          },
        ],
      },
      work: {
        eyebrow: '03 / the work',
        heading: 'Modeling retention in two steps',
        steps: [
          {
            introEyebrow: 'step 1 · the binary model',
            introBody:
              'The first model asks a yes or no question: by the end of the window, is a customer retained or churned? I fit a logistic regression as the main model, with a linear probability model and probit as robustness checks, across all three behavioral levers.',
            blocks: [
              {
                label:
                  'slide: binary model summary of results, the LPM, Logit and Probit coefficient table',
                image: '/images/projects/relay-retention/binary-model-summary.jpg',
              },
            ],
          },
          {
            introEyebrow: 'step 2 · survival analysis',
            introBody:
              'Knowing whether a customer stays is only half the story. To capture timing, I turned to survival analysis, modeling time until churn with right censoring for customers still active at the cutoff. Four parametric distributions were tested, and the lognormal fit best, matching a tenure pattern where churn risk peaks early then gradually declines.',
            blocks: [
              {
                label: 'slide: lognormal AFT model results and interpretation',
                image: '/images/projects/relay-retention/lognormal-aft-result.jpg',
              },
              {
                type: 'pair',
                slides: [
                  {
                    label: 'slide: Kaplan Meier plot by email engagement',
                    image: '/images/projects/relay-retention/km-by-email.jpg',
                  },
                  {
                    label: 'slide: Cox proportional hazards, robustness',
                    image: '/images/projects/relay-retention/cox-ph.jpg',
                  },
                ],
              },
            ],
          },
        ],
      },
      payoff: {
        eyebrow: '04 / marketing implication',
        heading: 'What the two models mean for marketing',
        summary:
          'Read together, the two models point to one story: retention is driven by engagement and habit formation, not by transaction value. Big one off orders do not build loyalty, but consistent email contact and automated refill do. The clearest opportunity is to turn occasional buyers into habitual ones, and to do it early, before churn risk peaks.',
        slides: [
          {
            label: 'slide: cross model implications, the binary versus survival comparison',
            image: '/images/projects/relay-retention/cross-model-comparison.jpg',
          },
          {
            label:
              'slide: behavioral insights and marketing strategies, the three numbered insights with strategies',
            image: '/images/projects/relay-retention/marketing-strategies.jpg',
          },
        ],
      },
      code: {
        language: 'R',
        snippet: `library(survival)

# Kaplan Meier survival by email engagement
km <- survfit(Surv(tenure, churned) ~ email_segment, data = customers)

# Accelerated failure time model across the three levers
aft <- survreg(
  Surv(tenure, churned) ~ email + purchases + service,
  data = customers,
  dist = "weibull"
)
summary(aft)`,
      },
    },
    links: { githubR: '#', githubPython: '#' },
  },
  {
    slug: 'tiktok-creator-emotion',
    landingRank: 5,
    image: '/images/projects/tiktok/thumb.png',
    title: 'Can Creator Emotion Predict Audience Admiration?',
    tag: 'machine learning',
    brief:
      'Four models on TikTok video features that tell an honest story: admiration is hard to predict, but joy is the one signal that holds up.',
    tabs: ['ml'],
    template: 'B',
    badge: 'dataset',
    badgeLabel: 'machine learning in R',
    imageLabel: 'feature effects hero',
    meta: {
      tools: 'R · glmnet · xgboost',
      models: [
        'OLS',
        'interaction effects',
        'LASSO',
        'XGBoost',
        'feature selection',
        'log transformation',
      ],
    },
    // Slide driven Template B content. Honest framing: weak fit first, joy as the
    // surviving signal, brand takeaways as directional hints not decision rules.
    // Slide images stay as labeled placeholders until exported PNGs are dropped
    // into public/images/projects/tiktok/. All copy is free of dashes.
    detail: {
      hero: 'tiktokSignal',
      question: {
        heading: 'Rethinking how brands pick creators',
        // Four beats with varying treatment, so the section reads as a
        // progression: plain lead, violet intro block, a quieter left rule, then
        // a strong highlight card for the research question.
        beats: [
          {
            variant: 'lead',
            body:
              "Brands usually pick influencers by follower count, topic, and engagement. We asked whether the creator's emotional tone belongs in that list too.",
          },
          {
            variant: 'intro',
            eyebrow: 'our proposition',
            body:
              'Joy and anger are known to boost engagement. So maybe they also predict admiration, the kind of audience feeling that signals trust and credibility.',
          },
          {
            variant: 'rule',
            eyebrow: 'why it matters',
            body:
              'If they do, brands get a new way to screen creators. Not just what a creator talks about, but whether their emotional style makes people admire them.',
          },
          {
            variant: 'highlight',
            eyebrow: 'the research question',
            body:
              "Can a creator's emotions, mainly joy and anger, predict how much an audience admires them, and does that change with the creator's size?",
          },
        ],
      },
      setup: {
        eyebrow: '02 / the setup',
        heading: 'What we measured, and what we were working with',
        intro:
          "The data is a sample of short science related TikTok videos, each tagged with the emotions in its transcript, the creator's follower tier, and how much admiration its comments express. Before any modeling, two things shaped the setup: the creators sit in very different size tiers, and the emotion scores are badly skewed.",
        blocks: [
          {
            heading: 'The tiers',
            text:
              "Earlier work by Yoo and colleagues found that a creator's emotional effect on audiences changes with creator size, but they studied travel vlogs on YouTube. We test whether the same holds for short science content on TikTok, sorting creators into tiers by follower count.",
            slide: {
              label: 'slide: influencer tier definitions',
              image: '/images/projects/tiktok/tier-definitions.png',
            },
          },
          {
            heading: 'Data and variables',
            text:
              'The outcome is mean comment admiration. The predictors of interest are joy and anger in the transcript, plus the creator tier. Everything else, reach, engagement counts, topic flags, and three built variables (tier, a human face in the thumbnail, and transcript word count) goes in as controls. A few overlapping sentiment measures were dropped to avoid multicollinearity.',
            slide: {
              label: 'slide: methodology, DV, IV, and controls',
              image: '/images/projects/tiktok/methodology.png',
            },
          },
          {
            heading: 'One honesty note',
            text:
              'The emotion scores are heavily right skewed, so they were logged before modeling, and the tiers are imbalanced, with far more small creators than large ones. Both facts limit how much the models can see.',
            slide: {
              label: 'slide: summary statistics',
              image: '/images/projects/tiktok/summary-stats.png',
            },
          },
        ],
      },
      work: {
        eyebrow: '03 / the work',
        heading: 'Four models, two jobs',
        intro:
          'Two models to explain what relates to admiration, and two to test how well admiration can be predicted at all.',
        steps: [
          {
            introEyebrow: 'step 1 · explaining with OLS',
            introBody:
              'First, ordinary least squares on the full set of features, then two more versions that let joy and anger interact with creator tier, to check whether emotion matters more for some sizes than others.',
            blocks: [
              {
                type: 'pair',
                slides: [
                  {
                    label: 'slide: OLS main effect',
                    image: '/images/projects/tiktok/ols-main.png',
                  },
                  {
                    label: 'slide: OLS interactions, joy and anger by tier',
                    image: '/images/projects/tiktok/ols-interactions.png',
                  },
                ],
              },
            ],
            takeaway:
              'Joy is the strongest positive signal and larger creators earn less admiration than the smallest ones. But the model explains only about three percent of the variation, and none of the emotion by tier interactions are significant. The direction is real, the size is small.',
          },
          {
            introEyebrow: 'step 2 · predicting with LASSO and XGBoost',
            introBody:
              'Next, two prediction models. LASSO to select the features that carry any signal, and XGBoost to test whether a flexible model can do better. Both were tuned by cross validation and scored on a held out test set.',
            blocks: [
              {
                type: 'pair',
                slides: [
                  {
                    label: 'slide: LASSO top features',
                    image: '/images/projects/tiktok/lasso-features.png',
                  },
                  {
                    label: 'slide: XGBoost feature gain',
                    image: '/images/projects/tiktok/xgboost-gain.png',
                  },
                ],
              },
            ],
            takeaway:
              'Both models land at roughly the error you would get by just guessing the average, and they agree closely with each other. That points to a weak signal that is mostly linear once the data is logged. Admiration is hard to predict from video features alone.',
          },
        ],
      },
      payoff: {
        eyebrow: '04 / implications',
        heading: 'What holds up, and what to do with it',
        summary:
          'The clearest result is a limit: video level features explain very little of what makes an audience admire a creator. Inside that limit, two things hold across every model. Joy is a consistent positive signal, and smaller creators tend to earn more admiration than larger ones. Everything below is directional, worth testing, not a rule to bank on.',
        implications: [
          {
            eyebrow: 'what holds up',
            body:
              'Joy is the single most consistent predictor of admiration, and bigger is not better. Mega, Macro, and Mid Tier creators all draw less admiration than Nano creators. Quality of emotional response seems to matter more than reach.',
            slide: {
              label: 'slide: business implications',
              image: '/images/projects/tiktok/business-implications.png',
            },
          },
          {
            eyebrow: 'for brands, directionally',
            body:
              'Given the weak fit, treat these as leads to test. Brief creators toward warm, joyful tone. For admiration focused campaigns, lean toward nano and micro creators. Stay cautious with angry or political content, which trends negative even though the effect is not significant.',
            slide: {
              label: 'slide: for brands',
              image: '/images/projects/tiktok/for-brands.png',
            },
          },
        ],
      },
      code: {
        language: 'R',
        snippet: `library(glmnet)
library(xgboost)

# Explain: OLS of admiration on emotion, tier, and controls
ols_ME <- lm(log_mean_comment_admiration ~ log_transcript_Anger +
               log_transcript_Joy + influencer_tier + controls,
             data = train_data)

# Predict 1: LASSO, lambda chosen by cross validation, with emotion by tier interactions
cv_lasso    <- cv.glmnet(X_with_interactions, Y, alpha = 1)
final_lasso <- glmnet(X_with_interactions, Y, alpha = 1, lambda = cv_lasso$lambda.min)

# Predict 2: XGBoost, depth and learning rate chosen by 5 fold CV
final_xgb <- xgboost(data = dtrain, params = best_params, nrounds = best_nrounds)`,
      },
    },
    links: { githubR: '#' },
  },
  {
    slug: 'kakao-causal-inference',
    landingRank: 6,
    image: '/images/projects/kakao/thumb.png',
    title: "Income Heterogeneity in a Viral Game's Platform Spillover",
    tag: 'machine learning',
    brief:
      "Propensity score matching and panel difference in differences to find who a viral game's platform spillover actually reaches.",
    tabs: ['ml'],
    template: 'B',
    badge: 'dataset',
    badgeLabel: 'causal inference in R',
    imageLabel: 'difference in differences hero',
    meta: {
      tools: 'R · MatchIt · plm',
      models: [
        'propensity score matching',
        'panel DID',
        'fixed effects',
        'difference in differences',
        'interaction effects',
        'robustness checks',
      ],
    },
    // Slide driven Template B content. Effects are described by direction,
    // significance, and robustness only, never as percentage figures. Slide
    // images stay as labeled placeholders until exported PNGs are dropped into
    // public/images/projects/kakao/. All copy is free of dashes.
    detail: {
      hero: 'kakaoDid',
      question: {
        heading:
          'For a platform, one viral hit only pays off if it lifts everything around it',
        body:
          "Anipang was a runaway hit inside Kakao's game platform. Earlier work found that adopting it spills over into the rest of the Kakao game ecosystem, not just the game itself. But a platform wide average can hide who actually benefits. Income shapes how people spend time on their phones, how much a free game competes for their attention, and how price sensitive they are, so the real question was whether that spillover reaches every income segment equally, or concentrates in a few.",
        points: [
          {
            label: 'the spillover',
            text:
              'Does adopting one viral game deepen engagement with the broader Kakao game platform?',
          },
          {
            label: 'the heterogeneity',
            text:
              'And is that lift shared evenly across income groups, or driven by some more than others?',
          },
        ],
      },
      setup: {
        eyebrow: '02 / the setup',
        heading: 'A release nobody could randomize, so the design carries the weight',
        intro:
          "The data follows 849 Android users across two weeks, the week before and the week after Anipang's release, with 56 adopters and 793 non adopters. Nobody was assigned to adopt, they chose to, which creates two problems. Adopters may already be heavier gamers, so a raw comparison confuses who they are with what the game did. And usage could climb for reasons that have nothing to do with Anipang. The design answers both.",
        stats: [
          { number: 849, label: 'users' },
          { number: 56, label: 'adopters' },
          { number: 2, label: 'weeks' },
          { number: 10, label: 'matching specs' },
        ],
        levers: [
          {
            name: 'Propensity score matching',
            text:
              'Match each adopter to the most similar non adopter on pre release behavior, so the two groups start comparable and selection bias drops out.',
            icon: 'link',
            bg: '#EFEAF7',
            border: '#7E5C9E',
            iconTile: '#7E5C9E',
            heading: '#4A2F5E',
            chipBg: '#E0D5EC',
            chipText: '#5A4076',
            vars: ['age', 'income', 'education', 'gender', 'baseline non kakao usage'],
          },
          {
            name: 'Difference in differences',
            text:
              "Compare each group's change from before to after. Shared time trends cancel, leaving the part of the change that tracks adoption.",
            icon: 'swap',
            bg: '#EAEEF7',
            border: '#5A6BB0',
            iconTile: '#5A6BB0',
            heading: '#33407A',
            chipBg: '#D6DDF0',
            chipText: '#3B4A85',
            vars: ['tg', 'ii', 'week'],
          },
          {
            name: 'Panel fixed effects',
            text:
              'Absorb stable user traits like personality and phone habits, so they cannot masquerade as the treatment effect.',
            icon: 'layers',
            bg: '#E8F1EF',
            border: '#4E8F86',
            iconTile: '#4E8F86',
            heading: '#2E5B54',
            chipBg: '#D4E6E2',
            chipText: '#356B62',
            vars: ['individual FE', 'week FE'],
          },
        ],
        // Two column key and value list. Each value is a sequence of inline
        // segments: {code} renders as a mono chip, {text} as plain prose.
        variables: {
          rows: [
            {
              label: 'outcome',
              value: [
                { code: 'lt_kakao_game' },
                { text: 'logged game time,' },
                { code: 'n_kakao_game' },
                { text: 'games used' },
              ],
            },
            {
              label: 'treatment',
              value: [
                { code: 'ii' },
                { text: 'equals 1 for adopters in the week after release, 0 otherwise' },
              ],
            },
            {
              label: 'moderator',
              value: [{ code: 'income' }, { text: 'with group 3 held as the reference' }],
            },
            {
              label: 'matching',
              value: [
                { code: 'age' },
                { code: 'income' },
                { code: 'education' },
                { code: 'gender' },
                { text: 'plus baseline non kakao behavior' },
              ],
            },
          ],
          footnote:
            'Time is logged to tame skew. Because income group 3 is the reference, every income effect reads relative to it.',
        },
      },
      work: {
        eyebrow: '03 / the work',
        heading: 'Building the estimate in two steps',
        intro:
          'First make the groups comparable, then measure the difference in how they changed.',
        steps: [
          {
            introEyebrow: 'step 1 · propensity score matching',
            introBody:
              'Matching runs on week 1 behavior only, before anyone could be affected by the release. To be sure the result was not an artifact of one arbitrary choice, I ran the match ten ways, varying the ratio of controls to adopters, the caliper width, and whether controls could be reused.',
            blocks: [
              {
                label: 'slide: PSM matching, raw vs matched propensity distributions',
                image: '/images/projects/kakao/psm-matching.png',
              },
            ],
            takeaway:
              "After matching, 56 adopters and 56 controls overlap on pre release behavior. The control group's propensity scores were bunched at low values before, and line up with the adopters after, so any gap that appears once the game launches can no longer be pinned on who chose to adopt.",
          },
          {
            introEyebrow: 'step 2 · panel did with fixed effects',
            introBody:
              'On the matched sample I estimate the change in engagement for adopters against controls, with week and individual fixed effects, and read the ii by income interaction to see whether the spillover differs by segment. I ran it two ways, a fixed effects estimator and a dummy variable regression as a cross check, for both outcomes.',
            blocks: [
              {
                type: 'pair',
                slides: [
                  {
                    label: 'slide: Output, log time',
                    image: '/images/projects/kakao/output-log-time.png',
                  },
                  {
                    label: 'slide: Output, number of games',
                    image: '/images/projects/kakao/output-n-games.png',
                  },
                ],
              },
            ],
            takeaway:
              'The adoption effect is positive and significant in all ten specifications for both outcomes. Income groups 2 and 4 come out consistently stronger than the reference group, while income group 1 is never significant. The fixed effects and dummy regression estimates match exactly, which is the expected sign that both are specified correctly.',
          },
        ],
      },
      payoff: {
        eyebrow: '04 / marketing implication',
        heading: 'What the two outcomes mean for the platform',
        summary:
          'Read together, time and breadth tell one story with a caveat. Adopting a viral game reliably deepens how much time users spend across the Kakao game platform, and that lift is largest for middle and higher income segments. The effect on how many different games they try is positive but weaker and less stable. So a hit game is a dependable lever for depth, and a softer one for breadth.',
        implications: [
          {
            eyebrow: 'implication one · depth',
            body:
              'Hit games deepen platform engagement, and most of all for higher income users. A viral title works as an entry point into the wider ecosystem, so the moment right after adoption is when retention campaigns, personalization, and loyalty perks aimed at income groups 2 and 4 will pay off most.',
            slide: {
              label: 'slide: Managerial Implication 1, hit games deepen engagement',
              image: '/images/projects/kakao/implication-1-depth.png',
            },
          },
          {
            eyebrow: 'implication two · breadth',
            body:
              'Breadth has to be engineered, not assumed. Adopting one hit does not reliably push users toward more games, so exploration needs a nudge: cross promotion, limited time bundles, friend referrals, and homepage placement that hand users the next game rather than waiting for them to find it.',
            slide: {
              label: 'slide: Managerial Implication 2, engagement counts are less consistent',
              image: '/images/projects/kakao/implication-2-breadth.png',
            },
          },
        ],
      },
      code: {
        language: 'R',
        snippet: `library(MatchIt)
library(plm)

# Match adopters to comparable non adopters on week 1 behavior
m <- matchit(tg ~ age + income + education + gender +
               lt_non_kakao_game + n_non_kakao_game + lt_non_kakao,
             data = pre.dat, method = "nearest", ratio = 1)

# Panel DID with week and individual fixed effects
# ii:income tests whether the spillover differs by income segment
summary(plm(lt_kakao_game ~ as.factor(week) + ii + ii:income,
            data = matched.p, model = "within", weights = weights))`,
      },
    },
    links: { githubR: '#' },
  },
]

// Marketing projects. `size` drives the mixed gallery grid on the marketing
// page. `landingRank` works exactly like it does for data projects above: it
// picks which brand work appears in the landing's "brand stories" section and
// in what order. `size` and `feature` only affect tile layout, not selection.
export const marketingProjects = [
  {
    slug: 'sainsburys',
    landingRank: 1,
    tier: 1,
    title: "Reimagining Sainsbury's for a New Generation",
    tag: 'digital media strategy',
    brief: 'Reimagining a supermarket icon for the digital age with contextual media strategy.',
    size: 'tall',
    feature: true,
    imageLabel: 'sainsburys hero',
    // Gallery + landing thumbnail. Drop the file at this path and it replaces the
    // placeholder on both the /marketing grid and the landing brand stories tile.
    // The tall tile crops to 3:4, so anchor the crop to the right (the fruit) so
    // the wide title slide reads well instead of cutting through the center text.
    image: '/images/marketing/sainsburys/thumbnail.png',
    imagePosition: 'object-right',
    // Marketing detail meta: three fields only, no team, no role.
    meta: {
      type: 'Digital media strategy',
      date: '2026',
      tools: 'Media planning, PESO model, Canva',
    },
    // Reusable marketing detail schema: a one sentence description and a skills
    // line for the hero, an intro section, and a numbered slide deck. Slides live
    // in `slides.folder` named 1.png .. N.png and appear as they are dropped in.
    // No dashes in any copy.
    detail: {
      description:
        'A graduate media strategy project reimagining Sainsbury’s "Try Something New Today" campaign for the digital age, using contextual marketing to turn a habitual shopper into one more item per trip and £2.5 billion in incremental revenue.',
      skills:
        'Audience segmentation, consumer behavior analysis, PESO model application, media channel strategy, KPI framework design, cross functional strategic presentation.',
      intro: {
        heading: 'Meeting the shopper where she already is',
        paragraphs: [
          'For a graduate media strategy course, my team reimagined how Sainsbury’s could relaunch its iconic "Try Something New Today" campaign for the modern digital landscape, with a clear business target of driving £2.5 billion in incremental revenue by nudging each customer to add just one more item per trip.',
          'Our target consumer, a habitual "sleep shopper," doesn’t actively recognize her routine as something to change. That insight led us to reject a traditional customer journey framework in favor of contextual marketing: meeting her at culturally relevant moments throughout her day rather than waiting for a purchase trigger that would never come.',
          'Our process included building a detailed audience experience map tracing nine daily touchpoints, a channel influence audit plotting media against competitive clutter and audience impact, and a multi attribute decision matrix comparing three strategic alternatives across cost, audience relevance, transmedia storytelling potential, and measurability.',
          'Then we proceeded to design the digital strategy around a paid and earned approach, anchored on TV, dynamic OOH, micro influencers, and Sainsbury’s owned platforms, as the strongest combination of cultural visibility, contextual relevance, and ROI accountability. The strategy was structured across six "jobs to be done," from launching cultural awareness of sleep shopping to personalizing in app recommendations and equipping customers to advocate within their communities.',
        ],
      },
      slides: { folder: '/images/marketing/sainsburys', count: 21 },
    },
    links: {},
  },
  {
    slug: 'nyc-food-guide',
    landingRank: 5,
    tier: 3,
    title: "A Foodie's Guide to NYC",
    tag: 'digital marketing',
    brief: 'A student run NYC restaurant discovery site, run through the full digital marketing lifecycle.',
    size: 'wide',
    imageLabel: 'a foodies guide to nyc',
    image: '/images/marketing/nyc-food-guide/thumbnail.png',
    // Marketing detail meta: three fields only, no team, no role.
    meta: {
      type: 'Digital marketing',
      date: '2025',
      tools: 'WordPress, Google Analytics, CJ Affiliate, SEO, SEM',
    },
    // Kept-hyphen terms "end-to-end" and "data-driven" are the approved exception
    // to the no-dashes rule; everything else stays dash free.
    detail: {
      description:
        'An end-to-end digital marketing project at NYU Stern, building a student run NYC restaurant discovery website and running it through the full lifecycle from site architecture and SEO to social, affiliate marketing, and traffic analysis.',
      skills:
        'WordPress, SEO, Google Analytics, content strategy, affiliate marketing, social media management, web traffic analysis.',
      intro: {
        heading: 'Building and marketing a restaurant discovery site',
        lead: 'An end-to-end digital marketing project at NYU Stern built around a student run NYC restaurant discovery website, covering the full lifecycle from site architecture to performance analysis.',
        sections: [
          {
            label: 'What was built',
            text: 'A multi page WordPress website (A Foodie\'s Guide) featuring curated restaurant reviews, ratings, pricing, and food event listings across 10+ cuisine categories, designed for NYC locals, tourists, and budget conscious students.',
          },
          {
            label: 'What was executed',
            items: [
              {
                label: 'Website Development and UX Design',
                text: 'Architected site structure with clear navigation, categorized content taxonomy, and optimized CTAs to reduce bounce and guide user flow.',
              },
              {
                label: 'SEO and Content Strategy',
                text: 'Incorporated targeted keywords and timely content to improve organic discoverability and search ranking.',
              },
              {
                label: 'Google Analytics Integration',
                text: 'Connected the site to Analytics to track weekly traffic, visitor geography (340 US views, 104 from Brazil, 46 from China across 10+ countries), top performing pages, and referral sources.',
              },
              {
                label: 'Social Media Marketing',
                text: 'Launched and managed an Instagram account (@a_foodies_guide_nyc) with location tags, hashtags, and two way engagement to drive earned traffic.',
              },
              {
                label: 'Affiliate Marketing',
                text: 'Partnered with Russell Stover through CJ Affiliate to produce sponsored holiday gifting content, gaining hands on experience with brand partnership monetization.',
              },
              {
                label: 'Performance Analysis',
                text: 'Identified that Instagram was the top referral source, that peak traffic spiked in Week 5 before declining, and used those insights to propose product improvements including smart recommendation engines and enhanced filtering.',
              },
            ],
          },
        ],
      },
      slides: { folder: '/images/marketing/nyc-food-guide', count: 9 },
    },
    links: {},
  },
  {
    slug: 'starbucks',
    landingRank: 2,
    tier: 2,
    title: 'Starbucks Experience Redesign',
    tag: 'customer experience strategy',
    brief: 'A customer experience audit and redesign that cuts friction for hesitant new customers.',
    size: 'small',
    imageLabel: 'starbucks experience redesign',
    image: '/images/marketing/starbucks/thumbnail.png',
    // Marketing detail meta: three fields only, no team, no role.
    meta: {
      type: 'Customer experience strategy',
      date: '2026',
      tools: 'CX audit, MIND framework, Canva',
    },
    detail: {
      description:
        "A customer experience audit and redesign strategy for Starbucks, targeting new customers who find the brand overwhelming and overpriced, and cutting friction and cognitive load across the in store journey to turn hesitation into repeat visits.",
      skills:
        'Customer journey mapping, experience clue design, persona development, CX measurement framework, consumer psychology, strategic narrative.',
      intro: {
        heading: 'Reducing friction for the hesitant newcomer',
        paragraphs: [
          "A customer experience audit and redesign strategy targeting Starbucks' most underleveraged growth segment: new customers who find the brand visually overwhelming, overpriced, and culturally unrelated. As a result, the redesign focused on reducing friction and cognitive load across the in store journey to shift the equation.",
          'The process began with a full experience audit mapping existing touchpoints against their emotional impact, then building a persona (Sammy, a practical, efficiency driven coffee drinker skeptical of premium pricing) to ground every design decision. From there, three targeted experience interventions were developed, each addressing a distinct failure point in the current journey: a sourcing map to communicate quality and justify price premiums; a revised service script to reduce ordering intimidation; and a live wait time countdown to manage expectations and reduce anxiety during peak hours. These were organized under a new experience motif of Reassured, Empowered, Recognized, replacing the existing pattern of accommodation followed by overwhelm.',
          'The redesign was rounded out with a MIND framework analyzing multi sensory, individual, novel, and emotion driven memory formation, and a measurement plan spanning CSAT, CES, NPS, ZMET interviews, and behavioral observation to evaluate clue effectiveness and link experience changes to business outcomes like repeat visits, average order value, and loyalty sign ups.',
        ],
      },
      slides: { folder: '/images/marketing/starbucks', count: 17 },
    },
    links: {},
  },
  {
    slug: 'xfinity',
    landingRank: 3,
    tier: 2,
    title: 'Xfinity Mobile "Data in Dollars" Campaign Analysis',
    tag: 'campaign analysis',
    brief: 'A deconstruction of an award winning contextual campaign, and why one platform held it back.',
    size: 'small',
    imageLabel: 'xfinity data in dollars',
    image: '/images/marketing/xfinity/thumbnail.png',
    // Marketing detail meta: three fields only, no team, no role.
    meta: {
      type: 'Campaign analysis',
      date: '2026',
      tools: 'IMC framework, campaign audit, Canva',
    },
    detail: {
      description:
        'A deconstruction of Xfinity Mobile\'s award winning "Data in Dollars" campaign, which showed YouTube viewers the real time dollar cost of their data mid stream to drive 3.7 million impressions and triple search volume, and a look at why a brilliant hook was held back by a single platform.',
      skills:
        'IMC framework application, campaign deconstruction, consumer behavior analysis, media strategy evaluation.',
      intro: {
        heading: 'What made the hook work, and what held it back',
        paragraphs: [
          'An in depth evaluation of Xfinity Mobile\'s award winning "Data in Dollars" campaign: a contextual advertising strategy that intercepted YouTube viewers mid stream to display the real time dollar cost of their data consumption, driving 3.7 million impressions and tripling online search volume.',
          "The analysis assessed the campaign across three dimensions: its fit with IMC principles, a 10 attribute evaluation spanning idea clarity, audience alignment, mutual value creation, and channel synergy, and an examination of reciprocal value exchange for both the brand and consumer. The central finding: a brilliantly executed contextual hook undermined by a single platform limitation and an experience disconnect between the campaign's transparency promise and Xfinity's broader brand reputation.",
        ],
      },
      slides: { folder: '/images/marketing/xfinity', count: 9 },
    },
    links: {},
  },
  {
    slug: 'trapped-in-the-flash',
    landingRank: 6,
    tier: 3,
    title: 'Marketing Director, "Trapped in the Flash"',
    tag: 'marketing leadership',
    brief: 'Leading a 9 person team to market an original Off Off Broadway production.',
    size: 'small',
    imageLabel: 'trapped in the flash',
    image: '/images/marketing/trapped-in-the-flash/thumbnail.png',
    // Marketing detail meta: three fields only, no team, no role (the role sits
    // in the title here).
    meta: {
      type: 'Marketing leadership, Off Off Broadway production',
      date: 'Oct 2023 to April 2024',
      tools: 'Adobe Photoshop, Canva, Instagram',
    },
    detail: {
      description:
        'Marketing Director for Trapped in the Flash, an original Off Off Broadway production, leading a 9 person cross functional team across content, design, and platform operations to draw 300+ attendees and 20K+ views across four social platforms.',
      skills:
        'Campaign management, content strategy, cross functional team leadership, social media marketing, Adobe Photoshop, Canva, multicultural audience targeting.',
      intro: {
        heading: 'Leading the marketing for an Off Off Broadway run',
        lead: 'Served as Marketing Director for an original Off Off Broadway production staged at Rockdock Theatre, leading a 9 person cross functional marketing team across content, design, platform operations, and external communications.',
        sections: [
          {
            label: 'What was led and executed',
            items: [
              {
                label: 'Campaign Strategy and Team Operations',
                text: 'Built and maintained a weekly content calendar assigning tasks across specialized roles including illustrators, platform operators (Instagram, WeChat, RedNote, Douyin), and copywriters, and ran weekly check ins to track execution and unblock dependencies.',
              },
              {
                label: 'Omni Channel Social Media Marketing',
                text: 'Independently designed a platform tailored strategy targeting both domestic and international audiences, achieving 20K+ views and 4K+ interactions across 4 major platforms.',
              },
              {
                label: 'Cross Functional Collaboration',
                text: 'Coordinated with the visual and filming department to develop campaign ready content, and with the external communications team on sponsor facing materials.',
              },
              {
                label: 'Content and Visual Production',
                text: 'Partnered with the design team to produce ad hoc visual assets using Adobe Photoshop and Canva, including the full production brochure.',
              },
              {
                label: 'Campaign Outcome',
                text: 'Show drew 300+ audience members, with the Instagram account (@sparkling_ny) growing to 639 followers and 83 posts documenting the full production lifecycle.',
              },
            ],
          },
        ],
      },
      slides: { folder: '/images/marketing/trapped-in-the-flash', count: 5 },
    },
    links: {},
  },
  {
    slug: 'confession-film',
    landingRank: 4,
    tier: 3,
    title: '"Confession" (NYU Thesis Film): Social Media Manager',
    tag: 'social media management',
    brief: "Running an NYU thesis film's Instagram presence end-to-end, from fundraising to release.",
    size: 'small',
    imageLabel: 'confession social media',
    image: '/images/marketing/confession/thumbnail.png',
    // Marketing detail meta: three fields only, no team, no role (the role sits
    // in the title here). Date rendered dash free per the global rule.
    meta: {
      type: 'Social media management',
      date: 'January 2025 to May 2025',
      tools: 'Canva, Instagram, Seed&Spark',
    },
    // Kept-hyphen term "end-to-end" is the approved exception to the no-dashes rule.
    detail: {
      description:
        "Social media manager for Confession, a French language NYU thesis film, designing and running the production's Instagram presence end-to-end in Canva, from fundraising countdowns to cast spotlights across 21 posts that grew the account to 225 followers.",
      skills:
        'Social media management, visual content design, Canva, cross functional collaboration, independent creative execution, fundraising campaign support.',
      intro: {
        heading: "Running a thesis film's social presence end-to-end",
        paragraphs: [
          "Social media manager for Confession, a French language NYU thesis film directed by Anny Liu, responsible for the end-to-end design and execution of the production's Instagram presence (@confession_film_2025) from pre production through release.",
          'Solely designed and managed all campaign content in Canva, spanning fundraising countdowns, character introductions, cast and crew spotlights, film narrative teasers, and donation calls to action, maintaining a cohesive visual identity across 21 posts that brought the account to 225 followers. Worked cross functionally with the director, production team, and editors to align content with creative vision and production milestones, translating behind the scenes material and narrative themes into audience facing storytelling. Also supported the fundraising campaign through Seed&Spark, using social content to drive awareness and donor conversion.',
        ],
      },
      slides: { folder: '/images/marketing/confession', count: 9 },
    },
    links: {},
  },
]

// Lookup helpers used by the detail pages.
export const getDataProject = (slug) => dataProjects.find((p) => p.slug === slug)
export const getMarketingProject = (slug) => marketingProjects.find((p) => p.slug === slug)

// Curated, ordered lists for the landing page. Only projects with a
// `landingRank` appear, sorted ascending. The /data and /marketing section
// pages still use the full `dataProjects` / `marketingProjects` arrays.
const byLandingRank = (a, b) => a.landingRank - b.landingRank
export const landingDataProjects = dataProjects
  .filter((p) => p.landingRank != null)
  .sort(byLandingRank)
export const landingMarketingProjects = marketingProjects
  .filter((p) => p.landingRank != null)
  .sort(byLandingRank)
