import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-linear-to-br from-sky-50 to-blue-50 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">Política de privacidad</h1>
            <p className="text-lg text-slate-600">Última actualización: 15 de enero de 2025</p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-8 prose prose-slate max-w-none">
                <h2>1. Información que recopilamos</h2>
                <p>
                  En Dentalite, recopilamos información personal que usted nos proporciona directamente cuando agenda
                  una cita, crea una cuenta o se comunica con nosotros. Esta información puede incluir:
                </p>
                <ul>
                  <li>Nombre completo</li>
                  <li>Correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Dirección</li>
                  <li>Información médica y dental relevante</li>
                </ul>

                <h2>2. Cómo usamos su información</h2>
                <p>Utilizamos la información recopilada para:</p>
                <ul>
                  <li>Proporcionar y mejorar nuestros servicios dentales</li>
                  <li>Gestionar sus citas y recordatorios</li>
                  <li>Comunicarnos con usted sobre su tratamiento</li>
                  <li>Enviar información relevante sobre salud dental</li>
                  <li>Cumplir con requisitos legales y regulatorios</li>
                </ul>

                <h2>3. Protección de datos</h2>
                <p>
                  Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal
                  contra acceso no autorizado, pérdida o alteración. Todos los datos médicos se almacenan de forma
                  segura y encriptada.
                </p>

                <h2>4. Compartir información</h2>
                <p>
                  No vendemos ni compartimos su información personal con terceros para fines de marketing. Solo
                  compartimos información cuando es necesario para proporcionar nuestros servicios o cuando lo requiere
                  la ley.
                </p>

                <h2>5. Sus derechos</h2>
                <p>Usted tiene derecho a:</p>
                <ul>
                  <li>Acceder a su información personal</li>
                  <li>Solicitar correcciones de datos inexactos</li>
                  <li>Solicitar la eliminación de sus datos</li>
                  <li>Oponerse al procesamiento de sus datos</li>
                  <li>Retirar su consentimiento en cualquier momento</li>
                </ul>

                <h2>6. Contacto</h2>
                <p>
                  Si tiene preguntas sobre esta política de privacidad o desea ejercer sus derechos, contáctenos en:
                </p>
                <p>
                  Email: privacidad@dentalite.com
                  <br />
                  Teléfono: +1 234 567 8900
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
