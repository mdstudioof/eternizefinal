import React, { useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Fotos reais via Unsplash (seed fixo para manter a mesma pessoa)
const testimonials = [
    {
        name: "Ana Clara S.",
        location: "São Paulo, SP",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
        text: "Chorando aqui 😭 Criei o memorial da minha mãe e toda vez que escaneio o QR Code sinto ela perto de mim. Obrigada por existir, EternizeQR!",
        stars: 5,
    },
    {
        name: "Ricardo M.",
        location: "Belo Horizonte, MG",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
        text: "Coloquei na lápide do meu pai. Agora qualquer pessoa que visita pode ver toda a vida dele, as fotos, os vídeos. É mágico e emocionante.",
        stars: 5,
    },
    {
        name: "Fernanda L.",
        location: "Rio de Janeiro, RJ",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
        text: "Amei demais! Fiz para o meu avô e toda a família ficou emocionada. É uma forma linda de eternizar quem a gente ama ❤️",
        stars: 5,
    },
    {
        name: "Thiago R.",
        location: "Curitiba, PR",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
        text: "Nunca pensei que tecnologia poderia me emocionar tanto. O memorial do meu irmão ficou incrível. Uma homenagem que vai durar para sempre.",
        stars: 5,
    },
    {
        name: "Mariana P.",
        location: "Florianópolis, SC",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face",
        text: "Perdi meu cachorrinho há um mês. Criar o memorial pra ele foi um ato de amor. Super recomendo para quem quer guardar as memórias de quem partiu.",
        stars: 5,
    },
];

const Testimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    // Auto-avanço mais lento: 7 segundos
    useEffect(() => {
        const timer = setInterval(() => {
            transition((prev) => (prev + 1) % testimonials.length);
        }, 7000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const transition = (getNext: (prev: number) => number) => {
        setFade(false);
        setTimeout(() => {
            setCurrentIndex(getNext);
            setFade(true);
        }, 350);
    };

    const goNext = () => transition((prev) => (prev + 1) % testimonials.length);
    const goPrev = () => transition((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    const t = testimonials[currentIndex];

    return (
        <section className="bg-white py-20 lg:py-28 border-t border-slate-100">
            <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">

                {/* Heading */}
                <p className="text-brand-600 text-sm font-bold uppercase tracking-widest mb-3">Depoimentos</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-14 leading-tight">
                    Quem já eternizou<br className="hidden sm:block" /> uma memória especial
                </h2>

                {/* Card principal */}
                <div className="relative">
                    {/* Aspas decorativas */}
                    <Quote
                        size={64}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 text-brand-100 fill-brand-50"
                    />

                    <div
                        className="bg-slate-50 rounded-3xl px-8 py-10 md:px-14 md:py-14 shadow-lg shadow-slate-200/60 border border-slate-100 transition-all duration-350"
                        style={{ opacity: fade ? 1 : 0, transform: fade ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.35s ease, transform 0.35s ease' }}
                    >
                        {/* Stars */}
                        <div className="flex justify-center gap-1 mb-6">
                            {Array.from({ length: t.stars }).map((_, i) => (
                                <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
                            ))}
                        </div>

                        {/* Texto */}
                        <p className="text-slate-700 text-lg md:text-xl leading-relaxed mb-8 font-medium italic">
                            "{t.text}"
                        </p>

                        {/* Autor */}
                        <div className="flex flex-col items-center gap-3">
                            <img
                                src={t.photo}
                                alt={t.name}
                                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                            />
                            <div>
                                <p className="font-bold text-slate-900 text-base">{t.name}</p>
                                <p className="text-slate-400 text-sm">{t.location}</p>
                            </div>
                        </div>
                    </div>

                    {/* Setas de navegação */}
                    <button
                        onClick={goPrev}
                        className="absolute -left-4 md:-left-7 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-brand-600 hover:border-brand-200 transition-all hover:scale-105"
                        aria-label="Anterior"
                    >
                        <ChevronLeft size={22} />
                    </button>
                    <button
                        onClick={goNext}
                        className="absolute -right-4 md:-right-7 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-brand-600 hover:border-brand-200 transition-all hover:scale-105"
                        aria-label="Próximo"
                    >
                        <ChevronRight size={22} />
                    </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { if (i !== currentIndex) transition(() => i); }}
                            className={`h-2 rounded-full transition-all duration-400 ${i === currentIndex ? 'w-8 bg-brand-500' : 'w-2 bg-slate-300'}`}
                            aria-label={`Depoimento ${i + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
