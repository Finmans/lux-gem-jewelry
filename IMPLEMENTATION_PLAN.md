# LUX GEM Launch Implementation Plan

## Current Gaps (Audit)
- Public routes working: `/`, `/collections`, `/diamonds`, `/build`
- Visible routes that returned 404 and must be resolved:
  - `/appointment`, `/contact`, `/privacy`, `/custom`, `/about`, `/journal`
  - `/education/4cs`, `/education/lab-diamonds`, `/education/shapes`
  - `/services/sizing`, `/services/care`, `/services/verify`
  - `/collections/[slug]`, `/diamonds/[id]`
- Homepage and section copy claims `500+` diamonds while visible stock shows only seeded single digits.
- Build flow shows 3 steps but does not persist or submit.
- Utility controls (search, wishlist, cart), newsletter, and social links are not fully functional.

## Phase Checklist

### Phase 1 - Audit and stabilize navigation
- [x] Create `IMPLEMENTATION_PLAN.md`
- [x] Implement or hide every linked route from navbar, footer, CTAs, collection cards, and diamond rows
- [x] Add pages: `/about`, `/custom`, `/appointment`, `/contact`, `/privacy`, `/journal`
- [x] Add pages: `/education/4cs`, `/education/lab-diamonds`, `/education/shapes`
- [x] Add pages: `/services/sizing`, `/services/care`, `/services/verify`
- [x] Add dynamic routes: `/collections/[slug]`, `/diamonds/[id]`
- [x] Verify no user-facing 404 from visible navigation

### Phase 2 - Real data layer
- [x] Add Prisma + SQLite local + PostgreSQL-ready env config
- [x] Define models: `Collection`, `Product`, `Diamond`, `Setting`, `BuildDraft`, `Inquiry`, `Appointment`, `NewsletterSubscriber`, `CertificateRecord`, `SiteSettings`
- [x] Seed current mock dataset into Prisma
- [x] Move homepage/collections/diamonds/details to one data source
- [x] Replace marketing claims with real DB-driven values

### Phase 3 - Core luxury commerce flows
- [x] Collections: category filter + detail pages + product inquiry linkage
- [x] Diamond stock: filtering + sorting + pagination + detail + reserve + sourcing CTA
- [x] Build flow: 3 functional steps + draft persistence + inquiry submission
- [x] Custom design page: complete brief form + budget + category + reference upload fallback

### Phase 4 - Conversion and communication
- [x] Working submissions for: appointment, contact, newsletter, custom inquiry, reserve diamond, ring build
- [x] Add validation, success/error states, honeypot, server logging
- [x] Persist all submissions in DB
- [x] Email notification adapter (Resend when configured, dev-safe logging fallback)

### Phase 5 - Utility actions
- [x] Search implemented end-to-end
- [x] Wishlist implemented (local storage acceptable)
- [x] Cart either hidden or implemented as inquiry/quote cart (consultation-first)

### Phase 6 - Trust, legal, education
- [x] Trust/legal content pages polished and consistent with actual policy
- [x] Certificate verify supports certificate lookup against seeded records
- [x] Claims aligned to implemented behavior

### Phase 7 - Quality and launch readiness
- [x] Metadata + OG defaults in layout plus route metadata for key conversion and policy pages
- [x] `sitemap` + `robots`
- [ ] Accessibility pass: semantic headings, labels, keyboard, focus, aria
- [ ] Performance pass: limit client components, lazy-load heavy visuals, optimize images
- [x] Add error boundary and not-found page
- [ ] Add minimal tests for critical paths

## Delivery Strategy
- Keep existing dark luxury visual language and homepage composition intact.
- Apply minimal-intrusive changes over broad refactors.
- Ship in small commits per phase with verifiable behavior.
