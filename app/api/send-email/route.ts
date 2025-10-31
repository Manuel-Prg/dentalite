// app/api/send-email/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, subject, patientName, service, date, time, doctorName } = body

    const { data, error } = await resend.emails.send({
      from: 'Dentalite <onboarding@resend.dev>', // Cambiar cuando tengas dominio
      to: [to],
      subject: subject,
      html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de Cita</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">🦷 Dentalite</h1>
              <p style="margin: 10px 0 0 0; color: #e0f2fe; font-size: 16px;">Tu sonrisa es nuestra prioridad</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 24px; font-weight: bold;">¡Cita Confirmada!</h2>
              
              <p style="margin: 0 0 30px 0; color: #475569; font-size: 16px; line-height: 1.6;">
                Hola <strong>${patientName}</strong>,
              </p>

              <p style="margin: 0 0 30px 0; color: #475569; font-size: 16px; line-height: 1.6;">
                Tu cita ha sido agendada exitosamente. A continuación encontrarás los detalles:
              </p>

              <!-- Appointment Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #64748b; font-size: 14px; padding-bottom: 8px;">📅 Fecha:</td>
                        <td style="color: #1e293b; font-size: 16px; font-weight: 600; text-align: right; padding-bottom: 8px;">${date}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-size: 14px; padding-bottom: 8px;">🕐 Hora:</td>
                        <td style="color: #1e293b; font-size: 16px; font-weight: 600; text-align: right; padding-bottom: 8px;">${time}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-size: 14px; padding-bottom: 8px;">💼 Servicio:</td>
                        <td style="color: #0ea5e9; font-size: 16px; font-weight: 600; text-align: right; padding-bottom: 8px;">${service}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-size: 14px;">👨‍⚕️ Doctor:</td>
                        <td style="color: #1e293b; font-size: 16px; font-weight: 600; text-align: right;">${doctorName}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Important Info -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
                <p style="margin: 0 0 10px 0; color: #92400e; font-size: 16px; font-weight: 600;">⚠️ Información Importante:</p>
                <ul style="margin: 0; padding-left: 20px; color: #78350f; font-size: 14px; line-height: 1.8;">
                  <li>Por favor llega <strong>10 minutos antes</strong> de tu cita</li>
                  <li>Si necesitas <strong>cancelar o reagendar</strong>, hazlo con 24 horas de anticipación</li>
                  <li>Trae tu <strong>identificación</strong> y seguro médico (si aplica)</li>
                </ul>
              </div>

              <!-- Location -->
              <p style="margin: 0 0 20px 0; color: #475569; font-size: 14px; line-height: 1.6;">
                📍 <strong>Ubicación:</strong> Dentalite - Calle Principal #123, Centro, Ciudad
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://wa.me/5299934370563?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20mi%20cita" 
                       style="display: inline-block; padding: 14px 30px; background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                      📱 Contactar por WhatsApp
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0 0; color: #64748b; font-size: 14px; line-height: 1.6; text-align: center;">
                ¿Tienes alguna pregunta? No dudes en contactarnos.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">
                ¡Nos vemos pronto! 😊
              </p>
              <p style="margin: 0 0 15px 0; color: #94a3b8; font-size: 12px;">
                © 2025 Dentalite. Todos los derechos reservados.
              </p>
              <div style="margin-top: 15px;">
                <a href="#" style="color: #0ea5e9; text-decoration: none; margin: 0 10px; font-size: 12px;">Ver Cita</a>
                <span style="color: #cbd5e1;">|</span>
                <a href="#" style="color: #0ea5e9; text-decoration: none; margin: 0 10px; font-size: 12px;">Contacto</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}