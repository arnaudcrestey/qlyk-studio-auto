export type QlykDelivery = {
  slug: string;
  clientName: string;
  vehicle: string;
  deliveredAt: string;
  photos: string[];
};

export const qlykDeliveries: QlykDelivery[] = [
  {
    slug: "bmw-x5-garage-martin",
    clientName: "Garage Martin",
    vehicle: "BMW X5",
    deliveredAt: "18 mai 2026",
    photos: [
      "COLLE_ICI_URL_UPLOADTHING_1",
      "COLLE_ICI_URL_UPLOADTHING_2",
      "COLLE_ICI_URL_UPLOADTHING_3",
    ],
  },
];

export function getQlykDelivery(slug: string) {
  return qlykDeliveries.find((delivery) => delivery.slug === slug);
}
