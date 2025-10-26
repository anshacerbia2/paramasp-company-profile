export type OfferCatalog = {
  "@type": "OfferCatalog";
  name: string;
  description?: string;
  itemListElement: Array<OfferCatalog | Offer>;
};

export type Offer = {
  "@type": "Offer";
  itemOffered: {
    "@type": "Service";
    name: string;
    description?: string;
  };
};

export type BreadcrumbLD = { label: string; path?: string; typeLd?: string };
