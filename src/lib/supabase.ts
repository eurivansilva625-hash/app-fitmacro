import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          weight: number | null
          height: number | null
          age: number | null
          gender: 'male' | 'female' | null
          activity_level: string | null
          goal: 'lose' | 'maintain' | 'gain' | null
          subscription_status: 'free' | 'monthly' | 'annual' | null
          subscription_expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          weight?: number | null
          height?: number | null
          age?: number | null
          gender?: 'male' | 'female' | null
          activity_level?: string | null
          goal?: 'lose' | 'maintain' | 'gain' | null
          subscription_status?: 'free' | 'monthly' | 'annual' | null
          subscription_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          weight?: number | null
          height?: number | null
          age?: number | null
          gender?: 'male' | 'female' | null
          activity_level?: string | null
          goal?: 'lose' | 'maintain' | 'gain' | null
          subscription_status?: 'free' | 'monthly' | 'annual' | null
          subscription_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      meals: {
        Row: {
          id: string
          user_id: string
          meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
          foods: any
          total_calories: number
          total_protein: number
          total_carbs: number
          total_fat: number
          image_url: string | null
          created_at: string
        }
      }
    }
  }
}
