# CleverNext — Pre-launch Readiness Audit and Implementation Plan

Audit date: 22 October 2026

Scope: source-level review of the static storefront repository. This is not a completed live-browser, hosting, penetration, performance, payment, or legal compliance test. Items requiring evidence from the business operator or production host are explicitly marked for verification.

## Executive verdict

**Not ready yet for a full public paid-order launch.** The repository implements a static catalogue and WhatsApp enquiry flow. It does not create persisted orders, reserve stock, calculate delivery, accept payment, verify payment, issue receipts, or manage fulfilment. It can be soft-launched as an enquiry-only storefront if the business facts and manual processes below are confirmed and clearly disclosed.

## P0 — blockers before accepting payment or advertising discounts

### Business identity and trust
- [ ] Confirm legal business/operator name and whether CleverNext is a registered trading name.
- [ ] Confirm official customer-service email, phone/WhatsApp ownership, service hours, business address or other legally required business details.
- [ ] Confirm the production domain, HTTPS, DNS ownership, canonical hostname and redirect policy.
- [ ] Confirm all social profile URLs are real, controlled by the business and monitored.
- [ ] Establish who answers customer messages, expected response times, escalation for complaints, and backup if WhatsApp/email is unavailable.

### Prices, products and inventory
- [ ] Verify the current ₦50,000 price for each of the six SKUs; confirm whether delivery/taxes/other fees are extra and how totals are communicated.
- [ ] Do not show a crossed-out ₦65,000 reference price unless that is a genuine, supportable previous/regular price and the business has records for it. A fabricated markdown is misleading. Confirm local rules with Nigerian counsel.
- [ ] Confirm SKU/model/variant, materials, dimensions, package contents, compatibility, power/battery requirements, safe-use instructions, warranty and manufacturer information.
- [ ] Replace unverified technical claims and image/video mismatches; verify each gallery image actually belongs to the displayed product.
- [ ] Define who checks stock, when stock is reserved, what happens if it sells out after enquiry, substitutions, damaged items and backorders.
- [ ] Do not present availability as live inventory until a real inventory source exists.

### Delivery, returns and payment
- [ ] Document supported locations, delivery fee calculation, realistic time estimates, dispatch contact, failed delivery, re-delivery, tracking and responsibility for lost/damaged shipments.
- [ ] Publish a usable cancellation, returns, faulty/wrong/damaged item, replacement and refund policy. Include the process, time limits, evidence, refund method and expected processing time; have Nigerian counsel check compliance.
- [ ] Choose approved payment methods and define account-name verification, reconciliation, proof of payment, receipt issuance and fraud handling.
- [ ] Never ask customers for passwords, PINs or OTPs. Do not treat screenshots or browser redirects as proof of cleared payment.
- [ ] Keep the distinction between enquiry and confirmed order explicit. Today the site hands off to WhatsApp and does not itself create an order or take payment.

### Privacy and legal
- [ ] Verify actual hosting provider, access/security logs, analytics/tag manager, cookies/local storage, third-party scripts, fonts and contact/review handoff behaviour.
- [ ] Make the Privacy Policy accurately describe purposes, lawful grounds, data recipients, transfers, retention, rights, complaints/contact route and any analytics/cookies. Do not claim no tracking or storage until confirmed.
- [ ] Have a qualified Nigerian legal professional review Privacy Policy, Terms & Conditions, product-sale terms and consumer disclosures.
- [ ] Confirm the real data controller/operator identity and publish required contact details; the current policy is a working draft, not a substitute for legal review.
- [ ] Review applicable Nigerian data protection and consumer protection requirements and any obligations for the actual business structure.

### Reviews and discount claims
- [ ] Collect reviews only from genuine customers; get permission before publishing names, images or identifiable details.
- [ ] Do not publish synthetic/sample profiles as actual buyers or show unverified average ratings or review structured data.
- [ ] Decide how reviews are moderated, stored, removed on request and protected from spam/abuse.
- [ ] The new product review form only opens WhatsApp with a prefilled message; it does not save or publish reviews automatically. State that clearly to users.

