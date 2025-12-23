import type { Metadata } from "next";
import GlobalNav from "@/components/GlobalNav";
import GlobalFooter from "@/components/GlobalFooter";

export const metadata: Metadata = {
  title: "Privacy Policy - My Magical VIP",
  description: "Privacy Policy for My Magical VIP services",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <GlobalNav />

      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 py-3 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="/" className="text-blue-600 hover:text-blue-700">
                Home
              </a>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-700 font-medium">Privacy Policy</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: 'url(https://cdn.shopify.com/s/files/1/0643/1971/7626/files/2thomas-kelley-5YtjgRNTli4-unsplash.jpg?crop=center&width=3000)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 via-gray-800/40 to-gray-900/40"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6" style={{ textShadow: '2px 2px 2px #333333' }}>
            Privacy Policy
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="mb-12">
              <p className="text-gray-700 leading-relaxed mb-4">
                My Magical VIP operates the https://www.mymagicalvip.com website, which provides the SERVICE.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service, the My Magical VIP website.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you choose to use our Service, then you agree to the collection and use of information in relation with this policy. The Personal Information that we collect are used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at https://www.mymagicalvip.com, unless otherwise defined in this Privacy Policy.
              </p>
            </div>

            {/* Information Collection */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Information Collection and Use</h2>
              <p className="text-gray-700 leading-relaxed">
                For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name, phone number, and postal address. The information that we collect will be used to contact or identify you.
              </p>
            </div>

            {/* Log Data */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Log Data</h2>
              <p className="text-gray-700 leading-relaxed">
                We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer&apos;s Internet Protocol (&quot;IP&quot;) address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
              </p>
            </div>

            {/* Cookies */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your computer&apos;s hard drive.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our website uses these &quot;cookies&quot; to collection information and to improve our Service. You have the option to either accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our Service.
              </p>
            </div>

            {/* Service Providers */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Service Providers</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may employ third-party companies and individuals due to the following reasons:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2">
                <li>To facilitate our Service;</li>
                <li>To provide the Service on our behalf;</li>
                <li>To perform Service-related services; or</li>
                <li>To assist us in analyzing how our Service is used.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We want to inform our Service users that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
              </p>
            </div>

            {/* Security */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
              </p>
            </div>

            {/* Links to Other Sites */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Links to Other Sites</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Children&apos;s Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Services do not address anyone under the age of 13. We do not knowingly collect personal identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.
              </p>
            </div>

            {/* Changes to Privacy Policy */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.
              </p>
            </div>

            {/* Contact Us */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at{" "}
                <a href="mailto:info@mymagicalvip.com" className="text-blue-600 hover:text-blue-800 underline">
                  info@mymagicalvip.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
