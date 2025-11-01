import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Calendar, Clock, DollarSign, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image" 

const services = [
  {
    name: "Limpieza dental profesional",
    description: "Eliminación de placa y sarro para mantener tus dientes y encías saludables.",
    price: "Desde $50",
    duration: "45 min",
    benefits: ["Prevención de caries", "Eliminación de manchas", "Encías más saludables", "Aliento fresco"],
    image: "/images/services/limpieza.webp",
    color: "from-blue-500 to-cyan-500",
    badge: "Preventivo"
  },
  {
    name: "Ortodoncia",
    description: "Corrección de la posición de los dientes con brackets o alineadores invisibles.",
    price: "Desde $1,200",
    duration: "12-24 meses",
    benefits: [
      "Sonrisa perfectamente alineada",
      "Mejora la mordida",
      "Opciones invisibles disponibles",
      "Plan de pago flexible",
    ],
    image: "/images/services/ortodoncia.webp",
    color: "from-purple-500 to-pink-500",
    badge: "Popular"
  },
  {
    name: "Blanqueamiento dental",
    description: "Tratamiento profesional para dientes más blancos y brillantes.",
    price: "Desde $200",
    duration: "1 hora",
    benefits: ["Resultados inmediatos", "Hasta 8 tonos más blanco", "Procedimiento seguro", "Larga duración"],
    image: "/images/services/blanqueamiento.webp",
    color: "from-yellow-400 to-orange-500",
    badge: "Estético"
  },
  {
    name: "Implantes dentales",
    description: "Reemplazo permanente de dientes perdidos con aspecto y función natural.",
    price: "Desde $800",
    duration: "3-6 meses",
    benefits: ["Solución permanente", "Aspecto natural", "Restaura la función completa", "Previene pérdida ósea"],
    image: "/images/services/implantes.webp",
    color: "from-emerald-500 to-teal-500",
    badge: "Avanzado"
  },
  {
    name: "Endodoncia",
    description: "Tratamiento de conducto para salvar dientes dañados o infectados.",
    price: "Desde $300",
    duration: "1-2 horas",
    benefits: ["Salva el diente natural", "Elimina el dolor", "Procedimiento indoloro", "Alta tasa de éxito"],
    image: "/images/services/endodoncia.webp",
    color: "from-red-500 to-rose-500",
    badge: "Terapéutico"
  },
  {
    name: "Odontopediatría",
    description: "Cuidado dental especializado para niños en un ambiente amigable.",
    price: "Desde $40",
    duration: "30-45 min",
    benefits: ["Ambiente amigable para niños", "Prevención temprana", "Educación dental", "Experiencia positiva"],
    image: "/images/services/odontopediatria.webp",
    color: "from-pink-400 to-purple-400",
    badge: "Infantil"
  },
  {
    name: "Carillas dentales",
    description: "Láminas delgadas que mejoran la apariencia de tus dientes.",
    price: "Desde $400",
    duration: "2 sesiones",
    benefits: ["Sonrisa de Hollywood", "Corrige imperfecciones", "Resultados duraderos", "Mínimamente invasivo"],
    image: "/images/services/carillas.webp",
    color: "from-indigo-500 to-blue-500",
    badge: "Premium"
  },
  {
    name: "Periodoncia",
    description: "Tratamiento de enfermedades de las encías y tejidos de soporte.",
    price: "Desde $150",
    duration: "1-2 horas",
    benefits: ["Encías saludables", "Previene pérdida dental", "Reduce inflamación", "Mejora salud general"],
    image: "/images/services/periodoncia.webp",
    color: "from-cyan-500 to-blue-500",
    badge: "Especializado"
  },
]

const galleryImages = [
  { src: "/images/blanqueamiento.jpg", title: "Blanqueamiento" },
  { src: "/images/ortodencia.jpg", title: "Ortodoncia" },
  { src: "/images/implantes.jpg", title: "Implantes" },
  { src: "/images/carillas.jpg", title: "Carillas" },
  { src: "/images/alineacion.jpg", title: "Alineación" },
  { src: "/images/transformación.png", title: "Transformación" },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-blue-50 via-white to-cyan-50 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.1),transparent_60%)]" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s'}} />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s', animationDelay: '1s'}} />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-semibold">
              Tratamientos Dentales
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-slate-900 text-balance">
              Nuestros <span className="bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">servicios</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 text-pretty leading-relaxed">
              Ofrecemos una amplia gama de tratamientos dentales con tecnología de vanguardia y profesionales
              certificados
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-cyan-50 rounded-full text-cyan-600 text-sm font-semibold">
              Catálogo Completo
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
              Servicios especializados
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Cada tratamiento diseñado para tu bienestar
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={service.name} 
                className={`overflow-hidden border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up stagger-${(index % 4) + 1} group`}
              >
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-2 relative h-64 md:h-full overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10" />
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`inline-block px-3 py-1 bg-linear-to-r ${service.color} text-white text-xs font-bold rounded-full shadow-lg`}>
                        {service.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{service.name}</h3>
                    </div>
                  </div>
                  
                  <CardContent className="md:col-span-3 p-6 flex flex-col">
                    <p className="text-slate-600 mb-4 leading-relaxed grow">{service.description}</p>

                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center gap-2 bg-linear-to-br from-blue-50 to-cyan-50 px-4 py-2 rounded-xl border border-blue-100">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        <span className="font-bold text-blue-700 text-sm">{service.price}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-linear-to-br from-purple-50 to-pink-50 px-4 py-2 rounded-xl border border-purple-100">
                        <Clock className="h-4 w-4 text-purple-600" />
                        <span className="text-purple-700 font-medium text-sm">{service.duration}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {service.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-sm text-slate-700">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      asChild 
                      className={`w-full bg-linear-to-r ${service.color} text-white hover:shadow-xl hover:scale-105 transition-all duration-300 border-0`}
                    >
                      <Link href="/agendar">
                        <Calendar className="mr-2 h-4 w-4" />
                        Agendar cita
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-16 lg:py-24 bg-linear-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-20" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-yellow-50 rounded-full text-yellow-700 text-sm font-semibold items-center gap-2 mx-auto w-fit">
              <Sparkles className="h-4 w-4" />
              Galería de Resultados
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
              Resultados que hablan por sí solos
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
              Mira las transformaciones de nuestros pacientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <Card 
                key={index} 
                className={`overflow-hidden border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up stagger-${(index % 3) + 1} group`}
              >
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-t from-blue-900/80 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-lg drop-shadow-lg">{image.title}</h3>
                    <div className="w-12 h-1 bg-cyan-400 mt-2" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="hover:bg-slate-50 hover:scale-105 transition-all duration-300 border-2"
            >
              <Link href="/galeria">Ver más resultados</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-cyan-600 to-blue-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}} />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}} />

        <div className="container mx-auto px-4 text-center relative">
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
              Consulta Gratuita
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white text-balance">
              ¿Listo para comenzar tu tratamiento?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
              Agenda una consulta gratuita y descubre cuál es el mejor tratamiento para ti
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                variant="secondary" 
                className="hover:scale-105 transition-all duration-300 shadow-2xl bg-white text-blue-600 hover:bg-slate-50 h-14 px-8 text-base"
              >
                <Link href="/agendar">
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar consulta gratuita
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="hover:scale-105 transition-all duration-300 border-2 border-white text-white hover:bg-white/10 h-14 px-8 text-base"
              >
                <Link href="/contacto">Más información</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}