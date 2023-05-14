interface User{
    id: number;
    name: string;
    email: string;
    phone:string;
}

import React from 'react'

const Duser = ({user}:{user:User}) => {
  return (
    <div>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
    </div>
  )
}

export default Duser