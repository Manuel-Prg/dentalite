"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Mail, MapPin, Phone, AlertCircle } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { HelpTooltip } from "@/components/help-tooltip"
import { useState } from "react"

export default function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    const newErrors: Record<string, string> = {}
    if (!data.firstName) newErrors.firstName = "El nombre es requerido"
    if (!data.lastName) newErrors.lastName = "El apellido es requerido"
    if (!data.email) newErrors.email = "El correo electrónico es requerido"
    if (!data.phone) newErrors.phone = "El teléfono es requerido"
    if (!data.message) newErrors.message = "El mensaje es requerido"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitSuccess(true)
  }

  return (
    <div className="min-h-screen">
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-50 to-blue-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900 text-balance">Contáctanos</h1>
            <p className="text-lg lg:text-xl text-slate-600 text-pretty leading-relaxed">
              Estamos aquí para responder tus preguntas y ayudarte a cuidar tu sonrisa
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Envíanos un mensaje</h2>
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <AlertCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">Mensaje enviado exitosamente</p>
                    <p className="text-sm text-green-700">Nos pondremos en contacto contigo pronto.</p>
                  </div>
                </div>
              )}
              <Card>
                <CardContent className="p-6">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="firstName">Nombre *</Label>
                          <HelpTooltip content="Ingresa tu nombre completo" />
                        </div>
                        <Input id="firstName" name="firstName" placeholder="Juan" />
                        {errors.firstName && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido *</Label>
                        <Input id="lastName" name="lastName" placeholder="Pérez" />
                        {errors.lastName && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="email">Correo electrónico *</Label>
                        <HelpTooltip content="Usaremos este correo para responderte" />
                      </div>
                      <Input id="email" name="email" type="email" placeholder="juan@ejemplo.com" />
                      {errors.email && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+1 234 567 8900" />
                      {errors.phone && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Asunto</Label>
                      <Input id="subject" name="subject" placeholder="¿En qué podemos ayudarte?" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensaje *</Label>
                      <Textarea id="message" name="message" placeholder="Cuéntanos más sobre tu consulta..." rows={5} />
                      {errors.message && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Información de contacto</h2>

              <div className="space-y-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-sky-100 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-sky-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1 text-slate-900">Dirección</h3>
                        <p className="text-slate-600">Av. Principal 123</p>
                        <p className="text-slate-600">Ciudad, País</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-sky-100 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-sky-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1 text-slate-900">Teléfono</h3>
                        <p className="text-slate-600">+1 234 567 8900</p>
                        <p className="text-sm text-slate-500 mt-1">Lun - Vie: 9:00 - 19:00</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-sky-100 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-sky-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1 text-slate-900">Email</h3>
                        <p className="text-slate-600">info@dentalite.com</p>
                        <p className="text-slate-600">citas@dentalite.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-sky-100 p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-sky-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1 text-slate-900">Horario</h3>
                        <div className="space-y-1 text-slate-600">
                          <p>Lunes - Viernes: 9:00 - 19:00</p>
                          <p>Sábado: 9:00 - 14:00</p>
                          <p>Domingo: Cerrado</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="bg-slate-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-slate-500">Mapa de ubicación</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-slate-900">Preguntas frecuentes</h2>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-slate-900">¿Cómo puedo agendar una cita?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Puedes agendar tu cita a través de nuestro sistema en línea, por teléfono, o enviándonos un mensaje
                    por WhatsApp. Recibirás confirmación inmediata.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-slate-900">¿Aceptan seguros dentales?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Sí, trabajamos con las principales aseguradoras. Contáctanos para verificar si aceptamos tu seguro
                    específico.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-slate-900">¿Ofrecen planes de pago?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Sí, ofrecemos planes de pago flexibles para tratamientos mayores. Consulta con nuestro equipo para
                    conocer las opciones disponibles.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-slate-900">¿Qué debo llevar a mi primera cita?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Trae tu identificación, tarjeta de seguro (si aplica), y cualquier radiografía o historial dental
                    previo que tengas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
