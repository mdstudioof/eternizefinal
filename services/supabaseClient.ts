import { createClient } from '@supabase/supabase-js';

// Vite expõe automaticamente variáveis com prefixo VITE_ via import.meta.env
// Configure no painel da Vercel com os nomes: VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error(
    '⚠️ Variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY não encontradas.\n' +
    'Configure-as no painel da Vercel e faça um novo deploy.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
);