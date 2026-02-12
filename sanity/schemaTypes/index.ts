import { blogPostType } from "./documents/blogPost";
import { faqItemType } from "./documents/faqItem";
import { locationPageType } from "./documents/locationPage";
import { productType } from "./documents/product";
import { projectType } from "./documents/project";
import { serviceType } from "./documents/service";
import { siteSettingsType } from "./documents/siteSettings";
import { richTextType } from "./objects/richText";
import { seoType } from "./objects/seo";

export const schemaTypes = [
  seoType,
  richTextType,
  siteSettingsType,
  serviceType,
  locationPageType,
  productType,
  faqItemType,
  blogPostType,
  projectType
];
