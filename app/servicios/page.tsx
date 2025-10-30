import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

const services = [
  {
    name: "Limpieza dental profesional",
    description: "Eliminación de placa y sarro para mantener tus dientes y encías saludables.",
    price: "Desde $50",
    duration: "45 min",
    benefits: ["Prevención de caries", "Eliminación de manchas", "Encías más saludables", "Aliento fresco"],
    image: "dental cleaning procedure with tools",
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
    image: "orthodontic braces on teeth",
  },
  {
    name: "Blanqueamiento dental",
    description: "Tratamiento profesional para dientes más blancos y brillantes.",
    price: "Desde $200",
    duration: "1 hora",
    benefits: ["Resultados inmediatos", "Hasta 8 tonos más blanco", "Procedimiento seguro", "Larga duración"],
    image: "teeth whitening procedure",
  },
  {
    name: "Implantes dentales",
    description: "Reemplazo permanente de dientes perdidos con aspecto y función natural.",
    price: "Desde $800",
    duration: "3-6 meses",
    benefits: ["Solución permanente", "Aspecto natural", "Restaura la función completa", "Previene pérdida ósea"],
    image: "dental implant procedure",
  },
  {
    name: "Endodoncia",
    description: "Tratamiento de conducto para salvar dientes dañados o infectados.",
    price: "Desde $300",
    duration: "1-2 horas",
    benefits: ["Salva el diente natural", "Elimina el dolor", "Procedimiento indoloro", "Alta tasa de éxito"],
    image: "root canal treatment procedure",
  },
  {
    name: "Odontopediatría",
    description: "Cuidado dental especializado para niños en un ambiente amigable.",
    price: "Desde $40",
    duration: "30-45 min",
    benefits: ["Ambiente amigable para niños", "Prevención temprana", "Educación dental", "Experiencia positiva"],
    image: "pediatric dentist with child patient",
  },
  {
    name: "Carillas dentales",
    description: "Láminas delgadas que mejoran la apariencia de tus dientes.",
    price: "Desde $400",
    duration: "2 sesiones",
    benefits: ["Sonrisa de Hollywood", "Corrige imperfecciones", "Resultados duraderos", "Mínimamente invasivo"],
    image: "dental veneers application",
  },
  {
    name: "Periodoncia",
    description: "Tratamiento de enfermedades de las encías y tejidos de soporte.",
    price: "Desde $150",
    duration: "1-2 horas",
    benefits: ["Encías saludables", "Previene pérdida dental", "Reduce inflamación", "Mejora salud general"],
    image: "periodontal treatment procedure",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-50 to-blue-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900 text-balance">Nuestros servicios</h1>
            <p className="text-lg lg:text-xl text-slate-600 text-pretty leading-relaxed">
              Ofrecemos una amplia gama de tratamientos dentales con tecnología de vanguardia y profesionales
              certificados
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="md:col-span-2 h-64 md:h-auto">
                    <img
                      src={`/.jpg?height=400&width=300&query=${service.image}`}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="md:col-span-3 p-6">
                    <h3 className="text-2xl font-bold mb-2 text-slate-900">{service.name}</h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">{service.description}</p>

                    <div className="flex gap-4 mb-4 text-sm">
                      <div className="bg-sky-50 px-3 py-1 rounded-full">
                        <span className="font-semibold text-sky-700">{service.price}</span>
                      </div>
                      <div className="bg-slate-100 px-3 py-1 rounded-full">
                        <span className="text-slate-700">{service.duration}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {service.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-sky-600 flex-shrink-0" />
                          <span className="text-sm text-slate-600">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Button asChild className="w-full bg-sky-600 hover:bg-sky-700">
                      <Link href="/agendar">Agendar cita</Link>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">Resultados que hablan por sí solos</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
              Mira las transformaciones de nuestros pacientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "teeth whitening before and after comparison",
              "orthodontic treatment before and after",
              "dental implant before and after result",
              "dental veneers before and after smile",
              "teeth alignment before and after braces",
              "smile makeover before and after transformation",
            ].map((query, index) => (
              <Card key={index} className="overflow-hidden">
                <img
                  src={`/.jpg?height=300&width=400&query=${query}`}
                  alt={`Resultado ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-sky-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white text-balance">
            ¿Listo para comenzar tu tratamiento?
          </h2>
          <p className="text-lg text-sky-100 mb-8 max-w-2xl mx-auto text-pretty">
            Agenda una consulta gratuita y descubre cuál es el mejor tratamiento para ti
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/agendar">Agendar consulta gratuita</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
