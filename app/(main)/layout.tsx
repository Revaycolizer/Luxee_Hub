"use client"

// import Menu from "./menu"

import Navbar from "@/components/NavBar/Navbar"
import ClientOnly from "../../components/hydra/Hydra"




export default function RootLayout({children}
    : {
        children: React.ReactNode
      }){
  return (
    <section>
        {/* <aside className="w-1/4 "><Menu/></aside> */}
        <ClientOnly>
        <main><Navbar/>{children}</main></ClientOnly>
    </section>
  )
}



