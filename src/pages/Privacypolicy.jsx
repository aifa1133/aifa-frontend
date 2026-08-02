import React from "react";

const sections = [
  {
    title: "1. Information We Collect",
    content: (
      <>
        <p>We may collect the following information when you interact with AIFA.</p>

        <p className="mt-4 font-medium text-gray-800">Personal Information</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Mobile Number</li>
        </ul>

        <p className="mt-4 font-medium text-gray-800">Payment Information</p>
        <p className="mt-2">
          Payments are securely processed through trusted third-party payment
          gateways. AIFA does not store your debit card, credit card, UPI
          PIN, CVV, or banking credentials.
        </p>

        <p className="mt-4 font-medium text-gray-800">Account Information</p>
        <p className="mt-2">When you create an account, we may collect and maintain:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Username</li>
          <li>Password (stored securely in encrypted form)</li>
          <li>Course Progress</li>
          <li>Certificates Earned</li>
          <li>Assignments Submitted</li>
          <li>Workshop Participation</li>
        </ul>

        <p className="mt-4 font-medium text-gray-800">Technical Information</p>
        <p className="mt-2">We may automatically collect certain technical information, including:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1 md:columns-2">
          <li>IP Address</li>
          <li>Browser Type</li>
          <li>Device Information</li>
          <li>Operating System</li>
          <li>Time Zone</li>
          <li>Pages Visited</li>
          <li>Session Duration</li>
          <li>Referral Source</li>
          <li>Cookies and Analytics Data</li>
        </ul>
      </>
    ),
  },
  {
    title: "2. How We Use Your Information",
    content: (
      <>
        <p>Your information helps us provide and improve our services.</p>
        <p className="mt-3">We may use your information to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1 md:columns-2">
          <li>Create and manage your account.</li>
          <li>Deliver courses and workshops.</li>
          <li>Provide access to our Learning Management System (LMS).</li>
          <li>Issue certificates.</li>
          <li>Process payments.</li>
          <li>Respond to support requests.</li>
          <li>Send important updates regarding your enrollment or account.</li>
          <li>Share learning resources.</li>
          <li>Improve our courses, website, and services.</li>
          <li>Personalize your learning experience.</li>
          <li>Prevent fraud, misuse, and unauthorized access.</li>
          <li>Comply with applicable legal obligations.</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Marketing Communications",
    content: (
      <>
        <p>With your consent, we may send you:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Course announcements</li>
          <li>Workshop invitations</li>
          <li>Learning resources</li>
          <li>Product and platform updates</li>
          <li>Promotional offers</li>
          <li>Newsletters</li>
        </ul>
        <p className="mt-3">
          You may unsubscribe from promotional communications at any time.
          However, we may continue to send transactional emails or messages
          related to your purchases, account, or enrolled courses.
        </p>
      </>
    ),
  },
  {
    title: "4. Cookies and Analytics",
    content: (
      <>
        <p>Our website uses cookies and similar technologies to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Keep you signed in</li>
          <li>Remember your preferences</li>
          <li>Improve website performance</li>
          <li>Analyze visitor behavior</li>
          <li>Measure advertising and marketing performance</li>
        </ul>
        <p className="mt-3">
          You may disable cookies through your browser settings. However,
          some features of the website may not function properly if cookies
          are disabled.
        </p>
      </>
    ),
  },
  {
    title: "5. Information Sharing",
    content: (
      <>
        <p>We do not sell, rent, or trade your personal information.</p>
        <p className="mt-3">
          We may share your information only with trusted third-party service
          providers that help us operate our services, including:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Payment gateway providers</li>
          <li>Cloud hosting providers</li>
          <li>Email service providers</li>
          <li>Learning Management System providers</li>
          <li>Video conferencing platforms</li>
          <li>Analytics providers</li>
        </ul>
        <p className="mt-3">
          These service providers may access your information only to perform
          services on our behalf and are required to protect your information
          appropriately.
        </p>
      </>
    ),
  },
  {
    title: "6. Data Security",
    content: (
      <>
        <p>
          We implement reasonable administrative, technical, and
          organizational safeguards to protect your information against
          unauthorized access, misuse, alteration, disclosure, or
          destruction.
        </p>
        <p className="mt-3">
          While we strive to use commercially reasonable security measures,
          no method of internet transmission or electronic storage can be
          guaranteed to be completely secure.
        </p>
      </>
    ),
  },
  {
    title: "7. Data Retention",
    content: (
      <>
        <p>We retain your information only for as long as necessary to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Maintain your student account</li>
          <li>Provide access to purchased courses</li>
          <li>Issue certificates</li>
          <li>Comply with applicable legal obligations</li>
          <li>Resolve disputes</li>
          <li>Enforce our agreements</li>
        </ul>
        <p className="mt-3">
          When your information is no longer required, it will be securely
          deleted or anonymized where reasonably practicable.
        </p>
      </>
    ),
  },
  {
    title: "8. Your Rights",
    content: (
      <>
        <p>Subject to applicable laws, you may have the right to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Access the personal information associated with your account.</li>
          <li>Request correction of inaccurate or incomplete information.</li>
          <li>Request deletion of your information where legally permissible.</li>
          <li>Withdraw consent for certain data processing activities.</li>
          <li>Opt out of promotional communications.</li>
        </ul>
        <p className="mt-3">
          Some requests may be subject to legal, contractual, or operational
          limitations.
        </p>
      </>
    ),
  },
  {
    title: "9. Third Party Services",
    content: (
      <>
        <p>
          Our website or platform may contain links to third-party websites
          or services.
        </p>
        <p className="mt-3">
          AIFA is not responsible for the privacy practices, policies, or
          content of such third-party platforms. We encourage you to review
          their respective privacy policies before using their services.
        </p>
      </>
    ),
  },
  {
    title: "10. Children's Privacy",
    content: (
      <>
        <p>
          AIFA's services are intended for individuals who can legally enter
          into agreements or who use the platform with appropriate parental
          or guardian consent where required by law.
        </p>
        <p className="mt-3">
          If we become aware that personal information has been collected
          from a child without the necessary authorization, we will take
          reasonable steps to remove such information.
        </p>
      </>
    ),
  },
  {
    title: "11. International Users",
    content: (
      <>
        <p>
          If you access AIFA from outside India, you understand that your
          information may be processed and stored in India or in other
          countries where our service providers operate.
        </p>
        <p className="mt-3">
          By using our services, you consent to such processing where
          permitted by applicable law.
        </p>
      </>
    ),
  },
  {
    title: "12. Changes to this Privacy Policy",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect
          changes in our services, legal requirements, or operational
          practices.
        </p>
        <p className="mt-3">
          The latest version will always be available on our website. The
          updated Effective Date at the top of this page will indicate when
          the policy was last revised.
        </p>
        <p className="mt-3">
          Your continued use of our services after any updates constitutes
          your acceptance of the revised Privacy Policy.
        </p>
      </>
    ),
  },
  {
    title: "13. Contact Us",
    content: (
      <>
        <p>
          If you have any questions regarding this Privacy Policy or how your
          personal information is handled, please contact us.
        </p>
        <p className="mt-3 font-medium text-gray-800">
          AIFA – AI Filmmaking Academy
        </p>
        <p className="mt-1">
          Email:{" "}
          <a
            href="mailto:info@aifa.co.in"
            className="text-blue-600 hover:underline"
          >
            info@aifa.co.in
          </a>
        </p>
        <p>
          Website:{" "}
          <a
            href="https://www.aifa.co.in"
            className="text-blue-600 hover:underline"
          >
            www.aifa.co.in
          </a>
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-gray-400">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-10 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-[#bfe70d]">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-500">
            Effective Date: July 23, 2026
          </p>
        </header>

        <div className="mb-10 leading-relaxed">
          <p>
            Welcome to AIFA – AI Filmmaking Academy ("AIFA", "we", "our", or
            "us"). We respect your privacy and are committed to protecting
            your personal information. This Privacy Policy explains how we
            collect, use, store, and protect your information when you visit
            our website, enroll in our courses, attend our workshops, or use
            any of our services.
          </p>
          <p className="mt-4">
            By accessing or using AIFA's website, applications, or services,
            you agree to the practices described in this Privacy Policy.
          </p>
        </div>

        <div className="space-y-9">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-white mb-2">
                {section.title}
              </h2>
              <div className="leading-relaxed">{section.content}</div>
            </section>
          ))}
        </div>

        <footer className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500">
          © 2026 AIFA – AI Filmmaking Academy. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}