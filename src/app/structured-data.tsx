import Script from "next/script";

export function EventStructuredData() {
  const eventData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Metrosexual Awareness Night",
    description: "Join us for a night of metrosexual awareness and celebration",
    startDate: "2024-XX-XX", // Replace with actual date
    endDate: "2024-XX-XX", // Replace with actual date
    location: {
      "@type": "Place",
      name: "Event Venue Name",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Main St",
        addressLocality: "City",
        addressRegion: "State",
        postalCode: "12345",
        addressCountry: "US",
      },
    },
    image: "https://www.metrosexualawareness.com/og-image.jpg", // Replace with actual image URL
    organizer: {
      "@type": "Organization",
      name: "Your Organization Name",
      url: "https://www.metrosexualawareness.com",
    },
  };

  return (
    <Script id="event-structured-data" type="application/ld+json">
      {JSON.stringify(eventData)}
    </Script>
  );
}
