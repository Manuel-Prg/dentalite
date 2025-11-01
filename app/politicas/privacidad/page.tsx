import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Eye, Users, FileText, Mail, Phone } from "lucide-react"

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: FileText,
      title: "1. Información que recopilamos",
      content: "En Dentalite, recopilamos información personal que usted nos proporciona directamente cuando agenda una cita, crea una cuenta o se comunica con nosotros.",
      items: [
        "Nombre completo",
        "Correo electrónico",
        "Número de teléfono",
        "Dirección",
        "Información médica y dental relevante"
      ]
    },
    {
      icon: Users,
      title: "2. Cómo usamos su información",
      content: "Utilizamos la información recopilada para:",
      items: [
        "Proporcionar y mejorar nuestros servicios dentales",
        "Gestionar sus citas y recordatorios",
        "Comunicarnos con usted sobre su tratamiento",
        "Enviar información relevante sobre salud dental",
        "Cumplir con requisitos legales y regulatorios"
      ]
    },
    {
      icon: Lock,
      title: "3. Protección de datos",
      content: "Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, pérdida o alteración. Todos los datos médicos se almacenan de forma segura y encriptada.",
      items: []
    },
    {
      icon: Shield,
      title: "4. Compartir información",
      content: "No vendemos ni compartimos su información personal con terceros para fines de marketing. Solo compartimos información cuando es necesario para proporcionar nuestros servicios o cuando lo requiere la ley.",
      items: []
    },
    {
      icon: Eye,
      title: "5. Sus derechos",
      content: "Usted tiene derecho a:",
      items: [
        "Acceder a su información personal",
        "Solicitar correcciones de datos inexactos",
        "Solicitar la eliminación de sus datos",
        "Oponerse al procesamiento de sus datos",
        "Retirar su consentimiento en cualquier momento"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-sky-600 via-blue-600 to-blue-700 py-16 lg:py-24">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 shadow-2xl">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              Política de privacidad
            </h1>
            <p className="text-xl text-blue-100 mb-4">
              Su confianza y privacidad son nuestra prioridad
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
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
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
                              <div className="shrink-0 w-1.5 h-1.5 bg-sky-500 rounded-full mt-2"></div>
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
            <Card className="overflow-hidden border-slate-200/50 shadow-lg bg-linear-to-br from-sky-50 to-blue-50">
              <CardContent className="p-8 lg:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      6. Contacto
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                      Si tiene preguntas sobre esta política de privacidad o desea ejercer sus derechos, contáctenos:
                    </p>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200/50 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <p className="font-semibold text-slate-900">privacidad@dentalite.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200/50 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-blue-600" />
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

      {/* Trust Badges */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Lock, label: "Datos encriptados" },
                { icon: Shield, label: "Protección total" },
                { icon: Eye, label: "Transparencia" },
                { icon: Users, label: "Privacidad garantizada" }
              ].map((badge, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-linear-to-br from-sky-100 to-blue-100 rounded-2xl flex items-center justify-center">
                    <badge.icon className="h-8 w-8 text-sky-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">{badge.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}