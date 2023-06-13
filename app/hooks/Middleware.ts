import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../libs/supabase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types_db';

// export const Middleware = async (request: NextRequest) => {
//     // const user = await supabase.auth.getUser()
//     const data = await supabase.auth.getSession()
//   if (request.nextUrl.pathname.startsWith('/profile',)) {
//     // const authCookie = request.cookies.get('user');
//     if (!data) return NextResponse.redirect(new URL('/', request.url));
//   }
// };

const Protect = async ({children}: {
    children: React.ReactNode
  }) => {
    // const [user,isLoading] = useState(useUser())  
    const supabase = createServerComponentClient<Database>({ cookies })
    const {data} = await supabase.auth.getSession()
    const Router = useRouter()
    useEffect(()=>{
    if(!data?.session?.user){
      Router.replace('/')
    }
  
  },[data,Router])
    return (
      {children}
    )
  }
  
  export default Protect