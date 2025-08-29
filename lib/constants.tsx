/**
 * NavBar Constants
 */
export const COMPANY_NAME = "PupDog Studio"
export const COMPANY_LOGO_URL = "/images/logo.webp"

/**
 * NavBar Links
 */
export const NAV_LINKS = [
  { name: "Home", url: "/index" },
  {
    name: "About Us",
    url: "/about",
    subLinks: [
      { name: "About Us", url: "/about#about" },
      { name: "Services", url: "/about#services" },
      { name: "Testimonials", url: "/about#testimonials" },
      { name: "Contact Us", url: "/about#contact" },
    ],
  },
  {
    name: "Projects",
    url: "/projects",
    subLinks: [
      { name: "West Seattle Deck", url: "/projects/west-seattle" },
      { name: "Bellevue Deck", url: "/projects/bellevue" },
      { name: "Seattle Deck", url: "/projects/seattle" },
      { name: "Sammamish Deck", url: "/projects/sammamish" },
    ],
  },
  /**   { name: "Blog", url: "/blog" },*/
]

/**
 * Contact Button Text
 */
export const CONTACT_BUTTON_TEXT = "Free Estimate"

/**
 * Call to Action Text
 */
export const CALL_TO_ACTION_TEXT = "Get a Free Estimate!"

/**
 * Phone Number
 */
export const PHONE_NUMBER = "206-600-9459"

export const FOOTER_LINKS = [
  { name: "Home", url: "/index" },
  { name: "About Us", url: "/about" },
  { name: "Projects", url: "/projects" },
  { name: "Contact Us", url: "/about#contact" },
]
