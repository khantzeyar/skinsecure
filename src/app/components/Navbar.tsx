/** 
 * This is the main nav bar for our website.
 * - The logo will be displayed on the left
 * - The navigation links ("Products" and "Trends") will be on the left.
 * - The current page will have its link highlighted with a black background and white text.
*/

"use client";

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className='fixed top-0 w-full flex items-center justify-between z-50
    py-3 px-8 border-b border-gray-300 bg-white'>
        {/* Logo */}
        <Image src="/skinsecure.svg" alt="Logo" 
        width={430} height={147} style={{ height: '100px', width: 'auto'}}/>
        {/* Navigation Links */}
        <ul className='flex text-lg mr-10'> 
            <li>
              <Link href="/">
                <span className={`inline-block px-4 py-2 rounded w-32 text-center
                  ${pathname === '/' ? 'bg-black text-white' : 'text-black'}`}>
                  Products
                </span>
              </Link>
            </li>
            <li>
              <Link href="/trends">
                <span className={`inline-block px-4 py-2 rounded w-32 text-center
                  ${pathname === '/trends' ? 'bg-black text-white' : 'text-black'}`}>
                  Trends
                </span>
              </Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar