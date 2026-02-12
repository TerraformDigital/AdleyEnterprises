import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
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
      }
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string"
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "service",
      title: "Related service",
      type: "reference",
      to: [{ type: "service" }]
    }),
    defineField({
      name: "beforeImage",
      title: "Before image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" })
      ]
    }),
    defineField({
      name: "afterImage",
      title: "After image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" })
      ]
    })
  ]
});
