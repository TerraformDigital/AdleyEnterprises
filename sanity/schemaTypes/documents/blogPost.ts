import { defineField, defineType } from "sanity";

export const blogPostType = defineType({
  name: "blogPost",
  title: "Blog Post",
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(220)
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "coverImageUrl",
      title: "Cover image URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] })
    }),
    defineField({
      name: "coverImageAlt",
      title: "Cover image alt text",
      type: "string",
      validation: (rule) => rule.max(160)
    }),
    defineField({
      name: "coverImageCreditName",
      title: "Cover image credit name",
      type: "string"
    }),
    defineField({
      name: "coverImageCreditUrl",
      title: "Cover image credit URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] })
    }),
    defineField({
      name: "coverImageSource",
      title: "Cover image source",
      type: "string"
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "richText",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo"
    })
  ]
});
