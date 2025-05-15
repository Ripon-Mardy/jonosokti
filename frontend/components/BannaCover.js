import React from 'react'
import Image from 'next/image'

// images
import bannar2 from '../public/images/BannarCover/bannar2.jpg'

const BannaCover = () => {
    return (
        <div className='px-6 border border-contentBorder md:border-none'>
            <div>
                <Image src={bannar2} className='rounded-md w-full md:hidden' alt='BannaCover'></Image>
            </div>
        </div>
    )
}

export default BannaCover
