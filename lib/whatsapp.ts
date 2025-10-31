// lib/whatsapp.ts

/**
 * Envía un mensaje de confirmación de cita por WhatsApp
 * Abre WhatsApp Web con el mensaje prellenado
 */
export function sendWhatsAppConfirmation(
  phoneNumber: string,
  appointmentData: {
    patientName: string
    service: string
    date: string
    time: string
    doctorName?: string
  }
) {
  // Limpiar el número de teléfono (quitar espacios, guiones, etc)
  const cleanPhone = phoneNumber.replace(/\D/g, '')
  
  // Formatear la fecha
  const formattedDate = new Date(appointmentData.date).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Crear el mensaje
  const message = `
🦷 *Confirmación de Cita - Dentalite*

Hola ${appointmentData.patientName},

Tu cita ha sido confirmada exitosamente:

📅 *Fecha:* ${formattedDate}
🕐 *Hora:* ${appointmentData.time}
💼 *Servicio:* ${appointmentData.service}
👨‍⚕️ *Doctor:* ${appointmentData.doctorName || 'Por asignar'}

📍 *Ubicación:* Dentalite - [Dirección de la clínica]

⚠️ *Importante:*
• Por favor llega 10 minutos antes
• Si necesitas cancelar o reagendar, hazlo con 24 horas de anticipación
• Trae tu identificación y seguro (si aplica)

¿Tienes alguna pregunta? Responde a este mensaje.

¡Nos vemos pronto! 😊
  `.trim()

  // Codificar el mensaje para URL
  const encodedMessage = encodeURIComponent(message)
  
  // Crear la URL de WhatsApp
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`
  
  // Abrir WhatsApp en una nueva ventana
  window.open(whatsappUrl, '_blank')
}

/**
 * Envía un recordatorio de cita
 */
export function sendWhatsAppReminder(
  phoneNumber: string,
  appointmentData: {
    patientName: string
    service: string
    date: string
    time: string
  }
) {
  const cleanPhone = phoneNumber.replace(/\D/g, '')
  
  const message = `
🔔 *Recordatorio de Cita - Dentalite*

Hola ${appointmentData.patientName},

Te recordamos tu cita programada para:

📅 *Mañana* ${new Date(appointmentData.date).toLocaleDateString('es-ES')}
🕐 *Hora:* ${appointmentData.time}
💼 *Servicio:* ${appointmentData.service}

Por favor confirma tu asistencia respondiendo "SÍ" a este mensaje.

¡Te esperamos! 🦷✨
  `.trim()

  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`
  
  window.open(whatsappUrl, '_blank')
}