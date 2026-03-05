const fs = require("fs");
const path = require("path");

const repoRoot = path.join(__dirname, "..");

const libReactNativePath = path.join(
  repoRoot,
  "node_modules",
  "react-native-vector-icons",
  "lib",
  "react-native.js"
);

const distReactNativePath = path.join(
  repoRoot,
  "node_modules",
  "react-native-vector-icons",
  "dist",
  "lib",
  "react-native.js"
);

const libReplacement = `import * as ReactNative from 'react-native';

function getExport(name, fallbackValue) {
  try {
    const descriptor = Object.getOwnPropertyDescriptor(ReactNative, name);
    if (!descriptor) {
      return fallbackValue;
    }
    if (typeof descriptor.get === 'function') {
      const value = descriptor.get.call(ReactNative);
      return typeof value === 'undefined' ? fallbackValue : value;
    }
    return typeof descriptor.value === 'undefined' ? fallbackValue : descriptor.value;
  } catch (error) {
    return fallbackValue;
  }
}

export const NativeModules = getExport('NativeModules');
export const Platform = getExport('Platform');
export const PixelRatio = getExport('PixelRatio');
export const processColor = getExport('processColor');
export const StyleSheet = getExport('StyleSheet');
export const Text = getExport('Text');
export const TouchableHighlight = getExport('TouchableHighlight');
export const View = getExport('View');
export const TabBarIOS = getExport('TabBarIOS');
export const ToolbarAndroid = getExport('ToolbarAndroid');
`;

const distReplacement = `'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ReactNative = require('react-native');

function getExport(name, fallbackValue) {
  try {
    var descriptor = Object.getOwnPropertyDescriptor(ReactNative, name);
    if (!descriptor) {
      return fallbackValue;
    }
    if (typeof descriptor.get === 'function') {
      var value = descriptor.get.call(ReactNative);
      return typeof value === 'undefined' ? fallbackValue : value;
    }
    return typeof descriptor.value === 'undefined' ? fallbackValue : descriptor.value;
  } catch (error) {
    return fallbackValue;
  }
}

exports.NativeModules = getExport('NativeModules');
exports.Platform = getExport('Platform');
exports.PixelRatio = getExport('PixelRatio');
exports.processColor = getExport('processColor');
exports.StyleSheet = getExport('StyleSheet');
exports.Text = getExport('Text');
exports.TouchableHighlight = getExport('TouchableHighlight');
exports.View = getExport('View');
exports.TabBarIOS = getExport('TabBarIOS');
exports.ToolbarAndroid = getExport('ToolbarAndroid');
`;

function patchFile(filePath, replacement, marker) {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  const source = fs.readFileSync(filePath, "utf8");
  if (source.includes(marker)) {
    return false;
  }

  fs.writeFileSync(filePath, replacement, "utf8");
  return true;
}

let changed = 0;
if (
  patchFile(
    libReactNativePath,
    libReplacement,
    "function getExport(name, fallbackValue)"
  )
) {
  changed += 1;
}

if (
  patchFile(
    distReactNativePath,
    distReplacement,
    "function getExport(name, fallbackValue)"
  )
) {
  changed += 1;
}

if (changed > 0) {
  console.log(
    `Patched react-native-vector-icons React Native exports compatibility in ${changed} file(s).`
  );
}
