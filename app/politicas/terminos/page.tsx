import { Card, CardContent } from "@/components/ui/card"
import { FileText, Calendar, CreditCard, UserCheck, AlertCircle, Edit, Mail, Phone, CheckCircle } from "lucide-react"

export default function TermsPage() {
  const sections = [
    {
      icon: FileText,
      title: "1. Aceptación de términos",
      content: "Al acceder y utilizar los servicios de Dentalite, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.",
      items: []
    },
    {
      icon: CheckCircle,
      title: "2. Servicios ofrecidos",
      content: "Dentalite ofrece servicios de odontología general y especializada. Todos los tratamientos son realizados por profesionales certificados y con licencia vigente.",
      items: []
    },
    {
      icon: Calendar,
      title: "3. Citas y cancelaciones",
      content: "Políticas de citas:",
      items: [
        "Las citas deben ser agendadas con al menos 24 horas de anticipación",
        "Las cancelaciones deben realizarse con al menos 24 horas de anticipación",
        "Cancelaciones tardías o no presentarse pueden resultar en cargos",
        "Nos reservamos el derecho de reprogramar citas en caso de emergencias"
      ]
    },
    {
      icon: CreditCard,
      title: "4. Pagos y facturación",
      content: "Los pagos deben realizarse al momento del servicio a menos que se haya acordado un plan de pago. Aceptamos efectivo, tarjetas de crédito/débito y seguros dentales participantes.",
      items: []
    },
    {
      icon: UserCheck,
      title: "5. Responsabilidad del paciente",
      content: "Los pacientes son responsables de:",
      items: [
        "Proporcionar información médica completa y precisa",
        "Seguir las instrucciones de cuidado post-tratamiento",
        "Asistir a citas de seguimiento programadas",
        "Informar sobre cualquier cambio en su condición de salud"
      ]
    },
    {
      icon: AlertCircle,
      title: "6. Limitación de responsabilidad",
      content: "Dentalite no será responsable por resultados de tratamiento que estén fuera de nuestro control o que resulten del incumplimiento del paciente con las instrucciones de cuidado.",
      items: []
    },
    {
      icon: Edit,
      title: "7. Modificaciones",
      content: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en nuestro sitio web.",
      items: []
    }
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-sky-600 to-cyan-600 py-16 lg:py-24">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 shadow-2xl">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              Términos y condiciones
            </h1>
            <p className="text-xl text-blue-100 mb-4">
              Conozca nuestras políticas y compromisos con usted
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Última actualización: 15 de enero de 2025
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {sections.map((section, index) => (
              <Card key={index} className="overflow-hidden border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4 p-6 lg:p-8">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <section.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        {section.title}
                      </h2>
                      <p className="text-slate-600 leading-relaxed mb-4">
                        {section.content}
                      </p>
                      {section.items.length > 0 && (
                        <ul className="space-y-2">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                              <span className="text-slate-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Contact Section */}
            <Card className="overflow-hidden border-slate-200/50 shadow-lg bg-linear-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-8 lg:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      8. Contacto
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                      Para preguntas sobre estos términos, contáctenos:
                    </p>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200/50 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <p className="font-semibold text-slate-900">info@dentalite.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200/50 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Teléfono</p>
                      <p className="font-semibold text-slate-900">+1 234 567 8900</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Puntos clave</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  icon: Calendar, 
                  title: "Cancelaciones", 
                  desc: "24 horas de anticipación",
                  color: "from-blue-500 to-blue-600"
                },
                { 
                  icon: CreditCard, 
                  title: "Pagos flexibles", 
                  desc: "Múltiples métodos aceptados",
                  color: "from-cyan-500 to-cyan-600"
                },
                { 
                  icon: CheckCircle, 
                  title: "Profesionales", 
                  desc: "Certificados y licenciados",
                  color: "from-sky-500 to-sky-600"
                }
              ].map((item, index) => (
                <Card key={index} className="border-slate-200/50 hover:shadow-lg transition-all group">
                  <CardContent className="pt-6 text-center">
                    <div className={`w-14 h-14 mx-auto mb-4 bg-linear-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-7 w-7 text-white" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Banner */}
      <section className="py-8 bg-linear-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white text-lg">
              ¿Tiene alguna pregunta sobre nuestros términos?{" "}
              <a href="#contacto" className="font-bold underline hover:text-blue-100 transition-colors">
                Contáctenos
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}