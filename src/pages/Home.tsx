import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, BookOpen, Layers, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { libraryService } from '../services/libraryServices';
import { BookCard } from '../components/BookCard';
import { useFavorites } from '../hooks/useFavorites';

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const [heroSearch, setHeroSearch] = useState('');
    const { isFavorite, toggleFavorite } = useFavorites();

    const stats = libraryService.getStats();
    const featuredBooks = libraryService.getFeaturedBooks(4);
    const genres = libraryService.getGenres();

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (heroSearch.trim()) {
            navigate(`/biblioteka?pretraga=${encodeURIComponent(heroSearch.trim())}`);
        } else {
            navigate('/biblioteka');
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-stone-900">
            {/* Hero Section */}
            <section className="relative bg-emerald-950 text-white overflow-hidden py-20 lg:py-28 border-b border-emerald-900/80">
                {/* Subtle geometric ornamentation pattern */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1.2px,transparent_1.2px)] [background-size:20px_20px]"
                    aria-hidden="true"
                />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-800/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-amber-400/30 text-amber-300 text-xs font-medium mb-6">
                            <span>Digitalni fond Bošnjačke zajednice – Općinsko društvo Vitez</span>
                        </div>

                        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
                            Znanje koje povezuje generacije.
                        </h1>

                        <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed mb-8 font-light">
                            Dobrodošli u zvaničnu elektronsku biblioteku — mjesto susreta bošnjačke i bosanskohercegovačke književnosti, historiografije, zavičajne baštine Lašvanske doline i modernih bibliotečkih kataloga.
                        </p>

                        {/* Prominent Search Bar */}
                        <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mb-8">
                            <div className="flex items-center bg-white rounded-xl shadow-2xl p-2 border border-emerald-800/30">
                                <Search className="w-5 h-5 text-stone-400 ml-3 mr-2 shrink-0" />
                                <input
                                    type="text"
                                    value={heroSearch}
                                    onChange={(e) => setHeroSearch(e.target.value)}
                                    placeholder="Pretraži po naslovu, autoru, COBISS broju ili izdavaču..."
                                    className="w-full text-stone-800 text-sm sm:text-base placeholder-stone-400 bg-transparent focus:outline-none px-2"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-semibold text-sm rounded-lg transition-all duration-200 shrink-0 shadow-sm"
                                >
                                    Pronađi knjigu
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            </section>

            {/* Dataset Verification & Transparency Banner */}
            <section className="bg-emerald-900 text-emerald-100 py-4 border-b border-emerald-800/80">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>
              Verifikovani bibliotečki fond: <strong>{stats.validBooksCount} obrađenih naslova</strong>
            </span>
                    </div>
                    <div className="flex items-center gap-6 text-xs text-emerald-200">
                        <span><strong>{stats.genresCount}</strong> književnih rodova</span>
                        <span><strong>{stats.publishersCount}</strong> izdavačkih kuća</span>
                        <Link to="/biblioteka" className="text-amber-300 hover:underline font-semibold flex items-center gap-1">
                            Otvori katalog <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Books Section */}
            <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest block mb-2">
              Preporučeni naslovi
            </span>
                        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
                            Izdvojeno iz naše biblioteke!
                        </h2>
                    </div>
                    <Link
                        to="/biblioteka"
                        className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                    >
                        Pogledaj sve knjige ({stats.validBooksCount})
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredBooks.map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                            isFavorite={isFavorite(book.id)}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            </section>

            {/* Dynamic Genres Explorer */}
            <section className="py-16 bg-stone-100/70 border-y border-stone-200/80">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-widest block mb-2">
              Književne kategorije
            </span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                            Istražite po književnom žanru
                        </h2>
                        <p className="text-sm text-stone-600 mt-2">
                            Kategorije generisane dinamički iz stvarnih žanrovskih zapisa našeg kataloga.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {genres.map((genre) => (
                            <Link
                                key={genre}
                                to={`/biblioteka?zanr=${encodeURIComponent(genre)}`}
                                className="group flex flex-col p-4 bg-white rounded-xl border border-stone-200 shadow-xs hover:border-emerald-700/60 hover:shadow-md transition-all duration-200"
                            >
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3 group-hover:bg-emerald-800 group-hover:text-amber-300 transition-colors">
                                    <BookOpen className="w-4 h-4" />
                                </div>
                                <h3 className="font-serif font-bold text-sm text-stone-800 group-hover:text-emerald-800 transition-colors line-clamp-1">
                                    {genre}
                                </h3>
                                <span className="text-xs text-stone-400 mt-1 flex items-center gap-1 group-hover:text-stone-600">
                  Pregledaj radove &rarr;
                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Institutional Mission & Context */}
            <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
                <div className="bg-emerald-950 text-white rounded-2xl p-8 sm:p-12 lg:p-16 border border-emerald-800/80 relative overflow-hidden shadow-xl">
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900 border border-emerald-700 text-amber-300 text-xs">
                                <Award className="w-3.5 h-3.5" />
                                <span>Očuvanje baštine Bošnjaka</span>
                            </div>
                            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
                                Elektronska biblioteka Bošnjačke zajednice općinsko društvo Vitez
                            </h2>
                            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-light">
                                Ova web platforma predstavlja komplementarno digitalno okruženje našim nativnim Android (Kotlin) i iOS (Swift) aplikacijama. Nastala je s ciljem da naša biblioteka općinskog društva Vitez učini dostupnim svakom čitaocu, učeniku, studentu i istraživaču.
                            </p>
                            <div className="pt-2 flex flex-wrap gap-4">
                                <Link
                                    to="/o-biblioteci"
                                    className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-sm transition-all"
                                >
                                    Saznajte više o biblioteci
                                </Link>
                                <Link
                                    to="/kontakt"
                                    className="px-6 py-3 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white border border-emerald-700 text-sm font-semibold transition-all"
                                >
                                    Kontaktirajte nas
                                </Link>
                            </div>
                        </div>

                        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                            <div className="bg-emerald-900/60 border border-emerald-800/80 p-5 rounded-xl">
                                <Layers className="w-6 h-6 text-amber-400 mb-2" />
                                <h4 className="font-bold text-base text-white">COBISSBH i CIPHR</h4>
                                <p className="text-xs text-emerald-200/80 mt-1">
                                    Stručno bibliografski obrađeni zapisi usklađeni sa nacionalnim standardima.
                                </p>
                            </div>
                            <div className="bg-emerald-900/60 border border-emerald-800/80 p-5 rounded-xl">
                                <Award className="w-6 h-6 text-amber-400 mb-2" />
                                <h4 className="font-bold text-base text-white">Zavičajna zbirka</h4>
                                <p className="text-xs text-emerald-200/80 mt-1">
                                    Poseban fokus na izdanja o Vitezu, regiji i bosanskoj historiji.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};