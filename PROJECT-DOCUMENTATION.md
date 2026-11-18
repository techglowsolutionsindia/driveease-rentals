# DriveEase Rentals — Project Documentation

**Developer:** TechGlow Solutions  
**Last Updated:** 18 November 2026  
**Project Type:** Portfolio demonstration — car rental website  
**Project Status:** Local development completed; audit and deployment preparation in progress  
**Project Closure:** Pending verified GitHub Pages deployment, live testing, final SEO configuration, documentation update, and Google Drive backup

---

## 1. Project Overview

- **Project name:** DriveEase Rentals
- **Tagline:** Your Journey, Our Drive.
- **Website type:** Landing page with a separate fleet page
- **Business category:** Car rental services (demonstration)
- **Target location:** Andheri West, Mumbai, Maharashtra, India
- **Local project folder:** `D:\web-projects\driveease-rentals\`
- **Technologies:** HTML5, CSS3, vanilla JavaScript
- **Frontend hosting:** GitHub Pages — not yet deployed
- **Backend technology:** Google Apps Script
- **Enquiry storage:** Google Sheets
- **Email integration:** Owner notification and customer acknowledgement via the backend
- **Primary objective:** Showcase sample rental vehicles and collect demonstration booking/enquiry requests
- **Completion date:** Pending

**Important:** Business identity, contact details, vehicle listings, prices, testimonials, and availability are demonstration information, not verified commercial offerings or real customer reviews.

## 2. GitHub and Hosting

- **GitHub account:** `techglowsolutionsindia` (project configuration)
- **Repository name:** `driveease-rentals` (planned; creation not yet verified)
- **Repository URL:** Pending verification
- **GitHub Pages URL:** Pending deployment and verification
- **Git branch / latest commit:** Pending Git inspection
- **Deployment status:** Not deployed as of this documentation update
- **Custom domain:** Not confirmed

Use the existing project folder as the Git working directory. Do not create a duplicate project folder. Record the actual repository URL, branch, commit, live URL, and deployment date after verification. Do not treat a predicted GitHub Pages URL as a confirmed public address.

## 3. Project Structure

```text
driveease-rentals/
├── index.html
├── fleet.html
├── sitemap.html
├── sitemap.xml
├── robots.txt
├── .gitignore
├── README.md
├── PROJECT-DOCUMENTATION.md
├── assets/
│   ├── css/
│   │   ├── variables.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── header.css
│   │   ├── footer.css
│   │   ├── landing-page.css
│   │   ├── responsive.css
│   │   └── fleet-page.css
│   ├── js/
│   │   ├── main.js
│   │   ├── landing-page.js
│   │   ├── fleet-page.js
│   │   └── components/       # Present in project explorer; inspect contents if needed
│   └── images/
│       ├── logo/
│       │   ├── favicon.svg
│       │   └── business-logo.svg
│       └── ...               # Section and fleet image folders
```

The structure above reflects files and directories seen in the supplied HTML and project screenshots; it is not an exhaustive filesystem inventory. Other referenced image directories include fleet vehicle images and section artwork. Verify all referenced assets before deployment. The planned social sharing image `assets/images/social/driveease-rentals-og.jpg` has **not** been verified as present.

### Page scripts and styles

- `index.html`: global CSS; `assets/js/main.js`; `assets/js/landing-page.js`.
- `fleet.html`: global CSS plus `assets/css/fleet-page.css`; `assets/js/main.js`; `assets/js/fleet-page.js`.
- `sitemap.html`: standalone HTML sitemap with embedded styling and relative links.

## 4. Pages and Homepage Sections

**Pages:**

- `index.html` — main landing page
- `fleet.html` — sample vehicle gallery, filters, search controls, and vehicle detail modal
- `sitemap.html` — human-readable sitemap

**Homepage section order and anchor IDs:**

1. Hero — `#hero`
2. About Us — `#about`
3. Our Fleet — `#fleet`
4. Rental Services — `#services`
5. Why Choose Us — `#why-choose-us`
6. How It Works — `#how-it-works`
7. Pricing & Packages — `#pricing`
8. Customer Testimonials — `#testimonials`
9. Contact / CTA — `#contact`

**Navigation:** About Us, Our Fleet, Services, Why Choose Us, How It Works, Pricing, Testimonials; primary CTA **Book a Car**. No Home navigation item. The fleet page links back to homepage anchors and has an `Our Fleet` current-page indication.

## 5. Branding and Demonstration Contact Details

