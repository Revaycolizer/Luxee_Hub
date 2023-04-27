"use client"
import {AiOutlineLogout} from 'react-icons/ai'
import {useCallback} from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { supabase } from '../libs/supabase'

export default function Combo(){
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
        <section onClick={handleLog}>
            <AiOutlineLogout/>
        </section>
    )
}