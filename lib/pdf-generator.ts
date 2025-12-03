import jsPDF from 'jspdf'

export interface AppointmentData {
    patientName: string
    email: string
    phone: string
    service: string
    date: string
    time: string
    doctorName?: string
    notes?: string
}

export function generateAppointmentPDF(appointmentData: AppointmentData): void {
    const doc = new jsPDF()

    // Colors
    const primaryColor = '#0ea5e9' // sky-500
    const darkColor = '#0f172a' // slate-900
    const lightColor = '#64748b' // slate-500

    // Header with logo/title
    doc.setFillColor(14, 165, 233) // sky-500
    doc.rect(0, 0, 210, 40, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(28)
    doc.setFont('helvetica', 'bold')
    doc.text('Dentalite', 105, 20, { align: 'center' })

    doc.setFontSize(14)
    doc.setFont('helvetica', 'normal')
    doc.text('Confirmación de Cita', 105, 30, { align: 'center' })

    // Success icon (checkmark circle)
    doc.setDrawColor(34, 197, 94) // green-500
    doc.setLineWidth(2)
    doc.circle(105, 55, 8)
    doc.setLineWidth(1.5)
    doc.line(100, 55, 103, 58)
    doc.line(103, 58, 110, 51)

    // Confirmation message
    doc.setTextColor(15, 23, 42) // slate-900
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('¡Cita Confirmada!', 105, 75, { align: 'center' })

    doc.setTextColor(100, 116, 139) // slate-500
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text('Tu cita ha sido agendada exitosamente', 105, 82, { align: 'center' })

    // Patient Information Section
    let yPosition = 95

    doc.setFillColor(248, 250, 252) // slate-50
    doc.roundedRect(15, yPosition, 180, 30, 3, 3, 'F')

    doc.setTextColor(100, 116, 139)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('INFORMACIÓN DEL PACIENTE', 20, yPosition + 8)

    doc.setTextColor(15, 23, 42)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text(appointmentData.patientName, 20, yPosition + 16)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(100, 116, 139)
    doc.text(`Email: ${appointmentData.email}`, 20, yPosition + 22)
    doc.text(`Tel: ${appointmentData.phone}`, 20, yPosition + 27)

    // Appointment Details Section
    yPosition += 38

    doc.setFillColor(240, 249, 255) // sky-50
    doc.roundedRect(15, yPosition, 180, 55, 3, 3, 'F')

    doc.setTextColor(100, 116, 139)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('DETALLES DE LA CITA', 20, yPosition + 8)

    // Service
    doc.setTextColor(14, 165, 233) // sky-500
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(appointmentData.service, 20, yPosition + 20)

    // Date and Time
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(20, yPosition + 27, 75, 20, 2, 2, 'F')
    doc.roundedRect(100, yPosition + 27, 75, 20, 2, 2, 'F')

    doc.setTextColor(100, 116, 139)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text('Fecha', 25, yPosition + 33)
    doc.text('Hora', 105, yPosition + 33)

    doc.setTextColor(15, 23, 42)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')

    // Format date
    const formattedDate = new Date(appointmentData.date).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    doc.text(formattedDate, 25, yPosition + 41)
    doc.text(appointmentData.time, 105, yPosition + 41)

    // Doctor Information (if available)
    if (appointmentData.doctorName) {
        yPosition += 63

        doc.setFillColor(248, 250, 252)
        doc.roundedRect(15, yPosition, 180, 15, 3, 3, 'F')

        doc.setTextColor(100, 116, 139)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.text('Doctor', 20, yPosition + 7)

        doc.setTextColor(15, 23, 42)
        doc.setFontSize(11)
        doc.setFont('helvetica', 'bold')
        doc.text(appointmentData.doctorName, 20, yPosition + 12)
    }

    // Notes (if available)
    if (appointmentData.notes) {
        yPosition += appointmentData.doctorName ? 22 : 63

        doc.setFillColor(254, 252, 232) // amber-50
        doc.roundedRect(15, yPosition, 180, 22, 3, 3, 'F')

        doc.setTextColor(120, 53, 15) // amber-900
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.text('Notas adicionales', 20, yPosition + 7)

        doc.setFontSize(10)
        doc.setFont('helvetica', 'normal')
        const splitNotes = doc.splitTextToSize(appointmentData.notes, 160)
        doc.text(splitNotes, 20, yPosition + 14)
    }

    // Important Information Box
    yPosition = appointmentData.notes ? yPosition + 28 : (appointmentData.doctorName ? yPosition + 22 : yPosition + 63)

    doc.setFillColor(240, 249, 255) // sky-50
    doc.setDrawColor(14, 165, 233) // sky-500
    doc.setLineWidth(0.5)
    doc.roundedRect(15, yPosition, 180, 22, 3, 3, 'FD')

    doc.setTextColor(14, 165, 233)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Informacion Importante', 20, yPosition + 8)

    doc.setTextColor(12, 74, 110) // sky-900
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text('- Por favor, llega 10 minutos antes de tu cita', 20, yPosition + 14)
    doc.text('- Recibiras un recordatorio por WhatsApp', 20, yPosition + 19)

    // Footer
    yPosition += 30
    doc.setDrawColor(226, 232, 240) // slate-200
    doc.setLineWidth(0.5)
    doc.line(15, yPosition, 195, yPosition)

    doc.setTextColor(148, 163, 184) // slate-400
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text('Dentalite - Tu clinica dental de confianza', 105, yPosition + 6, { align: 'center' })
    doc.text(`Generado el ${new Date().toLocaleDateString('es-ES')}`, 105, yPosition + 11, { align: 'center' })

    // Save the PDF
    const fileName = `Cita_Dentalite_${appointmentData.date}_${appointmentData.time.replace(':', '')}.pdf`
    doc.save(fileName)
}
