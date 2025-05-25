import ChatView from '@/components/ui/custom/ChatView'
import CodeView from '@/components/ui/custom/CodeView'
import React from 'react'

function page() {
  return (
    <div className='flex justify-between'>
        <ChatView/>
        <CodeView/>
    </div>
  )
}

export default page