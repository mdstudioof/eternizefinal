import React, { useState, useEffect, useRef } from 'react';
import { updateSiteConfig, uploadLogo, SiteConfig } from '../services/siteConfigService';
import { useSiteConfig } from '../context/SiteConfigContext';
import { Save, Palette, Type, Image, Loader2, Check, Upload, RotateCcw } from 'lucide-react';

const SiteCustomizer: React.FC = () => {
  const { config, refreshConfig } = useSiteConfig();
  const [form, setForm] = useState({
    primary_color: config.primary_color,
    secondary_color: config.secondary_color,
    dark_bg_color: config.dark_bg_color,
    hero_title: config.hero_title,
    hero_subtitle: config.hero_subtitle,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(config.logo_url);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm({
      primary_color: config.primary_color,
      secondary_color: config.secondary_color,
      dark_bg_color: config.dark_bg_color,
      hero_title: config.hero_title,
      hero_subtitle: config.hero_subtitle,
    });
    setLogoPreview(config.logo_url);
  }, [config]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
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

      const { success } = await updateSiteConfig({
        ...form,
        logo_url: logoUrl,
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
    setForm({
      primary_color: config.primary_color,
      secondary_color: config.secondary_color,
      dark_bg_color: config.dark_bg_color,
      hero_title: config.hero_title,
      hero_subtitle: config.hero_subtitle,
    });
    setLogoFile(null);
    setLogoPreview(config.logo_url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Personalizar Site</h2>
          <p className="text-sm text-slate-500 mt-1">Altere cores, textos e a logo do site em tempo real.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <RotateCcw size={16} />
            Resetar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-6 py-2 text-sm font-bold text-white rounded-xl transition-all shadow-md ${
              saved
                ? 'bg-emerald-500 hover:bg-emerald-600'
                : 'bg-brand-600 hover:bg-brand-700'
            } disabled:opacity-60`}
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : <Save size={16} />}
            {saving ? 'Salvando...' : saved ? 'Salvo!' : 'Salvar'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Settings */}
        <div className="space-y-6">
          {/* Colors Section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500">
                <Palette size={20} />
              </div>
              <h3 className="font-bold text-slate-900">Cores</h3>
            </div>
            <div className="p-6 space-y-5">
              {/* Primary */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Cor Principal (Brand)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={form.primary_color}
                    onChange={(e) => setForm(f => ({ ...f, primary_color: e.target.value }))}
                    className="w-12 h-12 rounded-xl border-2 border-slate-200 cursor-pointer p-1"
                  />
                  <input
                    type="text"
                    value={form.primary_color}
                    onChange={(e) => setForm(f => ({ ...f, primary_color: e.target.value }))}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    placeholder="#1a9cd8"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">Botões, links, ícones, destaques</p>
              </div>

              {/* Secondary */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Cor Secundária (Acentos)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={form.secondary_color}
                    onChange={(e) => setForm(f => ({ ...f, secondary_color: e.target.value }))}
                    className="w-12 h-12 rounded-xl border-2 border-slate-200 cursor-pointer p-1"
                  />
                  <input
                    type="text"
                    value={form.secondary_color}
                    onChange={(e) => setForm(f => ({ ...f, secondary_color: e.target.value }))}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    placeholder="#fb7185"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">Gradientes, estrelas, elementos decorativos</p>
              </div>

              {/* Dark BG */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Fundo Escuro (Seções)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={form.dark_bg_color}
                    onChange={(e) => setForm(f => ({ ...f, dark_bg_color: e.target.value }))}
                    className="w-12 h-12 rounded-xl border-2 border-slate-200 cursor-pointer p-1"
                  />
                  <input
                    type="text"
                    value={form.dark_bg_color}
                    onChange={(e) => setForm(f => ({ ...f, dark_bg_color: e.target.value }))}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    placeholder="#1e1b4b"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">Hero, Depoimentos, Oferta Especial</p>
              </div>
            </div>
          </div>

          {/* Texts Section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-sky-50 rounded-lg text-sky-500">
                <Type size={20} />
              </div>
              <h3 className="font-bold text-slate-900">Textos do Hero</h3>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Título Principal</label>
                <input
                  type="text"
                  value={form.hero_title}
                  onChange={(e) => setForm(f => ({ ...f, hero_title: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  placeholder="Transforme lembranças em homenagens."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subtítulo</label>
                <textarea
                  value={form.hero_subtitle}
                  onChange={(e) => setForm(f => ({ ...f, hero_subtitle: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none resize-none"
                  placeholder="Mantenha as histórias de quem você ama..."
                />
              </div>
            </div>
          </div>

          {/* Logo Section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-violet-50 rounded-lg text-violet-500">
                <Image size={20} />
              </div>
              <h3 className="font-bold text-slate-900">Logo do Cabeçalho</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-6">
                {logoPreview ? (
                  <div className="w-16 h-16 rounded-xl border-2 border-slate-200 overflow-hidden bg-white flex items-center justify-center p-1">
                    <img src={logoPreview} alt="Logo preview" className="max-w-full max-h-full object-contain" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                    <Image size={24} />
                  </div>
                )}
                <div className="flex-1">
                  <button
                    onClick={() => logoInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                  >
                    <Upload size={16} />
                    {logoPreview ? 'Trocar Logo' : 'Upload Logo'}
                  </button>
                  <p className="text-xs text-slate-400 mt-2">PNG ou SVG. Recomendado: 200x50px</p>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/png,image/svg+xml,image/jpeg,image/webp"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Preview */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-8">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Preview ao Vivo</h3>
              <p className="text-xs text-slate-400 mt-1">Veja como as cores ficarão no site</p>
            </div>
            <div className="p-6 space-y-4">
              {/* Mini Hero Preview */}
              <div
                className="rounded-xl p-6 text-center relative overflow-hidden"
                style={{ backgroundColor: form.dark_bg_color }}
              >
                <div
                  className="absolute inset-0 rounded-xl opacity-20"
                  style={{
                    background: `radial-gradient(circle at 30% 50%, ${form.primary_color}44, transparent 70%), radial-gradient(circle at 70% 50%, ${form.secondary_color}33, transparent 70%)`
                  }}
                />
                <div className="relative z-10">
                  <p className="text-white/60 text-xs mb-2 font-medium">HERO SECTION</p>
                  <h4 className="text-white font-bold text-lg leading-tight mb-2">
                    {form.hero_title.split(' ').slice(0, 4).join(' ')}...
                  </h4>
                  <p className="text-white/50 text-xs mb-4">{form.hero_subtitle.substring(0, 60)}...</p>
                  <button
                    className="px-4 py-2 rounded-full text-white text-xs font-bold"
                    style={{ backgroundColor: form.primary_color }}
                  >
                    Começar Agora
                  </button>
                </div>
              </div>

              {/* Color Swatches */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="w-full h-12 rounded-lg border border-slate-200 mb-2" style={{ backgroundColor: form.primary_color }} />
                  <p className="text-xs text-slate-500 font-medium">Principal</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-12 rounded-lg border border-slate-200 mb-2" style={{ backgroundColor: form.secondary_color }} />
                  <p className="text-xs text-slate-500 font-medium">Secundária</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-12 rounded-lg border border-slate-200 mb-2" style={{ backgroundColor: form.dark_bg_color }} />
                  <p className="text-xs text-slate-500 font-medium">Fundo Escuro</p>
                </div>
              </div>

              {/* Mini Button Preview */}
              <div className="flex gap-2 justify-center flex-wrap">
                <button className="px-4 py-2 rounded-lg text-white text-xs font-bold" style={{ backgroundColor: form.primary_color }}>
                  Botão Primário
                </button>
                <button className="px-4 py-2 rounded-lg text-white text-xs font-bold" style={{ backgroundColor: form.secondary_color }}>
                  Botão Secundário
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-white text-xs font-bold"
                  style={{ background: `linear-gradient(135deg, ${form.primary_color}, ${form.secondary_color})` }}
                >
                  Gradiente
                </button>
              </div>

              {/* Logo Preview */}
              {logoPreview && (
                <div className="border border-slate-200 rounded-xl p-4 flex items-center gap-3 bg-slate-50">
                  <img src={logoPreview} alt="Logo" className="h-8 object-contain" />
                  <span className="font-bold text-slate-900 text-sm">EternizeQR</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteCustomizer;
