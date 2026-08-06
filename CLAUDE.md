# CLAUDE.md — Annie Shan Portfolio

This file is the source of truth for this project. Read it fully at the start of every session before making changes.

---

## 1. What this is

A personal portfolio website for **Annie Shan**, a Northwestern IMC (data analytics track) graduate student transitioning from marketing into data and marketing analytics. Personal brand: **"data-driven storyteller"** — a marketer who bridges narrative and numbers.

The site showcases data projects (the priority), marketing projects, a resume with a downloadable CV, and a personal "fun facts" page.

**Background facts (for copy):** studied at NYU and Northwestern (IMC); experience at Ogilvy, Accenture, and Lenovo; based in Chicago. Skills: SQL, Python, R, Tableau, Excel, plus advanced modeling (survival analysis, PSM, Panel DiD, LASSO, XGBoost).

---

## 2. Tech stack

- **React + Vite** (single page app with client side routing)
- **Tailwind CSS** for styling
- **Framer Motion** (or a lightweight equivalent) for scroll and hover animations
- Code hosted on **GitHub**, deployed on **Vercel**
- Keep everything in one repo. This file lives at the project root.

---

## 3. Design system (do not drift from this)

### Base
- Warm off white page background. Sections alternate between **white** and a **very light violet tint** (`#F5F3FB`).
- Marketing pages use a **warm cream** section background (`#FBF7F1`) instead of the violet tint.

### Accent colors
- **Deep violet `#4A3F8F`** is the primary accent, used site wide (links, active nav, labels, chips, buttons, data motifs).
- **Warm terracotta `#B06A45`** is a secondary accent used **only in the Marketing section** (eyebrow, stat numbers, motifs) to give marketing its own identity.
- Store both as named design tokens so they can be changed in one place.

### Supporting palette
- Text: primary `#221E33`, secondary `#4F4A57`, muted `#6B6670` / `#7A7486`
- Light violet chip fill `#ECEAF8`; violet borders use `rgba(74,63,143,0.15–0.3)`
- NDA badge (gold): bg `#FBF3E2`, text `#8A6E3A`
- Public dataset badge (green): bg `#E3F2EA`, text `#3F6E56`
- Data source colors (for the data flow hero): rose `#C98A98`, sage `#8FB089`, lavender `#A99BD0`, slate `#8FA0B4`

### Typography
- **Newsreader** (serif) for all headlines and project titles. This is a calm editorial serif, not decorative.
- **Inter** (sans) for all body text.
- **Section labels** (eyebrows like "SELECTED DATA WORK", "01 / THE QUESTION") are **clean sans caps**: Inter, uppercase, letter spacing ~0.16em, small size, in the accent color. (Note: earlier drafts used a monospace font for these; the final choice is clean sans caps.)
- Load fonts from Google Fonts.

### Motifs and heroes
- Each data project gets a **custom SVG hero** that illustrates that project's core insight (for example: a data flow ribbon graphic, a Kaplan Meier survival curve). These are hand built SVGs, not photos or AI images. Ready made SVG code is provided in the build prompts.
- Section headers carry small SVG motifs: rising line charts for data (violet, cool), flowing curves for marketing (terracotta, warm).

### Animation (be generous but tasteful)
- Sections fade up as they scroll into view.
- Project and gallery thumbnails stagger in one after another.
- Quick links, buttons, and cards lift subtly on hover.
- The landing hero photo fades into white; stat numbers count up when they enter view.
- Keep all animations fast (~0.4s) and soft. Never bouncy or spinning.

### GLOBAL COPY RULE (critical)
**Never use dashes in any visible website copy.** No hyphens, no en dashes, no em dashes. Rephrase instead (use "to", commas, or separate sentences). This applies to every page, label, caption, and title. Proper names normally written with a hyphen (for example "Kaplan Meier") are written without one.

**One exception (approved by Annie):** the brand phrase **"data-driven storyteller"** keeps its hyphen. Nothing else does.

---

## 4. Page inventory

1. **Landing / About** (home)
2. **Data** section page → **Data project detail** pages
3. **Marketing** section page → **Marketing project detail** pages
4. **Resume / CV**
5. **Fun Facts**

Nav (overlaid on the landing hero, sticky elsewhere): `Annie Shan` wordmark + `about · resume · data · marketing · fun facts`. Active item gets an underline.

### 4.1 Landing / About (scroll narrative, in order)
> Status: BUILT and refined in `src/pages/Landing.jsx`. See section 8 for the full build log. Uses `SmartImage` so real photos in `public/images` (chicago-skyline.jpg, headshot.jpg, logos) replace placeholders automatically. Note: the landing narrative has no stat row, so the count up animation lives on the Data and Marketing header stat rows instead.
1. **Full width Chicago skyline photo hero** that fades to white at the bottom. Nav and hero text overlaid. Eyebrow "data-driven storyteller"; headline "I tell stories with data." (serif, with "data." in italic).
2. **Name card** tucked into the photo fade: headshot, name with a small violet dot divider, a status line "based in chicago · open to work", a short intro paragraph, and three quick link pills (resume = solid violet, data + marketing = outlined).
3. **"A marketer who fell for the data."** paragraph section: big serif title left, two body paragraphs right. Key words (NYU, Northwestern, Accenture, Ogilvy, SQL, Python, Tableau) tinted violet.
4. **Trained at** — two rows: "EDUCATED AT" (NYU, Northwestern, in violet) and "EXPERIENCE AT" (Ogilvy, Accenture, Lenovo). Real logos.
5. **Toolkit** — "The skills behind the stories". Three groups: Languages (SQL, Python, R); Analysis & viz (Tableau, Excel, BigQuery, Looker); Core methods (EDA, Segmentation, Cohort, A/B testing, Regression, ANOVA). Plus a boxed, highlighted group **"advanced modeling — my edge"** (Survival analysis, PSM, Panel DiD, LASSO, XGBoost, AdaBoost) with a one line caption about causal inference and ML being the bridge between strategy and data science.
6. **Leveraging data to uncover insights** — data project thumbnails (image + short caption + "learn more"), no white card backing.
7. **…and tell great brand stories** — marketing gallery (mixed size tiles).
8. **Footer**.

### 4.2 Data section page (the "establishing shot")
- Analytical opening header on a light violet band: eyebrow "DATA & ANALYTICS", title "Turning questions into decisions", a one line approach statement, a stats row (projects · tools · focus areas) with serif violet numbers, and a small rising line chart SVG motif in the corner.
- **Three sub tabs** below the header: "Data Analysis" (SQL · Excel), "Data Visualization" (Tableau), "Machine Learning" (R · Python). Active tab gets a violet underline; tool names are small sans subtitles.
- Under the active tab, **horizontal project cards**: thumbnail on one side, text on the other (category tag, title, one line brief, "learn more"). Projects that span two categories **appear in both tabs**. Projects with a live embedded dashboard get a small green "live dashboard" marker.

### 4.3 Data project detail — two templates

