import type { Metadata } from "next";
import Image from "next/image";
import GlobalNav from "@/components/GlobalNav";
import GlobalFooter from "@/components/GlobalFooter";

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
            <li className="text-gray-700 font-medium">FAQ</li>
          </ol>
        </div>
      </nav>
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

      <GlobalFooter />
    </div>
  );
}
