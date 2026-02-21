import React, { useState } from 'react';
import { Plus, Trash2, Users, UserCircle2, ChevronDown } from 'lucide-react';
import { FamilyTreeMember, FamilyRole } from '../types';

interface FamilyTreeEditorProps {
    members: FamilyTreeMember[];
    onChange: (members: FamilyTreeMember[]) => void;
    honoredName?: string;
}

// Role configuration: color, emoji, generation group
const ROLE_CONFIG: Record<FamilyRole, { color: string; bg: string; border: string; emoji: string; group: number }> = {
    'Avô': { color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', emoji: '👴', group: 0 },
    'Avó': { color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', emoji: '👵', group: 0 },
    'Tio(a)': { color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', emoji: '🧑', group: 0 },
    'Pai': { color: 'text-violet-700', bg: 'bg-violet-50', border: 'border-violet-200', emoji: '👨', group: 1 },
    'Mãe': { color: 'text-violet-700', bg: 'bg-violet-50', border: 'border-violet-200', emoji: '👩', group: 1 },
    'Cônjuge': { color: 'text-pink-700', bg: 'bg-pink-50', border: 'border-pink-200', emoji: '💑', group: 1 },
    'Irmão/Irmã': { color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', emoji: '🧑‍🤝‍🧑', group: 2 },
    'Filho(a)': { color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', emoji: '👶', group: 2 },
    'Neto(a)': { color: 'text-teal-700', bg: 'bg-teal-50', border: 'border-teal-200', emoji: '🧒', group: 2 },
    'Sobrinho(a)': { color: 'text-cyan-700', bg: 'bg-cyan-50', border: 'border-cyan-200', emoji: '👦', group: 2 },
    'Outro': { color: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200', emoji: '👤', group: 1 },
};

const ALL_ROLES: FamilyRole[] = [
    'Avô', 'Avó', 'Tio(a)', 'Pai', 'Mãe', 'Cônjuge',
    'Irmão/Irmã', 'Filho(a)', 'Neto(a)', 'Sobrinho(a)', 'Outro'
];

const GROUP_LABELS: Record<number, string> = {
    0: 'Geração Anterior',
    1: 'Mesma Geração',
    2: 'Próxima Geração',
};

const EMPTY_FORM = { name: '', role: 'Pai' as FamilyRole, birthYear: '', deathYear: '', notes: '' };

const FamilyTreeEditor: React.FC<FamilyTreeEditorProps> = ({ members, onChange, honoredName }) => {
    const [form, setForm] = useState(EMPTY_FORM);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [errors, setErrors] = useState<{ name?: string }>({});

    const handleAdd = () => {
        if (!form.name.trim()) {
            setErrors({ name: 'Nome é obrigatório.' });
            return;
        }
        setErrors({});

        const newMember: FamilyTreeMember = {
            id: Math.random().toString(36).substr(2, 9),
            name: form.name.trim(),
            role: form.role,
            birthYear: form.birthYear || undefined,
            deathYear: form.deathYear || undefined,
            notes: form.notes || undefined,
            order: members.length,
        };

        onChange([...members, newMember]);
        setForm(EMPTY_FORM);
        setIsFormOpen(false);
    };

    const handleRemove = (id: string) => {
        onChange(members.filter(m => m.id !== id));
    };

    // Group members by generation
    const grouped: Record<number, FamilyTreeMember[]> = { 0: [], 1: [], 2: [] };
    members.forEach(m => {
        const grp = ROLE_CONFIG[m.role]?.group ?? 1;
        grouped[grp].push(m);
    });

    const hasMembers = members.length > 0;

    return (
        <div className="space-y-6">

            {/* Visual Tree */}
            {hasMembers && (
                <div className="relative">
                    {/* Tree visualization */}
                    {[0, 1, 2].map(grp => {
                        const grpMembers = grouped[grp];
                        if (grpMembers.length === 0) return null;
                        return (
                            <div key={grp} className="mb-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        {GROUP_LABELS[grp]}
                                    </span>
                                    <div className="flex-1 h-px bg-slate-100" />
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {grpMembers.map(member => {
                                        const cfg = ROLE_CONFIG[member.role] ?? ROLE_CONFIG['Outro'];
                                        return (
                                            <div
                                                key={member.id}
                                                className={`relative group flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 ${cfg.bg} ${cfg.border} min-w-[100px] max-w-[140px] text-center transition-all hover:shadow-md`}
                                            >
                                                {/* Remove button */}
                                                <button
                                                    onClick={() => handleRemove(member.id)}
                                                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md flex items-center justify-center hover:bg-red-600"
                                                >
                                                    <span className="text-[10px] font-bold leading-none">×</span>
                                                </button>

                                                {/* Avatar emoji */}
                                                <div className={`w-12 h-12 rounded-full ${cfg.bg} border-2 ${cfg.border} flex items-center justify-center text-2xl shadow-sm`}>
                                                    {cfg.emoji}
                                                </div>

                                                {/* Role badge */}
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                                                    {member.role}
                                                </span>

                                                {/* Name */}
                                                <p className="text-sm font-bold text-slate-800 leading-tight line-clamp-2">
                                                    {member.name}
                                                </p>

                                                {/* Years */}
                                                {(member.birthYear || member.deathYear) && (
                                                    <p className="text-[11px] text-slate-500 font-medium">
                                                        {member.birthYear || '?'}
                                                        {member.deathYear ? ` – ${member.deathYear}` : ''}
                                                    </p>
                                                )}

                                                {/* Notes tooltip */}
                                                {member.notes && (
                                                    <p className="text-[10px] text-slate-400 italic line-clamp-1">{member.notes}</p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Connector line between generations */}
                                {grp < 2 && grouped[grp + 1]?.length > 0 && (
                                    <div className="flex justify-center mt-3">
                                        <div className="w-0.5 h-5 bg-slate-200 rounded-full" />
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* The honored person (center) */}
                    <div className="flex justify-center my-2">
                        <div className="relative flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 bg-brand-50 border-brand-300 min-w-[120px] text-center shadow-lg shadow-brand-100">
                            <div className="absolute -top-2 -right-2">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-600 text-white shadow">
                                    Homenageado
                                </span>
                            </div>
                            <div className="w-14 h-14 rounded-full bg-brand-100 border-2 border-brand-300 flex items-center justify-center text-3xl shadow-inner">
                                🕊️
                            </div>
                            <p className="text-sm font-bold text-brand-800 leading-tight">
                                {honoredName || 'Ente Querido'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty state */}
            {!hasMembers && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 bg-violet-50 rounded-full flex items-center justify-center text-3xl mb-4 border-2 border-violet-100">
                        🌳
                    </div>
                    <h3 className="text-slate-700 font-bold text-lg mb-1">Árvore vazia</h3>
                    <p className="text-slate-400 text-sm max-w-xs">
                        Adicione familiares abaixo para montar a árvore genealógica do memorial.
                    </p>
                </div>
            )}

            {/* Add Member Form */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <button
                    onClick={() => setIsFormOpen(p => !p)}
                    className={`w-full flex items-center justify-between px-6 py-4 font-bold transition-colors ${isFormOpen ? 'bg-violet-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-violet-50 hover:text-violet-700'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <Plus size={18} />
                        <span>Adicionar Familiar</span>
                    </div>
                    <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${isFormOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {isFormOpen && (
                    <div className="p-6 bg-white border-t border-slate-200 space-y-4 animate-fade-in">
                        {/* Role selector */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                Grau de Parentesco
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {ALL_ROLES.map(role => {
                                    const cfg = ROLE_CONFIG[role];
                                    const isSelected = form.role === role;
                                    return (
                                        <button
                                            key={role}
                                            type="button"
                                            onClick={() => setForm(p => ({ ...p, role }))}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${isSelected
                                                    ? `${cfg.bg} ${cfg.color} ${cfg.border} shadow-sm scale-105`
                                                    : 'bg-white text-slate-500 border-slate-200 hover:border-violet-300 hover:text-violet-600'
                                                }`}
                                        >
                                            <span>{cfg.emoji}</span>
                                            {role}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Name field */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                Nome Completo <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Ex: João da Silva"
                                value={form.name}
                                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none transition-all ${errors.name
                                        ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200'
                                        : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-violet-400 focus:ring-4 focus:ring-violet-100'
                                    }`}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        {/* Birth / Death years */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Ano de Nascimento
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: 1945"
                                    maxLength={4}
                                    value={form.birthYear}
                                    onChange={e => setForm(p => ({ ...p, birthYear: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium outline-none focus:bg-white focus:border-violet-400 focus:ring-4 focus:ring-violet-100 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Ano de Falecimento
                                </label>
                                <input
                                    type="text"
                                    placeholder="Deixe vazio se vivo"
                                    maxLength={4}
                                    value={form.deathYear}
                                    onChange={e => setForm(p => ({ ...p, deathYear: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium outline-none focus:bg-white focus:border-violet-400 focus:ring-4 focus:ring-violet-100 transition-all"
                                />
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                Observações (opcional)
                            </label>
                            <input
                                type="text"
                                placeholder="Ex: Morava em São Paulo, era professor..."
                                value={form.notes}
                                onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium outline-none focus:bg-white focus:border-violet-400 focus:ring-4 focus:ring-violet-100 transition-all"
                            />
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => { setIsFormOpen(false); setForm(EMPTY_FORM); setErrors({}); }}
                                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleAdd}
                                className="flex-1 py-3 rounded-xl bg-violet-600 text-white font-bold text-sm hover:bg-violet-700 transition-all shadow-lg shadow-violet-200 flex items-center justify-center gap-2"
                            >
                                <Plus size={16} />
                                Adicionar à Árvore
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Members count */}
            {hasMembers && (
                <p className="text-xs text-center text-slate-400 font-medium">
                    <Users size={12} className="inline mr-1" />
                    {members.length} {members.length === 1 ? 'familiar adicionado' : 'familiares adicionados'}
                </p>
            )}
        </div>
    );
};

export default FamilyTreeEditor;
