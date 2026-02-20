import React, { useEffect, useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

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
        <section className="bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
            <div className="max-w-5xl mx-auto px-6 sm:px-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-widest mb-4 border border-brand-100">
                        Depoimentos
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                        Quem já eternizou<br className="hidden sm:block" /> uma memória especial
                    </h2>
                </div>

                {/* Card */}
                <div
                    className="relative bg-white rounded-3xl shadow-2xl shadow-slate-200/70 border border-slate-100 overflow-hidden"
                    style={{
                        opacity: fade ? 1 : 0,
                        transform: fade ? 'translateY(0)' : 'translateY(10px)',
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                    }}
                >
                    {/* Barra de progresso no topo */}
                    <div className="absolute top-0 left-0 h-[3px] bg-slate-100 w-full z-10">
                        <div
                            className="h-full bg-gradient-to-r from-brand-400 to-purple-400 transition-none"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row">
                        {/* Foto — coluna esquerda em desktop */}
                        <div className="md:w-56 lg:w-64 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-brand-600 to-purple-700 p-8 md:rounded-none">
                            <img
                                src={t.photo}
                                alt={t.name}
                                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white/30 shadow-2xl"
                            />
                        </div>

                        {/* Conteúdo */}
                        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                            {/* Stars */}
                            <div className="flex gap-1 mb-5">
                                {Array.from({ length: t.stars }).map((_, i) => (
                                    <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            {/* Texto */}
                            <p className="text-slate-700 text-lg md:text-xl leading-relaxed mb-6 font-medium">
                                "{t.text}"
                            </p>

                            {/* Autor + navegação */}
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <p className="font-bold text-slate-900 text-base">{t.name}</p>
                                    <p className="text-slate-400 text-sm">{t.location}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={goPrev}
                                        className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 transition-all"
                                        aria-label="Anterior"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button
                                        onClick={goNext}
                                        className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 transition-all"
                                        aria-label="Próximo"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thumbnails / Dots com foto */}
                <div className="flex justify-center gap-3 mt-8">
                    {testimonials.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`rounded-full transition-all duration-300 border-2 overflow-hidden ${i === current
                                    ? 'w-11 h-11 border-brand-500 shadow-md shadow-brand-200'
                                    : 'w-8 h-8 border-transparent opacity-50 hover:opacity-80'
                                }`}
                            aria-label={`Ver depoimento de ${item.name}`}
                        >
                            <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
