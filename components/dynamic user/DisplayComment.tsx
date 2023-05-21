

import React from 'react'
interface Props{
    comment:any;
}
const DisplayComment = ({displaycomment}:{displaycomment:Props}) => {
  return (
    <div>{displaycomment.comment}</div>
  )
}

export default DisplayComment