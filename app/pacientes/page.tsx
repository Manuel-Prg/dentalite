"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { Calendar, FileText, Lock, User, Loader2, AlertCircle, Sparkles, LogOut, Edit, CheckCircle2, Clock, Stethoscope, Mail, Phone, MapPin, Shield } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { appointmentsService, patientsService } from "@/lib/supabase"

export default function PacientesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-sky-600 mx-auto mb-4" />
          <p className="text-slate-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  return <PatientDashboard />
}

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { signIn, signUp } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password)
      } else {
        await signUp(formData.email, formData.password, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        })
      }
      router.push('/pacientes')
    } catch (error: any) {
      setError(error.message || "Error al procesar la solicitud")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-sky-50">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto text-center">
            <div className="relative inline-flex mb-6">
              <div className="absolute inset-0 bg-sky-400/30 rounded-full blur-2xl animate-pulse-slow"></div>
              <div className="relative bg-linear-to-br from-sky-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center shadow-xl shadow-sky-500/30">
                <User className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900 animate-fade-in-up">
              Área de pacientes
            </h1>
            <p className="text-lg text-slate-600 text-pretty animate-fade-in-up stagger-1">
              Accede a tu historial médico y gestiona tus citas
            </p>
          </div>
        </div>
      </section>

      {/* Login Form */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="border-0 shadow-2xl shadow-slate-200/50 overflow-hidden animate-fade-in-up stagger-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-500 via-blue-500 to-sky-500"></div>
              <CardHeader className="bg-linear-to-br from-sky-50 to-blue-50 border-b border-sky-100">
                <CardTitle className="text-2xl text-center">
                  {isLogin ? "Iniciar sesión" : "Crear cuenta"}
                </CardTitle>
                <p className="text-center text-slate-600 text-sm mt-2">
                  {isLogin ? "Ingresa tus credenciales" : "Completa el formulario"}
                </p>
              </CardHeader>
              <CardContent className="p-8">
                {error && (
                  <div className="mb-6 p-4 bg-linear-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-xl flex items-start gap-3 animate-fade-in">
                    <div className="bg-red-100 p-2 rounded-full shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-red-900">Error</p>
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-5">
                  {!isLogin && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="font-semibold text-slate-700">Nombre</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input 
                              id="firstName" 
                              required 
                              placeholder="Juan"
                              value={formData.firstName}
                              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                              className="pl-10 h-11 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="font-semibold text-slate-700">Apellido</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input 
                              id="lastName" 
                              required 
                              placeholder="Pérez"
                              value={formData.lastName}
                              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                              className="pl-10 h-11 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-semibold text-slate-700">Teléfono</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <Input 
                            id="phone" 
                            type="tel" 
                            required 
                            placeholder="+52 993 123 4567"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="pl-10 h-11 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-semibold text-slate-700">Correo electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input 
                        id="email" 
                        type="email" 
                        required 
                        placeholder="juan@ejemplo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="pl-10 h-11 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="font-semibold text-slate-700">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input 
                        id="password" 
                        type="password" 
                        required 
                        placeholder="••••••••"
                        minLength={6}
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="pl-10 h-11 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                      />
                    </div>
                    {!isLogin && (
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        Mínimo 6 caracteres
                      </p>
                    )}
                  </div>

                  {isLogin && (
                    <div className="text-right">
                      <button type="button" className="text-sm text-sky-600 hover:text-sky-700 font-medium hover:underline">
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                  )}

                  <Button 
                    onClick={handleSubmit}
                    className="w-full h-12 bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-sky-500/30 transition-all hover:shadow-xl hover:shadow-sky-500/40"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {isLogin ? "Iniciando sesión..." : "Creando cuenta..."}
                      </>
                    ) : (
                      <>
                        {isLogin ? "Iniciar sesión" : "Crear cuenta"}
                      </>
                    )}
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-600">
                    {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(!isLogin)
                        setError("")
                      }}
                      className="text-sky-600 hover:text-sky-700 font-bold hover:underline"
                    >
                      {isLogin ? "Regístrate aquí" : "Inicia sesión"}
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-slate-600">
                <Lock className="h-5 w-5 text-sky-600" />
                <span className="text-sm font-medium">Tus datos están protegidos y encriptados</span>
              </div>
              <p className="text-sm text-slate-500">
                ¿Necesitas ayuda?{" "}
                <Link href="/contacto" className="text-sky-600 hover:text-sky-700 font-semibold hover:underline">
                  Contáctanos
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function PatientDashboard() {
  const [activeTab, setActiveTab] = useState<"citas" | "historial" | "perfil">("citas")
  const [appointments, setAppointments] = useState<any[]>([])
  const [patient, setPatient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { user, signOut } = useAuth()

  useEffect(() => {
    loadPatientData()
  }, [user])

  const loadPatientData = async () => {
    if (!user) return

    try {
      setLoading(true)
      
      const patientData = await patientsService.getByUserId(user.id)
      setPatient(patientData)

      if (patientData) {
        const appointmentsData = await appointmentsService.getByPatient(patientData.id)
        setAppointments(appointmentsData || [])
      }
    } catch (error) {
      console.error('Error loading patient data:', error)
    } finally {
      setLoading(false)
    }
  }

  const upcomingAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return aptDate >= today && apt.status !== 'cancelada' && apt.status !== 'completada'
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pastAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return aptDate < today || apt.status === 'completada'
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!confirm('¿Estás seguro de que deseas cancelar esta cita?')) return

    try {
      await appointmentsService.update(appointmentId, { status: 'cancelada' })
      loadPatientData()
    } catch (error) {
      console.error('Error canceling appointment:', error)
      alert('Error al cancelar la cita')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-sky-600 mx-auto mb-4" />
          <p className="text-slate-600">Cargando tu información...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-sky-50">
      {/* Header */}
      <section className="relative py-8 bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-sky-50 to-blue-50 opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-linear-to-br from-sky-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/30">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                  Bienvenido, {patient?.first_name || 'Paciente'}
                </h1>
                <p className="text-slate-600 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-sky-600" />
                  Gestiona tus citas y revisa tu historial médico
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild className="bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 shadow-lg shadow-sky-500/30 h-11">
                <Link href="/agendar">
                  <Calendar className="mr-2 h-5 w-5" />
                  Nueva cita
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => signOut()}
                className="h-11 border-2"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("citas")}
              className={`py-4 px-2 border-b-2 font-semibold transition-all ${
                activeTab === "citas"
                  ? "border-sky-600 text-sky-600"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              <Calendar className="h-5 w-5 inline-block mr-2" />
              Mis citas
            </button>
            <button
              onClick={() => setActiveTab("historial")}
              className={`py-4 px-2 border-b-2 font-semibold transition-all ${
                activeTab === "historial"
                  ? "border-sky-600 text-sky-600"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              <FileText className="h-5 w-5 inline-block mr-2" />
              Historial médico
            </button>
            <button
              onClick={() => setActiveTab("perfil")}
              className={`py-4 px-2 border-b-2 font-semibold transition-all ${
                activeTab === "perfil"
                  ? "border-sky-600 text-sky-600"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              <User className="h-5 w-5 inline-block mr-2" />
              Mi perfil
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {activeTab === "citas" && (
            <div className="max-w-5xl mx-auto space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-sky-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-sky-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Próximas citas</h2>
                    <p className="text-slate-600">Tus citas programadas</p>
                  </div>
                </div>
                {upcomingAppointments.length === 0 ? (
                  <Card className="border-0 shadow-xl shadow-slate-200/50">
                    <CardContent className="pt-6 text-center py-16">
                      <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="h-10 w-10 text-slate-400" />
                      </div>
                      <h3 className="font-bold text-xl text-slate-900 mb-2">No tienes citas próximas</h3>
                      <p className="text-slate-600 mb-6">Agenda una cita para comenzar tu tratamiento</p>
                      <Button asChild className="bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 shadow-lg shadow-sky-500/30">
                        <Link href="/agendar">
                          <Calendar className="mr-2 h-5 w-5" />
                          Agendar una cita
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <Card key={appointment.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-500 to-blue-500"></div>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start gap-4 mb-4">
                                <div className="bg-linear-to-br from-sky-100 to-blue-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                                  <Calendar className="h-6 w-6 text-sky-600" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-xl text-slate-900 mb-1">{appointment.service}</h3>
                                  <div className="flex items-center gap-2 text-slate-600">
                                    <Stethoscope className="h-4 w-4" />
                                    <p className="text-sm font-medium">
                                      {appointment.doctors?.name || 'Doctor por asignar'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-16 space-y-2">
                                <div className="flex items-center gap-2 text-slate-700">
                                  <Calendar className="h-4 w-4 text-sky-600" />
                                  <span className="font-semibold">
                                    {new Date(appointment.date).toLocaleDateString("es-ES", {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-700">
                                  <Clock className="h-4 w-4 text-sky-600" />
                                  <span className="font-semibold text-lg">{appointment.time}</span>
                                </div>
                                <span
                                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                                    appointment.status === "confirmada"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  }`}
                                >
                                  {appointment.status === "confirmada" ? (
                                    <>
                                      <CheckCircle2 className="h-3 w-3" />
                                      Confirmada
                                    </>
                                  ) : (
                                    <>
                                      <Clock className="h-3 w-3" />
                                      Pendiente
                                    </>
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleCancelAppointment(appointment.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300"
                              >
                                Cancelar cita
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <FileText className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Citas pasadas</h2>
                    <p className="text-slate-600">Tu historial de citas</p>
                  </div>
                </div>
                {pastAppointments.length === 0 ? (
                  <Card className="border-0 shadow-xl shadow-slate-200/50">
                    <CardContent className="pt-6 text-center py-12">
                      <p className="text-slate-600">No tienes citas anteriores</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {pastAppointments.map((appointment) => (
                      <Card key={appointment.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="bg-slate-100 p-3 rounded-xl">
                              <FileText className="h-6 w-6 text-slate-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-slate-900 mb-1">{appointment.service}</h3>
                              <div className="space-y-1">
                                <p className="text-sm text-slate-600 flex items-center gap-2">
                                  <Stethoscope className="h-4 w-4" />
                                  {appointment.doctors?.name || 'Doctor no asignado'}
                                </p>
                                <p className="text-sm text-slate-600 flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(appointment.date).toLocaleDateString("es-ES")} - {appointment.time}
                                </p>
                              </div>
                              {appointment.notes && (
                                <div className="bg-slate-50 p-3 rounded-lg mt-3 border border-slate-200">
                                  <p className="text-sm text-slate-700">
                                    <span className="font-semibold">Notas:</span> {appointment.notes}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "historial" && (
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-sky-100 rounded-lg">
                  <FileText className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Historial médico</h2>
                  <p className="text-slate-600">Tu información médica completa</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <Card className="border-0 shadow-xl shadow-slate-200/50 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-500 to-blue-500"></div>
                  <CardHeader className="bg-linear-to-br from-sky-50 to-blue-50 border-b border-sky-100">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-sky-600" />
                      Información general
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <p className="text-sm text-slate-600 mb-1 font-medium">Tipo de sangre</p>
                        <p className="font-bold text-slate-900 text-lg">{patient?.blood_type || 'No registrado'}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <p className="text-sm text-slate-600 mb-1 font-medium">Alergias</p>
                        <p className="font-bold text-slate-900 text-lg">{patient?.allergies || 'No registrado'}</p>
                      </div>
                      <div className="p-4 bg-linear-to-br from-sky-50 to-blue-50 rounded-xl border border-sky-200">
                        <p className="text-sm text-sky-700 mb-1 font-medium">Última visita</p>
                        <p className="font-bold text-slate-900 text-lg">
                          {pastAppointments.length > 0 
                            ? new Date(pastAppointments[0].date).toLocaleDateString("es-ES", {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })
                            : 'Sin visitas previas'}
                        </p>
                      </div>
                      <div className="p-4 bg-linear-to-br from-sky-50 to-blue-50 rounded-xl border border-sky-200">
                        <p className="text-sm text-sky-700 mb-1 font-medium">Próxima cita</p>
                        <p className="font-bold text-slate-900 text-lg">
                          {upcomingAppointments.length > 0
                            ? new Date(upcomingAppointments[0].date).toLocaleDateString("es-ES", {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })
                            : 'Sin citas programadas'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl shadow-slate-200/50 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-sky-500"></div>
                  <CardHeader className="bg-linear-to-br from-blue-50 to-sky-50 border-b border-blue-100">
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="h-5 w-5 text-blue-600" />
                      Tratamientos realizados
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {pastAppointments.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FileText className="h-8 w-8 text-slate-400" />
                        </div>
                        <p className="text-slate-600">No hay tratamientos registrados</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {pastAppointments.slice(0, 5).map((appointment) => (
                          <div key={appointment.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                            <div className="bg-sky-100 p-3 rounded-lg">
                              <FileText className="h-5 w-5 text-sky-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-slate-900">{appointment.service}</p>
                              <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                                <Stethoscope className="h-4 w-4" />
                                {appointment.doctors?.name || 'Doctor no asignado'}
                              </p>
                              <p className="text-sm text-slate-500 mt-1">
                                {new Date(appointment.date).toLocaleDateString("es-ES", {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "perfil" && patient && (
            <PatientProfile patient={patient} onUpdate={loadPatientData} />
          )}
        </div>
      </section>
    </div>
  )
}

function PatientProfile({ patient, onUpdate }: { patient: any; onUpdate: () => void }) {
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    first_name: patient.first_name,
    last_name: patient.last_name,
    email: patient.email,
    phone: patient.phone,
    birth_date: patient.birth_date || '',
    address: patient.address || '',
    blood_type: patient.blood_type || '',
    allergies: patient.allergies || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await patientsService.update(patient.id, formData)
      alert('Perfil actualizado exitosamente')
      setIsEditing(false)
      onUpdate()
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error al actualizar el perfil')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-100 rounded-lg">
            <User className="h-6 w-6 text-sky-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Mi perfil</h2>
            <p className="text-slate-600">Administra tu información personal</p>
          </div>
        </div>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 shadow-lg shadow-sky-500/30"
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar perfil
          </Button>
        )}
      </div>

      <Card className="border-0 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-500 via-blue-500 to-sky-500"></div>
        <CardContent className="p-8">
          {/* Header del perfil */}
          <div className="flex items-center gap-6 pb-8 border-b border-slate-200 mb-8">
            <div className="relative">
              <div className="bg-linear-to-br from-sky-500 to-blue-600 w-24 h-24 rounded-2xl flex items-center justify-center shadow-xl shadow-sky-500/30">
                <User className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-2xl text-slate-900">
                {patient.first_name} {patient.last_name}
              </h3>
              <p className="text-slate-600 flex items-center gap-2 mt-1">
                <Sparkles className="h-4 w-4 text-sky-600" />
                Paciente desde {new Date(patient.created_at).getFullYear()}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Información Personal */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-slate-900 flex items-center gap-2">
                <User className="h-5 w-5 text-sky-600" />
                Información Personal
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first_name" className="font-semibold text-slate-700">Nombre</Label>
                  {isEditing ? (
                    <Input 
                      id="first_name" 
                      value={formData.first_name}
                      onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                      className="h-11 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                    />
                  ) : (
                    <p className="text-slate-900 font-medium p-3 bg-slate-50 rounded-lg">{formData.first_name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name" className="font-semibold text-slate-700">Apellido</Label>
                  {isEditing ? (
                    <Input 
                      id="last_name" 
                      value={formData.last_name}
                      onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                      className="h-11 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                    />
                  ) : (
                    <p className="text-slate-900 font-medium p-3 bg-slate-50 rounded-lg">{formData.last_name}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-slate-900 flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                Información de Contacto
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold text-slate-700">Correo electrónico</Label>
                  {isEditing ? (
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input 
                        id="email" 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="pl-10 h-11 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                      />
                    </div>
                  ) : (
                    <p className="text-slate-900 font-medium p-3 bg-slate-50 rounded-lg flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400" />
                      {formData.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-semibold text-slate-700">Teléfono</Label>
                  {isEditing ? (
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="pl-10 h-11 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                      />
                    </div>
                  ) : (
                    <p className="text-slate-900 font-medium p-3 bg-slate-50 rounded-lg flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-400" />
                      {formData.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Otros Datos */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-slate-900 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                Otros Datos
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="birth_date" className="font-semibold text-slate-700">Fecha de nacimiento</Label>
                  {isEditing ? (
                    <Input 
                      id="birth_date" 
                      type="date" 
                      value={formData.birth_date}
                      onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
                      className="h-11 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                    />
                  ) : (
                    <p className="text-slate-900 font-medium p-3 bg-slate-50 rounded-lg">
                      {formData.birth_date ? new Date(formData.birth_date).toLocaleDateString("es-ES") : 'No registrado'}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="font-semibold text-slate-700">Dirección</Label>
                  {isEditing ? (
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <Input 
                        id="address" 
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder="Calle Principal 123, Ciudad"
                        className="pl-10 h-11 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                      />
                    </div>
                  ) : (
                    <p className="text-slate-900 font-medium p-3 bg-slate-50 rounded-lg flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {formData.address || 'No registrado'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Información Médica */}
            <div className="pt-6 border-t border-slate-200">
              <h3 className="font-bold text-lg mb-4 text-slate-900 flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-red-600" />
                Información Médica
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="blood_type" className="font-semibold text-slate-700">Tipo de sangre</Label>
                  {isEditing ? (
                    <Input 
                      id="blood_type" 
                      value={formData.blood_type}
                      onChange={(e) => setFormData({...formData, blood_type: e.target.value})}
                      placeholder="O+"
                      className="h-11 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                    />
                  ) : (
                    <p className="text-slate-900 font-medium p-3 bg-red-50 rounded-lg border border-red-200">
                      {formData.blood_type || 'No registrado'}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allergies" className="font-semibold text-slate-700">Alergias</Label>
                  {isEditing ? (
                    <Input 
                      id="allergies" 
                      value={formData.allergies}
                      onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                      placeholder="Penicilina"
                      className="h-11 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                    />
                  ) : (
                    <p className="text-slate-900 font-medium p-3 bg-amber-50 rounded-lg border border-amber-200">
                      {formData.allergies || 'No registrado'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-4 pt-6 border-t border-slate-200">
                <Button 
                  onClick={handleSubmit}
                  className="flex-1 h-12 bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-sky-500/30"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Guardando cambios...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Guardar cambios
                    </>
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setFormData({
                      first_name: patient.first_name,
                      last_name: patient.last_name,
                      email: patient.email,
                      phone: patient.phone,
                      birth_date: patient.birth_date || '',
                      address: patient.address || '',
                      blood_type: patient.blood_type || '',
                      allergies: patient.allergies || '',
                    })
                  }}
                  className="flex-1 h-12 border-2"
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {!isEditing && (
        <div className="mt-6 p-5 bg-linear-to-r from-sky-50 to-blue-50 rounded-xl border border-sky-200">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sky-900 mb-1">Información protegida</p>
              <p className="text-sm text-sky-800 leading-relaxed">
                Todos tus datos están encriptados y protegidos bajo las normativas de privacidad médica.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}