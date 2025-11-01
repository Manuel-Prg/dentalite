import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Shield, Star, Users, Award } from "lucide-react"
import Image from "next/image" 

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-cyan-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_60%)] animate-pulse" style={{animationDuration: '4s'}} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.15),transparent_60%)] animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}} />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-bounce" style={{animationDuration: '6s'}} />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-bounce" style={{animationDuration: '7s', animationDelay: '2s'}} />

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-semibold animate-bounce" style={{animationDuration: '2s'}}>
                 Bienvenido a Dentalite
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-balance mb-6 text-slate-900 leading-tight">
                Tu sonrisa <span className="bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">perfecta</span> comienza aquí
              </h1>
              <p className="text-xl lg:text-2xl text-slate-600 mb-8 text-pretty leading-relaxed">
                En Dentalite, combinamos tecnología de vanguardia con atención personalizada para brindarte la mejor
                experiencia dental.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-linear-to-r from-blue-600 to-cyan-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <Link href="/agendar">
                    <Calendar className="mr-2 h-5 w-5" />
                    Agenda tu cita
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="hover:bg-slate-50 hover:scale-105 transition-all duration-300 border-2">
                  <Link href="/servicios">Ver servicios</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-8 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white" />
                    <div className="w-8 h-8 rounded-full bg-cyan-200 border-2 border-white" />
                    <div className="w-8 h-8 rounded-full bg-sky-200 border-2 border-white" />
                  </div>
                  <span className="font-medium">+5,000 pacientes felices</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 font-medium">5.0 rating</span>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[550px] animate-fade-in stagger-2">
              <div className="absolute -inset-4 bg-linear-to-br from-blue-400/30 to-cyan-400/30 rounded-3xl blur-2xl animate-pulse" style={{animationDuration: '3s'}} />
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl" />
              <img
                src="/modern-dental-clinic-reception-with-friendly-staff.jpg"
                alt="Clínica Dentalite"
                className="relative rounded-3xl shadow-2xl object-cover w-full h-full hover:scale-105 transition-transform duration-500 border-4 border-white/50"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 animate-bounce" style={{animationDuration: '3s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Tecnología</div>
                    <div className="text-xs text-slate-600">De vanguardia</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-linear-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-semibold">
              Ventajas Dentalite
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">¿Por qué elegir Dentalite?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
              Nos comprometemos a ofrecer atención dental de calidad con tecnología moderna
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Atención personalizada",
                description:
                  "Cada paciente es único. Creamos planes de tratamiento adaptados a tus necesidades específicas.",
                delay: "stagger-1",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Award,
                title: "Profesionales certificados",
                description: "Nuestro equipo cuenta con años de experiencia y certificaciones internacionales.",
                delay: "stagger-2",
                color: "from-cyan-500 to-cyan-600",
              },
              {
                icon: Shield,
                title: "Tecnología avanzada",
                description: "Equipos de última generación para diagnósticos precisos y tratamientos efectivos.",
                delay: "stagger-3",
                color: "from-sky-500 to-sky-600",
              },
              {
                icon: Calendar,
                title: "Agenda fácil y rápida",
                description: "Sistema de citas en línea disponible 24/7. Recibe confirmación inmediata por WhatsApp.",
                delay: "stagger-4",
                color: "from-indigo-500 to-indigo-600",
              },
              {
                icon: Clock,
                title: "Horarios flexibles",
                description: "Abiertos de lunes a sábado con horarios extendidos para tu comodidad.",
                delay: "stagger-5",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: Star,
                title: "Pacientes satisfechos",
                description: "Miles de sonrisas transformadas y pacientes felices respaldan nuestro trabajo.",
                delay: "stagger-6",
                color: "from-pink-500 to-pink-600",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`border-0 bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up ${feature.delay} overflow-hidden group`}
              >
                <CardContent className="pt-6 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-50 to-cyan-50 rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className={`bg-linear-to-br ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 relative z-10">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed relative z-10">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-30" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-cyan-50 rounded-full text-cyan-600 text-sm font-semibold">
              Servicios
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">Nuestros servicios</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
              Ofrecemos una amplia gama de tratamientos dentales para toda la familia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { name: "Limpieza dental", image: "/images/limpieza_dental.png" }, 
              { name: "Ortodoncia", image: "/images/ortodencia.jpg" },
              { name: "Blanqueamiento", image: "/images/blanqueamiento.jpg" },
              { name: "Implantes", image: "/images/implantes.jpg" },
            ].map((service, index) => (
              <Card
                key={service.name}
                className={`overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up stagger-${index + 1} group border-0`}
              >
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-linear-to-t from-blue-900/80 via-blue-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10" />
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="font-bold text-xl text-white drop-shadow-lg">{service.name}</h3>
                    <div className="w-12 h-1 bg-cyan-400 mt-2 group-hover:w-20 transition-all duration-300" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="hover:bg-slate-50 hover:scale-105 transition-all duration-300 border-2">
              <Link href="/servicios">Ver todos los servicios</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-linear-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-yellow-50 rounded-full text-yellow-700 text-sm font-semibold">
              Testimonios
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">Lo que dicen nuestros pacientes</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                text: "Excelente atención y profesionalismo. El Dr. me explicó todo el proceso y me sentí muy cómoda durante el tratamiento.",
                rating: 5,
                role: "Paciente desde 2022"
              },
              {
                name: "Carlos Ramírez",
                text: "La mejor clínica dental que he visitado. Instalaciones modernas y personal muy amable. Totalmente recomendado.",
                rating: 5,
                role: "Paciente desde 2021"
              },
              {
                name: "Ana Martínez",
                text: "Agradezco la paciencia y dedicación del equipo. Mi sonrisa ha cambiado completamente y me siento más segura.",
                rating: 5,
                role: "Paciente desde 2023"
              },
            ].map((testimonial, index) => (
              <Card key={index} className={`hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up stagger-${index + 1} border-0 bg-white relative overflow-hidden group`}>
                <CardContent className="pt-6">
                  <div className="absolute top-0 left-0 w-24 h-24 bg-linear-to-br from-yellow-100 to-orange-100 rounded-br-full opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="flex mb-4 relative z-10">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed italic text-lg relative z-10">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-cyan-600 to-blue-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}} />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}} />

        <div className="relative container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white text-balance">
              ¿Listo para transformar tu sonrisa?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
              Agenda tu cita hoy y descubre por qué somos la clínica dental preferida
            </p>
            <Button asChild size="lg" variant="secondary" className="hover:scale-105 transition-all duration-300 shadow-2xl bg-white text-blue-600 hover:bg-slate-50">
              <Link href="/agendar">
                <Calendar className="mr-2 h-5 w-5" />
                Agendar cita ahora
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}