import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Clock, Search, User, Calendar, BookOpen, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    title: "5 consejos para mantener tus dientes blancos",
    excerpt: "Descubre los mejores hábitos y productos para mantener una sonrisa brillante y saludable todos los días.",
    category: "Cuidado dental",
    author: "Dr. Juan Pérez",
    date: "2025-01-15",
    readTime: "5 min",
    image: "/images/blog/5-tips-whiter-teeth.webp",
    featured: true,
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
    image: "/images/blog/revision-dental.webp",
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
    image: "/images/blog/ortodoncia-invisible.jpg",
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
    image: "/images/blog/dientes-ninos.webp",
  },
  {
    id: 5,
    title: "Implantes dentales: Recupera tu sonrisa completa",
    excerpt: "Todo sobre el proceso de implantes dentales, desde la consulta inicial hasta la recuperación completa.",
    category: "Implantes",
    author: "Dr. Juan Pérez",
    date: "2024-12-20",
    readTime: "8 min",
    image: "/images/blog/implantes-dentales.webp",
  },
  {
    id: 6,
    title: "Alimentos que fortalecen tus dientes",
    excerpt: "Descubre qué alimentos incluir en tu dieta para tener dientes más fuertes y encías más saludables.",
    category: "Nutrición",
    author: "Dr. Carlos Ruiz",
    date: "2024-12-15",
    readTime: "5 min",
    image: "/images/blog/alimentos-saludables.webp",
  },
]

const categories = [
  { name: "Todos", color: "from-blue-500 to-cyan-500" },
  { name: "Cuidado dental", color: "from-green-500 to-emerald-500" },
  { name: "Prevención", color: "from-purple-500 to-pink-500" },
  { name: "Ortodoncia", color: "from-orange-500 to-red-500" },
  { name: "Odontopediatría", color: "from-pink-500 to-rose-500" },
  { name: "Implantes", color: "from-cyan-500 to-blue-500" },
  { name: "Nutrición", color: "from-yellow-500 to-orange-500" },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-blue-50 via-white to-cyan-50 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.1),transparent_60%)]" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s'}} />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-semibold">
              <BookOpen className="h-4 w-4" />
              Centro de Conocimiento
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-slate-900 text-balance">
              Blog y <span className="bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">consejos dentales</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 text-pretty leading-relaxed mb-8">
              Información útil y consejos de expertos para mantener tu sonrisa saludable
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="Buscar artículos sobre salud dental..." 
                className="pl-12 h-14 bg-white border-2 border-slate-200 rounded-2xl text-base focus:border-blue-500 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <Button
                key={category.name}
                variant={category.name === "Todos" ? "default" : "outline"}
                className={`${
                  category.name === "Todos" 
                    ? `bg-linear-to-r ${category.color} text-white border-0 hover:shadow-lg` 
                    : "hover:scale-105"
                } transition-all duration-300 rounded-full`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 animate-fade-in-up">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-slate-900">Artículo destacado</h2>
          </div>
          <Card className="overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 animate-fade-in-up stagger-1 group">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-96 lg:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-blue-900/80 via-blue-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10" />
                <Image
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority 
                />
                <div className="absolute top-6 left-6 z-20">
                  <span className="inline-block px-4 py-2 bg-linear-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
                    ⭐ Destacado
                  </span>
                </div>
              </div>
              <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-linear-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {blogPosts[0].category}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{blogPosts[0].readTime}</span>
                  </div>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 text-balance leading-tight">{blogPosts[0].title}</h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed text-pretty">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{blogPosts[0].author}</p>
                      <p className="text-sm text-slate-600">
                        {new Date(blogPosts[0].date).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <Button asChild className="bg-linear-to-r from-blue-600 to-cyan-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <Link href={`/blog/${blogPosts[0].id}`}>Leer artículo</Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 lg:py-24 bg-linear-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-20" />
        
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center gap-2 mb-12 animate-fade-in-up">
            <Calendar className="h-6 w-6 text-cyan-600" />
            <h2 className="text-3xl font-bold text-slate-900">Últimos artículos</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <Card key={post.id} className={`overflow-hidden border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up stagger-${(index % 3) + 1} group`}>
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10" />
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="flex items-center gap-2 text-white text-xs font-medium">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-slate-900 text-balance hover:text-blue-600 transition-colors leading-tight group-hover:text-blue-600">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed text-sm line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{post.author}</p>
                        <p className="text-xs text-slate-500">{new Date(post.date).toLocaleDateString("es-ES")}</p>
                      </div>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                      <Link href={`/blog/${post.id}`}>Leer →</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-cyan-600 to-blue-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}} />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}} />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
              📧 Newsletter
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white text-balance">
              Recibe consejos dentales en tu email
            </h2>
            <p className="text-xl text-white/90 mb-8 text-pretty leading-relaxed">
              Suscríbete a nuestro boletín y recibe tips semanales para mantener tu sonrisa saludable
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Tu correo electrónico" 
                className="bg-white flex-1 h-14 rounded-xl border-0 shadow-lg text-base" 
              />
              <Button 
                variant="secondary" 
                size="lg" 
                className="h-14 px-8 bg-white text-blue-600 hover:bg-slate-50 font-bold rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
              >
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}