"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { usePathname } from "next/navigation"

interface BreadcrumbItem {
  label: string
  href: string
}

export function Breadcrumbs() {
  const pathname = usePathname()

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split("/").filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Inicio", href: "/" }]

    const pathMap: Record<string, string> = {
      "sobre-nosotros": "Sobre nosotros",
      servicios: "Servicios",
      blog: "Blog",
      contacto: "Contacto",
      agendar: "Agendar cita",
      pacientes: "Área de pacientes",
      admin: "Panel administrativo",
      politicas: "Políticas",
      privacidad: "Privacidad",
      terminos: "Términos y condiciones",
    }

    let currentPath = ""
    paths.forEach((path) => {
      currentPath += `/${path}`
      breadcrumbs.push({
        label: pathMap[path] || path,
        href: currentPath,
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  if (breadcrumbs.length <= 1) return null

  return (
    <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center gap-2">
              {index === 0 && <Home className="h-4 w-4 text-slate-500" />}
              {index > 0 && <ChevronRight className="h-4 w-4 text-slate-400" />}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-slate-900 font-medium">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="text-slate-600 hover:text-sky-600 transition-colors">
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
