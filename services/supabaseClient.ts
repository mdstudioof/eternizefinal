import { createClient } from '@supabase/supabase-js';

// As variáveis são injetadas pelo vite.config.ts em build time (process.env → define).
// Configure-as no painel da Vercel em: Project Settings → Environment Variables
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error(
    '⚠️ Variáveis de ambiente do Supabase não encontradas.\n' +
    'Configure SUPABASE_URL e SUPABASE_ANON_KEY no painel da Vercel e faça um novo deploy.'
  );
}

// Cria o cliente mesmo sem vars (vai falhar nas chamadas, não no carregamento do app)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
);