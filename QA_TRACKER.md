# AIFA Website — QA Tracker
> Updated: 2026-07-28 | Track every feature, how to test it, and current status.

---

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
