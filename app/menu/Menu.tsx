"use client"

import Link from 'next/link'
import React from 'react'
import play from '../icons/icons8-customer-30.png'
import Image from 'next/image'
import home from '../icons/home-page.png'
import cat from '../icons/circle.png'
import album from '../icons/album.png'
import src from '../icons/category.png'
import { Show } from '@chakra-ui/react'
import { useState } from "react"
import styles from '@/app/page.module.css'



  import {
    useDisclosure,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Stack,
    Box,
  } from '@chakra-ui/react'


 



export default function menu(){
    const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef(null)
  const [search,setSearch]=useState('')
   
    
  return (
    <>
    <section className=' justify-between hidden lg:block'>
        <div className='flex flex-row'>
          <Link href='/home'>
            <section className='flex items-start  bg-hov hover:bg-hov active:bg-hov focus:outline-none focus:ring focus:ring-hov rounded-full pt-3 px-4'>
            {/* <Image height={34} width={34} src={home} alt='play'>
            
            </Image> */}
            <h2 className='mb-4 text-xl font-medium text-black px-6'>
                Home
            </h2>
            </section>
            </Link>
            <Link href='/profile'>
            <section className='flex items-start cursor-pointer hover:bg-hov active:bg-hov focus:outline-none focus:ring focus:ring-hov rounded-full pt-3 px-4'>
               
            {/* <Image height={34} width={34} src={cat} alt='play'>
            
            </Image> */}
            <h2 className='mb-4 text-xl font-medium text-black px-6'>
                Profile
            </h2>
            
            </section>
            </Link>
            <Link href='/artist'>
            <section className='flex items-start cursor-pointer hover:bg-hov active:bg-hov focus:outline-none focus:ring focus:ring-hov rounded-full pt-3 px-4'>
               
            {/* <Image  src={play} alt='play'>
            
            </Image> */}
            <h2 className='mb-4 text-xl font-medium text-black px-7'>
                Artist
            </h2>
            
            </section>
            </Link>
            <Link href='/album'>
            <section className='flex items-start cursor-pointer hover:bg-hov active:bg-hov focus:outline-none focus:ring focus:ring-hov rounded-full pt-3 px-4'>
                
            {/* <Image height={34} width={34} src={album} alt='play'>
            
            </Image> */}
            <h2 className='mb-4 text-xl font-medium text-black px-6'>
                Album
            </h2>
            
            </section>
            </Link>
            <ul className='flex flex-col text-sm text-white'>
                {/* {users?.map(user=>{
                    <li key={user.id}>
                        <Link href={`/users/${user.id}`}>{user.name}</Link>
                    </li>
                })} */}
            </ul>
        </div>
       
    </section>
    <section className='px-3 py-6 md:py-12'>

    <Show below='lg'>
      
    <Button  ref={btnRef}  onClick={onOpen}>
    <Image  className={styles.c} priority src={src} alt=""></Image>
      </Button>
      
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>LuxeeHub</DrawerHeader>

          <DrawerBody>
          <Stack spacing='8px'>
              <Box>
            <Link  className='text-bra  md:text-2xl ' href="home">Home</Link>
            </Box>
            <Box>
                <Link className='text-bra  md:text-2xl' href="profile">Profile</Link>
            </Box>
            <Box>
            <Link className='text-bra  md:text-2xl ' href="category">Category</Link>
            </Box>
            <Box>
            <Link className='text-bra  md:text-2xl ' href="/">Logout</Link>
            </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button disabled colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </Show>
    </section>
    </>
  )
}
