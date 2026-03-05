import { Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  getLatestMapPackage,
  type MapPackage,
  type MapPackageLocale,
  type MapPackagePlatform
} from "../api/mapPackages";

const STORAGE_PREFIX = "map_packages_registry_v1";

type SyncResult = {
  current: MapPackage | null;
  latest: MapPackage | null;
  needsUpdate: boolean;
};

function getStorageKey(platform: MapPackagePlatform, locale: MapPackageLocale): string {
  return `${STORAGE_PREFIX}:${platform}:${locale}`;
}

function compareSemver(a: string, b: string): number {
  const parse = (input: string): number[] =>
    input
      .split(".")
      .map(part => Number(part.replace(/[^0-9].*$/, "")))
      .filter(n => !Number.isNaN(n));

  const av = parse(a);
  const bv = parse(b);
  const len = Math.max(av.length, bv.length);

  for (let i = 0; i < len; i++) {
    const ai = av[i] || 0;
    const bi = bv[i] || 0;
    if (ai > bi) return 1;
    if (ai < bi) return -1;
  }
  return 0;
}

export function getCurrentPlatform(): MapPackagePlatform {
  if (Platform.OS === "ios") return "ios";
  return "android";
}

export async function getStoredMapPackage(
  platform: MapPackagePlatform,
  locale: MapPackageLocale
): Promise<MapPackage | null> {
  try {
    const raw = await AsyncStorage.getItem(getStorageKey(platform, locale));
    if (!raw) return null;
    return JSON.parse(raw) as MapPackage;
  } catch (err) {
    console.log("getStoredMapPackage error", err);
    return null;
  }
}

export async function setStoredMapPackage(
  platform: MapPackagePlatform,
  locale: MapPackageLocale,
  pkg: MapPackage
): Promise<void> {
  try {
    await AsyncStorage.setItem(getStorageKey(platform, locale), JSON.stringify(pkg));
  } catch (err) {
    console.log("setStoredMapPackage error", err);
  }
}

export async function clearStoredMapPackage(
  platform: MapPackagePlatform,
  locale: MapPackageLocale
): Promise<void> {
  try {
    await AsyncStorage.removeItem(getStorageKey(platform, locale));
  } catch (err) {
    console.log("clearStoredMapPackage error", err);
  }
}

export async function resolveMapPackageSync(
  platform: MapPackagePlatform,
  locale: MapPackageLocale
): Promise<SyncResult> {
  const current = await getStoredMapPackage(platform, locale);
  const latest = await getLatestMapPackage(platform, locale);

  const needsUpdate =
    Boolean(latest) &&
    (!current ||
      current.version !== latest.version ||
      compareSemver(latest.version, current.version) > 0);

  return {
    current,
    latest,
    needsUpdate
  };
}

export async function syncLatestMapPackageMetadata(
  platform: MapPackagePlatform,
  locale: MapPackageLocale
): Promise<SyncResult> {
  const result = await resolveMapPackageSync(platform, locale);

  if (result.latest && result.needsUpdate) {
    await setStoredMapPackage(platform, locale, result.latest);
  }

  return result;
}
