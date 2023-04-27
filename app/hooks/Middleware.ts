import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../libs/supabase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

    const user = await supabase.auth.getUser()
    const Router = useRouter()
    useEffect(()=>{
    if(!user){
      Router.replace('/')
    }
  
  },[user,Router])
    return (
      {children}
    )
  }
  
  export default Protect