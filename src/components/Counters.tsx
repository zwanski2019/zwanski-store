import React, { useEffect, useState } from 'react'

function useCount(to:number, duration=1200){
  const [n, setN] = useState(0)
  useEffect(()=>{
    let start: number | null = null
    const step = (ts:number)=>{
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setN(Math.floor(progress * to))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  },[to,duration])
  return n
}

export default function Counters(){
  const clients = useCount(128)
  const incidents = useCount(0)
  const projects = useCount(842)

  return (
    <div className='grid grid-cols-3 gap-4 text-center my-6'>
      <div>
        <div className='text-3xl font-bold'>{clients}+</div>
        <div className='text-sm text-gray-600'>Clients served</div>
      </div>
      <div>
        <div className='text-3xl font-bold'>{projects}+</div>
        <div className='text-sm text-gray-600'>Projects completed</div>
      </div>
      <div>
        <div className='text-3xl font-bold'>{incidents}</div>
        <div className='text-sm text-gray-600'>Active researchers</div>
      </div>
    </div>
  )
}
