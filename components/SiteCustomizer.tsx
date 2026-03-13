// SiteCustomizer v2 - Tabbed Interface - 2026-03-13
import React, { useState, useEffect, useRef } from 'react';
import { updateSiteConfig, uploadLogo, getDefaultSections, SiteSections } from '../services/siteConfigService';
import { useSiteConfig } from '../context/SiteConfigContext';
import {
  Save, Palette, Type, Image, Loader2, Check, Upload, RotateCcw,
  Layout, Sparkles, MessageSquareQuote, Star, CreditCard
} from 'lucide-react';

type TabKey = 'cores' | 'hero' | 'showcase' | 'features' | 'testimonials' | 'value_proposition' | 'logo';

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'cores', label: 'Cores', icon: <Palette size={16} /> },
  { key: 'logo', label: 'Logo', icon: <Image size={16} /> },
  { key: 'hero', label: 'Hero', icon: <Layout size={16} /> },
  { key: 'showcase', label: 'Showcase', icon: <Sparkles size={16} /> },
  { key: 'features', label: 'Recursos', icon: <Star size={16} /> },
  { key: 'testimonials', label: 'Depoimentos', icon: <MessageSquareQuote size={16} /> },
  { key: 'value_proposition', label: 'Oferta', icon: <CreditCard size={16} /> },
];

