import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "Product or Packaging Assessment",
  description: "Assess whether an item is likely packaging, potentially part of the product, or requires individual review based on its function and intended use.",
  path: "/assessment",
});

export default function AssessmentLayout({ children }: { children: ReactNode }) { return children; }
