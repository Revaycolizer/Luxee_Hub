"use client"

import { useCallback, useEffect, useState } from "react"
import Search from "../search"

import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Profile from "@/components/profile/Profile"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types_db"


// interface Array{
//    name:string;
// }

interface UserData{
  name:string;
  phone:string;
  email:string;
  prevState:null
}



export default function profile(){
  // const [profiles,setProfile] = useState<Record<string, any>[] | null>(null)
  // const [profiles,setProfile] = useState<UserData | null>(null)
  const [profiles,setProfile] = useState<any | null>(null)

    const router = useRouter()

    const supabase = createClientComponentClient<Database>()

    useEffect(()=>{
     User()
    },[])

    const User =useCallback(async()=>{
      const {data:{user}} =  await supabase.auth.getUser()

      if(user){
        const{data} = await supabase.from("profiles").select().eq('email',user.email)
        if(data){
           setProfile(data)
        }
       
      }
      else{
        const load = toast.loading("Redirecting to Login Page")
           setTimeout(()=>{
            toast.dismiss(load)
           },500)
            router.push('/')
      }
    },[])

    return(
        <>
        <aside className='md:py-5'>
    <Search/>
    </aside>
        
        <section  >
          <section className="flex items-center py-4 lg:py-0 justify-center">
          <div className=" rounded-full bg-bra px-3 w-48">
            <h4 className='text-white text-2xl text-center md:text-3xl lg:text-3xl'>My Profile</h4>
            </div>
            </section>
            <div className="flex items-center justify-center lg:py-4">
            {profiles && profiles.map((profile: any)=>(<Profile key={profile.id} profile={profile}  />))}
  
            </div>
        </section>
        </>
    )
}