# Privacy & Store Compliance Report

**Last researched:** March 2025  
**App:** Tonalè (Leon Kwan / LK Studio)  
**Jurisdictions:** EU (GDPR), UK (UK GDPR / DPA 2018), Singapore (PDPA 2012), Malaysia (PDPA 2010), Apple App Store, Google Play

This document summarises current requirements and how your app and privacy policy align. Use it to stay compliant and to fill in App Store Connect and Google Play Console accurately.

---

## 1. EU GDPR

### What the law requires (Article 13)

When you collect personal data directly from the user, you must provide:

- **Identity and contact details** of the data controller  
- **Contact details of the DPO** (if you have one)  
- **Purposes** of processing  
- **Legal basis** for each purpose (consent, contract, legitimate interest, etc.)  
- **Legitimate interests** (if relied on) – clearly described  
- **Recipients or categories of recipients** (e.g. Firebase/Google)  
- **International transfers** and safeguards (e.g. SCCs, EU–US DPF)  
- **Retention** periods or criteria  
- **Rights:** access, rectification, erasure, restriction, objection, portability, withdraw consent  
- **Right to lodge a complaint** with a supervisory authority  
- **Automated decision-making / profiling** (if any)  
- **Whether providing data is mandatory** and **consequences** if not provided  

Information must be given **at the time of collection**, in **clear and plain language**, and be **easily accessible**.

### Your policy vs GDPR

| Requirement | In your policy? |
|-------------|-----------------|
| Controller identity (Leon Kwan, LK Studio, Ashford, Kent, UK) | Yes (Section 1) |
| Contact (lkstudio.app@gmail.com) | Yes |
| No DPO stated | Yes (“We are not legally required to appoint a Data Protection Officer”) |
| Purposes and legal bases | Yes (Section 6, table + legitimate interest explanation) |
| Recipients (Firebase/Google) | Yes (Sections 8, 9) |
| International transfers + safeguards (SCCs, EU–US DPF) | Yes (Section 8) |
| Retention periods | Yes (Sections 6, 7) |
| All Article 13 rights + complaint to regulator (ICO) | Yes (Section 4) |
| No automated decision-making / profiling (with “legal or similarly significant effects”) | Yes |
| Mandatory vs optional data + consequences (Section 10) | Yes (“If you do not provide the required account information…”) |

**Verdict:** Your policy aligns with GDPR Article 13. Keep it updated if you change processing (e.g. add analytics or new regions).

---

## 2. UK (UK GDPR & Data Protection Act 2018)

UK rules mirror GDPR. The ICO expects privacy notices to include:

- Organisation name and contact details  
- Purposes, lawful basis, legitimate interests (if used)  
- Categories of data, recipients, retention  
- Rights (including complaint to the ICO)  
- Whether provision is statutory/contractual and consequences  

Your policy already includes these. The ICO’s guidance was updated in 2024 (e.g. sector-specific notice generator); a future **Data (Use and Access) Act** (from 19 June 2025) may affect guidance later – worth checking ico.org.uk when you do a policy refresh.

**Verdict:** Compliant with current UK GDPR / ICO expectations.

---

## 3. Singapore (PDPA 2012)

### Main obligations

- **Section 20 – Notification:** Tell users the **purposes** of collection, use and disclosure **on or before** collection.  
- Notifications should cover: purposes, types of data, recipients, how to withdraw consent and consequences, how to access/correct data, business/DPO contact.  
- **Consent** must be obtained for the purposes you have notified.  
- PDPC emphasises **security**, **consent management**, **purpose limitation** and (for AI) transparency and vendor management.  

### Your policy vs Singapore PDPA

- Purposes and data types are clearly stated (Sections 5, 6).  
- Recipients (Firebase) and retention are disclosed.  
- Withdrawal of consent (e.g. feedback), access and correction, and contact are covered.  
- You state mandatory vs optional data and consequences (Section 10), which supports purpose notification.  

**Verdict:** Your policy is consistent with Singapore PDPA Section 20 and purpose/consent expectations. When you have a Singapore user base, keep the policy easily accessible (e.g. in-app and, when available, on your website).

