"use client"

import { useEffect } from "react"
import Search from "../search"
import { supabase } from "@/app/libs/supabase"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"



export default function profile(){

    const router = useRouter()

    useEffect(()=>{
     User()
    })

    const User =async()=>{
      const {data:{user}} =  await supabase.auth.getUser()

      if(user){
        const{error} = await supabase.from("profiles").select().eq('email',user)
        if(error){
           const load = toast.loading("Redirecting to Login Page")
           setTimeout(()=>{
            toast.dismiss(load)
           },500)
            router.push('/')
        }
        console.log(user)
      }
      else{
        router.push('/home')
      }
    }

    // const getUser=async()=>{
    //  const{error} = await supabase.from("profiles").select().eq()
    // }
    


    return(
        <>
        <aside className='md:py-5'>
    <Search/>
    </aside>
        
        <section >
            <h4 className='text-bra text-2xl text-center md:text-3xl lg:text-3xl'>My Profile</h4>
            {User.name}
        </section>
        </>
    )
}