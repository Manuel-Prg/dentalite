// contexts/AuthContext.tsx
"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, userData: any) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      checkIfAdmin(session?.user ?? null)
      setLoading(false)
    })

    // Escuchar cambios de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      checkIfAdmin(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkIfAdmin = async (user: User | null) => {
    if (!user) {
      setIsAdmin(false)
      return
    }

    // Verificar si el usuario es admin consultando su metadata o una tabla de roles
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (!error && data?.role === 'admin') {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error

    // Verificar que el usuario fue creado
    if (!data.user) {
      throw new Error('No se pudo crear el usuario')
    }

    // Esperar un momento para asegurar que el usuario existe en la BD
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Crear registro de paciente asociado
    try {
      const { error: patientError } = await supabase
        .from('patients')
        .insert([
          {
            user_id: data.user.id,
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: email,
            phone: userData.phone,
          },
        ])

      if (patientError) {
        console.error('Error creating patient:', patientError)
        throw new Error('Usuario creado pero no se pudo crear el perfil de paciente. Por favor contacta al administrador.')
      }
    } catch (err) {
      console.error('Error in patient creation:', err)
      throw err
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push('/')
  }

  const value = {
    user,
    isAdmin,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}