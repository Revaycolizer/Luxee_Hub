interface User{
    id: number;
    name: string;
    email: string;
    phone:string;
}

import React from 'react'

const Duser = ({user}:{user:User}) => {
  return (
    <div className='py-2'>
      <p>User Details</p>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
    </div>
  )
}

export default Duser