const SiteCustomizer: React.FC = () => {
  const { config, refreshConfig } = useSiteConfig();
  const defaults = getDefaultSections();

  const [colors, setColors] = useState({
    primary_color: config.primary_color,
    secondary_color: config.secondary_color,
    dark_bg_color: config.dark_bg_color,
  });

  const [sections, setSections] = useState<SiteSections>(config.sections || defaults);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(config.logo_url);
  const [heroBgFile, setHeroBgFile] = useState<File | null>(null);
  const [heroBgPreview, setHeroBgPreview] = useState<string | null>(config.sections?.hero?.bg_image_url || null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('cores');
  const logoInputRef = useRef<HTMLInputElement>(null);
  const heroBgInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setColors({
      primary_color: config.primary_color,
      secondary_color: config.secondary_color,
      dark_bg_color: config.dark_bg_color,
    });
    setSections(config.sections || defaults);
    setLogoPreview(config.logo_url);
    setHeroBgPreview(config.sections?.hero?.bg_image_url || null);
  }, [config]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleHeroBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeroBgFile(file);
      setHeroBgPreview(URL.createObjectURL(file));
    }
  };

  const removeHeroBg = () => {
    setHeroBgFile(null);
    setHeroBgPreview(null);
    updateSection('hero', 'bg_image_url', '' as any);
  };

  const updateSection = <K extends keyof SiteSections>(
    section: K,
    field: keyof SiteSections[K],
    value: string
  ) => {
    setSections(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      let logoUrl = config.logo_url;
      if (logoFile) {
        const url = await uploadLogo(logoFile);
        if (url) logoUrl = url;
      }

      // Upload hero bg image if changed
      let updatedSections = { ...sections };
      if (heroBgFile) {
        const url = await uploadLogo(heroBgFile);
        if (url) {
          updatedSections = {
            ...updatedSections,
            hero: { ...updatedSections.hero, bg_image_url: url },
          };
        }
      } else if (heroBgPreview === null) {
        updatedSections = {
          ...updatedSections,
          hero: { ...updatedSections.hero, bg_image_url: null as any },
        };
      }

      const { success } = await updateSiteConfig({
        ...colors,
        logo_url: logoUrl,
        hero_title: updatedSections.hero.title,
        hero_subtitle: updatedSections.hero.subtitle,
        sections: updatedSections,
      });

      if (success) {
        await refreshConfig();
        setSaved(true);
        setLogoFile(null);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert('Erro ao salvar. Verifique sua conexão.');
      }
    } catch {
      alert('Erro ao salvar configurações.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setColors({
      primary_color: config.primary_color,
      secondary_color: config.secondary_color,
      dark_bg_color: config.dark_bg_color,
    });
    setSections(config.sections || defaults);
    setLogoFile(null);
    setLogoPreview(config.logo_url);
    setHeroBgFile(null);
    setHeroBgPreview(config.sections?.hero?.bg_image_url || null);
  };

  // Reusable field component
  const TextField = ({ label, value, onChange, multiline = false, placeholder = '' }: {
    label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none resize-none"
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          placeholder={placeholder}
        />
      )}
    </div>
  );

  const ColorField = ({ label, value, onChange, hint }: {
    label: string; value: string; onChange: (v: string) => void; hint: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <div className="flex items-center gap-3">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-12 h-12 rounded-xl border-2 border-slate-200 cursor-pointer p-1" />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
      </div>
      <p className="text-xs text-slate-400 mt-1">{hint}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Personalizar Site</h2>
          <p className="text-sm text-slate-500 mt-1">Edite cores, textos e conteúdo de cada seção.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
            <RotateCcw size={16} /> Resetar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-6 py-2 text-sm font-bold text-white rounded-xl transition-all shadow-md ${saved ? 'bg-emerald-500' : 'bg-brand-600 hover:bg-brand-700'} disabled:opacity-60`}
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : <Save size={16} />}
            {saving ? 'Salvando...' : saved ? 'Salvo!' : 'Salvar'}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        {/* ===== CORES ===== */}
        {activeTab === 'cores' && (
          <div className="space-y-5">
            <h3 className="font-bold text-slate-900 text-lg mb-4">Paleta de Cores</h3>
            <ColorField label="Cor Principal (Brand)" value={colors.primary_color} onChange={(v) => setColors(c => ({ ...c, primary_color: v }))} hint="Botões, links, ícones, destaques" />
            <ColorField label="Cor Secundária (Acentos)" value={colors.secondary_color} onChange={(v) => setColors(c => ({ ...c, secondary_color: v }))} hint="Gradientes, estrelas, elementos decorativos" />
            <ColorField label="Fundo Escuro (Seções)" value={colors.dark_bg_color} onChange={(v) => setColors(c => ({ ...c, dark_bg_color: v }))} hint="Hero, Depoimentos, Oferta, Footer" />
          </div>
        )}

        {/* ===== LOGO ===== */}
        {activeTab === 'logo' && (
          <div className="space-y-5">
            <h3 className="font-bold text-slate-900 text-lg mb-4">Logo do Cabeçalho</h3>
            <div className="flex items-center gap-6">
              {logoPreview ? (
                <div className="w-16 h-16 rounded-xl border-2 border-slate-200 overflow-hidden bg-white flex items-center justify-center p-1">
                  <img src={logoPreview} alt="Logo" className="max-w-full max-h-full object-contain" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                  <Image size={24} />
                </div>
              )}
              <div>
                <button onClick={() => logoInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors">
                  <Upload size={16} /> {logoPreview ? 'Trocar Logo' : 'Upload Logo'}
                </button>
                <p className="text-xs text-slate-400 mt-2">PNG ou SVG. Recomendado: 200x50px</p>
                <input ref={logoInputRef} type="file" accept="image/png,image/svg+xml,image/jpeg,image/webp" onChange={handleLogoChange} className="hidden" />
              </div>
            </div>
          </div>
        )}

        {/* ===== HERO ===== */}
        {activeTab === 'hero' && (
          <div className="space-y-5">
            <h3 className="font-bold text-slate-900 text-lg mb-4">Seção Hero</h3>
            <ColorField label="Cor de Fundo" value={sections.hero.bg_color} onChange={(v) => updateSection('hero', 'bg_color', v)} hint="Fundo da seção principal" />

            {/* Hero Background Image */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Imagem de Fundo</label>
              <div className="flex items-center gap-4">
                {heroBgPreview ? (
                  <div className="w-24 h-16 rounded-xl border-2 border-slate-200 overflow-hidden bg-slate-100">
                    <img src={heroBgPreview} alt="Hero BG" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-24 h-16 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs">
                    Sem imagem
                  </div>
                )}
                <div className="flex gap-2">
                  <button onClick={() => heroBgInputRef.current?.click()} className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors">
                    <Upload size={14} /> {heroBgPreview ? 'Trocar' : 'Upload'}
                  </button>
                  {heroBgPreview && (
                    <button onClick={removeHeroBg} className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors">
                      Remover
                    </button>
                  )}
                </div>
                <input ref={heroBgInputRef} type="file" accept="image/*" onChange={handleHeroBgChange} className="hidden" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Sem imagem = apenas a cor de fundo. Com imagem = ela aparece por trás com a opacidade abaixo.</p>
            </div>

            {/* Opacity Slider */}
            {(heroBgPreview || sections.hero.bg_image_url) && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Opacidade da Imagem: {sections.hero.bg_image_opacity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sections.hero.bg_image_opacity}
                  onChange={(e) => updateSection('hero', 'bg_image_opacity', Number(e.target.value) as any)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0% (invisível)</span>
                  <span>100% (totalmente visível)</span>
                </div>
              </div>
            )}

            <TextField label="Título Principal" value={sections.hero.title} onChange={(v) => updateSection('hero', 'title', v)} />
            <ColorField label="Cor do Título" value={sections.hero.title_color} onChange={(v) => updateSection('hero', 'title_color', v)} hint="Cor do texto do título" />
            <TextField label="Subtítulo" value={sections.hero.subtitle} onChange={(v) => updateSection('hero', 'subtitle', v)} multiline />
            <ColorField label="Cor do Subtítulo" value={sections.hero.subtitle_color} onChange={(v) => updateSection('hero', 'subtitle_color', v)} hint="Cor do texto do subtítulo" />
            <TextField label="Botão Primário" value={sections.hero.cta_primary} onChange={(v) => updateSection('hero', 'cta_primary', v)} />
            <TextField label="Botão Secundário" value={sections.hero.cta_secondary} onChange={(v) => updateSection('hero', 'cta_secondary', v)} />
          </div>
        )}

        {/* ===== SHOWCASE ===== */}
        {activeTab === 'showcase' && (
          <div className="space-y-5">
            <h3 className="font-bold text-slate-900 text-lg mb-4">Seção Memorial Showcase</h3>
            <ColorField label="Cor de Fundo" value={sections.showcase.bg_color} onChange={(v) => updateSection('showcase', 'bg_color', v)} hint="Fundo da seção Showcase" />
            <TextField label="Badge (Tag Superior)" value={sections.showcase.badge} onChange={(v) => updateSection('showcase', 'badge', v)} />
            <TextField label="Título Grande" value={sections.showcase.title} onChange={(v) => updateSection('showcase', 'title', v)} />
            <ColorField label="Cor do Título" value={sections.showcase.title_color} onChange={(v) => updateSection('showcase', 'title_color', v)} hint="Cor do título" />
            <TextField label="Descrição" value={sections.showcase.description} onChange={(v) => updateSection('showcase', 'description', v)} multiline />
            <ColorField label="Cor da Descrição" value={sections.showcase.subtitle_color} onChange={(v) => updateSection('showcase', 'subtitle_color', v)} hint="Cor do texto da descrição" />
            <TextField label="Texto do Botão" value={sections.showcase.cta_text} onChange={(v) => updateSection('showcase', 'cta_text', v)} />
          </div>
        )}

        {/* ===== FEATURES ===== */}
        {activeTab === 'features' && (
          <div className="space-y-5">
            <h3 className="font-bold text-slate-900 text-lg mb-4">Seção Recursos</h3>
            <ColorField label="Cor de Fundo" value={sections.features.bg_color} onChange={(v) => updateSection('features', 'bg_color', v)} hint="Fundo da seção Recursos" />
            <TextField label="Título" value={sections.features.title} onChange={(v) => updateSection('features', 'title', v)} />
            <ColorField label="Cor do Título" value={sections.features.title_color} onChange={(v) => updateSection('features', 'title_color', v)} hint="Cor do título" />
            <TextField label="Subtítulo" value={sections.features.subtitle} onChange={(v) => updateSection('features', 'subtitle', v)} multiline />
            <ColorField label="Cor do Subtítulo" value={sections.features.subtitle_color} onChange={(v) => updateSection('features', 'subtitle_color', v)} hint="Cor do subtítulo" />
          </div>
        )}

        {/* ===== TESTIMONIALS ===== */}
        {activeTab === 'testimonials' && (
          <div className="space-y-5">
            <h3 className="font-bold text-slate-900 text-lg mb-4">Seção Depoimentos</h3>
            <ColorField label="Cor de Fundo" value={sections.testimonials.bg_color} onChange={(v) => updateSection('testimonials', 'bg_color', v)} hint="Fundo da seção Depoimentos" />
            <TextField label="Badge (Tag Superior)" value={sections.testimonials.badge} onChange={(v) => updateSection('testimonials', 'badge', v)} />
            <TextField label="Título" value={sections.testimonials.title} onChange={(v) => updateSection('testimonials', 'title', v)} />
            <ColorField label="Cor do Título" value={sections.testimonials.title_color} onChange={(v) => updateSection('testimonials', 'title_color', v)} hint="Cor do título" />
          </div>
        )}

        {/* ===== VALUE PROPOSITION ===== */}
        {activeTab === 'value_proposition' && (
          <div className="space-y-5">
            <h3 className="font-bold text-slate-900 text-lg mb-4">Seção Oferta / Preço</h3>
            <ColorField label="Cor de Fundo" value={sections.value_proposition.bg_color} onChange={(v) => updateSection('value_proposition', 'bg_color', v)} hint="Fundo da seção de oferta" />
            <TextField label="Badge Superior" value={sections.value_proposition.badge} onChange={(v) => updateSection('value_proposition', 'badge', v)} />
            <TextField label="Título" value={sections.value_proposition.title} onChange={(v) => updateSection('value_proposition', 'title', v)} />
            <ColorField label="Cor do Título" value={sections.value_proposition.title_color} onChange={(v) => updateSection('value_proposition', 'title_color', v)} hint="Cor do título" />
            <TextField label="Descrição" value={sections.value_proposition.description} onChange={(v) => updateSection('value_proposition', 'description', v)} multiline />
            <ColorField label="Cor da Descrição" value={sections.value_proposition.subtitle_color} onChange={(v) => updateSection('value_proposition', 'subtitle_color', v)} hint="Cor do texto da descrição" />
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Preço (ex: 59,90)" value={sections.value_proposition.price} onChange={(v) => updateSection('value_proposition', 'price', v)} />
              <TextField label="Label de Pagamento" value={sections.value_proposition.payment_label} onChange={(v) => updateSection('value_proposition', 'payment_label', v)} />
            </div>
            <TextField label="Badge da Oferta" value={sections.value_proposition.offer_badge} onChange={(v) => updateSection('value_proposition', 'offer_badge', v)} />
            <TextField label="Texto do Botão CTA" value={sections.value_proposition.cta_text} onChange={(v) => updateSection('value_proposition', 'cta_text', v)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteCustomizer;
