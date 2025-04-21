import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  bankLogos: defineTable(
    v.object({
      name: v.string(),
      png: v.string(),
      svg: v.string(),
      createdAt: v.number(),
    })
  ),
});