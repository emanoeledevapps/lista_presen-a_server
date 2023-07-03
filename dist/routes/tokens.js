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

// src/routes/tokens.ts
var tokens_exports = {};
__export(tokens_exports, {
  tokensRoutes: () => tokensRoutes
});
module.exports = __toCommonJS(tokens_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/routes/tokens.ts
var import_zod = require("zod");
async function tokensRoutes(fastify) {
  fastify.get("/tokens-burned", async (request, reply) => {
    const tokensBurned = await prisma.tokensBurned.findMany();
    return { tokensBurned };
  });
  fastify.post("/tokens-burned", async (request, reply) => {
    const updateProps = import_zod.z.object({
      wallet: import_zod.z.string(),
      tokens: import_zod.z.number(),
      transactionHash: import_zod.z.string(),
      carbon: import_zod.z.number(),
      water: import_zod.z.number(),
      bio: import_zod.z.number(),
      soil: import_zod.z.number()
    });
    const { wallet, tokens, transactionHash, carbon, water, bio, soil } = updateProps.parse(request.body);
    await prisma.tokensBurned.create({
      data: {
        wallet: wallet.toUpperCase(),
        tokens,
        transactionHash,
        carbon,
        water,
        bio,
        soil
      }
    });
    return reply.status(201).send();
  });
  fastify.get("/tokens-burned/by-wallet/:wallet", async (request, reply) => {
    const paramsProps = import_zod.z.object({
      wallet: import_zod.z.string()
    });
    const { wallet } = paramsProps.parse(request.params);
    const tokensBurned = await prisma.tokensBurned.findMany({
      where: {
        wallet: wallet.toUpperCase()
      }
    });
    return { tokensBurned };
  });
  fastify.get("/tokens-burned/by-hash/:transactionHash", async (request, reply) => {
    const paramsProps = import_zod.z.object({
      transactionHash: import_zod.z.string()
    });
    const { transactionHash } = paramsProps.parse(request.params);
    const tokensBurned = await prisma.tokensBurned.findMany({
      where: {
        transactionHash
      }
    });
    return { tokensBurned };
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  tokensRoutes
});
