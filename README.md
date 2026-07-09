# scottapps-fix9 — Complete Tracking Audit + Bug Fixes

## Drop-in: drag contents to project root, let overwrite, restart dev server.

---

## Files Changed (10 files)

### 🐛 Bug Fixes

**`components/AdminComponents/Charts/HourHeatmap.tsx`**
Fixed crash: `can't access property "getBoundingClientRect", closest(...) is null`
The old code traversed the DOM upward looking for `[data-heatmap]` which didn't exist as
a parent. Now uses a `useRef` on the wrapper div — tooltip position is calculated correctly.
Bars highlight on hover and show a styled floating tooltip with hour + click count.

**`src/app/api/admin/leads/route.ts`**
Fixed dev leads not showing in counts. Was calculating `devLeadsCount` from current page
results only — if the dev lead was on page 2+, the count was wrong. API now returns
`totalDev` (accurate across ALL pages). Also: `ipCity: "Unknown"` is still excluded from
the map but the table now falls back to `cityName` so test entries show a location.

**`src/app/admin/(dashboard)/leads/page.tsx`**
Updated to use `totalDev` from API instead of filtering `lead.isDevTest` from page results.

---

### ✅ Tracking — Complete Coverage

#### General Components
| Component | What's now tracked |
|---|---|
| `Header` | Nav links (Home, Website Services, Graphic Design, Software, Marketing), INVOICING SOFTWARE button, social icons (Facebook, Instagram, Google, YouTube) |
| `Footer` | Nav links, Service links, Industry links, social icons, "Our Software →" button |

#### Blog Components  
| Component | What's now tracked |
|---|---|
| `BlogCard` | Card click → fires with post title as label, section `BlogCard` |
| `RelatedLinks` | Each related article link → fires with article title, section `RelatedLinks` |

#### Page Components
| Component | What's now tracked |
|---|---|
| `IndustryPainPoints` | "Let's Fix That" / custom CTA button |
| `WhyChooseUs` | "Contact Us" / custom CTA button |
| `AuthorBio` | "Connect on LinkedIn" link |

#### Already tracked (previous fixes, confirmed ✅)
- `CTABanner` — primary + secondary
- `Header` — Request Service
- `Footer` — Work with Confidence, Start a Project, phone, email
- `BlogCTA` — bottom-of-post button
- `GuaranteeSection` — Start Your Project
- `ServiceCardComponent` — service cards + bottom CTA
- `LocalServiceAreas` — Find Services per city
- `RequestServiceCTA` — Get My Free Quote
- `InsuredBadge` — Work With Us
- `ContactForm Variant1` — phone link

#### No CTAs to track (confirmed ✅)
- `FAQ` — accordion only, no links
- `ImpactMetrics` — stats display only
- `ProcessTimeline` — steps display only
- `TrustBar` — scrolling badge marquee only
- `WhatToExpect` — cards only
- `ValueComparison` — comparison table only
- `SectionIntro` — header text only
- `MapLocalTips` — embedded Google iframe only
- `Breadcrumb` — nav trail (page views already tracked separately)

---

## Section Labels in Events Dashboard

After these fixes, your Events → Top Clicked Elements table will show sections like:

| Section | What clicked it |
|---|---|
| `Header-Nav` | Nav menu links |
| `Header-Social` | Header social icons |
| `Header` | Request Service, Invoicing Software |
| `Footer-Nav` | Footer navigation links |
| `Footer-Services` | Footer service links |
| `Footer-Industries` | Footer industry links |
| `Footer-Social` | Footer social icons |
| `Footer-Bottom` | Our Software button |
| `Footer-Contact` | Phone + email |
| `Footer-InsuredStrip` | Work with Confidence |
| `Footer-Brand` | Start a Project |
| `BlogCard` | Blog post card clicks |
| `RelatedLinks` | Related article links |
| `IndustryPainPoints` | Industry page CTA |
| `WhyChooseUs` | Why section CTA |
| `AuthorBio` | LinkedIn link |
| `CTABanner` | Banner CTAs |
| `GuaranteeSection` | Guarantee CTA |
| `ServiceCardComponent` | Service cards + CTA |
| `LocalServiceAreas` | City service links |
| `RequestServiceCTA` | Service picker CTA |
| `InsuredBadge` | Work With Us |
| `BlogCTA` | Blog bottom CTA |
