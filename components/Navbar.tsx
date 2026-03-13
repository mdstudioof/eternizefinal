import React, { useState } from 'react';
import { Menu, X, QrCode, LogOut, User, Loader2, LayoutDashboard, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSiteConfig } from '../context/SiteConfigContext';

interface NavbarProps {
  onOpenCreateModal: () => void;
  onOpenLoginModal: () => void;
  onOpenDashboard: () => void;
  onOpenExplore: () => void;
  onLogoClick?: () => void;
  onOpenAdmin?: () => void;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onOpenCreateModal,
  onOpenLoginModal,
  onOpenDashboard,
  onOpenExplore,
  onLogoClick,
  onOpenAdmin,
  onLogout
}) => {
  const { user, isAuthenticated, isAdmin, logout, isLoading } = useAuth();
  const { config } = useSiteConfig();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Mobile: Only floating hamburger button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white bg-black/30 backdrop-blur-sm hover:bg-black/50 p-2.5 rounded-xl transition-colors shadow-lg"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

    <nav className="hidden md:block sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo — hidden on mobile, visible on desktop */}
          <div
            onClick={onLogoClick}
            className="hidden md:flex flex-shrink-0 items-center gap-2 cursor-pointer"
          >
            {config.logo_url ? (
              <img src={config.logo_url} alt="Logo" className="h-10 object-contain" />
            ) : (
              <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                <QrCode size={24} />
              </div>
            )}
            <span className="text-2xl font-bold text-slate-900 tracking-tight">EternizeQR</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" onClick={(e) => { e.preventDefault(); onLogoClick && onLogoClick(); }} className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Início</a>
            {isAuthenticated && (
              <button onClick={onOpenDashboard} className="text-slate-600 hover:text-brand-600 font-medium transition-colors">
                Meus Memoriais
              </button>
            )}
            <button onClick={onOpenExplore} className="text-slate-600 hover:text-brand-600 font-medium transition-colors">
              Explorar
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <div className="h-10 w-24 bg-slate-100 animate-pulse rounded-full"></div>
            ) : isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full border border-slate-200 hover:border-brand-300 hover:bg-slate-50 transition-all"
                >
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-slate-200 object-cover" />
                  <span className="font-medium text-slate-700 text-sm">{user.name.split(' ')[0]}</span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 animate-fade-in z-50">
                    <div className="px-4 py-2 border-b border-slate-50 mb-1">
                      <p className="text-xs text-slate-500">Logado como</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        onOpenDashboard();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-600 flex items-center gap-2"
                    >
                      <LayoutDashboard size={16} /> Meus Memoriais
                    </button>
                    {onOpenAdmin && isAdmin && (
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          onOpenAdmin();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-600 flex items-center gap-2"
                      >
                        <Shield size={16} /> Admin
                      </button>
                    )}
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-600 flex items-center gap-2">
                      <User size={16} /> Perfil
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                        if (onLogout) onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut size={16} /> Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="text-slate-600 hover:text-brand-600 font-medium transition-colors px-4 py-2"
              >
                Entrar
              </button>
            )}

            <button
              onClick={onOpenCreateModal}
              className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-brand-200 hover:shadow-brand-300 transform hover:-translate-y-0.5"
            >
              Criar Memorial
            </button>
          </div>

        </div>
      </div>
    </nav>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-md animate-fade-in pt-16">
          <div className="px-4 py-4 space-y-2">

            {/* Nav Links */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); closeMobileMenu(); onLogoClick && onLogoClick(); }}
              className="block px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors"
            >
              Início
            </a>
            {isAuthenticated && (
              <button
                onClick={() => { closeMobileMenu(); onOpenDashboard(); }}
                className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors flex items-center gap-3"
              >
                <LayoutDashboard size={18} /> Meus Memoriais
              </button>
            )}
            <button
              onClick={() => { closeMobileMenu(); onOpenExplore(); }}
              className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors"
            >
              Explorar
            </button>

            {/* Admin */}
            {onOpenAdmin && isAdmin && (
              <button
                onClick={() => { closeMobileMenu(); onOpenAdmin(); }}
                className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors flex items-center gap-3"
              >
                <Shield size={18} /> Admin
              </button>
            )}

            {/* Divider */}
            <div className="border-t border-slate-100 my-2"></div>

            {/* Auth Actions */}
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 size={20} className="animate-spin text-slate-400" />
              </div>
            ) : isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full bg-slate-200 object-cover" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    closeMobileMenu();
                    logout();
                    if (onLogout) onLogout();
                  }}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors flex items-center gap-3"
                >
                  <LogOut size={18} /> Sair
                </button>
              </>
            ) : (
              <button
                onClick={() => { closeMobileMenu(); onOpenLoginModal(); }}
                className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors"
              >
                Entrar
              </button>
            )}

            {/* CTA */}
            <button
              onClick={() => { closeMobileMenu(); onOpenCreateModal(); }}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-brand-200 text-center mt-2"
            >
              Criar Memorial
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;