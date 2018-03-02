// news data type
export type NewsData = {
  title_en: string,
  title_sr: string,
  id: string,
  content: string,
  imageUrl: string
};

export type Location = {
  lat: number,
  lng: number
};

// type of locations filter
export type LocationFilter = "type" | "place";

// holding part of location data
export type LocationData = {
  title: string,
  id: string,
  link: string,
  description: string,
  image: string
};

// holding location full data info
export type LocationFullData = {
  lat: string,
  lon: string,
  tag: string,
  data: LocationData,
  options: {}
};

export type LocationsList = Array<LocationFullData>;
