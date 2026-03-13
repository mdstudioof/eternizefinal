import { supabase } from './supabaseClient';

export interface SiteConfig {
  id: string;
  primary_color: string;
  secondary_color: string;
  dark_bg_color: string;
  hero_title: string;
  hero_subtitle: string;
  logo_url: string | null;
  updated_at: string;
}

const DEFAULT_CONFIG: SiteConfig = {
  id: '00000000-0000-0000-0000-000000000001',
  primary_color: '#1a9cd8',
  secondary_color: '#fb7185',
  dark_bg_color: '#1e1b4b',
  hero_title: 'Transforme lembranças em homenagens.',
  hero_subtitle: 'Mantenha as histórias de quem você ama vivas, acessível a qualquer momento, de qualquer lugar.',
  logo_url: null,
  updated_at: new Date().toISOString(),
};

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

    return data as SiteConfig;
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
