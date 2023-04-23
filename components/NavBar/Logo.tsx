import Image from 'next/image'
import React from 'react'
import src from '@/app/icons/lx.png'

const Logo = () => {
  return (
    <Image
    className='hidden lg:block'
    src={src}
    width={40}
    height={40}
    priority
    alt=''
    />
  )
}

export default Logo