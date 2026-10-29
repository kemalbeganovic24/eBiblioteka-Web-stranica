import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MapPin, Mail, Phone, Smartphone, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-emerald-950 text-stone-200 border-t border-emerald-900/60 pt-16 pb-12">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Identity column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-emerald-800 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-sm">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-serif font-bold text-lg text-white">eBiblioteka</h3>
                                <p className="text-[10px] uppercase tracking-wider text-amber-300">
                                    Bošnjačka zajednica OD Vitez
                                </p>
                            </div>
                        </div>
                        <p className="text-xs text-stone-300/80 leading-relaxed">
                            Zvanična digitalna biblioteka Bošnjačke zajednice kulture općinsko društvo Vitez. Posvećena očuvanju, digitalizaciji i promovisanju pisane kulturne baštine i savremene književnosti.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-amber-300/90 pt-1">
                            <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
                            <span>Uskoro dostupno i kao nativna aplikacija za Android i iOS</span>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 className="font-serif font-semibold text-sm text-white uppercase tracking-wider mb-4 border-b border-emerald-800 pb-2">
                            Katalog i sekcije
                        </h4>
                        <ul className="space-y-2.5 text-xs text-stone-300">
                            <li>
                                <Link to="/biblioteka" className="hover:text-amber-300 transition-colors">
                                    Sve knjige u biblioteci
                                </Link>
                            </li>
                            <li>
                                <Link to="/biblioteka?zanr=Roman" className="hover:text-amber-300 transition-colors">
                                    Romani i proza
                                </Link>
                            </li>
                            <li>
                                <Link to="/biblioteka?zanr=Poezija" className="hover:text-amber-300 transition-colors">
                                    Poezija i lirika
                                </Link>
                            </li>
                            <li>
                                <Link to="/biblioteka?zanr=Historija%20%2F%20Dokumentaristika" className="hover:text-amber-300 transition-colors">
                                    Historija/Dokumentaristika
                                </Link>
                            </li>
                            <li>
                                <Link to="/omiljene-knjige" className="hover:text-amber-300 transition-colors">
                                    Vaša lista omiljenih knjiga
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Institution */}
                    <div>
                        <h4 className="font-serif font-semibold text-sm text-white uppercase tracking-wider mb-4 border-b border-emerald-800 pb-2">
                            O instituciji
                        </h4>
                        <ul className="space-y-2.5 text-xs text-stone-300">
                            <li>
                                <Link to="/o-biblioteci" className="hover:text-amber-300 transition-colors">
                                    O eBiblioteci i misiji društva
                                </Link>
                            </li>

                            <li>
                                <Link to="/kontakt" className="hover:text-amber-300 transition-colors">
                                    Pristup čitaonici i radno vrijeme
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Placeholders */}
                    <div>
                        <h4 className="font-serif font-semibold text-sm text-white uppercase tracking-wider mb-4 border-b border-emerald-800 pb-2">
                            Sjedište i kontakt
                        </h4>
                        <div className="space-y-3 text-xs text-stone-300">
                            <div className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                <span>Vatrogasni dom - / Prostorije BZK, 72250 Vitez, Bosna i Hercegovina</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                                <span>bzkpreporodvitez@yahoo.com</span>
                                <span>kemalbeganovic77@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                                <span>+387 61 533 890</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sub-footer */}
                <div className="border-t border-emerald-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
                    <p>
                        © 2026 eBiblioteka Bošnjačke zajednice općinsko društvo Vitez. Sva prava zadržana.
                    </p>

                </div>
            </div>
        </footer>
    );
};