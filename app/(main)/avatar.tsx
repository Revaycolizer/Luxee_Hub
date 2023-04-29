"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar"
import { AiOutlineLogout } from "react-icons/ai"
import {useCallback} from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { supabase } from '../libs/supabase'

export default function avatar(){

   const router = useRouter()
    const handleLog = useCallback(async()=>{
        const {error} = await supabase.auth.signOut()
        if(error){
          toast.error('Something went wrong')
        }else{
        toast.success('logged out successfully')
        router.push('/')
        }
     },[])
   return(
      <section className="flex flex-row justify-between gap-4 lg:gap-12">
    <section className="py-4 hidden sm:block">
    <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  
  </section>

<section className="md:py-5" onClick={handleLog}>
<AiOutlineLogout size={32}/>
</section>
</section>
  
   )
}