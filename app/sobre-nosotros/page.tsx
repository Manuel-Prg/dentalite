import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Heart, MapPin, Users } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-50 to-blue-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900 text-balance">Sobre Dentalite</h1>
            <p className="text-lg lg:text-xl text-slate-600 text-pretty leading-relaxed">
              Más de 10 años cuidando sonrisas y transformando vidas con atención dental de calidad
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="img/about-image.png" alt="Clínica Dentalite" className="rounded-2xl shadow-xl w-full" />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900">Nuestra historia</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Dentalite nació con la visión de revolucionar la atención dental, combinando tecnología de vanguardia
                con un trato humano y personalizado. Desde nuestros inicios, nos hemos comprometido a ofrecer servicios
                de la más alta calidad.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Hoy, somos una clínica moderna que ha ayudado a miles de pacientes a recuperar su confianza a través de
                una sonrisa saludable. Nuestro equipo de profesionales certificados trabaja cada día para superar las
                expectativas de nuestros pacientes.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-sky-50 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-sky-600 mb-1">10+</p>
                  <p className="text-sm text-slate-600">Años de experiencia</p>
                </div>
                <div className="bg-sky-50 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-sky-600 mb-1">5000+</p>
                  <p className="text-sm text-slate-600">Pacientes atendidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">Nuestros valores</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
              Los principios que guían nuestro trabajo diario
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Empatía</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Entendemos tus necesidades y te acompañamos en cada paso
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Excelencia</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Buscamos la perfección en cada tratamiento que realizamos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Compromiso</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Tu salud dental es nuestra prioridad número uno
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Innovación</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Adoptamos las últimas tecnologías para mejores resultados
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">Nuestro equipo</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
              Profesionales certificados dedicados a tu salud dental
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Juan Pérez",
                role: "Director y Odontólogo General",
                image: "professional male dentist in white coat",
              },
              {
                name: "Dra. María López",
                role: "Ortodoncista",
                image: "professional female dentist in white coat",
              },
              {
                name: "Dr. Carlos Ruiz",
                role: "Implantólogo",
                image: "professional male dentist with glasses",
              },
            ].map((member) => (
              <Card key={member.name} className="overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img
                    src={`/.jpg?height=300&width=300&query=${member.image}`}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1 text-slate-900">{member.name}</h3>
                  <p className="text-sky-600 font-medium">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">Nuestra ubicación</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
              Visítanos en nuestras modernas instalaciones
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-200 h-96 rounded-2xl flex items-center justify-center">
              <p className="text-slate-500">Mapa de ubicación</p>
            </div>
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-slate-900">Información de contacto</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-sky-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-slate-900">Dirección</p>
                        <p className="text-slate-600">Av. Principal 123, Ciudad, País</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-sky-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-slate-900">Horario de atención</p>
                        <p className="text-slate-600">Lunes a Viernes: 9:00 - 19:00</p>
                        <p className="text-slate-600">Sábado: 9:00 - 14:00</p>
                      </div>
                    </div>
                  </div>
                  <Button asChild className="w-full mt-6 bg-sky-600 hover:bg-sky-700">
                    <Link href="/agendar">Agendar cita</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
