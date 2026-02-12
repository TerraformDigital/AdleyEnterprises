"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "default",
  title: "Adley Enterprises CMS",
  projectId: projectId || "missing-project-id",
  dataset,
  plugins: [deskTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes
  }
});
