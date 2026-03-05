import type { GeoJSONFeature, OfflinePackage, ViewState } from "./types";

export type MapStyleInput = {
  styleUrl?: string;
  styleJson?: Record<string, any>;
};

export type MapProviderInitOptions = {
  accessToken?: string;
  locale?: string;
};

export type FeaturePressHandler = (feature: GeoJSONFeature) => void;

export interface MapProvider {
  init(options?: MapProviderInitOptions): Promise<void> | void;
  setStyle(style: MapStyleInput): Promise<void> | void;
  setOfflinePackage(pkg: OfflinePackage): Promise<void> | void;
  setCamera(view: ViewState): Promise<void> | void;
  onPressFeature(handler: FeaturePressHandler): () => void;
  destroy(): void;
}
