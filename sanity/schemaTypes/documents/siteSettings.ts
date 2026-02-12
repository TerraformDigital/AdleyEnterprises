import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "legalName",
      title: "Legal business name",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email()
    }),
    defineField({
      name: "streetAddress",
      title: "Street address",
      type: "string",
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
      title: "State/Region",
      type: "string",
      initialValue: "MN",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "postalCode",
      title: "Postal code",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "country",
      title: "Country code",
      type: "string",
      initialValue: "US",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "serviceRadiusMiles",
      title: "Service radius (miles)",
      type: "number",
      initialValue: 30,
      validation: (rule) => rule.required().positive()
    }),
    defineField({
      name: "insured",
      title: "Insured",
      type: "boolean",
      initialValue: true
    }),
    defineField({
      name: "yearsInBusiness",
      title: "Years in business",
      type: "number",
      initialValue: 15
    }),
    defineField({
      name: "warrantyNote",
      title: "Warranty note",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "aboutSummary",
      title: "About summary",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "hours",
      title: "Business hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "day", title: "Day", type: "string" }),
            defineField({ name: "opens", title: "Opens", type: "string" }),
            defineField({ name: "closes", title: "Closes", type: "string" }),
            defineField({ name: "notes", title: "Notes", type: "string" })
          ]
        }
      ]
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "seo"
    })
  ],
  preview: {
    prepare: () => ({
      title: "Site Settings"
    })
  }
});
