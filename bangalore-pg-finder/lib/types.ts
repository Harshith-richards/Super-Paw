export type PG = {
  id: string;
  name: string;
  area: string;
  locality: string;
  type: "Boys" | "Girls" | "Co-living";
  occupancy: ("Single" | "Double" | "Triple")[];
  rent: number;
  rating: number;
  amenities: string[];
  lat: number;
  lng: number;
  image: string;
  address: string;
  metroDistanceKm: number;
  phone: string;
  whatsapp: string;
  popular: boolean;
};
