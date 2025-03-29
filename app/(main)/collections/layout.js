import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners'

const layout = ({children}) => {
  return (
    <div className='container mx-auto px-4 py-8'>
        <div className="">

        <Link className='text-sm flex text-orange-600 hover:text-orange-700 cursor Pointer' href={"/dashboard"}>
       <ChevronLeft className='h-5 w-5'/> <span>
        Back to Dashboard
        </span>
        </Link>
        </div>
    <Suspense className="mt-5" fallback={<BarLoader color='orange' width={"100%"}/>
    } >

      {children}
    </Suspense>
    </div>
  )
}

export default layout
