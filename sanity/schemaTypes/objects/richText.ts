import { defineType } from "sanity";

export const richTextType = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [{ type: "block" }]
});
