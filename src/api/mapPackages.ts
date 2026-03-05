import { ENV } from "../config/env";

export type MapPackagePlatform = "ios" | "android" | "web";
export type MapPackageLocale = string;

export type MapPackage = {
  id: string;
  version: string;
  platform: MapPackagePlatform;
  locale: MapPackageLocale;
  format: "mbtiles" | "pmtiles";
  remoteUrl: string;
  sizeBytes?: number;
  checksum?: string;
  bounds?: [number, number, number, number];
  minZoom?: number;
  maxZoom?: number;
  styleUrl?: string;
};

type PayloadListResponse<T> = {
  docs?: T[];
};

type RawMapPackage = {
  id?: string;
  version?: string;
  platform?: string;
  locale?: string;
  format?: string;
  remoteUrl?: string;
  packageUrl?: string;
  url?: string;
  sizeBytes?: number;
  checksum?: string;
  sha256?: string;
  bounds?: [number, number, number, number];
  minZoom?: number;
  maxZoom?: number;
  styleUrl?: string;
};

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, "");
}

function coerceMapPackage(raw: RawMapPackage): MapPackage | null {
  const remoteUrl = raw.remoteUrl || raw.packageUrl || raw.url;
  if (!raw.id || !raw.version || !raw.platform || !raw.locale || !raw.format || !remoteUrl) {
    return null;
  }

  if (raw.format !== "mbtiles" && raw.format !== "pmtiles") {
    return null;
  }

  return {
    id: String(raw.id),
    version: String(raw.version),
    platform: raw.platform as MapPackagePlatform,
    locale: String(raw.locale),
    format: raw.format,
    remoteUrl: String(remoteUrl),
    sizeBytes: typeof raw.sizeBytes === "number" ? raw.sizeBytes : undefined,
    checksum: raw.checksum || raw.sha256,
    bounds: raw.bounds,
    minZoom: typeof raw.minZoom === "number" ? raw.minZoom : undefined,
    maxZoom: typeof raw.maxZoom === "number" ? raw.maxZoom : undefined,
    styleUrl: raw.styleUrl
  };
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

async function requestLatestMapPackage(
  baseUrl: string,
  collectionSlug: string,
  platform: MapPackagePlatform,
  locale: MapPackageLocale
): Promise<MapPackage | null> {
  const encodedPlatform = encodeURIComponent(platform);
  const encodedLocale = encodeURIComponent(locale);

  const query = [
    `where[platform][equals]=${encodedPlatform}`,
    `where[locale][equals]=${encodedLocale}`,
    "limit=50"
  ].join("&");

  const url = `${baseUrl}/api/${collectionSlug}?${query}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Payload request failed (${response.status})`);
  }

  const data = (await response.json()) as PayloadListResponse<RawMapPackage> | RawMapPackage[];
  const docs = Array.isArray(data) ? data : data.docs || [];
  const normalized = docs
    .map(coerceMapPackage)
    .filter((pkg): pkg is MapPackage => Boolean(pkg))
    .sort((a, b) => compareSemver(b.version, a.version));

  return normalized.length > 0 ? normalized[0] : null;
}

export async function getLatestMapPackage(
  platform: MapPackagePlatform,
  locale: MapPackageLocale
): Promise<MapPackage | null> {
  if (!ENV.PAYLOAD_URL) return null;

  const baseUrl = normalizeBaseUrl(ENV.PAYLOAD_URL);
  const candidates = ["map_packages", "map-packages"];

  let lastError: Error | null = null;
  for (let i = 0; i < candidates.length; i++) {
    try {
      return await requestLatestMapPackage(
        baseUrl,
        candidates[i],
        platform,
        locale
      );
    } catch (err) {
      lastError = err as Error;
    }
  }

  if (lastError) {
    console.log("getLatestMapPackage error", lastError.message);
  }
  return null;
}
