// supabaseClient.js
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config() // Laster inn .env-variablene dine

export const supabase = createClient(
  process.env.SUPABASE_URL,  // fra .env
  process.env.SUPABASE_KEY   // fra .env (bruk service_role key her)
)
