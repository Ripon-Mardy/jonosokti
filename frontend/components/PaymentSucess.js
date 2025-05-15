'use client'
import React from 'react'
import { motion } from 'framer-motion';

const PaymentSucess = () => {
  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };
  return (
    <>
      <section className='py-6'>
        <motion.div variants={variants} initial="hidden" animate="visible" className="payment-success">
          <div className="container bg-white mx-auto px-2 py-6 flex flex-col items-center justify-center space-y-2 w-2/3 md:w-1/3 shadow-md rounded-md hover:shadow-2xl duration-300 ease-in">
            <svg className="w-16 h-16 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-5.707l-7-7a1 1 0 00-1.414 1.414L6.3 12 9.707 15.707a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800">Payment Successful!</h2>
            <hr className='bg-red-600 w-full' />
            <div className='text-center'>
              <h1 className='capitalize font-semibold text-xl text-gray-800'>total payment</h1>
              <h1 className='text-xl font-bold uppercase'> <span>tk</span> 200 </h1>
            </div>
            <hr className='bg-red-600 w-full' />
            <p className="text-gray-600 text-center ">Your payment has been successfully done.</p>
            <a href="/" className="btn btn-primary font-semibold">Home page</a>
          </div>
        </motion.div>
      </section>
    </>
  )
}

export default PaymentSucess
