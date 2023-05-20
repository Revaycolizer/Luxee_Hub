interface Props{
myImage:any;
id: number;
    likes:number;
    publicID:any;
    comments:number;
}



import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';
import {IoMdShareAlt} from 'react-icons/io'
import { supabase } from '@/app/libs/supabase';
import { Dialog, DialogDescription, DialogTrigger,DialogTitle,DialogContent,DialogFooter } from '../ui/dialog';
import { Input } from '@/components/input'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast';


const Downloads = ({download}:{download:Props}) => {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(download.likes)
  const [comment, setComment] = useState('')
  const [open,setOpen] =useState(false)
  const [comments, setComments] = useState(download.comments)

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
      }),
      fetchComments()
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

  const fetchComments=async()=>{
    const {data:{user}} = await supabase.auth.getUser()
    if(user){
    const { data,error } = await supabase
     .from('comments')
     .select()
     .eq('user_id', user.id)  
     .eq('post_id', download.id)
     if(error){
      toast.error('Something went wrong')
     }
     else{
         setComments(data.length)
     }
  }
}

  const handleComment=async()=>{
    if(comment.length>0){
    const {data:{user}} = await supabase.auth.getUser()
    if(user){
    const { error } = await supabase
     .from('comments')
     .insert(
        { user_id: user.id, post_id: download.id, comment:comment }
        )
        if(error){
          toast.error('Something went wrong')
        }
        else{
          setComment('')
          toast.success('Comment added successfully')
          setOpen(false)
          setComments(comments => comments + 1)
        }
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
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
     <FaRegCommentDots size={24} onClick={handleComment}/></DialogTrigger> <DialogContent className='justify-center items-center flex flex-col'><DialogTitle>Add a comment</DialogTitle>
      <DialogDescription>
      <Input type='text' required placeholder='File Name' value={comment}  onChange={(e)=>setComment(e.target.value)}/>
      </DialogDescription><DialogFooter>
    
     <Button className='w-60 md:w-72 lg:w-72' type="submit" onClick={handleComment}>Post</Button>
        </DialogFooter>
        <DialogTrigger className='text-bra bg-rose-50 h-10 w-60 md:w-72 lg:w-72 text-center rounded-md'>Cancel</DialogTrigger></DialogContent></Dialog>{comments}<IoMdShareAlt size={24}/></div></section></Card>
 </div>
  )
}

export default Downloads