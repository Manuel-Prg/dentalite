"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Mail, MapPin, Phone, AlertCircle, Send, User, FileText, MessageSquare, CheckCircle2, Sparkles, ChevronDown } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { HelpTooltip } from "@/components/help-tooltip"
import { useState } from "react"

export default function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const newErrors: Record<string, string> = {}
    if (!formData.firstName) newErrors.firstName = "El nombre es requerido"
    if (!formData.lastName) newErrors.lastName = "El apellido es requerido"
    if (!formData.email) newErrors.email = "El correo electrónico es requerido"
    if (!formData.phone) newErrors.phone = "El teléfono es requerido"
    if (!formData.message) newErrors.message = "El mensaje es requerido"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    })
    
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  const faqs = [
    {
      question: "¿Cómo puedo agendar una cita?",
      answer: "Puedes agendar tu cita a través de nuestro sistema en línea, por teléfono, o enviándonos un mensaje por WhatsApp. Recibirás confirmación inmediata."
    },
    {
      question: "¿Aceptan seguros dentales?",
      answer: "Sí, trabajamos con las principales aseguradoras. Contáctanos para verificar si aceptamos tu seguro específico."
    },
    {
      question: "¿Ofrecen planes de pago?",
      answer: "Sí, ofrecemos planes de pago flexibles para tratamientos mayores. Consulta con nuestro equipo para conocer las opciones disponibles."
    },
    {
      question: "¿Qué debo llevar a mi primera cita?",
      answer: "Trae tu identificación, tarjeta de seguro (si aplica), y cualquier radiografía o historial dental previo que tengas."
    }
  ]

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
              <MessageSquare className="h-4 w-4 text-sky-600" />
              <span className="text-sm font-medium text-sky-700">Estamos aquí para ayudarte</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-slate-900 text-balance animate-fade-in-up">
              Contáctanos
            </h1>
            <p className="text-xl text-slate-600 text-pretty leading-relaxed max-w-2xl mx-auto animate-fade-in-up stagger-1">
              Estamos aquí para responder tus preguntas y ayudarte a cuidar tu sonrisa
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section - Mejorado */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-linear-to-br from-sky-100 to-blue-100 rounded-xl">
                  <Send className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Envíanos un mensaje</h2>
                  <p className="text-slate-600">Responderemos en menos de 24 horas</p>
                </div>
              </div>

              {submitSuccess && (
                <div className="mb-6 p-5 bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl flex items-start gap-3 animate-fade-in shadow-lg shadow-green-100">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-green-900 text-lg">¡Mensaje enviado exitosamente!</p>
                    <p className="text-sm text-green-700 mt-1">Nos pondremos en contacto contigo muy pronto.</p>
                  </div>
                </div>
              )}

              <Card className="border-0 shadow-2xl shadow-slate-200/50 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-500 via-blue-500 to-sky-500"></div>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="firstName" className="font-semibold text-slate-700">Nombre *</Label>
                          <HelpTooltip content="Ingresa tu nombre completo" />
                        </div>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <Input 
                            id="firstName" 
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            placeholder="Juan"
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
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            placeholder="Pérez"
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

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="email" className="font-semibold text-slate-700">Correo electrónico *</Label>
                        <HelpTooltip content="Usaremos este correo para responderte" />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input 
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="juan@ejemplo.com"
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
                      <Label htmlFor="phone" className="font-semibold text-slate-700">Teléfono *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input 
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+1 234 567 8900"
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

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="font-semibold text-slate-700">Asunto</Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input 
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          placeholder="¿En qué podemos ayudarte?"
                          className="pl-10 h-12 border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-semibold text-slate-700">Mensaje *</Label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Textarea 
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Cuéntanos más sobre tu consulta..." 
                          rows={5}
                          className="pl-10 border-slate-200 focus:border-sky-500 focus:ring-sky-500 resize-none"
                        />
                      </div>
                      {errors.message && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button 
                      onClick={(e) => handleSubmit(e as any)}
                      className="w-full h-12 bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-sky-500/30 transition-all hover:shadow-xl hover:shadow-sky-500/40" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Enviar mensaje
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="animate-fade-in-up stagger-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-linear-to-br from-blue-100 to-sky-100 rounded-xl">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Información de contacto</h2>
                  <p className="text-slate-600">Múltiples formas de comunicarte</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-500 to-blue-500"></div>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-linear-to-br from-sky-100 to-blue-100 p-4 rounded-xl group-hover:scale-110 transition-transform">
                        <MapPin className="h-7 w-7 text-sky-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 text-slate-900">Dirección</h3>
                        <p className="text-slate-600 font-medium">Av. Principal 123</p>
                        <p className="text-slate-600">Ciudad, País</p>
                        <Button variant="link" className="p-0 h-auto mt-2 text-sky-600 font-semibold">
                          Ver en Google Maps →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-sky-500"></div>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-linear-to-br from-blue-100 to-sky-100 p-4 rounded-xl group-hover:scale-110 transition-transform">
                        <Phone className="h-7 w-7 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 text-slate-900">Teléfono</h3>
                        <p className="text-slate-600 font-medium text-lg">+1 234 567 8900</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <p className="text-sm text-slate-500">Lun - Vie: 9:00 - 19:00</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-500 to-blue-500"></div>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-linear-to-br from-sky-100 to-blue-100 p-4 rounded-xl group-hover:scale-110 transition-transform">
                        <Mail className="h-7 w-7 text-sky-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 text-slate-900">Email</h3>
                        <p className="text-slate-600 font-medium">info@dentalite.com</p>
                        <p className="text-slate-600">citas@dentalite.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-sky-500"></div>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-linear-to-br from-blue-100 to-sky-100 p-4 rounded-xl group-hover:scale-110 transition-transform">
                        <Clock className="h-7 w-7 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 text-slate-900">Horario de atención</h3>
                        <div className="space-y-2 text-slate-600">
                          <div className="flex justify-between items-center">
                            <span>Lunes - Viernes:</span>
                            <span className="font-semibold">9:00 - 19:00</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Sábado:</span>
                            <span className="font-semibold">9:00 - 14:00</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Domingo:</span>
                            <span className="font-semibold text-red-600">Cerrado</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Map Placeholder - Mejorado */}
              <Card className="border-0 shadow-2xl shadow-slate-200/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-linear-to-br from-slate-200 to-slate-300 h-72 relative flex items-center justify-center overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-linear-to-br from-sky-400/20 to-blue-400/20"></div>
                    <div className="relative z-10 text-center">
                      <MapPin className="h-16 w-16 text-slate-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <p className="text-slate-600 font-semibold text-lg">Mapa de ubicación</p>
                      <p className="text-slate-500 text-sm mt-1">Click para ver en Google Maps</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Mejorado */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 rounded-full border border-sky-200 mb-6">
                <Sparkles className="h-4 w-4 text-sky-600" />
                <span className="text-sm font-medium text-sky-700">Respuestas rápidas</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">Preguntas frecuentes</h2>
              <p className="text-lg text-slate-600">Todo lo que necesitas saber sobre nuestros servicios</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card 
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <CardContent className="p-0">
                    <div className="p-6 flex items-center justify-between">
                      <h3 className="font-bold text-lg text-slate-900 pr-4">{faq.question}</h3>
                      <ChevronDown 
                        className={`h-6 w-6 text-sky-600 shrink-0 transition-transform duration-300 ${
                          expandedFaq === index ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedFaq === index ? 'max-h-40' : 'max-h-0'
                      }`}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="border-t border-slate-200 pt-4">
                          <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-8 bg-linear-to-br from-sky-50 to-blue-50 rounded-2xl border-2 border-sky-100 text-center">
              <h3 className="text-2xl font-bold mb-3 text-slate-900">¿No encontraste tu respuesta?</h3>
              <p className="text-slate-600 mb-6">Contáctanos directamente y te ayudaremos con gusto</p>
              <Button className="bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-sky-500/30 h-12 px-8">
                <MessageSquare className="mr-2 h-5 w-5" />
                Contactar ahora
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}