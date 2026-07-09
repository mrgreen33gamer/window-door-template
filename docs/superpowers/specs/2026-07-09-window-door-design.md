# Window & Door Template — Design Spec

## Context

Scott Apps sells a family of near-identical Next.js marketing-site templates, one per trade, each forked from `hvac-template` and re-skinned. This run forks `hvac-template` into `window-door-template`, following `RESKIN_PLAYBOOK.md` and sibling-cloning patterns from `electrical-services-template`.

Per standing decisions for non-gallery trades: per-city SEO subpages are deleted, and the `src/app/projects/` route is deleted. Orphan gallery components left unwired.

## Business Identity (locked, reuse verbatim)

- **Business name:** ClearView Windows & Doors
- **Tagline:** Energy-Efficient Windows & Entry Doors
- **Location:** Waco, TX (home base)
- **Service area cities:** Waco, Temple, Killeen, Hewitt, Woodway, McGregor, China Spring, Bellmead
- **Founded:** 2012
- **Owner:** Daniel Crowe
- **Credential/license line:** "Factory-Certified Installers · Bonded & Insured"
- **Guarantee:** Lifetime Product Warranty Support + 10-Year Installation Warranty
- **Social proof:** 4.9★, 650+ reviews, 3,500+ installs
- **Brand accent color:** violet `#7c3aed` (token `$orange`; light `#a78bfa`; dark `#5b21b6`)
- **Phone:** (254) 740-3300 / `tel:+12547403300`
- **Email:** hello@clearviewwindowsdoors.com
- **Domain:** clearviewwindowsdoors.com
- **Address:** 501 Lake Air Dr, Waco, TX 76710
- No per-city SEO subpages

## Services (6)

| Old HVAC slug | New slug | Title |
|---|---|---|
| ac-repair | window-replacement | Window Replacement |
| heating | entry-door-installation | Entry Door Installation |
| installation | patio-sliding-doors | Patio & Sliding Doors |
| duct-cleaning | storm-impact-windows | Storm & Impact Windows |
| indoor-air-quality | window-repair | Window Repair |
| maintenance | energy-efficiency-upgrades | Energy Efficiency Upgrades |

## Industries Served (3)

| Old slug | New slug | Title |
|---|---|---|
| automotive | homebuilders | Homebuilders |
| manufacturing | property-management | Property Management |
| oil-gas | commercial-storefronts | Commercial Storefronts |

## Blogs (3)

1. `vinyl-vs-fiberglass-windows-texas`
2. `when-to-replace-windows-energy-bills`
3. `choosing-entry-door-curb-appeal`

## Pages

Home, Services (index + 6 detail), Industries (index + 3 detail), About, Contact, Service Areas, Blog (index + 3 posts), Privacy. No `/projects` route. No per-city SEO.

## Non-goals

- No per-city SEO subpages
- No new component primitives
- No project gallery
- No marketplace catalog flip (separate pass)

## Process

1. Batch A — chrome: brand tokens, Header/Footer, root layout, robots/sitemap/llms, privacy/admin
2. Batch B — shared PageComponents defaults
3. Batch C — homepage, services ×6, industries ×3, blogs ×3, about/contact/service-areas, reviews
4. Batch D — delete projects + city SEO, grep clean, typecheck, design spec, commits

## Success Criteria

- Zero HVAC / Arctic Air / old phone / Mapbox pk / Scott Applications agency leaks in customer-facing source
- Accent `#7c3aed` in `$orange` and hardcoded loaders
- `npm run typecheck` passes
- Logical git commits by batch
