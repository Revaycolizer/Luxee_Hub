"use client"

import Image from 'next/image'

import {toast} from 'react-hot-toast'

import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { Button } from '@/components/loginbtn'
import {useRouter} from 'next/navigation'
import { useCallback, useState } from 'react'
import src from '@/app/icons/lx.png'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types_db'

export default function Register(){
    const router = useRouter()
    const [email,setEmail]=useState('')
    const [name,setName] =useState('')
    const [password,setPassword] =useState('')
    const [confirmpassword,setConfirmPassword] =useState('')
    const [phone,setPhone] = useState('')
   const supabase = createClientComponentClient<Database>()
  
    const handleSubmit =useCallback(async(e:React.FormEvent)=>{  
        e.preventDefault()
      if(email && password && confirmpassword &&confirmpassword==password){
      try{

   const {error} =   await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            phone:phone,
            email:email
            
          }
        }
      })
      if(error){
        toast.error('Unable to perform registration')
      }
      else{
      toast.success('Successfully registered')
      router.push('/home')
      }

    }catch(error){
      toast.error('Something went wrong')
    }
    
    }
    
    else{ 
      toast.error('Password does not match')
    }
  
  },[email,name,password,phone,confirmpassword])
    return (
      
      
      <main className='py-8 md:py-40 lg:py-10 flex justify-center items-center'>
     
           
         
        <form className=' grid grid-cols-1 gap-3 py-10' onSubmit={handleSubmit}>
        <Image src={src} className="px-4"  priority alt='logo'/>
          <Label>Email:</Label>
          <Input type="email" placeholder="Email" name="email" value={email} required
           onChange={(e)=>setEmail(e.target.value)}
          />

          <Label>Username</Label>
          <Input type="name" placeholder="Name" name="name" value={name} required
           onChange={(e)=>setName(e.target.value)}
          />

         <Label>Phone</Label>
          <Input type="text" placeholder="Phone" name="phone" value={phone} required
           onChange={(e)=>setPhone(e.target.value)}
          />
        
          
          <Label>Password:</Label>
          <Input type="password" name="hashedPassword" placeholder='password' value={password} required 
            onChange={(e)=>setPassword(e.target.value)}
          ></Input>
          <Label>Retype Password:</Label>
          <Input type="password" placeholder='Confirm password' name="confirmpassword" value={confirmpassword} required
            onChange={(e)=>setConfirmPassword(e.target.value)}
          ></Input>
          <Button variant="default" type="submit" >Register</Button>
          <div className='flex flex-row text-center justify-center items-center gap-3'>
            <p className='text-bra'>Already having an Account?</p>
            <Link className='cursor-pointer font-bold text-blue-900' href='/'>Login</Link>
          </div>
         
          
        </form>
      </main>
      )
}
