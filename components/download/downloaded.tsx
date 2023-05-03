interface Props{
signedUrl:any;
}



import React from 'react'

const Downloads = ({download}:{download:Props}) => {
  return (
    
    <div><img src={`${download.signedUrl}`}/><img src={download.signedUrl}/></div>

  )
}

export default Downloads