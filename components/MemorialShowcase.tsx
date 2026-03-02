import React from 'react';
import { ArrowRight } from 'lucide-react';

interface MemorialShowcaseProps {
    onStartCreate: () => void;
}

const MemorialShowcase: React.FC<MemorialShowcaseProps> = ({ onStartCreate }) => {
    return (
        <section className="bg-gradient-to-b from-white via-slate-50 to-white py-20 lg:py-28 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 sm:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left: Text Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-widest mb-6 border border-brand-100">
                            Memorial Digital
                        </span>

                        <h2
                            className="font-extrabold text-slate-900 tracking-tight mb-6"
                            style={{
                                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                lineHeight: '1.15',
                            }}
                        >
                            MEMORIAL<br />DIGITAL
                        </h2>

                        <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                            * Essas páginas podem incluir fotos, vídeos, textos e histórias, proporcionando um espaço onde as memórias podem ser acessadas e compartilhadas facilmente por familiares e amigos a qualquer momento com acesso à internet
                        </p>

                        <button
                            onClick={onStartCreate}
                            className="inline-flex items-center gap-3 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 group"
                        >
                            Saiba mais
                            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>

                    {/* Right: Phone Mockup */}
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <div className="relative">
                            {/* Phone Frame */}
                            <div
                                className="relative bg-slate-900 rounded-[3rem] p-3 shadow-2xl shadow-slate-900/30"
                                style={{ width: '300px' }}
                            >
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-2xl z-20" />

                                {/* Screen */}
                                <div
                                    className="bg-white rounded-[2.3rem] overflow-hidden relative"
                                    style={{ height: '580px' }}
                                >
                                    {/* Inner scroll content */}
                                    <div className="w-full h-full overflow-hidden">

                                        {/* Mini Navbar */}
                                        <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100 relative z-10">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 bg-brand-600 rounded-md flex items-center justify-center">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                                        <path d="M2 17l10 5 10-5" />
                                                        <path d="M2 12l10 5 10-5" />
                                                    </svg>
                                                </div>
                                                <span className="text-[11px] font-bold text-slate-900 tracking-tight">EternizeQR</span>
                                            </div>
                                            <div className="flex gap-1">
                                                <div className="w-5 h-[2px] bg-slate-400 rounded" />
                                                <div className="w-5 h-[2px] bg-slate-400 rounded" />
                                            </div>
                                        </div>

                                        {/* Cover Image */}
                                        <div className="h-36 bg-gradient-to-b from-brand-900 to-slate-800 relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop"
                                                alt=""
                                                className="w-full h-full object-cover opacity-80"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                                        </div>

                                        {/* Profile Circle */}
                                        <div className="flex flex-col items-center -mt-12 relative z-10 px-4">
                                            <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-100">
                                                <img
                                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                                                    alt="Memorial"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <p className="text-[10px] text-slate-400 mt-3 font-medium">Em memória de</p>
                                            <h3 className="text-sm font-bold text-slate-900 mt-0.5">Lucas Augusto Silva</h3>

                                            <div className="flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-brand-50 rounded-full text-brand-700 border border-brand-100">
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                    <line x1="16" y1="2" x2="16" y2="6" />
                                                    <line x1="8" y1="2" x2="8" y2="6" />
                                                    <line x1="3" y1="10" x2="21" y2="10" />
                                                </svg>
                                                <span className="text-[9px] font-semibold">Vida: 21 de agosto de 1984 - 17 de abril de 2016</span>
                                            </div>

                                            <p className="text-[9px] text-slate-500 text-center mt-2 leading-relaxed px-2 line-clamp-2">
                                                Se o amor pudesse ter salvado você, você teria vivido para sempre.
                                            </p>
                                        </div>

                                        {/* Tabs */}
                                        <div className="flex gap-1.5 justify-center mt-3 px-3">
                                            {['Linha do Tempo', 'Biografia', 'Mídia', 'Homenagens'].map((tab, i) => (
                                                <button
                                                    key={tab}
                                                    className={`text-[8px] font-bold px-2 py-1.5 rounded-full border transition-all ${i === 2
                                                            ? 'bg-slate-900 text-white border-slate-900'
                                                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                                                        }`}
                                                >
                                                    {tab}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Mini Gallery Grid */}
                                        <div className="grid grid-cols-3 gap-1.5 px-3 mt-3">
                                            {[
                                                'https://images.unsplash.com/photo-1529156069898-49bada10bca3?w=200&h=200&fit=crop',
                                                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
                                                'https://images.unsplash.com/photo-1519098901909-b1553a1190af?w=200&h=200&fit=crop',
                                                'https://images.unsplash.com/photo-1517331272969-b1557b94f3c0?w=200&h=200&fit=crop',
                                                'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=200&h=200&fit=crop',
                                                'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=200&h=200&fit=crop',
                                            ].map((src, i) => (
                                                <div key={i} className="aspect-square rounded-lg overflow-hidden">
                                                    <img src={src} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Home indicator bar */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-600 rounded-full" />
                            </div>

                            {/* Decorative elements behind phone */}
                            <div className="absolute -top-8 -right-8 w-32 h-32 bg-brand-600/10 rounded-full blur-2xl -z-10" />
                            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl -z-10" />
                            <div className="absolute top-1/2 -right-4 w-20 h-20 bg-brand-400/10 rounded-full blur-xl -z-10" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MemorialShowcase;
