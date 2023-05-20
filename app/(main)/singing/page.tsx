"use client"

import { supabase } from '@/app/libs/supabase'
import Downloads from '@/components/download/downloaded'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Search from '../search'
import { CloudinaryImage } from '@cloudinary/url-gen'
import { fill } from '@cloudinary/url-gen/actions/resize'

const page = () => {
  const [downloads,setDownload] =useState<any | null>(null)
    useEffect(()=>{
     User()
    },[])

    const User = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        try {
          const { data: files } = await supabase
            .from('category')
            .select()
            .textSearch('selectedValue', "singing")
            console.log(files)
          if (files && files.length > 0) {
            const promises = files.map(async (file) => {
              const {data:{publicUrl}}  = supabase.storage
                .from('files')
                .getPublicUrl(file.vname)
                const myImage = new CloudinaryImage(publicUrl, {cloudName: 'dloouwccf'})
                .resize(fill().width(100).height(150));
              return {id:file.id, myImage:myImage}
            })
            const posts = await Promise.all(promises)
            console.log(posts)
            setDownload(posts)
          }
        } catch (error) {
          toast.error('Something went wrong')
          
        }
      }
    }
  return (
    <>
    <aside className='md:py-5'>
    <Search/>
    </aside>
    <div><section className='py-4'>
    <div className='fill px-4 flex flex-col justify-between  gap-3 md:grid grid-cols-3 lg:grid lg:grid-cols-3 gap-3'>
      
    {downloads && (downloads).map((download:any)=>(<Downloads key={download.id} download={download}/>))}
    {/* {dfiles && dfiles.map((dfile:any)=>(<File key={dfile.id} dfile={dfile}/>))} */}
    {/* {Object.keys(downloads).map((value)=>{return(
    <img src={`${downloads[value].signedUrl}`} alt={downloads[value].name}/>)})} */}
    
    </div>
    </section></div>
    </>
  )
}

export default page