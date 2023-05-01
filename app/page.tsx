
"use client"

import Image from 'next/image'


import {toast} from 'react-hot-toast'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { Button } from '@/components/loginbtn'
import {useRouter} from 'next/navigation'
import { useCallback, useState } from 'react'
import src from '../app/icons/lx.png'
import Link from 'next/link'
import { supabase } from './libs/supabase'

export default function Home() {
  const router = useRouter()
  const [email,setEmail]=useState('')
  const [password,setPassword] =useState('')
  

  const handleSubmit = useCallback(async(e:React.FormEvent)=>{
    e.preventDefault()
    try{
    const {error} =   await supabase.auth.signInWithPassword({
      email:email,
      password: password
    })
    if(error){
      toast.error('Invalid credentials')
    }
    else{
    toast.success('Successfully Logged in')
    router.push('/home')
    }

  }catch(error){
    toast.error('Invalid credentials')
  }

},[email,password])
  return (
   
    
    <main className='py-32 lg:py-40 flex justify-center items-center'>
    
      <form className=' grid grid-cols-1 gap-3 py-10' onSubmit={handleSubmit}>
      <Image src={src} className="px-4"  priority alt='logo'/>
        <Label>Email:</Label>
        <Input type="email" placeholder="Email" name="email" value={email}
         onChange={(e)=>setEmail(e.target.value)}
        />
      
        
        <Label>Password:</Label>
        <Input required placeholder="Password" type="password" name="password" value={password} 
          onChange={(e)=>setPassword(e.target.value)}
        ></Input>
        <Button variant="default" type="submit" >Login</Button>
        <div className='flex flex-row text-center justify-center items-center'>
          <Link href='/register'>Create an Account</Link>
        </div>        
      </form>
    </main>
   
  )
}
