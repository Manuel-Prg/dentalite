import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Clock, Search, User } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "5 consejos para mantener tus dientes blancos",
    excerpt: "Descubre los mejores hábitos y productos para mantener una sonrisa brillante y saludable todos los días.",
    category: "Cuidado dental",
    author: "Dr. Juan Pérez",
    date: "2025-01-15",
    readTime: "5 min",
    image: "bright white teeth smile close up",
  },
  {
    id: 2,
    title: "La importancia de las revisiones dentales regulares",
    excerpt:
      "Por qué deberías visitar al dentista cada 6 meses y cómo estas visitas pueden prevenir problemas mayores.",
    category: "Prevención",
    author: "Dra. María López",
    date: "2025-01-10",
    readTime: "4 min",
    image: "dentist examining patient teeth",
  },
  {
    id: 3,
    title: "Ortodoncia invisible: Todo lo que necesitas saber",
    excerpt:
      "Conoce las ventajas de los alineadores invisibles y cómo pueden transformar tu sonrisa sin brackets metálicos.",
    category: "Ortodoncia",
    author: "Dra. María López",
    date: "2025-01-05",
    readTime: "6 min",
    image: "invisible aligners orthodontic treatment",
  },
  {
    id: 4,
    title: "Cómo cuidar los dientes de tus hijos",
    excerpt:
      "Guía completa para padres sobre higiene dental infantil, desde los primeros dientes hasta la adolescencia.",
    category: "Odontopediatría",
    author: "Dr. Carlos Ruiz",
    date: "2024-12-28",
    readTime: "7 min",
    image: "child brushing teeth with parent",
  },
  {
    id: 5,
    title: "Implantes dentales: Recupera tu sonrisa completa",
    excerpt: "Todo sobre el proceso de implantes dentales, desde la consulta inicial hasta la recuperación completa.",
    category: "Implantes",
    author: "Dr. Juan Pérez",
    date: "2024-12-20",
    readTime: "8 min",
    image: "dental implant procedure illustration",
  },
  {
    id: 6,
    title: "Alimentos que fortalecen tus dientes",
    excerpt: "Descubre qué alimentos incluir en tu dieta para tener dientes más fuertes y encías más saludables.",
    category: "Nutrición",
    author: "Dr. Carlos Ruiz",
    date: "2024-12-15",
    readTime: "5 min",
    image: "healthy foods for teeth calcium rich",
  },
]

const categories = ["Todos", "Cuidado dental", "Prevención", "Ortodoncia", "Odontopediatría", "Implantes", "Nutrición"]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-50 to-blue-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900 text-balance">
              Blog y consejos dentales
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 text-pretty leading-relaxed mb-8">
              Información útil y consejos de expertos para mantener tu sonrisa saludable
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input placeholder="Buscar artículos..." className="pl-10 bg-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "Todos" ? "default" : "outline"}
                className={category === "Todos" ? "bg-sky-600 hover:bg-sky-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-slate-900">Artículo destacado</h2>
          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="h-64 lg:h-auto">
                <img
                  src={`/.jpg?height=500&width=600&query=${blogPosts[0].image}`}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-medium">
                    {blogPosts[0].category}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="h-4 w-4" />
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-slate-900 text-balance">{blogPosts[0].title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed text-pretty">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-sky-100 w-10 h-10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{blogPosts[0].author}</p>
                      <p className="text-sm text-slate-600">
                        {new Date(blogPosts[0].date).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <Button asChild className="bg-sky-600 hover:bg-sky-700">
                    <Link href={`/blog/${blogPosts[0].id}`}>Leer más</Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-slate-900">Últimos artículos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={`/.jpg?height=300&width=400&query=${post.image}`}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-sky-100 text-sky-700 px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 text-balance hover:text-sky-600 transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed text-sm">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <div className="bg-sky-100 w-8 h-8 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-sky-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{post.author}</p>
                        <p className="text-xs text-slate-600">{new Date(post.date).toLocaleDateString("es-ES")}</p>
                      </div>
                    </div>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/blog/${post.id}`}>Leer</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 lg:py-24 bg-sky-600">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white text-balance">
              Recibe consejos dentales en tu email
            </h2>
            <p className="text-lg text-sky-100 mb-8 text-pretty">
              Suscríbete a nuestro boletín y recibe tips semanales para mantener tu sonrisa saludable
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Tu correo electrónico" className="bg-white flex-1" />
              <Button variant="secondary" size="lg">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
