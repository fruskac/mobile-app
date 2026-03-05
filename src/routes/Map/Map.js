// @flow

import React, { PureComponent } from "react";
import {
  Platform,
  PermissionsAndroid,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
  StyleSheet
} from "react-native";
import { WebView } from "react-native-webview";
import Geolocation from "@react-native-community/geolocation";
import CommonStyles from "../../styles/CommonStyles";
import { LocationsList, Location } from "../../types";
import MapBox, { isMapboxAvailable } from "../../maps/mapboxSafe";
import { OFFLINE_MAPBOX_STYLE_URL } from "../../maps/offlineConfig";

import {
  miscMap,
  springsMap,
  picnicareasMap,
  monumentsMap,
  lakesMap,
  monasteriesMap,
  lookoutsMap,
  meadowsMap,
  waterfallsMap,
  fishpondsMap,
  colors as MAP_COLORS
} from "../../styles/Icons";

const MAP_IMAGES = {
  miscMap,
  springsMap,
  picnicareasMap,
  monumentsMap,
  lakesMap,
  monasteriesMap,
  lookoutsMap,
  meadowsMap,
  waterfallsMap,
  fishpondsMap
};

const normalizeTag = tag => String(tag || "").replace(/-/g, "");

const iconKeyForTag = tag => {
  const preferred = `${normalizeTag(tag)}Map`;
  if (MAP_IMAGES[preferred]) return preferred;
  if (MAP_IMAGES.miscMap) return "miscMap";
  return null;
};

type Props = {
  locations: LocationsList,
  locationItems: Array<any>,
  language: string,
  tags: Array<string>
};
type State = {
  showMap: boolean,
  userLocation: Location,
  webMapFailed: boolean,
  webMapRetryCount: number,
  selectedLocationTitle: ?string
};

const emptyFeatureCollection = {
  type: "FeatureCollection",
  features: []
};

const isValidMapImage = image =>
  typeof image === "number" ||
  (typeof image === "string" && image.length > 0) ||
  (!!image && typeof image === "object");
const resolveMapImageForShapeSource = image => {
  if (!isValidMapImage(image)) return null;
  if (typeof image === "string") return image;
  if (Image && typeof Image.resolveAssetSource === "function") {
    const resolved = Image.resolveAssetSource(image);
    if (resolved && typeof resolved.uri === "string" && resolved.uri.length > 0) {
      return resolved.uri;
    }
  }
  return image;
};
const FORCE_FALLBACK_MAP = Platform.OS === "android";
const USE_WEBVIEW_FALLBACK_ON_ANDROID = true;

const styles = StyleSheet.create({
  pointAnnotationContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.96)",
    borderWidth: 1,
    borderColor: "#d8d8d8",
    alignItems: "center",
    justifyContent: "center"
  },
  pointAnnotationIcon: {
    width: 24,
    height: 24
  }
});

