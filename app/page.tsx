import Image from "next/image";
import type { ReactNode } from "react";
import { getProductsByCollection, getProducts } from "@/lib/shopify";
import AddToCartButton from "@/components/AddToCartButton";
import PackagesGrid from "@/components/PackagesGrid";
import { Home as HomeIcon, Calendar, HelpCircle, Info } from "lucide-react";

interface PackageOption {
  id: string;
  name: string;
  days: string;
  price: string;
  originalPrice?: string;
  description: string;
  productType?: string;
  image?: {
    url: string;
    altText: string;
  };
  maxDays?: number;
  variants?: Array<{
    id: string;
  }>;
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

// Fallback packages in case Shopify fetch fails
const fallbackPackages: PackageOption[] = [
  {
    id: "1",
    name: "1 Day Magical VIP Package",
    days: "1 Day",
    price: "$250.00",
    description:
      "This plan includes 1 day with us making all Pre booked Multi Pass Lightning Lane reservations and same day multi pass lightning lanes on your park day.",
  },
  {
    id: "2",
    name: "2 Days Magical VIP Package",
    days: "2 Days",
    price: "$400.00",
    originalPrice: "$500.00",
    description:
      "This plan includes 2 days with us making all Pre booked Multi Pass Lightning Lane reservations and same day multi pass lightning lanes on your park day.",
  },
  {
    id: "3",
    name: "3 Days Magical VIP Package",
    days: "3 Days",
    price: "$550.00",
    originalPrice: "$750.00",
    description:
      "This plan includes 3 days with us making all Pre booked Multi Pass Lightning Lane reservations and same day multi pass lightning lanes on your park day.",
  },
  {
    id: "4",
    name: "4 Days Magical VIP Package",
    days: "4 Days",
    price: "$650.00",
    originalPrice: "$1000.00",
    description:
      "This plan includes 4 days with us making all Pre booked Multi Pass Lightning Lane reservations and same day multi pass lightning lanes on your park day.",
  },
  {
    id: "5",
    name: "5 Days Magical VIP Package",
    days: "5 Days",
    price: "$750.00",
    originalPrice: "$1250.00",
    description:
      "This plan includes 5 days with us making all Pre booked Multi Pass Lightning Lane reservations and same day multi pass lightning lanes on your park day.",
  },
  {
    id: "6",
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

function HomePageClient({ packages }: { packages: PackageOption[] }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="w-full py-4 px-4 sm:px-6 lg:px-8 shadow-lg text-white" style={{ backgroundImage: 'url(/global-nav-bg.png)' }}>
        <div className="flex items-center justify-between">
          <a href="/" className="font-bold text-lg text-black hover:text-gray-700 transition-colors">
            My Magical VIP
          </a>
          <ul className="flex gap-6 text-sm font-bold">
            <li>
              <a href="/" className="flex items-center gap-1.5 text-black hover:text-gray-700 transition-colors">
                <HomeIcon size={16} />
                Home
              </a>
            </li>
            <li>
              <a href="/typical-days" className="flex items-center gap-1.5 text-black hover:text-gray-700 transition-colors">
                <Calendar size={16} />
                Typical Days
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-1.5 text-black hover:text-gray-700 transition-colors">
                <HelpCircle size={16} />
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-1.5 text-black hover:text-gray-700 transition-colors">
                <Info size={16} />
                About
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: 'url(https://cdn.shopify.com/s/files/1/0643/1971/7626/files/2thomas-kelley-5YtjgRNTli4-unsplash.jpg?crop=center&width=3000)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 via-gray-800/40 to-gray-900/40"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6" style={{ textShadow: '2px 2px 2px #333333' }}>
            My Magical VIP
          </h1>
          <p className="text-xl sm:text-2xl text-amber-100 mb-8 max-w-3xl mx-auto font-semibold" style={{ textShadow: '2px 2px 2px #333333' }}>
            Plan Your Next Magical Adventure
          </p>
          <p className="text-base sm:text-lg text-white max-w-2xl mx-auto mb-10" style={{ textShadow: '2px 2px 2px #333333' }}>
            Let us take the stress out of your Disney trip. We will manage your
            entire day, all you have to do is show up and relax!
          </p>
          <a href="/typical-days" className="inline-block text-white font-bold py-3 px-8 rounded-full shadow-lg green-button" style={{ textShadow: '2px 2px 2px #333333' }}>
            View Our Typical Days at Each Park
          </a>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
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

          <PackagesGrid packages={packages} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white border-l-4 border-emerald-500 rounded-lg p-6 shadow-md"
              >
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <p className="font-bold text-blue-900">
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
              className="text-emerald-600 hover:text-emerald-700 font-bold"
            >
              View all reviews on Facebook
            </a>
          </div>
        </div>
      </section>

      {/* 7 Steps Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
            7 Steps to a Magical Day
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            The following steps outline what you can expect when working with one
            of our experienced guides.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="bg-gradient-to-br from-blue-50 to-emerald-50 p-6 rounded-lg shadow-md border-l-4 border-emerald-500">
                <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">
                  {step.number}
                </div>
                <h3 className="font-bold text-blue-900 mb-2">
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
      <footer className="bg-gradient-to-r from-blue-900 via-emerald-900 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-emerald-300">My Magical VIP</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="/" className="hover:text-emerald-300 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-300 transition-colors">
                    Typical Days
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-300 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-300 transition-colors">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-emerald-300">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-emerald-300 transition-colors">
                    Cancellation Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-300 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-emerald-300">Contact</h3>
              <a
                href="mailto:info@mymagicalvip.com"
                className="text-sm text-gray-300 hover:text-emerald-300 transition-colors"
              >
                info@mymagicalvip.com
              </a>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-emerald-300">Follow Us</h3>
              <a
                href="https://www.facebook.com/My-Magical-VIP-102990822543949"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-emerald-300 transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>

          <div className="border-t border-emerald-700 pt-8">
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

export default async function Home() {
  let packages: PackageOption[] = fallbackPackages;

  try {
    // Try to fetch products from the "Home Page" collection first
    let shopifyProducts;
    try {
      shopifyProducts = await getProductsByCollection("home-page", 10);
    } catch (collectionError) {
      console.warn("Home Page collection not found, fetching all products instead");
      // Fall back to fetching all products if the collection doesn't exist
      shopifyProducts = await getProducts(10);
    }
    
    packages = shopifyProducts.map((product, idx) => ({
      id: product.id,
      name: product.title,
      days: product.title.includes("Day")
        ? product.title.match(/\d+\s+Days?/)?.[0] || `${idx + 1} Day${idx > 0 ? "s" : ""}`
        : "Package",
      price: `$${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}`,
      description: product.description || "",
      image: product.featuredImage
        ? {
            url: product.featuredImage.url,
            altText: product.featuredImage.altText || product.title,
          }
        : undefined,
      maxDays: product.metafield?.value ? parseInt(product.metafield.value, 10) : undefined,
      variants: product.variants,
    }));
  } catch (error) {
    console.error("Failed to fetch Shopify products, using fallback packages:", error);
  }

  // Render client component for modal logic
  return <HomePageClient packages={packages} />;
}
