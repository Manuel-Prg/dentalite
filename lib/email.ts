// lib/email.ts

/**
 * Envía un email de confirmación de cita
 * Usando Resend API
 */
export async function sendAppointmentConfirmationEmail(
  to: string,
  appointmentData: {
    patientName: string
    service: string
    date: string
    time: string
    doctorName?: string
  }
) {
  try {
    const formattedDate = new Date(appointmentData.date).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject: '✅ Confirmación de Cita - Dentalite',
        patientName: appointmentData.patientName,
        service: appointmentData.service,
        date: formattedDate,
        time: appointmentData.time,
        doctorName: appointmentData.doctorName || 'Por asignar',
      }),
    })

    if (!response.ok) {
      throw new Error('Error al enviar el email')
    }

    return await response.json()
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

/**
 * Envía un email de recordatorio de cita
 */
export async function sendAppointmentReminderEmail(
  to: string,
  appointmentData: {
    patientName: string
    service: string
    date: string
    time: string
  }
) {
  try {
    const response = await fetch('/api/send-reminder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        patientName: appointmentData.patientName,
        service: appointmentData.service,
        date: appointmentData.date,
        time: appointmentData.time,
      }),
    })

    if (!response.ok) {
      throw new Error('Error al enviar el recordatorio')
    }

    return await response.json()
  } catch (error) {
    console.error('Error sending reminder:', error)
    throw error
  }
}