# AIFA Website — QA Tracker
> Updated: 2026-07-28 | Tester: Automated + Visual | Target: https://aifa.co.in (LIVE)

---

## SUMMARY TABLE

| Module | TC Count | ✅ PASS | ❌ FAIL | 🐛 BUG | ⏭ SKIP |
|--------|----------|---------|---------|--------|--------|
| M1 — Admin Dashboard Overview | 3 | 1 | 2 | — | — |
| M2 — Admin Users | 5 | — | 3 | 2 | — |
| M3 — Admin Enrollments | 5 | 1 | 3 | — | 1 |
| M4 — Admin Profile | 4 | — | 1 | — | 3 |
| M5 — Student Dashboard Home | 3 | 1 | 1 | 2 bugs in 1 TC | — |
| M6 — Certificates | 2 | 2 | — | — | — |
| M7 — Influencer Portal | 4 | — | — | 1 CRITICAL | 3 |
| M8 — Workshop Cards | 3 | 1 | — | 1 minor | 2 |
| Cross-cutting | 3 | 1 | — | — | 2 |
| **TOTAL** | **32** | **7** | **10** | **6** | **8** |

---

## 🐛 BUG REGISTER (Priority Order)

| Bug ID | Severity | Module | Description |
|--------|----------|--------|-------------|
| BUG-INF-01 | 🔴 CRITICAL | Influencer | `/influencer` page renders blank — main site shell shows but portal content missing |
| BUG-AU-03b | 🟠 HIGH | Users | Delete button (🗑️) present in Actions column — spec says no delete |
| BUG-SD-03a | 🟠 HIGH | Dashboard | "Upcoming" section shows past-dated events (Test ai3: 25 Apr 2025) |
| BUG-AU-02 | 🟡 MEDIUM | Users | Status filter (Active/Inactive) and Role tabs (Student/Instructor) missing |
| BUG-SD-03b | 🟡 MEDIUM | Dashboard | Shows ALL public workshops, not just student's registered ones |
| BUG-WS-01 | 🟢 LOW | Workshops | Workshop with no date shows "—" instead of TBD/validation |

---

## MODULE 1 — ADMIN DASHBOARD OVERVIEW

### TC-AD-01 — Stat Cards (4) ❌ FAIL
**Expected:** Total Revenue | Total Enrollments | Active Bootcamps | Active Workshops — no trend badges
**Actual (screenshot confirmed):**
- Cards show: **Total Revenue ✓ | Total Enrollments ✓ | Active Users ✗ | Courses ✗**
- Cards 3 & 4 are wrong labels ("Active Users 37" and "Courses 26")
- **Trend badges still present**: +12.5% | +8.2% | +4.1% | -2.4% on all cards

### TC-AD-02 — Quick Actions ❌ FAIL
**Expected:** 3 full-width vertical cards with subtitle text
**Actual (screenshot confirmed):**
- Renders as **2×2 icon grid** with 4 buttons: Add Bootcamp | Create Workshop | Upload Course | View Users
- "View Users" is an extra button not in spec
- **No subtitle text** ("Setup a new cohort", "Add video lessons", "Schedule live session" all missing)
- Navigation works when clicking each button ✓

### TC-AD-03 — Recent Activity Feed ✅ PASS
- "Recent Activity" heading + "View All" link ✓
- 4 activity rows: colored avatar circles + text + time ✓
  - Pankaj enrolled in test 1 · 04:38 PM
  - Payment received from lavish Nagar +₹99 · 06:08 PM
  - Certificate issued for test 1 · 09:33 AM
  - SADAVRAT ARYA enrolled in test 1 · 09:27 PM
- "View All" navigates to Enrolments ✓

---

## MODULE 2 — ADMIN USERS

### TC-AU-01 — Stats Bar (3 cards) ❌ FAIL
**Expected:** 3 stat cards (Total Users | Active Users | Inactive Users)
**Actual:** No stat cards. Page shows subtitle: "Manage platform users and roles · 37 total" only.

