
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://hbquufifeyxhbytyjvmu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhicXV1ZmlmZXl4aGJ5dHlqdm11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIyMzM0MTMsImV4cCI6MTk5NzgwOTQxM30.lXbLIukAU-sFhMdVvBtkNrX41I16VM6WZPxyfFFXdrk')
