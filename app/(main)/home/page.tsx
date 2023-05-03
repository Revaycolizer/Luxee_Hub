"use client"


import React, { useCallback, useEffect, useState } from 'react'
import Search from '../search'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/input'

import { Select,SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { supabase } from '@/app/libs/supabase'
import Downloads from '@/components/download/downloaded'
import File from '@/components/download/file'
import Image from 'next/image'

export default function page(){
  const [vname,setVname] = useState('')
  const [vfile,setVfile] = useState<File |null>(null)
  const [selectedValue, setSelectedValue] =useState({category:'dance'})
  const [open,setOpen] =useState(false)
  const [file_url,setFile_url] = useState<any | null>(null)
  const [user,setUser] = useState<any | null>(null)
  const [downloads,setDownload] =useState<any | null>(null)
  const [dfiles,setDfiles] = useState<any | null>(null)
  const router = useRouter()

  useEffect(()=>{
   User()
   fetchPosts()
  },[])


  const User =useCallback(async()=>{
    const {data:{user}} =  await supabase.auth.getUser()
    if(user){
      const userId = await supabase.from("profiles").select('id').eq('email',user.email)
      setUser(userId)
    }
  },[])

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files
    if(!file) return
    setVfile(file[0])
  }

  const has=(e: React.ChangeEvent<HTMLSelectElement>)=>{
    setSelectedValue({ ...selectedValue, [e.target.name]: e.target.value.trim() });
   
  }

  const category = React.useRef<HTMLSelectElement>(null)
 

  const handlePost =useCallback(async()=>{
    if(user){
     console.log(user)
    try{
      if(vfile){
        const {data,error} = await supabase.storage.from('files').upload(vname,vfile,)
        if(error){
          toast.error('something went wrong')
        }
        else{
       setFile_url(data.path)
        }
      }
      if(vname){
        const data = await supabase.from('category').insert({
          vname:vname,
          file_url:file_url,
          selectedValue:selectedValue,
          user:user
        })
        
        if(data && vname && vfile){
         
          toast.success('Post uploaded successfully')
          setOpen(false)
          }
          else{
            toast.error('Unable to post')
          }
      }
    }catch(error){
     toast.error('Something went wrong')
    }
    
   }else{
    toast.error('You need to sign in')
   }
  },[vname,vfile,selectedValue,file_url,user])

  const fetchPosts=useCallback(async()=>{
    const { data:files } = await supabase
    .storage
    .from('files')
    .list()

    if(files){
    for (const file of files) {
    //   console.log(file)
      const { data:posts } = await supabase.storage.from('files').createSignedUrl(file.name, 3600000)
     if(posts){
      // for(const post of posts){
      // const dwn = await supabase.storage.from('files').download(file.name)
        
      const diwn = await supabase.from('category').select().eq('vname',file.name)
      // }
      // setDownload(URL.createObjectURL(dwn))
      setDownload([posts])
      setDfiles(diwn)
      console.log(posts)
      console.log(diwn)
      // }
    }
     
    }
  }
  },[])
  return (
    <>
    <aside className='md:py-5'>
    <Search/>
    </aside>
    <section>
      <div className='flex flex-row justify-between gap-2 px-4 py-6 md:py-6 lg:py-0'>
    <h4 className='text-bra text-xl md:text-3xl lg:text-3xl'>Recent Posts</h4>
    <form onSubmit={handlePost}>
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger><div className='bg-rose-500 h-8 text-white px-2 py-1 rounded-md'>Add Post</div></DialogTrigger>
    
    <DialogContent className='justify-center items-center flex flex-col'>
     
    <DialogTitle>Add Your New Post</DialogTitle>
      <DialogDescription>
      <Input type='text' required placeholder='File Name' value={vname}  onChange={(e)=>setVname(e.target.value)}/>
      </DialogDescription>
      <DialogDescription>
      <input type='file' required placeholder='Upload your video' size={10} multiple={false} accept="audio/*,video/*,image/*" 
      onChange={onChange}
      />
    </DialogDescription>
    <DialogDescription>
       {/* <Select value={selectedValue}
        onValueChange={(e)=>has}
        >
      <SelectTrigger className="w-[240px]">
        <SelectValue  placeholder="Select a File Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="dance">Dance</SelectItem>
          <SelectItem value="comedy">Comedy</SelectItem>
          <SelectItem value="singing">Singing</SelectItem>
          <SelectItem value="education">Education</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select> */}
    <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder='Select a File Category' ref={category} onChange={has} name='category' value={selectedValue.category}>
    <option value="dance">Dance</option>
            <option value="comedy">Comedy</option>
            <option value="singing">Singing</option>
            <option value="education">Education</option>

    </select>
    </DialogDescription>
    <DialogFooter>
     <Button className='w-60 md:w-72 lg:w-72' type="submit" onClick={handlePost}>Post</Button>
        </DialogFooter>
        <DialogTrigger>Cancel</DialogTrigger>
    </DialogContent>
    </Dialog></form></div>
    
    <div className=' px-4 md:grid grid-clos-3 lg:grid lg:grid-cols-3 gap-3'>
    {downloads && (downloads).map((download:any)=>(<Downloads key={download.signedUrl} download={download}/>))}
    {/* {dfiles && dfiles.map((dfile:any)=>(<File key={dfile.id} dfile={dfile}/>))} */}
    {/* {Object.keys(downloads).map((value)=>{return(
    <img src={`${downloads[value].signedUrl}`} alt={downloads[value].name}/>)})} */}
    </div>
    
    </section>
    </>
  )
}

