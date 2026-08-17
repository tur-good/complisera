import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "../seo";
export const metadata:Metadata=pageMetadata({title:"Customer Support",description:"Contact Complisera about account access, billing, data rights or product questions.",path:"/support",noIndex:false});
export default function Layout({children}:{children:ReactNode}){return children}
