"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));
var import_jwt = __toESM(require("@fastify/jwt"));

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/routes/delation.ts
var import_zod = require("zod");
async function delationRoutes(fastify2) {
  fastify2.get("/delations", async (request, reply) => {
    const delations = await prisma.delation.findMany();
    return { delations };
  });
  fastify2.post("/delations", async (request, reply) => {
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

// src/routes/user.ts
var import_zod2 = require("zod");

// src/plugins/authenticated.ts
async function authenticated(req) {
  await req.jwtVerify();
}

// src/routes/user.ts
async function userRoutes(fastify2) {
  fastify2.get("/me", { onRequest: [authenticated] }, async (request, reply) => {
    const user = await prisma.user.findUnique({
      where: {
        wallet: request.user.wallet.toUpperCase()
      }
    });
    return { user };
  });
  fastify2.get("/users", async (request, reply) => {
    const users = await prisma.user.findMany();
    return { users };
  });
  fastify2.get("/user/:wallet", async (request, reply) => {
    const requestProps = import_zod2.z.object({
      wallet: import_zod2.z.string()
    });
    const { wallet } = requestProps.parse(request.params);
    const user = await prisma.user.findUnique({
      where: {
        wallet: wallet.toUpperCase()
      }
    });
    return { user };
  });
  fastify2.get("/users_count", async (request, reply) => {
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
  fastify2.put("/user/level", async (request, reply) => {
    const propsUpdateLevel = import_zod2.z.object({
      id: import_zod2.z.string(),
      level: import_zod2.z.number()
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
  fastify2.put("/user/updatePhoto", async (request, reply) => {
    const propsUpdatePhoto = import_zod2.z.object({
      id: import_zod2.z.string(),
      hashPhoto: import_zod2.z.string()
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

// src/routes/inspection.ts
var import_zod3 = require("zod");
async function inspectionRoutes(fastify2) {
  fastify2.post("/inspections", async (request, reply) => {
    const createInspectionProps = import_zod3.z.object({
      inspectionId: import_zod3.z.string(),
      createdBy: import_zod3.z.string(),
      createdAt: import_zod3.z.string(),
      propertyData: import_zod3.z.string(),
      userWallet: import_zod3.z.string()
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
  fastify2.get("/inspections/:activistWallet", async (request, reply) => {
    const reqParams = import_zod3.z.object({
      activistWallet: import_zod3.z.string()
    });
    const { activistWallet } = reqParams.parse(request.params);
    const inspections = await prisma.inspection.findMany({
      where: {
        userWallet: activistWallet.toUpperCase()
      }
    });
    return { inspections };
  });
  fastify2.get("/categories", async (request, reply) => {
    const categories = await prisma.category.findMany({
      include: {
        SubCategory: true
      }
    });
    return { categories };
  });
  fastify2.get("/subCategories", async (request, reply) => {
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
  fastify2.put("/update-category", async (request, reply) => {
    const updateProps = import_zod3.z.object({
      id: import_zod3.z.string(),
      carbon: import_zod3.z.string(),
      agua: import_zod3.z.string(),
      bio: import_zod3.z.string(),
      solo: import_zod3.z.string()
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
  fastify2.put("/inspections/:inspectionId/finishInspection", { onRequest: [authenticated] }, async (request, reply) => {
    const createInspectionParams = import_zod3.z.object({
      inspectionId: import_zod3.z.string()
    });
    const createInspectionBody = import_zod3.z.object({
      resultIndices: import_zod3.z.string(),
      resultCategories: import_zod3.z.string(),
      biodversityIndice: import_zod3.z.string(),
      proofPhoto: import_zod3.z.string()
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
  fastify2.put("/inspections/:inspectionId/update-result-indices", async (request, reply) => {
    const createInspectionParams = import_zod3.z.object({
      inspectionId: import_zod3.z.string()
    });
    const createInspectionBody = import_zod3.z.object({
      resultIndices: import_zod3.z.string()
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
  fastify2.get("/inspection/:inspectionId", async (request, reply) => {
    const createInspectionParams = import_zod3.z.object({
      inspectionId: import_zod3.z.string()
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

// src/routes/auth.ts
var import_zod4 = require("zod");
var import_bcryptjs = require("bcryptjs");
async function authRoutes(fastify2) {
  fastify2.post("/users", async (request, reply) => {
    const createUserProps = import_zod4.z.object({
      name: import_zod4.z.string(),
      wallet: import_zod4.z.string(),
      userType: import_zod4.z.number(),
      geoLocation: import_zod4.z.string().optional(),
      propertyGeolocation: import_zod4.z.string().optional(),
      password: import_zod4.z.string().optional(),
      imgProfileUrl: import_zod4.z.string().optional(),
      address: import_zod4.z.string().optional(),
      level: import_zod4.z.number()
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
  fastify2.post("/login", async (request, reply) => {
    const createUserProps = import_zod4.z.object({
      wallet: import_zod4.z.string(),
      password: import_zod4.z.string()
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
    const token = fastify2.jwt.sign({
      wallet
    }, {
      sub: wallet,
      expiresIn: "60 days"
    });
    return token;
  });
  fastify2.put("/auth/update-password", async (request, reply) => {
    const updateProps = import_zod4.z.object({
      wallet: import_zod4.z.string(),
      password: import_zod4.z.string()
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

// src/routes/blog.ts
var import_zod5 = require("zod");
async function blogRoutes(fastify2) {
  fastify2.post("/post", { onRequest: [authenticated] }, async (request, reply) => {
    const createPostProps = import_zod5.z.object({
      title: import_zod5.z.string(),
      description: import_zod5.z.string(),
      bannerUrl: import_zod5.z.string(),
      bannerAlt: import_zod5.z.string(),
      bodyPost: import_zod5.z.string(),
      language: import_zod5.z.string(),
      keywords: import_zod5.z.string(),
      url: import_zod5.z.string()
    });
    const { title, description, bannerUrl, bannerAlt, bodyPost, language, keywords, url } = createPostProps.parse(request.body);
    await prisma.post.create({
      data: {
        title,
        description,
        bannerUrl,
        bannerAlt,
        bodyPost,
        language,
        keywords,
        url
      }
    });
    return reply.status(201).send();
  });
  fastify2.get("/posts/:language", async (request, reply) => {
    const reqParamsProps = import_zod5.z.object({
      language: import_zod5.z.string()
    });
    const { language } = reqParamsProps.parse(request.params);
    const posts = await prisma.post.findMany({
      where: {
        language
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return { posts };
  });
  fastify2.get("/post/:url", async (request, reply) => {
    const reqParamsProps = import_zod5.z.object({
      url: import_zod5.z.string()
    });
    const { url } = reqParamsProps.parse(request.params);
    const post = await prisma.post.findFirst({
      where: {
        url
      }
    });
    return { post };
  });
}

// src/routes/impact.ts
var import_zod6 = require("zod");
async function impactRoutes(fastify2) {
  fastify2.get("/network-impact", async (request, reply) => {
    const impact = await prisma.impact.findMany();
    return { impact };
  });
  fastify2.put("/network-impact", async (request, reply) => {
    const updateProps = import_zod6.z.object({
      carbon: import_zod6.z.number(),
      agua: import_zod6.z.number(),
      bio: import_zod6.z.number(),
      solo: import_zod6.z.number(),
      id: import_zod6.z.string()
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

// src/routes/tokens.ts
var import_zod7 = require("zod");
async function tokensRoutes(fastify2) {
  fastify2.get("/tokens-burned", async (request, reply) => {
    const tokensBurned = await prisma.tokensBurned.findMany();
    return { tokensBurned };
  });
  fastify2.post("/tokens-burned", async (request, reply) => {
    const updateProps = import_zod7.z.object({
      wallet: import_zod7.z.string(),
      tokens: import_zod7.z.number(),
      transactionHash: import_zod7.z.string(),
      carbon: import_zod7.z.number(),
      water: import_zod7.z.number(),
      bio: import_zod7.z.number(),
      soil: import_zod7.z.number()
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
  fastify2.get("/tokens-burned/by-wallet/:wallet", async (request, reply) => {
    const paramsProps = import_zod7.z.object({
      wallet: import_zod7.z.string()
    });
    const { wallet } = paramsProps.parse(request.params);
    const tokensBurned = await prisma.tokensBurned.findMany({
      where: {
        wallet: wallet.toUpperCase()
      }
    });
    return { tokensBurned };
  });
  fastify2.get("/tokens-burned/by-hash/:transactionHash", async (request, reply) => {
    const paramsProps = import_zod7.z.object({
      transactionHash: import_zod7.z.string()
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

// src/routes/feedback.ts
var import_zod8 = require("zod");
async function feedbackRoutes(fastify2) {
  fastify2.post("/feedback", async (request, reply) => {
    const createFeedbackProps = import_zod8.z.object({
      title: import_zod8.z.string(),
      description: import_zod8.z.string(),
      wallet: import_zod8.z.string(),
      photoHash: import_zod8.z.string()
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
  fastify2.get("/feedback", async (request, reply) => {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
    return { feedbacks };
  });
  fastify2.put("/feedback/status", async (request, reply) => {
    const updateFeedbackProps = import_zod8.z.object({
      id: import_zod8.z.string(),
      status: import_zod8.z.number()
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
  fastify2.post("/request-faucet", async (request, reply) => {
    const requestProps = import_zod8.z.object({
      wallet: import_zod8.z.string()
    });
    const { wallet } = requestProps.parse(request.body);
    await prisma.requestFaucet.create({
      data: {
        wallet
      }
    });
    return reply.status(201).send();
  });
  fastify2.get("/request-faucet", async (request, reply) => {
    const requests = await prisma.requestFaucet.findMany({
      orderBy: {
        createdAt: "asc"
      }
    });
    return { requests };
  });
  fastify2.put("/request-faucet/status", async (request, reply) => {
    const requestProps = import_zod8.z.object({
      id: import_zod8.z.string(),
      status: import_zod8.z.number()
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

// src/server.ts
var app = (0, import_fastify.default)();
app.register(import_cors.default, {
  origin: true
});
app.register(userRoutes);
app.register(delationRoutes);
app.register(inspectionRoutes);
app.register(authRoutes);
app.register(blogRoutes);
app.register(impactRoutes);
app.register(tokensRoutes);
app.register(feedbackRoutes);
app.register(import_jwt.default, {
  secret: process.env.JWT_SECRET_KEY || "123456"
});
app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
  console.log("HTTP Server Running!");
});
