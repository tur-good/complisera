import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "Client Login",
  description: "Sign in to the Complisera compliance management workspace or explore the public product demo.",
  path: "/login",
  noIndex: true,
});

export default function LoginLayout({ children }: { children: ReactNode }) { return children; }
