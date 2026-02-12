import { defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(220)
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "richText"
    }),
    defineField({
      name: "featured",
      title: "Featured on home",
      type: "boolean",
      initialValue: false
    }),
    defineField({
      name: "priority",
      title: "Sort priority",
      type: "number"
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo"
    })
  ]
});
