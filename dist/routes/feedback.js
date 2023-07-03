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

// src/routes/feedback.ts
var feedback_exports = {};
__export(feedback_exports, {
  feedbackRoutes: () => feedbackRoutes
});
module.exports = __toCommonJS(feedback_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/routes/feedback.ts
var import_zod = require("zod");
async function feedbackRoutes(fastify) {
  fastify.post("/feedback", async (request, reply) => {
    const createFeedbackProps = import_zod.z.object({
      title: import_zod.z.string(),
      description: import_zod.z.string(),
      wallet: import_zod.z.string(),
      photoHash: import_zod.z.string()
    });
    const { title, description, wallet, photoHash } = createFeedbackProps.parse(request.body);
    await prisma.feedback.create({
      data: {
        title,
        description,
        wallet,
        photoHash
      }
    });
    return reply.status(201).send();
  });
  fastify.get("/feedback", async (request, reply) => {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
    return { feedbacks };
  });
  fastify.put("/feedback/status", async (request, reply) => {
    const updateFeedbackProps = import_zod.z.object({
      id: import_zod.z.string(),
      status: import_zod.z.number()
    });
    const { id, status } = updateFeedbackProps.parse(request.body);
    await prisma.feedback.update({
      where: {
        id
      },
      data: {
        status
      }
    });
    return reply.status(200).send();
  });
  fastify.post("/request-faucet", async (request, reply) => {
    const requestProps = import_zod.z.object({
      wallet: import_zod.z.string()
    });
    const { wallet } = requestProps.parse(request.body);
    await prisma.requestFaucet.create({
      data: {
        wallet
      }
    });
    return reply.status(201).send();
  });
  fastify.get("/request-faucet", async (request, reply) => {
    const requests = await prisma.requestFaucet.findMany({
      orderBy: {
        createdAt: "asc"
      }
    });
    return { requests };
  });
  fastify.put("/request-faucet/status", async (request, reply) => {
    const requestProps = import_zod.z.object({
      id: import_zod.z.string(),
      status: import_zod.z.number()
    });
    const { id, status } = requestProps.parse(request.body);
    await prisma.requestFaucet.update({
      where: {
        id
      },
      data: {
        status
      }
    });
    return reply.status(200).send();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  feedbackRoutes
});
