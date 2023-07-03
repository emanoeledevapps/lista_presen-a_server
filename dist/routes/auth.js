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

// src/routes/auth.ts
var auth_exports = {};
__export(auth_exports, {
  authRoutes: () => authRoutes
});
module.exports = __toCommonJS(auth_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/routes/auth.ts
var import_zod = require("zod");
var import_bcryptjs = require("bcryptjs");
async function authRoutes(fastify) {
  fastify.post("/users", async (request, reply) => {
    const createUserProps = import_zod.z.object({
      name: import_zod.z.string(),
      wallet: import_zod.z.string(),
      userType: import_zod.z.number(),
      geoLocation: import_zod.z.string().optional(),
      propertyGeolocation: import_zod.z.string().optional(),
      password: import_zod.z.string().optional(),
      imgProfileUrl: import_zod.z.string().optional(),
      address: import_zod.z.string().optional(),
      level: import_zod.z.number()
    });
    const { name, wallet, userType, geoLocation, propertyGeolocation, password, imgProfileUrl, address, level } = createUserProps.parse(request.body);
    const userExists = await prisma.user.findUnique({
      where: {
        wallet: String(wallet).toUpperCase()
      }
    });
    if (userExists) {
      return reply.status(500).send();
    }
    const passwordHash = await (0, import_bcryptjs.hash)(String(password), 8);
    await prisma.user.create({
      data: {
        name,
        wallet: String(wallet).toUpperCase(),
        userType,
        geoLocation,
        propertyGeolocation,
        password: String(passwordHash),
        imgProfileUrl,
        address,
        level
      }
    });
    return reply.status(201).send();
  });
  fastify.post("/login", async (request, reply) => {
    const createUserProps = import_zod.z.object({
      wallet: import_zod.z.string(),
      password: import_zod.z.string()
    });
    const { wallet, password } = createUserProps.parse(request.body);
    const user = await prisma.user.findUnique({
      where: {
        wallet: String(wallet).toUpperCase()
      }
    });
    if (!user) {
      return reply.status(400).send({
        message: "User not found"
      });
    }
    const passwordCorrect = await (0, import_bcryptjs.compare)(String(password), String(user?.password));
    if (!passwordCorrect) {
      return reply.status(400).send({
        message: "Password incorrect"
      });
    }
    const token = fastify.jwt.sign({
      wallet
    }, {
      sub: wallet,
      expiresIn: "60 days"
    });
    return token;
  });
  fastify.put("/auth/update-password", async (request, reply) => {
    const updateProps = import_zod.z.object({
      wallet: import_zod.z.string(),
      password: import_zod.z.string()
    });
    const { wallet, password } = updateProps.parse(request.body);
    const passwordHash = await (0, import_bcryptjs.hash)(password, 8);
    await prisma.user.update({
      where: {
        wallet: wallet.toUpperCase()
      },
      data: {
        password: passwordHash
      }
    });
    return reply.status(200).send();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authRoutes
});
