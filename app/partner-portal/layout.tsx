import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "../seo";
import { requireRole } from "../../lib/auth";

export const metadata: Metadata = pageMetadata({title:"Partner Portal",description:"Complisera partner workspace.",path:"/partner-portal",noIndex:true});
export default async function PartnerLayout({children}:{children:ReactNode}){await requireRole("partner");return children;}
