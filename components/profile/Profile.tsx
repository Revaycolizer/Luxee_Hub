import React from 'react'
import { Card, CardContent } from '../ui/card';
interface ProfileProps{
    name?:string;
    email?:string;
    phone?: string;
}


const Profile = ({profile}: {profile: ProfileProps}) => {
  return (
    <div className='justify-center items-center rounded-md px-4 flex flex-col'>
      <Card>
        <CardContent className='py-4'>
        <p className='md:text-3xl lg:text-4xl'>Name:{profile.name}</p>
        <p className='md:text-3xl lg:text-4xl'>Email:{profile.email}</p>
        <p className='md:text-3xl lg:text-4xl'>Phone:{profile.phone}</p>
        </CardContent>
        </Card>
    </div>
  )
}

export default Profile