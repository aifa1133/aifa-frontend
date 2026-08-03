import React from "react";

const sections = [
  {
    title: "1. Eligibility",
    content: (
      <p>
        You must be legally capable of entering into a binding agreement under
        applicable law to use our services. If you are below the age required to
        enter into such an agreement, you may use our services only with the
        consent and supervision of a parent or legal guardian.
      </p>
    ),
  },
  {
    title: "2. Account Registration",
    content: (
      <>
        <p>
          To access certain services, you may be required to create an account.
        </p>
        <p className="mt-3">You agree to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Provide accurate and complete information.</li>
          <li>Keep your login credentials confidential.</li>
          <li>Be responsible for all activities under your account.</li>
          <li>
            Notify AIFA immediately of any unauthorized use of your account.
          </li>
        </ul>
        <p className="mt-3">
          AIFA reserves the right to suspend or terminate accounts that contain
          false information or violate these Terms.
        </p>
      </>
    ),
  },
  {
    title: "3. Courses and Workshops",
    content: (
      <>
        <p>
          AIFA offers live online workshops, bootcamps, and educational
          programs.
        </p>
        <p className="mt-3">
          Upon successful enrollment, you will receive access to the live
          sessions of your enrolled program. After each live session is
          completed, the recording will be made available through the Learning
          Management System (LMS) for your personal learning and future
          reference, unless otherwise specified.
        </p>
        <p className="mt-3">
          AIFA reserves the right to update course content, instructors,
          schedules, learning materials, and platform features at any time to
          continuously improve the learning experience.
        </p>
      </>
    ),
  },
  {
    title: "4. Payments",
    content: (
      <ul className="list-disc pl-6 space-y-1">
        <li>
          All fees displayed on our website are in Indian Rupees (INR) unless
          otherwise specified.
        </li>
        <li>
          Payments are processed through secure third party payment providers.
        </li>
        <li>
          Your enrollment is confirmed only after successful payment
          confirmation.
        </li>
        <li>
          Applicable taxes may be charged in accordance with prevailing laws.
        </li>
      </ul>
    ),
  },
  {
    title: "5. Refund Policy",
    content: (
      <>
        <p>All payments made to AIFA are final.</p>
        <p className="mt-3">
          Course fees, workshop fees, bootcamp fees, memberships, digital
          products, downloadable resources, and any other purchases made through
          AIFA are strictly non refundable and non transferable, regardless of
          attendance, completion status, personal circumstances, scheduling
          conflicts, or any other reason, except where required by applicable
          law.
        </p>
        <p className="mt-3">
          Before making a purchase, learners are encouraged to carefully review
          all course details, schedules, and eligibility requirements.
        </p>
      </>
    ),
  },
  {
    title: "6. Student Responsibilities",
    content: (
      <>
        <p>As a learner, you agree to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Use the platform respectfully and responsibly.</li>
          <li>
            Maintain appropriate behavior during live sessions and community
            interactions.
          </li>
          <li>
            Not engage in harassment, abusive behavior, discrimination, or
            unlawful activities.
          </li>
          <li>
            Follow the instructions provided by instructors and mentors during
            the program.
          </li>
          <li>
            Respect the rights of instructors, mentors, guest speakers, and
            fellow learners.
          </li>
        </ul>
        <p className="mt-3">
          AIFA reserves the right to suspend or terminate access for violations
          of these responsibilities.
        </p>
      </>
    ),
  },
  {
    title: "7. Intellectual Property",
    content: (
      <>
        <p>All content available through AIFA, including but not limited to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1 md:columns-2">
          <li>Course videos</li>
          <li>Recorded sessions</li>
          <li>Learning materials</li>
          <li>Documents</li>
          <li>Templates</li>
          <li>Graphics</li>
          <li>Logos</li>
          <li>Website design</li>
          <li>Software</li>
          <li>Branding</li>
          <li>Course curriculum</li>
        </ul>
        <p className="mt-3">
          is the intellectual property of AIFA or its respective licensors and
          is protected under applicable intellectual property laws.
        </p>
      </>
    ),
  },
  {
    title: "8. Restrictions on Use",
    content: (
      <>
        <p>You may not:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Copy, reproduce, distribute, or sell any course content.</li>
          <li>
            Record, download, or redistribute live classes or recordings without
            prior written permission.
          </li>
          <li>Share your account or login credentials with others.</li>
          <li>
            Upload malicious software or interfere with the operation of the
            platform.
          </li>
          <li>
            Reverse engineer or attempt to gain unauthorized access to any part
            of the platform.
          </li>
          <li>Use AIFA's services for any unlawful or unauthorized purpose.</li>
        </ul>
        <p className="mt-3">
          Unauthorized use may result in immediate termination of access and
          legal action where appropriate.
        </p>
      </>
    ),
  },
  {
    title: "9. Certificates",
    content: (
      <>
        <p>
          Certificates are issued only to learners who successfully satisfy the
          applicable completion requirements established by AIFA.
        </p>
        <p className="mt-3">
          Issuance of a certificate does not guarantee employment, internships,
          freelance opportunities, admissions, or professional licensing.
        </p>
      </>
    ),
  },
  {
    title: "10. Availability of Services",
    content: (
      <p>
        While we strive to maintain uninterrupted access to our platform, AIFA
        does not guarantee continuous availability. Services may occasionally be
        interrupted due to maintenance, upgrades, technical issues, internet
        connectivity issues, or circumstances beyond our reasonable control.
      </p>
    ),
  },
  {
    title: "11. Third Party Services",
    content: (
      <p>
        Our platform may integrate or link to third party services, including
        payment gateways, communication platforms, video conferencing platforms,
        analytics tools, and learning technologies. AIFA is not responsible for
        the availability, content, security, or practices of such third party
        services.
      </p>
    ),
  },
  {
    title: "12. Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, AIFA shall not be
          liable for any indirect, incidental, consequential, special, or
          punitive damages arising from the use or inability to use our
          services.
        </p>
        <p className="mt-3">
          Our total liability, if any, shall not exceed the amount paid by you
          for the specific course or service giving rise to the claim.
        </p>
      </>
    ),
  },
  {
    title: "13. Indemnification",
    content: (
      <p>
        You agree to indemnify and hold harmless AIFA, its directors, employees,
        instructors, affiliates, and partners from any claims, liabilities,
        losses, damages, costs, or expenses arising out of your misuse of the
        platform or violation of these Terms & Conditions.
      </p>
    ),
  },
  {
    title: "14. Modification of Services",
    content: (
      <>
        <p>
          AIFA reserves the right to modify, update, discontinue, replace, or
          improve any course, workshop, feature, instructor, pricing, schedule,
          curriculum, learning material, or service at its sole discretion.
        </p>
        <p className="mt-3">
          Such modifications are intended to improve the learning experience and
          shall not affect rights already granted under applicable law.
        </p>
      </>
    ),
  },
  {
    title: "15. Changes to these Terms",
    content: (
      <>
        <p>We may revise these Terms & Conditions from time to time.</p>
        <p className="mt-3">
          The updated version will be published on our website with the revised
          Effective Date.
        </p>
        <p className="mt-3">
          Your continued use of AIFA after such updates constitutes your
          acceptance of the revised Terms.
        </p>
      </>
    ),
  },
  {
    title: "16. Governing Law",
    content: (
      <>
        <p>
          These Terms & Conditions shall be governed by and construed in
          accordance with the laws of India.
        </p>
        <p className="mt-3">
          Any disputes arising from these Terms shall be subject to the
          exclusive jurisdiction of the competent courts in Hyderabad,
          Telangana.
        </p>
      </>
    ),
  },
  {
    title: "17. Contact Us",
    content: (
      <>
        <p>
          If you have any questions regarding these Terms & Conditions, please
          contact us.
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

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-black text-gray-400">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-10 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-[#bfe70d]">
            Terms & Conditions
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Effective Date: July 23, 2026
          </p>
        </header>

        <div className="mb-10 leading-relaxed">
          <p>
            Welcome to AIFA – AI Filmmaking Academy ("AIFA", "we", "our", or
            "us"). These Terms & Conditions govern your access to and use of our
            website, courses, workshops, Learning Management System (LMS),
            digital resources, memberships, and all related services.
          </p>
          <p className="mt-4">
            By accessing our website, purchasing any course or workshop, or
            using our services, you agree to be bound by these Terms &
            Conditions. If you do not agree with any part of these terms, please
            refrain from using our services.
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
