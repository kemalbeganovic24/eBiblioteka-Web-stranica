import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, Bookmark, Menu, X, Search } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [quickQuery, setQuickQuery] = useState('');
    const { favoritesCount } = useFavorites();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleQuickSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (quickQuery.trim()) {
            navigate(`/biblioteka?pretraga=${encodeURIComponent(quickQuery.trim())}`);
            setQuickQuery('');
            setIsMobileMenuOpen(false);
        }
    };

    const navLinks = [
        { name: 'Početna', path: '/' },
        { name: 'Biblioteka', path: '/biblioteka' },
        { name: 'O biblioteci', path: '/o-biblioteci' },
        { name: 'Kontakt', path: '/kontakt' },
    ];

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-emerald-950/95 backdrop-blur-md shadow-lg py-3 border-b border-emerald-800/40 text-stone-100'
                    : 'bg-emerald-950 text-stone-100 py-4 border-b border-emerald-900/50'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-4">
                {/* Brand identity */}
                <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1">
                    <div className="w-10 h-10 rounded-lg bg-emerald-800 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-inner group-hover:scale-105 transition-transform">
                        <BookOpen className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex flex-col">
            <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-200 transition-colors">
              eBiblioteka
            </span>
                        <span className="text-[10px] uppercase tracking-wider text-emerald-200/80 font-medium">
              Bošnjačka zajednica  kulture Vitez
            </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `transition-colors duration-200 relative py-1 hover:text-amber-300 ${
                                    isActive ? 'text-amber-300 font-semibold' : 'text-emerald-100/90'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {link.name}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Search & Actions */}
                <div className="hidden md:flex items-center gap-3">
                    <form onSubmit={handleQuickSearch} className="relative">
                        <input
                            type="text"
                            placeholder="Pretraži katalog..."
                            value={quickQuery}
                            onChange={(e) => setQuickQuery(e.target.value)}
                            className="w-48 xl:w-64 pl-9 pr-4 py-1.5 text-xs rounded-full bg-emerald-900/70 border border-emerald-700/60 text-white placeholder-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:bg-emerald-900 transition-all"
                        />
                        <Search className="w-3.5 h-3.5 text-emerald-300/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </form>

                    <Link
                        to="/omiljene-knjige"
                        className="relative p-2 rounded-full text-emerald-200 hover:text-amber-300 hover:bg-emerald-900/60 transition-colors"
                        title="Omiljene knjige"
                        aria-label="Pregledaj omiljene knjige"
                    >
                        <Bookmark className="w-5 h-5" />
                        {favoritesCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-emerald-950 font-bold text-[10px] rounded-full flex items-center justify-center shadow-md">
                {favoritesCount}
              </span>
                        )}
                    </Link>

                    <Link
                        to="/biblioteka"
                        className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-emerald-950 font-semibold text-xs tracking-wide shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                    >
                        Katalog
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="flex md:hidden items-center gap-2">
                    <Link
                        to="/omiljene-knjige"
                        className="relative p-2 text-emerald-200 hover:text-amber-300"
                        aria-label="Omiljene knjige"
                    >
                        <Bookmark className="w-5 h-5" />
                        {favoritesCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-emerald-950 font-bold text-[9px] rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
                        )}
                    </Link>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-md text-emerald-200 hover:text-white hover:bg-emerald-900/50"
                        aria-label={isMobileMenuOpen ? 'Zatvori meni' : 'Otvori meni'}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {isMobileMenuOpen && (
                <div className="lg:hidden border-t border-emerald-900 bg-emerald-950 px-6 py-6 animate-fade-in shadow-2xl">
                    <form onSubmit={handleQuickSearch} className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Pretraži naslov, autora, COBISS..."
                            value={quickQuery}
                            onChange={(e) => setQuickQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg bg-emerald-900/80 border border-emerald-700 text-white placeholder-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                        <Search className="w-4 h-4 text-emerald-300/70 absolute left-3 top-1/2 -translate-y-1/2" />
                    </form>

                    <nav className="flex flex-col space-y-3">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                        isActive
                                            ? 'bg-emerald-900 text-amber-300 font-semibold'
                                            : 'text-stone-200 hover:bg-emerald-900/50 hover:text-white'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <Link
                            to="/omiljene-knjige"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-3 py-2 rounded-md text-base font-medium text-stone-200 hover:bg-emerald-900/50 hover:text-white flex items-center justify-between"
                        >
                            <span>Omiljene knjige</span>
                            {favoritesCount > 0 && (
                                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-emerald-950">
                  {favoritesCount}
                </span>
                            )}
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};