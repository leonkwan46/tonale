export const PRIVACY_POLICY_LAST_UPDATED = '31 March 2026'

export interface PrivacyPolicySection {
  title: string
  content: string
}

export const PRIVACY_POLICY_SECTIONS: PrivacyPolicySection[] = [
  {
    title: 'Background',
    content:
      '**Leon Kwan** ("we", "us", "our"), operating as **LK Studio**, runs the **Tonalè** app. We care about your privacy and only use your personal data as set out in this policy and in line with applicable law.\n\n' +
      'This Privacy Policy explains how we process your personal data when you use the **Tonalè** app. If you are under the age at which you can give consent in your country (often 13 or 16), a parent or guardian should read this and agree on your behalf.'
  },
  {
    title: '1. Who we are',
    content:
      'The **Tonalè** app is operated by **Leon Kwan**, trading as **LK Studio**, an unregistered business based in Ashford, Kent, United Kingdom.\n\n' +
      '**Contact for privacy and data requests:**\n\nEmail: ==lkstudio.app@gmail.com==\n\n' +
      'We are not a registered company and are not registered with the Information Commissioner\'s Office (ICO). We process personal data in accordance with UK data protection law, including the UK GDPR and the Data Protection Act 2018. We are not legally required to appoint a Data Protection Officer.'
  },
  {
    title: '2. What this policy covers',
    content:
      'This Privacy Policy applies to your use of the **Tonalè** mobile app (iOS and Android) and the **Tonalè website** (www.tonale-app.com), including the contact form on the website. The app and website may link to other websites or services (for example, "Buy me a coffee" or other donation links). We do not control how those third parties collect or use your data; please check their privacy policies before giving them any personal information.'
  },
  {
    title: '3. What is personal data?',
    content:
      '"Personal data" means any information that relates to you and can identify you (e.g. name, email, or data about how you use the app). It includes obvious things like your name and email, and less obvious things like identifiers and usage data.'
  },
  {
    title: '4. Your rights',
    content:
      'Under UK data protection law you have the following rights.\n\n' +
      '**Be informed** about how we collect and use your personal data (this policy).\n\n' +
      '**Access** the personal data we hold about you (see "How can you access your personal data?" below).\n\n' +
      '**Have your data corrected** if it is wrong or incomplete.\n\n' +
      '**Ask us to delete** your personal data ("right to be forgotten").\n\n' +
      '**Restrict** how we use your data in certain cases.\n\n' +
      '**Object** to us using your data for particular purposes.\n\n' +
      '**Withdraw consent** where we rely on your consent (e.g. for feedback).\n\n' +
      '**Data portability** in some cases (e.g. a copy of data you gave us, in a usable format).\n\n' +
      'We **DO NOT** use your personal data for automated decision-making or profiling that produces legal or similarly significant effects.\n\n' +
      'You also have the right to **lodge a complaint** with the UK supervisory authority, the Information Commissioner\'s Office (ICO), if you believe your personal data has been processed unlawfully. You can find the ICO at ico.org.uk.\n\n' +
      'To use any of these rights, contact us at ==lkstudio.app@gmail.com==.'
  },
  {
    title: '5. What personal data we collect and how',
    content:
      'We collect only the personal data necessary to provide and improve the **Tonalè** app.\n\n' +
      '**Account.** We collect email address, a securely hashed password (not stored in plain text), and display name when you create an account in the app.\n\n' +
      '**Profile.** We collect name, gender, and instrument (or custom instrument) during onboarding and in Account settings.\n\n' +
      '**Progress.** We collect lesson and stage progress, streak information, and last login date when you use the app (synced to our systems).\n\n' +
      '**Feedback.** We collect your message, email (*optional*), device type (e.g. iOS/Android), and app version when you submit feedback in the app (*with your consent*).\n\n' +
      '**Website contact form.** When you submit the contact form on our website, we collect your full name, email address, and message. This data is submitted via Google Forms and used solely to respond to your enquiry.\n\n' +
      '**Session.** Information needed to keep you logged in, stored on your device and managed by our authentication provider.\n\n' +
      '**Preferences.** Dark mode or light mode, stored on your device only.\n\n' +
      'Our systems may also generate **technical identifiers** such as a Firebase user ID or installation identifier to operate the app securely.\n\n' +
      'We **DO NOT** use cookies, advertising trackers, or third-party analytics in the app. We take reasonable steps to ensure personal data is accurate and up to date.'
  },
  {
    title: '6. Why we collect it and how we use it',
    content:
      '**Provide and run the app** (account, profile, progress, features). We use account, profile, and progress data. *Legal basis:* contract or legitimate interest. We keep it *until you delete your account*.\n\n' +
      'Our legitimate interests include operating and improving the **Tonalè** app, maintaining security, and ensuring the service functions properly.\n\n' +
      '**Respond to feedback and improve the app.** We use feedback message, email (if provided), platform, and app version. *Legal basis:* consent. We keep it for **3 months** after submission.\n\n' +
      '**Respond to website contact form enquiries.** We use your full name, email, and message. *Legal basis:* legitimate interest. We keep it for **3 months** after submission.\n\n' +
      '**Keep you logged in.** We use session and authentication data. *Legal basis:* legitimate interest. We keep it until you log out or as per our systems.\n\n' +
      '**Remember your preferences** (e.g. dark mode). We use preference data on your device. *Legal basis:* legitimate interest. We keep it until you change it or uninstall the app.'
  },
  {
    title: '7. How long we keep your personal data',
    content:
      '**Account and progress.** We keep your account and progress data until you delete your account (see below) or ask us to delete your data.\n\n' +
      '**Feedback.** We keep feedback submissions for **3 months**, then delete or anonymise them.\n\n' +
      'We may keep some data longer if the law requires it (e.g. for legal or tax reasons).'
  },
  {
    title: '8. Where we store and send your data',
    content:
      'Your data is processed using **Google Firebase** (authentication, database, and cloud functions). Firebase may process data in the United States or other regions where Google operates infrastructure. We may in future use Firebase (or similar) regions such as the UK, EU, or Singapore.\n\n' +
      'Google Firebase processes data under safeguards such as **Standard Contractual Clauses** approved by the European Commission or participation in the **EU-US Data Privacy Framework** where applicable. Where data is sent outside the UK, we rely on these or other safeguards required by law.\n\n' +
      'We use technical and organisational measures to protect your data from unauthorised access, loss, or misuse. These measures include encrypted connections (HTTPS), secure authentication systems, restricted access controls, and secure cloud infrastructure provided by Google Firebase.'
  },
  {
    title: '9. Do we share your personal data?',
    content:
      '**Firebase / Google.** Our provider (Google) processes your data to run the app. They do so under their own privacy terms and policies.\n\n' +
      '**Google Forms.** Website contact form submissions are processed via Google Forms, a service provided by Google. When you submit the contact form, your data is sent to and stored by Google Forms. Google processes this data under their own privacy terms and policies.\n\n' +
      '**Donations.** If you use "Buy me a coffee" or similar links, you go to a third-party site. We do not receive or store your payment details. Their privacy policy applies to that transaction.\n\n' +
      '**Future changes.** If we add other payment or donation options, we will describe them in an updated policy.\n\n' +
      '**Business transfer.** If we ever sell or transfer the app or business, your data may be transferred to the new owner, who would use it in line with this policy.\n\n' +
      'We **DO NOT** sell your personal data to third parties for marketing or advertising.'
  },
  {
    title: '10. Can you use the app without giving data?',
    content:
      'You can use some parts of the app without an account. To have an account, save progress, and use features that rely on it, you need to provide the data we ask for (e.g. email, name, profile details). **If you DO NOT provide the required account information,** you may not be able to create an account or use features that rely on stored progress. Feedback is *optional*. If you submit it, we use it as described in this policy.'
  },
  {
    title: '11. Children\'s privacy',
    content:
      'The app is designed to be used by people of various ages, including under-13s and under-16s where the app is available. We take children\'s privacy seriously.\n\n' +
      'Where required by law, children under the applicable age of digital consent (such as **13 in the United Kingdom**) must obtain permission from a parent or guardian before creating an account.\n\n' +
      'We only collect data that is needed to provide the app and improve it (e.g. account, progress, *optional* feedback). If you are under that age, a parent or guardian should read this policy and agree to it on your behalf. **We rely on a parent or guardian to provide consent** where applicable. Parents or guardians can contact us at ==lkstudio.app@gmail.com== to ask about, access, or delete their child\'s data. We **DO NOT** knowingly collect more personal data than *necessary* from children. If you are a parent and believe your child has given us personal data without your consent, please contact us and we will work with you to fix this.'
  },
  {
    title: '12. How you can access your personal data',
    content:
      'You can ask us what personal data we hold about you and for a copy of it (a **"subject access request"**). Contact us at ==lkstudio.app@gmail.com==. We will respond within the time required by law. There is normally no charge. We may charge a small fee only if the request is clearly unfounded or repetitive.'
  },
  {
    title: '13. Deleting your account and data',
    content:
      'You can **delete your account at any time** from **Settings → Account** in the app. This will *permanently* delete your profile and progress data from our systems and permanently delete your account (including email and authentication), subject to any legal obligations requiring us to retain certain information. After that, we will **NOT** use your data for the app. You can also email us at ==lkstudio.app@gmail.com== to ask us to delete your data or your child\'s data.'
  },
  {
    title: '14. Changes to this Privacy Policy',
    content:
      'We may update this policy from time to time (for example, if the law changes or we add new features). The **"Last updated"** date at the top will change when we do. We will make the new version available in the app and on our website. If we make important changes, we may notify you in the app or by email where appropriate. Continued use of the app after the change means you accept the updated policy.'
  },
  {
    title: '15. How to contact us',
    content:
      'For any question about this Privacy Policy, your personal data, or your rights (including access, correction, or deletion), please contact us.\n\n' +
      '**Email:** ==lkstudio.app@gmail.com==\n\n' +
      'We are based in Ashford, Kent, UK.'
  }
]
