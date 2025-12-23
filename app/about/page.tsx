import type { Metadata } from "next";
import Image from "next/image";
import GlobalNav from "@/components/GlobalNav";
import GlobalFooter from "@/components/GlobalFooter";

export const metadata: Metadata = {
  title: "About Us - My Magical VIP",
  description: "Learn about My Magical VIP's virtual Disney World touring services",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <GlobalNav />



      {/* Hero Section */}
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: 'url(https://cdn.shopify.com/s/files/1/0643/1971/7626/files/2thomas-kelley-5YtjgRNTli4-unsplash.jpg?crop=center&width=3000)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 via-gray-800/40 to-gray-900/40"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6" style={{ textShadow: '2px 2px 2px #333333' }}>
            About Us
          </h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto" style={{ textShadow: '2px 2px 2px #333333' }}>
            Your Virtual Guide to Magical Disney Experiences
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
            <li className="text-gray-700 font-medium">About</li>
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              Navigating Disney World Made Simple
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              While millions of people visit the Walt Disney World theme parks each and every year, very few truly comprehend the size and complexity of the parks. Trying to learn how to navigate the parks while also learning the language of Disney can seem like trying to earn a PhD at times! Much like you might hire a guide to show you around a new city, hiring a guide for Walt Disney World can be the most efficient way to navigate the parks.
            </p>
          </div>

          {/* Our Service */}
          <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg p-8 mb-12 border-l-4 border-emerald-500">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              What We Do
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              With My Magical VIP you will be able to enjoy your vacation without staring at your phone the whole time trying to plan your day. We will take care of setting a plan and securing the rides so that you will have very limited waits. Our guide will virtually stay in touch during the day and be able to handle any questions or concerns while also grabbing lightning lanes so that you are able to enjoy attractions without waiting. The only thing you need to focus on is being present in the parks and having fun!
            </p>
          </div>

          {/* Tour Details */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              Tour Details
            </h2>
            <div className="space-y-6 text-gray-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Guide Ratio</h3>
                  <p className="leading-relaxed">
                    Each tour includes one virtual tour guide per 10 individuals. If your party has more than 10 individuals we require the addition of a second guide at a higher rate.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">What's Included</h3>
                  <p className="leading-relaxed">
                    Our virtual tour guides are available from park open to park close. We will manage your Lightning Lane reservations and provide touring strategies throughout your day.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">What's Not Included</h3>
                  <p className="leading-relaxed">
                    Tickets to the parks are not included in the price nor is Disney's Lightning Lane Multi Pass or Single Pass. If you need tickets to the parks we will work with you to help you purchase park tickets and/or Disney's Lightning Lane passes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg p-8 mb-12 border-l-4 border-blue-500">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              Our Expertise
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We do not have access to "back door" anyone onto attractions nor does any other third party tour group. However, with experience touring the parks, our techniques and strategies can feel like we are "cutting the line", even though we are not! Our tour guides will be the operators of your Disney Lightning Lane accounts which allows one to book Lightning Lane reservations for attractions that lets individuals enter through a separate line at a reduced wait time. Disney Lightning Lane is available to the general public but we have found the secrets to maximizing the system.
            </p>
          </div>

          {/* Lightning Lane Info */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              About Disney Lightning Lane
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Disney's Lightning Lane is a paid service. This service allows you to "book" attraction reservations, one at a time while you are in the Walt Disney World parks. These reservations allow you to enter that attraction through the "Lightning Lane" entrance which features a much shorter wait when compared to the standby queue. We require all our guests to purchase this service with their park tickets as this helps our guides get you on as many attractions as possible with shorter waits.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Experience Disney Like Never Before?</h2>
            <p className="mb-6">
              Let us handle the planning while you make the memories.
            </p>
            <a
              href="/"
              className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              View Our Packages
            </a>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
