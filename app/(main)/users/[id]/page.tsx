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
import {SlUserFollowing,SlUserFollow} from 'react-icons/sl'


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
  const [followed, setFollowed] = useState(false);
  const [follows, setFollows] = useState(0);

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
          const { data: { publicUrl } } = supabase.storage
            .from('files')
            .getPublicUrl(file.vname);
          const myImage = new CloudinaryImage(publicUrl, {cloudName: 'dloouwccf'})
            .resize(fill().width(100).height(200));
           
          return {id:file.id, myImage:myImage};
        })
        const posts = await Promise.all(promises)
        setPosts(posts);
        
    }
}

async function fetchFollow() {
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from('follows')
      .select('user_id')
      .eq('follow_id', id);

    if (error) {
      console.error(error);
    } else {
      setFollows(data.length);
      const hasFollowed = data.some(like => like.user_id === user.id);
      setFollowed(hasFollowed);
    }
  }
}

    if (id) {
      fetchUser();
      fetchPosts();
      fetchFollow();
    }
  }, [id]);

  if (!id) {
    toast.error('No user with that id')
  }


  const handleFollow = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from('follows')
        .insert({ user_id: user.id, follow_id: id });
      if (error) {
        console.error(error);
      } else {
        setFollowed(true);
        setFollows(follows => follows + 1);
      }
    }
  };

  const handleUnfollow = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('user_id', user.id)
        .eq('follow_id', id);
      if (error) {
        console.error(error);
      } else {
        setFollowed(false);
        setFollows(follows => follows - 1);
      }
    }
  };
 

  
 
  
  return (
    <div>
     
     <aside className='md:py-5 '>
    <Search/>
    </aside>
    <div className='px-4 flex items-center justify-center'>
     {users && users.map((user:any)=>(<Duser key={user.id} user={user}/>))}
     </div>
     <div className='flex items-center justify-center'>
     <div className='flex flex-col justify-between gap-2'>
        {followed ? (
          <div className='flex flex-row justify-between gap-2 bg-rose-300 px-4 py-2 rounded-md' onClick={handleUnfollow}>
          <SlUserFollowing onClick={handleUnfollow} size={24}>Unfollow</SlUserFollowing>
          <p>Unfollow</p>
          </div>
        ) : (
          <div className='flex flex-row justify-between gap-2 bg-rose-600 px-4 py-2 rounded-md' onClick={handleFollow}>
          <SlUserFollow onClick={handleFollow} size={24}>Follow</SlUserFollow>
          <p>Follow</p>
          </div>
        )}
        <p>Followers: {follows}</p>
      </div>
      </div>
     <p className='px-4 py-6'>Posts</p>
     <div className='fill px-4 flex flex-col justify-between  md:grid grid-cols-2 lg:grid lg:grid-cols-4 md:gap-5 lg:gap-5'>
  {posts && posts.map((post:any)=>(<Posts key={post.id} post={post}/>))}
        </div>
    
    </div>
  );
}

export default User;