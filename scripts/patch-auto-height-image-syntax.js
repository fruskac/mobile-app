const fs = require("fs");
const path = require("path");

const syntaxTarget = path.join(
  __dirname,
  "..",
  "node_modules",
  "react-native-auto-height-image",
  "autoHeightImageWithErrorFallback.js"
);

const propTypesTarget = path.join(
  __dirname,
  "..",
  "node_modules",
  "react-native-auto-height-image",
  "autoHeightImage.js"
);

let changed = 0;

if (fs.existsSync(syntaxTarget)) {
  let source = fs.readFileSync(syntaxTarget, "utf8");
  const from = "...restProps,\n        } = this.props;";
  const to = "...restProps\n        } = this.props;";
  let updated = source;

  if (updated.includes(from)) {
    updated = updated.replace(from, to);
  }

  const legacySpreadLine = "...AutoHeightImage.propTypes,";
  const guardedSpreadLine = "...(AutoHeightImage.propTypes || {}),";
  if (updated.includes(legacySpreadLine)) {
    updated = updated.replace(legacySpreadLine, guardedSpreadLine);
  }

  const invalidFallbackLine = "        fallbackSource: AutoHeightImage.propTypes.source,\n";
  if (updated.includes(invalidFallbackLine)) {
    updated = updated.replace(invalidFallbackLine, "");
  }

  if (updated !== source) {
    fs.writeFileSync(syntaxTarget, updated, "utf8");
    changed += 1;
  }
}

if (fs.existsSync(propTypesTarget)) {
  const source = fs.readFileSync(propTypesTarget, "utf8");
  const legacyLine = "const { resizeMode, ...ImagePropTypes } = Image.propTypes;";
  const patchedLine =
    "const imagePropTypes = Image && Image.propTypes ? Image.propTypes : {};\nconst { resizeMode, ...ImagePropTypes } = imagePropTypes;";

  if (source.includes(legacyLine) && !source.includes("const imagePropTypes =")) {
    fs.writeFileSync(propTypesTarget, source.replace(legacyLine, patchedLine), "utf8");
    changed += 1;
  }
}

if (changed > 0) {
  console.log(`Patched react-native-auto-height-image compatibility in ${changed} file(s).`);
}
