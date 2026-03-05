const fs = require("fs");
const path = require("path");

function patchCompiledNativeInterface(filePath) {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  let source = fs.readFileSync(filePath, "utf8");
  let changed = false;

  const listenerShimMarker = "}var nativeEventEmitter=null;";
  if (!source.includes("RNCNetInfo.removeListeners=function(){};")) {
    if (!source.includes(listenerShimMarker)) {
      return false;
    }

    const listenerShim =
      "}" +
      "if(typeof RNCNetInfo.addListener!==\"function\"){RNCNetInfo.addListener=function(){};}" +
      "if(typeof RNCNetInfo.removeListeners!==\"function\"){RNCNetInfo.removeListeners=function(){};}" +
      "var nativeEventEmitter=null;";
    source = source.replace(listenerShimMarker, listenerShim);
    changed = true;
  }

  const commonJsExport =
    "var nativeEventEmitter=null;var _default=(0,_objectSpread2.default)({},RNCNetInfo,{get eventEmitter(){if(!nativeEventEmitter){nativeEventEmitter=new _reactNative.NativeEventEmitter(RNCNetInfo);}return nativeEventEmitter;}});exports.default=_default;";
  const commonJsExportPatched =
    "var nativeEventEmitter=null;var netInfoInterface=RNCNetInfo;if(typeof netInfoInterface.getCurrentState!==\"function\"&&RNCNetInfo.default&&typeof RNCNetInfo.default.getCurrentState===\"function\"){netInfoInterface.getCurrentState=RNCNetInfo.default.getCurrentState.bind(RNCNetInfo.default);}Object.defineProperty(netInfoInterface,\"eventEmitter\",{enumerable:true,configurable:true,get:function get(){if(!nativeEventEmitter){nativeEventEmitter=new _reactNative.NativeEventEmitter(RNCNetInfo);}return nativeEventEmitter;}});var _default=netInfoInterface;exports.default=_default;";

  const moduleExport =
    "var nativeEventEmitter=null;export default _objectSpread({},RNCNetInfo,{get eventEmitter(){if(!nativeEventEmitter){nativeEventEmitter=new NativeEventEmitter(RNCNetInfo);}return nativeEventEmitter;}});";
  const moduleExportPatched =
    "var nativeEventEmitter=null;var netInfoInterface=RNCNetInfo;if(typeof netInfoInterface.getCurrentState!==\"function\"&&RNCNetInfo.default&&typeof RNCNetInfo.default.getCurrentState===\"function\"){netInfoInterface.getCurrentState=RNCNetInfo.default.getCurrentState.bind(RNCNetInfo.default);}Object.defineProperty(netInfoInterface,\"eventEmitter\",{enumerable:true,configurable:true,get:function(){if(!nativeEventEmitter){nativeEventEmitter=new NativeEventEmitter(RNCNetInfo);}return nativeEventEmitter;}});export default netInfoInterface;";

  if (source.includes(commonJsExport)) {
    source = source.replace(commonJsExport, commonJsExportPatched);
    changed = true;
  }
  if (source.includes(moduleExport)) {
    source = source.replace(moduleExport, moduleExportPatched);
    changed = true;
  }

  if (!changed) {
    return false;
  }

  fs.writeFileSync(filePath, source, "utf8");
  return true;
}

function patchSourceNativeInterface(filePath) {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  let source = fs.readFileSync(filePath, "utf8");
  let changed = false;

  if (!source.includes("removeListeners !== \"function\"")) {
    const insertAfter = "}\n\n/**";
    const listenerShimTs =
      "}\n" +
      "if (typeof (RNCNetInfo as any).addListener !== \"function\") {\n" +
      "  (RNCNetInfo as any).addListener = () => {};\n" +
      "}\n" +
      "if (typeof (RNCNetInfo as any).removeListeners !== \"function\") {\n" +
      "  (RNCNetInfo as any).removeListeners = () => {};\n" +
      "}\n\n/**";

    if (!source.includes(insertAfter)) {
      return false;
    }

    source = source.replace(insertAfter, listenerShimTs);
    changed = true;
  }

  const sourceExportOriginal =
    "let nativeEventEmitter: NativeEventEmitter | null = null;\n" +
    "export default {\n" +
    "  ...RNCNetInfo,\n" +
    "  get eventEmitter(): NativeEventEmitter {\n" +
    "    if (!nativeEventEmitter) {\n" +
    "      /// @ts-ignore\n" +
    "      nativeEventEmitter = new NativeEventEmitter(RNCNetInfo);\n" +
    "    }\n" +
    "    /// @ts-ignore\n" +
    "    return nativeEventEmitter;\n" +
    "  },\n" +
    "};";

  const sourceExportPatched =
    "let nativeEventEmitter: NativeEventEmitter | null = null;\n" +
    "const defaultNetInfo = (RNCNetInfo as any).default;\n" +
    "const getCurrentState =\n" +
    "  typeof (RNCNetInfo as any).getCurrentState === \"function\"\n" +
    "    ? (RNCNetInfo as any).getCurrentState.bind(RNCNetInfo)\n" +
    "    : defaultNetInfo && typeof defaultNetInfo.getCurrentState === \"function\"\n" +
    "    ? defaultNetInfo.getCurrentState.bind(defaultNetInfo)\n" +
    "    : () =>\n" +
    "        Promise.resolve({\n" +
    "          type: \"unknown\",\n" +
    "          isConnected: false,\n" +
    "          isInternetReachable: false,\n" +
    "          details: null,\n" +
    "        });\n" +
    "\n" +
    "export default {\n" +
    "  ...(RNCNetInfo as any),\n" +
    "  getCurrentState,\n" +
    "  get eventEmitter(): NativeEventEmitter {\n" +
    "    if (!nativeEventEmitter) {\n" +
    "      /// @ts-ignore\n" +
    "      nativeEventEmitter = new NativeEventEmitter(RNCNetInfo);\n" +
    "    }\n" +
    "    /// @ts-ignore\n" +
    "    return nativeEventEmitter;\n" +
    "  },\n" +
    "};";

  if (source.includes(sourceExportOriginal)) {
    source = source.replace(sourceExportOriginal, sourceExportPatched);
    changed = true;
  }

  if (!changed) {
    return false;
  }

  fs.writeFileSync(filePath, source, "utf8");
  return true;
}

const repoRoot = path.join(__dirname, "..");
const targets = [
  path.join(
    repoRoot,
    "node_modules",
    "@react-native-community",
    "netinfo",
    "lib",
    "commonjs",
    "internal",
    "nativeInterface.js"
  ),
  path.join(
    repoRoot,
    "node_modules",
    "@react-native-community",
    "netinfo",
    "lib",
    "module",
    "internal",
    "nativeInterface.js"
  ),
  path.join(
    repoRoot,
    "node_modules",
    "@react-native-community",
    "netinfo",
    "src",
    "internal",
    "nativeInterface.ts"
  )
];

const changed = targets
  .map(target => {
    if (target.endsWith(".ts")) {
      return patchSourceNativeInterface(target);
    }
    return patchCompiledNativeInterface(target);
  })
  .filter(Boolean).length;

if (changed > 0) {
  console.log(`Patched netinfo NativeEventEmitter compatibility in ${changed} file(s).`);
}
