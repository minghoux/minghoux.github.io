# Figma Reference: Abound Loan Application Journey

## Master Reference
- Overview (one pager v5): [Figma Link](https://www.figma.com/design/FDUjLekeWU49NYbBhDmpr5/Abound-Design?node-id=4926-39028)

## 2026 Native Journey Structure

Based on the latest Figma extraction (one pager v5), the core Abound journey consists of the following 6 essential steps.

---

### Step 1: Welcome & Quote
- **Node ID**: `4926:39017`
- **Header:** Welcome to Abound
- **Body Greeting:** Hi {Adam}, Welcome to Abound! Finalise your loan application in under 2 minutes:
- **Badge:** Pre-approved
- **Detailed Stats:**
  - **£5,000** (loan amount)
  - **36** (months)
  - **25.8%** (Guaranteed APR Inc. fee)
  - **£193.51** (monthly payment)
- **Legal:** By continuing, you agree to our Terms & Conditions and Privacy Policy.
- **Button:** Continue

### Step 2: Verify Email
- **Node ID**: `4926:39018`
- **Header:** Your email address
- **Body Text:** We'll send important loan documents to this address. Please check that it's correct.
- **Display Value:** [email@example.com]
- **Link:** Wrong email? Click to update
- **Button:** Continue

### Step 3: Your Finance (Strategic Disclosure)
- **Node ID**: `4926:39019`
- **Header:** Your finance
- **Question 1:** Do you expect any upcoming changes that might affect your ability to make your monthly payments?
  - *Detail:* Consider potential life changes like unemployment, parental leave, illness, or other unforeseen challenges.
- **Question 2:** Are you currently in or applying for any form of debt solution?
  - *Detail:* This includes formal arrangements such as an Individual Voluntary Arrangement (IVA), bankruptcy, Trust Deed or Sequestration (Scotland), Debt Relief Order, or structured Debt Management Plan.
- **Actions:** [ Yes, I do ] [ No, I don't ]

### Step 4: Connect Bank (Bancos)
- **Node ID**: `4926:39020`
- **Header:** Connect your bank account
- **Body Text:** Please connect your main bank accounts where you receive income and pay bills. This gives us a snapshot of your finances, allowing us to make faster and fairer loan decisions tailored to your needs.
- **Trust Props:**
  - **Secure connection**: UK open banking standard encryption
  - **Complete in 2 minutes**: No paperwork required
  - **No impact on credit score**: Your score stays the same
- **Button:** Connect bank account

### Step 5: Submit Application (Final Consent)
- **Node ID**: `4926:39021`
- **Header:** Submit your application
- **Sub-header:** You're Almost Done! Review & Submit Your Loan Application
- **Loan Summary:** (Reiterates Step 1 values)
- **Primary Button:** Submit your application
- **Disclosure:** By clicking submit, you agree to us carrying out a “soft search” and a fraud check as part of your application. This won’t affect your credit score.

### Step 6: Success Outcome & Retention
- **Node ID**: `5700:15547`
- **Header:** Application summary
- **Title:** Thank you for your application {Adam}!
- **Next Steps Checklist:**
  - We’re reviewing your application. This usually takes up to 2 working days.
  - We’ve sent a summary of your application to [email]
  - You can check your latest application status anytime using the link from the email
  - You will receive email update about your application
  - You can safely close this page now
- **Secondary Action:**
  - **Title:** Want instant updates?
  - **Body:** Enter your mobile number below... you'll receive instant text updates whenever your application progresses.
  - **Button:** Get instant updates

---

## Technical Observations (Extraction)
- **Typography:** Uses `Poppins` as the base font (Saans fallback).
- **Branding Color:** `#007A32` (Header/CTAs).
- **Secondary Palette:** `#FABF0B` (Pre-approved badge), `#FBF6EE` (Beige/Warm Base).
- **Radius Standard:** 10px in Figma (Implementation standardized at 14px as per latest requirement).
