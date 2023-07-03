"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/plugins/ipfs.ts
var ipfs_exports = {};
__export(ipfs_exports, {
  IpfsClient: () => IpfsClient
});
module.exports = __toCommonJS(ipfs_exports);
var import_ipfs_http_client = require("ipfs-http-client");
var projectId = "2F2FHYWhdz3ynk8PeorZrtf0FSG";
var projectSecret = "9cf6a1ddc8510764d564c0f7b9a08cf2";
var options = {
  host: "ipfs.infura.io",
  port: 5001,
  method: "POST",
  auth: projectId + ":" + projectSecret
};
function IpfsClient() {
  const ipfsClient = (0, import_ipfs_http_client.create)(options);
  return ipfsClient;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IpfsClient
});
