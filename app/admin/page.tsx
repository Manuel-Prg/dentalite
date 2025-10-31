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
  FileText,
  TrendingUp,
  Clock,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Activity,
  DollarSign,
  UserCheck,
  AlertCircle,
  Star,
  Loader2,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CustomBarChart, CustomLineChart, CustomPieChart } from "@/components/custom-charts"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { appointmentsService, patientsService, doctorsService } from "@/lib/supabase"

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth()
  const router = useRouter()

  // Mientras carga
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    )
  }

  // Si no está autenticado, mostrar login
  if (!user) {
    return <AdminLogin />
  }

  // Si no es admin, redirigir
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md">
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
      // La redirección se manejará automáticamente por el efecto de autenticación
    } catch (error: any) {
      setError(error.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Panel Administrativo</CardTitle>
          <p className="text-center text-slate-600">Acceso solo para personal autorizado</p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
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
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-sky-600 hover:bg-sky-700"
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                Panel Administrativo
              </h1>
              <p className="text-slate-600">Dentalite</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">Admin</span>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 overflow-x-auto">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "citas", label: "Citas" },
              { id: "pacientes", label: "Pacientes" },
              { id: "doctores", label: "Doctores" },
              { id: "servicios", label: "Servicios" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 border-b-2 font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-sky-600 text-sky-600"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
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
          <Card key={stat.label} className="overflow-hidden relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
            <CardContent className="pt-6 relative">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600">{stat.label}</p>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Citas de hoy</CardTitle>
        </CardHeader>
        <CardContent>
          {todayAppointments.length === 0 ? (
            <p className="text-center text-slate-600 py-8">No hay citas programadas para hoy</p>
          ) : (
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="bg-gradient-to-br from-sky-500 to-blue-600 px-3 py-2 rounded-lg shadow-md">
                      <p className="font-semibold text-white text-sm">{appointment.time}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">
                        {appointment.patients?.first_name} {appointment.patients?.last_name}
                      </p>
                      <p className="text-sm text-slate-600">
                        {appointment.service} - {appointment.doctors?.name || 'Sin asignar'}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent">
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-sky-600" />
            Pacientes recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patients.slice(0, 5).map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                    {patient.first_name?.charAt(0)}{patient.last_name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">
                      {patient.first_name} {patient.last_name}
                    </p>
                    <p className="text-xs text-slate-500">{patient.email}</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
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
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Buscar paciente o servicio..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Fecha</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Hora</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Paciente</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Servicio</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Doctor</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Estado</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-900">
                      {new Date(appointment.date).toLocaleDateString("es-ES")}
                    </td>
                    <td className="py-3 px-4 text-slate-900">{appointment.time}</td>
                    <td className="py-3 px-4 text-slate-900">
                      {appointment.patients?.first_name} {appointment.patients?.last_name}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{appointment.service}</td>
                    <td className="py-3 px-4 text-slate-600">
                      {appointment.doctors?.name || 'Sin asignar'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-600 hover:text-red-700"
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
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Buscar por nombre, email o teléfono..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-sky-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {patient.first_name} {patient.last_name}
                    </h3>
                    <p className="text-sm text-slate-600">ID: {patient.id.slice(0, 8)}...</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Email:</span> {patient.email}
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Teléfono:</span> {patient.phone}
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Registro:</span>{" "}
                  {new Date(patient.created_at).toLocaleDateString("es-ES")}
                </p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver perfil
                </Button>
                <Button size="sm" variant="outline">
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
          <Card key={doctor.id} className="overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-sky-500 to-blue-600" />
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {doctor.name.split(" ")[1]?.charAt(0) || doctor.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">{doctor.name}</h3>
                    <p className="text-sm text-slate-600">{doctor.specialty}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <p className="text-slate-600">
                  <span className="font-medium">Email:</span> {doctor.email}
                </p>
                <p className="text-slate-600">
                  <span className="font-medium">Teléfono:</span> {doctor.phone}
                </p>
                <p className="text-slate-600">
                  <span className="font-medium">Horario:</span> {doctor.schedule || 'No definido'}
                </p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver perfil
                </Button>
                <Button size="sm" variant="outline" className="bg-transparent">
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
        <Button className="bg-sky-600 hover:bg-sky-700">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo servicio
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-1">{service.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sky-600 font-semibold">{service.price}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-600 text-sm">{service.duration}</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    service.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {service.active ? "Activo" : "Inactivo"}
                </span>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
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