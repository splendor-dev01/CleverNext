# CleverNext storefront

Responsive static storefront foundation for CleverNext's Nigerian home and lifestyle essentials.

## Run locally
Open `index.html` in a browser or serve the repository root with any static server. No build step is required.

## Included
- Dedicated product-detail page (`product.html?id=<product-id>`) with image gallery, quantity selector, product overview, care/use guidance, and WhatsApp order enquiry
- Responsive landing page and mobile navigation
- Six local product-demonstration videos in a muted, inline hero sequence with pause control and reduced-motion support
- Product catalogue using supplied product imagery, category filters, sorting and search
- Product enquiries, FAQs and brand story

## Required before taking orders
Current source configuration: all six product cards and detail pages are set to **₦50,000** each, and the WhatsApp enquiry number is configured in `app.js` and `product-page.js`. These values must be verified by the business operator before launch; the repository does not prove that prices or contact details are correct. The site has no live stock feed, delivery-fee calculator, payment processing, order database or fulfilment controls. WhatsApp messages are enquiries only, not confirmed orders or payment receipts. The product pages intentionally avoid fabricated discounts, stock claims and unverified technical specifications. Quantity is included in an enquiry but does not reserve stock or create an order.

Before launch, verify the current price and official WhatsApp number for every product/contact surface. Production checkout requires a secure backend, confirmed prices/inventory/delivery, server-side payment verification, persisted customer orders and admin order controls.


## Launch-readiness audit
See [LAUNCH_READINESS_AUDIT.md](LAUNCH_READINESS_AUDIT.md) for the pre-launch checklist and phased implementation plan. This source review does not claim hosting, legal compliance, performance, or live-browser tests have already passed.
