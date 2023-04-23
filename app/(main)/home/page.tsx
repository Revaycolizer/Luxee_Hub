"use client"


import React from 'react'
import Search from '../search'
import Avatar from '../avatar'
import Combo from '../combo'

export default function page(){
  return (
    <>
    <aside className='md:py-5'>
    <Search/>
    </aside>
    <section>
      
    <h4 className='text-bra text-xl md:text-3xl lg:text-3xl'>Recently videos</h4>
    <div className='grid grid-cols-3'>

    </div>
    </section>
    </>
  )
}

