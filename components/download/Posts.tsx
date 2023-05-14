interface Props{
    publicID:any;
    }
    
    
    
    import React from 'react'
    import { Card } from '../ui/card';
    import { AiOutlineHeart } from 'react-icons/ai';
    import { FaRegCommentDots } from 'react-icons/fa';
    import {IoMdShareAlt} from 'react-icons/io'
    
    
    const Posts = ({post}:{post:Props}) => {
      return (
        <div>
        <Card className='rounded-lg'><section><div><img className='fill' src={`${post.publicID}`} /></div><div className='px-8 py-4 flex flex-row justify-between'><AiOutlineHeart size={24}/> <FaRegCommentDots size={24}/><IoMdShareAlt size={24}/></div></section></Card>
     </div>
      )
    }
    
    export default Posts