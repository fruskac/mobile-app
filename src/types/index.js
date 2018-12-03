// news data type
export type NewsData = {
  title: string,
  description: string,
  id: string,
  description_long: string,
  published: string,
  image: string,
  link: string,
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
  description_long: string,
  place: string,
  lat: string,
  lng: string,
  category: string,
  image: string,
  type: string
};

// holding location full data info
export type LocationFullData = {
  lat: string,
  lon: string,
  tag: string,
  data: LocationData,
  options: {}
};

export type LocationsList = Array<LocationData>;
