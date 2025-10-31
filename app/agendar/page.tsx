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
import { CalendarIcon, Check, Clock, AlertCircle, Loader2 } from "lucide-react"
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
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
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

      // Si no hay patientId (usuario no autenticado), crear paciente
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

      // Verificar que tenemos un patientId válido
      if (!currentPatientId) {
        throw new Error('No se pudo crear o encontrar el paciente')
      }

      // Crear la cita
      const newAppointment = await appointmentsService.create({
        patient_id: currentPatientId,
        doctor_id: formData.doctorId || null,
        service: formData.service,
        date: date!.toISOString().split('T')[0],
        time: selectedTime,
        notes: formData.notes || null,
        status: 'pendiente',
      })

      // Obtener datos del doctor seleccionado
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
    <div className="min-h-screen bg-slate-50">
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-50 to-blue-50 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900 text-balance">Agenda tu cita</h1>
            <p className="text-lg text-slate-600 text-pretty leading-relaxed">
              Selecciona el servicio, fecha y hora que mejor se adapte a ti
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              {[
                { num: 1, label: "Información" },
                { num: 2, label: "Fecha y hora" },
                { num: 3, label: "Confirmar" },
                { num: 4, label: "Completado" },
              ].map((s, index) => (
                <div key={s.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        step >= s.num ? "bg-sky-600 text-white" : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {step > s.num ? <Check className="h-5 w-5" /> : s.num}
                    </div>
                    <span className="text-xs mt-2 text-slate-600 hidden sm:block">{s.label}</span>
                  </div>
                  {index < 3 && <div className={`h-1 flex-1 ${step > s.num ? "bg-sky-600" : "bg-slate-200"}`} />}
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Información personal</CardTitle>
                </CardHeader>
                <CardContent>
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
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="firstName">Nombre *</Label>
                          <HelpTooltip content="Ingresa tu nombre completo como aparece en tu identificación" />
                        </div>
                        <Input
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="Juan"
                          disabled={!!user}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido *</Label>
                        <Input
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="Pérez"
                          disabled={!!user}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="email">Correo electrónico *</Label>
                          <HelpTooltip content="Enviaremos la confirmación de tu cita a este correo" />
                        </div>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="juan@ejemplo.com"
                          disabled={!!user}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="phone">Teléfono *</Label>
                          <HelpTooltip content="Te contactaremos por WhatsApp a este número" />
                        </div>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 234 567 8900"
                          disabled={!!user}
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service">Servicio requerido *</Label>
                      <Select
                        required
                        value={formData.service}
                        onValueChange={(value) => setFormData({ ...formData, service: value })}
                      >
                        <SelectTrigger>
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
                      <Label htmlFor="doctor">Doctor preferido (opcional)</Label>
                      <Select
                        value={formData.doctorId}
                        onValueChange={(value) => setFormData({ ...formData, doctorId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctors.map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id}>
                              {doctor.name} - {doctor.specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="¿Hay algo que debamos saber?"
                        rows={4}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
                      Continuar
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Selecciona fecha y hora</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <Label className="mb-4 block">Fecha de la cita</Label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => {
                          const day = date.getDay()
                          return day === 0 || date < new Date()
                        }}
                        className="rounded-md border"
                      />
                      <p className="text-sm text-slate-500 mt-2 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        Los domingos están cerrados
                      </p>
                    </div>

                    <div>
                      <Label className="mb-4 block">Hora disponible</Label>
                      <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={selectedTime === time ? "default" : "outline"}
                            className={selectedTime === time ? "bg-sky-600 hover:bg-sky-700" : ""}
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
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Atrás
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!date || !selectedTime}
                      className="flex-1 bg-sky-600 hover:bg-sky-700"
                    >
                      Continuar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Confirma tu cita</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-6 rounded-lg space-y-4">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Paciente</p>
                        <p className="font-semibold text-slate-900">
                          {formData.firstName} {formData.lastName}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Email</p>
                          <p className="font-medium text-slate-900">{formData.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Teléfono</p>
                          <p className="font-medium text-slate-900">{formData.phone}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-slate-600 mb-1">Servicio</p>
                        <p className="font-semibold text-sky-600">{formData.service}</p>
                      </div>

                      {formData.doctorId && (
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Doctor</p>
                          <p className="font-medium text-slate-900">
                            {doctors.find(d => d.id === formData.doctorId)?.name}
                          </p>
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Fecha</p>
                          <p className="font-medium text-slate-900 flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            {date?.toLocaleDateString("es-ES", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Hora</p>
                          <p className="font-medium text-slate-900 flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {selectedTime}
                          </p>
                        </div>
                      </div>

                      {formData.notes && (
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Notas</p>
                          <p className="text-slate-900">{formData.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="bg-sky-50 p-4 rounded-lg">
                      <p className="text-sm text-sky-900 leading-relaxed">
                        Recibirás una confirmación por WhatsApp y correo electrónico. Por favor, llega 10 minutos antes
                        de tu cita.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1" disabled={loading}>
                        Atrás
                      </Button>
                      <Button 
                        type="button" 
                        onClick={handleSubmit} 
                        className="flex-1 bg-sky-600 hover:bg-sky-700"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creando...
                          </>
                        ) : (
                          'Confirmar cita'
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 4 && (
              <Card className="text-center">
                <CardContent className="pt-12 pb-12">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-slate-900">¡Cita confirmada!</h2>
                  <p className="text-lg text-slate-600 mb-4 max-w-md mx-auto text-pretty">
                    Tu cita ha sido agendada exitosamente.
                  </p>
                  <div className="bg-sky-50 border border-sky-200 p-4 rounded-lg mb-8 max-w-md mx-auto">
                    <p className="text-sm text-sky-900 leading-relaxed">
                      📱 Se ha abierto WhatsApp con tu confirmación. Si no se abrió automáticamente, 
                      también recibirás la confirmación por correo electrónico.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg mb-8 max-w-md mx-auto">
                    <div className="space-y-3 text-left">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Fecha:</span>
                        <span className="font-semibold text-slate-900">{date?.toLocaleDateString("es-ES")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Hora:</span>
                        <span className="font-semibold text-slate-900">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Servicio:</span>
                        <span className="font-semibold text-sky-600">{formData.service}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                    >
                      Agendar otra cita
                    </Button>
                    <Button asChild className="bg-sky-600 hover:bg-sky-700">
                      <a href="/">Volver al inicio</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      {step < 4 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">Información importante</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <CalendarIcon className="h-8 w-8 text-sky-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2 text-slate-900">Confirmación inmediata</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Recibirás confirmación por WhatsApp y email
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <Clock className="h-8 w-8 text-sky-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2 text-slate-900">Llega a tiempo</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Por favor llega 10 minutos antes de tu cita
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <Check className="h-8 w-8 text-sky-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2 text-slate-900">Fácil cancelación</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Cancela o reagenda con 24 horas de anticipación
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}