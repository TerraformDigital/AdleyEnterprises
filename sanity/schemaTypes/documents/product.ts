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
      name: "price",
      title: "Price (USD)",
      type: "number"
    }),
    defineField({
      name: "priceCurrency",
      title: "Price currency",
      type: "string",
      initialValue: "USD"
    }),
    defineField({
      name: "mpn",
      title: "MPN",
      type: "string"
    }),
    defineField({
      name: "ebayItemNumber",
      title: "eBay item number",
      type: "string"
    }),
    defineField({
      name: "ebayUrl",
      title: "eBay listing URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] })
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
      initialValue: "Adley Enterprises"
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string"
    }),
    defineField({
      name: "material",
      title: "Material",
      type: "string"
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string"
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string"
    }),
    defineField({
      name: "condition",
      title: "Condition",
      type: "string"
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
      name: "shippingInfo",
      title: "Shipping info",
      type: "string"
    }),
    defineField({
      name: "returnPolicy",
      title: "Return policy",
      type: "string"
    }),
    defineField({
      name: "stockNote",
      title: "Stock note",
      type: "string"
    }),
    defineField({
      name: "unitsSoldNote",
      title: "Units sold note",
      type: "string"
    }),
    defineField({
      name: "locationNote",
      title: "Location note",
      type: "string"
    }),
    defineField({
      name: "madeIn",
      title: "Made in",
      type: "string",
      initialValue: "USA (Melrose, MN)"
    }),
    defineField({
      name: "compatibilityNote",
      title: "Compatibility note",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "socialProofNote",
      title: "Social proof note",
      type: "string"
    }),
    defineField({
      name: "isPublished",
      title: "Show on website",
      type: "boolean",
      initialValue: true
    }),
    defineField({
      name: "images",
      title: "Product images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "url",
              title: "Image URL",
              type: "string",
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (rule) => rule.required().max(180)
            })
          ]
        }
      ]
    }),
    defineField({
      name: "specifications",
      title: "Specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "value", title: "Value", type: "string", validation: (rule) => rule.required() })
          ]
        }
      ]
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
      name: "relatedProductSlugs",
      title: "Related product slugs",
      type: "array",
      of: [{ type: "string" }]
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo"
    })
  ]
});
