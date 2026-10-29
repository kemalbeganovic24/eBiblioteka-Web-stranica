import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Search, Trash2, ArrowLeft } from 'lucide-react';
import { libraryService, normalizeDiacritics } from '../services/libraryServices';
import { BookCard } from '../components/BookCard';
import { useFavorites } from '../hooks/useFavorites';

export const Favorites: React.FC = () => {
    const { favorites, toggleFavorite } = useFavorites();
    const [filterQuery, setFilterQuery] = useState('');

    const allBooks = useMemo(() => libraryService.getAllBooks(), []);

    const favoriteBooks = useMemo(() => {
        return allBooks.filter(book => favorites.includes(book.id));
    }, [allBooks, favorites]);

    const filteredFavorites = useMemo(() => {
        if (!filterQuery.trim()) return favoriteBooks;
        const q = normalizeDiacritics(filterQuery.trim());
        return favoriteBooks.filter(b =>
            normalizeDiacritics(b.naslov).includes(q) ||
            b.autori.some(a => normalizeDiacritics(a).includes(q))
        );
    }, [favoriteBooks, filterQuery]);

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6 mb-8">
                    <div>
                        <nav className="text-xs text-stone-500 mb-2">
                            <Link to="/" className="hover:text-stone-800">Početna</Link> {' >'}
                            <span className="text-emerald-800 font-semibold">Omiljene knjige</span>
                        </nav>
                        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 flex items-center gap-3">
                            <Bookmark className="w-8 h-8 text-amber-500 fill-amber-500" />
                            Vaša lista omiljenih knjiga
                        </h1>
                        <p className="text-sm text-stone-600 mt-1">
                            Knjige koje ste označili za čitanje, proučavanje ili posudbu (pohranjeno u vašem pregledniku).
                        </p>
                    </div>

                    <Link
                        to="/biblioteka"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:text-emerald-950"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Nastavi pretraživanje kataloga
                    </Link>
                </div>

                {favoriteBooks.length > 0 ? (
                    <div>
                        {/* Quick search inside favorites */}
                        <div className="max-w-md mb-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Filtriraj po naslovu ili autoru..."
                                    value={filterQuery}
                                    onChange={(e) => setFilterQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/50"
                                />
                                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        {filteredFavorites.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {filteredFavorites.map((book) => (
                                    <BookCard
                                        key={book.id}
                                        book={book}
                                        isFavorite={true}
                                        onToggleFavorite={toggleFavorite}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-stone-500 py-6">
                                Nijedna omiljena knjiga ne odgovara pojmu "{filterQuery}".
                            </p>
                        )}
                    </div>
                ) : (
                    /* Empty Favorites State */
                    <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-lg mx-auto shadow-xs">
                        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mx-auto mb-4">
                            <Trash2 className="w-8 h-8" />
                        </div>
                        <h3 className="font-serif font-bold text-xl text-stone-900 mb-2">
                            Vaša lista je trenutno prazna
                        </h3>
                        <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                            Tokom pretrage biblioteke, kliknite na ikonicu oznake na bilo kojoj knjizi kako biste je sačuvali na ovu listu za kasniji pregled ili posudbu.
                        </p>
                        <Link
                            to="/biblioteka"
                            className="inline-block px-6 py-2.5 rounded-lg bg-emerald-950 text-amber-300 font-semibold text-xs hover:bg-emerald-900 transition-colors"
                        >
                            Istraži biblioteku
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};