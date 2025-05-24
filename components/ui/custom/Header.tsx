import React from 'react'
import { Button } from '../button'

function Header() {
  return (
    <div className='flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900 shadow-md'>
<h1 className='text-xl font-bold text-gray-900 dark:text-white'>
            Bolt.new
        </h1>
        <div className="flex items-center space-x-4">
            <Button variant="secondary" className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800">
                Login
            </Button>
            <Button variant="secondary" className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800">
                Sign Up
            </Button>
            </div>
    </div>
  )
}

export default Header