import React from 'react';
import { QrCode, PlayCircle } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

interface HeroProps {
  onOpenCreateModal: () => void;
  onOpenLoginModal: () => void;
  onViewDemo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenCreateModal, onOpenLoginModal, onViewDemo }) => {
  const { config } = useSiteConfig();
  return (
    <section className="relative overflow-hidden min-h-screen lg:min-h-0 py-0 lg:pt-36 lg:pb-32 flex items-center justify-center" style={{ backgroundColor: config.sections.hero.bg_color }}>

      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full">
        {config.sections.hero.bg_image_url && (
          <img
            src={config.sections.hero.bg_image_url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: (config.sections.hero.bg_image_opacity || 20) / 100 }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] left-1/4 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px] animate-blob mix-blend-screen"></div>
        <div className="absolute top-[20%] right-1/4 w-[400px] h-[400px] bg-rose-400/20 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen"></div>
        <div className="absolute -bottom-[10%] left-1/3 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-screen"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center relative z-10 w-full">

        {/*
          Título em 3 linhas — fluid typography via clamp.
          Em mobile (~390px): ~38px por linha → cabe sem quebrar.
          Em desktop (1200px+): ~72px → imponente e bonito.
        */}
        <h1
          className="font-extrabold text-white tracking-tight mb-6 animate-slide-up"
          style={{
            fontSize: 'clamp(2.75rem, 8vw, 4.5rem)',
            lineHeight: '1.18',
            color: config.sections.hero.title_color,
          }}
        >
          {config.sections.hero.title}
        </h1>

        {/* Subtítulo */}
        <p
          className="max-w-xl mx-auto mb-8 animate-slide-up leading-relaxed"
          style={{ animationDelay: '0.1s', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', color: config.sections.hero.subtitle_color }}
        >
          {config.sections.hero.subtitle}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up px-4"
          style={{ animationDelay: '0.2s' }}
        >
          <button
            onClick={onOpenLoginModal}
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white text-lg px-8 py-4 rounded-full font-bold transition-all shadow-xl shadow-brand-900/50 hover:shadow-brand-600/40 transform hover:-translate-y-1 w-full sm:w-auto justify-center"
          >
            <QrCode size={20} />
            {config.sections.hero.cta_primary}
          </button>

          <button
            onClick={onViewDemo}
            className="flex items-center gap-2 bg-indigo-900/60 hover:bg-indigo-800/70 text-indigo-200 border border-indigo-700/50 hover:border-indigo-600/50 text-lg px-8 py-4 rounded-full font-bold transition-all w-full sm:w-auto justify-center hover:text-white shadow-lg shadow-black/20"
          >
            <PlayCircle size={20} />
            {config.sections.hero.cta_secondary}
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;