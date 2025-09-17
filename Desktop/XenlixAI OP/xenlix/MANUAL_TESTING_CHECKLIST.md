# Manual Testing Checklist - XenlixAI Sandbox Flow

**Test Environment:** http://localhost:3003
**Expected Result:** Complete sandbox flow working without console errors

## Pre-Test Setup ✅
- [x] Server running on port 3003
- [x] Health endpoint accessible: http://localhost:3003/api/health
- [x] BILLING_MODE=sandbox confirmed
- [x] Browser developer tools open (F12) to monitor console

## Test Phase 1: User Registration Flow

### Step 1.1: Access Signup Page
- [ ] Navigate to: http://localhost:3003/signup
- [ ] **Expected:** Signup form displays with email, password, confirm password fields
- [ ] **Check:** No console errors
- [ ] **Screenshot location:** signup-page.png

### Step 1.2: Create Test Account
- [ ] Email: `acceptance-test@xenlix.com`
- [ ] Password: `TestPass123!`
- [ ] Confirm Password: `TestPass123!`
- [ ] Click "Create account"
- [ ] **Expected:** Redirect to signin page with success message
- [ ] **Check:** No console errors during form submission

### Step 1.3: Sign In
- [ ] Enter email: `acceptance-test@xenlix.com`
- [ ] Enter password: `TestPass123!`
- [ ] Click sign in button
- [ ] **Expected:** Redirect to dashboard
- [ ] **Check:** No console errors during authentication

## Test Phase 2: Dashboard Access

### Step 2.1: Verify Dashboard Load
- [ ] **Expected:** Dashboard loads successfully
- [ ] **Expected:** User authenticated and can see dashboard content
- [ ] **Check:** No console warnings or errors
- [ ] **Screenshot location:** dashboard-authenticated.png

### Step 2.2: Test Protected Route Access
- [ ] Try accessing: http://localhost:3003/dashboard (while signed in)
- [ ] **Expected:** Dashboard loads without redirect
- [ ] **Check:** Authentication working correctly

## Test Phase 3: Sandbox Checkout Flow

### Step 3.1: Access Plans Page
- [ ] Navigate to: http://localhost:3003/plans
- [ ] **Expected:** Plans page displays subscription options
- [ ] **Check:** Basic, Pro, Growth plans visible
- [ ] **Screenshot location:** plans-page.png

### Step 3.2: Select a Plan
- [ ] Click on any plan (recommend "Basic" for testing)
- [ ] **Expected:** Redirect to checkout page
- [ ] **Expected:** URL contains `?plan=basic` (or selected plan)
- [ ] **Check:** No console errors

### Step 3.3: Complete Sandbox Checkout
- [ ] Review plan details on checkout page
- [ ] Click checkout/purchase button
- [ ] **Expected:** Redirect to dashboard with sandbox parameters
- [ ] **Expected URL:** `/dashboard?session_id=SANDBOX&plan=basic`
- [ ] **Check:** No console errors during checkout process

### Step 3.4: Verify Sandbox Badge
- [ ] **Expected:** Green sandbox success banner displays at top of dashboard
- [ ] **Expected:** Badge shows "SANDBOX" label
- [ ] **Expected:** Success message about sandbox subscription
- [ ] **Screenshot location:** sandbox-success-banner.png

## Test Phase 4: Additional Workflows

### Step 4.1: Onboarding Flow
- [ ] Navigate to: http://localhost:3003/onboarding
- [ ] **Expected:** Onboarding form loads
- [ ] **Check:** No console errors
- [ ] Try completing onboarding steps
- [ ] **Expected:** Smooth progression through steps

### Step 4.2: Guidance System
- [ ] Navigate to: http://localhost:3003/guidance
- [ ] **Expected:** Guidance page loads
- [ ] **Check:** AI recommendations display
- [ ] **Check:** No console errors

### Step 4.3: Test Sign Out
- [ ] Click sign out button (if available)
- [ ] **Expected:** Redirect to signin page
- [ ] Try accessing dashboard: http://localhost:3003/dashboard
- [ ] **Expected:** Redirect to signin (authentication protection working)

## Test Phase 5: Error Scenarios

### Step 5.1: Invalid Login
- [ ] Try signing in with wrong password
- [ ] **Expected:** Error message displays
- [ ] **Check:** No console errors, proper error handling

### Step 5.2: Direct Access to Protected Routes
- [ ] Sign out completely
- [ ] Try accessing: http://localhost:3003/dashboard
- [ ] **Expected:** Redirect to signin page
- [ ] **Check:** Authentication protection working

## Console Monitoring

**During all tests, monitor browser console for:**
- [ ] No JavaScript errors
- [ ] No network request failures (4xx/5xx)
- [ ] No React warnings or development errors
- [ ] API calls completing successfully

## Final Validation Checklist

### Acceptance Criteria Verification
- [ ] ✅ Every step of the flow works in sandbox mode
- [ ] ✅ No console warnings across routes
- [ ] ✅ Dashboard shows Sandbox badge after plan selection
- [ ] ✅ Authentication protects private routes
- [ ] ✅ Signup → Signin → Dashboard flow complete
- [ ] ✅ Sandbox checkout completes without payment

### Screenshots Captured
- [ ] signup-page.png
- [ ] dashboard-authenticated.png
- [ ] plans-page.png
- [ ] sandbox-success-banner.png

## Test Results Summary

**Pass Criteria:** All checkboxes marked, no console errors, screenshots captured
**Fail Criteria:** Any critical functionality broken, console errors present

### Final Status: [ ] PASS / [ ] FAIL
**Notes:**
```
[Record any issues, warnings, or observations here]
```

**Tested by:** ________________
**Date:** ________________
**Environment:** Next.js 15.5.3, localhost:3003, sandbox mode

---
*XenlixAI Manual Testing Checklist v1.0*