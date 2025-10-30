import { Card, CardContent } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-sky-50 to-blue-50 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">Términos y condiciones</h1>
            <p className="text-lg text-slate-600">Última actualización: 15 de enero de 2025</p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-8 prose prose-slate max-w-none">
                <h2>1. Aceptación de términos</h2>
                <p>
                  Al acceder y utilizar los servicios de Dentalite, usted acepta estar sujeto a estos términos y
                  condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros
                  servicios.
                </p>

                <h2>2. Servicios ofrecidos</h2>
                <p>
                  Dentalite ofrece servicios de odontología general y especializada. Todos los tratamientos son
                  realizados por profesionales certificados y con licencia vigente.
                </p>

                <h2>3. Citas y cancelaciones</h2>
                <p>Políticas de citas:</p>
                <ul>
                  <li>Las citas deben ser agendadas con al menos 24 horas de anticipación</li>
                  <li>Las cancelaciones deben realizarse con al menos 24 horas de anticipación</li>
                  <li>Cancelaciones tardías o no presentarse pueden resultar en cargos</li>
                  <li>Nos reservamos el derecho de reprogramar citas en caso de emergencias</li>
                </ul>

                <h2>4. Pagos y facturación</h2>
                <p>
                  Los pagos deben realizarse al momento del servicio a menos que se haya acordado un plan de pago.
                  Aceptamos efectivo, tarjetas de crédito/débito y seguros dentales participantes.
                </p>

                <h2>5. Responsabilidad del paciente</h2>
                <p>Los pacientes son responsables de:</p>
                <ul>
                  <li>Proporcionar información médica completa y precisa</li>
                  <li>Seguir las instrucciones de cuidado post-tratamiento</li>
                  <li>Asistir a citas de seguimiento programadas</li>
                  <li>Informar sobre cualquier cambio en su condición de salud</li>
                </ul>

                <h2>6. Limitación de responsabilidad</h2>
                <p>
                  Dentalite no será responsable por resultados de tratamiento que estén fuera de nuestro control o que
                  resulten del incumplimiento del paciente con las instrucciones de cuidado.
                </p>

                <h2>7. Modificaciones</h2>
                <p>
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en
                  vigor inmediatamente después de su publicación en nuestro sitio web.
                </p>

                <h2>8. Contacto</h2>
                <p>Para preguntas sobre estos términos, contáctenos en:</p>
                <p>
                  Email: info@dentalite.com
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
