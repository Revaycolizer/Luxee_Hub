"use client"

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import React from 'react';

import { toast } from 'react-hot-toast';
import { supabase } from '@/app/libs/supabase';
import Search from '../../search';
import Duser from '@/components/dynamic user/duser';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import Posts from '@/components/download/Posts';


interface User {
  id: number;
  name: string;
  email: string;
}

function User() {
  const searchParams = useParams();
  const id = searchParams?.id
  const [users, setUser] = useState<any | null>(null);
  const [posts, setPosts] = useState<any | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
       
      if (data) {
        setUser(data);
      } else if (error) {
        console.error(error);
      }
    }

    async function fetchPosts() { 
      const { data:files } = await supabase
        .from('category')
        .select('*')
        .eq('user', id)
   
      if (files) {
        const promises = files.map(async(file)=>{
            const {data:{publicUrl}} = supabase.storage.from('files').getPublicUrl(file.vname)
            const myImage = new CloudinaryImage(publicUrl, {cloudName: 'dloouwccf'})
            .resize(fill().width(100).height(150));

            const { count: likes } = await supabase
        .from('likes')
        .select('user_id', { count: 'exact' })
        .eq('post_id', file.id)
        .single()
          return {myImage,likes};
        })
        const posts = await Promise.all(promises)
        setPosts(posts);
        
    }
}
    if (id) {
      fetchUser();
      fetchPosts();
    }
  }, [id]);

  if (!id) {
    toast.error('No user with that id')
  }

//  

  
 
  
  return (
    <div>
     
     <aside className='md:py-5 '>
    <Search/>
    </aside>
    <div className='px-4'>
     {users && users.map((user:any)=>(<Duser key={user.id} user={user}/>))}
     </div>
     <p className='px-4 py-6'>Posts</p>
     <div className='fill px-4 flex flex-col justify-between  gap-3 md:grid grid-cols-5 lg:grid lg:grid-cols-6 md:gap-5 lg:gap-5'>
  {posts && posts.map((post:any)=>(<Posts key={post.id} post={post}/>))}
        </div>
    
    </div>
  );
}

export default User;