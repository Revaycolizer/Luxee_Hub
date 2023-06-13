"use client"


import React, { useCallback, useEffect, useState } from 'react'
import Search from '../search'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/input'

import { Select,SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select'
import { redirect, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { supabase } from '@/app/libs/supabase'
import Downloads from '@/components/download/downloaded'
import File from '@/components/download/file'
import Image from 'next/image'
import { CloudinaryImage } from '@cloudinary/url-gen'
import { fill } from '@cloudinary/url-gen/actions/resize'
import tus from 'tus-js-client'
import { Progress } from '@/components/ui/progress'
import { AuthContextProvider } from '@/src/utils/middleware'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types_db'


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
  const [progress,setProgess] = useState(0)


  const supabase = createClientComponentClient<Database>()
  useEffect(()=>{
   User()
   fetchPosts()
   Session()
  },[])


  const User =useCallback(async()=>{
    const {data:{user}} =  await supabase.auth.getUser()
    if(user){
      setUser(user.id)
    }
  },[])

  const Session =useCallback(async()=>{
    const {data} =  await supabase.auth.getSession()
    if(!data){
      redirect("/")
    }
  },[])

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files
    if(!file) return
    setVfile(file[0])
  }

  const has=(e: React.ChangeEvent<HTMLSelectElement>)=>{
    setSelectedValue({ ...selectedValue, [e.target.name]: e.target.value.trim() });
   console.log(user)
  }

  const category = React.useRef<HTMLSelectElement>(null)


  
  

  // const handlePost = useCallback(async () => {
  //   if (user) {
  //     try {
  //       if (vfile) {
  //         const upload = new tus.Upload(vfile, {
  //           endpoint: `https://${projectId}.supabase.co/storage/v1/upload/resumable`,
  //           retryDelays: [0, 3000, 5000, 10000, 20000],
  //           headers: {
  //             authorization: `Bearer ${token}`,
  //             'x-upsert': 'true', // optionally set upsert to true to overwrite existing files
  //           },
  //           uploadDataDuringCreation: true,
  //           metadata: {
  //             bucketName: 'files',
  //             objectName: vname,
  //             contentType: 'image/png',
  //             cacheControl: 3600,
  //           },
  //           chunkSize: 6 * 1024 * 1024, // NOTE: it must be set to 6MB (for now) do not change it
  //           onError: function (error) {
  //             console.log('Failed because: ' + error)
  //             toast.error('something went wrong')
  //           },
  //           onProgress: function (bytesUploaded, bytesTotal) {
  //             var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
  //             console.log(bytesUploaded, bytesTotal, percentage + '%')
  //           },
  //           onSuccess: function () {
  //             setFile_url(upload.url)
  //           },
  //         })
  
  //         upload.start()
  //       }
  
  //       if (vname) {
  //         const data = await supabase.from('category').insert({
  //           vname: vname,
  //           selectedValue: selectedValue.category,
  //           user: user,
  //         })
  
  //         if (data && vname && vfile) {
  //           toast.success('Post uploaded successfully')
  //           setOpen(false)
  //           location.reload()
  //         } else {
  //           toast.error('Unable to post')
  //         }
  //       }
  //     } catch (error) {
  //       toast.error('Something went wrong')
  //     }
  //   } else {
  //     toast.error('You need to sign in')
  //   }
  // }, [vname, vfile, selectedValue, user])
 
  const handlePost =useCallback(async()=>{
    if(user){
    try{
      if(vfile){
        const {data,error} = await supabase.storage.from('files').upload(vname,vfile,)
        if(error){
          toast.error('something went wrong')
        }
        else{
       setFile_url(data.path)
       setProgess(10)
        }
      }
      if(vname){ 
        const data = await supabase.from('category').insert({
          vname:vname,
          selectedValue:selectedValue.category,
          user:user
        })
        
        if(data && vname && vfile){
          setProgess(100)
          setTimeout(()=>{
          toast.success('Post uploaded successfully')
          setOpen(false)
          router.refresh()
        },100)
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
  },[vname,vfile,selectedValue,user])

  const fetchPosts=useCallback(async()=>{
    const { data:files } = await supabase
    .from('category')
            .select()

    if(files && files.length>0){
      const promises = files.map(async(file)=>{
        const { data: { publicUrl } } = supabase.storage
          .from('files')
          .getPublicUrl(file.vname);
          
        const myImage = new CloudinaryImage(publicUrl, {cloudName: 'dloouwccf'})
          .resize(fill().width(100).height(200));
          console.log(myImage)
        
        return {id:file.id, myImage:myImage};
      });
      const posts = await Promise.all(promises);
      setDownload(posts);
      console.log(posts)
      
    }
  
  },[])
  return (
    <AuthContextProvider>
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
    
    <Progress value={progress}/>
    
    <DialogFooter>
    <div id="progress-bar-container"></div>
    
     <Button className='w-60 md:w-72 lg:w-72' type="submit" onClick={handlePost}>Post</Button>
        </DialogFooter>
        <DialogTrigger className='text-bra bg-rose-50 h-10 w-60 md:w-72 lg:w-72 text-center rounded-md'>Cancel</DialogTrigger>
    </DialogContent>
    </Dialog></form></div>
    <section className='py-4'>
    <div className=' px-6 flex flex-col  justify-between  gap-3 md:grid grid-cols-2 lg:grid lg:grid-cols-4 md:gap-5 lg:gap-5'>
      
    {downloads && (downloads).map((download:any)=>(<Downloads key={download.id} download={download}/>))}
    
    {/* {dfiles && dfiles.map((dfile:any)=>(<File key={dfile.id} dfile={dfile}/>))} */}
    {/* {Object.keys(downloads).map((value)=>{return(
    <img src={`${downloads[value].signedUrl}`} alt={downloads[value].name}/>)})} */}
    
    </div>
    </section>
    
    </section>
    </>
    </AuthContextProvider>
  )
}

