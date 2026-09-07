"use client"
import { useRouter } from 'next/navigation'
import  { useEffect } from 'react'

const Page = () => {
  const router = useRouter()
  return router.replace("/dashboard")
  // useEffect(()=>{
    
  // },[])
  // return (
  //   <div>
  //     Home Page
  //   </div>
  // )
}

export default Page;