## P1 — launch quality checklist

### Functional QA
- [ ] Test all six catalogue links and product IDs, missing/invalid product IDs, breadcrumbs and back-to-collection links.
- [ ] Test every image, gallery thumbnail, previous/next arrow, broken-image state, video source and poster/fallback.
- [ ] Test quantity minimum 1, maximum 99, total calculation, disabled states and the exact quantity/product in the WhatsApp enquiry.
- [ ] Test search, filters, sort order, empty results, close-search action, mobile navigation and all header/footer links.
- [ ] Test review and contact forms: required fields, length limits, invalid email, keyboard flow, popup blocked, WhatsApp unavailable and user cancellation before sending.
- [ ] Check price parity between product cards and product detail pages; test comparison-price logic only with verified values.
- [ ] Remove stale/dead links including navigation to sections that no longer exist. Ensure every button performs the action its label promises.
- [ ] Check browser console/network errors, 404s, MIME types, Linux case-sensitive paths and broken external resources.
- [ ] Check custom not-found behaviour and that all legal/about pages have consistent navigation and metadata.

### Accessibility and responsive design
- [ ] Test keyboard-only navigation, visible focus, heading order, labels, error/status announcements, alt text and accessible names.
- [ ] Check colour contrast, text resizing to 200%, screen reader output, long product names, validation messages and touch target sizes.
- [ ] Test widths around 320, 360, 390, 768, 1024 and desktop, including landscape and real Android/iOS devices where available.
- [ ] Verify sticky headers do not cover content, mobile menus can close, gallery controls are reachable, and forms remain usable with on-screen keyboards.
- [ ] Confirm reduced-motion settings disable nonessential animation and video autoplay. Provide a useful static visual when video is blocked or unsupported.

### Performance and reliability
- [ ] Measure actual image and video file sizes; the repository contains many local images and MP4s. Convert oversized images to responsive WebP/AVIF derivatives where supported.
- [ ] Compress video, provide poster frames and low-bandwidth/mobile behaviour, lazy-load below-fold media, and avoid unnecessary eager downloads/autoplay.
- [ ] Set explicit image dimensions/aspect ratios to avoid layout shift; ensure hero media has a fallback.
- [ ] Run Lighthouse or equivalent against production on mobile and desktop; record Performance, Accessibility, Best Practices and SEO scores and address critical issues.
- [ ] Measure Core Web Vitals (LCP, CLS, INP) with real or representative data where available.
- [ ] Verify cache headers, font fallback and behaviour when Google Fonts or external services fail.

### SEO and discovery
- [ ] Set canonical URLs to the actual production domain, Open Graph/Twitter metadata and a real social share image.
- [ ] Create and verify sitemap.xml and robots.txt; submit the sitemap to Search Console after domain verification.
- [ ] Add structured data only for verified facts: Organization/Store, BreadcrumbList and Product/Offer. Never invent ratings, availability, reference prices or review data.
- [ ] Confirm unique title and meta description on each page, descriptive alt text, favicon and app icons.
- [ ] Ensure production HTML and links contain no localhost, preview-domain or test-only URLs.

### Security and operations
- [ ] Enforce HTTPS and review security headers such as Content-Security-Policy, Referrer-Policy, X-Content-Type-Options and Permissions-Policy for compatibility with the host.
- [ ] Confirm no API secrets, private tokens or credentials are committed. Review third-party asset provenance and remove unused scripts.
- [ ] Test URL parameter handling and rendered text for injection/XSS issues; validate/escape user-controlled content consistently.
- [ ] Set up uptime checks, deployment notifications, version rollback, incident contacts and a way to disable or unpublish the storefront if needed.
- [ ] Enable MFA/recovery options on hosting, domain registrar, email and social accounts; use least-privilege access.
- [ ] If maintaining enquiry records, restrict access, collect minimal data, set retention/deletion rules and protect any spreadsheet/device used for the process.
- [ ] If analytics is added, document events and privacy obligations; do not send email, phone, message content or other personal information into analytics URLs/events.

