const fs = require("fs");
const path = require("path");

const virtualViewPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "react-native-svg",
  "android",
  "src",
  "main",
  "java",
  "com",
  "horcrux",
  "svg",
  "VirtualView.java"
);

const renderableManagerPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "react-native-svg",
  "android",
  "src",
  "main",
  "java",
  "com",
  "horcrux",
  "svg",
  "RNSVGRenderableManager.java"
);

let patchedCount = 0;

if (fs.existsSync(virtualViewPath)) {
  const source = fs.readFileSync(virtualViewPath, "utf8");
  const from = "    void setPointerEvents(PointerEvents pointerEvents) {";
  const to = "    public void setPointerEvents(PointerEvents pointerEvents) {";
  if (source.includes(from) && !source.includes(to)) {
    fs.writeFileSync(virtualViewPath, source.replace(from, to), "utf8");
    patchedCount += 1;
    console.log("Patched react-native-svg VirtualView#setPointerEvents access level.");
  }
}

if (fs.existsSync(renderableManagerPath)) {
  let source = fs.readFileSync(renderableManagerPath, "utf8");
  let changed = false;

  const oldImport = "import static com.facebook.react.common.StandardCharsets.UTF_8;";
  const newImport = "import java.nio.charset.StandardCharsets;";
  if (source.includes(oldImport) && !source.includes(newImport)) {
    source = source.replace(oldImport, newImport);
    changed = true;
  }

  const oldUtfUsage = "new InputStreamReader(stream, UTF_8);";
  const newUtfUsage = "new InputStreamReader(stream, StandardCharsets.UTF_8);";
  if (source.includes(oldUtfUsage) && !source.includes(newUtfUsage)) {
    source = source.replace(oldUtfUsage, newUtfUsage);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(renderableManagerPath, source, "utf8");
    patchedCount += 1;
    console.log("Patched react-native-svg StandardCharsets import for RN 0.80+.");
  }
}

if (patchedCount === 0) {
  process.exit(0);
}
