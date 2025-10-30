"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
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
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CustomBarChart, CustomLineChart, CustomPieChart } from "@/components/custom-charts"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />
  }

  return <AdminDashboard />
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl animate-scale-in">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Panel Administrativo</CardTitle>
          <p className="text-center text-slate-600">Acceso solo para personal autorizado</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Correo electrónico</Label>
              <Input id="adminEmail" type="email" required placeholder="admin@dentalite.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminPassword">Contraseña</Label>
              <Input id="adminPassword" type="password" required placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full bg-gradient-primary text-white hover:opacity-90 transition-opacity">
              Iniciar sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "citas" | "pacientes" | "doctores" | "servicios">(
    "dashboard",
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Panel Administrativo
              </h1>
              <p className="text-slate-600">Dentalite</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">Admin: Dr. Juan Pérez</span>
              <Button variant="outline" size="sm" className="hover-lift bg-transparent">
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
                    ? "border-primary text-primary"
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
  const stats = [
    { label: "Citas hoy", value: "12", change: "+2", icon: Calendar, color: "from-blue-500 to-blue-600" },
    { label: "Pacientes totales", value: "248", change: "+18", icon: Users, color: "from-green-500 to-green-600" },
    { label: "Citas pendientes", value: "8", change: "-3", icon: Clock, color: "from-yellow-500 to-yellow-600" },
    {
      label: "Ingresos del mes",
      value: "$12,450",
      change: "+12%",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
    },
  ]

  const appointmentData = [
    { day: "Lun", citas: 12 },
    { day: "Mar", citas: 15 },
    { day: "Mié", citas: 18 },
    { day: "Jue", citas: 14 },
    { day: "Vie", citas: 20 },
    { day: "Sáb", citas: 10 },
  ]

  const revenueData = [
    { mes: "Ene", ingresos: 8500 },
    { mes: "Feb", ingresos: 9200 },
    { mes: "Mar", ingresos: 10100 },
    { mes: "Abr", ingresos: 11300 },
    { mes: "May", ingresos: 12450 },
  ]

  const serviceDistribution = [
    { name: "Limpieza", value: 35, color: "#3b82f6" },
    { name: "Ortodoncia", value: 25, color: "#10b981" },
    { name: "Blanqueamiento", value: 20, color: "#f59e0b" },
    { name: "Implantes", value: 15, color: "#8b5cf6" },
    { name: "Otros", value: 5, color: "#6b7280" },
  ]

  const todayAppointments = [
    {
      id: 1,
      time: "09:00",
      patient: "María González",
      service: "Limpieza dental",
      doctor: "Dr. Juan Pérez",
      status: "confirmada",
    },
    {
      id: 2,
      time: "10:30",
      patient: "Carlos Ramírez",
      service: "Ortodoncia",
      doctor: "Dra. María López",
      status: "en-progreso",
    },
    {
      id: 3,
      time: "11:00",
      patient: "Ana Martínez",
      service: "Blanqueamiento",
      doctor: "Dr. Carlos Ruiz",
      status: "pendiente",
    },
    {
      id: 4,
      time: "14:00",
      patient: "Luis Torres",
      service: "Implante dental",
      doctor: "Dr. Juan Pérez",
      status: "pendiente",
    },
  ]

  const recentPatients = [
    { name: "María González", lastVisit: "Hoy", status: "Activo" },
    { name: "Carlos Ramírez", lastVisit: "Ayer", status: "Activo" },
    { name: "Ana Martínez", lastVisit: "Hace 2 días", status: "Activo" },
    { name: "Luis Torres", lastVisit: "Hace 3 días", status: "Pendiente" },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={stat.label}
            className={`hover-lift animate-fade-in-up stagger-${index + 1} overflow-hidden relative`}
          >
            <div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-5`} />
            <CardContent className="pt-6 relative">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600">{stat.label}</p>
                <div className={`p-2 rounded-lg bg-linear-to-br ${stat.color}`}>
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

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Appointments Chart */}
        <Card className="hover-lift animate-fade-in-up stagger-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Citas de la semana
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CustomBarChart data={appointmentData} />
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="hover-lift animate-fade-in-up stagger-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Ingresos mensuales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CustomLineChart data={revenueData} />
          </CardContent>
        </Card>
      </div>

      {/* Service Distribution and Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Service Distribution */}
        <Card className="hover-lift animate-fade-in-up stagger-5">
          <CardHeader>
            <CardTitle>Distribución de servicios</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomPieChart data={serviceDistribution} />
            <div className="mt-4 space-y-2">
              {serviceDistribution.map((service) => (
                <div key={service.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: service.color }} />
                    <span className="text-slate-600">{service.name}</span>
                  </div>
                  <span className="font-medium text-slate-900">{service.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card className="hover-lift animate-fade-in-up stagger-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              Pacientes recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{patient.name}</p>
                      <p className="text-xs text-slate-500">{patient.lastVisit}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      patient.status === "Activo" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {patient.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="hover-lift animate-fade-in-up stagger-7 border-l-4 border-l-yellow-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              Alertas y notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm font-medium text-yellow-900 mb-1">8 citas pendientes de confirmar</p>
                <p className="text-xs text-yellow-700">Requieren atención inmediata</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-900 mb-1">3 pacientes nuevos hoy</p>
                <p className="text-xs text-blue-700">Completar historial médico</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-green-900 mb-1">Inventario actualizado</p>
                <p className="text-xs text-green-700">Todos los suministros en stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Appointments */}
      <Card className="animate-fade-in-up stagger-8">
        <CardHeader>
          <CardTitle>Citas de hoy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors hover-lift"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="bg-gradient-primary px-3 py-2 rounded-lg shadow-md">
                    <p className="font-semibold text-white">{appointment.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{appointment.patient}</p>
                    <p className="text-sm text-slate-600">
                      {appointment.service} - {appointment.doctor}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === "confirmada"
                        ? "bg-green-100 text-green-700"
                        : appointment.status === "en-progreso"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {appointment.status === "confirmada"
                      ? "Confirmada"
                      : appointment.status === "en-progreso"
                        ? "En progreso"
                        : "Pendiente"}
                  </span>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline" className="hover-lift bg-transparent">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="hover-lift bg-transparent">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: Plus,
            title: "Nueva cita",
            description: "Agendar una nueva cita para un paciente",
            color: "from-blue-500 to-blue-600",
          },
          {
            icon: Users,
            title: "Nuevo paciente",
            description: "Registrar un nuevo paciente en el sistema",
            color: "from-green-500 to-green-600",
          },
          {
            icon: FileText,
            title: "Generar reporte",
            description: "Ver estadísticas y reportes del mes",
            color: "from-purple-500 to-purple-600",
          },
        ].map((action, index) => (
          <Card
            key={index}
            className={`hover-lift cursor-pointer animate-fade-in-up stagger-${index + 9} overflow-hidden relative group`}
          >
            <div
              className={`absolute inset-0 bg-linear-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`}
            />
            <CardContent className="pt-6 text-center relative">
              <div
                className={`bg-linear-to-br ${action.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
              >
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{action.title}</h3>
              <p className="text-sm text-slate-600">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DoctorsView() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Juan Pérez",
      specialty: "Odontología General",
      email: "juan.perez@dentalite.com",
      phone: "+1 234 567 8900",
      patients: 85,
      appointments: 12,
      rating: 4.9,
      status: "Activo",
      schedule: "Lun-Vie 9:00-18:00",
    },
    {
      id: 2,
      name: "Dra. María López",
      specialty: "Ortodoncia",
      email: "maria.lopez@dentalite.com",
      phone: "+1 234 567 8901",
      patients: 62,
      appointments: 8,
      rating: 4.8,
      status: "Activo",
      schedule: "Lun-Sáb 10:00-19:00",
    },
    {
      id: 3,
      name: "Dr. Carlos Ruiz",
      specialty: "Endodoncia",
      email: "carlos.ruiz@dentalite.com",
      phone: "+1 234 567 8902",
      patients: 48,
      appointments: 6,
      rating: 4.7,
      status: "Activo",
      schedule: "Mar-Sáb 9:00-17:00",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gestión de doctores</h2>
          <p className="text-slate-600">Administra el equipo médico de la clínica</p>
        </div>
        <Button className="bg-gradient-primary text-white hover:opacity-90 transition-opacity hover-lift">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo doctor
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="animate-fade-in-up stagger-1">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Buscar doctor..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Especialidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="general">Odontología General</SelectItem>
                <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
                <SelectItem value="endodoncia">Endodoncia</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="activo">Activos</SelectItem>
                <SelectItem value="inactivo">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Doctors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor, index) => (
          <Card key={doctor.id} className={`hover-lift animate-fade-in-up stagger-${index + 2} overflow-hidden`}>
            <div className="h-2 bg-gradient-primary" />
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {doctor.name.split(" ")[1].charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">{doctor.name}</h3>
                    <p className="text-sm text-slate-600">{doctor.specialty}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-slate-700">{doctor.rating}</span>
                    </div>
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
                  <span className="font-medium">Horario:</span> {doctor.schedule}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600">{doctor.patients}</p>
                  <p className="text-xs text-blue-700">Pacientes</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">{doctor.appointments}</p>
                  <p className="text-xs text-green-700">Citas hoy</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    doctor.status === "Activo" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {doctor.status}
                </span>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 hover-lift bg-transparent">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver perfil
                </Button>
                <Button size="sm" variant="outline" className="hover-lift bg-transparent">
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

function AppointmentsView() {
  const [showNewAppointment, setShowNewAppointment] = useState(false)

  const appointments = [
    {
      id: 1,
      date: "2025-02-15",
      time: "10:00",
      patient: "María González",
      service: "Limpieza dental",
      doctor: "Dr. Juan Pérez",
      status: "confirmada",
    },
    {
      id: 2,
      date: "2025-02-15",
      time: "11:30",
      patient: "Carlos Ramírez",
      service: "Ortodoncia",
      doctor: "Dra. María López",
      status: "pendiente",
    },
    {
      id: 3,
      date: "2025-02-16",
      time: "09:00",
      patient: "Ana Martínez",
      service: "Blanqueamiento",
      doctor: "Dr. Carlos Ruiz",
      status: "confirmada",
    },
    {
      id: 4,
      date: "2025-02-16",
      time: "14:00",
      patient: "Luis Torres",
      service: "Implante dental",
      doctor: "Dr. Juan Pérez",
      status: "cancelada",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gestión de citas</h2>
          <p className="text-slate-600">Administra todas las citas de la clínica</p>
        </div>
        <Button onClick={() => setShowNewAppointment(true)} className="bg-sky-600 hover:bg-sky-700">
          <Plus className="mr-2 h-4 w-4" />
          Nueva cita
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Buscar paciente..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="confirmada">Confirmadas</SelectItem>
                <SelectItem value="pendiente">Pendientes</SelectItem>
                <SelectItem value="cancelada">Canceladas</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="perez">Dr. Juan Pérez</SelectItem>
                <SelectItem value="lopez">Dra. María López</SelectItem>
                <SelectItem value="ruiz">Dr. Carlos Ruiz</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" />
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
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-900">
                      {new Date(appointment.date).toLocaleDateString("es-ES")}
                    </td>
                    <td className="py-3 px-4 text-slate-900">{appointment.time}</td>
                    <td className="py-3 px-4 text-slate-900">{appointment.patient}</td>
                    <td className="py-3 px-4 text-slate-600">{appointment.service}</td>
                    <td className="py-3 px-4 text-slate-600">{appointment.doctor}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === "confirmada"
                            ? "bg-green-100 text-green-700"
                            : appointment.status === "pendiente"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {appointment.status === "confirmada"
                          ? "Confirmada"
                          : appointment.status === "pendiente"
                            ? "Pendiente"
                            : "Cancelada"}
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
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
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

      {/* New Appointment Modal */}
      {showNewAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Nueva cita</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Paciente</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">María González</SelectItem>
                        <SelectItem value="2">Carlos Ramírez</SelectItem>
                        <SelectItem value="3">Ana Martínez</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Servicio</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar servicio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="limpieza">Limpieza dental</SelectItem>
                        <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
                        <SelectItem value="blanqueamiento">Blanqueamiento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Doctor</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="perez">Dr. Juan Pérez</SelectItem>
                        <SelectItem value="lopez">Dra. María López</SelectItem>
                        <SelectItem value="ruiz">Dr. Carlos Ruiz</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha</Label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Hora</Label>
                    <Input type="time" />
                  </div>
                  <div className="space-y-2">
                    <Label>Duración (minutos)</Label>
                    <Input type="number" placeholder="60" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notas</Label>
                  <Textarea placeholder="Notas adicionales..." rows={3} />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1 bg-sky-600 hover:bg-sky-700">
                    Crear cita
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setShowNewAppointment(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

function PatientsView() {
  const patients = [
    {
      id: 1,
      name: "María González",
      email: "maria@ejemplo.com",
      phone: "+1 234 567 8900",
      lastVisit: "2025-01-10",
      nextAppointment: "2025-02-15",
    },
    {
      id: 2,
      name: "Carlos Ramírez",
      email: "carlos@ejemplo.com",
      phone: "+1 234 567 8901",
      lastVisit: "2025-01-05",
      nextAppointment: "2025-02-20",
    },
    {
      id: 3,
      name: "Ana Martínez",
      email: "ana@ejemplo.com",
      phone: "+1 234 567 8902",
      lastVisit: "2024-12-20",
      nextAppointment: "2025-02-25",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gestión de pacientes</h2>
          <p className="text-slate-600">Administra la información de todos los pacientes</p>
        </div>
        <Button className="bg-sky-600 hover:bg-sky-700">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo paciente
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Buscar por nombre, email o teléfono..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* Patients Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-sky-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{patient.name}</h3>
                    <p className="text-sm text-slate-600">ID: {patient.id}</p>
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
                  <span className="font-medium">Última visita:</span>{" "}
                  {new Date(patient.lastVisit).toLocaleDateString("es-ES")}
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Próxima cita:</span>{" "}
                  {new Date(patient.nextAppointment).toLocaleDateString("es-ES")}
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
