import React from "react";

const sections = [
  {
    title: "1. Grant of License",
    content: (
      <>
        <p>
          Upon successful purchase or enrollment, AIFA grants you a limited,
          personal, non-exclusive, non-transferable, and revocable license to
          access and use the digital content, Learning Management System (LMS),
          recordings, and services made available through your enrolled program.
        </p>
        <p className="mt-3">
          Where a program includes Lifetime Access or Lifetime Membership, such
          access is intended to provide learners with long-term access to
          eligible recordings, learning resources, and member benefits for as
          long as the AIFA platform and the applicable services continue to be
          offered and supported by AIFA.
        </p>
        <p className="mt-3">
          AIFA continually improves and evolves its platform, technology,
          curriculum, and services. Accordingly, we reserve the right, at our
          sole discretion, to modify, replace, suspend, discontinue, or
          terminate any course, recording, feature, membership benefit, digital
          resource, or the platform itself due to business, operational, legal,
          financial, technical, security, or other reasonable commercial
          considerations.
        </p>
        <p className="mt-3">
          This license is granted solely for your personal educational use and
          does not transfer any ownership rights in AIFA's intellectual
          property, software, content, branding, or services.
        </p>
      </>
    ),
  },
  {
    title: "2. Ownership",
    content: (
      <>
        <p>
          All rights, title, and interest in the platform and its content remain
          the exclusive property of AIFA or its licensors.
        </p>
        <p className="mt-3">This includes, but is not limited to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1 md:columns-2">
          <li>Course videos</li>
          <li>Live session recordings</li>
          <li>Learning materials</li>
          <li>PDFs</li>
          <li>Templates</li>
          <li>Presentations</li>
          <li>Graphics</li>
          <li>Logos</li>
          <li>Website content</li>
          <li>Software</li>
          <li>Source code</li>
          <li>Course curriculum</li>
          <li>Branding</li>
          <li>AI workflows</li>
          <li>Prompt libraries</li>
          <li>Digital resources</li>
        </ul>
        <p className="mt-3">
          Nothing in this Agreement transfers ownership of any intellectual
          property to you.
        </p>
      </>
    ),
  },
  {
    title: "3. Permitted Use",
    content: (
      <>
        <p>
          You may use the platform solely for your own personal educational
          purposes.
        </p>
        <p className="mt-3">You may:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Attend live classes.</li>
          <li>Access course recordings made available through your account.</li>
          <li>
            Download learning resources where downloading is specifically
            permitted.
          </li>
          <li>
            Participate in workshops, live sessions, and community activities.
          </li>
          <li>Use the platform in accordance with this Agreement.</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. License Restrictions",
    content: (
      <>
        <p>You may not:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>
            Copy, reproduce, distribute, publish, or commercially exploit any
            content available on the platform.
          </li>
          <li>
            Share, transfer, sell, or allow others to access your account.
          </li>
          <li>
            Upload AIFA content to YouTube, social media platforms, websites,
            cloud storage, or file-sharing services.
          </li>
          <li>
            Record live classes without prior written permission from AIFA.
          </li>
          <li>
            Download or extract videos using third-party software, browser
            extensions, or automated tools.
          </li>
          <li>Remove or alter copyright notices, trademarks, or branding.</li>
          <li>
            Modify, adapt, translate, or create derivative works from AIFA's
            content.
          </li>
          <li>
            Reverse engineer, decompile, disassemble, or attempt to gain
            unauthorized access to any software or systems used by AIFA.
          </li>
          <li>
            Use bots, scripts, crawlers, scraping tools, or automated systems to
            collect information from the platform.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Account Security",
    content: (
      <>
        <p>
          You are responsible for maintaining the confidentiality of your login
          credentials.
        </p>
        <p className="mt-3">
          You are responsible for all activities carried out through your
          account.
        </p>
        <p className="mt-3">
          If you suspect unauthorized access to your account, you must notify
          AIFA immediately.
        </p>
      </>
    ),
  },
  {
    title: "6. Availability of Content",
    content: (
      <>
        <p>
          Access to your purchased content is provided through the AIFA
          platform.
        </p>
        <p className="mt-3">
          Although AIFA intends to provide long-term access to eligible
          recordings and learning resources, we reserve the right to update,
          replace, reorganize, archive, or discontinue content, platform
          features, technologies, or services whenever reasonably necessary for
          operational, technical, legal, or commercial reasons.
        </p>
      </>
    ),
  },
  {
    title: "7. Updates and Improvements",
    content: (
      <>
        <p>
          AIFA may introduce updates, improvements, curriculum revisions, new
          technologies, security enhancements, bug fixes, and additional
          learning resources at any time.
        </p>
        <p className="mt-3">
          These updates shall automatically form part of this Agreement.
        </p>
      </>
    ),
  },
  {
    title: "8. Suspension or Termination",
    content: (
      <>
        <p>AIFA may suspend or terminate your license immediately if you:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Violate this Agreement.</li>
          <li>Share your account with another person.</li>
          <li>
            Copy or distribute copyrighted material without authorization.
          </li>
          <li>Attempt unauthorized access to the platform.</li>
          <li>
            Engage in fraudulent, abusive, disruptive, or unlawful activities.
          </li>
        </ul>
        <p className="mt-3">
          Upon termination, your right to access the platform and licensed
          content shall immediately cease.
        </p>
      </>
    ),
  },
  {
    title: "9. No Warranty",
    content: (
      <>
        <p>
          The platform and all educational content are provided on an "as
          available" and "as is" basis.
        </p>
        <p className="mt-3">
          While AIFA strives to provide accurate, current, and high-quality
          educational content, we do not guarantee that:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>The platform will always be available without interruption.</li>
          <li>Every feature or service will remain available indefinitely.</li>
          <li>
            The platform will always be free from errors or technical issues.
          </li>
          <li>
            Participation in our programs will guarantee employment,
            internships, freelance opportunities, business success, admissions,
            certifications from third parties, or any specific career outcome.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "10. Limitation of Liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by applicable law, AIFA shall not be
          liable for any indirect, incidental, consequential, special,
          exemplary, or punitive damages arising out of or relating to your use
          of, or inability to use, the platform or its services.
        </p>
        <p className="mt-3">
          In any event, AIFA's total liability shall not exceed the amount paid
          by you for the specific course or service giving rise to the claim.
        </p>
      </>
    ),
  },
  {
    title: "11. Governing Law",
    content: (
      <>
        <p>
          This Agreement shall be governed by and interpreted in accordance with
          the laws of India.
        </p>
        <p className="mt-3">
          Any dispute arising out of or relating to this Agreement shall be
          subject to the exclusive jurisdiction of the competent courts located
          in Hyderabad, Telangana.
        </p>
      </>
    ),
  },
  {
    title: "12. Changes to this Agreement",
    content: (
      <>
        <p>
          AIFA may revise or update this End-User License Agreement from time to
          time to reflect changes in our services, technology, legal
          obligations, or business operations.
        </p>
        <p className="mt-3">
          The latest version will always be published on our website together
          with the updated Effective Date.
        </p>
        <p className="mt-3">
          Your continued use of the platform after any such revisions
          constitutes your acceptance of the updated Agreement.
        </p>
      </>
    ),
  },
  {
    title: "13. Contact Us",
    content: (
      <>
        <p>
          If you have any questions regarding this End-User License Agreement,
          please contact us.
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

export default function EndUserLicenseAgreement() {
  return (
    <div className="min-h-screen bg-black text-gray-400">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-10 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-[#bfe70d]">
            End-User License Agreement (EULA)
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Effective Date: July 23, 2026
          </p>
        </header>

        <div className="mb-10 leading-relaxed">
          <p>
            This End-User License Agreement ("Agreement" or "EULA") is a legally
            binding agreement between you ("User", "Learner", "you", or "your")
            and AIFA – AI Filmmaking Academy ("AIFA", "we", "our", or "us").
          </p>
          <p className="mt-4">
            This Agreement governs your access to and use of AIFA's website,
            Learning Management System (LMS), digital learning platform, live
            classes, recorded sessions, downloadable resources, software
            features, and all digital content provided through our services.
          </p>
          <p className="mt-4">
            By creating an account, purchasing a course, attending a workshop,
            or accessing any part of our platform, you agree to comply with this
            Agreement.
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
