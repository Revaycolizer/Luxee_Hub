"use client"

// import Menu from "./menu"

import Navbar from "@/components/NavBar/Navbar"




export default function RootLayout({children}
    : {
        children: React.ReactNode
      }){
  return (
    <section>
        {/* <aside className="w-1/4 "><Menu/></aside> */}
        <main><Navbar/>{children}</main>
    </section>
  )
}

