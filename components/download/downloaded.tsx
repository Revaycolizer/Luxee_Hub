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
          supabase
            .from('likes')
            .select('user_id')
            .eq('post_id', download.id)
            .then(async response => {
              const { data, error } = response
              if (error) {
                console.error(error)
              } else {
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
      setLiked(true)
      setLikes(likes => likes + 1)
    }
  }

  }

  const handleRemoveLike = async () => {
   
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
     
      setLiked(false)
      setLikes(likes => likes - 1)
      
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