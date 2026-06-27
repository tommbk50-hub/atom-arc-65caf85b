

# Molecular Dynamics Lab Website - Comprehensive Template Analysis

## Template Identity

- **Suggested Name**: Helix - Academic Research Lab Template
- **URL Slug**: helix

---

## 1. UI/UX Features & Components

### Interactive Elements (Actually Used)
- **Accordion**: Shadcn `Accordion` (Radix) on Join Us page for FAQ section (5 items, single-collapsible mode)
- **Dialog/Modal**: Shadcn `Dialog` (Radix) on Team page for team member bio detail views; triggered by clicking team member cards
- **Sheet (Mobile Drawer)**: Shadcn `Sheet` sliding from right for mobile navigation menu (w-80)
- **Filter Toggles**: Custom pill-shaped filter buttons on Team page (4 categories: All/Postdocs/PhD Students/Undergraduates) and News page (6 categories: All/Publications/Awards/Presentations/Events/Announcements)
- **Search Input**: Shadcn `Input` with `Search` icon prefix on Publications page for full-text search across titles, authors, and journals
- **Year Filter Sidebar**: Sticky sidebar (lg:sticky lg:top-24) on Publications page with clickable year buttons
- **Animated Counters**: Custom scroll-triggered counters on Home page using `useInView` from Framer Motion; counts from 0 to target value over 1500ms at ~60fps (16ms intervals)

