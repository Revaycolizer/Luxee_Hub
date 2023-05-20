interface Props{
myImage:any;
id: number;
    likes:number;
    publicID:any
}



import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';
import {IoMdShareAlt} from 'react-icons/io'
import { supabase } from '@/app/libs/supabase';


const Downloads = ({download}:{download:Props}) => {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(download.likes)

  useEffect(() => {
    supabase
      .from('likes')
      .select('user_id')
      .eq('post_id', download.id)
      .then(response => {
        const { data, error } = response
        if (error) {
          console.error(error)
        } else {
          // Subscribe to changes in the likes table for this post
          supabase
            .from('likes')
            .select('user_id')
            .eq('post_id', download.id)
            .then(async response => {
              const { data, error } = response
              if (error) {
                console.error(error)
              } else {
                // If a new row is inserted into the likes table for this post, increment the number of likes
                setLikes(data.length)
                const { data: {user} } = await supabase.auth.getUser()
                if (user) {
                  const hasLiked = data.some(like => like.user_id === user.id)
                  setLiked(hasLiked)
                }
              }
            })
            
        }
      })
  }, [download.id])

  const handleLike = async () => {
    // Insert a new row into the likes table with the user ID and post ID
    const {data:{user}} = await supabase.auth.getUser()
    if(user){
    const { error } = await supabase
      .from('likes')
      .insert(
        { user_id: user.id, post_id: download.id }
        )

    if (error) {
      console.error(error)
    } else {
      // Increment the number of likes for this post
      setLiked(true)
      setLikes(likes => likes + 1)
      // setPosts(posts.map(p => p.id === post.id ? { ...p, likes: p.likes + 1 } : p))
    }
  }

  }

  const handleRemoveLike = async () => {
    // Insert a new row into the likes table with the user ID and post ID
    const {data:{user}} = await supabase.auth.getUser()
    if(user){
    const { error } = await supabase
      .from('likes')
      .delete()
       .eq('post_id',download.id )
       .eq('user_id',user.id)
        

    if (error) {
      console.error(error)
    } else {
      // Increment the number of likes for this post
      setLiked(false)
      setLikes(likes => likes - 1)
      // setPosts(posts.map(p => p.id === post.id ? { ...p, likes: p.likes + 1 } : p))
    }
  }

  }
  return (
    <div>
    <Card className='rounded-lg'><section><div><img className='fill' src={`${download.myImage.publicID}`}height={200}/></div><div className='px-8 py-4 flex flex-row justify-between'>
    {liked ? (
              <AiFillHeart size={24} onClick={handleRemoveLike} />
            ) : (
              <AiOutlineHeart size={24} onClick={handleLike} />
            )}{likes}
     <FaRegCommentDots size={24}/><IoMdShareAlt size={24}/></div></section></Card>
 </div>
  )
}

export default Downloads