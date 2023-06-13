"use client"
import { Input } from "@/components/inputs";
import { useCallback, useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";
import SearchedUser from "@/components/searcheduser/searcheduser";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types_db";




export default function search(){

    // const Home = async({searchParams={}}:HomeProps)=> {
    //     const {userId, ...params} = searchParams;
    //     const listings = await getListings({userId, ...params} ) .... }
const supabase = createClientComponentClient<Database>()
    const [search,setSearch]=useState('')
    const [cusers,setCuser] = useState<any |null>(null)

    const searchUser=useCallback(async()=>{
        if(search.length>=1){
     
        const {data,error} = await supabase.from('profiles').select().textSearch('name',search)
        if(data){
        setCuser(data)
        }
        else if(error){
            toast.error('Check your internet Connection')
        }
        else if(data == null){
            toast.error('User not found')
        }
        else{
            toast.error('User not found')
            setCuser(null)
        }
        // else{
        //     toast.error('User not found')
        // }
    }
    else{
        toast.error('Cannot search null value')
    }
       
        
    },[search])

    return(
        <section>
        <section className='py-6 lg:px-24 flex items-center justify-center gap-6'>
            <Dialog>
            <DialogTrigger>
            <Input className="w-36 h-4 md:w-96 lg:w-80" 
                placeholder="Search here"  />
                </DialogTrigger>
                <DialogContent>
                    <div className="flex flex-row justify-between gap-3">
                    <Input className="w-48 h-4 md:w-96 lg:w-80" type="text" required value={search} onChange={
                   (e)=>setSearch(e.target.value)
                    } placeholder="Search here"  />
                    
              
            <div
    className="p-2
    bg-rose-500
    rounded-full
    text-white
    
    "
    onClick={searchUser}
    >
    <BiSearch size={23}/>
    </div>
    </div>
    <DialogTrigger>
    <DialogDescription>
        
        <div className="justify-center items-center flex"> {cusers && cusers.map((cuser:any)=>
                (<SearchedUser key={cuser.id} cuser={cuser}/>
                ))}</div>
    </DialogDescription>
    </DialogTrigger>
    </DialogContent>
    </Dialog>
        </section>
        
                </section>
    )
}