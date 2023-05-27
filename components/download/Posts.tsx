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
  import DisplayUser from '../dynamic user/DisplayUser';
  import DisplayComment from '../dynamic user/DisplayComment';
  import Image from 'next/image';
  
  const Posts = ({post}:{post:Props}) => {
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(post.likes)
    const [comment, setComment] = useState('')
    const [open,setOpen] =useState(false)
    const [comments, setComments] = useState(post.comments)
    const [displaycomments,setDisplaycomments] = useState<any|null>(null)
    const [displayusers,setDisplayusers] = useState<any|null>(null)
  
    useEffect(() => {
      supabase
        .from('likes')
        .select('user_id')
        .eq('post_id', post.id)
        .then(response => {
          const { data, error } = response
          if (error) {
            console.error(error)
          } else {
            supabase
              .from('likes')
              .select('user_id')
              .eq('post_id', post.id)
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
    }, [post.id])
  
    const handleLike = async () => {
      const {data:{user}} = await supabase.auth.getUser()
      if(user){
      const { error } = await supabase
        .from('likes')
        .insert(
          { user_id: user.id, post_id: post.id }
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
     
      const { data,error } = await supabase
       .from('comments')
       .select() 
       .eq('post_id', post.id)
       if(error){
        toast.error('Something went wrong')
       }
       else{
           setComments(data.length)
           setDisplaycomments(data)
          if(data){
            const {data:{user}} = await supabase.auth.getUser()
            if(user){
            const useri = await supabase.from('profiles').select('name').eq('id',user.id)
            // setDisplaycomments(data)
            setDisplayusers(useri.data)
            console.log(useri)
            }
  
          }
       
    }
  }
  
  const handleShare = async()=>{
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this post!',
          text: 'I found this post and thought you might like it.',
          url: `http://localhost:3000/posts/${post.id}`
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      console.log('Web Share API not supported')
    }
  }
  
    const handleComment=async()=>{
      if(comment.length>0){
      const {data:{user}} = await supabase.auth.getUser()
      if(user){
      const { error } = await supabase
       .from('comments')
       .insert(
          { user_id: user.id, post_id: post.id, comment:comment }
          )
          if(error){
            toast.error('Something went wrong')
          }
          else{
            setComment('')
            toast.success('Comment added successfully')
            setOpen(false)
            setComments(comments => comments + 1)
            location.reload()
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
         .eq('post_id',post.id )
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
      <Card className='rounded-lg'><section><div><Image style={{ height:400,width:400}} width={500} height={200} priority={true} sizes="100vw" src={`${post.myImage.publicID}`} alt=''/></div><div className='px-8 py-4 flex flex-row justify-between'>
      {liked ? (
                <AiFillHeart size={24} onClick={handleRemoveLike} />
              ) : (
                <AiOutlineHeart size={24} onClick={handleLike} />
              )}{likes}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
       <FaRegCommentDots size={24} onClick={handleComment}/></DialogTrigger> <DialogContent className='justify-center items-center flex flex-col'><DialogTitle>Add a comment</DialogTitle>
        <DialogDescription>
        <Input type='text' required placeholder='Comment' value={comment}  onChange={(e)=>setComment(e.target.value)}/>
        </DialogDescription>
        <DialogDescription>
        <p className='text-pink-600 text-center'>Comments</p>
          <div className='flex items-center justify-center'>
         
        <div className='flex flex-row gap-2 justify-between'>
          <p className='text-blue-600'>{displayusers&& (displayusers).map((displayuser:any)=>(<DisplayUser key={displayuser.name} displayuser={displayuser}/>))}</p>
          <p className='text-rose-600'>{displaycomments&& (displaycomments).map((displaycomment:any)=>(<DisplayComment key={displaycomment.id} displaycomment={displaycomment}/>))}</p>
          {/* <p className='text-bra'>{displaycomments}</p> */}
          </div></div></DialogDescription><DialogFooter>
      
       <Button className='w-60 md:w-72 lg:w-72' type="submit" onClick={handleComment}>Post</Button>
          </DialogFooter>
          <DialogTrigger className='text-bra bg-rose-50 h-10 w-60 md:w-72 lg:w-72 text-center rounded-md'>Cancel</DialogTrigger></DialogContent></Dialog>{comments}<IoMdShareAlt size={24} onClick={handleShare}/></div></section></Card>
   </div>
    )
  }
  
  export default Posts
