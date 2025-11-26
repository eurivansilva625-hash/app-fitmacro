'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/auth/login')
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
      <div className="text-white text-xl">Redirecionando...</div>
    </div>
  )
}
