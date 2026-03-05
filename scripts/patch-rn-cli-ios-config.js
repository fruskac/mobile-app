const fs = require("fs");
const path = require("path");

const targetPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "@react-native-community",
  "cli-platform-ios",
  "build",
  "config",
  "index.js"
);

if (!fs.existsSync(targetPath)) {
  process.exit(0);
}

const source = fs.readFileSync(targetPath, "utf8");
const from = "const configurations = userConfig.configurations || [];";
const to = "const configurations = (userConfig && userConfig.configurations) || [];";

if (!source.includes(from)) {
  process.exit(0);
}

fs.writeFileSync(targetPath, source.replace(from, to), "utf8");
console.log("Patched cli-platform-ios dependencyConfig null-guard.");