- **Business name:** DriveEase Rentals
- **Tagline:** Your Journey, Our Drive.
- **Location:** Andheri West, Mumbai, Maharashtra, India
- **Demonstration address:** 1203, Andheri West, Mumbai – 400053, Maharashtra, India
- **Demonstration phone:** +91 90000 12345
- **Demonstration email:** `contact@driveeaserentals.example`
- **Demonstration hours (project configuration):** Monday–Sunday, 8:00 AM–10:00 PM
- **Favicon:** `assets/images/logo/favicon.svg`
- **Business logo:** `assets/images/logo/business-logo.svg`

Both SVG files intentionally display matching symbols. The user approved keeping them as they are. Do not replace either with a wordmark unless requested. Exact CSS color tokens and font-family declarations should be read from the stylesheets; do not assume colors or fonts from the previous project.

## 6. SEO Configuration

**Implemented/reviewed locally:**

- Distinct page titles and meta descriptions on `index.html` and `fleet.html`
- Relevant geographic wording for Andheri West, Mumbai
- Open Graph title/description and Twitter Card title/description
- SVG favicon references
- Semantic headings, image alt attributes, and internal links reviewed
- Schema.org JSON-LD added to both pages by user confirmation: homepage `WebPage`, fleet page `CollectionPage`, with demonstration `Service`/`Organization` information
- Both pages currently use `noindex, nofollow` during development

**Pending:**

- Confirm deployed canonical URLs and add `<link rel="canonical">` on both pages
- Add verified absolute `og:url` values
- Confirm existence of social sharing image, publish it, then add absolute `og:image` and `twitter:image` values
- Decide whether to change `noindex, nofollow` when ready for public indexing; do not remove it automatically merely because the site is deployed
- Validate JSON-LD, canonical links, page metadata, and social previews on the live site
- Verify public indexing only if indexing is intentionally enabled

Do not add fake URLs, unsupported review ratings, actual business verification claims, or unverified inventory/availability in structured data.

## 7. HTML Sitemap

- **File:** `sitemap.html`
- **Status:** Updated for DriveEase Rentals; browser layout shown in user screenshot
- **Contents:** Homepage, nine homepage section links, and the Fleet page
- **Branding:** DriveEase Rentals, matching SVG assets, demonstration notice
- **Links:** Relative local links; full click-through verification of every link remains a final audit task

## 8. XML Sitemap

- **File:** `sitemap.xml`
- **Current content:** Valid empty `<urlset>` with standard sitemap namespace
- **Status:** Reviewed; awaiting verified public URL and indexability decision

After deployment, add the actual canonical URLs for indexable pages (`index.html` and `fleet.html` if both are intentionally indexable), test the published XML, and only then submit it to search engines. Do not submit an empty sitemap or placeholder URLs. The HTML sitemap and XML sitemap have different purposes.

## 9. Robots Configuration

- **File:** `robots.txt`
- **Current content:**

```text
User-agent: *
Allow: /
```

- **Status:** Reviewed; no old project references
- **Pending:** Add `Sitemap:` with the actual public XML sitemap URL after deployment

`Allow: /` permits crawling but does not override `noindex` in HTML. Avoid blocking crawlers from fetching a page whose `noindex` directive they must read.

## 10. Google Organic Sitelinks Readiness

**Prepared:** Descriptive navigation, semantic section headings, meaningful internal links, separate fleet page, and HTML sitemap.

**Pending:** Verified live URLs, crawl/indexing decisions, canonical tags, completed XML sitemap, live navigation checks, and search visibility monitoring if indexing is enabled.

Google chooses organic sitelinks automatically; no specific sitelink display is guaranteed.

## 11. Google Analytics 4 Readiness

- **GA4 property:** Not confirmed
- **Measurement ID:** Not confirmed
- **Tracking installation:** Not verified; treat as pending
- **Activation:** Pending user decision and actual GA4 configuration

**Potential future events:** Page views, Book a Car CTA clicks, Fleet page visits, vehicle detail interactions, and backend-confirmed enquiry submissions. Do not record a successful submission solely because a network request was dispatched.

**Activation steps:** Create/confirm property and web stream; obtain the real measurement ID; install official code; configure necessary events; verify in Realtime/DebugView; review privacy and consent obligations; update documentation. Never insert a dummy measurement ID.

## 12. Application Architecture and Data Flow

**Frontend:** Static HTML/CSS/JavaScript, locally tested through VS Code Live Server.

**Backend:** Google Apps Script web application integrated with the homepage enquiry form.