---

## 4. Malaysia (PDPA 2010)

### Section 7 – Notice and Choice

- You must have a **written privacy notice** that includes:  
  - **Types** of personal data processed  
  - **Purposes** of processing  
  - **Classes of third parties** to whom data is disclosed  
- Non-compliance can lead to **fines (up to RM300,000) or imprisonment (up to two years)**.  
- Notices should be **clear**, **reviewed and updated** periodically, and you must **comply with what you state**.  
- Guidance suggests notices be available in **Malay and English** where applicable; confirm with local advice if you target Malaysia.

### Your policy vs Malaysia PDPA

- Data types, purposes and third parties (Firebase/Google) are set out.  
- Retention and international transfer are mentioned.  
- Section 10 explains consequences of not providing data (aligned with notice/choice).  

**Gap (optional for now):** If you actively target Malaysian users, consider a **Malay version** of the privacy policy or a short notice in Malay that links to the full English policy. Not always legally required for a small app; a local lawyer can confirm.

**Verdict:** Content-wise your policy meets Malaysia PDPA Section 7. Add Malay if you target Malaysia; otherwise monitor guidance.

---

## 5. Apple App Store

### Requirements (current as of 2024–2025)

1. **Privacy policy URL** – Required; must be reachable in-app and in App Store Connect.  
2. **App Privacy (nutrition labels)** – Declare data collection in App Store Connect (data linked to user, not linked, used for tracking).  
3. **Account deletion** – If the app allows account creation, **account deletion must be available in-app** (Guideline 5.1.1(v)).  
4. **Privacy manifest (PrivacyInfo.xcprivacy)** – Required if you use “Required Reason APIs” (e.g. UserDefaults, file timestamps). You already have a manifest.  
5. **Third-party SDKs** – Disclose data collected by third-party code (e.g. Firebase).

### Your app vs Apple

- **Privacy policy:** In-app (Settings → Privacy Policy); add a **URL** in App Store Connect when you have a website.  
- **Account deletion:** Implemented in-app (Settings → Account → Delete).  
- **Nutrition labels:** Declare: Contact (email, name), Identifiers (Firebase UID), User Content (feedback), Usage (progress, streak, interactions). No tracking.  
- **Privacy manifest:** Your `NSPrivacyCollectedDataTypes` is currently an **empty array**. Apple’s guidance indicates that if the app collects data, the manifest can be used to describe that collection; the **App Privacy section in App Store Connect** is the main disclosure users see. If Apple requests it, you may need to add `NSPrivacyCollectedDataTypes` entries to match your nutrition labels (email, name, user ID, etc.). Keeping labels and manifest aligned is best practice.

**Verdict:** You meet policy and account-deletion rules. Complete nutrition labels in App Store Connect and add a policy URL when the site is live. Optionally align the privacy manifest with your declared data collection.

---

## 6. Google Play

### Requirements (current as of 2024–2025)

- **Data safety form** – All apps must complete it (data collected, shared, security, deletion).  
- **Privacy policy link** – Required (even if you state “no data collected”).  
- **Account deletion** – If users can create an account in the app, you must offer **in-app account (and data) deletion**. Google also allows an **accessible web link** for account/data deletion requests; if you don’t have a site, your **email (lkstudio.app@gmail.com)** can serve as the contact for deletion requests in the Data safety section.  
- **Accuracy** – Declarations must match the app and your privacy policy.  
- **Jurisdictions** – Comply with applicable law (e.g. EU) where you operate.

### Your app vs Google

- **In-app account deletion:** Yes (Settings → Account).  
- **Privacy policy:** In-app; add URL in Play Console when available.  
- **Data safety:** Declare: Personal info (email, name), App activity (progress, streak, interactions), User content (feedback), Device/other IDs (Firebase). Data shared with Firebase for app functionality/security. Encryption and data deletion: Yes.  
- **Web link for deletion:** When you have a website, add a simple “Request account deletion” page or form that explains users can email lkstudio.app@gmail.com; you can then use that URL in the Data safety “Data deletion” area.

