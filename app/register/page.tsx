"use client"

import Image from 'next/image'

import {toast} from 'react-hot-toast'

import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { Button } from '@/components/loginbtn'
import {useRouter} from 'next/navigation'
import { useState } from 'react'
import src from '@/app/icons/lx.png'
import Link from 'next/link'
import axios from 'axios'
import { supabase } from '../libs/supabase'

interface RegisterProps{
  data:{
    email:string;
    name:string;
    password:string;
  }
}



export default function Register(){
    const router = useRouter()
    const [email,setEmail]=useState('')
    const [name,setName] =useState('')
    const [password,setPassword] =useState('')
    const [confirmpassword,setConfirmPassword] =useState('')
    const [phone,setPhone] = useState('')
   
  
    const handleSubmit =async(e:React.FormEvent)=>{
     
        e.preventDefault()

        // if(!email||!password){
        //   toast.error("Fill all required fields")
        // }
      
      
      // const data={email:email,password:password}
      if(email && password && confirmpassword &&confirmpassword==password){
      //   const dat={email,password}
      // axios.post('/api/register',dat)
      // await prisma.user.create({
      //   data:{
      //     email,
      //     name,
      //     hashedPassword
      //   }
      // })
    
      const dataForm ={email,name,}

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
      // axios.post('api/post',dataForm)
      
      // if(user){
      //   router.push('/home')
      // }
      // .then(()=>{
      //   toast.success("Successfully registered")
      //   router.push("/home")
      // })
      // .catch((error)=>{
      //   toast.error("Something went wrong")
      // })
      
    }
    // if(!email||!password){
    //   toast.error('Fill all reuqired fields')
    // }
    else{ 
      toast.error('Password does not match')
      
    }
    
  
  }
    return (
      
      
      <main className='py-4 md:py-40 lg:py-10 flex justify-center items-center'>
     
           
         
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
