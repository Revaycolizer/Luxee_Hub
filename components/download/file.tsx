
interface Props{
    vname:string;
}


import React from 'react'

const File = ({dfile}:{dfile:Props}) => {
  return (
    <div>{dfile.vname}</div>
  )
}

export default File