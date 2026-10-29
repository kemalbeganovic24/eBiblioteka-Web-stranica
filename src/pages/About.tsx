import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Smartphone, ShieldCheck, MapPin } from 'lucide-react';
import { libraryService } from '../services/libraryServices';

export const About: React.FC = () => {
    const stats = libraryService.getStats();

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-16">
            <div className="max-w-4xl mx-auto px-6 sm:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-4">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Kulturni identitet i pisana riječ</span>
                    </div>
                    <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4">
                        O eBiblioteci Bošnjačke zajednice kulture općinsko društvo Vitez
                    </h1>
                    <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                        Stručno organizovan elektronski repozitorij posvećen očuvanju, valorizaciji i promociji književnog i historijskog naslijeđa Bošnjaka.
                    </p>
                </div>

                {/* Content Section */}
                <div className="space-y-12">
                    {/* Section 1 */}
                    <section className="bg-white rounded-2xl p-8 border border-stone-200/80 shadow-xs space-y-4">
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 border-b border-stone-100 pb-3">
                            Misija i svrha projekta
                        </h2>
                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                            <strong>eBiblioteka Bošnjačke zajednice kulture općinsko društvo Vitez</strong> kreirana je s ciljem da bibliotečke jedinice i građu učini trajnim javnim dobrom, dostupnim ne samo članovima društva u Vitezu već i istraživačima, studentima i dijaspori širom svijeta. Ideju i realizaciju je pokrenuo naš član Kemal Beganović sa ciljem digitalizacije društva, okoline i općine. Uz njega je dosad urađen kompletan detaljan popis svih izdanja u elektronskoj formi, te je kreirana i mobilna aplikacija za korisnike Android i iPhone usluga, u koju su importovani svi nazivi izdanja koje imamo. Trenutna eBiblioteka služi kao odlična baza podataka pomoću koje vrlo brzo možemo provjeriti bilo koji naziv i izdanje. Sve što je urađeno plod je rada ekipe mladih ljudi, entuzijasta i istinskih zaljubljenika u pisanu riječ i veoma smo ponosni na nih. Zahvalnost ide našim dragim članovima Kemal Beganović, Jusuf Grahić, Atif Spahić i Nejra Kajmak.
                        </p>

                    </section>

                    {/* Section 2: Companion Mobile Apps */}
                    <section className="bg-emerald-950 text-white rounded-2xl p-8 border border-emerald-900 shadow-md">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-emerald-800 flex items-center justify-center text-amber-400">
                                <Smartphone className="w-5 h-5" />
                            </div>
                            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                                Mobilni ekosistem: Kotlin & Swift aplikacije
                            </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-4">
                            Ova web aplikacija razvijena je kao web dopuna već postojećim nativnim mobilnim aplikacijama izgrađenim u programskim jezicima <strong>Kotlin (za Android uređaje)</strong> i <strong>Swift (za iOS uređaje)</strong>.
                        </p>
                        <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
                            Arhitektura sistema omogućava sinhronizaciju kataloških podataka, dok korisnici na računarima i velikim ekranima dobijaju punu udobnost istraživanja, pretrage bez dijakritika i bibliografske analize.
                        </p>
                    </section>

                    {/* Section 3: Bibliographic Standards */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs">
                            <ShieldCheck className="w-8 h-8 text-emerald-800 mb-3" />
                            <h3 className="font-serif font-bold text-base text-stone-900 mb-2">
                                COBISSBH i CIPHR standardi
                            </h3>
                            <p className="text-xs text-stone-600 leading-relaxed">
                                Katalog poštuje standardne bibliografske zapise, uključujući jedinstvene identifikatore, ISBN, ISSN, i klasifikacije prema nacionalnim smjernicama.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs">
                            <MapPin className="w-8 h-8 text-amber-600 mb-3" />
                            <h3 className="font-serif font-bold text-base text-stone-900 mb-2">
                                Zavičajna baština
                            </h3>
                            <p className="text-xs text-stone-600 leading-relaxed">
                                Posebno mjesto pripada izdanjima o kulturno-historijskim spomenicima, zbornicima i autorima koji su obilježili historiju Bosne i Hercegovine.
                            </p>
                        </div>
                    </section>

                    {/* Statistics summary */}
                    <div className="bg-stone-100 rounded-xl p-6 border border-stone-200 text-center">
                        <h4 className="font-serif font-bold text-sm text-stone-800 mb-4">
                            Aktuelno stanje u sistemu eBiblioteke
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                            <div>
                                <span className="block font-bold text-2xl text-emerald-900">{stats.validBooksCount}</span>
                                <span className="text-[11px] text-stone-500 uppercase">Obrađenih knjiga</span>
                            </div>
                            <div>
                                <span className="block font-bold text-2xl text-emerald-900">{stats.genresCount}</span>
                                <span className="text-[11px] text-stone-500 uppercase">Književnih žanrova</span>
                            </div>
                            <div>
                                <span className="block font-bold text-2xl text-emerald-900">{stats.publishersCount}</span>
                                <span className="text-[11px] text-stone-500 uppercase">Izdavača</span>
                            </div>
                            <div>
                                <span className="block font-bold text-2xl text-emerald-900">100%</span>
                                <span className="text-[11px] text-stone-500 uppercase">Besplatan pristup</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center pt-4">
                        <Link
                            to="/biblioteka"
                            className="inline-block px-8 py-3 rounded-lg bg-emerald-950 text-amber-300 font-bold text-xs uppercase tracking-wider hover:bg-emerald-900 shadow-md transition-all"
                        >
                            Istražite fond biblioteke
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};