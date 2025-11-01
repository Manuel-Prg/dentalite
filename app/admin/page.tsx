"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import {
  Calendar,
  Users,
  TrendingUp,
  Clock,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { appointmentsService, patientsService, doctorsService } from "@/lib/supabase"

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    )
  }
  if (!user) {
    return <AdminLogin />
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md shadow-xl">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Acceso Denegado</h2>
            <p className="text-slate-600 mb-4">No tienes permisos para acceder al panel administrativo.</p>
            <Button onClick={() => router.push('/')}>Volver al inicio</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <AdminDashboard />
}

function AdminLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { signIn } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await signIn(formData.email, formData.password)
    } catch (error: any) {
      setError(error.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-slate-200/50">
        <CardHeader className="space-y-4 pb-8">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-sky-500 to-blue-600 flex items-center justify-center mx-auto shadow-lg">
            <span className="text-white font-bold text-2xl">D</span>
          </div>
          <CardTitle className="text-2xl text-center">Panel Administrativo</CardTitle>
          <p className="text-center text-slate-600">Acceso solo para personal autorizado</p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Correo electrónico</Label>
              <Input 
                id="adminEmail" 
                type="email" 
                required 
                placeholder="admin@dentalite.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminPassword">Contraseña</Label>
              <Input 
                id="adminPassword" 
                type="password" 
                required 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="h-11"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-11 bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "citas" | "pacientes" | "doctores" | "servicios">("dashboard")
  const { signOut } = useAuth()

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  Panel Administrativo
                </h1>
                <p className="text-slate-600 text-sm">Dentalite Clinic</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">A</span>
                </div>
                <span className="text-sm font-medium text-slate-700">Admin</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => signOut()} className="hover:bg-red-50 hover:text-red-600 hover:border-red-200">
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-[73px] z-40">
        <div className="container mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: "dashboard", label: "Dashboard", icon: TrendingUp },
              { id: "citas", label: "Citas", icon: Calendar },
              { id: "pacientes", label: "Pacientes", icon: Users },
              { id: "doctores", label: "Doctores", icon: UserCheck },
              { id: "servicios", label: "Servicios", icon: Clock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap relative ${
                  activeTab === tab.id
                    ? "text-sky-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-sky-500 to-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === "dashboard" && <DashboardView />}
        {activeTab === "citas" && <AppointmentsView />}
        {activeTab === "pacientes" && <PatientsView />}
        {activeTab === "doctores" && <DoctorsView />}
        {activeTab === "servicios" && <ServicesView />}
      </main>
    </div>
  )
}

function DashboardView() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [appointmentsData, patientsData] = await Promise.all([
        appointmentsService.getAll(),
        patientsService.getAll(),
      ])
      setAppointments(appointmentsData || [])
      setPatients(patientsData || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const todayAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date)
    aptDate.setHours(0, 0, 0, 0)
    return aptDate.getTime() === today.getTime()
  })

  const pendingAppointments = appointments.filter(apt => apt.status === 'pendiente')

  const stats = [
    { label: "Citas hoy", value: todayAppointments.length.toString(), change: "+2", icon: Calendar, color: "from-blue-500 to-blue-600" },
    { label: "Pacientes totales", value: patients.length.toString(), change: `+${patients.length}`, icon: Users, color: "from-green-500 to-green-600" },
    { label: "Citas pendientes", value: pendingAppointments.length.toString(), change: "-3", icon: Clock, color: "from-yellow-500 to-yellow-600" },
    { label: "Ingresos del mes", value: "$12,450", change: "+12%", icon: TrendingUp, color: "from-purple-500 to-purple-600" },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.label} className="overflow-hidden relative group hover:shadow-xl transition-all duration-300 border-slate-200/50">
            <div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
            <CardContent className="pt-6 relative">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                <div className={`p-3 rounded-xl bg-linear-to-br ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <span className={`text-sm font-semibold px-2.5 py-1 rounded-lg ${
                  stat.change.startsWith('+') 
                    ? 'text-green-700 bg-green-100' 
                    : 'text-red-700 bg-red-100'
                }`}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Appointments */}
      <Card className="border-slate-200/50 shadow-lg">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Calendar className="h-5 w-5 text-sky-600" />
            Citas de hoy
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {todayAppointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 font-medium">No hay citas programadas para hoy</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-5 bg-linear-to-r from-slate-50 to-transparent rounded-xl hover:shadow-md transition-all duration-300 border border-slate-100"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="bg-linear-to-br from-sky-500 to-blue-600 px-4 py-3 rounded-xl shadow-lg">
                      <p className="font-bold text-white">{appointment.time}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-lg">
                        {appointment.patients?.first_name} {appointment.patients?.last_name}
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        {appointment.service} • {appointment.doctors?.name || 'Sin asignar'}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-lg text-xs font-semibold ${
                        appointment.status === "confirmada"
                          ? "bg-green-100 text-green-700"
                          : appointment.status === "completada"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" className="hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Patients */}
      <Card className="border-slate-200/50 shadow-lg">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-sky-600" />
            Pacientes recientes
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {patients.slice(0, 5).map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-4 bg-linear-to-r from-slate-50 to-transparent rounded-xl hover:shadow-md transition-all duration-300 border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-md">
                    {patient.first_name?.charAt(0)}{patient.last_name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {patient.first_name} {patient.last_name}
                    </p>
                    <p className="text-sm text-slate-500">{patient.email}</p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1.5 rounded-lg bg-green-100 text-green-700 font-medium">
                  Activo
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AppointmentsView() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    try {
      const data = await appointmentsService.getAll()
      setAppointments(data || [])
    } catch (error) {
      console.error('Error loading appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta cita?')) return

    try {
      await appointmentsService.delete(id)
      loadAppointments()
    } catch (error) {
      console.error('Error deleting appointment:', error)
      alert('Error al eliminar la cita')
    }
  }

  const filteredAppointments = appointments.filter(apt => {
    const searchLower = searchTerm.toLowerCase()
    return (
      apt.patients?.first_name?.toLowerCase().includes(searchLower) ||
      apt.patients?.last_name?.toLowerCase().includes(searchLower) ||
      apt.service?.toLowerCase().includes(searchLower)
    )
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gestión de citas</h2>
          <p className="text-slate-600">Administra todas las citas de la clínica</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-slate-200/50 shadow-lg">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Buscar paciente o servicio..." 
              className="pl-11 h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card className="border-slate-200/50 shadow-lg">
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 font-semibold text-slate-900">Fecha</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900">Hora</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900">Paciente</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900">Servicio</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900">Doctor</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900">Estado</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 text-slate-900 font-medium">
                      {new Date(appointment.date).toLocaleDateString("es-ES")}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1.5 bg-sky-100 text-sky-700 rounded-lg font-semibold text-sm">
                        {appointment.time}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-900 font-medium">
                      {appointment.patients?.first_name} {appointment.patients?.last_name}
                    </td>
                    <td className="py-4 px-4 text-slate-600">{appointment.service}</td>
                    <td className="py-4 px-4 text-slate-600">
                      {appointment.doctors?.name || 'Sin asignar'}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          appointment.status === "confirmada"
                            ? "bg-green-100 text-green-700"
                            : appointment.status === "pendiente"
                              ? "bg-yellow-100 text-yellow-700"
                              : appointment.status === "completada"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-red-100 text-red-700"
                        }`}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="hover:bg-sky-50 hover:text-sky-600">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-blue-50 hover:text-blue-600">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleDelete(appointment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PatientsView() {
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = async () => {
    try {
      const data = await patientsService.getAll()
      setPatients(data || [])
    } catch (error) {
      console.error('Error loading patients:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPatients = patients.filter(patient => {
    const searchLower = searchTerm.toLowerCase()
    return (
      patient.first_name?.toLowerCase().includes(searchLower) ||
      patient.last_name?.toLowerCase().includes(searchLower) ||
      patient.email?.toLowerCase().includes(searchLower) ||
      patient.phone?.includes(searchTerm)
    )
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gestión de pacientes</h2>
          <p className="text-slate-600">Administra la información de todos los pacientes</p>
        </div>
      </div>

      {/* Search */}
      <Card className="border-slate-200/50 shadow-lg">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Buscar por nombre, email o teléfono..." 
              className="pl-11 h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-xl transition-all duration-300 border-slate-200/50 group">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-linear-to-br from-sky-500 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">
                      {patient.first_name} {patient.last_name}
                    </h3>
                    <p className="text-xs text-slate-500">ID: {patient.id.slice(0, 8)}...</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4 bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold">Email:</span> {patient.email}
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-semibold">Teléfono:</span> {patient.phone}
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-semibold">Registro:</span>{" "}
                  {new Date(patient.created_at).toLocaleDateString("es-ES")}
                </p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver perfil
                </Button>
                <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DoctorsView() {
  const [doctors, setDoctors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDoctors()
  }, [])

  const loadDoctors = async () => {
    try {
      const data = await doctorsService.getAll()
      setDoctors(data || [])
    } catch (error) {
      console.error('Error loading doctors:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gestión de doctores</h2>
          <p className="text-slate-600">Administra el equipo médico de la clínica</p>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-slate-200/50">
            <div className="h-2 bg-linear-to-r from-sky-500 to-blue-600" />
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {doctor.name.split(" ")[1]?.charAt(0) || doctor.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">{doctor.name}</h3>
                    <p className="text-sm text-sky-600 font-medium">{doctor.specialty}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm bg-slate-50 p-4 rounded-lg">
                <p className="text-slate-600">
                  <span className="font-semibold">Email:</span> {doctor.email}
                </p>
                <p className="text-slate-600">
                  <span className="font-semibold">Teléfono:</span> {doctor.phone}
                </p>
                <p className="text-slate-600">
                  <span className="font-semibold">Horario:</span> {doctor.schedule || 'No definido'}
                </p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver perfil
                </Button>
                <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ServicesView() {
  const services = [
    { id: 1, name: "Limpieza dental", price: "$50", duration: "45 min", active: true },
    { id: 2, name: "Ortodoncia", price: "$1,200", duration: "12-24 meses", active: true },
    { id: 3, name: "Blanqueamiento", price: "$200", duration: "1 hora", active: true },
    { id: 4, name: "Implantes dentales", price: "$800", duration: "3-6 meses", active: true },
    { id: 5, name: "Endodoncia", price: "$300", duration: "1-2 horas", active: true },
    { id: 6, name: "Odontopediatría", price: "$40", duration: "30-45 min", active: true },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gestión de servicios</h2>
          <p className="text-slate-600">Administra los servicios ofrecidos por la clínica</p>
        </div>
        <Button className="bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 shadow-lg">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo servicio
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-slate-200/50">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">{service.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sky-600 font-bold text-xl">{service.price}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600 text-sm">{service.duration}</span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    service.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {service.active ? "Activo" : "Inactivo"}
                </span>
              </div>

              <div className="flex gap-2 mt-6">
                <Button size="sm" variant="outline" className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button size="sm" variant="outline" className="hover:bg-red-50 hover:text-red-600 hover:border-red-200">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}