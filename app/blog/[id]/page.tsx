import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, User, ArrowLeft, Share2, BookmarkPlus, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const blogPost = {
  id: 1,
  title: "5 consejos para mantener tus dientes blancos",
  category: "Cuidado dental",
  author: "Dr. Juan Pérez",
  date: "2025-01-15",
  readTime: "5 min",
  image: "/images/blog/5-tips-whiter-teeth.webp", 
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
    image: "/images/blog/revision-dental.webp", 
  },
  {
    id: 6,
    title: "Alimentos que fortalecen tus dientes",
    category: "Nutrición",
    image: "/images/blog/alimentos-saludables.webp",
  },
]

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back Button */}
      <section className="bg-white border-b border-slate-200 py-4 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="hover:bg-slate-100">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al blog
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-full">
                <BookmarkPlus className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-bold shadow-lg mb-6">
              {blogPost.category}
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold mt-6 mb-8 text-slate-900 text-balance leading-tight">
              {blogPost.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                  <User className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-lg">{blogPost.author}</p>
                  <p className="text-sm text-slate-600">Odontólogo especialista</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-slate-600">
                <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">
                    {new Date(blogPost.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">{blogPost.readTime} de lectura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto animate-fade-in-up stagger-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/20 to-transparent z-10" />
              <Image
                src={blogPost.image} 
                alt={blogPost.title}
                width={1200} 
                height={600} 
                className="w-full h-auto object-cover" 
                priority 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16 lg:pb-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-slate prose-xl max-w-none 
                prose-headings:text-slate-900 prose-headings:font-bold 
                prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 
                prose-h2:pb-4 prose-h2:border-b-4 prose-h2:border-gradient-to-r 
                prose-h2:from-blue-500 prose-h2:to-cyan-500
                prose-h2:bg-gradient-to-r prose-h2:from-blue-600 prose-h2:to-cyan-600 
                prose-h2:bg-clip-text prose-h2:text-transparent
                prose-h2:flex prose-h2:items-center prose-h2:gap-3
                prose-h2:before:content-['✓'] prose-h2:before:flex 
                prose-h2:before:items-center prose-h2:before:justify-center
                prose-h2:before:w-10 prose-h2:before:h-10 
                prose-h2:before:rounded-full prose-h2:before:bg-gradient-to-br 
                prose-h2:before:from-blue-500 prose-h2:before:to-cyan-500
                prose-h2:before:text-white prose-h2:before:text-xl
                prose-h2:before:shadow-lg prose-h2:before:shrink-0
                prose-p:text-slate-700 prose-p:leading-[1.9] prose-p:mb-6 
                prose-p:text-lg prose-p:first-of-type:text-xl 
                prose-p:first-of-type:font-medium prose-p:first-of-type:text-slate-800
                prose-p:first-of-type:bg-gradient-to-r prose-p:first-of-type:from-blue-50 
                prose-p:first-of-type:to-cyan-50 prose-p:first-of-type:p-6 
                prose-p:first-of-type:rounded-2xl prose-p:first-of-type:border-l-4 
                prose-p:first-of-type:border-blue-500
                prose-strong:text-slate-900 prose-strong:font-bold 
                prose-strong:bg-yellow-100 prose-strong:px-1 prose-strong:rounded
                animate-fade-in-up stagger-2"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />

            {/* Social Share */}
            <div className="mt-12 pt-8 border-t-2 border-slate-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-lg font-bold text-slate-900">¿Te gustó este artículo?</p>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-300">
                    <Heart className="h-4 w-4 mr-2" />
                    Me gusta
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartir
                  </Button>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <Card className="mt-12 bg-linear-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 overflow-hidden shadow-xl animate-fade-in-up stagger-3">
              <CardContent className="p-8 lg:p-10 text-center relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-200 to-cyan-200 rounded-bl-full opacity-50" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-slate-900">¿Necesitas una consulta profesional?</h3>
                  <p className="text-lg text-slate-600 mb-6 text-pretty max-w-xl mx-auto">
                    Nuestro equipo de expertos está listo para ayudarte a lograr la sonrisa que siempre has deseado
                  </p>
                  <Button asChild size="lg" className="bg-linear-to-r from-blue-600 to-cyan-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 h-14 px-8">
                    <Link href="/agendar">
                      <Calendar className="mr-2 h-5 w-5" />
                      Agendar cita ahora
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Author Info */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-0 shadow-xl animate-fade-in-up">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-slate-900">{blogPost.author}</h3>
                    <p className="text-blue-600 font-medium mb-3">Odontólogo especialista certificado</p>
                    <p className="text-slate-600 leading-relaxed">
                      Especialista en odontología con más de 10 años de experiencia. Dedicado a proporcionar
                      información de calidad sobre salud dental y ayudar a las personas a mantener sonrisas saludables.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-slate-900 text-center">Artículos relacionados</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((post, index) => (
                <Card key={post.id} className={`overflow-hidden border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up stagger-${index + 1} group`}>
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10" />
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-slate-900 text-balance hover:text-blue-600 transition-colors group-hover:text-blue-600">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <Button asChild variant="outline" className="w-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300">
                      <Link href={`/blog/${post.id}`}>Leer artículo completo</Link>
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