import Image from "next/image";
import type { ReactNode } from "react";

interface PackageOption {
  name: string;
  days: string;
  price: string;
  originalPrice?: string;
  description: string;
}

interface Step {
  number: number;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  author: string;
}

const packages: PackageOption[] = [
  {
    name: "1 Day Magical VIP Package",
    days: "1 Day",
    price: "$250.00",
    description:
      "This plan includes 1 day with us making all Pre booked Multi Pass Lightning Lane reservations and same day multi pass lightning lanes on your park day.",
  },
  {
    name: "2 Days Magical VIP Package",
    days: "2 Days",
    price: "$400.00",
    originalPrice: "$500.00",
    description:
      "This plan includes 2 days with us making all Pre booked Multi Pass Lightning Lane reservations and same day multi pass lightning lanes on your park day.",
  },
  {
    name: "3 Days Magical VIP Package",
    days: "3 Days",
    price: "$550.00",
    originalPrice: "$750.00",
    description:
      "This plan includes 3 days with us making all Pre booked Multi Pass Lightning Lane reservations and same day multi pass lightning lanes on your park day.",
  },
  {
    name: "4 Days Magical VIP Package",
    days: "4 Days",
    price: "$650.00",
    originalPrice: "$1000.00",
    description:
      "This plan includes 4 days with us making all Pre booked Multi Pass Lightning Lane reservations and same day multi pass lightning lanes on your park day.",
  },
  {
    name: "5 Days Magical VIP Package",
    days: "5 Days",
    price: "$750.00",
    originalPrice: "$1250.00",
    description:
      "This plan includes 5 days with us making all Pre booked Multi Pass Lightning Lane reservations and same day multi pass lightning lanes on your park day.",
  },
  {
    name: "2025-2026 Annual Pass",
    days: "20 Days",
    price: "$2000.00",
    description:
      "This package includes 20 park days that allow you to bypass the waitlist and secure your trip dates, even on days that are already full.",
  },
];

const steps: Step[] = [
  {
    number: 1,
    title: "Book online and select the day",
    description: "Choose your preferred park visit date",
  },
  {
    number: 2,
    title: "Select attractions and experiences",
    description:
      "We send you a link to select all attractions, shows, and experiences you want",
  },
  {
    number: 3,
    title: "Customized plan created",
    description: "We put together a plan customized to your group",
  },
  {
    number: 4,
    title: "Secure Lightning Lanes",
    description:
      "Your park day we secure all of your Lightning Lanes and update plans all day long",
  },
  {
    number: 5,
    title: "Follow the plan",
    description: "You follow the plan and check off steps as you go",
  },
  {
    number: 6,
    title: "In-app support available",
    description:
      "We have someone available all day through the app to chat and handle any questions",
  },
  {
    number: 7,
    title: "Enjoy your day",
    description:
      "You enjoy your day without worries of when to select next ride",
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "My Magical VIP was the best decision we made for our trip. Dewey Duck planned out our days and worked with us each day to tweak things as needed. Communication was awesome.",
    author: "Susan",
  },
  {
    quote:
      "My Magical VIP was the best thing for our trip. This service allowed us to ride every ride without waiting in line. When you have small children, this is necessary to keep your sanity.",
    author: "Jen",
  },
  {
    quote:
      "This was the best decision we made for our trip! It took all the stress out and made everything so much easier. I recommend this to anyone!",
    author: "Tracy",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            My Magical VIP
          </h1>
          <p className="text-xl sm:text-2xl text-amber-100 mb-8 max-w-3xl mx-auto font-semibold">
            Plan Your Next Magical Adventure
          </p>
          <p className="text-base sm:text-lg text-white max-w-2xl mx-auto mb-10">
            Let us take the stress out of your Disney trip. We will manage your
            entire day, all you have to do is show up and relax!
          </p>
          <a href="/typical-days" className="inline-block bg-amber-400 hover:bg-amber-300 text-indigo-900 font-bold py-3 px-8 rounded-full transition-colors shadow-lg">
            View Our Typical Days at Each Park
          </a>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-indigo-900 mb-6">
            Overview
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            With My Magical VIP you will be able to enjoy your vacation without
            staring at your phone the whole time trying to plan your day. We will
            take care of setting a plan and securing the rides so that you will
            have very limited waits.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our guide will virtually stay in touch during the day and be able to
            handle any questions or concerns while also grabbing lightning lanes
            so that you are able to enjoy attractions without waiting. The only
            thing you need to focus on is being present in the parks and having
            fun!
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Available Packages
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Price includes up to 10 people per group. Park admission is required
            for day of visit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-indigo-100 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden hover:border-indigo-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-indigo-600 font-semibold mb-4">
                    {pkg.days}
                  </p>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-3xl font-bold text-pink-600">
                      {pkg.price}
                    </span>
                    {pkg.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        {pkg.originalPrice}
                      </span>
                    )}
                  </div>

                  <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all shadow-md">
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-indigo-900 mb-12 text-center">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white border-l-4 border-pink-500 rounded-lg p-6 shadow-md"
              >
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <p className="font-bold text-indigo-900">
                  -{testimonial.author}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://www.facebook.com/profile.php?id=100085119818852&sk=reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-700 font-bold"
            >
              View all reviews on Facebook
            </a>
          </div>
        </div>
      </section>

      {/* 7 Steps Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-indigo-900 mb-12 text-center">
            7 Steps to a Magical Day
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            The following steps outline what you can expect when working with one
            of our experienced guides.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="bg-gradient-to-br from-indigo-50 to-pink-50 p-6 rounded-lg shadow-md border-l-4 border-pink-500">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">
                  {step.number}
                </div>
                <h3 className="font-bold text-indigo-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-700 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-amber-300">My Magical VIP</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="/" className="hover:text-amber-300 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-300 transition-colors">
                    Typical Days
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-300 transition-colors">
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
                  <a href="#" className="hover:text-amber-300 transition-colors">
                    Cancellation Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-300 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-amber-300">Contact</h3>
              <a
                href="mailto:info@mymagicalvip.com"
                className="text-sm text-gray-300 hover:text-amber-300 transition-colors"
              >
                info@mymagicalvip.com
              </a>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-amber-300">Follow Us</h3>
              <a
                href="https://www.facebook.com/My-Magical-VIP-102990822543949"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-amber-300 transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>

          <div className="border-t border-purple-700 pt-8">
            <p className="text-sm text-gray-400 mb-4">
              Copyright ©2025 My Magical VIP
            </p>
            <p className="text-xs text-gray-500">
              My Magical VIP is a private company in no way owned by or affiliated
              with the Walt Disney Company, Universal, Comcast or any of their
              parent or subsidiary institutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
