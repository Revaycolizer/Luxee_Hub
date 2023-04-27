import React from 'react'
interface ProfileProps{
    name?:string;
    email?:string;
    phone?: string;
}


const Profile = ({profile}: {profile: ProfileProps}) => {
  return (
    <div className='justify-center items-center rounded-full px-4 flex flex-col bg-green-100'>
        <p>Name:{profile.name}</p>
        <p>Email:{profile.email}</p>
        <p>Phone:{profile.phone}</p>
    </div>
  )
}

export default Profile