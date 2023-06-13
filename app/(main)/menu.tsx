"use client"

import Link from 'next/link'
import React, { useCallback } from 'react'
import play from '../icons/icons8-customer-30.png'
import Image from 'next/image'
import home from '../icons/home-page.png'
import cat from '../icons/circle.png'
import album from '../icons/album.png'
import src from '../icons/category.png'
import { Show } from '@chakra-ui/react'
import { useState } from "react"



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
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { supabase } from '../libs/supabase'
import {HiOutlineMenuAlt1} from 'react-icons/hi'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types_db'

 



export default function menu(){
  const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef(null)
  const [search,setSearch]=useState('')

const supabase = createClientComponentClient<Database>() 

  const handleLog = useCallback(async()=>{
    const {error} = await supabase.auth.signOut()
    if(error){
      toast.error('Something went wrong')
    }else{
    toast.success('logged out successfully')
    router.push('/')
    document.cookie = 'sb:token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    }
 },[])

 
   
    
  return (
    <>
    <section className=' justify-between hidden lg:block'>
        <div className='flex flex-row text-center pt-10 '>
          <Link href='/home'>
            <section className='flex items-start  bg-hov hover:bg-hov active:bg-hov focus:outline-none focus:ring focus:ring-hov rounded-full px-4'>
            {/* <Image height={34} width={34} src={home} alt='play'>
            
            </Image> */}
            <h2 className='mb-4 text-xl font-medium text-black px-2'>
                Home
            </h2>
            </section>
            </Link>
            <Link href='/profile'>
            <section className='flex items-start cursor-pointer hover:bg-hov active:bg-hov focus:outline-none focus:ring focus:ring-hov rounded-full px-4'>
               
            {/* <Image height={34} width={34} src={cat} alt='play'>
            
            </Image> */}
            <h2 className='mb-4 text-xl font-medium text-black '>
                Profile
            </h2>
            
            </section>
            </Link>
           
            <section className='flex items-start cursor-pointer hover:bg-hov active:bg-hov focus:outline-none focus:ring focus:ring-hov rounded-full  px-4'>
               
            {/* <Image  src={play} alt='play'>
            
            </Image> */}
            <h2 className='mb-2 text-xl font-medium text-black pb-6'>
            <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
        <NavigationMenuTrigger className='text-xl font-medium pb-6 text-black'>Category</NavigationMenuTrigger>
        <NavigationMenuContent className='flex flex-col justify-between gap-2 px-4'>
          <NavigationMenuLink className='text-sm'><Link href="/dance">Dance</Link></NavigationMenuLink>
          <NavigationMenuLink className='text-sm'><Link href="/comedy">Comedy</Link></NavigationMenuLink>
          <NavigationMenuLink className='text-sm'><Link href="/education">Education</Link></NavigationMenuLink>
          <NavigationMenuLink className='text-sm'><Link href="/singing">Singing</Link></NavigationMenuLink>
        </NavigationMenuContent>
        </NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>
          
            </h2>
            
            </section>
           
            <Link href='/myposts'>
            <section className='flex items-start cursor-pointer hover:bg-hov active:bg-hov focus:outline-none focus:ring focus:ring-hov rounded-full  px-4'>
                
            {/* <Image height={34} width={34} src={album} alt='play'>
            
            </Image> */}
            <h2 className='mb-3 text-xl font-medium text-black'>
                My Posts
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
    <section className='md:px-3 px-0 py-6 md:py-12'>

    <Show below='lg'>
      
    <Button  ref={btnRef}  onClick={onOpen}>
      <HiOutlineMenuAlt1 size={26}/>
    {/* <Image  className='w-6 md:w-9' priority src={src} alt=""></Image> */}
      </Button>
      
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>LuxeeHub</DrawerHeader>

          <DrawerBody>
          <Stack spacing='8px'>
              <Box onClick={onClose}>
            <Link className='text-bra  md:text-2xl ' href="home">Home</Link>
            </Box>
            <Box onClick={onClose}>
                <Link className='text-bra  md:text-2xl' href="profile">Profile</Link>
            </Box>
            <Box onClick={onClose}>
            <Link className='text-bra  md:text-2xl ' href="myposts">My Posts</Link>
            </Box>
            <Box onClick={onClose}>
            <Link className='text-bra  md:text-2xl ' href="dance">Dance</Link>
            </Box>
            <Box onClick={onClose}>
            <Link className='text-bra  md:text-2xl ' href="comedy">Comedy</Link>
            </Box>
            <Box onClick={onClose}>
            <Link className='text-bra  md:text-2xl ' href="singing">Singing</Link>
            </Box>
            <Box onClick={onClose}>
            <Link className='text-bra  md:text-2xl ' href="education">Education</Link>
            </Box>
            <Box onClick={handleLog}>
            <Link className='text-bra  md:text-2xl ' href="/">Logout</Link>
            </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter className='flex items-center justify-center'>
            <Button  variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </Show>
    </section>
    </>
  )
}
