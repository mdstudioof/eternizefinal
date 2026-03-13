import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getSiteConfig, SiteConfig } from '../services/siteConfigService';

interface SiteConfigContextType {
  config: SiteConfig;
  loading: boolean;
  refreshConfig: () => Promise<void>;
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

const SiteConfigContext = createContext<SiteConfigContextType>({
  config: DEFAULT_CONFIG,
  loading: true,
  refreshConfig: async () => {},
});

// Helper: generate shades from a hex color
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generatePalette(hex: string): Record<string, string> {
  const { h, s } = hexToHSL(hex);
  return {
    '50': hslToHex(h, Math.min(s, 100), 96),
    '100': hslToHex(h, Math.min(s, 100), 91),
    '200': hslToHex(h, Math.min(s, 100), 82),
    '300': hslToHex(h, Math.min(s, 95), 73),
    '400': hslToHex(h, Math.min(s, 90), 56),
    '500': hslToHex(h, Math.min(s, 85), 48),
    '600': hslToHex(h, Math.min(s, 85), 42),
    '700': hslToHex(h, Math.min(s, 80), 35),
    '800': hslToHex(h, Math.min(s, 75), 28),
    '900': hslToHex(h, Math.min(s, 70), 23),
  };
}

function applyCSSVariables(config: SiteConfig) {
  const root = document.documentElement;
  
  // Generate full palette from primary color
  const palette = generatePalette(config.primary_color);
  Object.entries(palette).forEach(([shade, color]) => {
    root.style.setProperty(`--color-brand-${shade}`, color);
  });

  // Secondary color
  const secPalette = generatePalette(config.secondary_color);
  Object.entries(secPalette).forEach(([shade, color]) => {
    root.style.setProperty(`--color-secondary-${shade}`, color);
  });

  // Dark background
  root.style.setProperty('--color-dark-bg', config.dark_bg_color);
}

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);

  const refreshConfig = useCallback(async () => {
    const data = await getSiteConfig();
    setConfig(data);
    applyCSSVariables(data);
  }, []);

  useEffect(() => {
    refreshConfig().finally(() => setLoading(false));
  }, [refreshConfig]);

  return (
    <SiteConfigContext.Provider value={{ config, loading, refreshConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => useContext(SiteConfigContext);
