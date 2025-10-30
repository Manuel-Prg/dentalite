// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para las tablas
export interface Patient {
  id: string
  created_at: string
  first_name: string
  last_name: string
  email: string
  phone: string
  birth_date?: string
  address?: string
  blood_type?: string
  allergies?: string
  user_id?: string
}

export interface Appointment {
  id: string
  created_at: string
  patient_id: string
  service: string
  date: string
  time: string
  notes?: string | null
  status: 'pendiente' | 'confirmada' | 'cancelada' | 'completada'
  doctor_id?: string | null
}

export interface Doctor {
  id: string
  created_at: string
  name: string
  specialty: string
  email: string
  phone: string
  schedule?: string
  user_id?: string
}

// Funciones helper para appointments
export const appointmentsService = {
  // Crear una nueva cita
  async create(appointment: {
    patient_id: string
    doctor_id?: string | null
    service: string
    date: string
    time: string
    notes?: string | null
    status: 'pendiente' | 'confirmada' | 'cancelada' | 'completada'
  }) {
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointment])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Obtener todas las citas
  async getAll() {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patients (
          first_name,
          last_name,
          email,
          phone
        ),
        doctors (
          name,
          specialty
        )
      `)
      .order('date', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Obtener citas de un paciente específico
  async getByPatient(patientId: string) {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        doctors (
          name,
          specialty
        )
      `)
      .eq('patient_id', patientId)
      .order('date', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Actualizar una cita
  async update(id: string, updates: Partial<Appointment>) {
    const { data, error } = await supabase
      .from('appointments')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Eliminar una cita
  async delete(id: string) {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Funciones helper para patients
export const patientsService = {
  async create(patient: Omit<Patient, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('patients')
      .insert([patient])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getAll() {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<Patient>) {
    const { data, error } = await supabase
      .from('patients')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Funciones helper para doctors
export const doctorsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .order('name', { ascending: true })
    
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }
}