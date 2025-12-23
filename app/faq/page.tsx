import type { Metadata } from "next";
import Image from "next/image";
import GlobalNav from "@/components/GlobalNav";

export const metadata: Metadata = {
  title: "FAQ - My Magical VIP",
  description: "Frequently asked questions about My Magical VIP Disney touring services",
};

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Do you have a guide in the park?",
    answer: "No we do not have anyone physically on Disney property. All of our services are done virtually.",
  },
  {
    question: "Can we talk to someone about the service?",
    answer: "We do not offer phone consultations. We want to answer all of your questions, and hear about what your goals are for your trip. For any questions prior to booking we communicate via Facebook or Email. After you purchase our services, you will receive a link to join an app that we will use to communicate with you and collect information about your trip. We communicate this way so that we can focus on our client's experience while they are in the park. This allows us to answer your questions quickly in between our tasks.",
  },
  {
    question: "Are you able to book hotels and park tickets?",
    answer: "No, this service is not a travel agent service. We also do not have any affiliation with Disney.",
  },
  {
    question: "When was the company started?",
    answer: "My Magical VIP was founded in 2022",
  },
  {
    question: "How many rides can our group do in a day?",
    answer: "This depends on a lot of variables. The amount of rides you can ride depend on how long you will be in the park and how fast or slow your group wants to move. We work closely with you on a plan to try to meet all of your needs. We have had groups that have completed 20+ attractions!",
  },
  {
    question: "Do you use the DAS system?",
    answer: "We do not use the DAS system. If you qualify for DAS, you do not need our services.",
  },
  {
    question: "How are you able to do so many lightning lanes?",
    answer: "We have collected data and understand the system better than 99.99% of the general population. We have set up an app that makes it easy to communicate and easy for guests to follow. We are not using bots or anything that is not available to the general public.",
  },
  {
    question: "Do you guarantee that we can do all the rides we want?",
    answer: "We do not guarantee all the rides because some elements are out of our control. Some examples of this are rides breaking down for several hours, weather, groups that check in at the end of a lightening lane window etc. Groups are normally able to get through everything they ask for, and more times than not we ask groups to add more to fill their days.",
  },
  {
    question: "Why are dates sold out?",
    answer: "We only handle a certain amount of groups per day so that we can give everyone the best service possible.",
  },
  {
    question: "Do I have to rope drop?",
    answer: "No, we would prefer groups not to rope drop in most parks. Rope drop are chaos and sometimes rides don't open which is out of our control. With that said, we will work to build our plans around the time you want to get started!",
  },
  {
    question: "Are you able to skip the lines at character meets?",
    answer: "We are only able to use a lightning lane for characters that have a lightning lane option. We will try to find a time when character meets should have a lower wait time if they do not have a lightning lane option.",
  },
  {
    question: "Can we park hop?",
    answer: "Yes, groups can park hop to any park. We would like to plan this before so that we can make sure the second park is as great of a time as the first park.",
  },
  {
    question: "Will I be on my phone all day communicating with My Magical VIP?",
    answer: "You should barely be on your phone. You will follow a plan and as you scan in the attraction you hit a checkmark. Then when you get off the ride you refresh your screen and the plan is updated. Head to the next step on the updated plan. Rinse and repeat.",
  },
  {
    question: "Do we get to pick what rides we do in what order?",
    answer: "We ask before your trip what attractions you want to do. We control the order because we are using data to do the park the most efficient way.",
  },
  {
    question: "Can we ride the same ride more than once?",
    answer: "We have the same rules everyone else has. Each attraction can only use on lightening lane per day. You may be able to ride the attraction a second time with the standby line depending on the ride and the time you are in the parks.",
  },
  {
    question: "Are we going to be going back and forth across the park?",
    answer: "We take care of areas of the park and then move on to the next area. This is why we ask about shows and characters. For example we won't leave Tomorrowland and if you still have things you want to do there. We may have to circle back for something but in general we are moving in one direction most the day.",
  },
  {
    question: "How strict is the schedule?",
    answer: "The most two important steps to getting the most out of services are to communicate what your goals are and to trust us! When you are filling out the information about what you want to accomplish, we would rather you select EVERYTHING you are hoping for instead of going back later and adding things. It is easier for our plan to take away things instead of adding things. We really can accomplish A LOT so trust that we will do everything in our power to accomplish all of your goals. When you get to the parks, trust the process! We will get you on that rides you want to ride the most, it just may not be the first rides you hop on for the day.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <GlobalNav />

      {/* Hero Section */}
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: 'url(https://cdn.shopify.com/s/files/1/0643/1971/7626/files/2thomas-kelley-5YtjgRNTli4-unsplash.jpg?crop=center&width=3000)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 via-gray-800/40 to-gray-900/40"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6" style={{ textShadow: '2px 2px 2px #333333' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto" style={{ textShadow: '2px 2px 2px #333333' }}>
            Everything you need to know about My Magical VIP
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg p-6 shadow-md border-l-4 border-emerald-500"
              >
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="mb-6">
              We're here to help! Reach out to us and we'll be happy to answer any questions you have.
            </p>
            <a
              href="mailto:info@mymagicalvip.com"
              className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 via-emerald-900 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-amber-300">
                My Magical VIP
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="/" className="hover:text-amber-300 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/typical-days" className="hover:text-amber-300 transition-colors">
                    Typical Days
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-amber-300 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-300 transition-colors">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-amber-300">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="/terms" className="hover:text-amber-300 transition-colors">
                    Terms and Conditions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-amber-300">
                Contact
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a
                    href="mailto:info@mymagicalvip.com"
                    className="hover:text-amber-300 transition-colors"
                  >
                    info@mymagicalvip.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-amber-300">
                Follow Us
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a
                    href="https://www.facebook.com/My-Magical-VIP-102990822543949"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-300 transition-colors"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-emerald-700 pt-8 text-center text-sm text-gray-300">
            <p className="mb-2">Copyright ©2025 My Magical VIP</p>
            <p className="text-xs">
              My Magical VIP is a private company in no way owned by or
              affiliated with the Walt Disney Company, Universal, Comcast or any
              of their parent or subsidiary institutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
