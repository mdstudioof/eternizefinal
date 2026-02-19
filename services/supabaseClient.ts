import { createClient } from '@supabase/supabase-js';

// As variáveis são injetadas pelo vite.config.ts (process.env → define).
// Configure-as no painel da Vercel em: Project Settings → Environment Variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL e SUPABASE_ANON_KEY são obrigatórios. Configure as variáveis de ambiente.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);