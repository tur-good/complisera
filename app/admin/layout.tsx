import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "../seo";
import { requireRole } from "../../lib/auth";

export const metadata: Metadata = pageMetadata({title:"Administration",description:"Complisera administration workspace.",path:"/admin",noIndex:true});
export default async function AdminLayout({children}:{children:ReactNode}){await requireRole("admin");return children;}
