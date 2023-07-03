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

// src/routes/delation.ts
var delation_exports = {};
__export(delation_exports, {
  delationRoutes: () => delationRoutes
});
module.exports = __toCommonJS(delation_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/routes/delation.ts
var import_zod = require("zod");
async function delationRoutes(fastify) {
  fastify.get("/delations", async (request, reply) => {
    const delations = await prisma.delation.findMany();
    return { delations };
  });
  fastify.post("/delations", async (request, reply) => {
    const createDelationProps = import_zod.z.object({
      reportedUser: import_zod.z.string(),
      title: import_zod.z.string(),
      testimony: import_zod.z.string(),
      proofPhoto: import_zod.z.string()
    });
    const { reportedUser, title, testimony, proofPhoto } = createDelationProps.parse(request.body);
    await prisma.delation.create({
      data: {
        reportedUser,
        title,
        testimony,
        proofPhoto
      }
    });
    return reply.status(201).send();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  delationRoutes
});