## P2 — needed for real online checkout

- [ ] Choose whether to keep manual WhatsApp-assisted sales or build a true checkout. Make all CTAs and policy text match that model.
- [ ] For checkout, build a backend/database with unique order IDs, customer contact, line items, quantity, immutable price snapshots, delivery address/fee, payment status, timestamps, idempotency and audit logs.
- [ ] Integrate a payment provider suitable for the business and Nigerian settlement; verify transactions server-side using signed webhooks and reconcile them with provider records.
- [ ] Implement stock checks/reservations, delivery rules, confirmation/receipt, cancellations, refunds and admin order management.
- [ ] Add transactional notifications with consent and failure/retry handling.
- [ ] Secure admin access with role-based permissions, input validation, rate limiting, abuse protection, logging and monitoring.
- [ ] Test duplicate webhooks, failed/pending payments, abandoned checkout, refunds, stock races, retry behaviour and network failures before production payments.
- [ ] Define daily payment/order/delivery reconciliation and support ownership.

## Source review observations

- The repository is a static HTML/CSS/JavaScript site; no package manifest or automated test suite was evident in the source tree reviewed, so there was no established project test command to run from this inspection.
- Catalogue and product detail data are hard-coded separately, creating risk of price/content drift unless checked or centralized.
- WhatsApp is a handoff channel, not order persistence or payment processing.
- Product descriptions intentionally leave technical specifications unverified; preserve that honesty until facts are confirmed.
- Product media sets are numerous and may be large; file sizes and live performance still need measurement.
- Source review cannot verify production DNS/TLS/headers, actual analytics, email delivery, uptime, mobile browser behaviour, legal compliance or payment operations.

## Proposed implementation plan

### Phase 0 — Confirm business facts (operator-led)
1. Confirm legal/trading name, support contacts, production domain and official social profiles.
2. Verify prices for all six products and provide evidence for any comparison/was price.
3. Supply product specifications, contents, safe-use guidance, warranty and stock process.
4. Approve delivery, cancellation, returns, replacement and refund procedures.
5. Confirm payment process and manual order confirmation script.
6. Confirm hosting/logging/analytics configuration; have policies reviewed by Nigerian counsel.

**Gate:** do not launch false discount claims or accept payment until these facts are verified.

### Phase 1 — Source and UX fixes
1. Remove the “Ask about this” link from product cards and remove “per item” beside the landing-page price.
2. Add product review form with clear WhatsApp handoff and no automatic publication.
3. Enable crossed-out reference pricing only through a verified compare-at-price field.
4. Remove stale Reviews navigation or point it to a real, genuine review section.
5. Centralize product data or add automated parity checks to prevent price/content drift.
6. Add image fallbacks and test product, gallery, quantity, navigation and form flows.

### Phase 2 — Trust and policies
1. Finalize About, Privacy and Terms with confirmed operator details.
2. Publish delivery/returns/refunds and order confirmation FAQs.
3. Establish customer support and manual order records.
4. Define review collection, consent, moderation and removal process.

### Phase 3 — QA and performance
1. Add HTML validation, JavaScript syntax checks, broken-link/asset-path checks and regression tests.
2. Run accessibility and responsive checks on real browsers/devices.
3. Optimize images, videos and fonts.
4. Run Lighthouse and SEO checks; fix critical issues and save baseline results.

### Phase 4 — Live verification and soft launch
1. Verify domain, HTTPS, DNS, redirects, canonical metadata, sitemap and robots rules.
2. Test all live product links, images, enquiry/review handoffs and error states on desktop/mobile.
3. Verify support inbox, account MFA, monitoring and rollback.
4. Soft-launch the enquiry-only model with a small audience and log issues before spending on traffic.
5. Decide whether manual sales are sufficient or transactional checkout is required before scaling.

### Phase 5 — Transactional checkout, if needed
Design and implement persisted orders, server-side payment verification, stock/inventory, delivery calculation, notifications, refunds and admin operations; run end-to-end tests before enabling live checkout.
