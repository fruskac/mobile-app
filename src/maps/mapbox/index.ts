import type {
  MapProvider,
  MapProviderInitOptions,
  MapStyleInput,
  FeaturePressHandler
} from "../provider";
import type { GeoJSONFeature, OfflinePackage, ViewState } from "../types";

type MapboxLike = {
  setAccessToken?: (token: string) => void;
};

export function createMapboxProvider(mapbox: MapboxLike): MapProvider {
  let pressHandler: FeaturePressHandler | null = null;

  return {
    init(options?: MapProviderInitOptions) {
      if (options && options.accessToken && mapbox.setAccessToken) {
        mapbox.setAccessToken(options.accessToken);
      }
    },
    setStyle(_style: MapStyleInput) {
      // TODO: wire to MapView via props in routes/Map.
    },
    setOfflinePackage(_pkg: OfflinePackage) {
      // TODO: bridge to Mapbox offlineManager packs.
    },
    setCamera(_view: ViewState) {
      // TODO: connect to Mapbox camera controls.
    },
    onPressFeature(handler: FeaturePressHandler) {
      pressHandler = handler;
      return () => {
        if (pressHandler === handler) pressHandler = null;
      };
    },
    destroy() {
      pressHandler = null;
    }
  };
}

export type { GeoJSONFeature };
