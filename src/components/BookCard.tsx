import * as React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ChevronRight, Calendar, User } from 'lucide-react';
import { NormalizedBook } from '../types/library';
import { BookCover } from './BookCover';

interface BookCardProps {
    book: NormalizedBook;
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
                                                      book,
                                                      isFavorite,
                                                      onToggleFavorite,
                                                  }) => {
    return (
        <article className="group relative flex flex-col bg-white rounded-xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            {/* Favorite Button */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleFavorite(book.id);
                }}
                aria-label={isFavorite ? `Ukloni "${book.naslov}" iz omiljenih` : `Dodaj "${book.naslov}" u omiljene`}
                className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
                    isFavorite
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'bg-white/80 text-stone-700 hover:text-amber-600 hover:bg-white shadow-sm'
                }`}
            >
                <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            {/* Cover Image Container */}
            <Link to={`/knjiga/${book.id}`} className="block p-4 pb-0">
                <div className="mx-auto max-w-[190px]">
                    <BookCover
                        coverUrl={book.cover}
                        title={book.naslov}
                        author={book.autori.join(', ')}
                        aspectRatio="aspect-[2/3]"
                    />
                </div>
            </Link>

            {/* Card Content */}
            <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-2 mb-2">
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
            {book.zanr}
          </span>
                    {book.godina && (
                        <span className="flex items-center gap-1 text-[11px] text-stone-500 font-medium">
              <Calendar className="w-3 h-3 text-stone-400" />
                            {book.godina}
            </span>
                    )}
                </div>

                <Link to={`/knjiga/${book.id}`}>
                    <h3 className="font-serif font-bold text-stone-900 text-base leading-snug group-hover:text-emerald-800 transition-colors line-clamp-2 mb-1">
                        {book.naslov}
                    </h3>
                </Link>

                <p className="flex items-center gap-1.5 text-xs text-stone-600 mb-4 line-clamp-1">
                    <User className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{book.autori.join(', ')}</span>
                </p>

                <div className="mt-auto pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span className="truncate max-w-[140px]" title={book.izdavac}>
            {book.izdavac}
          </span>
                    <Link
                        to={`/knjiga/${book.id}`}
                        className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-semibold group-hover:translate-x-0.5 transition-transform"
                    >
                        Pregled
                        <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        </article>
    );
};