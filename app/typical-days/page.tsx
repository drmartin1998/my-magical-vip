import type { Metadata } from "next";
import Image from "next/image";

interface ParkDay {
  name: string;
  attractions: string[];
  description: string;
}

const parkDays: ParkDay[] = [
  {
    name: "Magic Kingdom",
    attractions: [
      "Lightning Lane Peter Pan",
      "Lightning Lane Seven Dwarfs Mine Train",
      "Lightning Lane Jungle Cruise",
      "Lightning Lane Pirates of the Caribbean",
      "Lightning Lane Splash Mountain",
      "Lightning Lane Big Thunder Mountain",
      "Lightning Lane Haunted Mansion",
      "Lightning Lane Space Mountain",
      "Lightning Lane Buzz Lightyear Space Ranger Spin",
      "Lightning Lane It's a Small World",
    ],
    description:
      "At Magic Kingdom we have families with very different needs depending on the ages of the group. We have some families that want to do more character meets and we will do lightning lanes for those. Also any shows are easily done standby we will grab a lightning lane for Monster's Inc Laugh Floor or Mickey's PhilharMagic if they have higher posted waits. If doing the smaller rides like Dumbo, Barnstormer, and Under the Sea we are able to get a lightning lane or do standby with less than a 10 minute wait.",
  },
  {
    name: "Epcot",
    attractions: [
      "Boarding Group for Guardians of the Galaxy",
      "Lightning Lane for Test Track",
      "Lightning Lane for Frozen Ever After",
      "Lightning Lane Remy's Ratatouille Adventure",
      "Lightning Lane Soarin' Around the World",
      "Lightning Lane Mission: SPACE",
      "Lightning Lane Spaceship Earth",
      "Standby for Seas with Nemo & Friends",
      "Standby Turtle Talk with Crush",
      "Standby Living with the Land",
      "Standby Journey Into Imagination Figment",
      "Hours to explore World Showcase Countries and food",
    ],
    description:
      "Majority of our groups usually want to skip Gran Fiesta Tour, Beauty and the Beast Sing-Along, Disney and Pixar Short Film Festival, and characters. We give all our customers a choice in selecting what they want to do this just shows what is possible. We can easily add in other steps including rides, shows, characters, parades, and food.",
  },
  {
    name: "Hollywood Studios",
    attractions: [
      "Lightning Lane Star Wars Rise of the Resistance",
      "Lightning Lane Millennium Falcon: Smugglers Run",
      "Lightning Lane Mickey & Minnie's Runaway Railway",
      "Lightning Lane Slinky Dog Dash",
      "Lightning Lane Toy Story Mania",
      "Lightning Lane Tower of Terror",
      "Lightning Lane Rock 'n' Roller Coaster",
      "Standby for Star Tours under 10 minute wait",
      "Lightning McQueen's Racing Academy",
      "Standby for Indiana Jones Epic Stunt Spectacular",
      "Standby for Frozen Sing-Along Celebration",
      "Standby Muppets 3D",
      "Standby for Fantasmic",
    ],
    description:
      "Majority of our groups usually want to skip Alien Swirling Saucers, Beauty & the Beast Live on Stage, Disney Junior Play and Dance, and characters. We give all our customers a choice in selecting what they want to do this just shows what is possible. We can easily add in other steps including rides, shows, characters, parades, and food.",
  },
  {
    name: "Animal Kingdom",
    attractions: [
      "Lightning Lane Avatar Flight of Passage",
      "Lightning Lane Na'vi River Journey",
      "Lightning Lane Kilimanjaro Safaris",
      "Lightning Lane Kali River Rapids",
      "Lightning Lane Expedition Everest",
      "Lightning Lane Dinosaur",
      "Standby for Festival of the Lion King",
      "Gorilla Falls Exploration Trail",
      "Standby It's Tough to be a Bug",
      "Maharajah Jungle Trek",
    ],
    description:
      "Majority of our groups usually want to skip TriceraTop Spin, Feathered Friends in Flight, Finding Nemo, Animation Experience, and characters. We give all our customers a choice in selecting what they want to do this just shows what is possible. We can easily add in other steps including rides, shows, characters, parades, and food.",
  },
];

