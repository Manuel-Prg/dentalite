"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { useState, useEffect } from "react"
import { CalendarIcon, Check, Clock, AlertCircle, Loader2, Sparkles, User, Mail, Phone, FileText, Stethoscope, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { HelpTooltip } from "@/components/help-tooltip"
import { appointmentsService, doctorsService, patientsService } from "@/lib/supabase"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { sendWhatsAppConfirmation } from "@/lib/whatsapp"
import { sendAppointmentConfirmationEmail } from "@/lib/email"

const services = [
  "Limpieza dental",
  "Ortodoncia",
  "Blanqueamiento",
  "Implantes dentales",
  "Endodoncia",
  "Odontopediatría",
  "Carillas dentales",
  "Periodoncia",
  "Consulta general",
]

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
]

export default function AgendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [doctors, setDoctors] = useState<any[]>([])
  const [patientId, setPatientId] = useState<string | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    doctorId: "",
    notes: "",
  })

  useEffect(() => {
    loadDoctors()
    if (user) {
      loadUserPatientData()
    }
  }, [user])

  const loadDoctors = async () => {
    try {
      const data = await doctorsService.getAll()
      setDoctors(data || [])
    } catch (error) {
      console.error('Error loading doctors:', error)
    }
  }

  const loadUserPatientData = async () => {
    if (!user) return
    
    try {
      const patient = await patientsService.getByUserId(user.id)
      if (patient) {
        setPatientId(patient.id)
        setFormData(prev => ({
          ...prev,
          firstName: patient.first_name,
          lastName: patient.last_name,
          email: patient.email,
          phone: patient.phone,
        }))
      }
    } catch (error) {
      console.error('Error loading patient data:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let currentPatientId = patientId

      if (!currentPatientId) {
        const newPatient = await patientsService.create({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          user_id: user?.id,
        })
        currentPatientId = newPatient.id
      }

      if (!currentPatientId) {
        throw new Error('No se pudo crear o encontrar el paciente')
      }

      const newAppointment = await appointmentsService.create({
        patient_id: currentPatientId,
        doctor_id: formData.doctorId || null,
        service: formData.service,
        date: date!.toISOString().split('T')[0],
        time: selectedTime,
        notes: formData.notes || null,
        status: 'pendiente',
      })

      const selectedDoctor = doctors.find(d => d.id === formData.doctorId)

      const appointmentInfo = {
        patientName: `${formData.firstName} ${formData.lastName}`,
        service: formData.service,
        date: date!.toISOString().split('T')[0],
        time: selectedTime,
        doctorName: selectedDoctor?.name
      }

      sendWhatsAppConfirmation(formData.phone, appointmentInfo)

      try {
        await sendAppointmentConfirmationEmail(formData.email, appointmentInfo)
        console.log('Email sent successfully')
      } catch (emailError) {
        console.error('Error sending email:', emailError)
      }

      setStep(4)

    } catch (error: any) {
      console.error('Error creating appointment:', error)
      alert('Error al crear la cita: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-sky-50">
      <Breadcrumbs />

      {/* Hero Section - Mejorado */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-sky-200 mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4 text-sky-600" />
              <span className="text-sm font-medium text-sky-700">Proceso simplificado en 3 pasos</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-slate-900 text-balance animate-fade-in-up">
              Agenda tu cita dental
            </h1>
            <p className="text-xl text-slate-600 text-pretty leading-relaxed max-w-2xl mx-auto animate-fade-in-up stagger-1">
              Selecciona el servicio, fecha y hora que mejor se adapte a ti. Confirmación inmediata por WhatsApp y email.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps - Mejorado */}
      <section className="py-8 bg-white/70 backdrop-blur-sm border-y border-slate-200/50 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              {[
                { num: 1, label: "Información", icon: User },
                { num: 2, label: "Fecha y hora", icon: CalendarIcon },
                { num: 3, label: "Confirmar", icon: CheckCircle2 },
                { num: 4, label: "Completado", icon: Check },
              ].map((s, index) => (
                <div key={s.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                        step >= s.num 
                          ? "bg-linear-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/50 scale-110" 
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {step > s.num ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                    </div>
                    <span className={`text-xs mt-2 font-medium hidden sm:block transition-colors ${
                      step >= s.num ? "text-sky-600" : "text-slate-500"
                    }`}>
                      {s.label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className={`h-1 flex-1 mx-2 rounded-full transition-all duration-500 ${
                      step > s.num ? "bg-linear-to-r from-sky-500 to-blue-600" : "bg-slate-200"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {step === 1 && (
              <Card className="border-0 shadow-2xl shadow-slate-200/50 animate-fade-in-up overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-500 via-blue-500 to-sky-500"></div>
                <CardHeader className="bg-linear-to-br from-sky-50 to-blue-50 border-b border-sky-100">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-sky-100 rounded-xl">
                      <User className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Información personal</CardTitle>
                      <p className="text-sm text-slate-600 mt-1">Completa tus datos para continuar</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      const newErrors: Record<string, string> = {}
                      if (!formData.firstName) newErrors.firstName = "El nombre es requerido"
                      if (!formData.lastName) newErrors.lastName = "El apellido es requerido"
                      if (!formData.email) newErrors.email = "El correo es requerido"
                      if (!formData.phone) newErrors.phone = "El teléfono es requerido"
                      if (!formData.service) newErrors.service = "Selecciona un servicio"

                      if (Object.keys(newErrors).length > 0) {
                        setErrors(newErrors)
                        return
                      }
                      setErrors({})
                      setStep(2)
                    }}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="firstName" className="font-semibold text-slate-700">Nombre *</Label>
                          <HelpTooltip content="Ingresa tu nombre completo como aparece en tu identificación" />
                        </div>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <Input
                            id="firstName"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder="Juan"
                            disabled={!!user}
                            className="pl-10 h-12 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                          />
                        </div>
                        {errors.firstName && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="font-semibold text-slate-700">Apellido *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <Input
                            id="lastName"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder="Pérez"
                            disabled={!!user}
                            className="pl-10 h-12 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                          />
                        </div>
                        {errors.lastName && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="email" className="font-semibold text-slate-700">Correo electrónico *</Label>
                          <HelpTooltip content="Enviaremos la confirmación de tu cita a este correo" />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="juan@ejemplo.com"
                            disabled={!!user}
                            className="pl-10 h-12 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="phone" className="font-semibold text-slate-700">Teléfono *</Label>
                          <HelpTooltip content="Te contactaremos por WhatsApp a este número" />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 234 567 8900"
                            disabled={!!user}
                            className="pl-10 h-12 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service" className="font-semibold text-slate-700">Servicio requerido *</Label>
                      <Select
                        required
                        value={formData.service}
                        onValueChange={(value) => setFormData({ ...formData, service: value })}
                      >
                        <SelectTrigger className="h-12 border-slate-200">
                          <SelectValue placeholder="Selecciona un servicio" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.service && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.service}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="doctor" className="font-semibold text-slate-700">Doctor preferido (opcional)</Label>
                      <Select
                        value={formData.doctorId}
                        onValueChange={(value) => setFormData({ ...formData, doctorId: value })}
                      >
                        <SelectTrigger className="h-12 border-slate-200">
                          <SelectValue placeholder="Selecciona un doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctors.map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id}>
                              <div className="flex items-center gap-2">
                                <Stethoscope className="h-4 w-4 text-sky-600" />
                                <span>{doctor.name} - {doctor.specialty}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="font-semibold text-slate-700">Notas adicionales (opcional)</Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="¿Hay algo que debamos saber?"
                          rows={4}
                          className="pl-10 border-slate-200 focus:border-sky-500 focus:ring-sky-500 resize-none"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full h-12 bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-sky-500/30 transition-all hover:shadow-xl hover:shadow-sky-500/40">
                      Continuar
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="border-0 shadow-2xl shadow-slate-200/50 animate-fade-in-up overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-500 via-blue-500 to-sky-500"></div>
                <CardHeader className="bg-linear-to-br from-sky-50 to-blue-50 border-b border-sky-100">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-sky-100 rounded-xl">
                      <CalendarIcon className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Selecciona fecha y hora</CardTitle>
                      <p className="text-sm text-slate-600 mt-1">Elige el momento que mejor te convenga</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <Label className="mb-4 block font-semibold text-slate-700 text-lg">Fecha de la cita</Label>
                      <div className="border-2 border-slate-200 rounded-xl p-4 bg-white">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => {
                            const day = date.getDay()
                            return day === 0 || date < new Date()
                          }}
                          className="rounded-lg"
                        />
                      </div>
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                        <p className="text-sm text-amber-800">
                          <strong>Nota:</strong> Los domingos estamos cerrados
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label className="mb-4 block font-semibold text-slate-700 text-lg">Hora disponible</Label>
                      <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={selectedTime === time ? "default" : "outline"}
                            className={`h-14 transition-all ${
                              selectedTime === time 
                                ? "bg-linear-to-br from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg shadow-sky-500/30 scale-105" 
                                : "hover:border-sky-300 hover:bg-sky-50"
                            }`}
                            onClick={() => setSelectedTime(time)}
                          >
                            <Clock className="h-4 w-4 mr-1" />
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setStep(1)} 
                      className="flex-1 h-12 border-2"
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Atrás
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!date || !selectedTime}
                      className="flex-1 h-12 bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-sky-500/30 transition-all hover:shadow-xl hover:shadow-sky-500/40 disabled:opacity-50"
                    >
                      Continuar
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card className="border-0 shadow-2xl shadow-slate-200/50 animate-fade-in-up overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-500 via-blue-500 to-sky-500"></div>
                <CardHeader className="bg-linear-to-br from-sky-50 to-blue-50 border-b border-sky-100">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-sky-100 rounded-xl">
                      <CheckCircle2 className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Confirma tu cita</CardTitle>
                      <p className="text-sm text-slate-600 mt-1">Revisa los detalles antes de confirmar</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="bg-linear-to-br from-slate-50 to-sky-50 p-8 rounded-2xl border-2 border-sky-100 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-sky-100 rounded-xl">
                          <User className="h-6 w-6 text-sky-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Paciente</p>
                          <p className="font-bold text-slate-900 text-lg">
                            {formData.firstName} {formData.lastName}
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-slate-400" />
                          <div>
                            <p className="text-sm text-slate-600">Email</p>
                            <p className="font-medium text-slate-900">{formData.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-slate-400" />
                          <div>
                            <p className="text-sm text-slate-600">Teléfono</p>
                            <p className="font-medium text-slate-900">{formData.phone}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-xl border-2 border-sky-200">
                        <p className="text-sm text-slate-600 mb-1">Servicio</p>
                        <p className="font-bold text-sky-600 text-lg">{formData.service}</p>
                      </div>

                      {formData.doctorId && (
                        <div className="flex items-center gap-3">
                          <Stethoscope className="h-5 w-5 text-slate-400" />
                          <div>
                            <p className="text-sm text-slate-600">Doctor</p>
                            <p className="font-medium text-slate-900">
                              {doctors.find(d => d.id === formData.doctorId)?.name}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-4 bg-white rounded-xl border-2 border-slate-200">
                          <div className="flex items-center gap-2 mb-2">
                            <CalendarIcon className="h-5 w-5 text-sky-600" />
                            <p className="text-sm text-slate-600">Fecha</p>
                          </div>
                          <p className="font-bold text-slate-900">
                            {date?.toLocaleDateString("es-ES", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="p-4 bg-white rounded-xl border-2 border-slate-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-5 w-5 text-sky-600" />
                            <p className="text-sm text-slate-600">Hora</p>
                          </div>
                          <p className="font-bold text-slate-900 text-xl">{selectedTime}</p>
                        </div>
                      </div>

                      {formData.notes && (
                        <div className="p-4 bg-white rounded-xl border border-slate-200">
                          <p className="text-sm text-slate-600 mb-2">Notas adicionales</p>
                          <p className="text-slate-900">{formData.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="bg-linear-to-r from-sky-50 to-blue-50 p-6 rounded-xl border border-sky-200">
                      <div className="flex items-start gap-3">
                        <Sparkles className="h-6 w-6 text-sky-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-sky-900 mb-1">Información importante</p>
                          <p className="text-sm text-sky-800 leading-relaxed">
                            Recibirás una confirmación por WhatsApp y correo electrónico. Por favor, llega 10 minutos antes
                            de tu cita.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setStep(2)} 
                        className="flex-1 h-12 border-2" 
                        disabled={loading}
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Atrás
                      </Button>
                      <Button 
                        type="button" 
                        onClick={handleSubmit} 
                        className="flex-1 h-12 bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-sky-500/30 transition-all hover:shadow-xl hover:shadow-sky-500/40"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Creando cita...
                          </>
                        ) : (
                          <>
                            <Check className="mr-2 h-5 w-5" />
                            Confirmar cita
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 4 && (
              <Card className="border-0 shadow-2xl shadow-slate-200/50 animate-fade-in-up overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-green-500 via-emerald-500 to-green-500"></div>
                <CardContent className="pt-12 pb-12 px-8">
                  <div className="text-center">
                    <div className="relative inline-flex mb-8">
                      <div className="absolute inset-0 bg-green-400/30 rounded-full blur-2xl animate-pulse-slow"></div>
                      <div className="relative bg-linear-to-br from-green-400 to-emerald-500 w-24 h-24 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 animate-bounce-subtle">
                        <Check className="h-12 w-12 text-white stroke-3" />
                      </div>
                    </div>

                    <h2 className="text-4xl font-bold mb-3 text-slate-900 animate-fade-in">
                      ¡Cita confirmada!
                    </h2>
                    <p className="text-lg text-slate-600 mb-6 max-w-md mx-auto text-pretty animate-fade-in stagger-1">
                      Tu cita ha sido agendada exitosamente. Te esperamos pronto.
                    </p>

                    <div className="bg-linear-to-r from-sky-50 to-blue-50 border-2 border-sky-200 p-5 rounded-xl mb-8 max-w-md mx-auto animate-fade-in stagger-2">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-sky-100 rounded-lg">
                          <Mail className="h-5 w-5 text-sky-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-sky-900 mb-1">Confirmación enviada</p>
                          <p className="text-sm text-sky-800 leading-relaxed">
                            📱 Se ha abierto WhatsApp con tu confirmación. También recibirás un correo electrónico con todos los detalles.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-linear-to-br from-slate-50 to-sky-50 p-8 rounded-2xl border-2 border-sky-100 mb-8 max-w-md mx-auto animate-fade-in stagger-3">
                      <h3 className="font-bold text-slate-900 mb-4 text-lg">Detalles de tu cita</h3>
                      <div className="space-y-4 text-left">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div className="flex items-center gap-3">
                            <CalendarIcon className="h-5 w-5 text-sky-600" />
                            <span className="text-slate-600">Fecha:</span>
                          </div>
                          <span className="font-bold text-slate-900">{date?.toLocaleDateString("es-ES")}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-sky-600" />
                            <span className="text-slate-600">Hora:</span>
                          </div>
                          <span className="font-bold text-slate-900 text-lg">{selectedTime}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div className="flex items-center gap-3">
                            <Stethoscope className="h-5 w-5 text-sky-600" />
                            <span className="text-slate-600">Servicio:</span>
                          </div>
                          <span className="font-bold text-sky-600">{formData.service}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in stagger-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setStep(1)
                          setFormData({
                            firstName: user ? formData.firstName : "",
                            lastName: user ? formData.lastName : "",
                            email: user ? formData.email : "",
                            phone: user ? formData.phone : "",
                            service: "",
                            doctorId: "",
                            notes: "",
                          })
                          setSelectedTime("")
                          setDate(new Date())
                        }}
                        className="h-12 border-2 px-6"
                      >
                        <CalendarIcon className="mr-2 h-5 w-5" />
                        Agendar otra cita
                      </Button>
                      <Button asChild className="h-12 bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-sky-500/30 px-6">
                        <a href="/">Volver al inicio</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Info Section - Mejorado */}
      {step < 4 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3 text-slate-900">¿Por qué agendar con nosotros?</h2>
                <p className="text-slate-600 text-lg">Hacemos el proceso simple y conveniente para ti</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-500 to-blue-500"></div>
                  <CardContent className="pt-8 pb-6 text-center">
                    <div className="bg-linear-to-br from-sky-100 to-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <CalendarIcon className="h-8 w-8 text-sky-600" />
                    </div>
                    <h3 className="font-bold mb-2 text-slate-900 text-lg">Confirmación inmediata</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Recibirás confirmación instantánea por WhatsApp y correo electrónico
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-sky-500"></div>
                  <CardContent className="pt-8 pb-6 text-center">
                    <div className="bg-linear-to-br from-blue-100 to-sky-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Clock className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold mb-2 text-slate-900 text-lg">Puntualidad garantizada</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Llega 10 minutos antes. Respetamos tu tiempo y el nuestro
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-500 to-blue-500"></div>
                  <CardContent className="pt-8 pb-6 text-center">
                    <div className="bg-linear-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-bold mb-2 text-slate-900 text-lg">Fácil cancelación</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Cancela o reagenda con 24 horas de anticipación sin cargos
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #0ea5e9, #0284c7);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0284c7, #0369a1);
        }
      `}</style>
    </div>
  )
}