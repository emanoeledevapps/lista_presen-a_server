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

// src/routes/impact.ts
var impact_exports = {};
__export(impact_exports, {
  impactRoutes: () => impactRoutes
});
module.exports = __toCommonJS(impact_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/routes/impact.ts
var import_zod = require("zod");
async function impactRoutes(fastify) {
  fastify.get("/network-impact", async (request, reply) => {
    const impact = await prisma.impact.findMany();
    return { impact };
  });
  fastify.put("/network-impact", async (request, reply) => {
    const updateProps = import_zod.z.object({
      carbon: import_zod.z.number(),
      agua: import_zod.z.number(),
      bio: import_zod.z.number(),
      solo: import_zod.z.number(),
      id: import_zod.z.string()
    });
    const { carbon, agua, bio, solo, id } = updateProps.parse(request.body);
    await prisma.impact.update({
      where: {
        id
      },
      data: {
        carbon,
        agua,
        bio,
        solo
      }
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  impactRoutes
});
