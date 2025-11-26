'use client'

import { useState } from 'react'
import Link from 'next/link'
import { resetPassword } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dumbbell, Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await resetPassword(email)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar e-mail de recuperação')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-4">
      <Card className="w-full max-w-md bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl">
              <Dumbbell className="w-10 h-10 text-emerald-500" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-white">Recuperar Senha</CardTitle>
          <CardDescription className="text-slate-400">
            Enviaremos um link de recuperação para seu e-mail
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-500/10 border-red-500/50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-emerald-500/10 border-emerald-500/50">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <AlertDescription className="text-emerald-500">
                  E-mail de recuperação enviado! Verifique sua caixa de entrada.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={success}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || success}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-6 transition-all duration-300 hover:scale-105"
            >
              {loading ? 'Enviando...' : success ? 'E-mail enviado!' : 'Enviar Link de Recuperação'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link 
            href="/auth/login" 
            className="flex items-center gap-2 text-sm text-emerald-500 hover:text-emerald-400 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
