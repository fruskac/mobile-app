export type Coordinate = {
  lat: number;
  lng: number;
};

export type GeoJSONGeometry = {
  type: string;
  coordinates: any;
};

export type GeoJSONFeature = {
  type: "Feature";
  id?: string | number;
  geometry: GeoJSONGeometry;
  properties?: Record<string, any>;
};

export type FeatureCollection = {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
};

export type POI = {
  id: string;
  name: string;
  coordinate: Coordinate;
  category?: string;
  tags?: string[];
  icon?: string;
  properties?: Record<string, any>;
};

export type Track = {
  id: string;
  name: string;
  coordinates: Coordinate[];
  distanceMeters?: number;
  elevationGainMeters?: number;
  difficulty?: "easy" | "medium" | "hard";
  tags?: string[];
  properties?: Record<string, any>;
};

export type ViewState = {
  center: Coordinate;
  zoom: number;
  bearing?: number;
  pitch?: number;
  bounds?: [number, number, number, number];
};

export type LayerConfig = {
  id: string;
  type: "symbol" | "line" | "fill" | "raster" | "background";
  source: string;
  sourceLayer?: string;
  minZoom?: number;
  maxZoom?: number;
  layout?: Record<string, any>;
  paint?: Record<string, any>;
};

export type TilePackage = {
  id: string;
  version: string;
  format: "mbtiles" | "pmtiles";
  url: string;
  sizeBytes?: number;
  checksum?: string;
};

export type OfflinePackage = {
  id: string;
  version: string;
  format: "mbtiles";
  localPath?: string;
  remoteUrl?: string;
  bounds?: [number, number, number, number];
  minZoom?: number;
  maxZoom?: number;
};
