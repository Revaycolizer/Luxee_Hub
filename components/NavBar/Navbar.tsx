"use client"

import Menu from "@/app/(main)/menu"
import Search from "@/app/(main)/search"

import Avatar from "@/app/(main)/avatar"
import Container from "@/app/(main)/Container"

import Logo from "./Logo"


export default function Navbar(){
    return(
    <div className="fixed w-full bg-white z-10 shadow-sm">
    <div className="py-0
    border-b-[1px]">
        <Container>
        <div className="flex
        flex-row
        items-center
        justify-between
        gap-3
        md:gap-0">
       
       <Logo/> <Menu/><Search/><Avatar/>
        
        </div>
        </Container>
    </div>
    </div>
    )
}