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

// src/routes/blog.ts
var blog_exports = {};
__export(blog_exports, {
  blogRoutes: () => blogRoutes
});
module.exports = __toCommonJS(blog_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/routes/blog.ts
var import_zod = require("zod");

// src/plugins/authenticated.ts
async function authenticated(req) {
  await req.jwtVerify();
}

// src/routes/blog.ts
async function blogRoutes(fastify) {
  fastify.post("/post", { onRequest: [authenticated] }, async (request, reply) => {
    const createPostProps = import_zod.z.object({
      title: import_zod.z.string(),
      description: import_zod.z.string(),
      bannerUrl: import_zod.z.string(),
      bannerAlt: import_zod.z.string(),
      bodyPost: import_zod.z.string(),
      language: import_zod.z.string(),
      keywords: import_zod.z.string(),
      url: import_zod.z.string()
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
  fastify.get("/posts/:language", async (request, reply) => {
    const reqParamsProps = import_zod.z.object({
      language: import_zod.z.string()
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
  fastify.get("/post/:url", async (request, reply) => {
    const reqParamsProps = import_zod.z.object({
      url: import_zod.z.string()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  blogRoutes
});
