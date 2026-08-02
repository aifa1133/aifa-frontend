import React from "react";

const sections = [
  {
    title: "1. Copyright Ownership",
    content: (
      <>
        <p>
          The following materials are the exclusive intellectual property of
          AIFA or its licensors, including but not limited to:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1 md:columns-2">
          <li>Course videos</li>
          <li>Live session recordings</li>
          <li>Learning materials</li>
          <li>Course curriculum</li>
          <li>Presentations</li>
          <li>Documents</li>
          <li>Templates</li>
          <li>AI workflows</li>
          <li>Prompt libraries</li>
          <li>Digital downloads</li>
          <li>Graphics</li>
          <li>Illustrations</li>
          <li>Icons</li>
          <li>Logos</li>
          <li>Website design</li>
          <li>User interface (UI) and user experience (UX) designs</li>
          <li>Software and platform features</li>
          <li>Branding elements</li>
          <li>Marketing materials</li>
          <li>Text, images, audio, animations, and other multimedia content</li>
        </ul>
        <p className="mt-3">
          All rights are reserved unless expressly stated otherwise.
        </p>
      </>
    ),
  },
  {
    title: "2. Permitted Use",
    content: (
      <>
        <p>
          You may access and use AIFA's content solely for your personal, non
          commercial educational purposes as permitted under your enrollment and
          the applicable End User License Agreement.
        </p>
        <p className="mt-3">
          Nothing on the platform grants you ownership of any content or
          intellectual property.
        </p>
      </>
    ),
  },
  {
    title: "3. Restrictions",
    content: (
      <>
        <p>Without prior written permission from AIFA, you may not:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Copy, reproduce, or duplicate any content.</li>
          <li>
            Record, download, or redistribute live classes or recordings except
            where expressly permitted.
          </li>
          <li>
            Publish AIFA content on websites, blogs, YouTube, social media
            platforms, messaging groups, cloud storage, or file sharing
            services.
          </li>
          <li>
            Sell, license, rent, or commercially exploit any part of AIFA's
            content.
          </li>
          <li>
            Modify, adapt, translate, or create derivative works from AIFA's
            materials.
          </li>
          <li>
            Remove or alter copyright notices, trademarks, logos, or branding.
          </li>
          <li>
            Use AIFA's name, logo, or branding in a manner that suggests
            sponsorship, endorsement, or affiliation without written
            authorization.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Trademarks",
    content: (
      <>
        <p>
          "AIFA", the AIFA logo, and all associated names, logos, graphics,
          taglines, and branding elements are trademarks or proprietary assets
          of AIFA unless otherwise indicated.
        </p>
        <p className="mt-3">Unauthorized use of these marks is prohibited.</p>
      </>
    ),
  },
  {
    title: "5. Third Party Content",
    content: (
      <>
        <p>
          Certain content available through AIFA may include materials licensed
          from third parties or used with permission.
        </p>
        <p className="mt-3">
          Such materials remain the property of their respective owners and are
          protected by applicable intellectual property laws.
        </p>
        <p className="mt-3">
          Users must respect all applicable third party rights.
        </p>
      </>
    ),
  },
  {
    title: "6. Reporting Copyright Infringement",
    content: (
      <>
        <p>
          If you believe that any material available through AIFA infringes your
          copyright or other intellectual property rights, please contact us
          with the following information:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Your full name and contact details.</li>
          <li>A description of the copyrighted work.</li>
          <li>The location of the allegedly infringing material.</li>
          <li>
            A statement explaining your ownership or authority to act on behalf
            of the copyright owner.
          </li>
          <li>
            Any supporting documentation that helps us evaluate your claim.
          </li>
        </ul>
        <p className="mt-3">
          Upon receiving a valid notice, AIFA will review the matter and, where
          appropriate, take reasonable action in accordance with applicable law.
        </p>
      </>
    ),
  },
  {
    title: "7. Enforcement",
    content: (
      <>
        <p>AIFA actively protects its intellectual property rights.</p>
        <p className="mt-3">
          Unauthorized copying, distribution, reproduction, recording,
          commercial use, or other infringement of AIFA's copyrighted materials
          may result in suspension or termination of access, legal proceedings,
          claims for damages, and any other remedies available under applicable
          law.
        </p>
      </>
    ),
  },
  {
    title: "8. Changes to this Copyright Notice",
    content: (
      <>
        <p>
          AIFA may update this Copyright Notice from time to time to reflect
          changes in our services, intellectual property, or legal requirements.
        </p>
        <p className="mt-3">
          The latest version will always be available on our website together
          with the updated Effective Date.
        </p>
        <p className="mt-3">
          Unauthorized use may result in immediate termination of access and
          legal action where appropriate.
        </p>
      </>
    ),
  },
  {
    title: "9. Contact Us",
    content: (
      <>
        <p>
          For copyright related questions, permissions, licensing requests, or
          infringement notices, please contact us.
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

export default function CopyrightNotice() {
  return (
    <div className="min-h-screen bg-black text-gray-400">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-10 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-[#bfe70d]">
            Copyright Notice
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Effective Date: July 23, 2026
          </p>
        </header>

        <div className="mb-10 leading-relaxed">
          <p>
            All content made available by AIFA – AI Filmmaking Academy ("AIFA",
            "we", "our", or "us") is protected by applicable copyright,
            trademark, and other intellectual property laws.
          </p>
          <p className="mt-4">
            Unless otherwise stated, AIFA owns or has the necessary rights and
            licenses to use all content published through its website, Learning
            Management System (LMS), workshops, courses, digital platforms, and
            associated services.
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
