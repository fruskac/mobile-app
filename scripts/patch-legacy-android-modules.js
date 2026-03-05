const fs = require("fs");
const path = require("path");

function writeIfChanged(filePath, content) {
  if (!fs.existsSync(filePath)) return false;
  const prev = fs.readFileSync(filePath, "utf8");
  if (prev === content) return false;
  fs.writeFileSync(filePath, content, "utf8");
  return true;
}

const repoRoot = path.join(__dirname, "..");
const i18nGradlePath = path.join(
  repoRoot,
  "node_modules",
  "react-native-i18n",
  "android",
  "build.gradle"
);
const vectorIconsGradlePath = path.join(
  repoRoot,
  "node_modules",
  "react-native-vector-icons",
  "android",
  "build.gradle"
);

const i18nGradle = `apply plugin: 'com.android.library'

android {
    compileSdkVersion rootProject.ext.compileSdkVersion
    buildToolsVersion rootProject.ext.buildToolsVersion

    defaultConfig {
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        ndk {
            abiFilters "armeabi-v7a", "x86", "arm64-v8a"
        }
    }
}

dependencies {
    implementation 'com.facebook.react:react-native:+'
}
`;

const vectorIconsGradle = `apply plugin: 'com.android.library'

android {
    compileSdkVersion rootProject.ext.compileSdkVersion
    buildToolsVersion rootProject.ext.buildToolsVersion

    defaultConfig {
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
    }
    lintOptions {
        abortOnError false
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation "com.facebook.react:react-native:+"
}
`;

let patchedCount = 0;
if (writeIfChanged(i18nGradlePath, i18nGradle)) patchedCount += 1;
if (writeIfChanged(vectorIconsGradlePath, vectorIconsGradle)) patchedCount += 1;

if (patchedCount > 0) {
  console.log(`Patched legacy Android module gradle files in ${patchedCount} package(s).`);
}
