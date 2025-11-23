import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Heart, MapPin, Users, Phone, Mail, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-blue-50 via-white to-cyan-50 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.1),transparent_60%)]" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s'}} />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-semibold">
              Conócenos
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-slate-900 text-balance">
              Sobre <span className="bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Dentalite</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 text-pretty leading-relaxed">
              Más de 10 años cuidando sonrisas y transformando vidas con
              atención dental de calidad
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative animate-fade-in-up stagger-1">
              <div className="absolute -inset-4 bg-linear-to-br from-blue-400/20 to-cyan-400/20 rounded-3xl blur-2xl" />
              <Image
                src="/images/about-image.png"
                width={600}
                height={600}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="Clínica Dentalite"
                className="rounded-3xl shadow-2xl w-full relative hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Certificados</div>
                    <div className="text-xs text-slate-600">ISO 9001</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-fade-in-up stagger-2">
              <div className="inline-block mb-4 px-4 py-2 bg-cyan-50 rounded-full text-cyan-600 text-sm font-semibold">
                Nuestra Historia
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
                Una década transformando sonrisas
              </h2>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                Dentalite nació con la visión de revolucionar la atención
                dental, combinando tecnología de vanguardia con un trato humano
                y personalizado. Desde nuestros inicios, nos hemos comprometido
                a ofrecer servicios de la más alta calidad.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Hoy, somos una clínica moderna que ha ayudado a miles de
                pacientes a recuperar su confianza a través de una sonrisa
                saludable. Nuestro equipo de profesionales certificados trabaja
                cada día para superar las expectativas de nuestros pacientes.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <p className="text-4xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">10+</p>
                  <p className="text-sm text-slate-700 font-medium">Años de experiencia</p>
                </div>
                <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <p className="text-4xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">5000+</p>
                  <p className="text-sm text-slate-700 font-medium">Pacientes atendidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-linear-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-20" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-semibold">
              Valores
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
              Nuestros valores
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
              Los principios que guían nuestro trabajo diario
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: "Empatía",
                description: "Entendemos tus necesidades y te acompañamos en cada paso",
                color: "from-pink-500 to-rose-500",
                bgColor: "from-pink-50 to-rose-50"
              },
              {
                icon: Award,
                title: "Excelencia",
                description: "Buscamos la perfección en cada tratamiento que realizamos",
                color: "from-blue-500 to-blue-600",
                bgColor: "from-blue-50 to-cyan-50"
              },
              {
                icon: Users,
                title: "Compromiso",
                description: "Tu salud dental es nuestra prioridad número uno",
                color: "from-purple-500 to-purple-600",
                bgColor: "from-purple-50 to-pink-50"
              },
              {
                icon: Award,
                title: "Innovación",
                description: "Adoptamos las últimas tecnologías para mejores resultados",
                color: "from-cyan-500 to-teal-500",
                bgColor: "from-cyan-50 to-teal-50"
              }
            ].map((value, index) => (
              <Card key={index} className={`border-0 bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up stagger-${index + 1} overflow-hidden group`}>
                <CardContent className="pt-6 text-center relative">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${value.bgColor} rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity`} />
                  <div className={`bg-linear-to-br ${value.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 relative z-10">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed relative z-10">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-cyan-50 rounded-full text-cyan-600 text-sm font-semibold">
              Equipo
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
              Nuestro equipo
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
              Profesionales certificados dedicados a tu salud dental
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Juan Pérez",
                role: "Director y Odontólogo General",
                image: "/images/doctores/doctor_2.jpg",
                specialty: "Odontología General"
              },
              {
                name: "Dra. María López",
                role: "Ortodoncista",
                image: "/images/doctores/doctor_1.jpg",
                specialty: "Ortodoncia"
              },
              {
                name: "Dr. Carlos Ruiz",
                role: "Implantólogo",
                image: "/images/doctores/doctor_3.jpg",
                specialty: "Implantología"
              },
            ].map((member, index) => (
              <Card key={member.name} className={`overflow-hidden border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up stagger-${index + 1} group`}>
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-t from-blue-900/80 via-blue-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10" />
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="inline-block px-3 py-1 bg-cyan-500 rounded-full text-white text-xs font-semibold mb-2">
                      {member.specialty}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-cyan-200 font-medium">{member.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 lg:py-24 bg-linear-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-semibold">
              Ubicación
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
              Encuéntranos
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
              Visítanos en nuestras modernas instalaciones
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up stagger-1">
              <div className="absolute inset-0 bg-linear-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">Mapa de ubicación</p>
                  <p className="text-sm text-slate-400 mt-2">Google Maps integrado</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 animate-fade-in-up stagger-2">
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-2">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    Información de contacto
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 mb-1">Dirección</p>
                        <p className="text-slate-600">
                          Av. Principal 123, Ciudad, País
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-linear-to-br from-purple-50 to-pink-50 rounded-xl">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 mb-1">
                          Horario de atención
                        </p>
                        <p className="text-slate-600">
                          Lunes a Viernes: 9:00 - 19:00
                        </p>
                        <p className="text-slate-600">Sábado: 9:00 - 14:00</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-linear-to-br from-green-50 to-emerald-50 rounded-xl">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 mb-1">Teléfono</p>
                        <p className="text-slate-600">(123) 456-7890</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-linear-to-br from-orange-50 to-amber-50 rounded-xl">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                        <Mail className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 mb-1">Email</p>
                        <p className="text-slate-600">contacto@dentalite.com</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    asChild
                    className="w-full mt-6 bg-linear-to-r from-blue-600 to-cyan-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 h-12 text-base"
                  >
                    <Link href="/agendar">
                      <MapPin className="mr-2 h-5 w-5" />
                      Agendar cita
                    </Link>
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