**Template A — analysis / consulting (example: CMI dance nonprofit).** Uses the spine **The Question → The Setup → The Work → The Payoff**.
- Header: clear analytic title (for example "Unified Analytics Dashboard for a Dance Nonprofit"), tag "data analysis", and a **gold NDA badge** ("real client engagement, figures anonymized under NDA"). Meta row for **work projects includes role and team**: role, tools (Excel: VLOOKUP/XLOOKUP, UNIQUE, COUNTIF/SUMIF, pivot tables), timeline, team.
- Custom **data flow ribbon hero** (four platforms flowing into one dashboard). Its background blends to the site's light base (not cream).
- The Question, The Setup (four sources, matching challenge), The Work (five pillars; the two Annie led are starred and placed first; a star alone marks them, no "my lead" text), The Payoff (honest: four separate dashboards were delivered because a unified view was not feasible with sparse metrics, which is itself a finding; then an **"extension" block** for the unified Tableau dashboard built afterward on simulated data, embedded live; then recommendations and buttons for deck, dashboard, GitHub).
- All sensitive numbers rounded or disguised.

**Template B — modeling on public data (example: survival / retention).** Slide driven, lighter on prose.
- Header: clear analytic title (for example "Customer Retention Strategy for Relay's Delivery Service"), tag "marketing analytics", and a **green "public dataset" badge**. Meta for **public data projects omits role and team** and emphasizes **tools and models** (R · survival · ggplot2, Python version coming; chips: survival analysis, AFT models, Kaplan Meier, Cox PH, logistic regression, probit, likelihood ratio test).
- Custom **Kaplan Meier hero** (two diverging survival curves, high vs low engagement).
- Sections (Question, Setup, Work, Payoff) are built from **the project's own slides plus one line captions**, not long paragraphs. The payoff highlights the cross model comparison insight and the marketing strategies.
- A dedicated **code section**: a short styled code snippet plus GitHub buttons (R repo now, Python repo coming).
- The two other ML projects (TikTok sentiment; PSM / Panel DiD app usage) reuse Template B. Do not design them separately; drop their slides, captions, and links into the same structure.

