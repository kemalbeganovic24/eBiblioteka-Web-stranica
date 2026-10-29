import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RotateCcw, BookOpen, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { libraryService } from '../services/libraryServices';
import { BookCard } from '../components/BookCard';
import { useFavorites } from '../hooks/useFavorites';
import { FilterState } from '../types/library';

const ITEMS_PER_PAGE = 8;

export const Catalogue: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { isFavorite, toggleFavorite } = useFavorites();

    const [filters, setFilters] = useState<FilterState>({
        searchQuery: searchParams.get('pretraga') || '',
        selectedGenre: searchParams.get('zanr') || 'all',
        selectedPublisher: searchParams.get('izdavac') || 'all',
        selectedLanguage: 'all',
        selectedYearRange: 'all',
        sortBy: 'title_asc',
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    useEffect(() => {
        const queryParam = searchParams.get('pretraga');
        const genreParam = searchParams.get('zanr');
        const pubParam = searchParams.get('izdavac');

        setFilters(prev => ({
            ...prev,
            searchQuery: queryParam !== null ? queryParam : prev.searchQuery,
            selectedGenre: genreParam !== null ? genreParam : prev.selectedGenre,
            selectedPublisher: pubParam !== null ? pubParam : prev.selectedPublisher,
        }));
        setCurrentPage(1);
    }, [searchParams]);

    const genres = useMemo(() => libraryService.getGenres(), []);
    const publishers = useMemo(() => libraryService.getPublishers(), []);

    const filteredBooks = useMemo(() => {
        return libraryService.searchAndFilter({
            query: filters.searchQuery,
            genre: filters.selectedGenre,
            publisher: filters.selectedPublisher,
            language: filters.selectedLanguage,
            yearRange: filters.selectedYearRange,
            sortBy: filters.sortBy,
        });
    }, [filters]);

    const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE) || 1;

    const paginatedBooks = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredBooks.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredBooks, currentPage]);

    const handleFilterChange = (key: keyof FilterState, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1);

        const newParams = new URLSearchParams(searchParams);
        if (key === 'searchQuery') {
            if (value) newParams.set('pretraga', value);
            else newParams.delete('pretraga');
        }
        if (key === 'selectedGenre') {
            if (value !== 'all') newParams.set('zanr', value);
            else newParams.delete('zanr');
        }
        setSearchParams(newParams, { replace: true });
    };

    const handleResetFilters = () => {
        setFilters({
            searchQuery: '',
            selectedGenre: 'all',
            selectedPublisher: 'all',
            selectedLanguage: 'all',
            selectedYearRange: 'all',
            sortBy: 'title_asc',
        });
        setSearchParams({}, { replace: true });
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                {/* Header Breadcrumb & Title */}
                <div className="mb-8">
                    <nav className="text-xs text-stone-500 mb-2">
                        <span>Početna</span> / <span className="text-emerald-800 font-semibold">Bibliotečki katalog</span>
                    </nav>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
                        <div>
                            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                                Bibliotečki katalog
                            </h1>
                            <p className="text-sm text-stone-600 mt-1">
                                Pretražujte cjelokupan fond sa podrškom za pretragu bez dijakritika (č, ć, ž, š, đ).
                            </p>
                        </div>
                        <button
                            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                            className="md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-950 text-white text-xs font-semibold"
                        >
                            <Filter className="w-4 h-4 text-amber-400" />
                            <span>Filteri ({filteredBooks.length})</span>
                        </button>
                    </div>
                </div>

                {/* Layout Grid: Sidebar Filters + Main Catalogue */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    {/* Desktop & Mobile Filters */}
                    <aside
                        className={`lg:block ${
                            isMobileFilterOpen
                                ? 'fixed inset-0 z-50 bg-black/50 p-4 flex justify-end'
                                : 'hidden'
                        }`}
                    >
                        <div
                            className={`bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-6 w-full ${
                                isMobileFilterOpen ? 'max-w-sm h-full overflow-y-auto' : ''
                            }`}
                        >
                            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                                <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-emerald-800" />
                                    Filteri i pretraga
                                </h3>
                                <button
                                    onClick={handleResetFilters}
                                    className="text-xs text-amber-700 hover:text-amber-900 flex items-center gap-1 font-medium"
                                    title="Poništi sve filtere"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    Poništi
                                </button>
                            </div>

                            {/* Text Search Input */}
                            <div>
                                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                                    Ključna riječ / autor / COBISS
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={filters.searchQuery}
                                        onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                                        placeholder="Unesite pojam..."
                                        className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/50"
                                    />
                                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>

                            {/* Genre Filter */}
                            <div>
                                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                                    Književni žanr
                                </label>
                                <select
                                    value={filters.selectedGenre}
                                    onChange={(e) => handleFilterChange('selectedGenre', e.target.value)}
                                    className="w-full p-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/50 bg-white"
                                >
                                    <option value="all">Svi žanrovi ({genres.length})</option>
                                    {genres.map((g) => (
                                        <option key={g} value={g}>
                                            {g}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Publisher Filter */}
                            <div>
                                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                                    Izdavač
                                </label>
                                <select
                                    value={filters.selectedPublisher}
                                    onChange={(e) => handleFilterChange('selectedPublisher', e.target.value)}
                                    className="w-full p-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/50 bg-white"
                                >
                                    <option value="all">Svi izdavači ({publishers.length})</option>
                                    {publishers.map((p) => (
                                        <option key={p} value={p}>
                                            {p}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Year Filter */}
                            <div>
                                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                                    Period izdanja
                                </label>
                                <select
                                    value={filters.selectedYearRange}
                                    onChange={(e) => handleFilterChange('selectedYearRange', e.target.value)}
                                    className="w-full p-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/50 bg-white"
                                >
                                    <option value="all">Svi periodi</option>
                                    <option value="before_1950">Prije 1950. (Klasici)</option>
                                    <option value="1950_1990">1950 – 1990.</option>
                                    <option value="1991_2010">1991 – 2010.</option>
                                    <option value="after_2010">Nakon 2010. (Savremena)</option>
                                </select>
                            </div>

                            {isMobileFilterOpen && (
                                <button
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="w-full py-2.5 bg-emerald-900 text-white rounded-lg text-xs font-bold"
                                >
                                    Prikaži rezultate ({filteredBooks.length})
                                </button>
                            )}
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="lg:col-span-3 space-y-6">
                        {/* Control Bar: Result count & Sort */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
                            <span className="text-xs text-stone-600">
                                Prikazano <strong>{filteredBooks.length}</strong> od ukupno {libraryService.getStats().validBooksCount} naslova
                            </span>

                            <div className="flex items-center gap-2">
                                <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
                                <span className="text-xs text-stone-500 font-medium">Sortiraj:</span>
                                <select
                                    value={filters.sortBy}
                                    onChange={(e) => handleFilterChange('sortBy', e.target.value as FilterState['sortBy'])}
                                    className="text-xs border border-stone-300 rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-700/40 bg-white"
                                >
                                    <option value="title_asc">Naslov: A – Z</option>
                                    <option value="title_desc">Naslov: Z – A</option>
                                    <option value="author_asc">Autor: A – Z</option>
                                    <option value="year_desc">Godina: novije prema starijem</option>
                                    <option value="year_asc">Godina: starije prema novijem</option>
                                </select>
                            </div>
                        </div>

                        {/* Book Cards Grid */}
                        {paginatedBooks.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {paginatedBooks.map((book) => (
                                    <BookCard
                                        key={book.id}
                                        book={book}
                                        isFavorite={isFavorite(book.id)}
                                        onToggleFavorite={toggleFavorite}
                                    />
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-lg mx-auto shadow-xs">
                                <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-800 mx-auto mb-4">
                                    <BookOpen className="w-7 h-7 text-emerald-800" />
                                </div>
                                <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
                                    Nema pronađenih knjiga
                                </h3>
                                <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                                    Za zadati kriterij pretrage ili odabrane filtere nismo pronašli odgovarajuće naslove u fondu. Pokušajte izmijeniti upit ili poništiti filtere.
                                </p>
                                <button
                                    onClick={handleResetFilters}
                                    className="px-5 py-2.5 rounded-lg bg-emerald-900 text-amber-300 font-semibold text-xs hover:bg-emerald-800 transition-colors"
                                >
                                    Poništi sve filtere
                                </button>
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between border-t border-stone-200 pt-6">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border border-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Prethodna
                                </button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                                                currentPage === page
                                                    ? 'bg-emerald-950 text-amber-400'
                                                    : 'text-stone-700 hover:bg-stone-100'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border border-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 transition-colors"
                                >
                                    Sljedeća
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};