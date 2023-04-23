
"use client"

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import {toast} from 'react-hot-toast'
import signIn from 'next-auth'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { Button } from '@/components/loginbtn'
import {useRouter} from 'next/navigation'
import { useState } from 'react'
import src from '../app/icons/lx.png'
import Link from 'next/link'
import { supabase } from './libs/supabase'









const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const [email,setEmail]=useState('')
  const [password,setPassword] =useState('')
  const [error,setFormError] = useState('')

  const handleSubmit = async(e:React.FormEvent)=>{
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
  //   if(username && password){
  //     if(!username||!password){
  //       toast.error("You must fill all fields")
  //     }
      
  //     toast.success("Successfully logged in")
  //   router.push("/home")
  //   setFormError('')
      
  // }
  // else{
    // alert('Wrong email and password')
  //   toast.error('Wrong email and password')
  //   setFormError('Wrong email and password')
  // }
}
  return (
    <>
    
    <main className='py-40 lg:py-40 flex justify-center items-center'>
   
         
       
      <form className=' grid grid-cols-1 gap-3 py-10' onSubmit={handleSubmit}>
      <Image src={src} className="px-4"  priority alt='logo'/>
        <Label>Email:</Label>
        <Input type="email" placeholder="Email" name="email" value={email}
         onChange={(e)=>setEmail(e.target.value)}
        />
      
        
        <Label>Password:</Label>
        <Input required type="password" name="password" value={password} 
          onChange={(e)=>setPassword(e.target.value)}
        ></Input>
        <Button type="submit" >Login</Button>
        <div className='flex flex-row text-center justify-center items-center'>
          <Link href='/register'>Create an Account</Link>
        </div>
        {/* {error && (<p className='text-center'>{error}</p>)} */}
        
      </form>
    </main>
    </>
  )
}
