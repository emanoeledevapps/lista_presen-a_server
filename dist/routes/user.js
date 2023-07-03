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

// src/routes/user.ts
var user_exports = {};
__export(user_exports, {
  userRoutes: () => userRoutes
});
module.exports = __toCommonJS(user_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/routes/user.ts
var import_zod = require("zod");

// src/plugins/authenticated.ts
async function authenticated(req) {
  await req.jwtVerify();
}

// src/routes/user.ts
async function userRoutes(fastify) {
  fastify.get("/me", { onRequest: [authenticated] }, async (request, reply) => {
    const user = await prisma.user.findUnique({
      where: {
        wallet: request.user.wallet.toUpperCase()
      }
    });
    return { user };
  });
  fastify.get("/users", async (request, reply) => {
    const users = await prisma.user.findMany();
    return { users };
  });
  fastify.get("/user/:wallet", async (request, reply) => {
    const requestProps = import_zod.z.object({
      wallet: import_zod.z.string()
    });
    const { wallet } = requestProps.parse(request.params);
    const user = await prisma.user.findUnique({
      where: {
        wallet: wallet.toUpperCase()
      }
    });
    return { user };
  });
  fastify.get("/users_count", async (request, reply) => {
    const producersCount = await prisma.user.count({
      where: {
        userType: 1
      }
    });
    const activistsCount = await prisma.user.count({
      where: {
        userType: 2
      }
    });
    const researchersCount = await prisma.user.count({
      where: {
        userType: 2
      }
    });
    return { producersCount, activistsCount, researchersCount };
  });
  fastify.put("/user/level", async (request, reply) => {
    const propsUpdateLevel = import_zod.z.object({
      id: import_zod.z.string(),
      level: import_zod.z.number()
    });
    const { id, level } = propsUpdateLevel.parse(request.body);
    await prisma.user.update({
      where: {
        id
      },
      data: {
        level
      }
    });
    return reply.status(200).send();
  });
  fastify.put("/user/updatePhoto", async (request, reply) => {
    const propsUpdatePhoto = import_zod.z.object({
      id: import_zod.z.string(),
      hashPhoto: import_zod.z.string()
    });
    const { id, hashPhoto } = propsUpdatePhoto.parse(request.body);
    await prisma.user.update({
      where: {
        id
      },
      data: {
        imgProfileUrl: hashPhoto
      }
    });
    return reply.status(200).send();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRoutes
});
