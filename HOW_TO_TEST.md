# How to Test Each Feature - Step-by-Step Guide

## 🚀 Quick Start
1. Make sure server is running: `npm run dev`
2. Open browser: `http://localhost:3000`
3. Follow the steps below for each feature

---

## 1. TEST RESIDENTS MANAGEMENT

### How to Add a Resident:
1. Click **"Residents"** in navigation
2. Click **"Add New Resident"** button (green)
3. Fill the form:
   - **Name:** "John Doe" (required)
   - **Room Number:** "101"
   - **Phone:** "(555) 123-4567"
   - Fill other fields if you want
4. Click **"Save Resident"**
5. ✅ **Expected:** See John Doe card appear in the list

### How to Search Residents:
1. On residents page, type in the search box
2. Type "John" → Only John appears
3. Type "101" → Only room 101 appears
4. Clear search → All residents appear

### How to Edit a Resident:
1. Find a resident card
2. Click the **pencil icon** (edit button)
3. Change any information
4. Click **"Save Changes"**
5. ✅ **Expected:** See updated information on the card

### How to Delete a Resident:
1. Find a resident card
2. Click the **trash icon** (delete button)
3. Confirm deletion in popup
4. ✅ **Expected:** Resident disappears (also deletes their medications, vitals, appointments, symptoms)

---

## 2. TEST CAREGIVERS MANAGEMENT

### How to Add a Caregiver:
1. Click **"Caregivers"** in navigation
2. Click **"Add New Caregiver"** button (pink)
3. Fill the form:
   - **Name:** "Sarah Johnson" (required)
   - **Role:** Select "Registered Nurse" (required)
   - **Shift:** Select "Day"
   - Fill contact info
4. Click **"Save Caregiver"**
5. ✅ **Expected:** See caregiver card appear

### How to Search Caregivers:
1. Type in search box on caregivers page
2. Search by name, role, or ID
3. ✅ **Expected:** List filters as you type

### How to Edit/Delete Caregiver:
- Same as residents: Click edit icon to edit, trash icon to delete

---

## 3. TEST MEDICATIONS

**⚠️ IMPORTANT:** You need at least 1 resident first!

### How to Add Medication:
1. Click **"Medications"** in navigation
2. Click **"Add Medication"** button (purple)
3. Fill the form:
   - **Medication Name:** "Aspirin" (required)
   - **Dosage:** "100mg" (required)
   - **Frequency:** Select "Twice daily" (required)
   - **Resident:** Select a resident from dropdown (required)
   - **Add Times:** 
     - Click time picker, select "08:00"
     - Click the **+ button** to add it
     - Select "20:00", click **+ button** again
     - See both times appear as colored tags
   - **Start Date:** Select a date
   - **Notes:** "Take with food"
4. Click **"Save Medication"**
5. ✅ **Expected:** See medication card with all details

### How to Edit Medication:
1. Click **edit icon** on medication card
2. Change dosage, frequency, or times
3. To remove a time: Click **X** on the time tag
4. To add a time: Use time picker and click **+**
5. Click **"Save Changes"**

### How to Delete Medication:
- Click **trash icon** on medication card and confirm

---

## 4. TEST VITAL SIGNS

**⚠️ IMPORTANT:** You need at least 1 resident first!

### How to Record Vitals:
1. Click **"Vital Signs"** in navigation
2. Click **"Record Vitals"** button (blue)
3. Fill the form:
   - **Resident:** Select a resident (required)
   - **Date:** Select date (required)
   - **Time:** Select time (required)
   - Fill in any vitals you want:
     - **Blood Pressure:** Systolic "120", Diastolic "80"
     - **Heart Rate:** "72"
     - **Temperature:** "98.6"
     - **Weight:** "175"
     - **Glucose:** "95"
   - **Recorded By:** "Caregiver name"
4. Click **"Save Vital Signs"**
5. ✅ **Expected:** See vital sign card with all values in boxes

### How to Filter by Metric:
1. With multiple vital records, you'll see filter buttons
2. Click **"Blood Pressure"** button
3. Click **"Heart Rate"** button
4. Click **"Weight"** button
5. Click **"Glucose"** button
6. ✅ **Expected:** Chart placeholder appears (chart not implemented yet)

