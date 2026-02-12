import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
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
      name: "summary",
      title: "Summary",
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
      name: "inquiryOnly",
      title: "Inquiry only",
      type: "boolean",
      initialValue: true
    }),
    defineField({
      name: "shippingScope",
      title: "Shipping scope",
      type: "string",
      initialValue: "USA only"
    }),
    defineField({
      name: "variants",
      title: "Product variants",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Variant name", type: "string" }),
            defineField({
              name: "description",
              title: "Variant description",
              type: "text",
              rows: 2
            })
          ]
        }
      ]
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo"
    })
  ]
});
