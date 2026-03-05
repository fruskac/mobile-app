import { NativeModules, UIManager } from "react-native";

function hasMapboxViewManager() {
  if (!UIManager) return false;

  if (typeof UIManager.getViewManagerConfig === "function") {
    return !!UIManager.getViewManagerConfig("RCTMGLMapView");
  }

  return !!UIManager.RCTMGLMapView;
}

export function isMapboxAvailable() {
  return !!(NativeModules && NativeModules.MGLModule) && hasMapboxViewManager();
}

let mapboxModule = null;

if (isMapboxAvailable()) {
  try {
    const resolved = require("@mapbox/react-native-mapbox-gl");
    mapboxModule = resolved && resolved.default ? resolved.default : resolved;
  } catch (err) {
    mapboxModule = null;
  }
}

export default mapboxModule;
