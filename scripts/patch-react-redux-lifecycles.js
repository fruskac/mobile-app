#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");

const targets = [
  {
    file: "node_modules/react-redux/lib/components/connectAdvanced.js",
    replacements: [
      {
        from:
          "Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {",
        to:
          "Connect.prototype.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {"
      },
      {
        from:
          "Connect.prototype.componentWillUpdate = function componentWillUpdate() {",
        to:
          "Connect.prototype.UNSAFE_componentWillUpdate = function UNSAFE_componentWillUpdate() {"
      }
    ]
  },
  {
    file: "node_modules/react-redux/es/components/connectAdvanced.js",
    replacements: [
      {
        from:
          "Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {",
        to:
          "Connect.prototype.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {"
      },
      {
        from:
          "Connect.prototype.componentWillUpdate = function componentWillUpdate() {",
        to:
          "Connect.prototype.UNSAFE_componentWillUpdate = function UNSAFE_componentWillUpdate() {"
      }
    ]
  },
  {
    file: "node_modules/react-redux/src/components/connectAdvanced.js",
    replacements: [
      {
        from: "componentWillReceiveProps(nextProps) {",
        to: "UNSAFE_componentWillReceiveProps(nextProps) {"
      },
      {
        from:
          "Connect.prototype.componentWillUpdate = function componentWillUpdate() {",
        to:
          "Connect.prototype.UNSAFE_componentWillUpdate = function UNSAFE_componentWillUpdate() {"
      }
    ]
  }
];

function patchFile(target) {
  const filePath = path.join(rootDir, target.file);
  if (!fs.existsSync(filePath)) {
    return { file: target.file, changed: false, skipped: true };
  }

  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;

  target.replacements.forEach(({ from, to }) => {
    if (content.includes(to)) {
      return;
    }
    if (!content.includes(from)) {
      return;
    }
    content = content.replace(from, to);
    changed = true;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, "utf8");
  }

  return { file: target.file, changed, skipped: false };
}

const results = targets.map(patchFile);
const changedCount = results.filter(result => result.changed).length;

if (changedCount > 0) {
  console.log(
    `Patched react-redux unsafe lifecycles in ${changedCount} file(s).`
  );
}