### Layout Systems
- **CSS Grid**: Extensively used across all pages
  - 2-col stats on mobile, 4-col on desktop (`grid-cols-2 lg:grid-cols-4`)
  - 3-col featured research (`grid-cols-1 md:grid-cols-3`)
  - Team grid: 1→2→3→4 columns (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`)
  - Research projects: 1→2 columns (`grid-cols-1 lg:grid-cols-2`)
  - Sidebar + main content layout on Publications page (`flex-col lg:flex-row`)
- **Flexbox**: Used for header nav, card internals, badge rows, CTA sections
- **Container**: Centered with `container mx-auto px-4`, max-width 1400px (Tailwind config)

### Navigation Patterns
- **Fixed Header**: `fixed top-0 w-full` with `bg-card/95 backdrop-blur-sm border-b`, z-50
- **Desktop Nav**: Horizontal link row with animated underline indicator using Framer Motion `layoutId="nav-underline"`
- **Mobile Nav**: Hamburger menu (`Menu` icon) opening a `Sheet` from right with vertical link stack
- **Active State**: Teal-colored text + animated bottom border on desktop; teal background highlight on mobile
- **Footer Nav**: 4-column grid (1-col mobile) with Quick Links, Contact, Office Hours sections
- **Internal CTAs**: Prominent "Explore Research" and "Join Our Lab" buttons throughout; "View All" links for news

### Content Organization Features
- **Category Filtering**: Toggle-style pill buttons on Team and News pages with instant re-render
- **Year-Based Grouping**: Publications grouped by year with bold year headers and border separators
- **Search**: Real-time text filtering on Publications using `useMemo` across title, authors, and journal fields
- **Featured Content**: Highlighted publications with gradient background cards (`bg-featured`) and teal borders
- **Status Badges**: Color-coded project status (Active: emerald, In Planning: amber, Completed: slate)

### Visual Effects & Animations
- **Page Transitions**: Every page wrapped in `motion.div` with `initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}`; `AnimatePresence mode="wait"` in Layout
- **Scroll-Triggered Fade-Up**: `FadeUp` component: `initial={{ opacity: 0, y: 20 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-50px" }}`
- **Staggered Entrances**: `StaggerContainer` with `staggerChildren: 0.1, delayChildren: 0.2`; `StaggerItem` children fade up individually
- **Card Hover**: `CardHover` wrapper applies `whileHover={{ scale: 1.02 }}` and `whileTap={{ scale: 0.98 }}`
- **Image Overlay on Hover**: Team member cards reveal research interests via `group-hover:opacity-100` gradient overlay (`from-secondary/90 to-transparent`)
- **Shadow Transitions**: Cards transition from `shadow-card` to `shadow-card-hover` on hover via CSS `transition-shadow`
- **Layout Animation**: Publications list uses `motion.div layout` for smooth repositioning during filter changes
- **News Category Transitions**: `AnimatePresence mode="wait"` swaps filtered content with fade + staggered item entrances (delay `i * 0.05`)
- **Hero Staggered Text**: Headline (0.2s delay), subheadline (0.4s), CTA buttons (0.6s) animate sequentially

### Form Elements
- **Search Input**: Shadcn Input with left-aligned Search icon (absolute positioning)
- **Filter Buttons**: Custom styled buttons with active/inactive states using conditional Tailwind classes

---

## 2. Typography & Design System

### Fonts
- **Primary**: Inter (Google Fonts import) — weights: 400, 500, 600, 700, 800
- **Monospace**: JetBrains Mono (Google Fonts import) — weights: 400, 500, 600
- **Font stack**: `font-sans: ['Inter', 'system-ui', 'sans-serif']`; `font-mono: ['JetBrains Mono', 'monospace']`

### Typography Hierarchy
- **Hero Headlines**: `text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tighter` (responsive scaling across 4 breakpoints)
- **Page Titles**: `text-3xl lg:text-5xl font-extrabold tracking-tighter` (used on all sub-page hero sections)
- **Section Headings**: `text-2xl lg:text-4xl font-bold` or `text-2xl font-bold` (consistent across pages)
- **Card Titles**: `text-lg font-bold` or `text-lg font-semibold`
- **Body Text**: `text-sm` or `text-base` with `leading-relaxed`
- **Metadata/Labels**: `text-xs font-medium` or `text-xs text-muted-foreground`
- **Data Display**: `.font-mono-data` utility class applies JetBrains Mono for statistics, dates, citation counts, durations

### Type Scale
- Fixed rem values via Tailwind defaults (text-xs through text-6xl)
- Responsive sizing using Tailwind breakpoint prefixes (not CSS clamp())

### Line Heights & Letter Spacing
- Global: `tracking-tight font-bold` applied to all h1-h6 via base layer
- Hero: `tracking-tighter` (-0.05em)
- Body: `leading-relaxed` (1.625) for descriptions; `leading-snug` (1.375) for featured pub titles
- Default: `leading-normal` (1.5) inherited

### Text Styles
- **Gradient Text**: `.text-gradient` utility using `bg-clip-text text-transparent` with `--gradient-research` background
- **Lab Member Highlighting**: In publication author lists, lab members rendered as `<strong className="text-primary font-semibold">`
- **Links**: Primary color (`text-primary`) with `hover:underline underline-offset-4`
- **Italic**: Used for testimonial quotes and journal names

---

## 3. Color System

### Primary Brand Colors (HSL via CSS custom properties)
- **Primary (Teal)**: `hsl(174 60% 40%)` — ~#29A69A — buttons, links, active states, accent borders
- **Accent (Dark Teal)**: `hsl(174 72% 33%)` — ~#178C7A — hover states
- **Secondary (Slate)**: `hsl(215 25% 27%)` — ~#334155 — footer background, overlays

### Teal Scale (7 steps)
- Teal 50: `hsl(166 76% 97%)` — tag backgrounds
- Teal 100: `hsl(167 85% 89%)` — category badges
- Teal 300: `hsl(171 77% 64%)` — decorative
- Teal 500: `hsl(174 60% 40%)` — primary actions
- Teal 600: `hsl(175 77% 26%)` — gradient endpoints
- Teal 700: `hsl(175 77% 22%)` — text on light backgrounds
- Teal 900: `hsl(176 80% 12%)` — hero gradient endpoint

### Neutral/Slate Scale (9 steps)
- Slate 50: `hsl(210 40% 98%)` — page backgrounds
- Slate 100: `hsl(210 40% 96%)` — muted backgrounds
- Slate 200: `hsl(214 32% 91%)` — borders
- Slate 300: `hsl(213 27% 84%)` — inactive UI
- Slate 500: `hsl(215 16% 47%)` — muted text
- Slate 600: `hsl(215 19% 35%)` — secondary text
- Slate 700: `hsl(215 25% 27%)` — headings in dark contexts
- Slate 800: `hsl(217 33% 17%)` — hero gradient
- Slate 900: `hsl(222 47% 11%)` — foreground text

### Semantic Colors
- **Success/Active**: Emerald 500 `hsl(160 84% 39%)`, Emerald 100 for badges
- **Warning/Planning**: Amber 500 `hsl(38 92% 50%)`, Amber 100 for badges
- **Info/Presentations**: Blue 500 `hsl(217 91% 60%)`, Blue 100
- **Events**: Purple 500 `hsl(258 90% 66%)`
- **Error/Destructive**: `hsl(0 84% 60%)`

### Gradients (4 named)
- `--gradient-hero`: 135deg from slate-800 → slate-700 → teal-900 (dark immersive hero sections)
- `--gradient-research`: left→right from teal-500 → slate-700 (research page banner)
- `--gradient-cta`: 135deg from teal-500 → teal-600 (call-to-action sections)
- `--gradient-featured`: 135deg from teal-50 → slate-50 (featured publication cards)

### Dark Mode
- Not implemented. Single light theme only. No `prefers-color-scheme` handling.

### Color Usage Across Components
- Category-specific border colors for news cards (Publications: teal, Awards: emerald, Presentations: blue, Events: purple, Announcements: amber)
- Matching category badge colors (background + text combinations)
- Team member research interest pills: `bg-teal-50 text-teal-700`
- Checkmark icons: `text-emerald-500` for requirements; `text-primary` for offerings

---

## 4. Spacing & Layout System

### Spacing Scale
- Standard Tailwind spacing scale (no custom extensions)
- Page section padding: `py-16` or `py-20` (4rem / 5rem)
- Container padding: `px-4` (1rem)
- Card padding: `p-6` (1.5rem) or `p-8` (2rem) for larger project cards
- Hero padding: `py-16 lg:py-20`
- CTA blocks: `p-10 lg:p-16`
- Grid gaps: `gap-4`, `gap-6`, `gap-8` depending on content density

### Border Radius
- `--radius: 0.75rem` (base)
- `rounded-lg`: 0.75rem — standard cards
- `rounded-xl`: ~0.875rem — featured cards, CTA blocks
- `rounded-2xl`: 1rem — large CTA containers
- `rounded-full`: pills, badges, avatar circles, filter buttons
- `rounded-md`, `rounded-sm`: derived from radius variable

### Shadows (3 levels, custom)
- `--shadow-card`: `0 4px 6px -1px hsl(222 47% 11% / 0.07), 0 2px 4px -2px hsl(222 47% 11% / 0.05)` — resting state
- `--shadow-card-hover`: `0 20px 25px -5px hsl(222 47% 11% / 0.08), 0 8px 10px -6px hsl(222 47% 11% / 0.06)` — hover state
- `--shadow-elevated`: `0 25px 50px -12px hsl(222 47% 11% / 0.15)` — prominent elements

### Container
- Max-width: 1400px (`2xl: "1400px"`)
- Centered: `container mx-auto`
- Horizontal padding: `2rem` (from Tailwind config)

---

## 5. Responsive Design & Mobile

### Breakpoints
- `sm`: 640px — 2-col grids
- `md`: 768px — 3-col grids, desktop nav visibility
- `lg`: 1024px — sidebar layouts, expanded hero text, 3-4 col grids
- `xl`: 1280px — 4-col team grid, largest hero text

### Mobile-Specific Features
- **Hamburger Menu**: `Menu` icon visible `md:hidden`, opens `Sheet` from right side (w-80)
- **Responsive Hero Text**: Scales from `text-3xl` (mobile) to `text-6xl` (xl desktop)
- **Stacked Grids**: All grids collapse to single-column on mobile
- **Publications Sidebar**: Changes from fixed sidebar (`lg:w-64 lg:sticky`) to stacked top section on mobile

### Layout Adaptations
- Stats: 2-col mobile → 4-col desktop
- Featured research: 1-col → 3-col at `md`
- Team: 1→2→3→4 columns across breakpoints
- Research projects: 1→2 columns at `lg`
- Positions: 1→3 columns at `lg`
- Testimonials: 1→3 columns at `md`
- PI section: stacked → side-by-side at `lg` (1/3 + 2/3 grid)
- Footer: 1-col mobile → 4-col at `lg` (2-col at `sm`)

---

## 6. Performance & Optimization

- **Vite Build**: Uses `@vitejs/plugin-react-swc` (SWC compiler — faster than Babel)
- **Route-Based Code**: All pages are separate components imported at app level (no lazy loading / code splitting currently implemented)
- **Scroll Animations**: `viewport={{ once: true }}` ensures animations trigger only once, avoiding re-computation
- **useMemo**: Publications and News filtering use `useMemo` to prevent unnecessary recalculations
- **Image Handling**: Hero image imported as static asset via Vite; no lazy loading, no responsive images, no WebP optimization
- **No Virtualization**: Lists are short enough (7 publications, 7 news items) that virtualization is unnecessary

---

## 7. Accessibility Features

### Implemented
- **Semantic HTML**: Proper `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>` landmarks in Layout
- **Alt Text**: Hero image has empty alt (`alt=""`) marking it as decorative
- **Radix Primitives**: Dialog, Accordion, Sheet all provide built-in ARIA attributes, focus trapping, and keyboard navigation
- **Link Semantics**: Buttons that navigate use `asChild` with `<Link>` for proper anchor behavior
- **Heading Hierarchy**: h1 per page, h2 for sections, h3 for subsections/cards

### Not Implemented
- No skip-to-content link
- No explicit ARIA labels on custom filter buttons
- No `prefers-reduced-motion` handling for Framer Motion animations
- No focus ring customization beyond Tailwind defaults
- No screen reader announcements for filter state changes

---

## 8. SEO & Discoverability

### Meta Tags (index.html)
- `<title>`: "Lovable App" (generic — not customized)
- `<meta name="description">`: "Lovable Generated Project" (generic)
- `<meta property="og:type">`: "website"
- `<meta property="og:image">`: Auto-generated preview screenshot URL
- `<meta name="twitter:card">`: "summary_large_image"
- OG title/description: Match the generic defaults

### robots.txt
- Allows all crawlers (Googlebot, Bingbot, Twitterbot, facebookexternalhit, *)

### Not Implemented
- No structured data / JSON-LD
- No sitemap.xml
- No canonical URLs
- No per-page meta tags (SPA without SSR)
- No dynamic document title updates per route

---

## 9. Content Features

### Content Types (6 pages)
1. **Home**: Hero + stats + featured research + recent news + CTA
2. **Team**: PI profile + filtered team grid + alumni section + bio modals
3. **Research**: Research themes (4) + current projects (4) with status/funding/team
4. **Publications**: Featured (3) + full list (7) with search + year filter + author highlighting
5. **Join Us**: Open positions (3) + application timeline (6 steps) + qualities + testimonials (3) + FAQ accordion (5) + CTA
6. **News**: Category-filtered news feed (7 items) with color-coded categories

### Filtering & Sorting
- Team: by role category (4 options)
- Publications: by year + full-text search
- News: by category (6 options including "All")

### Content Discovery
- Featured publications highlighted with distinct styling
- Recent news on Home page with "View All" link
- Cross-linking between pages (research → join, home → research)
- Category badges provide visual taxonomy

---

## 10. Theming & Customization

- **CSS Custom Properties**: Full HSL-based design token system in `:root` — all colors, gradients, shadows configurable by editing CSS variables
- **No Theme Switching**: No dark mode toggle, no runtime theme changes
- **Tailwind Config**: Extended with custom font families, color tokens, border radii, shadows, and animations
- **Gradient Utilities**: 4 named gradients available as utility classes (`.bg-hero`, `.bg-research`, `.bg-cta`, `.bg-featured`)
- **Button Variants**: 8 variants defined via CVA (default, destructive, outline, secondary, ghost, link, hero, hero-outline)

---

## 11. Integration & Extension Points

### Current Integrations
- **None**. Entirely static/client-side. No backend, no analytics, no APIs, no auth, no Lovable Cloud, no Supabase, no payment integrations.

### Libraries in Use
- **Framer Motion** v12: Page transitions, scroll animations, hover effects, layout animations
- **Lucide React** v0.462: Icon library (Users, BookOpen, FlaskConical, DollarSign, Sparkles, Brain, Target, ArrowRight, Mail, Search, ExternalLink, CheckCircle, GraduationCap, Menu, X, Wrench, FileText, Beaker)
- **React Router DOM** v6: Client-side routing (6 routes + 404 catch-all)
- **TanStack React Query** v5: Configured but not actively used for data fetching (static data)
- **Radix UI**: Accordion, Dialog, Sheet, Tooltip (via Shadcn wrappers)

---

## 12. Developer Experience

### Tooling
- **TypeScript** 5.8 with strict mode
- **Vite** 5.4 with SWC plugin
- **ESLint** 9 with react-hooks and react-refresh plugins
- **Vitest** 3.2 for unit testing (basic test infrastructure exists in `src/test/`)
- **Playwright** for E2E testing (config present, fixture file exists)
- **PostCSS** + **Autoprefixer**
- **Tailwind CSS** 3.4 with `tailwindcss-animate` plugin

### Code Quality
- Consistent component structure: default exports, interface-driven props
- Reusable animation wrappers (`MotionWrappers.tsx`) centralizing Framer Motion patterns
- Semantic token architecture (CSS variables → Tailwind config → components)
- Type-safe team member interface (`TeamMember`)

### Shadcn UI Components (Installed but NOT all used)
- **Actually used**: Accordion, Button, Badge, Dialog, Input, Sheet, Sonner, Toaster, Tooltip
- **Installed but unused**: Alert, AlertDialog, AspectRatio, Avatar, Breadcrumb, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, ContextMenu, Drawer, DropdownMenu, Form, HoverCard, InputOTP, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sidebar, Skeleton, Slider, Switch, Table, Tabs, Textarea, Toggle, ToggleGroup

---

## 13. Suggested Template Name and Slug

- **Template Name**: Helix - Academic Research Lab Template
- **URL Slug**: helix

