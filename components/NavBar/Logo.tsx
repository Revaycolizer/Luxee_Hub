import Image from 'next/image'
import React from 'react'
import src from '@/app/icons/lx.png'

const Logo = () => {
  return (
    <Image
    className='hidden lg:block'
    src={src}
    width={44}
    height={44}
    priority
    alt=''
    />
  )
}

export default Logo