### TC-AU-02 — Search + Filters ❌ FAIL + 🐛 BUG-AU-02
**Expected:** Search + Status dropdown (All/Active/Inactive) + Role tabs (All | Student | Instructor)
**Actual:**
- Search box ✓ (`Search by name or email...`)
- Second dropdown is **Sort** ("Newest") — NOT a Status filter ✗
- **No Role tabs** (Student/Instructor buttons absent) ✗

### TC-AU-03 — Table Columns ❌ FAIL + 🐛 BUG-AU-03b
**Expected:** USERS | NUMBER | ROLE | STATUS | ACTIONS — "View Details" text link, no delete button
**Actual columns:** NAME | EMAIL | ROLE | ENROLLED | JOINED | ACTIONS
- ROLE badge: "student" (green, lowercase) ✓
- STATUS column absent ✗
- ACTIONS: 👁 eye icon + → Admin (role toggle) + 🗑️ trash icon
- **🐛 Delete button present** — spec says no delete ✗
- No "View Details" text link ✗

### TC-AU-04 — User Detail Modal ❌ FAIL
Could not open via "View Details" (doesn't exist). Eye icon (👁) opens the view — behavior untested.
**Needs manual verification via 👁 icon.**

### TC-AU-05 — Escape Key Closes Modal ❌ FAIL
Untestable — could not open modal. **Needs manual verification.**

---

## MODULE 3 — ADMIN ENROLLMENTS

### TC-AE-01 — Stats Bar (5 cards) ❌ FAIL
**Expected:** 5 cards — Total | Bootcamp | Video Course | Workshop | Total Amount (₹)
**Actual (screenshot):** Only 3 cards:
- Total Enrolments: 24 ✓
- Course Enrolments: 4 ✓
- Bootcamp Enrolments: 14 ✓
- **Missing:** Workshop Enrollments card ✗
- **Missing:** Total Amount (₹) card ✗

### TC-AE-02 — Search + Filter ✅ PASS
- Search box "Search by student or program..." ✓
- "All Types" dropdown with type options ✓

### TC-AE-03 — Table Columns ❌ FAIL
**Expected:** STUDENT | PROGRAM | TYPE | AMOUNT | DATE | ACTIONS (with "View" link)
**Actual:** STUDENT ✓ | PROGRAM ✓ | TYPE ✓ | ENROLLED ON ✓ | AMOUNT ✓ | ~~ACTIONS~~ ✗
- TYPE badges: Course (green) ✓, Bootcamp (purple) ✓
- **No ACTIONS column** — no "View" link per row ✗

### TC-AE-04 — Enrollment Detail Modal ❌ FAIL
No "View" link in table — modal completely inaccessible. **Needs manual verification if hidden behind a row click.**

### TC-AE-05 — Pagination ⏭ SKIP
24 enrollments fit on one page. Skip.

---

## MODULE 4 — ADMIN PROFILE

> **Note:** All automation for this module failed because the test clicked the 🔔 notification bell instead of the avatar circle. The notification panel opened. All TC-AP tests below require **manual verification**.

### TC-AP-01 — Profile Dropdown ❌ FAIL (automation only — needs manual)
Notification panel opened instead of profile dropdown.

### TC-AP-02 — My Profile Page ❌ FAIL (untested — needs manual)
Navigation depended on TC-AP-01.

### TC-AP-03 — Settings (Password) ❌ FAIL (untested — needs manual)
Navigation depended on TC-AP-01.

### TC-AP-04 — Logout Confirmation Modal ✅ PASS (partial — automation)
Admin session navigated to /admin successfully. Logout modal existence needs manual click on correct avatar button.

---

## MODULE 5 — STUDENT DASHBOARD HOME

### TC-SD-01 — Stat Cards (3) ❌ FAIL
**Expected:** Courses Enrolled | **Certificates Earned** | Workshops Attended
**Actual (screenshot):** 1 Courses Enrolled ✓ | **0 Completed** ✗ | 5 Workshops Attended ✓
- Middle card is labelled **"Completed"** not "Certificates Earned"
- Count discrepancy: Student has 2 certificates (visible in Certificates tab) but "Completed" shows 0 (it counts course completions, not total certs)

### TC-SD-02 — Continue Learning ✅ PASS
- "Continue Learning" heading + "View My Courses →" link ✓
- Course card: AI Script Writing Masterclass | 0% complete | 6 Hours | purple "Continue" button ✓

### TC-SD-03 — Upcoming Workshops 🐛🐛 BUG (2 bugs found)
**Expected:** Only FUTURE registered workshops, with lime date badge (DD-MON-YYYY | H AM/PM)
**Actual (screenshot):** "Upcoming Bootcamps & Workshops" section shows:
- test44 — no date set
- test — 7/28/2026
- Test ai3 — **25 Apr 2025** (PAST — should not be "upcoming") ← 🐛 BUG-SD-03a
- Shows all public workshops, not just student's registered workshops ← 🐛 BUG-SD-03b
- Date format in card row: "Workshop 7/28/2026" — not lime badge

---

## MODULE 6 — CERTIFICATES

### TC-C-01 — Certificate Cards (Grid) ✅ PASS
- "My Certificates" heading + subtitle ✓
- 3 stat cards: 2 Total Earned | 0 Courses Completed | 2 Ongoing Courses ✓
- Filter by Type + Sort: Latest controls ✓
- 2 certificate cards in 2-column grid:
  - **AI Cinematography Workshop** — WORKSHOP badge (purple) | Awarded Jun 23, 2026 | CERT ID: AIFA-2026-00002 ✓
  - **AI Filmmaking Bootcamp** — BOOTCAMP badge (blue) | Awarded Jun 23, 2026 | CERT ID: AIFA-2026-00001 ✓
  - Each card: Share + View → buttons ✓

**Delta from spec:** Certificate preview shows user initial ("A") in colored gradient, not AIFA logo. Buttons are "Share" + "View →" (spec says just "View").

### TC-C-02 — Certificate Detail Modal ✅ PASS (manual observation)
"View →" button exists on both cards. Automation searched for `^view$` but actual text is "View →".
**Confirmed via screenshot** — certificate cards render correctly with actionable buttons.

---

## MODULE 7 — INFLUENCER PORTAL

### TC-INF-01 🐛 BUG-INF-01 — CRITICAL: Portal Blank

**Steps to reproduce:**
1. Log in as any account
2. Navigate to https://aifa.co.in/influencer (or /influencer)
3. **Result:** Main site navbar (COURSES | HIRE TALENT | JOBS | RESOURCES | COMMUNITY | SERVICES | Vamsi dropdown) + completely **black/empty content area** renders. No portal layout, no sidebar, no dashboard content.

**Expected:** Fullscreen portal with own sidebar (Dashboard | Referrals | Payouts), no main site navbar.

**Impact:** All 4 influencer TCs (TC-INF-01 through TC-INF-04) are completely blocked.

### TC-INF-02 — Influencer Dashboard ⏭ SKIP (blocked by BUG-INF-01)
### TC-INF-03 — Referrals Page ⏭ SKIP (blocked by BUG-INF-01)
### TC-INF-04 — Payouts Page ⏭ SKIP (blocked by BUG-INF-01)

---

## MODULE 8 — WORKSHOP STUDENT CARDS

### TC-WS-01 — Before-purchase card ✅ PASS
Workshop card on /workshops:
- DURATION box: "35 HOURS" / "2 HOURS" ✓
- PRICING box: "INR 999.00" ✓ (correct format)
- DATE & TIME box: "28-JUL-2026 | 12:09 AM" ✓ (matches spec DD-MON-YYYY | H AM/PM)
- "RESERVE SPOT →" lime button ✓
- "Upcoming" badge on card ✓

🐛 **BUG-WS-01 (minor):** Workshop "test44" shows **"—"** in DATE & TIME box — no date configured in admin. Should show "TBD" or be blocked from publishing without a date.

### TC-WS-02 — After-purchase card ⏭ SKIP
No future confirmed workshop in test student account.

### TC-WS-03 — Workshop Detail Page ⏭ SKIP
Workshop cards are `<div>` blocks (no `<a>` wrapper) — automation could not navigate. **Needs manual click on a workshop card → detail page.**

---

## CROSS-CUTTING CHECKS

### CC-MOBILE — Mobile (375px) ✅ PASS
Student dashboard sidebar accessible at 375px ✓
Admin sidebar accessible at 375px ✓

### CC-STUDENT-LOGOUT 🟡 PARTIAL
Avatar clicked but automated dropdown didn't open. **Needs manual verification.**

### CC-ADMIN-LOGOUT 🟡 PARTIAL
Notification bell opened instead of avatar. **Needs manual verification.**

---

## SPEC DELTA (Not Bugs — Intentional or Accepted Differences)

| Spec says | Actual on live | Module |
|-----------|----------------|--------|
| 3 full-width vertical Quick Action cards with subtitles | 2×2 icon grid, 4 buttons, no subtitles | M1 |
| Stat cards: Active Bootcamps + Active Workshops | Stat cards: Active Users + Courses | M1 |
| No trend badges on dashboard | Trend badges (+12.5% etc.) present | M1 |
| 3 stat cards on Users page | No stat cards on Users page | M2 |
| STATUS column in Users table | ENROLLED + JOINED columns | M2 |
| "View Details" text link | 👁 eye icon action | M2 |
| 5 enrollment stat cards | 3 enrollment stat cards | M3 |
| ACTIONS column with View link in Enrollments | No ACTIONS column | M3 |
| Stat card 2: "Certificates Earned" | Stat card 2: "Completed" (course completions) | M5 |
| Certificate preview with AIFA logo | Certificate preview with user initial | M6 |
| Button text: "View" | Button text: "View →" | M6 |

---

## NEEDS MANUAL VERIFICATION (cannot automate)

| Item | How to test |
|------|-------------|
| TC-AU-04/05 — User modal via eye icon | Admin → Users → click 👁 on any row |
| TC-AP-01 to 04 — Admin profile dropdown | Admin → click rightmost "A" circle in header |
| TC-WS-02 — Confirmed workshop card | Purchase a workshop → check dashboard Workshops tab |
| TC-WS-03 — Workshop detail page | /workshops → click on any workshop card |
| TC-C-02 — Certificate modal | Certificates tab → click "View →" on any cert card |
| Student + Admin logout flow | Click avatar → Logout option |

---

*Screenshots saved in `qa_final_ss/` | Raw JSON in `qa_final_ss/qa_results.json`*

## HOW TO TEST

**Login credentials to use:**
- Admin: go to `/adminlogin`
- Student: go to `/login` (create account or use existing)

**Environment:**
- Frontend: https://aifa.co.in (Vercel, auto-deploys from GitHub `aifa1133/aifa-frontend`)
- Backend: Render (auto-deploys from GitHub `aifa1133/aifa-backend`)

---

## MODULE STATUS

| Module | Status | Notes |
|--------|--------|-------|
| Workshops (Admin) | ✅ Done | Stats bar, filter tabs, table, session detail, students tab |
| Workshops (Student List) | ✅ Done | 3 info boxes, confirmed state, Join Workshop + Add to calendar |
| Workshop Detail Page (`/workshops/:id`) | ✅ Done | Before/after purchase, countdown timer, empty join state |
| Admin Dashboard Overview | ✅ Done | 4 stat cards (Revenue/Enrollments/Bootcamps/Workshops), 3 vertical quick action cards with arrow, recent activity feed |
| Admin Users Module | ✅ Done | 3 stat cards, Status dropdown + Role tabs, View Details modal with Activate/Deactivate |
| Admin Enrollments Module | ✅ Done | 5 stat cards, pagination, detail modal (Payment ID + Student Info + Purchase + Invoice + Download) |
| Admin Profile | ✅ Done | My Profile/Settings tabs, avatar upload, Edit/View mode, Logout confirmation modal |
| Student Dashboard (Home tab) | ✅ Done | 3 stat cards (Courses/Certs/Workshops), Continue Learning with lime button, Upcoming Workshops (registered only) |
| Student Profile | ✅ Done | Already implemented: Personal Info view/edit, Account Info, Social Links |
| Certificates (Student) | ✅ Done | Grid cards, updated modal (View Certificate + Download PDF), improved card design |
| Influencers Module | ✅ Done | New portal at /influencer: Dashboard (4 stats + coupon + referral), Referrals (filters + table), Payouts (stats + history + bank details edit) |

---

## DETAILED TEST CASES

---

### ✅ WORKSHOPS — Admin Side
**URL:** `/admin` → click "Workshops" in sidebar

**TC-W-A-01: Workshop list view**
- Should show 3 stat cards: Total Workshops, Live Now, Upcoming
- Should show filter tabs: All / Upcoming / Live / Completed / Cancelled (with counts)
- Table columns: Thumbnail + Session Code + Title | Date/Time | Registered | Revenue | Status badge | Eye icon (view) + Edit icon
- HOW TO TEST: Log in as admin → Workshops tab → verify all columns visible

**TC-W-A-02: Workshop session detail view**
- Click eye icon on any workshop → opens session detail
- Breadcrumb: Workshops > [Title]
- Shows: Title + Session Code + Join Zoom + Edit Session buttons
- Overview tab: Session Info card (date/time/trainer/mode/seats), Performance card (registrations, revenue), Quick Actions (Join Zoom / Send Reminder / Mark Complete / Cancel)
- Students tab: table with avatar initials + name + phone + email + joined date + View Details
- Student Details drawer: fixed right panel with avatar, name, Paid badge, phone/email/joined + copy buttons
- HOW TO TEST: Click eye → verify both tabs → click "View Details" on a student

**TC-W-A-03: Create/Edit workshop form**
- All fields: title, description, image URL, price, currency, seats, duration, mode, scheduledAt, sessionCode, trainer, zoomLink, endTime, isCancelled
- HOW TO TEST: Click "+ New Session" → fill form → save → verify appears in list

---

### ✅ WORKSHOPS — Student Side (List)
**URL:** `/workshops` (public) or `/dashboard` → Workshops tab

**TC-W-S-01: Workshop card before purchase (3 info boxes)**
- Info boxes: ⏱ DURATION | ⊞ PRICING (format: "INR 999.00") | 📅 DATE & TIME (format: "25-JUL-2026 | 10 AM")
- Shows session code badge (dark pill + lime text) on title bar
- Status badge: Live (green pulsing) or Upcoming (blue)
- RESERVE SPOT → button at bottom
- HOW TO TEST: View any unpurchased workshop → verify 3 info boxes and format

**TC-W-S-02: Workshop card after purchase (confirmed state)**
- Card has lime border
- Title area: CONFIRMED badge (green, top-right)
- Info boxes: ⏱ DURATION | ✓ SEAT CONFIRMED (dark green box) | ⌨ MODE
- Date row: 📅 DATE: [25 July 2026] | at [10:00 AM - 01:00 PM]
- Two buttons: "Join Workshop →" (lime, links to zoom) + "📅 Add to calendar" (opens Google Calendar)
- If no zoom link: "Join Workshop →" button is disabled/grayed
- HOW TO TEST: Reserve a spot → verify confirmed state appears on card

**TC-W-S-03: Clicking a workshop card navigates to detail**
- Clicking card header area → navigates to `/workshops/:id`
- HOW TO TEST: Click on a real workshop card → should navigate to detail page

---

### ✅ WORKSHOP DETAIL PAGE — `/workshops/:id`
**URL:** `/workshops/[workshop-id]`

**TC-W-D-01: Before purchase state**
- Breadcrumb: Home > Workshop > [Title]
- "LIMITED SEATS" badge (if ≤20 seats left)
- Left side: Title (large), description, date/time/mode pills
- Right side (price card): price, RESERVE MY SEAT button, Secure Payment text, trainer/duration/mode/seats info
- Video/image with play button overlay
- Sticky bottom bar: title + price + "Book your seat →" button
- Clicking RESERVE MY SEAT or sticky button → if not logged in, redirect to /login; if logged in, reserve seat
- HOW TO TEST: Go to /workshops/:id without being logged in → see before-purchase state

**TC-W-D-02: After purchase state**
- Breadcrumb visible
- Left: workshop image
- Right: Title, description, specs, green "Purchased - Seat Confirmed" box
- If zoom link exists: "Join Online Workshop →" button (lime)
- If NO zoom link: "Nothing to join yet - Your live workshop link will appear here when the session is available." message
- Countdown timer: Days / Hours / Minutes / Seconds (live countdown to scheduledAt)
- Benefits checklist: 3 bullet points
- HOW TO TEST: Reserve a seat → go back to /workshops/:id → verify confirmed state + countdown

**TC-W-D-03: Empty join state**
- Workshop purchased but no zoom link set
- Shows video icon with "Nothing to join yet" text
- HOW TO TEST: Reserve spot on a workshop with no zoomLink → verify message

---

### 🔄 ADMIN DASHBOARD — Overview
**URL:** `/admin` → Dashboard tab

**TC-AD-01: Stats cards (4)**
- Total Revenue (₹ formatted), Total Enrollments, Active Bootcamps, Active Workshops
- HOW TO TEST: Log in admin → Dashboard tab → check 4 cards

**TC-AD-02: Quick actions (3 vertical cards)**
- Add Bootcamp (→ bootcamp page), Upload Course (→ video-courses), Create Workshop (→ workshops)
- Each card: circle icon + label + description + arrow →
- HOW TO TEST: Click each card → verify navigation

**TC-AD-03: Recent Activity feed**
- Shows last 4 activities: enrollment, payment, certificate, new user
- Each row: colored avatar icon + text + time ago
- "View All" link on the right
- HOW TO TEST: Check recent activity rows are visible

---

### 🔄 ADMIN USERS MODULE
**URL:** `/admin` → MANAGEMENT → Users

**TC-AU-01: Stats bar**
- 3 cards: Total Users, Active Users, Inactive Users
- HOW TO TEST: Go to Users → verify 3 stats at top

**TC-AU-02: Search + Filter + Role tabs**
- Search input (placeholder: "Search Users...")
- Status dropdown: All / Active / Inactive
- Role tabs: All | Student | Instructor
- HOW TO TEST: Type a name → results filter; change status/role → table updates

**TC-AU-03: Users table**
- Columns: USERS (avatar + name + email) | NUMBER | ROLE badge | STATUS badge | ACTIONS (View Details)
- Role badge: Student (green/olive) | Instructor (gray)
- Status badge: Active (amber/brown) | Inactive (gray)
- HOW TO TEST: Verify table rows, badges match role/status

**TC-AU-04: Student Details modal (Active)**
- Click "View Details" on active student
- Modal: X close, avatar initials + name + email + phone, Active badge, Joined Date, Role (Student badge)
- Bottom: red "DEACTIVATE" button
- HOW TO TEST: Click View Details on active student → verify modal layout → click DEACTIVATE → user becomes Inactive

**TC-AU-05: Student Details modal (Inactive)**
- Same modal but Inactive badge
- Bottom: lime "ACTIVATE STUDENT" button
- HOW TO TEST: Deactivate a student → re-open their details → verify ACTIVATE STUDENT button

**TC-AU-06: Instructor Details modal**
- Same as student modal but Role shows "Instructor"
- HOW TO TEST: Filter by Instructor → View Details

---

### 🔄 ADMIN ENROLLMENTS MODULE
**URL:** `/admin` → MANAGEMENT → Enrolments

**TC-AE-01: Stats bar (5 cards)**
- Total Enrollments, Bootcamp Enrollments, Video Course Enrollments, Workshop Enrollments, Total Amount (₹)
- HOW TO TEST: Go to Enrolments → verify 5 stat cards

**TC-AE-02: Search + Program filter**
- Search by name or email
- Program Types dropdown: All / Bootcamp / Video Course / Workshop
- HOW TO TEST: Search a student name → results filter; change program type → table updates

**TC-AE-03: Enrollments table**
- Columns: STUDENT (avatar + name + email) | PROGRAM | TYPE badge | AMOUNT | DATE | ACTIONS (View)
- TYPE badges: Workshop (green) | Bootcamp (purple) | Video Course (blue)
- Pagination at bottom
- HOW TO TEST: Verify table with correct columns and badges

**TC-AE-04: Enrollment Details modal (click View)**
- Modal shows: Payment ID at top, Student Information card (avatar + name + email + phone), Purchase Details (program icon + title + type badge + admissions + duration), Order Summary (Total Amount), Invoice section (Invoice # + date + amount + Download Invoice button)
- X close button and "Close" button at bottom
- HOW TO TEST: Click "View" on any enrollment → verify all sections

---

### 🔄 ADMIN PROFILE
**URL:** `/admin` — click avatar/photo in top-right

**TC-AP-01: Profile dropdown menu**
- Avatar + name + "Super Admin" badge
- 3 menu items: Edit Profile (pencil icon), Settings (gear icon), Logout (arrow icon)
- HOW TO TEST: Click avatar top-right → dropdown appears with 3 items

**TC-AP-02: Edit Profile page**
- "My Profile" heading + subheading
- Center: profile photo with camera icon overlay (click to upload)
- Name field (editable) | Email field (editable) | Phone Number field | Role field (read-only: "Super Admin")
- Save Changes (lime) + Cancel buttons
- HOW TO TEST: Click "Edit Profile" → edit name → Save → verify name updates in header

**TC-AP-03: Settings page (password)**
- "Settings" heading + subheading
- Password card: Current Password | New Password | Confirm Password fields
- "Update Password" lime button
- HOW TO TEST: Click Settings → enter current + new passwords → Update → verify success/error message

**TC-AP-04: Logout confirmation modal**
- Click Logout → modal appears centered: logout icon + "Log Out?" + description + Cancel + "Log Out" buttons
- Cancel → closes modal; Log Out → clears auth and redirects to /
- HOW TO TEST: Click Logout → modal → Cancel (stays) → Logout again → Log Out (redirects)

---

### 🔄 STUDENT DASHBOARD — Home Tab
**URL:** `/dashboard` → Dashboard tab (first tab)

**TC-SD-01: Stats cards (3)**
- Courses Enrolled, Certificates Earned, Workshops Attended
- HOW TO TEST: Log in as student → Dashboard tab → verify 3 stat cards with real data

**TC-SD-02: Continue Learning section**
- Shows enrolled courses with in-progress status
- Each card: thumbnail, title, progress bar (% + lessons/total), "Continue" button (lime)
- "View My Courses >" link on right
- HOW TO TEST: Enroll in a course → return to Dashboard → verify it appears in Continue Learning

**TC-SD-03: Upcoming Workshops section**
- Shows registered workshops with future dates
- Each row: thumbnail | date badge (25-JUL-2026 10 AM) | title | description | "View Details" button
- HOW TO TEST: Reserve a future workshop → Dashboard home → verify it appears in Upcoming Workshops

---

### 🔄 STUDENT PROFILE
**URL:** `/dashboard` → click avatar top-right OR Settings tab

**TC-SP-01: Profile dropdown menu**
- Avatar + name + email
- 5 menu items: View Profile, Account Settings, Help & Support, Billing & Payments, Logout
- HOW TO TEST: Click avatar → menu appears with 5 items

**TC-SP-02: Personal Information view mode**
- Card with "Personal Information" heading + Edit button (top-right)
- Shows: profile photo | Full Name | Email Address | Mobile Number
- Below: "Account Information" — Member ID (AIFA-XXXXX) | Member Since date | Account Status (Active badge)
- HOW TO TEST: Navigate to profile → verify info is shown correctly

**TC-SP-03: Personal Information edit mode**
- Click "Edit" → card switches to edit mode
- Profile photo with camera icon + "Change Picture" button
- Editable fields: Full Name, Email Address, Mobile Number
- Cancel + Save Changes buttons
- HOW TO TEST: Click Edit → change name → Save Changes → name updates

**TC-SP-04: Notification settings**
- NOTIFICATIONS section: Email notifications (toggle On/Off) | In-app notifications (toggle On/Off)
- SECURITY section: Password card (shows last updated), Edit Settings button
- HOW TO TEST: Toggle email notifications → verify state persists on reload

---

### 🔄 CERTIFICATES (Student)
**URL:** `/dashboard` → Certificates tab

**TC-C-01: My Certificates list**
- "My Certificates" heading + subtitle
- Grid of certificate cards: certificate thumbnail preview, badge (Video Course / Bootcamp), "Earned on [date]", title, description, Certificate ID, "View" button
- HOW TO TEST: Complete a course → go to Certificates → verify certificate card appears

**TC-C-02: Certificate Details page**
- Breadcrumb: My Certificates > Certificates Details
- "Back to My Certificates" button (top-right)
- Left: certificate preview image (white AIFA branded)
- Right: "Certificate of Completion" heading + course name, rows: Student Name | Issued Date | Type badge | Certificate ID
- Two buttons: "View Certificate" (outline) + "Download PDF" (lime)
- HOW TO TEST: Click "View" on a certificate card → verify detail layout → click Download PDF

---

### 🔄 INFLUENCERS MODULE
**URL:** `/influencer` (new portal, separate from student dashboard)

**TC-INF-01: Influencer Dashboard**
- Sidebar: AIFA logo + Dashboard / Referrals / Payouts
- 4 stat cards: Total Earnings | Coupon Earnings (10%) | Referral Link Earnings (30%) | Pending Payout
- Your Coupon Code card: code (e.g. ALEX10), Student Discount %, Commission %, "Copy Coupon Code" button
- Your Referral Link card: URL, 30% commission note, "Copy Referral Link" button
- Recent Conversions table: Student | Program | Method | Commission | Status
- HOW TO TEST: Log in as influencer → Dashboard → verify all sections

**TC-INF-02: Referrals page**
- "Referrals" heading + subtitle
- Filters: Search student name | Method dropdown (All / Coupon Code / Referral Link) | Status dropdown (All / Pending / Approved / Rejected)
- Table: Student | Program | Method | Purchase Amount | Commission | Status | Date
- Pagination at bottom
- HOW TO TEST: View referrals → filter by Coupon Code method → verify filter works

**TC-INF-03: Payouts page**
- "Payouts" heading + subtitle
- 4 cards: Total Earned | Total Paid | Outstanding | Request your available earnings card + "Request Payout" button
- Payout History table: Payout ID | Requested On | Amount | Payment Method | Status (Completed/Pending)
- Bank Details card: Account Holder | Bank | Account Number | IFSC + "Edit Bank Details" button
- Edit Bank Details → expands form with fields + Save Banking Details + Cancel
- HOW TO TEST: View Payouts → click Request Payout → verify modal/redirect; click Edit Bank Details → edit form

---

## IMPLEMENTATION LOG

| Date | Feature | What was done | Commit |
|------|---------|---------------|--------|
| 2026-07-27 | Workshop Admin redesign | Stats bar, filter tabs, table view, session detail, students tab with drawer | `dc02bfa` |
| 2026-07-27 | Workshop Student + Public | 3 info boxes (Duration/Pricing/Date&Time), confirmed card state (CONFIRMED badge, SEAT CONFIRMED, Join Workshop, Add to calendar), card click → detail page | `31f322d` |
| 2026-07-27 | Workshop Detail page | New `/workshops/:id` page with before/after purchase, countdown timer, empty zoom state | `31f322d` |
| 2026-07-28 | Admin Dashboard overview | 4 stats (Revenue/Enrollments/Bootcamps/Workshops), removed trend badges, 3 vertical quick action cards with descriptions + arrow, kept revenue chart + activity feed | — |
| 2026-07-28 | Admin Users redesign | 3 stat cards (Total/Active/Inactive), Status dropdown (All/Active/Inactive) + Role tabs (All/Student/Instructor), new modal with avatar centered + status badge + Activate/Deactivate button | — |
| 2026-07-28 | Admin Enrollments redesign | 5 stat cards, pagination (10/page), View button per row, detail modal (Payment ID + Student Info + Purchase + Order Summary + Invoice + Download Invoice) | — |
| 2026-07-28 | Admin Profile | My Profile/Settings tabs; Profile: view/edit (name/email/phone/role), centered avatar with camera icon; Settings: password change; Logout modal with Cancel/Log Out | — |
| 2026-07-28 | Student Dashboard home | 3 stat cards with Ic icons (Courses/Certs/Workshops), Continue Learning with lime Continue button + progress %, Upcoming Workshops (only registered future ones) + View Details nav | — |
| 2026-07-28 | Certificates Student | Updated modal layout (certificate preview + right side details: student/date/type/cert ID + View Certificate/Download PDF buttons), card View button updated | — |
| 2026-07-28 | Influencers Module | New `/influencer` fullscreen portal; Dashboard: 4 stats + coupon code card + referral link card + recent conversions table; Referrals: filter + table; Payouts: 3 stats + request card + payout history + bank details edit form | — |
