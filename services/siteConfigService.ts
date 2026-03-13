import { supabase } from './supabaseClient';

// --- Section Types ---
export interface HeroSection {
  title: string;
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
  bg_color: string;
  bg_image_url: string | null;
  bg_image_opacity: number;
  title_color: string;
  subtitle_color: string;
}

export interface ShowcaseSection {
  badge: string;
  title: string;
  description: string;
  cta_text: string;
  bg_color: string;
  title_color: string;
  subtitle_color: string;
}

export interface FeaturesSection {
  title: string;
  subtitle: string;
  bg_color: string;
  title_color: string;
  subtitle_color: string;
}

export interface TestimonialsSection {
  badge: string;
  title: string;
  bg_color: string;
  title_color: string;
}

export interface ValuePropositionSection {
  badge: string;
  title: string;
  description: string;
  price: string;
  cta_text: string;
  payment_label: string;
  offer_badge: string;
  bg_color: string;
  title_color: string;
  subtitle_color: string;
}

export interface SiteSections {
  hero: HeroSection;
  showcase: ShowcaseSection;
  features: FeaturesSection;
  testimonials: TestimonialsSection;
  value_proposition: ValuePropositionSection;
}

export interface SiteConfig {
  id: string;
  primary_color: string;
  secondary_color: string;
  dark_bg_color: string;
  hero_title: string;
  hero_subtitle: string;
  logo_url: string | null;
  sections: SiteSections;
  updated_at: string;
}

const DEFAULT_SECTIONS: SiteSections = {
  hero: {
    title: 'Transforme lembranças em homenagens.',
    subtitle: 'Mantenha as histórias de quem você ama vivas, acessível a qualquer momento, de qualquer lugar.',
    cta_primary: 'Começar Agora',
    cta_secondary: 'Ver Demonstração',
    bg_color: '#1e1b4b',
    bg_image_url: null,
    bg_image_opacity: 20,
    title_color: '#ffffff',
    subtitle_color: '#c7d2fe',
  },
  showcase: {
    badge: 'MEMORIAL DIGITAL',
    title: 'MEMORIAL DIGITAL',
    description: '* Essas páginas podem incluir fotos, vídeos, textos e histórias, proporcionando um espaço onde as memórias podem ser acessadas e compartilhadas facilmente por familiares e amigos a qualquer momento com acesso à internet',
    cta_text: 'Saiba mais',
    bg_color: '#ffffff',
    title_color: '#0f172a',
    subtitle_color: '#475569',
  },
  features: {
    title: 'Recursos Especiais',
    subtitle: 'Tudo que você precisa para criar um memorial digital completo, emocionante e duradouro.',
    bg_color: '#f8fafc',
    title_color: '#0f172a',
    subtitle_color: '#475569',
  },
  testimonials: {
    badge: 'Depoimentos',
    title: 'Quem já eternizou uma memória especial',
    bg_color: '#1e1b4b',
    title_color: '#ffffff',
  },
  value_proposition: {
    badge: 'Acessível em qualquer lugar do mundo',
    title: 'Uma homenagem eterna, ao alcance de todos.',
    description: 'Crie um espaço sagrado digital que preserva a história do seu ente querido para sempre. Sem mensalidades, sem custos escondidos. Apenas uma taxa única para garantir que as memórias nunca se apaguem.',
    price: '59,90',
    cta_text: 'Criar Memorial Eterno',
    payment_label: 'Pagamento Único',
    offer_badge: 'OFERTA ESPECIAL',
    bg_color: '#1e1b4b',
    title_color: '#ffffff',
    subtitle_color: '#c7d2fe',
  },
};

const DEFAULT_CONFIG: SiteConfig = {
  id: '00000000-0000-0000-0000-000000000001',
  primary_color: '#1a9cd8',
  secondary_color: '#fb7185',
  dark_bg_color: '#1e1b4b',
  hero_title: 'Transforme lembranças em homenagens.',
  hero_subtitle: 'Mantenha as histórias de quem você ama vivas, acessível a qualquer momento, de qualquer lugar.',
  logo_url: null,
  sections: DEFAULT_SECTIONS,
  updated_at: new Date().toISOString(),
};

export const getDefaultSections = () => DEFAULT_SECTIONS;

export const getSiteConfig = async (): Promise<SiteConfig> => {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('*')
      .single();

    if (error || !data) {
      console.warn('Could not fetch site config, using defaults:', error?.message);
      return DEFAULT_CONFIG;
    }

    // Merge with defaults to handle missing section keys
    const sections = {
      ...DEFAULT_SECTIONS,
      ...(data.sections || {}),
      hero: { ...DEFAULT_SECTIONS.hero, ...(data.sections?.hero || {}) },
      showcase: { ...DEFAULT_SECTIONS.showcase, ...(data.sections?.showcase || {}) },
      features: { ...DEFAULT_SECTIONS.features, ...(data.sections?.features || {}) },
      testimonials: { ...DEFAULT_SECTIONS.testimonials, ...(data.sections?.testimonials || {}) },
      value_proposition: { ...DEFAULT_SECTIONS.value_proposition, ...(data.sections?.value_proposition || {}) },
    };

    return { ...data, sections } as SiteConfig;
  } catch {
    return DEFAULT_CONFIG;
  }
};

export const updateSiteConfig = async (config: Partial<SiteConfig>): Promise<{ success: boolean; error?: any }> => {
  try {
    const { error } = await supabase
      .from('site_config')
      .update({ ...config, updated_at: new Date().toISOString() })
      .eq('id', '00000000-0000-0000-0000-000000000001');

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating site config:', error);
    return { success: false, error };
  }
};

export const uploadLogo = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `logo_${Date.now()}.${fileExt}`;
    const filePath = `site/logos/${fileName}`;

    const { error } = await supabase.storage
      .from('memorials')
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error('Error uploading logo:', error);
      return null;
    }

    const { data } = supabase.storage
      .from('memorials')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (err) {
    console.error('Exception uploading logo:', err);
    return null;
  }
};
