import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hwalburbievmjldacmxy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3YWxidXJiaWV2bWpsZGFjbXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMTI4MDYsImV4cCI6MjA3NzY4ODgwNn0.XTLDLL0ZgH0lNRJa7wevmL_ZU6k628Ei85MBVcbfZYI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)