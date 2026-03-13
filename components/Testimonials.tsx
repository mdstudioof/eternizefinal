import React, { useEffect, useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
    {
        name: "Ana Clara S.",
        location: "São Paulo, SP",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
        text: "Chorando aqui 😭 Criei o memorial da minha mãe e toda vez que escaneio o QR Code sinto ela perto de mim. Obrigada por existir, EternizeQR!",
        stars: 5,
    },
    {
        name: "Ricardo M.",
        location: "Belo Horizonte, MG",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        text: "Coloquei na lápide do meu pai. Agora qualquer pessoa que visita pode ver toda a vida dele, as fotos, os vídeos. É mágico e emocionante.",
        stars: 5,
    },
    {
        name: "Fernanda L.",
        location: "Rio de Janeiro, RJ",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
        text: "Amei demais! Fiz para o meu avô e toda a família ficou emocionada. É uma forma linda de eternizar quem a gente ama ❤️",
        stars: 5,
    },
    {
        name: "Thiago R.",
        location: "Curitiba, PR",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
        text: "Nunca pensei que tecnologia poderia me emocionar tanto. O memorial do meu irmão ficou incrível. Uma homenagem que vai durar para sempre.",
        stars: 5,
    },
    {
        name: "Mariana P.",
        location: "Florianópolis, SC",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
        text: "Perdi meu cachorrinho há um mês. Criar o memorial pra ele foi um ato de amor. Super recomendo para quem quer guardar memórias de quem partiu.",
        stars: 5,
    },
];

const INTERVAL = 7000;

const Testimonials: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [fade, setFade] = useState(true);
    const [progress, setProgress] = useState(0);
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startProgress = () => {
        setProgress(0);
        if (progressRef.current) clearInterval(progressRef.current);
        const step = 100 / (INTERVAL / 50);
        progressRef.current = setInterval(() => {
            setProgress(p => {
                if (p >= 100) return 100;
                return p + step;
            });
        }, 50);
    };

    const startAuto = () => {
        if (autoRef.current) clearInterval(autoRef.current);
        autoRef.current = setInterval(() => {
            go((prev: number) => (prev + 1) % testimonials.length);
        }, INTERVAL);
    };

    useEffect(() => {
        startProgress();
        startAuto();
        return () => {
            if (progressRef.current) clearInterval(progressRef.current);
            if (autoRef.current) clearInterval(autoRef.current);
        };
    }, [current]);

    const go = (getNext: (prev: number) => number) => {
        setFade(false);
        setTimeout(() => {
            setCurrent(getNext);
            setFade(true);
        }, 300);
    };

    const goNext = () => {
        if (autoRef.current) clearInterval(autoRef.current);
        go((prev) => (prev + 1) % testimonials.length);
    };

    const goPrev = () => {
        if (autoRef.current) clearInterval(autoRef.current);
        go((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goTo = (i: number) => {
        if (i === current) return;
        if (autoRef.current) clearInterval(autoRef.current);
        go(() => i);
    };

    const t = testimonials[current];

    return (
        <section className="py-20 lg:py-28 relative overflow-hidden" style={{ backgroundColor: 'var(--color-dark-bg)' }}>
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[400px] h-[400px] bg-rose-400/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-brand-300 text-xs font-bold uppercase tracking-widest mb-4 border border-white/10 backdrop-blur-sm">
                        Depoimentos
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                        Quem já eternizou<br className="hidden sm:block" /> uma memória especial
                    </h2>
                </div>

                {/* Card */}
                <div
                    className="relative max-w-3xl mx-auto"
                    style={{
                        opacity: fade ? 1 : 0,
                        transform: fade ? 'translateY(0)' : 'translateY(10px)',
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                    }}
                >
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-10 relative overflow-hidden">
                        {/* Progress bar */}
                        <div className="absolute top-0 left-0 h-[2px] bg-white/5 w-full">
                            <div
                                className="h-full bg-gradient-to-r from-brand-400 to-rose-300 transition-none"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Quote icon */}
                        <div className="absolute top-6 right-6 md:top-8 md:right-8">
                            <Quote size={40} className="text-brand-500/20" />
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 mb-5">
                            {Array.from({ length: t.stars }).map((_, i) => (
                                <Star key={i} size={16} className="fill-rose-300 text-rose-300" />
                            ))}
                        </div>

                        {/* Text */}
                        <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 font-medium max-w-xl">
                            "{t.text}"
                        </p>

                        {/* Author row */}
                        <div className="flex items-center gap-4">
                            <img
                                src={t.photo}
                                alt={t.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-brand-500/40 shadow-lg"
                            />
                            <div>
                                <p className="font-bold text-white text-sm">{t.name}</p>
                                <p className="text-white/40 text-xs">{t.location}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation arrows */}
                    <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={goPrev}
                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-brand-400/50 hover:text-brand-300 hover:bg-white/5 transition-all"
                                aria-label="Anterior"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={goNext}
                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-brand-400/50 hover:text-brand-300 hover:bg-white/5 transition-all"
                                aria-label="Próximo"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>

                        {/* Dot indicators */}
                        <div className="flex gap-2">
                            {testimonials.map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    className={`rounded-full transition-all duration-300 ${i === current
                                        ? 'w-8 h-2 bg-brand-500'
                                        : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                                        }`}
                                    aria-label={`Ver depoimento de ${item.name}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
