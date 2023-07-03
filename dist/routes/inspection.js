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

// src/routes/inspection.ts
var inspection_exports = {};
__export(inspection_exports, {
  inspectionRoutes: () => inspectionRoutes
});
module.exports = __toCommonJS(inspection_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/routes/inspection.ts
var import_zod = require("zod");

// src/plugins/authenticated.ts
async function authenticated(req) {
  await req.jwtVerify();
}

// src/routes/inspection.ts
async function inspectionRoutes(fastify) {
  fastify.post("/inspections", async (request, reply) => {
    const createInspectionProps = import_zod.z.object({
      inspectionId: import_zod.z.string(),
      createdBy: import_zod.z.string(),
      createdAt: import_zod.z.string(),
      propertyData: import_zod.z.string(),
      userWallet: import_zod.z.string()
    });
    const { inspectionId, createdBy, createdAt, propertyData, userWallet } = createInspectionProps.parse(request.body);
    await prisma.inspection.create({
      data: {
        inspectionId,
        createdBy,
        createdAt,
        propertyData,
        userWallet
      }
    });
    return reply.status(201).send();
  });
  fastify.get("/inspections/:activistWallet", async (request, reply) => {
    const reqParams = import_zod.z.object({
      activistWallet: import_zod.z.string()
    });
    const { activistWallet } = reqParams.parse(request.params);
    const inspections = await prisma.inspection.findMany({
      where: {
        userWallet: activistWallet.toUpperCase()
      }
    });
    return { inspections };
  });
  fastify.get("/categories", async (request, reply) => {
    const categories = await prisma.category.findMany({
      include: {
        SubCategory: true
      }
    });
    return { categories };
  });
  fastify.get("/subCategories", async (request, reply) => {
    const subCategories = await prisma.subCategory.findMany({
      orderBy: {
        order: "asc"
      },
      select: {
        aguaValue: true,
        bioValue: true,
        carbonValue: true,
        soloValue: true,
        category: true,
        description: true,
        id: true,
        placeholder: true,
        title: true,
        type: true,
        unity: true,
        insumoCategory: true,
        proofPhoto: true
      }
    });
    return { subCategories };
  });
  fastify.put("/update-category", async (request, reply) => {
    const updateProps = import_zod.z.object({
      id: import_zod.z.string(),
      carbon: import_zod.z.string(),
      agua: import_zod.z.string(),
      bio: import_zod.z.string(),
      solo: import_zod.z.string()
    });
    const { id, carbon, agua, bio, solo } = updateProps.parse(request.body);
    const category = await prisma.subCategory.findUnique({
      where: {
        id
      }
    });
    if (!category) {
      return reply.status(400).send();
    }
    await prisma.subCategory.update({
      where: {
        id
      },
      data: {
        carbonValue: carbon,
        aguaValue: agua,
        soloValue: solo,
        bioValue: bio
      }
    });
    return reply.status(200).send();
  });
  fastify.put("/inspections/:inspectionId/finishInspection", { onRequest: [authenticated] }, async (request, reply) => {
    const createInspectionParams = import_zod.z.object({
      inspectionId: import_zod.z.string()
    });
    const createInspectionBody = import_zod.z.object({
      resultIndices: import_zod.z.string(),
      resultCategories: import_zod.z.string(),
      biodversityIndice: import_zod.z.string(),
      proofPhoto: import_zod.z.string()
    });
    const { proofPhoto, resultCategories, resultIndices, biodversityIndice } = createInspectionBody.parse(request.body);
    const { inspectionId } = createInspectionParams.parse(request.params);
    await prisma.inspection.update({
      where: {
        inspectionId
      },
      data: {
        proofPhoto,
        resultCategories,
        resultIdices: resultIndices,
        status: 2,
        biodversityIndice
      }
    });
    return reply.status(201).send();
  });
  fastify.put("/inspections/:inspectionId/update-result-indices", async (request, reply) => {
    const createInspectionParams = import_zod.z.object({
      inspectionId: import_zod.z.string()
    });
    const createInspectionBody = import_zod.z.object({
      resultIndices: import_zod.z.string()
    });
    const { resultIndices } = createInspectionBody.parse(request.body);
    const { inspectionId } = createInspectionParams.parse(request.params);
    await prisma.inspection.update({
      where: {
        inspectionId
      },
      data: {
        resultIdices: resultIndices
      }
    });
    return reply.status(201).send();
  });
  fastify.get("/inspection/:inspectionId", async (request, reply) => {
    const createInspectionParams = import_zod.z.object({
      inspectionId: import_zod.z.string()
    });
    const { inspectionId } = createInspectionParams.parse(request.params);
    const inspection = await prisma.inspection.findFirst({
      where: {
        inspectionId
      }
    });
    return { inspection };
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  inspectionRoutes
});
