/** 
 * This is the main nav bar for our website.
 * - The logo will be displayed on the left
 * - The navigation links ("Products" and "Trends") will be on the left.
 * - The current page will have its link highlighted with a black background and white text.
 * - TO BE IMPLEMENTED - Search functionality
*/

"use client";

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import Search from '@mui/icons-material/Search';
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className='fixed top-0 w-full flex items-center justify-between z-50
    py-3 px-8 border-b border-gray-300 bg-white'>
        {/* Logo */}
        <Image src="/skinsecure.svg" alt="Logo" 
        width={430} height={147} style={{ height: '100px', width: 'auto'}}/>
        {/* Search Field - Only shown on the product page*/}
        {pathname === '/' && (
        <div className="flex-1 flex justify-center">
          <div className="relative w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name or notification number" 
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none" 
            />
          </div>
        </div>
      )}
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