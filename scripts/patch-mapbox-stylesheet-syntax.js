const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "..",
  "node_modules",
  "@mapbox",
  "react-native-mapbox-gl",
  "javascript",
  "utils",
  "MapboxStyleSheet.js"
);

if (!fs.existsSync(filePath)) {
  process.exit(0);
}

let source = fs.readFileSync(filePath, "utf8");
const original = source;

source = source.replace(
  "      StyleFunctionTypes.Camera,\n      mode: mode,\n      { stops: stopNativeArray },",
  "      StyleFunctionTypes.Camera,\n      mode,\n      { stops: stopNativeArray },"
);
source = source.replace(
  "      StyleFunctionTypes.Source,\n      mode: mode,\n      { stops: stopNativeArray, attributeName: attributeName },",
  "      StyleFunctionTypes.Source,\n      mode,\n      { stops: stopNativeArray, attributeName: attributeName },"
);
source = source.replace(
  "      StyleFunctionTypes.Composite,\n      mode: mode,\n      { stops: stopNativeArray, attributeName: attributeName },",
  "      StyleFunctionTypes.Composite,\n      mode,\n      { stops: stopNativeArray, attributeName: attributeName },"
);

if (source !== original) {
  fs.writeFileSync(filePath, source, "utf8");
  console.log("Patched MapboxStyleSheet function argument syntax.");
}
