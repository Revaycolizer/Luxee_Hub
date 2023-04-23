import { Input } from "@/components/inputs";
import { useState } from "react";



export default function search(){
    const [search,setSearch]=useState('')

    return(
        <section className='py-6 lg:px-24 flex items-center justify-center'>
            <Input className="w-36 md:w-96 lg:w-80" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search here" />
        </section>
    )
}