class Map extends PureComponent<Props, State> {
  _map: MapBox;
  _watchPositionId: number;
  _showTimer: ?TimeoutID;
  _hideLocationTitleTimer: ?TimeoutID;
  _webFallbackRef: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      showMap: false,
      userLocation: { lat: 0, lng: 0 },
      webMapFailed: false,
      webMapRetryCount: 0,
      selectedLocationTitle: null
    };
    this._showTimer = null;
    this._hideLocationTitleTimer = null;
    this._webFallbackRef = null;
    this.onFallbackWebMessage = this.onFallbackWebMessage.bind(this);
  }

  componentDidMount() {
    this.startLocationTracking();

    // show map only after navigator animation finishes
    this._showTimer = setTimeout(() => {
      this.setState({ showMap: true });
    }, 300);
  }

  componentWillUnmount() {
    const geolocation = this.getNativeGeolocation();
    if (
      this._watchPositionId != null &&
      geolocation &&
      typeof geolocation.clearWatch === "function"
    ) {
      geolocation.clearWatch(this._watchPositionId);
    }
    if (this._showTimer) {
      clearTimeout(this._showTimer);
      this._showTimer = null;
    }
    if (this._hideLocationTitleTimer) {
      clearTimeout(this._hideLocationTitleTimer);
      this._hideLocationTitleTimer = null;
    }
  }

  getNativeGeolocation() {
    const communityGeolocation =
      Geolocation && typeof Geolocation.getCurrentPosition === "function"
        ? Geolocation
        : null;
    if (communityGeolocation) {
      return communityGeolocation;
    }

    const globalGeolocation =
      typeof navigator !== "undefined" &&
      navigator &&
      navigator.geolocation &&
      typeof navigator.geolocation.getCurrentPosition === "function"
        ? navigator.geolocation
        : null;
    return globalGeolocation;
  }

  requestSingleLocationFix(centerOnMap: boolean = false) {
    const geolocation = this.getNativeGeolocation();
    if (!geolocation || typeof geolocation.getCurrentPosition !== "function") {
      return;
    }

    geolocation.getCurrentPosition(
      position => {
        const lat =
          position && position.coords ? Number(position.coords.latitude) : NaN;
        const lng =
          position && position.coords ? Number(position.coords.longitude) : NaN;
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          return;
        }
        this.setState({
          userLocation: {
            lat,
            lng
          }
        });
        this.pushUserLocationToFallbackMap(lat, lng);
        if (centerOnMap) {
          this.centerUserLocationOnFallbackMap();
        }
      },
      error => console.log("Single location fix error", error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 3000 }
    );
  }

  async startLocationTracking() {
    const hasPermission = await this.ensureLocationPermission();
    const geolocation = this.getNativeGeolocation();
    if (!hasPermission || !geolocation) {
      return;
    }

    this.requestSingleLocationFix(false);
    this._watchPositionId = geolocation.watchPosition(
      position => {
        const lat = Number(position.coords.latitude);
        const lng = Number(position.coords.longitude);
        this.setState({
          userLocation: {
            lat,
            lng
          }
        });
        this.pushUserLocationToFallbackMap(lat, lng);
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  centerUserLocationOnFallbackMap() {
    if (
      !this._webFallbackRef ||
      typeof this._webFallbackRef.injectJavaScript !== "function"
    ) {
      return;
    }
    this._webFallbackRef.injectJavaScript(
      "window.__centerOnUserLocation && window.__centerOnUserLocation(); true;"
    );
  }

  pushUserLocationToFallbackMap(lat: number, lng: number) {
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return;
    }
    if (
      !this._webFallbackRef ||
      typeof this._webFallbackRef.injectJavaScript !== "function"
    ) {
      return;
    }

    this._webFallbackRef.injectJavaScript(
      `window.__updateUserLocation && window.__updateUserLocation(${lat}, ${lng}); true;`
    );
  }

  async ensureLocationPermission() {
    if (Platform.OS === "ios") {
      try {
        if (Geolocation && typeof Geolocation.setRNConfiguration === "function") {
          Geolocation.setRNConfiguration({
            skipPermissionRequests: false,
            authorizationLevel: "whenInUse"
          });
        }
        if (Geolocation && typeof Geolocation.requestAuthorization === "function") {
          const status = Geolocation.requestAuthorization("whenInUse");
          if (status && typeof status.then === "function") {
            const resolvedStatus = await status;
            return (
              resolvedStatus === "granted" ||
              resolvedStatus === "authorizedWhenInUse" ||
              resolvedStatus === "authorizedAlways" ||
              resolvedStatus === "whenInUse"
            );
          }
        }
        return true;
      } catch (err) {
        console.log("iOS location permission error", err);
        return false;
      }
    }

    if (Platform.OS !== "android" || Platform.Version < 23) {
      return true;
    }

    try {
      const fine = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
      const coarse = PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION;

      const alreadyGrantedFine = await PermissionsAndroid.check(fine);
      const alreadyGrantedCoarse = await PermissionsAndroid.check(coarse);
      if (alreadyGrantedFine || alreadyGrantedCoarse) {
        return true;
      }

      const granted = await PermissionsAndroid.request(fine, {
        title: "Location permission",
        message: "Fruskac needs location access to show your position on map.",
        buttonPositive: "Allow",
        buttonNegative: "Deny"
      });

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.log("Location permission error", err);
      return false;
    }
  }

  onFallbackWebMessage(event: any) {
    const data =
      event &&
      event.nativeEvent &&
      typeof event.nativeEvent.data !== "undefined"
        ? event.nativeEvent.data
        : null;
    if (data == null) {
      return;
    }

    let payload = data;
    if (typeof data === "string") {
      try {
        payload = JSON.parse(data);
      } catch (err) {
        payload = data;
      }
    }

    const type = payload && typeof payload === "object" ? payload.type : payload;
    if (type === "REQUEST_USER_LOCATION") {
      const shouldCenter =
        !!(payload && typeof payload === "object" && payload.center);
      this.requestSingleLocationFix(shouldCenter);
      return;
    }
    if (type === "CENTER_ON_USER_LOCATION") {
      this.centerUserLocationOnFallbackMap();
    }
  }

  openExternalMap(lat: number, lng: number) {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url).catch(() => {});
  }

  showSelectedLocationTitle(title: ?string) {
    if (!title) return;
    this.setState({ selectedLocationTitle: String(title) });
    if (this._hideLocationTitleTimer) {
      clearTimeout(this._hideLocationTitleTimer);
    }
    this._hideLocationTitleTimer = setTimeout(() => {
      this.setState({ selectedLocationTitle: null });
    }, 2500);
  }

  buildFallbackMapHtml(
    points: Array<any>,
    defaultIconUrl: ?string,
    useLiteMarkers: boolean,
    userLocation: ?{ lat: number, lng: number, title?: string }
  ) {
    const safePoints = Array.isArray(points) ? points : [];
    const pointsJson = JSON.stringify(safePoints).replace(/</g, "\\u003c");
    const safeDefaultIconUrl =
      typeof defaultIconUrl === "string" && defaultIconUrl.length > 0 ? defaultIconUrl : "";
    const defaultIconJson = JSON.stringify(safeDefaultIconUrl).replace(/</g, "\\u003c");
    const useLiteMarkersJson = JSON.stringify(!!useLiteMarkers).replace(/</g, "\\u003c");
    const userLocationJson = JSON.stringify(userLocation || null).replace(/</g, "\\u003c");
    return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css"/>
    <style>
      html, body { margin: 0; padding: 0; width: 100%; height: 100%; }
      body { background: #ececeb; color: #454546; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      #map { position: absolute; inset: 0; display: none; }
      #fallback {
        position: absolute;
        inset: 0;
        overflow: auto;
        background: #ececeb;
        padding: 14px;
        box-sizing: border-box;
      }
      #fallback h3 { margin: 0 0 10px 0; font-size: 16px; }
      #fallback p { margin: 0 0 10px 0; font-size: 14px; }
      #fallback ul { margin: 0; padding-left: 18px; }
      #fallback li { margin-bottom: 8px; font-size: 14px; }
      #fallback a { color: #0066ff; text-decoration: underline; }
      .fr-pin-wrap {
        background: transparent;
        border: none;
      }
      .fr-pin {
        width: 26px;
        height: 26px;
        border-radius: 13px;
        border: 1px solid rgba(255,255,255,0.9);
        box-shadow: 0 1px 4px rgba(0,0,0,0.24);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        position: relative;
        overflow: hidden;
      }
      .fr-pin img {
        width: 22px;
        height: 22px;
        object-fit: contain;
      }
      .fr-pin-label {
        position: absolute;
        inset: 0;
        display: none;
        align-items: center;
        justify-content: center;
      }
      .fr-pin.icon-failed .fr-pin-label {
        display: flex;
      }
      #map.offline-grid {
        background: linear-gradient(180deg, #f4f5f1 0%, #e6eadf 100%);
      }
      #offline-surface {
        position: absolute;
        inset: 10px;
        border: 1px solid rgba(69, 69, 70, 0.25);
        border-radius: 8px;
        background:
          linear-gradient(rgba(69, 69, 70, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(69, 69, 70, 0.08) 1px, transparent 1px);
        background-size: 44px 44px;
        overflow: hidden;
      }
      #offline-title {
        position: absolute;
        left: 12px;
        right: 12px;
        bottom: 12px;
        font-size: 12px;
        line-height: 16px;
        color: #2b2b2c;
        background: rgba(255, 255, 255, 0.92);
        border-radius: 6px;
        padding: 8px 10px;
      }
      .offline-pin-button {
        position: absolute;
        transform: translate(-50%, -50%);
        border: none;
        background: transparent;
        padding: 0;
        margin: 0;
      }
      .offline-pin-marker {
        width: 28px;
        height: 28px;
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.94);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.22);
        background: #d04339;
        color: #fff;
        font-size: 11px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
      }
      .offline-pin-marker img {
        width: 22px;
        height: 22px;
        object-fit: contain;
      }
      .offline-pin-label {
        position: absolute;
        inset: 0;
        display: none;
        align-items: center;
        justify-content: center;
      }
      .offline-pin-marker.icon-failed .offline-pin-label {
        display: flex;
      }
      .offline-pin-marker-user {
        width: 32px;
        height: 32px;
        border-radius: 16px;
        border: 2px solid rgba(255, 255, 255, 0.96);
        background: #2d7ff9;
        font-size: 16px;
      }
      #my-location-btn {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 36px;
        height: 36px;
        border: none;
        border-radius: 18px;
        background: rgba(45, 127, 249, 0.96);
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.28);
        z-index: 9999;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div id="fallback">
      <h3>Mapa trenutno nije dostupna.</h3>
      <p>Otvorite lokaciju u Google Maps:</p>
      <ul id="fallback-list"></ul>
    </div>
    <div id="map"></div>
    <script>
      var points = ${pointsJson};
      var fallbackList = document.getElementById("fallback-list");
      if (!points.length) {
        var li = document.createElement("li");
        li.textContent = "Nema dostupnih lokacija.";
        fallbackList.appendChild(li);
      } else {
        points.slice(0, 40).forEach(function (p, i) {
          if (!p || !Number.isFinite(p.lat) || !Number.isFinite(p.lng)) return;
          var li = document.createElement("li");
          var a = document.createElement("a");
          a.href = "https://www.google.com/maps/search/?api=1&query=" + p.lat + "," + p.lng;
          a.textContent = p.title || ("Location " + (i + 1));
          a.target = "_blank";
          li.appendChild(a);
          fallbackList.appendChild(li);
        });
      }
    </script>
    <script>
      var useLiteMarkers = ${useLiteMarkersJson};
      var userLocation = ${userLocationJson};
      var userMarker = null;
      var hasCenteredOnUser = false;
      var geolocationWatchId = null;
      var activeLeafletMap = null;

      var escapeHtml = function (value) {
        return String(value || "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");
      };

      var createPinHtml = function (iconUrl, color, label) {
        var safeLabel = escapeHtml((label || "•").toString().slice(0, 1).toUpperCase());
        var safeColor = escapeHtml(color || "#d04339");
        var safeUrl = iconUrl ? escapeHtml(iconUrl) : "";
        var hasIcon = !!safeUrl;
        var className = hasIcon ? "fr-pin" : "fr-pin icon-failed";
        var imgHtml = hasIcon
          ? '<img src="' +
            safeUrl +
            '" onerror="this.style.display=\\'none\\'; this.parentNode.className=\\'fr-pin icon-failed\\';" />'
          : "";
        return (
          '<div class="' +
          className +
          '" style="background:' +
          safeColor +
          '">' +
          imgHtml +
          '<span class="fr-pin-label">' +
          safeLabel +
          "</span></div>"
        );
      };

      var createMarkerIcon = function (iconUrl, color, label) {
        return L.divIcon({
          className: "fr-pin-wrap",
          html: createPinHtml(iconUrl, color, label),
          iconSize: [26, 26],
          iconAnchor: [13, 13],
          popupAnchor: [0, -12]
        });
      };

      var createUserIcon = function () {
        return L.divIcon({
          className: "fr-pin-wrap",
          html: '<div class="fr-pin" style="background:#2d7ff9"><span class="fr-pin-label" style="display:flex">◎</span></div>',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, -12]
        });
      };

      var upsertUserLocationOnLeaflet = function (map, lat, lng, shouldCenter) {
        if (!map || !Number.isFinite(lat) || !Number.isFinite(lng)) return;
        userLocation = {
          lat: lat,
          lng: lng,
          title: "Tvoja lokacija"
        };
        if (!userMarker) {
          userMarker = L.marker([lat, lng], { icon: createUserIcon() }).addTo(map);
          userMarker.bindPopup("Tvoja lokacija");
          userMarker.on("click", function () {
            map.setView([lat, lng], Math.max(map.getZoom(), 12));
          });
        } else {
          userMarker.setLatLng([lat, lng]);
        }
        if (shouldCenter && !hasCenteredOnUser) {
          map.setView([lat, lng], Math.max(map.getZoom(), 11));
          hasCenteredOnUser = true;
        }
      };

      var requestUserLocation = function (shouldCenter) {
        if (!navigator.geolocation) {
          return;
        }
        navigator.geolocation.getCurrentPosition(
          function (position) {
            if (!position || !position.coords) return;
            var lat = Number(position.coords.latitude);
            var lng = Number(position.coords.longitude);
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
            if (activeLeafletMap) {
              upsertUserLocationOnLeaflet(activeLeafletMap, lat, lng, !!shouldCenter);
            } else {
              userLocation = {
                lat: lat,
                lng: lng,
                title: "Tvoja lokacija"
              };
            }
          },
          function () {},
          {
            enableHighAccuracy: true,
            timeout: 12000,
            maximumAge: 5000
          }
        );
      };

      window.__updateUserLocation = function (lat, lng) {
        var numLat = Number(lat);
        var numLng = Number(lng);
        if (!Number.isFinite(numLat) || !Number.isFinite(numLng)) {
          return;
        }
        userLocation = {
          lat: numLat,
          lng: numLng,
          title: "Tvoja lokacija"
        };
        if (activeLeafletMap) {
          upsertUserLocationOnLeaflet(activeLeafletMap, numLat, numLng, false);
        }
      };

      window.__centerOnUserLocation = function () {
        if (!activeLeafletMap) return;
        if (userMarker) {
          var latLng = userMarker.getLatLng();
          activeLeafletMap.setView(
            [latLng.lat, latLng.lng],
            Math.max(activeLeafletMap.getZoom(), 12)
          );
          userMarker.openPopup();
          return;
        }
        if (
          userLocation &&
          Number.isFinite(userLocation.lat) &&
          Number.isFinite(userLocation.lng)
        ) {
          activeLeafletMap.setView(
            [Number(userLocation.lat), Number(userLocation.lng)],
            Math.max(activeLeafletMap.getZoom(), 12)
          );
        }
      };

      var startGeoWatch = function (map) {
        if (!navigator.geolocation || geolocationWatchId != null) return;
        geolocationWatchId = navigator.geolocation.watchPosition(
          function (position) {
            if (!position || !position.coords) return;
            upsertUserLocationOnLeaflet(
              map,
              Number(position.coords.latitude),
              Number(position.coords.longitude),
              true
            );
          },
          function () {},
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 5000
          }
        );
      };

      var initOfflineMap = function () {
        var mapEl = document.getElementById("map");
        var fallbackEl = document.getElementById("fallback");
        mapEl.style.display = "block";
        mapEl.className = "offline-grid";
        mapEl.innerHTML = "";

        var surface = document.createElement("div");
        surface.id = "offline-surface";
        mapEl.appendChild(surface);

        var title = document.createElement("div");
        title.id = "offline-title";
        title.textContent = "Offline mapa aktivna.";
        mapEl.appendChild(title);

        var validPoints = points.filter(function (p) {
          return p && Number.isFinite(p.lat) && Number.isFinite(p.lng);
        });
        var hasUserLocation =
          userLocation &&
          Number.isFinite(userLocation.lat) &&
          Number.isFinite(userLocation.lng);
        var pointsForBounds = hasUserLocation
          ? validPoints.concat([
              {
                lat: userLocation.lat,
                lng: userLocation.lng
              }
            ])
          : validPoints;

        if (!pointsForBounds.length) {
          title.textContent = "Offline mapa: nema dostupnih lokacija.";
          fallbackEl.style.display = "none";
          return;
        }

        var minLat = pointsForBounds[0].lat;
        var maxLat = pointsForBounds[0].lat;
        var minLng = pointsForBounds[0].lng;
        var maxLng = pointsForBounds[0].lng;
        pointsForBounds.forEach(function (p) {
          minLat = Math.min(minLat, p.lat);
          maxLat = Math.max(maxLat, p.lat);
          minLng = Math.min(minLng, p.lng);
          maxLng = Math.max(maxLng, p.lng);
        });

        var latSpan = Math.max(maxLat - minLat, 0.02);
        var lngSpan = Math.max(maxLng - minLng, 0.02);
        minLat = minLat - latSpan * 0.06;
        maxLat = maxLat + latSpan * 0.06;
        minLng = minLng - lngSpan * 0.06;
        maxLng = maxLng + lngSpan * 0.06;

        validPoints.forEach(function (p, index) {
          var lngRatio = (p.lng - minLng) / (maxLng - minLng);
          var latRatio = (p.lat - minLat) / (maxLat - minLat);
          if (!Number.isFinite(lngRatio) || !Number.isFinite(latRatio)) {
            return;
          }
          var x = Math.max(2, Math.min(98, lngRatio * 100));
          var y = Math.max(2, Math.min(98, (1 - latRatio) * 100));

          var markerButton = document.createElement("button");
          markerButton.type = "button";
          markerButton.className = "offline-pin-button";
          markerButton.style.left = x + "%";
          markerButton.style.top = y + "%";

          var marker = document.createElement("span");
          marker.className = "offline-pin-marker";
          marker.style.background = p && p.color ? String(p.color) : "#d04339";

          var iconUrl = p && typeof p.iconUrl === "string" ? p.iconUrl : "";
          var label = document.createElement("span");
          label.className = "offline-pin-label";
          label.textContent =
            p && p.iconLabel ? String(p.iconLabel).slice(0, 1).toUpperCase() : "•";
          marker.appendChild(label);
          if (!useLiteMarkers && iconUrl) {
            var img = document.createElement("img");
            img.src = iconUrl;
            img.alt = p && p.title ? String(p.title) : "location";
            img.onerror = function () {
              if (this && this.style) this.style.display = "none";
              if (this && this.parentNode) {
                this.parentNode.className = "offline-pin-marker icon-failed";
              }
            };
            marker.appendChild(img);
          } else {
            marker.className = "offline-pin-marker icon-failed";
          }

          markerButton.appendChild(marker);
          markerButton.addEventListener("click", function () {
            title.textContent =
              (p && p.title ? String(p.title) : "Location " + (index + 1)) +
              " (" +
              Number(p.lat).toFixed(5) +
              ", " +
              Number(p.lng).toFixed(5) +
              ")";
          });
          surface.appendChild(markerButton);
        });

        if (hasUserLocation) {
          var userLngRatio = (userLocation.lng - minLng) / (maxLng - minLng);
          var userLatRatio = (userLocation.lat - minLat) / (maxLat - minLat);
          if (Number.isFinite(userLngRatio) && Number.isFinite(userLatRatio)) {
            var userX = Math.max(2, Math.min(98, userLngRatio * 100));
            var userY = Math.max(2, Math.min(98, (1 - userLatRatio) * 100));
            var userButton = document.createElement("button");
            userButton.type = "button";
            userButton.className = "offline-pin-button";
            userButton.style.left = userX + "%";
            userButton.style.top = userY + "%";

            var userMarker = document.createElement("span");
            userMarker.className = "offline-pin-marker offline-pin-marker-user";
            userMarker.textContent = "◎";
            userButton.appendChild(userMarker);
            userButton.addEventListener("click", function () {
              title.textContent =
                (userLocation.title || "Tvoja lokacija") +
                " (" +
                Number(userLocation.lat).toFixed(5) +
                ", " +
                Number(userLocation.lng).toFixed(5) +
                ")";
            });
            surface.appendChild(userButton);
          }
        }

        fallbackEl.style.display = "none";
      };
      var initMap = function () {
        if (!window.L) return;
        var mapEl = document.getElementById("map");
        mapEl.style.display = "block";
        var map = L.map("map", { zoomControl: true }).setView([45.1571, 19.7093], 10);
        activeLeafletMap = map;
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution: "&copy; OpenStreetMap contributors"
        }).addTo(map);
        var defaultIconUrl = ${defaultIconJson};
        var orderedPoints = points.slice().sort(function (a, b) {
          var aIsSpring = a && a.tag === "springs" ? 1 : 0;
          var bIsSpring = b && b.tag === "springs" ? 1 : 0;
          return aIsSpring - bIsSpring;
        });
        orderedPoints.forEach(function (p) {
          if (!p || !Number.isFinite(p.lat) || !Number.isFinite(p.lng)) return;
          var marker;
          if (useLiteMarkers) {
            var isSpring = p.tag === "springs";
            marker = L.circleMarker([p.lat, p.lng], {
              radius: isSpring ? 8 : 6,
              color: "#ffffff",
              weight: 1.4,
              fillColor: p.color || "#d04339",
              fillOpacity: isSpring ? 1 : 0.92
            }).addTo(map);
          } else {
            var markerIcon = createMarkerIcon(
              p.iconUrl || defaultIconUrl,
              p.color,
              p.iconLabel
            );
            marker = markerIcon
              ? L.marker([p.lat, p.lng], { icon: markerIcon }).addTo(map)
              : L.marker([p.lat, p.lng]).addTo(map);
          }
          if (p.title) {
            marker.bindPopup(String(p.title));
          }
        });

        if (userLocation && Number.isFinite(userLocation.lat) && Number.isFinite(userLocation.lng)) {
          upsertUserLocationOnLeaflet(map, Number(userLocation.lat), Number(userLocation.lng), false);
        }

        startGeoWatch(map);
        requestUserLocation(false);

        var locBtn = document.createElement("button");
        locBtn.type = "button";
        locBtn.id = "my-location-btn";
        locBtn.textContent = "◎";
        locBtn.onclick = function () {
          if (userMarker) {
            var latLng = userMarker.getLatLng();
            map.setView([latLng.lat, latLng.lng], Math.max(map.getZoom(), 12));
            userMarker.openPopup();
          } else if (userLocation && Number.isFinite(userLocation.lat) && Number.isFinite(userLocation.lng)) {
            map.setView([Number(userLocation.lat), Number(userLocation.lng)], Math.max(map.getZoom(), 12));
          } else {
            if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
              try {
                window.ReactNativeWebView.postMessage(
                  JSON.stringify({
                    type: "REQUEST_USER_LOCATION",
                    center: true
                  })
                );
              } catch (e) {}
            }
            requestUserLocation(true);
          }
        };
        document.body.appendChild(locBtn);

        setTimeout(function () {
          map.invalidateSize(true);
        }, 50);
        setTimeout(function () {
          map.invalidateSize(true);
        }, 350);
        window.addEventListener("resize", function () {
          map.invalidateSize(true);
        });
        document.getElementById("fallback").style.display = "none";
      };
      (function loadLeaflet() {
        if (window.L) {
          initMap();
          return;
        }
        var sources = [
          "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
          "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js"
        ];
        var index = 0;
        var tryNext = function () {
          if (index >= sources.length) {
            initOfflineMap();
            return;
          }
          var script = document.createElement("script");
          script.src = sources[index++];
          script.async = true;
          script.onload = function () {
            initMap();
          };
          script.onerror = function () {
            tryNext();
          };
          document.body.appendChild(script);
        };
        tryNext();
      })();
    </script>
  </body>
