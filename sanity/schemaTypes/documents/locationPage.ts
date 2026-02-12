import { defineField, defineType } from "sanity";

export const locationPageType = defineType({
  name: "locationPage",
  title: "Location Page",
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
      name: "city",
      title: "City",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "region",
      title: "State",
      type: "string",
      initialValue: "MN",
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
      name: "seo",
      title: "SEO",
      type: "seo"
    })
  ]
});
