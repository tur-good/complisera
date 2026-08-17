import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "../seo";
export const metadata:Metadata=pageMetadata({title:"EU Compliance Dashboard Demo",description:"Explore a sample Complisera compliance dashboard with country actions, packaging records, deadlines and evidence.",path:"/demo"});
export default function Layout({children}:{children:ReactNode}){return children}
