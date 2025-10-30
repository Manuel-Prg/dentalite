import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Shield, Star, Users, Award } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-sky-50 to-cyan-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.1),transparent_50%)]" />

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance mb-6 text-slate-900">
                Tu sonrisa perfecta comienza aquí
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 mb-8 text-pretty leading-relaxed">
                En Dentalite, combinamos tecnología de vanguardia con atención personalizada para brindarte la mejor
                experiencia dental.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-primary text-white hover:opacity-90 transition-opacity shadow-lg hover-lift"
                >
                  <Link href="/agendar">
                    <Calendar className="mr-2 h-5 w-5" />
                    Agenda tu cita
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="hover-lift bg-transparent">
                  <Link href="/servicios">Ver servicios</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] animate-fade-in stagger-2">
              <div className="absolute inset-0 bg-linear-to-br from-blue-400/20 to-cyan-400/20 rounded-2xl blur-3xl" />
              <img
                src="/modern-dental-clinic-reception-with-friendly-staff.jpg"
                alt="Clínica Dentalite"
                className="relative rounded-2xl shadow-2xl object-cover w-full h-full hover-scale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">¿Por qué elegir Dentalite?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
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
              },
              {
                icon: Award,
                title: "Profesionales certificados",
                description: "Nuestro equipo cuenta con años de experiencia y certificaciones internacionales.",
                delay: "stagger-2",
              },
              {
                icon: Shield,
                title: "Tecnología avanzada",
                description: "Equipos de última generación para diagnósticos precisos y tratamientos efectivos.",
                delay: "stagger-3",
              },
              {
                icon: Calendar,
                title: "Agenda fácil y rápida",
                description: "Sistema de citas en línea disponible 24/7. Recibe confirmación inmediata por WhatsApp.",
                delay: "stagger-4",
              },
              {
                icon: Clock,
                title: "Horarios flexibles",
                description: "Abiertos de lunes a sábado con horarios extendidos para tu comodidad.",
                delay: "stagger-5",
              },
              {
                icon: Star,
                title: "Pacientes satisfechos",
                description: "Miles de sonrisas transformadas y pacientes felices respaldan nuestro trabajo.",
                delay: "stagger-6",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`border-2 hover:border-primary/50 transition-all hover-lift animate-fade-in-up ${feature.delay}`}
              >
                <CardContent className="pt-6">
                  <div className="bg-gradient-secondary w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-md">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 lg:py-24 bg-linear-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">Nuestros servicios</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
              Ofrecemos una amplia gama de tratamientos dentales para toda la familia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { name: "Limpieza dental", image: "dental cleaning procedure" },
              { name: "Ortodoncia", image: "orthodontic braces treatment" },
              { name: "Blanqueamiento", image: "teeth whitening procedure" },
              { name: "Implantes", image: "dental implant procedure" },
            ].map((service, index) => (
              <Card
                key={service.name}
                className={`overflow-hidden hover-lift animate-fade-in-up stagger-${index + 1} group`}
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <img
                    src={`/.jpg?height=200&width=300&query=${service.image}`}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-slate-900">{service.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="hover-lift bg-transparent">
              <Link href="/servicios">Ver todos los servicios</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">Lo que dicen nuestros pacientes</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                text: "Excelente atención y profesionalismo. El Dr. me explicó todo el proceso y me sentí muy cómoda durante el tratamiento.",
                rating: 5,
              },
              {
                name: "Carlos Ramírez",
                text: "La mejor clínica dental que he visitado. Instalaciones modernas y personal muy amable. Totalmente recomendado.",
                rating: 5,
              },
              {
                name: "Ana Martínez",
                text: "Agradezco la paciencia y dedicación del equipo. Mi sonrisa ha cambiado completamente y me siento más segura.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className={`hover-lift animate-fade-in-up stagger-${index + 1} shadow-md`}>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4 leading-relaxed italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />

        <div className="relative container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white text-balance">
              ¿Listo para transformar tu sonrisa?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto text-pretty">
              Agenda tu cita hoy y descubre por qué somos la clínica dental preferida
            </p>
            <Button asChild size="lg" variant="secondary" className="hover-lift shadow-xl">
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