</html>`;
  }

  renderFallbackMap(shapeForFallback: any) {
    const { locationItems, language } = this.props;
    const items = Array.isArray(locationItems) ? locationItems : [];
    const itemsById = items.reduce((acc, item) => {
      if (!item || !item.data || item.data.id == null) {
        return acc;
      }
      acc[String(item.data.id)] = item;
      return acc;
    }, {});
    const shapeFeatures =
      shapeForFallback &&
      shapeForFallback.type === "FeatureCollection" &&
      Array.isArray(shapeForFallback.features)
        ? shapeForFallback.features
        : [];
    const mapPointsFromShape = shapeFeatures
      .map((feature, index) => {
        if (!feature || !feature.geometry || !Array.isArray(feature.geometry.coordinates)) {
          return null;
        }
        const coordinates = feature.geometry.coordinates;
        const lng = parseFloat(coordinates[0]);
        const lat = parseFloat(coordinates[1]);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          return null;
        }

        const props = feature.properties && typeof feature.properties === "object" ? feature.properties : {};
        const locationId =
          feature.id != null
            ? String(feature.id)
            : props.locationId != null
            ? String(props.locationId)
            : props.id != null
            ? String(props.id)
            : null;
        const linkedItem = locationId ? itemsById[locationId] : null;

        const title =
          props[`title_${language}`] ||
          props.title ||
          props.title_sr ||
          props.title_en ||
          (linkedItem &&
            linkedItem.data &&
            (linkedItem.data[`title_${language}`] ||
              linkedItem.data.title ||
              linkedItem.data.title_sr ||
              linkedItem.data.title_en)) ||
          `Location ${index + 1}`;

        const rawIcon = typeof props.icon === "string" && props.icon.length > 0 ? props.icon : null;
        const linkedTag = linkedItem && linkedItem.tag ? String(linkedItem.tag) : "";
        const normalizedTagFromIcon = rawIcon ? normalizeTag(String(rawIcon).replace(/Map$/, "")) : "";
        const normalizedTag = linkedTag ? normalizeTag(linkedTag) : normalizedTagFromIcon;
        const resolvedIconKey =
          rawIcon && MAP_IMAGES[rawIcon]
            ? rawIcon
            : iconKeyForTag(normalizedTag || normalizedTagFromIcon || linkedTag);
        const iconSource = resolvedIconKey ? MAP_IMAGES[resolvedIconKey] : null;
        const iconUri =
          iconSource && Image && typeof Image.resolveAssetSource === "function"
            ? (Image.resolveAssetSource(iconSource) || {}).uri
            : null;

        return {
          lat,
          lng,
          title,
          tag: normalizedTag || "",
          iconUrl: iconUri || null,
          iconLabel: (normalizedTag || "•").slice(0, 1).toUpperCase(),
          color: MAP_COLORS[normalizedTag] || MAP_COLORS.misc || "#d04339"
        };
      })
      .filter(Boolean);
    const mapPointsFromItems = items
      .map((item, index) => {
        if (!item || !item.data || item.lat == null || item.lng == null) {
          return null;
        }
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lng);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          return null;
        }
        const title =
          item.data[`title_${language}`] ||
          item.data.title ||
          item.data.title_sr ||
          item.data.title_en ||
          `Location ${index + 1}`;
        const normalizedTag = normalizeTag(item.tag);
        const resolvedIconKey = iconKeyForTag(item.tag);
        const iconSource = resolvedIconKey ? MAP_IMAGES[resolvedIconKey] : null;
        const iconUri =
          iconSource && Image && typeof Image.resolveAssetSource === "function"
            ? (Image.resolveAssetSource(iconSource) || {}).uri
            : null;
        return {
          lat,
          lng,
          title,
          tag: normalizedTag || "",
          iconUrl: iconUri || null,
          iconLabel: (normalizedTag || "•").slice(0, 1).toUpperCase(),
          color: MAP_COLORS[normalizedTag] || MAP_COLORS.misc || "#d04339"
        };
      })
      .filter(Boolean);
    const mapPoints = mapPointsFromShape.length > 0 ? mapPointsFromShape : mapPointsFromItems;
    const prioritizedPoints = mapPoints.slice().sort((a, b) => {
      const aScore = a && a.tag === "springs" ? 1 : 0;
      const bScore = b && b.tag === "springs" ? 1 : 0;
      return bScore - aScore;
    });
    const androidPointCaps = [420, 260, 140, 70];
    const androidCapIndex = Math.min(this.state.webMapRetryCount, androidPointCaps.length - 1);
    const maxPointsForWebMap =
      Platform.OS === "android" ? androidPointCaps[androidCapIndex] : 1200;
    const mapPointsForWebMap = prioritizedPoints.slice(0, maxPointsForWebMap);
    const useLiteMarkers =
      Platform.OS === "android" && this.state.webMapRetryCount >= 2;
    const previewItems = mapPoints.slice(0, 12);
    const userLocationPoint =
      Number.isFinite(this.state.userLocation.lat) &&
      Number.isFinite(this.state.userLocation.lng) &&
      (Math.abs(this.state.userLocation.lat) > 0.000001 ||
        Math.abs(this.state.userLocation.lng) > 0.000001)
        ? {
            lat: this.state.userLocation.lat,
            lng: this.state.userLocation.lng,
            title: "Tvoja lokacija"
          }
        : null;
    const defaultIconUri =
      Image && typeof Image.resolveAssetSource === "function"
        ? (Image.resolveAssetSource(MAP_IMAGES.miscMap) || {}).uri
        : null;

    const canUseWebViewFallback =
      WebView &&
      (Platform.OS === "android" || !this.state.webMapFailed) &&
      (Platform.OS !== "android" || USE_WEBVIEW_FALLBACK_ON_ANDROID);

    if (canUseWebViewFallback) {
      return (
        <View style={CommonStyles.container}>
          <WebView
            key={`fallback-map-${this.state.webMapRetryCount}`}
            ref={ref => {
              this._webFallbackRef = ref;
            }}
            originWhitelist={["*"]}
            source={{
              html: this.buildFallbackMapHtml(
                mapPointsForWebMap,
                defaultIconUri,
                useLiteMarkers,
                userLocationPoint
              )
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mixedContentMode="always"
            allowsInlineMediaPlayback={true}
            allowFileAccess={true}
            allowFileAccessFromFileURLs={true}
            allowUniversalAccessFromFileURLs={true}
            cacheEnabled={true}
            startInLoadingState={false}
            onMessage={this.onFallbackWebMessage}
            onError={() => {
              if (Platform.OS === "android") {
                if (this.state.webMapRetryCount < 3) {
                  this.setState(prevState => ({
                    webMapRetryCount: prevState.webMapRetryCount + 1
                  }));
                }
                return;
              }
              if (!this.state.webMapFailed) {
                this.setState({ webMapFailed: true });
              }
            }}
            onHttpError={() => {
              if (Platform.OS === "android") {
                if (this.state.webMapRetryCount < 3) {
                  this.setState(prevState => ({
                    webMapRetryCount: prevState.webMapRetryCount + 1
                  }));
                }
                return;
              }
              if (!this.state.webMapFailed) {
                this.setState({ webMapFailed: true });
              }
            }}
            onRenderProcessGone={() => {
              if (Platform.OS === "android") {
                if (this.state.webMapRetryCount < 3) {
                  this.setState(prevState => ({
                    webMapRetryCount: prevState.webMapRetryCount + 1
                  }));
                }
                return;
              }
              if (!this.state.webMapFailed) {
                this.setState({ webMapFailed: true });
              }
            }}
          />
        </View>
      );
    }

    return (
      <View style={CommonStyles.container}>
        <ScrollView>
          <View style={CommonStyles.viewMargin}>
            <Text style={CommonStyles.text}>
              Native mapa nije dostupna na ovoj konfiguraciji aplikacije.
            </Text>
            <TouchableOpacity
              onPress={() => this.openExternalMap(45.1571, 19.7093)}
              style={{ marginTop: 12 }}
            >
              <Text style={[CommonStyles.text, { textDecorationLine: "underline" }]}>
                Otvori interaktivnu mapu
              </Text>
            </TouchableOpacity>
            {previewItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={`${item.title}-${index}`}
                  onPress={() => this.openExternalMap(item.lat, item.lng)}
                  style={{ marginTop: 10 }}
                >
                  <Text style={[CommonStyles.text, { textDecorationLine: "underline" }]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

  render() {
    const { locations, locationItems, language } = this.props;
    const safeShape =
      locations && locations.type === "FeatureCollection" && Array.isArray(locations.features)
        ? locations
        : emptyFeatureCollection;
    const availableMapImages = Object.keys(MAP_IMAGES).reduce((acc, key) => {
      const imageForShapeSource = resolveMapImageForShapeSource(MAP_IMAGES[key]);
      if (isValidMapImage(imageForShapeSource)) {
        acc[key] = imageForShapeSource;
      }
      return acc;
    }, {});
    const safeShapeWithIcons = {
      ...safeShape,
      features: safeShape.features.map(feature => {
        if (!feature || typeof feature !== "object") {
          return feature;
        }
        const props =
          feature.properties && typeof feature.properties === "object" ? feature.properties : {};
        const currentIcon = props.icon;
        const fallbackIcon = iconKeyForTag(currentIcon ? String(currentIcon).replace(/Map$/, "") : "");
        return {
          ...feature,
          properties: {
            ...props,
            icon: currentIcon && availableMapImages[currentIcon] ? currentIcon : fallbackIcon
          }
        };
      })
    };
    const hasCircleLayer = !!(MapBox && MapBox.CircleLayer);
    const hasSymbolLayer = !!(MapBox && MapBox.SymbolLayer);
    const hasPointAnnotation = !!(MapBox && MapBox.PointAnnotation);
    const mapIconKeys = Object.keys(availableMapImages);
    const annotationItems = (Array.isArray(locationItems) ? locationItems : [])
      .map(item => {
        if (!item || !item.data || item.tag === "waterfalls") {
          return null;
        }
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lng);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          return null;
        }
        const iconKey = iconKeyForTag(item.tag);
        const iconSource = iconKey ? MAP_IMAGES[iconKey] : MAP_IMAGES.miscMap;
        const title =
          item.data[`title_${language}`] ||
          item.data.title ||
          item.data.title_sr ||
          item.data.title_en;
        return {
          id: String(item.data.id != null ? item.data.id : `${lat}-${lng}`),
          lat,
          lng,
          title: title ? String(title) : "",
          iconSource: iconSource || MAP_IMAGES.miscMap
        };
      })
      .filter(Boolean);
    const idToTitle = (Array.isArray(locationItems) ? locationItems : []).reduce((acc, item) => {
      if (!item || !item.data || item.data.id == null) {
        return acc;
      }
      const title =
        item.data[`title_${language}`] ||
        item.data.title ||
        item.data.title_sr ||
        item.data.title_en;
      if (title) {
        acc[String(item.data.id)] = title;
      }
      return acc;
    }, {});
    const onShapePress = event => {
      const evt = event && event.nativeEvent ? event.nativeEvent : event;
      const payload = evt && evt.payload ? evt.payload : null;
      const payloadObj =
        payload && typeof payload === "string"
          ? (() => {
              try {
                return JSON.parse(payload);
              } catch (err) {
                return null;
              }
            })()
          : payload;

      const feature =
        (payloadObj &&
          Array.isArray(payloadObj.features) &&
          payloadObj.features.length > 0 &&
          payloadObj.features[0]) ||
        (evt && Array.isArray(evt.features) && evt.features.length > 0 && evt.features[0]) ||
        (payloadObj && payloadObj.properties ? payloadObj : null) ||
        (evt && evt.properties ? evt : null) ||
        null;
      if (!feature) return;

      const props = feature.properties || {};
      const locationId =
        feature.id != null
          ? String(feature.id)
          : props.locationId != null
          ? String(props.locationId)
          : props.id != null
          ? String(props.id)
          : null;

      const title =
        props.title ||
        props[`title_${language}`] ||
        props.title_sr ||
        props.title_en ||
        (locationId ? idToTitle[locationId] : null);
      this.showSelectedLocationTitle(title);
    };

    if (!this.state.showMap) return null;
    if (FORCE_FALLBACK_MAP || !MapBox || !isMapboxAvailable()) {
      return this.renderFallbackMap(safeShapeWithIcons);
    }
    return (
      <View style={CommonStyles.container}>
        <MapBox.MapView
          zoomLevel={10}
          ref={c => (this._map = c)}
          minZoom={10}
          maxZoom={13}
          compassEnabled={true}
          zoomEnabled={true}
          showUserLocation={true}
          styleURL={OFFLINE_MAPBOX_STYLE_URL}
          centerCoordinate={[19.7093, 45.1571]}
          style={CommonStyles.container}
        >
          {hasPointAnnotation
            ? annotationItems.map(item => (
                <MapBox.PointAnnotation
                  key={`ann-${item.id}`}
                  id={`ann-${item.id}`}
                  coordinate={[item.lng, item.lat]}
                  title={item.title}
                  anchor={{ x: 0.5, y: 0.5 }}
                  onSelected={() => {
                    this.showSelectedLocationTitle(item.title);
                  }}
                >
                  <View style={styles.pointAnnotationContainer} collapsable={false}>
                    <Image
                      source={item.iconSource}
                      style={styles.pointAnnotationIcon}
                      resizeMode="contain"
                    />
                  </View>
                </MapBox.PointAnnotation>
              ))
            : null}
          <MapBox.ShapeSource
            id="exampleShapeSource"
            shape={safeShapeWithIcons}
            images={availableMapImages}
            onPress={onShapePress}
          >
            {hasCircleLayer ? (
              <MapBox.CircleLayer
                id="locationsFallbackDots"
                style={{
                  circleColor: "#d04339",
                  circleRadius: 4,
                  circleOpacity: 0.85,
                  circleStrokeColor: "#ffffff",
                  circleStrokeWidth: 1.3
                }}
              />
            ) : null}
            {hasSymbolLayer
              ? mapIconKeys.map(iconKey => (
                  <MapBox.SymbolLayer
                    key={`icon-layer-${iconKey}`}
                    id={`locationsIcons_${iconKey}`}
                    filter={["==", "icon", iconKey]}
                    style={{
                      iconImage: iconKey,
                      iconSize: 0.9,
                      iconAllowOverlap: true,
                      iconIgnorePlacement: true
                    }}
                  />
                ))
              : null}
          </MapBox.ShapeSource>
        </MapBox.MapView>
        {this.state.selectedLocationTitle ? (
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              left: 12,
              right: 12,
              bottom: 16,
              backgroundColor: "rgba(255,255,255,0.95)",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 6
            }}
          >
            <Text style={CommonStyles.text}>{this.state.selectedLocationTitle}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

export default Map;
