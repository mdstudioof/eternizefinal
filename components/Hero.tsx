import React, { useEffect, useState } from 'react';
import { Heart, PlayCircle, QrCode, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  onOpenCreateModal: () => void;
  onOpenLoginModal: () => void;
  onViewDemo: () => void;
}

const testimonials = [
  {
    name: "Ana Clara S.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana",
    text: "Chorando aqui 😭 Criei o memorial da minha mãe e toda vez que escaneio o QR Code sinto ela perto de mim. Obrigada por existir!",
    stars: 5,
  },
  {
    name: "Ricardo M.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ricardo",
    text: "Coloquei na lápide do meu pai. Agora qualquer pessoa que visita pode ver toda a vida dele, as fotos, os vídeos... É mágico e emocionante.",
    stars: 5,
  },
  {
    name: "Fernanda L.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fer",
    text: "Amei demais! Fiz para o meu avô e toda a família ficou emocionada. É uma forma linda de eternizar quem a gente ama ❤️",
    stars: 5,
  },
  {
    name: "Thiago R.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=thiago",
    text: "Nunca pensei que tecnologia poderia me emocionar tanto. O memorial do meu irmão ficou incrível. Uma homenagem que vai durar para sempre.",
    stars: 5,
  },
  {
    name: "Mariana P.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mariana",
    text: "Perdi meu cachorrinho há um mês. Criar o memorial pra ele foi um ato de amor. Super recomendo para quem quiser guardar as memórias de quem partiu.",
    stars: 5,
  },
];

const Hero: React.FC<HeroProps> = ({ onOpenCreateModal, onOpenLoginModal, onViewDemo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const t = testimonials[currentIndex];

  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-32 lg:pb-28 bg-slate-900">

      {/* Background Decor (Dark Mode) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] left-1/4 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px] animate-blob mix-blend-screen"></div>
        <div className="absolute top-[20%] right-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen"></div>
        <div className="absolute -bottom-[10%] left-1/3 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        {/* Pill Badge (Dark Style) */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-900/50 border border-brand-700/50 text-brand-300 mb-8 animate-fade-in backdrop-blur-sm shadow-lg shadow-brand-900/20">
          <Heart size={16} className="fill-brand-500 text-brand-500" />
          <span className="text-sm font-semibold tracking-wide">Guarde quem você ama para sempre</span>
        </div>

        {/* Main Headline — 3 linhas com emoção */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-4 animate-slide-up" style={{ lineHeight: '1.15' }}>
          Guarde as Memórias<br />
          de Quem Foi<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-purple-400">
            Especial para Você
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-xl mx-auto text-base md:text-lg text-slate-400 mb-10 animate-slide-up leading-relaxed px-2" style={{ animationDelay: '0.1s' }}>
          Eternize momentos únicos, histórias de vida e rostos queridos em um memorial digital tocante — acessível a qualquer hora com um simples QR Code.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up mb-16 px-4" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={onOpenLoginModal}
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white text-lg px-8 py-4 rounded-full font-bold transition-all shadow-xl shadow-brand-900/50 hover:shadow-brand-600/40 transform hover:-translate-y-1 w-full sm:w-auto justify-center border border-transparent"
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

        {/* ---- CARROSSEL DE DEPOIMENTOS ---- */}
        <div className="max-w-lg mx-auto px-2">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-5">
            ❤️ O que dizem quem já eternizou
          </p>

          {/* Card */}
          <div
            className="relative bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl px-6 py-6 shadow-2xl transition-opacity duration-300"
            style={{ opacity: isAnimating ? 0 : 1 }}
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-3">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Text */}
            <p className="text-slate-300 text-sm leading-relaxed mb-5 italic">
              "{t.text}"
            </p>

            {/* Author */}
            <div className="flex items-center justify-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-9 h-9 rounded-full bg-slate-700 border border-white/10"
              />
              <span className="text-white font-semibold text-sm">{t.name}</span>
            </div>

            {/* Nav Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Próximo"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-brand-400' : 'w-1.5 bg-slate-600'}`}
                aria-label={`Ir para depoimento ${i + 1}`}
              />
            ))}
          </div>
        </div>
        {/* ---------------------------------- */}

      </div>
    </section>
  );
};

export default Hero;