### How to Delete Vitals:
- Click **trash icon** on vital sign card and confirm

---

## 5. TEST APPOINTMENTS

**⚠️ IMPORTANT:** You need at least 1 resident first!

### How to Schedule Appointment:
1. Click **"Appointments"** in navigation
2. Click **"Schedule Appointment"** button (orange)
3. Fill the form:
   - **Resident:** Select a resident (required)
   - **Appointment Type:** "Annual Checkup" (required)
   - **Doctor Name:** "Dr. Smith" (required)
   - **Date:** Select a future date (required)
   - **Time:** "10:00" (required)
   - **Location:** "Main Clinic"
   - **Address:** "123 Medical St"
   - **Add Checklist Items:**
     - Type "Bring insurance card"
     - Press **Enter** or click **+ button**
     - Type "Fast 12 hours before", press Enter
     - See items appear as tags
   - **Notes:** "Follow-up visit"
4. Click **"Schedule Appointment"**
5. ✅ **Expected:** See appointment in "Upcoming Appointments" section

### How to Test Past vs Upcoming:
1. Add appointment with **today's date** → Shows in "Upcoming"
2. Add appointment with **past date** → Shows in "Past Appointments" (grayed out)

### How to Edit Appointment & Checklist:
1. Click **edit icon** on appointment
2. See checklist items with checkboxes
3. **Check a checkbox** → Item shows as completed (strikethrough)
4. **Uncheck** → Item shows as incomplete
5. **Remove item:** Click **X** on checklist item
6. **Add item:** Type new item and press Enter
7. Change appointment time or other details
8. Click **"Save Changes"**

### How to Delete Appointment:
- Click **trash icon** and confirm

---

## 6. TEST SYMPTOMS

**⚠️ IMPORTANT:** You need at least 1 resident first!

### How to Log Symptoms:
1. Click **"Symptoms"** in navigation
2. Click **"Log Symptoms"** button (yellow)
3. Fill the form:
   - **Resident:** Select a resident (required)
   - **Date:** Select date (required)
   - **Time:** Select time (required)
   - **Symptoms:** "Headache and dizziness" (required)
   - **Severity:** Select "Moderate" (required)
   - **Duration:** "2 hours"
   - **Possible Triggers:** "Started after lunch"
   - **Additional Notes:** "Patient requested to lie down"
   - **Recorded By:** "Caregiver name"
4. Click **"Save Symptom Log"**
5. ✅ **Expected:** See symptom card with severity badge

### How to Test Severity Levels:
1. Add symptom with **"Mild"** severity → Light gray badge
2. Add symptom with **"Moderate"** severity → Medium gray badge
3. Add symptom with **"Severe"** severity → Dark gray badge

### How to Filter by Date:
1. Add symptoms on different dates
2. Use the **date filter** dropdown
3. Select a specific date
4. ✅ **Expected:** Only symptoms from that date appear

### How to Edit/Delete Symptoms:
- Click **edit icon** to edit, **trash icon** to delete

---

## 7. TEST DASHBOARD & STATS

### How to See Real Stats:
1. Go to home page (`/`)
2. See 4 stat cards at top:
   - **Active Residents:** Shows count of residents
   - **Caregivers:** Shows count of caregivers
   - **Today's Appointments:** Shows appointments for today
   - **Active Medications:** Shows count of medications

### How to Verify Stats Update:
1. Note the numbers on dashboard
2. Add 2 residents
3. **Refresh page** (F5 or Cmd+R)
4. ✅ **Expected:** "Active Residents" shows "2"
5. Add 3 medications
6. **Refresh page**
7. ✅ **Expected:** "Active Medications" shows "3"

---

## 8. TEST FAVORITES SYSTEM

### How to Favorite Features:
1. Go to home page (`/`)
2. Find any feature card (e.g., "Resident Management")
3. Click the **star icon** in top-right corner of card
4. ✅ **Expected:** 
   - Star turns yellow/filled
   - "Favorites (1)" appears in navigation bar
   - "Your Favorite Features" section appears on home page

### How to See Favorites:
1. After favoriting 2-3 features
2. See **"Favorites (3)"** link in navigation
3. Click it → See only favorited features
4. Or scroll down on home page → See "Your Favorite Features" section

