"use client"
import {AiOutlineLogout} from 'react-icons/ai'
import {useCallback} from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function Combo(){
    const router = useRouter()
    const handleLog = useCallback(()=>{
       toast.success('logged out successfully')
       router.push('/')
    },[])
    return(
        <section onClick={handleLog}>
            <AiOutlineLogout/>
        </section>
    )
}