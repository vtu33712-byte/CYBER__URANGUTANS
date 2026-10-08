import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  MapPin, 
  FileText, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  ShieldCheck, 
  PlusCircle, 
  BarChart3, 
  Layers, 
  Menu, 
  X, 
  Sparkles,
  Leaf,
  Radio,
  SlidersHorizontal,
  ChevronDown,
  User
} from 'lucide-react';
import { anime } from '../animations/animeHelper';

export const Navbar = ({
  activePage,
  onNavigate,
  isLightMode,
  onToggleTheme,
  currentUserRole = 'citizen',
  onSwitchUserRole,
  notificationsCount = 2,
  onOpenNotifications
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
        if (navRef.current) {
          anime({
            targets: navRef.current,
            paddingTop: scrolled ? 10 : 18,
            paddingBottom: scrolled ? 10 : 18,
            duration: 350,
            ease: 'outQuad'
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const clean = searchQuery.trim().toUpperCase();
    if (clean.startsWith('CIV-') || !isNaN(clean)) {
      onNavigate('tracker', { searchCode: clean.startsWith('CIV-') ? clean : `CIV-${clean}` });
    } else {
      onNavigate('map', { filter: clean });
    }
    setSearchQuery('');
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'report', label: 'Report Issue', highlight: true, icon: PlusCircle },
    { id: 'my-reports', label: 'My Reports' },
    { id: 'tracker', label: 'Track Issue' },
    { id: 'map', label: 'City Map' },
    { id: 'officer', label: 'Command Center', badge: 'OPS' },
    { id: 'priority-queue', label: 'Queue' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'green-future', label: 'Eco City', icon: Leaf },
    { id: 'about', label: 'About' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[999] px-4 md:px-8 pointer-events-none">
      <div 
        ref={navRef}
        className={`max-w-7xl mx-auto my-3 pointer-events-auto rounded-2xl transition-all duration-300 ${
          isScrolled 
            ? 'glass-panel bg-slate-950/90 shadow-2xl border-cyan-500/30 py-2.5 px-4 md:px-6' 
            : 'glass-panel bg-slate-950/70 shadow-lg border-white/10 py-4 px-4 md:px-6'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center p-0.5 shadow-neon-emerald">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl tracking-wider text-slate-100 group-hover:text-cyan-400 transition-colors">
                  Civic<span className="text-emerald-400">Flow</span>
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  3D AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight hidden sm:block">
                Smarter Reports. Faster Response.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              const Icon = link.icon;

              if (link.highlight) {
                return (
                  <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:opacity-95 shadow-neon-emerald transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Report Issue</span>
                  </button>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-500/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {Icon && <Icon className="w-3 h-3 text-emerald-400" />}
                    {link.label}
                    {link.badge && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Search, Notifications, Role, Theme */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="CIV-001..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-28 focus:w-36 transition-all duration-300 bg-slate-900/80 border border-slate-700/80 focus:border-cyan-400 rounded-lg pl-7 pr-2 py-1 text-xs text-slate-200 placeholder-slate-500 outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 pointer-events-none" />
            </form>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-cyan-400 transition-colors"
              title="Realtime Alerts"
            >
              <Bell className="w-4 h-4" />
              {notificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {notificationsCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-amber-300 transition-colors"
              title="Toggle Day/Night Vision"
            >
              {isLightMode ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 text-xs font-semibold text-slate-200"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span className="capitalize hidden sm:inline">{currentUserRole}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-950 border border-cyan-500/30 shadow-2xl p-1.5 z-50 text-xs">
                  <div className="px-2 py-1 text-[10px] text-slate-400 font-mono uppercase">Simulation Persona</div>
                  <button
                    onClick={() => { onSwitchUserRole('citizen'); setIsRoleDropdownOpen(false); }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                      currentUserRole === 'citizen' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>Citizen (Maya)</span>
                    <span className="text-[10px] font-mono text-emerald-400">Reporter</span>
                  </button>
                  <button
                    onClick={() => { onSwitchUserRole('officer'); setIsRoleDropdownOpen(false); }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                      currentUserRole === 'officer' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>Officer (Ramesh)</span>
                    <span className="text-[10px] font-mono text-cyan-400">Command</span>
                  </button>
                  <button
                    onClick={() => { onSwitchUserRole('admin'); setIsRoleDropdownOpen(false); }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                      currentUserRole === 'admin' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>Engineer (Dr. Ren)</span>
                    <span className="text-[10px] font-mono text-purple-400">Neural AI</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-800/80 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between ${
                  activePage === link.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
