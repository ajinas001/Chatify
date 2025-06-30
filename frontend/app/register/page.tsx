import Link from 'next/link'
import React from 'react'

function Register() {
    return (
        <div className=' bg-primary h-screen flex flex-col md:flex-row items-center justify-center'>
            <div className=' m-4 p-4 flex flex-row'>
                <img src='../images/icon.png'
                    className='h-12 md:h-16 lg:h-25 w-12 md:w-16 lg:w-25 items-start justify-start  bg-white rounded-lg p-1'>
                </img>
                <span className='text-white text-4xl md:text-5xl lg:text-7xl font-bold ms-2 md:ms-4 '>Chatify</span>
            </div>
            <div className='bg-black rounded-3xl w-4/5 md:w-4/5 m-8 max-w-md justify-end  h-[60%] lg:h-[90%] flex flex-col  md:ms-54 overflow-hidden'>

                <div className="relative h-full lg:h-64 w-full">
                    <img
                        src="/images/bgimg.png"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black" />
                </div>

                {/* Content section */}
                <div className=' inset-0 flex flex-col justify-center items-center'>
                    <img src='../images/icon.png'
                        className='h-8 lg:h-15 w-8 lg:w-15'>
                    </img>

                    <span className='  flex items-baseline-last justify-center text-white text-xl sm:text-3xl font-bold'>
                        Explore the chats.

                    </span>
                </div>
                <div className="p-4 md:p-8 flex flex-col justify-end flex-1">
                    <button className='w-full bg-primary mb-4 rounded-full py-3 text-white font-bold'>Register</button>

                    <div>
                        <div className='w-full px-2 sm:px-4 border border-gray-800 text-white text-center rounded-full py-3 mb-4'>
                            <input type='text' className='focus:outline-none text-center bg-transparent text-white placeholder-white' placeholder='Email/Username' />
                        </div>

                        <div className='w-full border border-gray-800 text-white text-center rounded-full py-3 mb-4'>
                            <input type='password' className='focus:outline-none text-center bg-transparent text-white placeholder-white' placeholder='Password' />
                        </div>
                        <Link href={'/home'}>
                        <button className='w-full border border-gray-800 mb-4 rounded-full py-3 text-white font-bold'>Submit</button>
                        </Link>
                        <Link href={'/login'}>
                        <h6 className='text-center text-sm text-white'>
                            Already have an account?
                        </h6>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register
