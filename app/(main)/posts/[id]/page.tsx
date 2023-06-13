"use client"

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useParams, redirect } from 'next/navigation';
import React from 'react';

import { toast } from 'react-hot-toast';
import { supabase } from '@/app/libs/supabase';
import Search from '../../search';

import { CloudinaryImage } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import Posts from '@/components/download/Posts';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types_db';


interface User {
  id: number;
  name: string;
  email: string;
}

function Post() {
  const searchParams = useParams();
  const id = searchParams?.id
  
  const [posts, setPosts] = useState<any | null>(null);
  const supabase = createClientComponentClient<Database>()
  useEffect(() => {

    async function fetchPosts() { 
      const { data:files } = await supabase
        .from('category')
        .select('*')
        .eq('id', id)
   
      if (files) {
        const promises = files.map(async(file)=>{
            const {data:{publicUrl}} = supabase.storage.from('files').getPublicUrl(file.vname)
            const myImage = new CloudinaryImage(publicUrl, {cloudName: 'dloouwccf'})
            .resize(fill().width(100).height(150));

        //     const { count: likes } = await supabase
        // .from('likes')
        // .select('user_id', { count: 'exact' })
        // .eq('post_id', file.id)
        // .single()
          return {id:file.id, myImage:myImage};
        })
        const posts = await Promise.all(promises)
        setPosts(posts);
        
    }
}
    if (id) {
    //   fetchPost();
      fetchPosts();
      Session();
    }
  }, [id]);

  if (!id) {
    toast.error('No user with that id')
  }

  const Session =useCallback(async()=>{
    const {data} =  await supabase.auth.getSession()
    if(!data){
      redirect("/")
    }
  },[])

  
 
  
  return (
    <div>
     
     <aside className='md:py-5 '>
    <Search/>
    </aside>
    
     <p className='px-4 py-6'>Posts</p>
     <div className='fill px-4 flex flex-col justify-between  gap-3 md:grid grid-cols-2 lg:grid lg:grid-cols-4 md:gap-5 lg:gap-5'>
  {posts && posts.map((post:any)=>(<Posts key={post.id} post={post}/>))}
        </div>
    
    </div>
  );
}

export default Post;