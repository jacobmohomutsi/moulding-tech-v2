import { SITE } from "@/lib/site";

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": SITE.brand,
    "image": `${SITE.url}/images/brandmark-light-avatar.png`,
    "@id": SITE.url,
    "url": SITE.url,
    "telephone": SITE.phone,
    "email": SITE.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3 Van Eden Crescent, Rosslyn",
      "addressLocality": "Pretoria",
      "addressRegion": "Gauteng",
      "postalCode": "0200",
      "addressCountry": "ZA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -25.6306605,
      "longitude": 28.0990656
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    },
    "sameAs": [
      SITE.socials.linkedin
    ].filter(url => url && url !== "#")
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE.brand,
    "url": SITE.url,
    "logo": `${SITE.url}/images/brandmark-light-avatar.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": SITE.phone,
      "contactType": "customer service",
      "email": SITE.email,
      "areaServed": "ZA",
      "availableLanguage": "English"
    },
    "sameAs": [
      SITE.socials.linkedin
    ].filter(url => url && url !== "#")
  };
}
