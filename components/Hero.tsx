import React from 'react';
import { PlayCircle, QrCode } from 'lucide-react';

interface HeroProps {
  onOpenCreateModal: () => void;
  onOpenLoginModal: () => void;
  onViewDemo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenCreateModal, onOpenLoginModal, onViewDemo }) => {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 lg:pt-36 lg:pb-32 bg-slate-900">

      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/hero-bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900"></div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] left-1/4 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px] animate-blob mix-blend-screen"></div>
        <div className="absolute top-[20%] right-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen"></div>
        <div className="absolute -bottom-[10%] left-1/3 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-screen"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">

        {/*
          Título em 3 linhas — fluid typography via clamp.
          Em mobile (~390px): ~38px por linha → cabe sem quebrar.
          Em desktop (1200px+): ~72px → imponente e bonito.
        */}
        <h1
          className="font-extrabold text-white tracking-tight mb-6 animate-slide-up"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
            lineHeight: '1.18',
          }}
        >
          Transforme lembranças<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-purple-400">
            em homenagens.
          </span>
        </h1>

        {/* Subtítulo */}
        <p
          className="max-w-xl mx-auto text-slate-400 mb-10 animate-slide-up leading-relaxed"
          style={{ animationDelay: '0.1s', fontSize: 'clamp(0.95rem, 2vw, 1.125rem)' }}
        >
          Mantenha as histórias de quem você ama vivas, acessível a qualquer momento, de qualquer lugar.
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
            Começar Agora
          </button>

          <button
            onClick={onViewDemo}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 text-lg px-8 py-4 rounded-full font-bold transition-all w-full sm:w-auto justify-center hover:text-white shadow-lg shadow-black/20"
          >
            <PlayCircle size={20} />
            Ver Demonstração
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;