**Storage:** Google Sheets, spreadsheet name **DriveEase Rentals**, worksheet **Data** (project configuration).

**Email:** Backend sends owner notification and customer acknowledgement. A user-confirmed end-to-end test showed a saved enquiry and receipt of both emails, with statuses reported as **Sent / Sent / Completed**.

**High-level flow:** Visitor enters enquiry → frontend validates → request reaches Apps Script → backend records it in Google Sheets → backend processes notification emails → frontend reports a confirmed result. Exact request ID generation, transport mechanics, retry logic, endpoint, and backend safeguards must be verified against the current DriveEase Rentals source files; do not copy SafeGuard Security implementation details as facts.

## 13. Google Apps Script Backend and API

- **Technology:** Google Apps Script
- **Backend source file:** `Code.gs` (expected Apps Script project file; not uploaded for this audit)
- **Deployment URL:** Not recorded or independently verified in this documentation
- **Deployment version:** Not verified
- **Authentication/permissions:** Not verified
- **Frontend endpoint configuration:** Inspect the current `assets/js/landing-page.js` before recording an exact endpoint

**Configuration names to verify in the actual backend:** `SHEET_NAME`, `WEBSITE_NAME`, `OWNER_EMAIL`, and any rate-limit or validation settings. These are documentation targets, not claims that every constant is implemented. Do not reuse the old SafeGuard Security Apps Script endpoint.

**Security checks pending:** Verify server-side input validation, access permissions, abuse controls, secret handling, error handling, and logging without publishing customer data.

## 14. Google Sheets and Email Integration

- **Spreadsheet name:** DriveEase Rentals (project configuration)
- **Worksheet:** `Data`
- **Data storage account:** Configured in the project; avoid publishing private account identifiers in public documentation
- **Test result:** User confirmed a successful form submission, a corresponding Google Sheets record, owner email received, and customer acknowledgement received
- **Reported statuses:** Owner `Sent`, Customer `Sent`, Submission `Completed`

The exact sheet column headings, test timestamp, record IDs, Apps Script execution logs, and deployment version were not independently supplied here. Verify before documenting them as exact. Email delivery should be monitored after deployment; one successful test does not guarantee future delivery.

## 15. Contact Form Integration and Validation

**Relevant frontend files:** `index.html`, `assets/js/landing-page.js`.

**Purpose:** Collect demonstration booking/enquiry requests. Contact integration has passed a user-confirmed end-to-end test.

**Phone validation:** Implemented in the current project according to prior audit progress, but boundary cases and malformed-input scenarios are not independently verified. Test empty fields, invalid phone numbers, invalid email, repeated submissions, timeout behavior, backend failures, and form reset/success messaging.

**Demonstration contact values:** See Section 5. Do not mistake the `.example` email address or sample phone number for verified real-world contact channels.

## 16. Local Development and Testing

**Environment:** Windows, Visual Studio Code, Live Server, browser developer tools.

**Verified/reported so far:**

- Homepage and fleet page developed
- Mobile responsiveness reviewed for both pages (user-confirmed)
- HTML sitemap rendered correctly in local browser screenshot
- Homepage contact form submitted successfully, sheet record created, and both emails received (user-confirmed)
- Favicon and business logo inspected; user approved matching symbol design
- Sitemap, robots, and `.gitignore` reviewed

**Still to check before closure:**

- All desktop/tablet breakpoints and short viewport heights
- Every navigation and anchor link; sticky header offsets without visible gaps
- Fleet filtering, date search, modal opening/closing, keyboard access, and booking CTA
- All asset paths and image loading
- Browser console and network errors
- Negative phone/email validation and duplicate submission cases
- Full live deployment tests, including form submission and email notifications

No Node.js server is required for the current static frontend.

## 17. Git Configuration and `.gitignore`

**File:** `.gitignore` — reviewed and retained unchanged.

Existing exclusions include `.env`, `.env.*` (except `.env.example`), private keys, common credential files, `node_modules/`, debug logs, and OS metadata.

**Pending Git verification:** `git status`, repository initialization, branch, remote, staged/tracked files, secret scan, commit, and push. `.gitignore` does not remove secrets already committed to Git history.

## 18. GitHub Pages Deployment Plan

