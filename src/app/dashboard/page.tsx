'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, getUserProfile } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Camera, Flame, Apple, Dumbbell, TrendingUp, Crown, User, LogOut } from 'lucide-react'
import { signOut } from '@/lib/auth'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const user = await getCurrentUser()
      if (!user) {
        router.push('/auth/login')
        return
      }

      const userProfile = await getUserProfile(user.id)
      setProfile(userProfile)
    } catch (error) {
      router.push('/auth/login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
    router.push('/auth/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  const isPremium = profile?.subscription_status !== 'free'
  const todayCalories = 1450
  const goalCalories = 2000
  const caloriesProgress = (todayCalories / goalCalories) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-xl">
                <Dumbbell className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">FitMacro Vision</h1>
                <p className="text-sm text-slate-400">Olá, {profile?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push('/dashboard/profile')}
                className="text-slate-400 hover:text-white"
              >
                <User className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-400"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Premium Banner */}
        {!isPremium && (
          <Card className="mb-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Crown className="w-10 h-10 text-amber-500" />
                  <div>
                    <h3 className="text-lg font-bold text-white">Desbloqueie o Premium</h3>
                    <p className="text-sm text-slate-300">Scanner IA, treinos personalizados e muito mais</p>
                  </div>
                </div>
                <Button 
                  onClick={() => router.push('/dashboard/subscription')}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold"
                >
                  Ver Planos
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Scanner Button */}
        <Card className="mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 border-0 cursor-pointer hover:scale-105 transition-transform duration-300">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/20 rounded-2xl">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Scanner de Alimentos</h3>
                  <p className="text-white/80">Detecte calorias com IA instantaneamente</p>
                </div>
              </div>
              {!isPremium && (
                <div className="px-4 py-2 bg-amber-500 rounded-full">
                  <Crown className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                Calorias Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">{todayCalories}</span>
                  <span className="text-slate-400">/ {goalCalories} kcal</span>
                </div>
                <Progress value={caloriesProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Apple className="w-4 h-4 text-emerald-500" />
                Refeições
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">3</span>
                  <span className="text-slate-400">/ 5 refeições</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                Progresso Semanal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">-1.2</span>
                  <span className="text-slate-400">kg esta semana</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Macros */}
        <Card className="mb-6 bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Macronutrientes de Hoje</CardTitle>
            <CardDescription className="text-slate-400">Distribuição de proteínas, carboidratos e gorduras</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Proteínas</span>
                  <span className="text-white font-semibold">85g / 150g</span>
                </div>
                <Progress value={56} className="h-3 bg-slate-800" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Carboidratos</span>
                  <span className="text-white font-semibold">180g / 250g</span>
                </div>
                <Progress value={72} className="h-3 bg-slate-800" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Gorduras</span>
                  <span className="text-white font-semibold">45g / 65g</span>
                </div>
                <Progress value={69} className="h-3 bg-slate-800" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="h-24 flex flex-col gap-2 bg-slate-900/50 border-slate-800 hover:bg-slate-800 text-white"
            onClick={() => router.push('/dashboard/macros')}
          >
            <Flame className="w-6 h-6 text-orange-500" />
            <span className="text-sm">Calcular Macros</span>
          </Button>

          <Button
            variant="outline"
            className="h-24 flex flex-col gap-2 bg-slate-900/50 border-slate-800 hover:bg-slate-800 text-white"
            onClick={() => router.push('/dashboard/diet')}
          >
            <Apple className="w-6 h-6 text-emerald-500" />
            <span className="text-sm">Plano de Dieta</span>
          </Button>

          <Button
            variant="outline"
            className="h-24 flex flex-col gap-2 bg-slate-900/50 border-slate-800 hover:bg-slate-800 text-white"
            onClick={() => router.push('/dashboard/workouts')}
          >
            <Dumbbell className="w-6 h-6 text-blue-500" />
            <span className="text-sm">Treinos</span>
          </Button>

          <Button
            variant="outline"
            className="h-24 flex flex-col gap-2 bg-slate-900/50 border-slate-800 hover:bg-slate-800 text-white"
            onClick={() => router.push('/dashboard/profile')}
          >
            <User className="w-6 h-6 text-purple-500" />
            <span className="text-sm">Meu Perfil</span>
          </Button>
        </div>
      </main>
    </div>
  )
}