### How to Unfavorite:
1. Click the **star icon** again on a favorited card
2. ✅ **Expected:** Star becomes unfilled, favorites count decreases

### How to Test Persistence:
1. Favorite 3 features
2. **Close browser completely**
3. **Reopen browser** and go to `http://localhost:3000`
4. ✅ **Expected:** Favorites are still there

---

## 9. TEST SEARCH FUNCTIONALITY

### How to Search Residents:
1. Go to `/residents`
2. Type in the search box at top
3. Type "John" → Only residents with "John" in name appear
4. Type "101" → Only room 101 appears
5. Clear search → All residents appear

### How to Search Caregivers:
1. Go to `/caregivers`
2. Type in search box
3. Search by name, role, or ID
4. ✅ **Expected:** List filters in real-time as you type

---

## 10. TEST DATA RELATIONSHIPS

### How to Test Cascade Delete:
1. Add a resident: "Test Patient"
2. Add a medication for Test Patient
3. Record vitals for Test Patient
4. Schedule appointment for Test Patient
5. Log symptoms for Test Patient
6. Now go to residents page
7. **Delete "Test Patient"**
8. ✅ **Expected:** 
   - Go to medications → Test Patient's medication is gone
   - Go to vitals → Test Patient's vitals are gone
   - Go to appointments → Test Patient's appointment is gone
   - Go to symptoms → Test Patient's symptoms are gone

---

## 11. TEST MOBILE VIEW

### How to Test Responsive Design:
1. **Resize your browser window** to mobile size (about 375px wide)
2. ✅ **Expected:**
   - Navigation shows hamburger menu (☰)
   - Click hamburger → Menu opens
   - All pages are readable
   - Buttons are large enough to tap
   - Forms are usable

### How to Test Mobile Caregiver View:
1. Go to `/caregiver-mobile`
2. ✅ **Expected:**
   - See mobile-optimized layout
   - See today's tasks (mock data)
   - See quick stats at top
   - See bottom navigation bar
   - Click bottom nav items → Pages load

---

## 12. TEST DATA PERSISTENCE

### How to Test localStorage:
1. Add some data (2 residents, 1 medication)
2. **Refresh the page** (F5 or Cmd+R)
3. ✅ **Expected:** All data is still there
4. **Close browser completely**
5. **Reopen browser** and go to `http://localhost:3000`
6. ✅ **Expected:** All data is still there

---

## 🎯 Quick Test Flow (5 Minutes)

Want to quickly test everything? Follow this:

1. **Add Resident:**
   - Go to `/residents` → Add "John Doe", Room "101"

2. **Add Caregiver:**
   - Go to `/caregivers` → Add "Sarah Johnson", Role "Nurse"

3. **Add Medication:**
   - Go to `/medications` → Add "Aspirin", "100mg", for John Doe, times 08:00 & 20:00

4. **Record Vitals:**
   - Go to `/vitals` → Record BP 120/80, HR 72 for John Doe

5. **Schedule Appointment:**
   - Go to `/appointments` → Schedule "Checkup" with Dr. Smith for John Doe

6. **Log Symptoms:**
   - Go to `/symptoms` → Log "Headache, moderate" for John Doe

7. **Check Dashboard:**
   - Go to `/` → See all stats updated with real numbers

8. **Test Favorites:**
   - Click stars on 3 feature cards → See favorites appear

9. **Test Edit:**
   - Edit John Doe's room to "102" → See it update

10. **Test Delete:**
    - Delete John Doe → See related data also deleted

---

## ✅ Success Criteria

Each feature passes if:
- ✅ Form loads and submits without errors
- ✅ Data appears in list after saving
- ✅ Can edit the data
- ✅ Can delete the data
- ✅ Data persists after page refresh
- ✅ Search works (where applicable)
- ✅ Related data updates correctly

---

## 🐛 If Something Doesn't Work

1. **Check browser console** (F12 → Console tab) for errors
2. **Check localStorage:**
   - F12 → Application tab → Local Storage → `http://localhost:3000`
   - See if data is stored there
3. **Try refreshing the page**
4. **Check that server is running** (`npm run dev`)

---

**That's it! Follow these steps to test each feature systematically.** 🚀





