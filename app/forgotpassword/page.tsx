'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '../libs/supabase';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/input'

export default function ForgotPassword(){
const [email,setEmail] = useState('')
const [new_password,setPassword] = useState('')

  const changepassword = async(e:React.FormEvent) => {
    e.preventDefault()
   try{
    const {error} = await supabase.auth.updateUser({
      email:email,
      password: new_password
    })
    if(error){
      toast.error('Something went wrong while updating your password')
    }else{
      toast.success('Password updated successfully!')
      setPassword('')
      setEmail('')
    }
  }catch(error){
    toast.error('Something went wrong')
   }
  }

  return(
    <section className='pt-64'>
    <div className='flex justify-center items-center'>
     <form onSubmit={changepassword}>
      <div className='w-full max-w-md'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
        <Input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' type='email' id='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>Password</label>
        <Input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' type='text' id='password' placeholder='Enter new password' value={new_password} onChange={(e) => setPassword(e.target.value)} />
        <div className='items-center flex justify-center '>
        <Button type='submit'>Submit</Button>
        </div>
      </div>
     </form>
    </div>
    </section>
  )
}