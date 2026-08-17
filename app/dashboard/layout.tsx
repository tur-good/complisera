import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({title:"Client Dashboard",description:"Complisera client workspace.",path:"/dashboard",noIndex:true});
export default function DashboardLayout({children}:{children:ReactNode}){return children;}
