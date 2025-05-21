"use client";

import Link from 'next/link';
import ProductNav from '../components/ProductNav'; // Assuming ProductNav can be reused

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <ProductNav />
      <div className="container mx-auto px-4 py-16">
        <Link href="/" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">Privacy Policy</h1>
        
        <div className="max-w-3xl mx-auto bg-gray-900 p-8 md:p-12 rounded-xl border border-purple-500/30 space-y-6">
          <h2 className="text-2xl font-semibold text-purple-400">pragyaa.ai Privacy Policy</h2>
          <p className="text-gray-300">
            This privacy policy will explain how our organization uses the personal data we collect from you when you use our website.
          </p>

          <h3 className="text-xl font-semibold text-purple-300 pt-4">Foreword</h3>
          <p className="text-gray-300">
            We at pragyaa.ai are committed to protecting the information that you share with us and explaining how we collect process and share that information online. When you use our services, you're trusting us with your information. We understand this is a big responsibility and work hard to protect and entrust your information to keep it secure.
          </p>
          <p className="text-gray-300">
            We provide you with insight into the privacy practices employed here at Pragyaa.
          </p>

          <h3 className="text-xl font-semibold text-purple-300 pt-4">Background</h3>
          <p className="text-gray-300">
            This Policy provides an overview of how pragyaa.ai's information of "data subjects" (hereinafter referred to as "You or you're") personal data are collected, how they're handled, and how your privacy is protected. In this policy, "we", "us" and "our" may refer to Pragyaa Inc. or its subsidiaries and affiliates.
          </p>

          <h3 className="text-xl font-semibold text-purple-300 pt-4">Services Provided by Pragyaa</h3>
          <p className="text-gray-300">
            pragyaa.ai platform is designed to help you consistently with our services. We offer the capacity to provide a platform for all the services required by small and medium enterprises, providing an end-to-end solution enabling businesses.
          </p>

          <h3 className="text-xl font-semibold text-purple-300 pt-4">What data do we collect?</h3>
          <p className="text-gray-300">
            Our Company collects the following data:
          </p>
          <ul className="list-disc list-inside text-gray-300 pl-4 space-y-1">
            <li>Personal identification information (Name, Email Address, Phone Number, etc.)</li>
          </ul>

          <h3 className="text-xl font-semibold text-purple-300 pt-4">How do we collect your data?</h3>
          <p className="text-gray-300">
            You or your employer directly provide Our Company with the data we intend to collect. We collect data and process data when you:
          </p>
          <ul className="list-disc list-inside text-gray-300 pl-4 space-y-1">
            <li>Register online or avail of our products or services.</li>
          </ul>
          <p className="text-gray-300">
            Our Company may also receive your data indirectly from the following sources:
          </p>
          <ul className="list-disc list-inside text-gray-300 pl-4 space-y-1">
            <li>None</li>
          </ul>

          <h3 className="text-xl font-semibold text-purple-300 pt-4">How will we use your data?</h3>
          <p className="text-gray-300">
            Our Company collects your data so that we can:
          </p>
          <ul className="list-disc list-inside text-gray-300 pl-4 space-y-1">
            <li>Provide your service, and manage your account to provide the service.</li>
            <li>Email you with special offers on other products and services we think you might like.</li>
            <li>Email you with real-time alerts of your organization.</li>
          </ul>
          <p className="text-gray-300">
            If you agree, Our Company will share your data with our partners who are also an essential part of the service we intend to provide.
          </p>

          <h3 className="text-xl font-semibold text-purple-300 pt-4">How do we store your data? (If you are located in the EU)</h3>
          <p className="text-gray-300">
            Our Company securely stores your data at a Secure storage location in Europe. Our Company will keep your PII data for as long as our service is availed. Once this period has expired, we will delete your data by scrubbing off all PII within a month of Service Termination.
          </p>

          <h3 className="text-xl font-semibold text-purple-300 pt-4">Marketing</h3>
          <p className="text-gray-300">
            Our Company would like to send you information about our products and services that we think you might like. If you no longer wish to be contacted for marketing purposes, you can drop us a mail.
          </p>

          <h3 className="text-xl font-semibold text-purple-300 pt-4">What are your data protection rights?</h3>
          <p className="text-gray-300">
            Our Company wants to ensure you are fully aware of your data protection rights. Every user is entitled to the following:
          </p>
          <ul className="list-disc list-inside text-gray-300 pl-4 space-y-2">
            <li><strong>The right to access</strong> – You have the right to request Our Company copies of your data. We may charge you a small fee for this service.</li>
            <li><strong>The right to rectification</strong> – You have the right to request that Our Company correct any information you believe is inaccurate. You also have the right to request Our Company to complete information you believe is incomplete.</li>
            <li><strong>The right to erasure</strong> — You have the right to request that Our Company erase your data, under certain conditions.</li>
            <li><strong>The right to restrict processing</strong> – You have the right to request that Our Company restrict the processing of your personal data, under certain conditions.</li>
            <li><strong>The right to object to processing</strong> – You have the right to object to Our Company's processing of your data, under certain conditions.</li>
            <li><strong>The right to data portability</strong> – You have the right to request that Our Company transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>
          <p className="text-gray-300 pt-2">
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at our email:
          </p>
          <p className="text-gray-300">Email us at: <a href="mailto:info@pragyaa.ai" className="text-blue-400 hover:underline">info@pragyaa.ai</a></p>
          <p className="text-gray-300">Call us: +919650071784</p>

          <h3 className="text-xl font-semibold text-purple-300 pt-4">What are cookies?</h3>
          <p className="text-gray-300">
            Cookies are text files placed on your computer to collect standard Internet log information and visitor behavior information. When you visit our websites, we may collect information from you automatically through cookies or similar technology. For further information, visit the cookie link (wiki).
          </p>

          <h3 className="text-xl font-semibold text-purple-300 pt-4">How do we use cookies?</h3>
          <p className="text-gray-300">
            Our Company does not use cookies. We only use a session variable that is to:
          </p>
          <ul className="list-disc list-inside text-gray-300 pl-4 space-y-1">
            <li>Keeping you signed in to our application</li>
          </ul>

          <h3 className="text-xl font-semibold text-purple-300 pt-4">Privacy policies of other websites</h3>
          <p className="text-gray-300">
            The Our Company website contains links to other websites. Our privacy policy applies only to our website, so if you click on a link to another website, you should read their privacy policy.
          </p>

          <h3 className="text-xl font-semibold text-purple-300 pt-4">Changes to our privacy policy</h3>
          <p className="text-gray-300">
            Our Company keeps its privacy policy under regular review and places any updates on this web page. This privacy policy was last updated on 15-11-2024.
          </p>

          <h3 className="text-xl font-semibold text-purple-300 pt-4">How to contact us?</h3>
          <p className="text-gray-300">
            If you have any questions about Our Company's privacy policy or the data we hold on you or would like to exercise one of your data protection rights, please do not hesitate to contact us.
          </p>
          <p className="text-gray-300">Email us at: <a href="mailto:info@pragyaa.ai" className="text-blue-400 hover:underline">info@pragyaa.ai</a></p>
          <p className="text-gray-300">Call us: +91 9650071784</p>

          <h3 className="text-xl font-semibold text-purple-300 pt-4">Data Protection Officer(DPO) and their responsibilities:</h3>
          <p className="text-gray-300">DPO Contact Info.</p>
          <ul className="list-disc list-inside text-gray-300 pl-4 space-y-1">
            <li>Name : Narayanan T</li>
            <li>Email: <a href="mailto:narayanan@pragyaa.ai" className="text-blue-400 hover:underline">narayanan@pragyaa.ai</a></li>
          </ul>
          <p className="text-gray-300 pt-2 font-semibold">DPO Roles and Responsibilities:</p>
          <ul className="list-disc list-inside text-gray-300 pl-4 space-y-1">
            <li>Oversee the implementation of data protection policies and procedures.</li>
            <li>Ensure the organization's compliance with data protection regulations.</li>
            <li>Conduct risk assessments related to data processing activities.</li>
            <li>Serve as a point of contact for data subjects and supervisory authorities.</li>
            <li>Monitor data security measures, investigate breaches, and enforce staff training to uphold data security.</li>
          </ul>

          <h3 className="text-xl font-semibold text-purple-300 pt-4">How to contact the appropriate authority?</h3>
          <p className="text-gray-300">
            Should you wish to report a complaint or if you feel that Our Company has not addressed your concern satisfactorily, you may contact the Information Commissioner's Office.
          </p>

          <h3 className="text-xl font-semibold text-purple-300 pt-4">ENFORCEMENT</h3>
          <p className="text-gray-300">
            We expect all employees to comply with this policy and any related policies, standards, processes, procedures, and guidelines. Failure and/or refusal to abide by this policy may be deemed a violation. Compliance with the policies will be a matter of periodic review by the Information security officer / Information Security Team. Any employee found to have violated this policy may be subject to disciplinary action, as deemed appropriate by management and Human Resources policies.
          </p>
          <p className="text-gray-300">
            Monitoring: The company employs appropriate technology solutions to monitor policy/ procedure compliance.
          </p>
          <p className="text-gray-300">
            Self-Assessment: The CEO/CTO are required to conduct self-assessment within their areas of control to verify compliance with this policy/ procedure.
          </p>

          <h3 className="text-xl font-semibold text-purple-300 pt-4">SPECIAL CIRCUMSTANCES AND EXCEPTIONS</h3>
          <p className="text-gray-300">
            All exceptions to this policy/ procedure will require a waiver explicitly approved by one of Pragyaa's CEO/CTO.
          </p>
        </div>
      </div>
    </main>
  );
}