


import React from 'react'
import { Card, CardContent } from '../ui/card';
import {FaUserCircle} from 'react-icons/fa'
interface CuserProps{
    name:string;
    phone:string;
}

const SearchedUser = ({cuser}:{cuser:CuserProps}) => {
  return (
    <div>
        <Card>
       <CardContent className='flex flex-row gap-4  py-4'>
        <FaUserCircle size={20}/>
        {cuser.name}
        
       </CardContent>
       </Card>
    </div>
  )
}

export default SearchedUser