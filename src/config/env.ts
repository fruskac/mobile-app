export type Env = {
  PAYLOAD_URL: string;
  MAPBOX_ACCESS_TOKEN: string;
};

export const ENV: Env = {
  PAYLOAD_URL:
    typeof process !== "undefined" &&
    process.env &&
    process.env.PAYLOAD_URL
      ? String(process.env.PAYLOAD_URL)
      : "",
  MAPBOX_ACCESS_TOKEN:
    typeof process !== "undefined" &&
    process.env &&
    process.env.MAPBOX_ACCESS_TOKEN
      ? String(process.env.MAPBOX_ACCESS_TOKEN)
      : ""
};
