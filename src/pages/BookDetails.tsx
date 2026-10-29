import * as React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Bookmark, ArrowLeft, Share2, Calendar, FileText, Globe, Tag } from 'lucide-react';
import { libraryService } from '../services/libraryServices';
import { BookCover } from '../components/BookCover';
import { BookCard } from '../components/BookCard';
import { useFavorites } from '../hooks/useFavorites';
import { toast } from 'react-toastify';

export const BookDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useFavorites();

    const book = id ? libraryService.getBookById(id) : undefined;
    const relatedBooks = book ? libraryService.getRelatedBooks(book, 3) : [];

    const handleShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link do knjige uspješno kopiran!');
        }
    };

    if (!book) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
                <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                    Knjiga nije pronađena
                </h2>
                <p className="text-sm text-stone-600 mb-6 max-w-md">
                    Traženi bibliotečki zapis ne postoji ili je uklonjen iz elektronskog kataloga.
                </p>
                <button
                    onClick={() => navigate('/biblioteka')}
                    className="px-5 py-2.5 rounded-lg bg-emerald-950 text-amber-300 text-xs font-semibold"
                >
                    Povratak u biblioteku
                </button>
            </div>
        );
    }

    const isFavorited = isFavorite(book.id);

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-10">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                {/* Breadcrumb & Navigation */}
                <div className="flex items-center justify-between mb-8 text-xs">
                    <nav className="text-stone-500">
                        <Link to="/" className="hover:text-stone-800">Početna</Link> {' > '}
                        <Link to="/biblioteka" className="hover:text-stone-800">Biblioteka</Link> {' > '}
                        <span className="text-emerald-800 font-semibold truncate max-w-[200px] inline-block align-bottom">
              {book.naslov}
            </span>
                    </nav>

                    <Link
                        to="/biblioteka"
                        className="inline-flex items-center gap-1.5 text-stone-600 hover:text-emerald-900 font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Nazad na katalog
                    </Link>
                </div>

                {/* Book Main Bibliographic Card */}
                <article className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-10 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                        {/* Book Cover & Quick Actions */}
                        <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center">
                            <div className="w-full max-w-[240px] shadow-xl rounded-lg overflow-hidden mb-6">
                                <BookCover
                                    coverUrl={book.cover}
                                    title={book.naslov}
                                    author={book.autori.join(', ')}
                                    aspectRatio="aspect-[2/3]"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="w-full flex flex-col gap-2.5">
                                <button
                                    onClick={() => toggleFavorite(book.id)}
                                    className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                                        isFavorited
                                            ? 'bg-amber-500 text-emerald-950 shadow-sm hover:bg-amber-400'
                                            : 'bg-emerald-950 text-amber-300 hover:bg-emerald-900'
                                    }`}
                                >
                                    <Bookmark className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                                    <span>{isFavorited ? 'Ukloni iz omiljenih' : 'Sačuvaj u omiljene'}</span>
                                </button>

                                <button
                                    onClick={handleShare}
                                    className="w-full py-2 px-4 rounded-lg text-xs font-medium border border-stone-300 text-stone-700 hover:bg-stone-50 flex items-center justify-center gap-2"
                                >
                                    <Share2 className="w-3.5 h-3.5" />
                                    Podijeli link zapisa
                                </button>
                            </div>

                            {/* Digital resource status check notice */}
                            {book.digitalResurs ? (
                                <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 text-center w-full">
                                    <a
                                        href={book.digitalResurs}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-bold underline hover:text-emerald-700"
                                    >
                                        Čitaj digitalno izdanje
                                    </a>
                                </div>
                            ) : (
                                <p className="mt-4 text-[11px] text-stone-400 text-center leading-normal">
                                    Fizički primjerak u zbirci Bošnjačke zajednice Vitez. Digitalni tekst nije dostupan za preuzimanje.
                                </p>
                            )}
                        </div>

                        {/* Bibliographic Metadata Details */}
                        <div className="md:col-span-8 lg:col-span-9 flex flex-col">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100/70 text-emerald-900 border border-emerald-200">
                  {book.zanr}
                </span>
                                {book.kolekcija && (
                                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-900 border border-amber-200/80">
                    {book.kolekcija}
                  </span>
                                )}
                                {book.broj && (
                                    <span className="text-xs text-stone-500 font-mono">
                    Evidencioni broj: #{book.broj}
                  </span>
                                )}
                            </div>

                            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 mb-2 leading-tight">
                                {book.naslov}
                            </h1>

                            <div className="flex items-center gap-2 text-stone-700 font-medium text-base mb-6">
                                <span>Autor(i):</span>
                                <span className="text-emerald-900 font-bold">{book.autori.join(', ')}</span>
                            </div>

                            {/* Structured Bibliographic Table */}
                            <div className="border border-stone-200 rounded-xl overflow-hidden mb-6">
                                <table className="w-full text-xs text-left">
                                    <tbody className="divide-y divide-stone-200">
                                    <tr className="bg-stone-50/50">
                                        <th className="py-3 px-4 font-semibold text-stone-600 w-1/3">Izdavač</th>
                                        <td className="py-3 px-4 text-stone-900 font-medium">{book.izdavac}</td>
                                    </tr>
                                    <tr>
                                        <th className="py-3 px-4 font-semibold text-stone-600">Izdanje / Godina</th>
                                        <td className="py-3 px-4 text-stone-900 flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-stone-400" />
                                            <span>{book.izdanje}</span>
                                        </td>
                                    </tr>
                                    <tr className="bg-stone-50/50">
                                        <th className="py-3 px-4 font-semibold text-stone-600">Jezik / Jezici</th>
                                        <td className="py-3 px-4 text-stone-900 flex items-center gap-1.5">
                                            <Globe className="w-3.5 h-3.5 text-stone-400" />
                                            <span>{book.jezici.join(', ')}</span>
                                        </td>
                                    </tr>

                                    {/* Identifiers */}
                                    {book.cobisbihId && (
                                        <tr>
                                            <th className="py-3 px-4 font-semibold text-stone-600">COBISS.BH identifikator</th>
                                            <td className="py-3 px-4 text-emerald-800 font-mono font-bold">
                                                {book.cobisbihId}
                                            </td>
                                        </tr>
                                    )}
                                    {book.ciphr && (
                                        <tr className="bg-stone-50/50">
                                            <th className="py-3 px-4 font-semibold text-stone-600">CIP klasifikacija</th>
                                            <td className="py-3 px-4 text-stone-800 font-mono">
                                                {book.ciphr}
                                            </td>
                                        </tr>
                                    )}
                                    {book.isbn && (
                                        <tr>
                                            <th className="py-3 px-4 font-semibold text-stone-600">ISBN</th>
                                            <td className="py-3 px-4 text-stone-800 font-mono">
                                                {book.isbn}
                                            </td>
                                        </tr>
                                    )}
                                    {book.isbnun && (
                                        <tr className="bg-stone-50/50">
                                            <th className="py-3 px-4 font-semibold text-stone-600">ISBNUN</th>
                                            <td className="py-3 px-4 text-stone-800 font-mono">{book.isbnun}</td>
                                        </tr>
                                    )}
                                    {book.issn && (
                                        <tr>
                                            <th className="py-3 px-4 font-semibold text-stone-600">ISSN</th>
                                            <td className="py-3 px-4 text-stone-800 font-mono">{book.issn}</td>
                                        </tr>
                                    )}
                                    {book.urednici.length > 0 && (
                                        <tr className="bg-stone-50/50">
                                            <th className="py-3 px-4 font-semibold text-stone-600">Urednik / Redakcija</th>
                                            <td className="py-3 px-4 text-stone-800">{book.urednici.join(', ')}</td>
                                        </tr>
                                    )}
                                    {book.tip && (
                                        <tr>
                                            <th className="py-3 px-4 font-semibold text-stone-600">Format i opis</th>
                                            <td className="py-3 px-4 text-stone-800 flex items-center gap-1.5">
                                                <FileText className="w-3.5 h-3.5 text-stone-400" />
                                                <span>{book.tip}</span>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Cultural Context Note */}
                            <div className="bg-emerald-950/5 border border-emerald-900/10 rounded-xl p-4 text-xs text-stone-700 leading-relaxed">
                                <div className="flex items-center gap-2 text-emerald-900 font-bold mb-1">
                                    <Tag className="w-3.5 h-3.5 text-amber-600" />
                                    <span>Kulturna baština Bošnjaka u Vitezu</span>
                                </div>
                                Ovaj naslov pohranjen je u bibliotečkom fondu <em>Bošnjačke zajednice – Općinsko društvo Vitez</em>. Za uvid u fizički primjerak ili konsultacije s arhivistom posjetite našu zavičajnu čitaonicu.
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related Books Section */}
                {relatedBooks.length > 0 && (
                    <section className="mt-16">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest block">
                  Povezana građa
                </span>
                                <h3 className="font-serif text-2xl font-bold text-stone-900">
                                    Naslovi iz iste oblasti ili autora
                                </h3>
                            </div>
                            <Link
                                to={`/biblioteka?zanr=${encodeURIComponent(book.zanr)}`}
                                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950"
                            >
                                Prikaži sve iz žanra &rarr;
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedBooks.map((relBook) => (
                                <BookCard
                                    key={relBook.id}
                                    book={relBook}
                                    isFavorite={isFavorite(relBook.id)}
                                    onToggleFavorite={toggleFavorite}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};