export const metadata: Metadata = {
  title: "Typical Days | My Magical VIP",
  description:
    "View typical touring days at each Disney park with My Magical VIP guides",
};

export default function TypicalDaysPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="w-full py-4 px-4 sm:px-6 lg:px-8 shadow-lg text-white" style={{ backgroundImage: 'url(/global-nav-bg.png)' }}>
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-lg text-black hover:text-gray-700 transition-colors">
            <Image src="/key-logo.png" alt="Key Logo" width={48} height={48} className="h-12 w-auto" />
            My Magical VIP
          </a>
          <ul className="flex gap-6 text-sm font-bold">
            <li>
              <a href="/" className="text-black hover:text-gray-700 transition-colors">
                🏠 Home
              </a>
            </li>
            <li>
              <a href="/typical-days" className="text-black hover:text-gray-700 transition-colors">
                📅 Typical Days
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:text-gray-700 transition-colors">
                ❓ FAQ
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:text-gray-700 transition-colors">
                ℹ️ About
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
            Typical Touring Days With Us
          </h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto" style={{ textShadow: '2px 2px 2px #333333' }}>
            See what a day with My Magical VIP looks like at each park
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
            <li className="text-gray-700 font-medium">Typical Days</li>
          </ol>
        </div>
      </nav>

      {/* Parks Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-16">
            {parkDays.map((park, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg p-8 border-l-4 border-emerald-500 shadow-md">
                <h2 className="text-3xl font-bold text-blue-900 mb-6">
                  {park.name} Typical Day with My Magical VIP
                </h2>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">
                    Attractions & Experiences:
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {park.attractions.map((attraction, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-pink-500 font-bold mr-3">•</span>
                        <span className="text-gray-700">{attraction}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    About This Day:
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {park.description}
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Most days we will have lightning lane return times for rides
                    in one area of the park at similar times so that we limit
                    backtracking as much as possible. This list also does not
                    include rides if you are rope dropping or staying until park
                    close.
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-blue-200">
                  <button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-md">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-amber-50 border-2 border-amber-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Customize Your Day
            </h2>
            <p className="text-gray-700 mb-4">
              We give all our customers a choice in selecting what they want to
              do. The itineraries above show what is possible with our service.
              We can easily add in:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              <li className="flex items-center">
                <span className="text-pink-500 font-bold mr-2">✓</span>
                Character Meet & Greets
              </li>
              <li className="flex items-center">
                <span className="text-pink-500 font-bold mr-2">✓</span>
                Dining Experiences
              </li>
              <li className="flex items-center">
                <span className="text-pink-500 font-bold mr-2">✓</span>
                Shows & Entertainment
              </li>
              <li className="flex items-center">
                <span className="text-pink-500 font-bold mr-2">✓</span>
                Parades & Spectaculars
              </li>
              <li className="flex items-center">
                <span className="text-pink-500 font-bold mr-2">✓</span>
                Shopping & Exploration
              </li>
              <li className="flex items-center">
                <span className="text-pink-500 font-bold mr-2">✓</span>
                Child-Friendly Attractions
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-emerald-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            Ready to Plan Your Magical Day?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Contact us today to book your personalized Disney experience. Our
            guides are ready to help you make the most of your park visit!
          </p>
          <button className="inline-block bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-bold py-4 px-12 rounded-lg transition-all shadow-md text-lg">
            Get Started Today
          </button>
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
                  <a
                    href="/typical-days"
                    className="hover:text-amber-300 transition-colors"
                  >
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
              <h3 className="font-bold text-lg mb-4 text-amber-300">
                Follow Us
              </h3>
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