1. Finish local audits and required fixes.
2. Inspect Git configuration and review tracked files for secrets.
3. Create or confirm the intended GitHub repository.
4. Commit and push the approved project.
5. Configure GitHub Pages to serve the correct branch/root.
6. Record and open the verified live website URL.
7. Test homepage, Fleet page, sitemap, images, scripts, links, and forms.
8. Confirm backend requests and email notifications on the live site.
9. Add canonical URLs, absolute Open Graph URLs, and verified sharing image URLs.
10. Make an explicit indexing decision and update robots meta tags if appropriate.
11. Populate `sitemap.xml` only with verified indexable canonical URLs.
12. Add the absolute XML sitemap URL to `robots.txt`.
13. Verify GA4 readiness and organic sitelinks prerequisites.
14. Update this documentation with deployment evidence.
15. Back up the approved project to Google Drive and verify the backup.

## 19. Environment Variables, Credentials, and Secrets

- **Static frontend:** No verified frontend environment variables.
- **Backend:** Google Apps Script configuration; exact constants and storage locations must be checked in the current backend.
- **Possible configuration names to document after verification:** `SHEET_NAME`, `WEBSITE_NAME`, `OWNER_EMAIL`, and any actual validation or rate-limit constant names.
- **Security:** Never publish passwords, API keys, private tokens, service-account files, private sheet records, or real customer enquiries.
- **Version control:** Keep sensitive files excluded and inspect Git history before public deployment.

No secrets or backend endpoint from the previous project are carried into this document.

## 20. Maintenance

**Frontend:** Review page links, images, responsiveness, accessibility, metadata, console errors, and Fleet interactions after changes.

**Backend:** Monitor Apps Script failures, Google Sheets recording, notification email delivery, permissions, and abuse controls.

**SEO:** Maintain canonical URLs, sitemap entries, robots configuration, and any analytics settings after changing hosting or domain.

**Documentation:** Update statuses only after tests or configuration are actually confirmed.

## 21. Google Drive Backup

- **Status:** Pending
- **Destination folder:** Not confirmed
- **Backup date:** Pending

Back up HTML, CSS, JavaScript, project images/SVGs, README, HTML/XML sitemaps, robots file, `.gitignore`, and project documentation. Exclude private credentials, secret environment files, and customer data. Confirm that the uploaded backup can be accessed and record its final folder and date.

## 22. Pending Tasks

- [ ] Complete remaining local functional and responsive checks
- [ ] Verify every homepage and Fleet page interaction
- [ ] Verify all project assets and links
- [ ] Complete negative contact-form validation tests
- [ ] Verify current Apps Script endpoint/configuration and sheet schema from source
- [ ] Inspect Git initialization, branch, remote, tracked files, and secrets
- [ ] Deploy to GitHub Pages and verify the live site
- [ ] Test the live enquiry flow and email notifications
- [ ] Add verified canonical and social sharing URLs
- [ ] Confirm/create the sharing image before referencing it
- [ ] Decide whether to allow indexing; update `noindex, nofollow` if appropriate
- [ ] Populate and validate `sitemap.xml` with verified indexable URLs
- [ ] Add verified `Sitemap:` URL to `robots.txt`
- [ ] Verify organic sitelinks prerequisites and GA4 readiness
- [ ] Record repository, branch, commit, live URL, and deployment date
- [ ] Complete and verify Google Drive backup
- [ ] Finalize this documentation and project closure checklist

## 23. Final Project Closure Checklist

- [x] Homepage and Fleet page developed
- [x] Local homepage and Fleet SEO reviewed; JSON-LD insertion user-confirmed
- [x] SVG favicon and business logo reviewed; matching design approved
- [x] HTML sitemap updated and browser rendering shown
- [x] Empty XML sitemap reviewed; awaiting live URL
- [x] `robots.txt` reviewed; awaiting verified sitemap URL
- [x] `.gitignore` reviewed
- [x] Contact form storage and email integration user-tested successfully
- [x] Mobile responsiveness reviewed for both pages (user-confirmed)
- [ ] All local functional and validation tests completed
- [ ] Backend source and configuration independently checked
- [ ] Git configuration verified
- [ ] GitHub Pages deployment completed and verified
- [ ] Live contact form and email integration verified
- [ ] Final canonical, social image, indexing, XML sitemap, and robots configuration completed
- [ ] GA4 readiness and organic sitelinks readiness finalized
- [ ] Google Drive backup completed and verified
- [ ] Documentation finalized with verified deployment details
- [ ] Project formally closed

---

**Documentation Last Updated:** 18 November 2026  
**Final Project Status:** Audit in progress. Do not declare the project complete until deployment, final verification, documentation, and Google Drive backup are confirmed.
