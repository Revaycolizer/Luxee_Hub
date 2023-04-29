import { Input } from "@/components/inputs";
import { useCallback, useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { supabase } from "../libs/supabase";
import SearchedUser from "@/components/searcheduser/searcheduser";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { DialogFooter } from "@/components/dialog";



export default function search(){
    const [search,setSearch]=useState('')
    const [cusers,setCuser] = useState<any |null>(null)

    const searchUser=useCallback(async()=>{
        
     
        const data = await supabase.from('profiles').select('name').eq('name',search)
        if(data){
        setCuser(data.data)
        }
        else{
            toast.error('User not found')
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
                    <Input className="w-48 h-4 md:w-96 lg:w-80" value={search} onChange={
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
    <BiSearch size={26}/>
    </div>
    </div>
    
    <DialogDescription>
        <div className="justify-center items-center flex"> {cusers && cusers.map((cuser:any)=>
                (<SearchedUser key={cuser.id} cuser={cuser}/>
                ))}</div>
    </DialogDescription>
    </DialogContent>
    </Dialog>
        </section>
        
                </section>
    )
}