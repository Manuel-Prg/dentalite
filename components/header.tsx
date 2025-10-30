"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Menu, X } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-sky-600 text-white font-bold text-xl px-3 py-1 rounded-lg">D</div>
            <span className="font-bold text-xl text-slate-900">Dentalite</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`transition-colors ${
                isActive("/") && pathname === "/" ? "text-sky-600 font-semibold" : "text-slate-600 hover:text-sky-600"
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/sobre-nosotros"
              className={`transition-colors ${
                isActive("/sobre-nosotros") ? "text-sky-600 font-semibold" : "text-slate-600 hover:text-sky-600"
              }`}
            >
              Sobre nosotros
            </Link>
            <Link
              href="/servicios"
              className={`transition-colors ${
                isActive("/servicios") ? "text-sky-600 font-semibold" : "text-slate-600 hover:text-sky-600"
              }`}
            >
              Servicios
            </Link>
            <Link
              href="/blog"
              className={`transition-colors ${
                isActive("/blog") ? "text-sky-600 font-semibold" : "text-slate-600 hover:text-sky-600"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/contacto"
              className={`transition-colors ${
                isActive("/contacto") ? "text-sky-600 font-semibold" : "text-slate-600 hover:text-sky-600"
              }`}
            >
              Contacto
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/pacientes">Área de pacientes</Link>
            </Button>
            <Button asChild className="bg-sky-600 hover:bg-sky-700">
              <Link href="/agendar">
                <Calendar className="mr-2 h-4 w-4" />
                Agendar cita
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6 text-slate-900" /> : <Menu className="h-6 w-6 text-slate-900" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className={`transition-colors ${
                  isActive("/") && pathname === "/" ? "text-sky-600 font-semibold" : "text-slate-600 hover:text-sky-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/sobre-nosotros"
                className={`transition-colors ${
                  isActive("/sobre-nosotros") ? "text-sky-600 font-semibold" : "text-slate-600 hover:text-sky-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre nosotros
              </Link>
              <Link
                href="/servicios"
                className={`transition-colors ${
                  isActive("/servicios") ? "text-sky-600 font-semibold" : "text-slate-600 hover:text-sky-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link
                href="/blog"
                className={`transition-colors ${
                  isActive("/blog") ? "text-sky-600 font-semibold" : "text-slate-600 hover:text-sky-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contacto"
                className={`transition-colors ${
                  isActive("/contacto") ? "text-sky-600 font-semibold" : "text-slate-600 hover:text-sky-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacto
              </Link>
              <Link
                href="/pacientes"
                className="text-slate-600 hover:text-sky-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Área de pacientes
              </Link>
              <Button asChild className="bg-sky-600 hover:bg-sky-700">
                <Link href="/agendar" onClick={() => setMobileMenuOpen(false)}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Agendar cita
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
