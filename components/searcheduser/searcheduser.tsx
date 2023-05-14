


import React from 'react'
import { Card, CardContent } from '../ui/card';
import {FaUserCircle} from 'react-icons/fa'
import { useParams, useRouter, useSearchParams } from 'next/navigation';
interface CuserProps{
    name:string;
    phone:string;
    id:number
}

const SearchedUser = ({cuser}:{cuser:CuserProps}) => {
  const search = useParams()
  const router = useRouter()
  const handleClick = () => {
    router.push(`/users/${cuser.id}`);
  };
  return (
    <div>
        <Card onClick={handleClick}>
       <CardContent className='flex flex-row gap-4  py-4 text-bra'>
        <FaUserCircle color='blue' size={20}/>
        {cuser.name}
        
       </CardContent>
       </Card>
    </div>
  )
}

export default SearchedUser