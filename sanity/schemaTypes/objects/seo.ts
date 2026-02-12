import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      validation: (rule) => rule.max(70)
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(170)
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url"
    }),
    defineField({
      name: "noIndex",
      title: "No index",
      type: "boolean",
      initialValue: false
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string"
        })
      ]
    })
  ]
});
