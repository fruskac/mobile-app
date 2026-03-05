const fs = require("fs");
const path = require("path");

const boostPodspecPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "react-native",
  "third-party-podspecs",
  "boost.podspec"
);

if (!fs.existsSync(boostPodspecPath)) {
  process.exit(0);
}

const oldUrl =
  "https://boostorg.jfrog.io/artifactory/main/release/1.76.0/source/boost_1_76_0.tar.bz2";
const newUrl = "https://archives.boost.io/release/1.76.0/source/boost_1_76_0.tar.bz2";

const shaJfrogMirror =
  "1c162b579a423fa6876c6c5bc16d39ab4bc05e28898977a0a6af345f523f6357";
const shaArchives =
  "f0397ba6e982c4450f27bf32a2a83292aba035b827a5623a14636ea583318c41";

let source = fs.readFileSync(boostPodspecPath, "utf8");
const initial = source;

if (source.includes(oldUrl)) {
  source = source.replace(oldUrl, newUrl);
}
if (source.includes(shaJfrogMirror)) {
  source = source.replace(shaJfrogMirror, shaArchives);
}

if (source !== initial) {
  fs.writeFileSync(boostPodspecPath, source, "utf8");
  console.log("Patched RN boost.podspec source URL/checksum.");
}