### 4.4 Marketing section page and detail
- Editorial opening header on a warm cream band with **terracotta** accents: eyebrow "MARKETING & STRATEGY", title "Dive into the world of marketing", the line "Before the data, there was the story…", a stats row (years · campaigns · brands) in terracotta, and a flowing curve motif.
- **Mixed size gallery grid** (like the current Wix): Sainsbury's as a tall feature tile, NYC food guide as a wide tile, plus Starbucks, Xfinity, a theatre PR launch, and a film ("Confession"). Each tile has a category tag and a serif title.
- **Detail page** (Sainsbury's is the template): back link, tag, big serif title, a right sidebar (project type, date, team, tools — marketing keeps team but omits role), the real narrative, then **slides plus captions** (a hero slide, a two up "approach" row, an "outcome" slide), a pull quote, and a "view full deck" button. Marketing does **not** use the strict data workflow.

### 4.5 Resume / CV
- Follows the current Wix layout: a centered "Resume" title, an "Experience" heading with a **Download CV** button (violet), then **color block cards** (soft violet or cream blocks): date range, job title, company, and location on the left; description on the right. An **Education** section uses the same card style.
- The Download CV button links to a PDF in `public/cv/`.
- Content (the actual experience and education entries) is provided by Annie directly during the build.

### 4.6 Fun Facts
- A personal page about life outside work. Developed live during the build; keep it warm, playful, and on brand.

---

## 5. Content and asset rules
- **Titles are clear and analytic**, not cute. Storytelling lives inside the pages, not in the titles.
- **Meta by project type:** work / consulting projects show role and team; public data and marketing projects omit role (marketing keeps team). ML detail pages emphasize tools and models.
- Use `#` placeholders for links (deck, GitHub, dashboard) and swap in real URLs later.
- Images are dropped into `public/images/` and referenced by filename; the code never needs to "see" them.

---

## 6. File structure

```
annie-portfolio/
├── CLAUDE.md              ← this file
├── public/
│   ├── images/
│   │   ├── headshot.jpg
│   │   ├── chicago-skyline.jpg
│   │   ├── logos/         ← ogilvy, accenture, lenovo, nyu, northwestern
│   │   └── projects/      ← slide PNGs, grouped per project
│   └── cv/
│       └── annie-shan-cv.pdf
└── src/
    ├── components/        ← nav, footer, cards, badges, motifs, reusable bits
    ├── pages/             ← landing, data, marketing, resume, funfacts
    ├── data/              ← project metadata (titles, tags, captions, links)
    └── styles/            ← design tokens (colors, fonts)
```

Keep project metadata (titles, briefs, tags, links, which tabs a project appears in) in `src/data/` so content can be edited without touching layout code.

---

## 7. Working conventions
- Build **page by page**, not all at once.
- After finishing a page or major change, update the relevant note here so future sessions stay accurate.
- Prefer editing design tokens over hard coding colors and fonts inline.
- When in doubt about a decision, this file wins.

---

## 8. Build log and current status

This section is the running record of what has actually been built. Read it first when resuming so you know the exact state.

### 8.1 How to run
- Install once: `npm install`
- Dev server: `npm run dev` then open `http://localhost:5173/`
- Production build check: `npm run build` (currently compiles clean)
- Node used during setup: v24, npm 11.

### 8.2 Scaffold (DONE)
Project was scaffolded from an empty folder. Stack in place and working:
- **React + Vite** (Vite 6), `src/main.jsx` mounts `BrowserRouter`.
- **Tailwind CSS v3** with `tailwind.config.js` importing colors from `src/styles/tokens.js` (design tokens are the single source of truth for color; change a value there and it updates everywhere). Fonts declared in the Tailwind config, loaded via Google Fonts in `index.html`: **Newsreader** (serif) and **Inter** (sans).
- **react-router-dom v6** routes in `src/App.jsx`: `/` landing, `/data`, `/data/:slug`, `/marketing`, `/marketing/:slug`, `/resume`, `/funfacts`, plus a `ScrollToTop` helper.
- **Framer Motion** for scroll and hover animation.
- Folder structure from section 6 created; `public/images`, `public/images/logos`, `public/images/projects`, `public/cv` exist with `.gitkeep`. A `favicon.svg` and `.gitignore` were added.

### 8.3 Shared components (DONE) — in `src/components/`
- `Nav.jsx` — wordmark "Annie Shan" + about/resume/data/marketing/fun facts, active underline. Transparent overlay on the landing hero, turns solid on scroll, sticky elsewhere.
- `Footer.jsx` — wordmark, tagline "Data-driven storyteller, based in Chicago.", nav links.
- `Section.jsx` — section wrapper with fade up on scroll. Prop `bg`: `base | white | violet` (light violet tint) `| cream`.
- `Eyebrow.jsx` — section label, `accent="violet"` (default) or `"terracotta"`.
- `Chip.jsx`, `Badge.jsx` (`variant="nda"` gold or `"dataset"` green), `Button.jsx` (`variant="primary"` solid or `"outline"`; renders as router Link `to`, anchor `href`, or button; lifts on hover).
- `ProjectCard.jsx` — `layout="stacked"` (default, no card backing) or `"horizontal"`; supports `liveDashboard` marker and `accent`.
- `Placeholder.jsx` — labeled block standing in for a missing image.
- `SmartImage.jsx` — renders a real image when the file exists, falls back to `Placeholder` on missing/failed load. Props: `src, alt, label, ratio, fit` (`cover`/`contain`), `rounded`, and `natural` (render at the image's own aspect ratio, full width, height auto, nothing cropped — used by the hero). **This is why final asset paths can be wired now; images appear automatically when dropped in.** **Extension fallback (added):** if the given `src` fails to load, it automatically retries the same path with other common extensions (`png → jpg → jpeg → webp → svg`) before showing the placeholder. So a path written as `.png` still resolves when the real file is a `.jpg`; asset paths no longer have to match the exact extension on disk.

### 8.4 Project metadata (DONE) — `src/data/projects.js`
Holds `dataTabs`, `dataProjects` (4: dance nonprofit dashboard [template A, NDA, live dashboard], relay retention, tiktok sentiment, app usage PSM/DiD [all template B, public dataset]), and `marketingProjects` (6: sainsburys tall feature, nyc food guide wide, starbucks, xfinity, theatre launch, confession film). All copy, tags, tab membership, meta, and links live here. Links are `#` placeholders. Add an `image` field to any project to swap its placeholder for a real thumbnail.

**Landing curation via `landingRank` (added).** The landing page's "selected data work" and "brand stories" sections do NOT show every project. They render only projects that have a `landingRank` number, sorted ascending (1 first), via the derived exports `landingDataProjects` / `landingMarketingProjects` at the bottom of `projects.js`. The `/data` and `/marketing` section pages still use the full `dataProjects` / `marketingProjects` arrays. **So to control the landing:** give a project a `landingRank` to feature it (the number is its position); leave the field off to keep it on its section page but off the landing; change the numbers to re-select or reorder — all without touching layout code. This decouples the landing (curated subset + custom order) from the full project lists. Currently every existing project has a rank (data 1–4, marketing 1–6), so all show; drop or renumber ranks as the project list grows.

### 8.5 Copy rule exception (DECIDED)
Annie approved ONE exception to the no dashes rule: the brand phrase **"data-driven storyteller"** keeps its hyphen (see section 3). Applied in the hero eyebrow, footer tagline, and the `index.html` title and meta description. Everything else stays dash free.

### 8.6 Landing page (BUILT + REFINED) — `src/pages/Landing.jsx`
Full scroll narrative per section 4.1 is built. Current state after this session's refinements:
- **Hero**: shows the full Chicago skyline at its **natural proportion, nothing cropped** (`SmartImage natural` + `object-contain`, height follows the image). Section background is **cream** so any empty space around the photo fills cream. Overlaid text sits **high on the sky** near the top of the photo (`justify-start` with top padding `pt-16 sm:pt-20 md:pt-28`, no longer vertically centered). Eyebrow reads **"Hi, I'm Annie, and"** as a lead-in (sized up from the default `text-xs` to `text-sm md:text-lg` so it reads clearly against the sky); headline **"I tell stories with data."** (with *data.* italic). Both have soft text shadows for legibility. Placeholder fallback ratio is `aspect-[16/7]`. Note: the `.eyebrow` style force-uppercases, so the hero eyebrow renders as "HI, I'M ANNIE, AND".
- **Name card**: overlaps the lower part of the hero via `-mt-10 sm:-mt-14 lg:-mt-20` (reduced so the skyline stays visible and unblocked). Layout is now: **name header row across the top** — "Annie (Xinhui) Shan" (nav and footer keep "Annie Shan") + violet dot + "based in chicago · open to work"; **below that a grid** with the square headshot (`w-32`) on the left and, top-aligned beside it, **three bullet points** and the three quick-link buttons (resume solid violet, data work + marketing outlined). The three bullets: "A marketing and business analyst who bridges narrative and numbers" / "A problem solver who finds clarity and scalable solutions in complex situations" / "A lifelong learner and adventurer".
- **About section**: title **"But first, a little story about me"** (sized `text-2xl md:text-3xl` so it fits one line). Two paragraphs: the spreadsheets/SQL story, then the current NYU/Northwestern paragraph ("My marketing degree from New York University gave me the business sense to ask the right questions, and Northwestern IMC gave me the analytical tools to answer them. These days I live in the space between the two, identifying growth opportunities, designing solutions, and turning messy data into decisions that drive meaningful engagement."). Violet tinting on **SQL**, **New York University**, **Northwestern IMC**.
- **Trained at**: "EDUCATED AT" row = **New York University**, **Northwestern** (logo + name, violet). "EXPERIENCE AT" row is now a **hand-drawn mountain-trail illustration** at `public/images/career-climb.png` (a figure looking toward mountains, with the five company logos — Ogilvy, Accenture, Lenovo, Antenna, Hyde Park School of Dance — as trail milestones). It is wired via `SmartImage` in a **flat, bottom-anchored crop** (`ratio="aspect-[5/2]"`, `fit="cover"`, `position="object-bottom"`, `rounded="rounded-none"`, wrapper `mt-4`) so the blank sky at the top of the source PNG is clipped, the mountain peak sits below the "experience at" row with headroom, and the art takes less vertical height. The crop is non-destructive (original PNG untouched); tune by changing the aspect ratio. The old plain logo-name row and its `experienceAt` array were removed. *(History of the reverted coded-SVG attempt is in 8.8 item 5.)*
- **Toolkit**: title **"The skills behind the scene"**. Groups: **Languages** (SQL, Python, R) and **Analysis and visualization** (Tableau, Excel, PowerBI, Looker) now render as **tool logos** (no captions — the logos already carry their names), each centered in a fixed 56px cell so the two rows align. Logo files live in `public/images/logos/tools/` (`mysql`, `python`, `r`, `tableau`, `excel`, `powerbi`, `looker` — any common extension; `SmartImage` shows a labeled placeholder until each is dropped in). Per-logo size overrides via a `size` field on the tool (e.g. Excel `h-10 w-10`, PowerBI `h-14 w-14`) balance uneven brand logos; default is `h-12 w-12`. **Core methods** (Exploratory Data Analysis, Regression, A/B Testing, Segmentation, Marketing Mix Modeling) stays as text chips. In `toolkitGroups`, a group with a `logos` array renders logos; a group with an `items` array renders chips. **The whole Toolkit section sits inside a rounded violet-tint name card** (`rounded-3xl bg-violetTint`, section bg is white, `innerClassName="pt-4 md:pt-6"` to sit close under the experience illustration, negative margins `md:-mx-8 lg:-mx-14` so it's a touch wider than the content column); the advanced-modeling white card nests inside it. (A backpack-styled version of this card, both hand-drawn SVG and image-background, was prototyped to echo the mountain scene and reverted; the card is intentionally plain.) Boxed highlight labeled **"ADVANCED MODELING"** with chips (Survival Analysis, PSM, LASSO, Random Forest, Clustering, PCA, SVM, Uplift Modeling) and caption "From predicting churn to measuring true campaign impact, these are the tools I use to answer questions marketing instinct alone can't."
- Data thumbnails (staggered) and mixed size marketing gallery are built with fade up + stagger + hover lift animations. **Marketing gallery tile fix:** each tile is a flex column (`Link` = `flex h-full flex-col`); the tall feature tile (Sainsbury's) wraps its image in `sm:min-h-0 sm:flex-1` so on sm+ the image flexes to fill the space left after the caption, and the caption (`shrink-0`) no longer overflows into the tile below. Non-tall tiles keep their fixed aspect ratio; mobile keeps the tall aspect ratio too.

### 8.7 Assets still needed (placeholders show until added)
Drop these into `public/` and they appear automatically. **Logo/image files can be `.png` OR `.jpg`** (also jpeg/webp/svg) — `SmartImage` now auto-tries other extensions, so the filename extension no longer has to match the path written in code.
- `public/images/chicago-skyline.jpg` (hero)
- `public/images/headshot.jpg` (name card, square)
- `public/images/logos/nyu`, `northwestern`, `ogilvy`, `accenture`, `lenovo`, `antenna`, `hyde-park-school-of-dance` (any common image extension; logos use `object-contain`).
- `public/cv/annie-shan-cv.pdf` (Download CV button on the resume page)
- Project thumbnails: add an `image` path to entries in `src/data/projects.js`.

### 8.8 Open items to revisit next session
1. **Hero overlap tuning**: the name card overlap is currently `-mt-10 sm:-mt-14 lg:-mt-20`. Once the real `chicago-skyline.jpg` is in, nudge that single margin value on the name card container in `Landing.jsx` if the card sits too high or low.
2. **Mobile hero tradeoff**: because the photo is uncropped and full width, it becomes a short wide band on narrow screens. If that ever feels too short, consider cropping only at mobile widths.
3. **Count up animation**: not on the landing (no stat row there). Planned for the Data and Marketing header stat rows when those pages are built.
4. Real URLs for decks, dashboards, and GitHub repos (currently `#`).
5. **"Career climb" illustration for the EXPERIENCE AT row (DONE).** Earlier we prototyped a hand-drawn SVG (`CareerClimb.jsx`) of a winding mountain trail, iterated several times, never matched Annie's sketch, and reverted/deleted it. **Resolution:** Annie hand-drew the graphic and dropped in `public/images/career-climb.png` (2750×1536), which is now wired into the EXPERIENCE AT block via `SmartImage` with a flat, bottom-anchored crop — see 8.6 "Trained at" for the exact props. The "EDUCATED AT" logo row above it is unchanged. **If the crop needs tuning:** adjust the `ratio="aspect-[5/2]"` on that `SmartImage` (flatter = smaller second number, e.g. `aspect-[3/1]`; taller = larger). `SmartImage` gained a `position` prop (Tailwind object-position class, e.g. `object-bottom`) to support this.

### 8.9 Data section page + first detail page (BUILT)

**Data section page** (`src/pages/Data.jsx`) is built per section 4.2: light violet header band (eyebrow "DATA & ANALYTICS", title "Turning questions into decisions", one line approach statement, stats row, rising line chart SVG motif in the corner), three sub tabs ("Data Analysis" SQL · Excel, "Data Visualization" Tableau, "Machine Learning" R · Python) with an animated violet underline (framer `layoutId`), and horizontal `ProjectCard`s under the active tab. Projects appear under every tab in their `tabs` array (so a project can show in two), and the green "live dashboard" marker comes from `liveDashboard`. **Count-up animation** now lives on the stats row via the new `src/components/CountUp.jsx` (counts 0→N once on scroll into view, easeOutCubic); this is the count-up that section 8.8 #3 planned. Reuse `CountUp` on the Marketing header when that page is built.

**First data detail page — Template A** (`src/pages/DataProject.jsx`, `TemplateA`) is fully built for the dance nonprofit project (`slug: dance-nonprofit-dashboard`):
- Header: back link, tag "data analysis", gold NDA badge, title, and a meta grid (role, tools, timeline, team — the work-project meta).
- Custom **data flow ribbon hero**: `src/components/heroes/DanceDataFlowHero.jsx` (the four-platforms-into-one-dashboard SVG, near-white bg). Heroes are keyed by `detail.hero` through a `heroes` registry in `DataProject.jsx`; falls back to a placeholder when a project has no custom hero.
- Spine (refined this session): **01 The Question** (heading + context, body lengthened to four rows), **02 The Setup** (four colored source cards DRT/iClassPro/Neon CRM/Classbug + a "matching challenge" callout), **03 The Work** (five `Pillar` cards, each question + method + finding; the two formerly starred `led` cards had their stars removed at Annie's request, so no stars show now), **04 Insights Reporting** (`detail.reporting`: intro paragraph + a 2-image grid of report excerpts). **The old "04 The Payoff" section was deleted**; the page now flows Work → Insights Reporting → Extension. The unused `payoff` object still sits in `projects.js` (harmless, not rendered).
- **Extension** block: unified Tableau dashboard on simulated data. When `detail.extension.embedUrl` is set it renders via a `TableauEmbed` component in `DataProject.jsx` that scales the whole fixed-size Tableau viz down to fit the container (Tableau clips instead of scaling on its own). `TABLEAU_NATIVE = { w: 1300, h: 1625 }` (ratio 0.8, from the viz's 2560×3200 static image); nudge `h` if the embed shows bottom whitespace or clipping. Live URL is wired for the dance project (`CMIDummyDashboard/Dashboard1`).
- Then an **open dashboard** button only (deck + GitHub removed at Annie's request); links live in `projects.js`.
- **Overview card thumbnail:** the `/data` card for this project now shows the `DanceDataFlowHero` SVG (not a placeholder), via a shared `src/components/heroes/registry.js` and a `thumb` prop on `ProjectCard`. Keyed by `detail.hero`, so each project's hero doubles as its card thumbnail.

**All of this page's copy lives in `dataProjects[0].detail` in `src/data/projects.js`** so it can be edited without touching layout. Report excerpt images go in `public/images/projects/dance-nonprofit/` (`report-1`, `report-2`; any extension — SmartImage auto-detects).

**Site-wide widow fix (this session):** `src/index.css` now applies `text-wrap: pretty` to all `p`/`li` and `text-wrap: balance` to headings, so single short words no longer strand on their own line anywhere. Prefer this over rewording.

### 8.10 ML detail Template B + Marketing pages (BUILT)

**Template B** (`src/pages/DataProject.jsx`, `TemplateB`) is fully built, slide-driven, and reusable across the three ML projects. Renders each section only when its data is present: header (tag, green `badgeLabel` badge e.g. "public dataset, statistical modeling in R", tools meta, model chips, hero) → **01 The Question** (heading + body + two point cards) → **02 The Setup** (intro + `CountUp` stat row + lever cards) → **03 The Work** (intro + model track cards where `led:true` shows a star + stacked `SlideBlock`s) → **04 The Payoff** (intro + binary vs survival comparison cards + slides + numbered marketing strategies) → **the code** (styled `detail.code.snippet` + R repo / Python repo coming buttons from `links.githubR`/`githubPython`). Slides are `SmartImage` placeholders (`SlideBlock`) — drop exported PNGs by adding an `image` path to each slide in `projects.js`. Kaplan Meier hero is `src/components/heroes/KaplanMeierHero.jsx` (registered as `kaplanMeier`). Full content is wired for **relay-retention**; the two other ML projects (tiktok-sentiment, app-usage-psm-did) still need their `detail` objects filled using the same schema. `CountUp` now formats with `toLocaleString()` (so 6133 → 6,133).

**Marketing section page** (`src/pages/Marketing.jsx`) — matches section 4.4: cream band, terracotta accents, eyebrow, title, italic "Before the data, there was the story…", `CountUp` stat row (years/campaigns/brands), flowing curve motif, and a mixed-size gallery (Sainsbury's tall, NYC food guide wide, four small). Tiles use `SmartImage` (add an `image` path to a marketing project to replace its placeholder).

**Marketing detail page** (`src/pages/MarketingProject.jsx`) — data-driven with graceful fallbacks so all six projects render. Sainsbury's (`slug: sainsburys`) is the fully-written template: back link, tag, big serif title, right sidebar (type/date/team/tools, keeps team, omits role), narrative paragraphs, then hero slide + two-up approach row + outcome slide (`MarketingSlide`, terracotta framing), a pull quote, and a "view full deck" button. Copy lives in `marketingProjects[].detail`; the other five projects fall back to brief + placeholders until their `detail` is written.

### 8.11 SQL analysis detail — Template C (BUILT + refined)

**Template C** (`src/pages/DataProject.jsx`, `TemplateC`, routed by `template: 'C'`) is a data-driven SQL/analysis detail page. Built for **sql-ecommerce-analytics** ("E-commerce Analytics for an Online Retailer, from Clicks to Revenue"), a public-dataset project (green `badgeLabel` "public dataset · end to end SQL"). Custom hero `src/components/heroes/SqlFunnelHero.jsx` (registered as `sqlFunnel`; split funnel + traffic-to-revenue flow) — also doubles as the `/data` and landing card thumbnail via the shared registry. Header meta shows **tools + methods only** (dataset field exists in data but is not rendered), no role/team; the hero is constrained to `max-w-3xl` so it reads a touch smaller. Sections after refinement:
- **01 The Question**, **02 The Setup** (body + table-name `Chip`s).
- **03 The Work** — the "view full SQL on GitHub" `Button` sits at the top (under the subhead). Then **two `FeaturedAnalysis` blocks stacked full width, one per row** (`space-y-6`, not side by side) so the SQL never needs horizontal scroll; each = colored violet title with an accent bar + italic question + APPROACH + a dark `CodeBlock` + FINDING callout. Then **three smaller cards** (Traffic source, Seasonality, Product analysis) restyled to match the featured blocks (accent-bar violet title + italic question + TECHNIQUE + FINDING callout, no code), each with a "view on GitHub" link.
- **04 The Takeaways was deleted** at Annie's request; the GitHub button moved up into The Work. The `takeaways` copy is gone from `projects.js`.
- **`CodeBlock`** renders on a dark background (`#1E1B2E`) with lightweight **SQL syntax highlighting** (`highlightSql` + `SQL_KEYWORDS` in `DataProject.jsx`): keywords/functions blue `#82AAFF`, comments muted italic `#7E7A99`, string literals green `#B6D98F`. Tokenizer preserves exact formatting; applies to any SQL passed to `CodeBlock`.
- **GitHub link is live:** `https://github.com/annieshan23/ecommerce-sql-analysis` in `links.github`. `Button` already opens external (`http`) links in a new tab; the raw card anchors got `target="_blank"` too.

This project appears **only in the Data Analysis tab** and has **no `landingRank`** (off the landing until Annie curates — see the saved memory reminder). The `/data` "projects" stat is dynamic (`dataProjects.length`). A future project can cross-list into both Data Analysis and Data Visualization by adding both ids to its `tabs` array.

### 8.12 Overview + landing card refinements (this session)

- **`ProjectCard` gained `badge` + `badgeLabel` props** (renders a `Badge` under the title) and a `thumb` prop (a custom node, e.g. a hero SVG). The `/data` overview cards (`Data.jsx`) and landing "selected data work" cards (`Landing.jsx`) both pass `thumb={<Hero/>}` keyed by `project.detail.hero` via the shared `heroes` registry, and pass `badge`/`badgeLabel` so each card shows its context chip (dance = gold NDA line, sql/relay = green dataset line). The dance project's NDA text now lives in `badgeLabel` (single source for card + `TemplateA` header).
- **Thumbnails render at natural proportion:** a `thumb` node is shown in a plain `overflow-hidden rounded-xl` (no forced aspect, no violet padding box), so the wide/short hero SVGs no longer letterbox. Image fallbacks use `aspect-[16/10]` (horizontal) or `aspect-[4/3]` (stacked). Horizontal thumb column narrowed to `minmax(0,0.75fr)_1.25fr`.
- **Vertical rhythm of the `/data` card list** (`Data.jsx`, tuned across several iterations at Annie's request): the cards container is `pt-20 pb-16`, and the cards themselves are spaced `space-y-20`, so the gap above the first card matches the gap between cards. The `space-y` applies to every project in the active tab.
- **`CountUp`** now formats with `toLocaleString()` (6133 → 6,133).

### 8.14 SQL + Tableau detail — Template D (BUILT + refined)

**Template D** (`src/pages/DataProject.jsx`, `TemplateD`, routed by `template: 'D'`) is a data-driven end-to-end SQL + Tableau detail page. Built for **online-learning-behavior** ("Customer Behavior Analysis for an Online Learning Platform"), the 365 online learning project — Annie's **strongest, most comprehensive** project, so it has **`landingRank: 1`** (the other data ranks were bumped down: dance 2, relay 3, tiktok 4, app 5). It is **cross-listed** in both the Data Analysis and Data Visualization tabs (`tabs: ['analysis', 'viz']`), reached from either. Green `badgeLabel` "End to end BA project with SQL and Tableau"; `liveDashboard: true`.

- **Header** carries a `subtitle` field (rendered under the title — new for Template D) and a **three-up meta row** (`tools` · `scope` · `dataset`, all shown; no role/team since public data). Hero constrained to `max-w-2xl` with a small `-ml-1` so its left edge sits flush with the title.
- **Custom hero** `src/components/heroes/OnlineLearningHero.jsx` (registered as `onlineLearning`; a compact recreation of the dashboard's Overview page — tab row, KPI strip, top-courses bars, ratings donut). Also doubles as the `/data` + landing card thumbnail via the shared registry. Its viewBox is **560×320** (deliberately narrower + taller than a wide band, widgets close together, content hugging the left, extra padding below the last bar). All inner content is wrapped in `<g transform="translate(0,20)">` for top/bottom breathing room. Numbers/bar widths were eyeballed from the real dashboard; tune coordinates freely.
- **01 / The Question**, **02 / The Extraction** (intro + two featured SQL extracts as violet accent-bar cards with dark `CodeBlock`s — **skeletons only**, real queries live in the repo — then the "view all 12 SQL extracts on GitHub" button, live at `https://github.com/annieshan23/365-customer-behavior-dashboard`).
- **03 / The Dashboard** — the **live interactive Tableau embed** + "open full dashboard on Tableau Public" button. See the embed note below.
- **04 / What the dashboard reveals** — five tinted **color blocks** (`detail.reveals.blocks`), one per dashboard view, each with a colored left border via inline `style` (`backgroundColor` + `borderLeftColor`). Order: Overview, Engagement, Cohorts, Exams and certificates, Student learning (last one `full: true` → spans both columns as the closing insight).

**Tableau embed (important):** the multi-tab live viz clips its right edge and shows bottom whitespace with a naive full-width iframe, because Tableau lays out at a fixed native pixel size and clips. So Template D reuses the **scale-to-fit `TableauEmbed`** component (same one the dance extension uses), now **parametrized with a `native` prop**. The online dashboard passes `ONLINE_DASHBOARD_NATIVE` (currently **`{ w: 1366, h: 820 }`** — the standard 1366×768 desktop layout plus the ~25px Tableau toolbar, then nudged taller to kill a small internal scroll). **This is the single knob:** right edge clips → raise `w`; thin blank strip on the right → lower `w`; bottom scroll → raise `h`; bottom blank → lower `h`. The old plain-iframe `LiveDashboardEmbed` + `DASHBOARD_RATIO` were removed. Embed URL and the "open full dashboard" link (`links.dashboard`) point at `public.tableau.com/.../5_Learning-Workbook2_17856127753480/Overview`.

All copy lives in `dataProjects[0].detail` in `src/data/projects.js`. SQL blocks are skeletons; Annie may swap in the real queries later.

### 8.15 Kakao causal inference ML detail — Template B (BUILT)

Second ML project built on **Template B**, from Annie's detailed build spec. Replaced the old `app-usage-psm-did` stub (that was the PSM/DiD slot); new slug is **`kakao-causal-inference`** — "Income Heterogeneity in a Viral Game's Platform Spillover" (Kakao / Anipang). Green `badgeLabel` "causal inference in R"; tools `R · MatchIt · plm`; model chips (PSM, panel DID, fixed effects, DiD, interaction effects, robustness checks). **Machine Learning tab only**, **no `landingRank`** (off the landing until Annie curates). **Framing rule honored: no percentage effect figures anywhere; effects described by direction, significance, robustness only.**

- **Custom hero** `src/components/heroes/KakaoDidHero.jsx` (registered as `kakaoDid`) — a self-contained difference-in-differences divergence SVG (adopter line jumps after the release marker, matched control drifts up mildly, remaining gap labeled "the spillover"). Built from the exact SVG in the spec, wrapped in card chrome (eyebrow "CAUSAL INFERENCE", title, caption) so it doubles as the `/data` card thumbnail like the other heroes. Violet `#4A3F8F` adopters, rose `#C98A98` control, dashed violet counterfactual.
- **Template B was extended** (all backward-compatible, additive) to render this spec; relay is unaffected:
  - `setup.variables` → new **`VariablesBlock`**: a key/value list where each value is inline segments (`{code}` renders as a mono violet chip, `{text}` as prose) plus a `footnote`.
  - work `step.takeaway` → a **neutral muted line** under a step's slides (distinct from the teal `step.implication` callout).
  - `payoff.implications[]` → each renders a **named teal `ImplicationCallout`** (eyebrow now a prop, e.g. "implication one · depth") followed by its own slide. Coexists with the older flat `payoff.slides`.
  - Three new `LeverIcon` glyphs: `link`, `swap`, `layers` (for the PSM / DiD / fixed-effects method cards).
  - The Template B **code panel is now dark** (`#1E1B2E`, matching the SQL `CodeBlock` look) instead of the old light `<pre>` — this also upgrades relay's code section. Plain (no SQL highlighting) since it's R.
- Slides are `SmartImage` placeholders; drop PNGs into `public/images/projects/kakao/` (`psm-matching`, `output-log-time`, `output-n-games`, `implication-1-depth`, `implication-2-breadth`; optional `implications-combined` was skipped per spec). R repo link is a `#` placeholder awaiting the real URL.

### 8.16 TikTok creator emotion ML detail — Template B (BUILT)

Third and final ML project on **Template B**, from Annie's build spec. Replaced the old `tiktok-sentiment` stub; new slug is **`tiktok-creator-emotion`** — "Can Creator Emotion Predict Audience Admiration?". Green `badgeLabel` "machine learning in R"; tag "marketing analytics"; tools `R · glmnet · xgboost`; model chips (OLS, interaction effects, LASSO, XGBoost, feature selection, log transformation). **Machine Learning tab only**, **no `landingRank`** (off the landing until Annie curates). **Honest-framing rule: weak fit is stated first (models explain very little), joy is surfaced as the one surviving signal, brand takeaways are directional hints, not decision rules. Keep the neutral takeaway lines as written.**

- **Custom hero** `src/components/heroes/TiktokSignalHero.jsx` (registered as `tiktokSignal`) — a self-contained "faint signal" bar chart: joy one strong violet positive bar, weak lavender positives, a rose negative for larger creators, a faint near-zero bar for "most other features". Built from the exact SVG in the spec, wrapped in card chrome (eyebrow "MACHINE LEARNING", title "One clear signal, mostly quiet elsewhere", caption); doubles as the `/data` card thumbnail.
- **Template B extended again** (additive, backward-compatible; relay/kakao unaffected):
  - `question.beats[]` → new **`QuestionBeats`**: a deliberately varied progression instead of the flat body/points. Variants quietest→loudest: `lead` (plain prose), `rule` (thin violet left rule + eyebrow), `intro` (the filled violet `IntroBlock`), `highlight` (bordered violet-tint card with larger Newsreader body for the research-question payoff). The old `question.body`/`question.points` path still renders when `beats` is absent.
  - `setup.blocks[]` → subhead (`heading`) + prose (`text`) + a `slide`, stacked. Used for the tiers / data-and-variables / honesty-note beats. Coexists with the older `setup.stats`/`levers`/`variables`.
  - Reused as-is: work `step.takeaway` (neutral lines under the paired slides), `payoff.implications[]` (named teal callouts "what holds up" / "for brands, directionally", each with a slide), the dark R code panel, the R repo button.
- Slides are `SmartImage` placeholders; drop PNGs into `public/images/projects/tiktok/` (`tier-definitions`, `methodology`, `summary-stats`, `ols-main`, `ols-interactions`, `lasso-features`, `xgboost-gain`, `business-implications`, `for-brands`). R repo link is a `#` placeholder.

**All three ML detail pages are now built** (relay, kakao, tiktok). No ML content remains.

### 8.17 Data ordering finalized (this session)

With all data detail pages built, Annie curated ordering (supersedes any earlier rank numbers noted above):
- **`/data` tab order is driven by array position** in `dataProjects` (the landing is separate, see below). Array order is now: **sql-ecommerce, online-learning, dance, relay, tiktok, kakao**. So the **Data Analysis tab leads with e-commerce** (then online-learning, dance); Viz tab = online-learning, dance; ML tab = relay, tiktok, kakao.
- **Landing "selected data work" is driven by `landingRank`** (ascending; `lg:grid-cols-3`), now set on all six: **1 online-learning, 2 sql-ecommerce, 3 dance** (row 1) and **4 relay, 5 tiktok, 6 kakao** (row 2). Every data project is now on the landing. Marketing ranks unchanged (1 to 6).

### 8.18 Data overview header redesign (this session)

Redesigned the `/data` header band (`src/pages/Data.jsx`), everything **between the heading and the sub tabs**. The eyebrow ("DATA AND ANALYTICS"), heading ("Turning questions into decisions"), and sub tabs are **unchanged**. New structure:
- **Two-column top row** (`md:grid-cols-[1fr_auto] md:items-center`, stacks on mobile): left = eyebrow + heading + a new intro line ("My work spans end to end analytics, turning raw data into decisions that drive growth and engagement."); right = the new **`DataMotif`** SVG (layered lavender bars + rising violet trend line with soft fill + rose arc accent, `max-w-[230px]`), replacing the old small `RisingChart` corner line (removed).
- **Three capability rows** (`capabilities` array): each has a 3px violet (`#7E5C9E`) left accent rule, a label + tool `Chip`s, and a description. Rows split by `0.5px` `#EFEDF7` dividers. Content: Querying and analysis (SQL, Excel), Dashboards and reporting (Tableau, Excel Visualization), Machine learning (R, Python).
- **Slim stats strip** below a `0.5px` top divider, same three stats (6 projects / 6 tools / 3 focus areas) with the existing `CountUp` animation, numerals bumped to ~30px. The old plain stats block that sat under the heading is gone.
- `Chip` is now imported into `Data.jsx`. Copy is dash free.

### 8.19 Data header simplified to a clean minimal band (DONE, build green)

Follow-up to 8.18 that **supersedes it**: the capability-rows-plus-stats header felt cluttered and ran too tall (first card below the fold). After iterating (compacted stacked rows → three side-by-side capability cards, tried tinted then warm-white fills), Annie decided the cards weren't working and we **removed them entirely**. The `/data` header is now a **minimal band** in `src/pages/Data.jsx`:
- **Single top row** (`grid md:grid-cols-[1fr_auto] md:items-center`): left column = eyebrow "DATA AND ANALYTICS" + heading "Turning questions into decisions" + a two-line intro (hard `<br/>` after "decisions", so it reads "…turning raw data into decisions" / "that drive growth and engagement") + a short **violet accent line** (`mt-10 h-0.5 w-16 rounded-full bg-violet`); right column = the **`DataMotif`** SVG (layered lavender bars + rising violet trend line + rose arc accent, `max-w-[230px]`). Then straight into the sub tabs.
- **What was deleted:** the three capability rows/cards, the `capabilities` array, the "6 projects / 6 tools / 3 focus areas" stats strip, and now-unused `CountUp` + `Chip` imports. The eyebrow, heading, `DataMotif`, and sub tabs are unchanged from 8.18.
- **Final spacing** (all tuned live with Annie): section `bg-violetTint pt-24` (top gap matches the Marketing header's `pt-28` feel) with `pb-8`; the accent line at `mt-10`; the **cards container below the tabs is back to `pt-16 pb-16`** with `space-y-20` between cards. First project card peeks nicely below the fold on normal laptop viewports.
- **ML capability copy that briefly lived in the deleted cards is gone**; the honest project descriptions on the detail pages are unaffected.

Screenshot recipe if tuning again: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=1280,900 --screenshot=/tmp/x.png http://localhost:5173/data`.

### 8.20 Marketing overview gallery alignment fix (SUPERSEDED by 8.22)

> Historical: this flex-column/masonry alignment fix was later replaced by the hand-placed mosaic in 8.22. The `GalleryTile`, `sizeClass`/`ratioClass`, and `grid-flow-row-dense` described below no longer exist in `Marketing.jsx`. Kept for context on why the masonry was abandoned.

The `/marketing` mixed-size gallery (`src/pages/Marketing.jsx`, `GalleryTile`) was misaligned: tiles used `Link` = `block h-full` with the image div forced to `h-full`, so the image ate the whole grid cell and each caption spilled below its cell into the next row (captions floated detached from their tiles). Fixed by **porting the landing page's proven flex-column pattern** (see 8.6): `Link` is now `flex h-full flex-col`; the tall Sainsbury's tile's image container gets `sm:min-h-0 sm:flex-1` so it flexes to fill the two rows it spans and its bottom aligns with the two stacked tiles beside it; captions are `shrink-0 pt-3` so they never overflow. Image aspects pulled into a `ratioClass` map (tall `aspect-[3/4] sm:h-full`, wide `aspect-[16/7]`, small `aspect-[4/3]`). The grid gained `grid-flow-row-dense`. Result: every caption sits directly under its tile and the rows line up (Sainsbury's / Starbucks / Xfinity captions share a baseline; NYC wide caption directly under it; Theatre PR + Confession aligned below). Header and stats untouched.

### 8.21 Marketing detail page rebuilt as the reusable pattern (Sainsbury's, DONE)

`src/pages/MarketingProject.jsx` was rebuilt from Annie's build spec into **the repeatable marketing detail pattern**; Sainsbury's (`slug: sainsburys`) is the template. Structure:
- **Hero (cream, terracotta accents):** back link → terracotta eyebrow (`project.tag`, now "digital media strategy") → serif title → a one sentence **`detail.description`** (text-lg, ink-secondary) → a **`detail.skills`** line ("Key skills demonstrated:" bolded in ink, rest ink-muted). Right column = a **slim white project card** (`rounded-xl border-[0.5px] border-terracotta/25`) with **three fields only — project type / date / tools — no team, no role** (`meta` for sainsburys dropped its `team` key).
- **01 / INTRO (white):** terracotta eyebrow "01 / intro" + `detail.intro.heading` (Newsreader) + `detail.intro.paragraphs[]` (four paras).
- **Slides (white):** a **numbered deck** from `detail.slides = { folder, count }`. `SlideDeck` renders **slide 1 alone full width** (title page) then **slides 2..N two per row** in number order, no captions. Each `Slide` is `SmartImage natural` (uncropped) with a numbered placeholder (`01`..`21`) until the PNG exists. Files go in **`public/images/marketing/sainsburys/` named `1.png` .. `21.png`** (folder created). No pull quote, no view-deck button in this version (renders a deck button only if `links.deck` is set).
- **Thumbnail:** added `image: '/images/marketing/sainsburys/thumbnail.png'` to the sainsburys entry → drives both the `/marketing` gallery tile and the landing brand-stories tile (placeholder until the file is dropped).
- **Graceful fallback:** projects without the new `detail` schema still render (description falls back to `brief`; intro/slides sections simply omit). The old `MarketingSlide`/`heroSlide`/`approach`/`outcome`/`pullQuote` path was removed.
- **Headless-screenshot note:** `Section` uses `whileInView` fade-in, which does not trigger in a static headless capture (page looks blank); verify in a real browser or accept it. Build compiles clean.

**Reuse for the next marketing project:** copy the sainsburys `detail` shape — swap `tag`, `title`, `description`, `skills`, `meta` (type/date/tools), `intro` (heading + paragraphs), and `slides` (new folder + count), then drop numbered PNGs + a thumbnail. No layout code changes needed.

### 8.22 Marketing galleries reworked into a mosaic (DONE, build green)

Both marketing galleries (the `/marketing` overview and the landing "brand stories" section) were changed from the old mixed-size masonry (8.20) into a **hand-placed mosaic** matching Annie's Wix reference, where each project's **thumbnail carries its own title** so the tiles are **image-only (no caption below)**. Two blocks:
- **Top block** (`grid md:grid-cols-4 md:auto-rows-[8.5rem] gap-4`): **Sainsbury's** as a large **2x2 feature** (`md:col-span-2 md:row-span-2`); **Starbucks** (`col-start-3 row-start-1`) and **Confession** (`col-start-3 row-start-2`) stacked in the middle column; the **theatre poster** as a **tall right column** (`col-start-4 row-span-2`, `imgRatio="aspect-[3/4] md:h-full"`).
- **Bottom block** (`grid md:grid-cols-2 gap-4`): **Xfinity** and **NYC food guide** as two wide tiles (`aspect-[16/7]`).
- **Tiles fill their cells with `object-cover`** (`SmartImage ratio="…md:h-full"`, fixed row height on md so the row/col spans align; each tile falls back to an aspect ratio and stacks on mobile). Thumbnails are designed to match their cell shape (Sainsbury wide banner, theatre tall poster), so cover cropping reads well. `imagePosition: 'object-right'` stays on sainsburys.
- Placement is **by slug**, not by `size`/`tier` (those fields are now inert but left in the data; `landingRank` still selects and orders which projects appear on the landing). Marketing.jsx helper: `bySlug` + `MosaicTile`. Landing.jsx helper: `mkt` + `BrandMosaicTile` (keeps the stagger `item` variant).
- Sainsbury's `brief` was rewritten to a crisp blurb ("Reimagining a supermarket icon for the digital age with contextual media strategy."); it is not shown in the mosaic (image-only) but is used on the detail page fallback.
- **Marketing detail hero spacing** was loosened for breathing room (applies to all marketing detail pages since they share `MarketingProject`): eyebrow→title `mt-5`, title→description `mt-6`, description→skills `mt-7`.
- The other five projects' thumbnails are placeholders until dropped into `public/images/marketing/` (each project's `image` path). Sainsbury's `thumbnail.png` is already in and shows in the feature cell.

### 8.23 Marketing complete — galleries simplified, all six details built, hero redesign, footer (DONE, build green)

Big marketing session. Supersedes the mosaic layout in 8.22 and the fallback state in 8.13.

**Galleries reworked to a uniform 2-up 16:9 grid (supersedes the 8.22 mosaic).** Both the `/marketing` overview (`Marketing.jsx`, `MosaicTile`) and the landing "brand stories" section (`Landing.jsx`, `BrandMosaicTile`) dropped the hand-placed mosaic. Every tile is now `aspect-[16/9]`, two side by side per row, `gap-6 md:gap-8`.
- **`/marketing` shows all six** in this order: Sainsbury's · Starbucks, then Xfinity · NYC food guide, then Confession · Trapped in the Flash.
- **Landing shows only four** (Sainsbury's, Starbucks, Xfinity, NYC food guide), hardcoded by slug (not by `landingRank`, though ranks still exist).
- **Hover title reveal (both pages):** each tile is `group relative overflow-hidden`; on hover a soft `from-ink/75` bottom gradient fades in, the project `tag` (small caps) + serif `title` slide up, and the image gently `scale-[1.04]`. So thumbnails are image-only at rest and name themselves on hover.
- The old mosaic helpers (`auto-rows`, col/row spans, `size`/`tier`-driven placement) are gone.

**"View all" buttons under each landing section.** Below "selected data work" and "…and tell great brand stories" (heading→grid gap bumped to `mt-14`), a left-aligned pill button: "view all data projects" → `/data`, "view all marketing projects" → `/marketing`. `Button.jsx` gained an **`accent` prop** (`violet` default | `terracotta`) and a **`soft` variant** (light tinted fill) — currently the buttons use `variant="outline"` (data violet outline, marketing terracotta outline); the `soft` variant is defined but unused.

**Slug rename:** `theatre-launch` → **`trapped-in-the-flash`** (clean URL). The `/marketing` gallery reference was updated; landing doesn't reference it.

**All six marketing detail pages now BUILT** (each a full `detail` object in `projects.js`, rendered by the shared `MarketingProject.jsx`; slides are numbered `1.png..N.png` in `public/images/marketing/<slug>/`, title page alone then two per row):
- **sainsburys** — "Reimagining Sainsbury's…", 21 slides (from 8.21).
- **starbucks** — "Starbucks Experience Redesign", CUSTOMER EXPERIENCE STRATEGY, 17 slides.
- **xfinity** — "Xfinity Mobile 'Data in Dollars' Campaign Analysis", CAMPAIGN ANALYSIS, 9 slides.
- **nyc-food-guide** — "A Foodie's Guide to NYC", DIGITAL MARKETING, 9 slides, date 2025. **Richer 01 intro** (see below).
- **confession-film** — "'Confession' (NYU Thesis Film): Social Media Manager", SOCIAL MEDIA MANAGEMENT, 9 slides, date "January 2025 to May 2025".
- **trapped-in-the-flash** — "Marketing Director, 'Trapped in the Flash'", MARKETING LEADERSHIP, 5 slides, date "Oct 2023 to April 2024". **Richer 01 intro.**

**`MarketingProject.jsx` intro schema extended (backward-compatible).** In addition to `intro.paragraphs`, the intro now supports `intro.lead` (a lead paragraph) and `intro.sections[]`, where each section is `{ label, text }` (a labeled paragraph) or `{ label, items: [{ label, text }] }` (a spaced execution list — bold label over description, thin terracotta left rule, `space-y-5`). Used by nyc-food-guide and trapped-in-the-flash; the other four use plain `paragraphs`. Also this session, marketing detail hero spacing was widened again: title→description `mt-8`, description→skills `mt-9` (applies to all, shared component). "end-to-end" keeps its hyphen (approved exception, alongside "data-driven") in nyc/confession copy.

**Marketing overview hero redesigned** to mirror the data overview (`Marketing.jsx` header): eyebrow + serif heading + one intro paragraph + a short terracotta divider (`w-14 h-[3px] rounded-full bg-terracotta`, `mt-[32px]`), with a warm **`StoryRibbon`** SVG motif (`max-w-[230px]`) beside the heading (`md:grid-cols-[1fr_auto] items-center`, stacks on mobile). Removed: the italic "Before the data…" tagline, the stats row (years/campaigns/brands), the old `FlowingCurve`, and the `CountUp` import. Section is `bg-cream pt-28 … pb-12`. Gallery grid below is unchanged.

**Footer copy (`Footer.jsx`):** left is now just "data-driven storyteller" (dropped the "Annie Shan" wordmark line and "based in Chicago"); right reads "Built by Annie Shan and her Claude".

### 8.13 Still to build (scaffold only)
- **Marketing thumbnails + slide decks:** all six `detail` objects and `image` paths are wired (8.23), but the actual PNGs are dropped in per project. As of now **Starbucks has its full 17-slide deck + thumbnail in**; the other five show numbered dashed placeholders until their `thumbnail.png` and `1.png..N.png` are added under `public/images/marketing/<slug>/`. Just drop files in; no code changes needed (adjust a `slides.count` in `projects.js` only if a deck's length changes).
- **Resume/CV** and **Fun Facts** pages (section 4.5, 4.6) — still working scaffolds in `src/pages/`, need real content and a design pass. Resume content (experience/education entries) and the CV PDF (`public/cv/`) come from Annie.
