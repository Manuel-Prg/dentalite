import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"

// Mock data - in a real app, this would come from a database
const blogPost = {
  id: 1,
  title: "5 consejos para mantener tus dientes blancos",
  category: "Cuidado dental",
  author: "Dr. Juan Pérez",
  date: "2025-01-15",
  readTime: "5 min",
  image: "bright white teeth smile close up",
  content: `
    <p>Mantener una sonrisa blanca y brillante es el deseo de muchas personas. Aunque existen tratamientos profesionales de blanqueamiento, hay varios hábitos diarios que puedes adoptar para mantener tus dientes naturalmente blancos.</p>

    <h2>1. Cepillado adecuado después de cada comida</h2>
    <p>El cepillado regular es fundamental para prevenir manchas. Espera al menos 30 minutos después de comer antes de cepillarte, especialmente si has consumido alimentos ácidos. Usa una pasta dental con flúor y cepilla durante al menos dos minutos.</p>

    <h2>2. Limita el consumo de alimentos y bebidas que manchan</h2>
    <p>El café, té, vino tinto y algunos alimentos pueden manchar tus dientes con el tiempo. Si los consumes, intenta enjuagar tu boca con agua inmediatamente después o usa una pajita para las bebidas.</p>

    <h2>3. Usa hilo dental diariamente</h2>
    <p>El hilo dental elimina la placa y las partículas de comida entre los dientes donde el cepillo no puede llegar. Esto previene la acumulación de manchas y mantiene tus dientes más blancos.</p>

    <h2>4. Visita al dentista regularmente</h2>
    <p>Las limpiezas profesionales cada 6 meses eliminan el sarro y las manchas superficiales que no puedes eliminar en casa. Tu dentista también puede detectar problemas temprano.</p>

    <h2>5. Considera productos blanqueadores aprobados</h2>
    <p>Si deseas un blanqueamiento adicional, consulta con tu dentista sobre productos blanqueadores seguros y efectivos. Los tratamientos profesionales ofrecen los mejores resultados.</p>

    <h2>Conclusión</h2>
    <p>Mantener tus dientes blancos requiere consistencia y buenos hábitos de higiene dental. Combina estos consejos con visitas regulares al dentista para obtener los mejores resultados. Recuerda que una sonrisa saludable es más importante que una sonrisa perfectamente blanca.</p>
  `,
}

const relatedPosts = [
  {
    id: 2,
    title: "La importancia de las revisiones dentales regulares",
    category: "Prevención",
    image: "dentist examining patient teeth",
  },
  {
    id: 6,
    title: "Alimentos que fortalecen tus dientes",
    category: "Nutrición",
    image: "healthy foods for teeth calcium rich",
  },
]

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back Button */}
      <section className="bg-white border-b border-slate-200 py-4">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al blog
            </Link>
          </Button>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-medium">
              {blogPost.category}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mt-6 mb-6 text-slate-900 text-balance">{blogPost.title}</h1>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-sky-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{blogPost.author}</p>
                  <p className="text-sm text-slate-600">Odontólogo especialista</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    {new Date(blogPost.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{blogPost.readTime} de lectura</span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="ml-auto bg-transparent">
                <Share2 className="mr-2 h-4 w-4" />
                Compartir
              </Button>
            </div>

            <div className="rounded-2xl overflow-hidden mb-12">
              <img
                src={`/.jpg?height=600&width=1200&query=${blogPost.image}`}
                alt={blogPost.title}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-12 lg:pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-4"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />

            {/* CTA Card */}
            <Card className="mt-12 bg-sky-50 border-sky-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 text-slate-900">¿Necesitas una consulta profesional?</h3>
                <p className="text-slate-600 mb-6 text-pretty">
                  Nuestro equipo de expertos está listo para ayudarte a lograr la sonrisa que siempre has deseado
                </p>
                <Button asChild size="lg" className="bg-sky-600 hover:bg-sky-700">
                  <Link href="/agendar">Agendar cita</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-slate-900">Artículos relacionados</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={`/.jpg?height=300&width=400&query=${post.image}`}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <span className="bg-sky-100 text-sky-700 px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold mt-3 mb-4 text-slate-900 text-balance hover:text-sky-600 transition-colors">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/blog/${post.id}`}>Leer artículo</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
