import ChatView from '@/components/ui/custom/ChatView'
import CodeView from '@/components/ui/custom/CodeView'
import React from 'react'

function page() {
  return (
    <div className='flex justify-between h-screen -mt-[64px]  relative'>
        <ChatView/>
        <CodeView/>
    </div>
  )
}

export default page