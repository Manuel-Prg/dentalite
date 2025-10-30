import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-sky-600 text-white font-bold text-xl px-3 py-1 rounded-lg">D</div>
              <span className="font-bold text-xl text-white">Dentalite</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Tu clínica dental de confianza. Cuidamos tu sonrisa con profesionalismo y tecnología de vanguardia.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-sky-400 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-sky-400 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Mapa del sitio</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-sky-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="hover:text-sky-400 transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="hover:text-sky-400 transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-sky-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-sky-400 transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/agendar" className="hover:text-sky-400 transition-colors">
                  Agendar cita
                </Link>
              </li>
              <li>
                <Link href="/pacientes" className="hover:text-sky-400 transition-colors">
                  Área de pacientes
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-sky-400 transition-colors">
                  Panel administrativo
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm">
              <li>Limpieza dental</li>
              <li>Ortodoncia</li>
              <li>Blanqueamiento</li>
              <li>Implantes dentales</li>
              <li>Endodoncia</li>
              <li>Odontopediatría</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>Av. Principal 123, Ciudad, País</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-sky-400 flex-shrink-0" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-sky-400 flex-shrink-0" />
                <span>info@dentalite.com</span>
              </li>
            </ul>
            <div className="mt-4 text-sm">
              <p className="font-semibold text-white mb-1">Horario</p>
              <p>Lun - Vie: 9:00 - 19:00</p>
              <p>Sábado: 9:00 - 14:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; 2025 Dentalite. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/politicas/privacidad" className="hover:text-sky-400 transition-colors">
              Política de privacidad
            </Link>
            <Link href="/politicas/terminos" className="hover:text-sky-400 transition-colors">
              Términos y condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
