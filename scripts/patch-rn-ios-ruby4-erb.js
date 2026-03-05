const fs = require("fs");
const path = require("path");

const targetPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "react-native",
  "scripts",
  "react_native_pods_utils",
  "script_phases.rb"
);

if (!fs.existsSync(targetPath)) {
  process.exit(0);
}

const source = fs.readFileSync(targetPath, "utf8");
const from = "result = ERB.new(template, 0, '->').result(binding)";
const to = "result = ERB.new(template, trim_mode: '->').result(binding)";

if (!source.includes(from)) {
  process.exit(0);
}

fs.writeFileSync(targetPath, source.replace(from, to), "utf8");
console.log("Patched RN iOS script_phases ERB call for Ruby 4.");
