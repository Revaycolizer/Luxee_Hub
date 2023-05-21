

import React from 'react'

interface Props{
    name:any;
}
const DisplayUser = ({displayuser}:{displayuser:Props}) => {
  return (
    <div><p>{displayuser.name} commented</p></div>
  )
}

export default DisplayUser