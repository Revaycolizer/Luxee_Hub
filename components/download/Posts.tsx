"use  client"

interface Props{
    publicID:any;
    id: number;
    likes:number;
    }
    
    
    
    import React, { useEffect, useState } from 'react'
    import { Card } from '../ui/card';
    import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
    import { FaRegCommentDots } from 'react-icons/fa';
    import {IoMdShareAlt} from 'react-icons/io'
import { supabase } from '@/app/libs/supabase';
    
    
    const Posts = ({post}:{post:Props}) => {

        const [liked, setLiked] = useState(false)
        const [likes, setLikes] = useState(post.likes)

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
                // Subscribe to changes in the likes table for this post
                supabase
                  .from('likes')
                  .select('user_id')
                  .eq('post_id', post.id)
                  .then(response => {
                    const { data, error } = response
                    if (error) {
                      console.error(error)
                    } else {
                      // If a new row is inserted into the likes table for this post, increment the number of likes
                      setLikes(data.length)
                    }
                  })
                  
              }
            })
        }, [post.id])

  const handleLike = async () => {
    // Insert a new row into the likes table with the user ID and post ID
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
      // Increment the number of likes for this post
      setLiked(true)
      setLikes(likes => likes + 1)
      // setPosts(posts.map(p => p.id === post.id ? { ...p, likes: p.likes + 1 } : p))
    }
  }
  }
      return (
        <div>
        <Card className='rounded-lg'><section><div><img className='fill' src={`${post.publicID}`} /></div><div className='px-8 py-4 flex flex-row justify-between'>
        {liked ? (
              <AiFillHeart size={24} onClick={handleLike} />
            ) : (
              <AiOutlineHeart size={24} onClick={handleLike} />
            )}
         <FaRegCommentDots size={24}/><IoMdShareAlt size={24}/></div></section></Card>
     </div>
      )
    }
    
    export default Posts





//     import { useState } from 'react'
// import { supabase } from '@/app/libs/supabase'
// import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

// const Posts = ({ post }: { post: { image: any, likes: number } }) => {
//   const [liked, setLiked] = useState(false)

//   const handleLike = async () => {
//     // Insert a new row into the likes table with the user ID and post ID
//     const { error } = await supabase
//       .from('likes')
//       .insert({ user_id: supabase.auth.user()?.id, post_id: post.id })

//     if (error) {
//       console.error(error)
//     } else {
//       // Increment the number of likes for this post
//       setLiked(true)
//       setPosts(posts.map(p => p.id === post.id ? { ...p, likes: p.likes + 1 } : p))
//     }
//   }

//   return (
//     <div>
//       <Card className='rounded-lg'>
//         <section>
//           <div>
//             <img className='fill' src={`${post.image}`} />
//           </div>
//           <div className='px-8 py-4 flex flex-row justify-between'>
//             {liked ? (
//               <AiFillHeart size={24} onClick={handleLike} />
//             ) : (
//               <AiOutlineHeart size={24} onClick={handleLike} />
//             )}
//             <FaRegCommentDots size={24} />
//             <IoMdShareAlt size={24} />
//           </div>
//         </section>
//       </Card>
//     </div>
//   )
// }




// import { useState, useEffect } from 'react'
// import { supabase } from '@/app/libs/supabase'
// import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

// const Posts = ({ post }: { post: { image: any, likes: number } }) => {
//   const [liked, setLiked] = useState(false)
//   const [likes, setLikes] = useState(post.likes)

//   useEffect(() => {
//     // Subscribe to changes in the likes table for this post
//     const { data: likes, error } = supabase
//       .from('likes')
//       .select('user_id')
//       .eq('post_id', post.id)
//       .on('INSERT', payload => {
//         // If a new row is inserted into the likes table for this post, increment the number of likes
//         setLikes(likes => likes + 1)
//       })
//       .subscribe()

//     if (error) {
//       console.error(error)
//     }

//     // Unsubscribe from changes when the component unmounts
//     return () => {
//       likes?.unsubscribe()
//     }
//   }, [post.id])

//   const handleLike = async () => {
//     // Insert a new row into the likes table with the user ID and post ID
//     const { error } = await supabase
//       .from('likes')
//       .insert({ user_id: supabase.auth.user()?.id, post_id: post.id })

//     if (error) {
//       console.error(error)
//     } else {
//       // Increment the number of likes for this post
//       setLiked(true)
//       setLikes(likes => likes + 1)
//     }
//   }

//   return (
//     <div>
//       <Card className='rounded-lg'>
//         <section>
//           <div>
//             <img className='fill' src={`${post.image}`} />
//           </div>
//           <div className='px-8 py-4 flex flex-row justify-between'>
//             {liked ? (
//               <AiFillHeart size={24} onClick={handleLike} />
//             ) : (
//               <AiOutlineHeart size={24} onClick={handleLike} />
//             )}
//             <span>{likes}</span>
//             <FaRegCommentDots size={24} />
//             <IoMdShareAlt size={24} />
//           </div>
//         </section>
//       </Card>
//     </div>
//   )
// }