**Verdict:** Compliant for in-app deletion and policy. Complete the Data safety form accurately; use email or a future web page for the “web link” deletion option.

---

## 7. Children (EU/UK and stores)

- **UK:** Digital consent age is **13**. Below 13, consent should be given or authorised by a parent/guardian (UK GDPR/ICO).  
- **EU:** Member States may set the age between 13 and 16; UK is 13.  
- Your policy already states that under the applicable age (e.g. 13 in the UK) users must have parent/guardian permission before creating an account, and that parents can contact you for access/deletion.  
- **Google Play:** If the app is used by children but **not primarily targeted at under-13s**, answer accordingly to avoid unnecessary “designed for children” obligations. Your wording supports “may be used by children but not specifically targeted at under 13.”

**Verdict:** Policy is aligned. Ensure store answers (especially Google’s children question) match this.

---

## 8. Checklist: What to do

### Already in place

- [x] Privacy policy in-app (Settings → Privacy Policy)  
- [x] Policy content aligned with GDPR Art. 13, UK, Singapore, Malaysia (content)  
- [x] ICO complaint right, legitimate interest explanation, controller ID, transfers (SCCs/DPF), DPO statement, security examples, no automated decisions, technical identifiers (Firebase UID/installation ID)  
- [x] Account deletion in-app (Settings → Account)  
- [x] No tracking; no ads; no third-party analytics in policy or app  

### When you have a website

- [ ] Publish the same privacy policy at a stable URL (e.g. `https://yoursite.com/privacy`)  
- [ ] Add this URL in **App Store Connect** (App Privacy / app information) and **Google Play Console** (Store settings / Data safety)  
- [ ] Optionally add a short “Request account deletion” page and use its URL in Google’s Data deletion section  

### App Store Connect (Apple)

- [ ] Add **Name** under Contact Info (with Email) in App Privacy  
- [ ] Complete all other data types (Identifiers, User Content, Usage, etc.) as in your policy  
- [ ] Answer “Do you track users?” → **No**  
- [ ] Optionally add `NSPrivacyCollectedDataTypes` in `PrivacyInfo.xcprivacy` to match nutrition labels (if Apple requests or you want full alignment)  

### Google Play Console

- [ ] Add **Name** under Personal info (with Email) in Data safety  
- [ ] Declare all other data (App activity, User content, Device/other IDs, sharing with Firebase, encryption, deletion)  
- [ ] In “Data deletion,” provide in-app description and either your email or future web link for deletion requests  
- [ ] Answer children question: app may be used by children but **not specifically targeted at under 13** (if that’s accurate)  

### If you target Malaysia

- [ ] Consider adding a Malay version of the privacy notice or a short Malay summary with link to full English policy (confirm with local counsel)  

### If you add Firebase Analytics (or other analytics) later

- [ ] Update the privacy policy (data collected, purposes, legal basis)  
- [ ] Update **both** Apple App Privacy and Google Data safety (e.g. analytics purpose, any new data types)  

---

## 9. Sources (for your own updates)

- **EU GDPR:** Article 13 (transparency), Article 8 (children).  
- **UK:** ICO – “How to write a privacy notice,” “What privacy information should we provide,” “Right to be informed” checklists (ico.org.uk).  
- **Singapore:** PDPC – PDPA obligations, Section 20, Advisory Guidelines; “Guide to Notification” (pdpc.gov.sg).  
- **Malaysia:** PDPA 2010 Section 7; JPDP “Guidance on the Preparation of Personal Data Protection Notices” (pdp.gov.my).  
- **Apple:** App Store App Privacy details, Privacy manifest files, “Describing data use in privacy manifests” (developer.apple.com).  
- **Google:** Play Console – Data safety section, User data policy, Account deletion requirements (support.google.com/googleplay/android-developer).  

---

*This report is for guidance only and does not constitute legal advice. Consider a one-off review by a lawyer in the UK, EU, Singapore, or Malaysia if you need formal sign-off.*
