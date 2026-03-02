import React, { useState } from 'react';
import { ArrowRight, Calendar, Image as ImageIcon, Video, Clock, Heart } from 'lucide-react';

interface MemorialShowcaseProps {
    onStartCreate: () => void;
}

type MockTab = 'timeline' | 'biography' | 'media' | 'tributes';

const MemorialShowcase: React.FC<MemorialShowcaseProps> = ({ onStartCreate }) => {
    const [activeTab, setActiveTab] = useState<MockTab>('media');

    const tabs: { key: MockTab; label: string }[] = [
        { key: 'timeline', label: 'Linha do Tempo' },
        { key: 'biography', label: 'Biografia' },
        { key: 'media', label: 'Mídia' },
        { key: 'tributes', label: 'Homenagens' },
    ];

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
                                    <div className="w-full h-full overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

                                        {/* ---- MEMORIAL VIEW (matches MemorialViewPage.tsx exactly) ---- */}

                                        {/* Hero Cover — same style as MemorialViewPage */}
                                        <div className="h-32 w-full bg-slate-900 relative flex-shrink-0">
                                            <img
                                                src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop"
                                                alt=""
                                                className="w-full h-full object-cover opacity-90"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                                        </div>

                                        {/* Profile Header — same as MemorialViewPage */}
                                        <div className="text-center -mt-10 relative z-10 px-4">
                                            <div className="w-20 h-20 rounded-full border-[5px] border-white shadow-xl overflow-hidden bg-slate-100 mx-auto">
                                                <img
                                                    src="https://images.unsplash.com/photo-1551843073-4a9a5b6fcd5f?q=80&w=400&auto=format&fit=crop"
                                                    alt="Helena Ferreira"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <h3 className="text-[15px] font-bold text-slate-900 mt-2 tracking-tight">Helena Ferreira</h3>

                                            {/* Date badge — same style as MemorialViewPage */}
                                            <div className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-1 bg-brand-50 rounded-full text-brand-700 border border-brand-100">
                                                <Calendar size={10} />
                                                <span className="text-[9px] font-semibold">1945 - 2023</span>
                                            </div>
                                        </div>

                                        {/* Tabs — navigable */}
                                        <div className="flex gap-1.5 justify-center mt-3 px-3 flex-wrap">
                                            {tabs.map((tab) => (
                                                <button
                                                    key={tab.key}
                                                    onClick={() => setActiveTab(tab.key)}
                                                    className={`text-[8px] font-bold px-2.5 py-1.5 rounded-full border transition-all ${activeTab === tab.key
                                                        ? 'bg-slate-900 text-white border-slate-900'
                                                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                                                        }`}
                                                >
                                                    {tab.label}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Tab Content — scrollable inner area */}
                                        <div className="px-3 pt-3 pb-6">

                                            {/* ========= BIOGRAPHY TAB ========= */}
                                            {activeTab === 'biography' && (
                                                <div className="animate-fade-in">
                                                    {/* Biography Card — same style as MemorialViewPage */}
                                                    <div className="bg-white rounded-2xl shadow-md shadow-slate-100/80 border border-slate-100 p-4 relative overflow-hidden">
                                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 via-purple-400 to-pink-400" />
                                                        <p className="text-[10px] text-slate-700 leading-relaxed whitespace-pre-wrap font-serif mt-1">
                                                            "Helena foi uma mulher de fibra, amorosa e cheia de vida. Dedicou seus dias a cuidar da família e das suas amadas orquídeas. Seu bolo de fubá nas tardes de domingo deixará saudades eternas. Ensinou a todos nós o valor da honestidade e do trabalho duro."
                                                        </p>
                                                        <div className="mt-3 flex justify-center">
                                                            <div className="h-0.5 w-12 bg-slate-100 rounded-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* ========= TIMELINE TAB ========= */}
                                            {activeTab === 'timeline' && (
                                                <div className="animate-fade-in">
                                                    <div className="space-y-2 pl-3 border-l-2 border-slate-200 ml-1.5">
                                                        {[
                                                            { year: '1980', title: 'Nascimento', desc: 'Chegada ao mundo, trazendo alegria para a família.' },
                                                            { year: '1998', title: 'Formatura', desc: 'Conclusão dos estudos, um momento de muito orgulho.' },
                                                            { year: '2010', title: 'Viagem dos Sonhos', desc: 'A tão aguardada viagem com toda a família reunida.' },
                                                        ].map((ev, i) => (
                                                            <div key={i} className="relative pl-4">
                                                                <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-amber-400 border-2 border-white ring-1 ring-amber-200" />
                                                                <span className="text-[8px] font-bold text-amber-600">{ev.year}</span>
                                                                <h4 className="text-[10px] font-bold text-slate-800">{ev.title}</h4>
                                                                <p className="text-[9px] text-slate-500 leading-snug">{ev.desc}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* ========= MEDIA TAB ========= */}
                                            {activeTab === 'media' && (
                                                <div className="animate-fade-in">
                                                    {/* Photos section */}
                                                    <div className="flex items-center gap-1.5 mb-2">
                                                        <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center">
                                                            <ImageIcon size={8} className="text-blue-600" />
                                                        </div>
                                                        <span className="text-[9px] font-bold text-slate-800">Galeria de Fotos</span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-1.5 mb-4">
                                                        {[
                                                            'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=400&auto=format&fit=crop',
                                                            'https://images.unsplash.com/photo-1551843073-4a9a5b6fcd5f?q=80&w=400&auto=format&fit=crop',
                                                            'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400&auto=format&fit=crop',
                                                            'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=400&auto=format&fit=crop',
                                                        ].map((src, i) => (
                                                            <div key={i} className="aspect-square rounded-xl overflow-hidden shadow-sm group">
                                                                <img
                                                                    src={src}
                                                                    alt=""
                                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Videos section */}
                                                    <div className="flex items-center gap-1.5 mb-2">
                                                        <div className="w-4 h-4 bg-red-100 rounded flex items-center justify-center">
                                                            <Video size={8} className="text-red-600" />
                                                        </div>
                                                        <span className="text-[9px] font-bold text-slate-800">Vídeos</span>
                                                    </div>
                                                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-md aspect-video flex items-center justify-center">
                                                        <div className="text-center">
                                                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-1">
                                                                <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-0.5" />
                                                            </div>
                                                            <span className="text-[8px] text-white/60">viagem_familia.mp4</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* ========= TRIBUTES TAB ========= */}
                                            {activeTab === 'tributes' && (
                                                <div className="animate-fade-in space-y-2">
                                                    {[
                                                        { name: 'Maria Silva', text: 'Vó Helena, saudades eternas. Obrigada por tudo! ❤️' },
                                                        { name: 'Pedro S.', text: 'Sua memória vive em cada um de nós. Descanse em paz. 🕊️' },
                                                        { name: 'Ana Clara', text: 'Nunca vou esquecer seus bolos de domingo. Te amo para sempre.' },
                                                    ].map((tribute, i) => (
                                                        <div key={i} className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
                                                            <div className="flex items-center gap-2 mb-1.5">
                                                                <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                                                                    <Heart size={10} className="text-brand-600" />
                                                                </div>
                                                                <span className="text-[9px] font-bold text-slate-800">{tribute.name}</span>
                                                            </div>
                                                            <p className="text-[9px] text-slate-600 leading-snug">{tribute.text}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Home indicator bar */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-600 rounded-full" />
                            </div>

                            {/* Decorative blurs behind phone */}
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
