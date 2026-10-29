import React from 'react';
import { Link } from 'react-router-dom';
import { BookX, Home, Search } from 'lucide-react';

export const NotFound: React.FC = () => {
    return (
        <div className="min-h-[75vh] flex items-center justify-center bg-[#FDFBF7] px-6 py-16">
            <div className="max-w-md text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center mx-auto mb-6">
                    <BookX className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold text-amber-700 tracking-widest uppercase">
          Greška 404
        </span>
                <h1 className="font-serif text-3xl font-extrabold text-stone-900 mt-2 mb-3">
                    Stranica nije pronađena
                </h1>
                <p className="text-xs text-stone-600 mb-8 leading-relaxed">
                    Stranica koju tražite ne postoji u elektronskoj biblioteci ili je premještena.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        to="/"
                        className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-emerald-950 text-amber-300 font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:bg-emerald-900 transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Početna stranica
                    </Link>
                    <Link
                        to="/biblioteka"
                        className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-stone-300 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-stone-100 transition-colors"
                    >
                        <Search className="w-4 h-4" />
                        Otvori katalog
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;