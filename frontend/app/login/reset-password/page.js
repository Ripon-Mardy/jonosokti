import React from 'react'
import { Phone } from 'lucide-react';

const page = () => {
  return (
    <div className='xl:container xl:mx-auto px-2 md:px-0 pt-24 mb-20'>
       <div>
        <div className='flex items-center justify-center flex-col '>
          <h2 className='text-xl md:text-3xl font-bold text-textHeadingColor'>Reset Password</h2>
        <p className='text-sm text-textColor mt-2'>We'll send you a verification code to your phone</p>
        </div>
        <form action="#" className='max-w-md mx-auto mt-8 space-y-6 bg-white p-6 rounded-lg shadow-md'>
          <p className='text-gray-700 font-medium text-sm'>Phone Number</p>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Phone className='h-5 w-5 text-textIconColor' size={20}/>
            </div>
          <input type="tel"  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bgColor focus:border-bgColor transition-colors duration-200 sm:text-sm" placeholder='017XXXXXXXX' />
          </div>
          <button className='btn w-full font-semibold'>Reset</button>
        </form>
       </div>
    </div>
  )
}

export default page