import Loader from '@/components/Loader/Loader'
import React from 'react'

const loading = () => {
  return (
    <div className='flex items-center justify-center mt-20'>
        <Loader/>
    </div>
  )
}

export default loading