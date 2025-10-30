"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { Calendar, FileText, Lock, User, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { appointmentsService, patientsService } from "@/lib/supabase"

export default function PacientesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Mientras carga, mostrar un spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    )
  }

  // Si no está autenticado, mostrar login
  if (!user) {
    return <LoginPage />
  }

  // Si está autenticado, mostrar dashboard
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
    <div className="min-h-screen bg-slate-50">
      <section className="bg-linear-to-br from-sky-50 to-blue-50 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-sky-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">Área de pacientes</h1>
            <p className="text-slate-600 text-pretty">Accede a tu historial médico y gestiona tus citas</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">{isLogin ? "Iniciar sesión" : "Crear cuenta"}</CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nombre</Label>
                          <Input 
                            id="firstName" 
                            required 
                            placeholder="Juan"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Apellido</Label>
                          <Input 
                            id="lastName" 
                            required 
                            placeholder="Pérez"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          required 
                          placeholder="+52 993 123 4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      placeholder="juan@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      required 
                      placeholder="••••••••"
                      minLength={6}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    {!isLogin && (
                      <p className="text-xs text-slate-500">Mínimo 6 caracteres</p>
                    )}
                  </div>

                  {isLogin && (
                    <div className="text-right">
                      <button type="button" className="text-sm text-sky-600 hover:underline">
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-sky-600 hover:bg-sky-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isLogin ? "Iniciando sesión..." : "Creando cuenta..."}
                      </>
                    ) : (
                      isLogin ? "Iniciar sesión" : "Crear cuenta"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-600">
                    {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(!isLogin)
                        setError("")
                      }}
                      className="text-sky-600 hover:underline font-medium"
                    >
                      {isLogin ? "Regístrate" : "Inicia sesión"}
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <div className="flex items-center justify-center gap-2 text-slate-600 mb-4">
                <Lock className="h-4 w-4" />
                <span className="text-sm">Tus datos están protegidos y encriptados</span>
              </div>
              <p className="text-sm text-slate-500">
                ¿Necesitas ayuda?{" "}
                <Link href="/contacto" className="text-sky-600 hover:underline">
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
      
      // Cargar datos del paciente
      const patientData = await patientsService.getByUserId(user.id)
      setPatient(patientData)

      // Cargar citas del paciente
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
      loadPatientData() // Recargar datos
    } catch (error) {
      console.error('Error canceling appointment:', error)
      alert('Error al cancelar la cita')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-linear-to-br from-sky-50 to-blue-50 py-8 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                Bienvenido, {patient?.first_name || 'Paciente'}
              </h1>
              <p className="text-slate-600">Gestiona tus citas y revisa tu historial médico</p>
            </div>
            <div className="flex items-center gap-4">
              <Button asChild className="bg-sky-600 hover:bg-sky-700">
                <Link href="/agendar">
                  <Calendar className="mr-2 h-4 w-4" />
                  Nueva cita
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => signOut()}
              >
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("citas")}
              className={`py-4 border-b-2 font-medium transition-colors ${
                activeTab === "citas"
                  ? "border-sky-600 text-sky-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              Mis citas
            </button>
            <button
              onClick={() => setActiveTab("historial")}
              className={`py-4 border-b-2 font-medium transition-colors ${
                activeTab === "historial"
                  ? "border-sky-600 text-sky-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              Historial médico
            </button>
            <button
              onClick={() => setActiveTab("perfil")}
              className={`py-4 border-b-2 font-medium transition-colors ${
                activeTab === "perfil"
                  ? "border-sky-600 text-sky-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              Mi perfil
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {activeTab === "citas" && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-slate-900">Próximas citas</h2>
                {upcomingAppointments.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center py-12">
                      <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-600 mb-4">No tienes citas próximas</p>
                      <Button asChild className="bg-sky-600 hover:bg-sky-700">
                        <Link href="/agendar">Agendar una cita</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <Card key={appointment.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="bg-sky-100 p-2 rounded-lg">
                                  <Calendar className="h-5 w-5 text-sky-600" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-lg text-slate-900">{appointment.service}</h3>
                                  <p className="text-sm text-slate-600">
                                    {appointment.doctors?.name || 'Doctor por asignar'}
                                  </p>
                                </div>
                              </div>
                              <div className="ml-12 space-y-1">
                                <p className="text-slate-600">
                                  <span className="font-medium">Fecha:</span>{" "}
                                  {new Date(appointment.date).toLocaleDateString("es-ES", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                                <p className="text-slate-600">
                                  <span className="font-medium">Hora:</span> {appointment.time}
                                </p>
                                <span
                                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                    appointment.status === "confirmada"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  }`}
                                >
                                  {appointment.status === "confirmada" ? "Confirmada" : "Pendiente"}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleCancelAppointment(appointment.id)}
                                className="text-red-600 hover:text-red-700 bg-transparent"
                              >
                                Cancelar
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
                <h2 className="text-2xl font-bold mb-6 text-slate-900">Citas pasadas</h2>
                {pastAppointments.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center py-8">
                      <p className="text-slate-600">No tienes citas anteriores</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {pastAppointments.map((appointment) => (
                      <Card key={appointment.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-3">
                            <div className="bg-slate-100 p-2 rounded-lg">
                              <FileText className="h-5 w-5 text-slate-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-slate-900 mb-1">{appointment.service}</h3>
                              <p className="text-sm text-slate-600 mb-2">
                                {appointment.doctors?.name || 'Doctor no asignado'}
                              </p>
                              <p className="text-sm text-slate-600 mb-2">
                                {new Date(appointment.date).toLocaleDateString("es-ES")} - {appointment.time}
                              </p>
                              {appointment.notes && (
                                <div className="bg-slate-50 p-3 rounded-lg mt-3">
                                  <p className="text-sm text-slate-700">
                                    <span className="font-medium">Notas:</span> {appointment.notes}
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
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Historial médico</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Información general</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Tipo de sangre</p>
                        <p className="font-medium text-slate-900">{patient?.blood_type || 'No registrado'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Alergias</p>
                        <p className="font-medium text-slate-900">{patient?.allergies || 'No registrado'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Última visita</p>
                        <p className="font-medium text-slate-900">
                          {pastAppointments.length > 0 
                            ? new Date(pastAppointments[0].date).toLocaleDateString("es-ES", {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })
                            : 'Sin visitas previas'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Próxima cita</p>
                        <p className="font-medium text-slate-900">
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

                <Card>
                  <CardHeader>
                    <CardTitle>Tratamientos realizados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {pastAppointments.length === 0 ? (
                      <p className="text-slate-600 text-center py-4">No hay tratamientos registrados</p>
                    ) : (
                      <div className="space-y-4">
                        {pastAppointments.slice(0, 5).map((appointment) => (
                          <div key={appointment.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                            <div className="bg-sky-50 p-2 rounded-lg">
                              <FileText className="h-5 w-5 text-sky-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-slate-900">{appointment.service}</p>
                              <p className="text-sm text-slate-600">
                                {appointment.doctors?.name || 'Doctor no asignado'}
                              </p>
                              <p className="text-sm text-slate-500">
                                {new Date(appointment.date).toLocaleDateString("es-ES")}
                              </p>
                            </div>
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
      onUpdate()
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error al actualizar el perfil')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-slate-900">Mi perfil</h2>
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b">
              <div className="bg-sky-100 w-20 h-20 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-sky-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-900">
                  {patient.first_name} {patient.last_name}
                </h3>
                <p className="text-slate-600">
                  Paciente desde {new Date(patient.created_at).getFullYear()}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">Nombre</Label>
                <Input 
                  id="first_name" 
                  value={formData.first_name}
                  onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Apellido</Label>
                <Input 
                  id="last_name" 
                  value={formData.last_name}
                  onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input 
                id="phone" 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birth_date">Fecha de nacimiento</Label>
              <Input 
                id="birth_date" 
                type="date" 
                value={formData.birth_date}
                onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input 
                id="address" 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Calle Principal 123, Ciudad"
              />
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-semibold text-lg mb-4 text-slate-900">Información médica</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="blood_type">Tipo de sangre</Label>
                  <Input 
                    id="blood_type" 
                    value={formData.blood_type}
                    onChange={(e) => setFormData({...formData, blood_type: e.target.value})}
                    placeholder="O+"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allergies">Alergias</Label>
                  <Input 
                    id="allergies" 
                    value={formData.allergies}
                    onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                    placeholder="Penicilina"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                type="submit" 
                className="bg-sky-600 hover:bg-sky-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  'Guardar cambios'
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={onUpdate}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}