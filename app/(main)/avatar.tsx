"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar"

export default function avatar(){
   return(
    <section className="py-4 hidden sm:block">
    <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  
  </section>
  
   )
}