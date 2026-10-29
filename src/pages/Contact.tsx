import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        imePrezime: '',
        email: '',
        telefon: '',
        predmet: 'Upit za posudbu / konsultaciju',
        poruka: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.imePrezime.trim() || !formData.email.trim() || !formData.poruka.trim()) {
            toast.error('Molimo popunite sva obavezna polja.');
            return;
        }

        setIsSubmitting(true);
        // Simulate accessible feedback loop
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            toast.success('Vaš upit je zabilježen u sistemu biblioteke!');
        }, 700);
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-16">
            <div className="max-w-6xl mx-auto px-6 sm:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest block mb-2">
            Kontakt i podrška
          </span>
                    <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900">
                        Javite se biblioteci
                    </h1>
                    <p className="text-stone-600 text-sm mt-2">
                        Za informacije o posudbi, donaciji knjiga, zavičajnom arhivu ili radu Bošnjačke zajednice kulture u Vitezu.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Institutional Information & Working Hours */}
                    <div className="lg:col-span-5 bg-emerald-950 text-white rounded-2xl p-8 border border-emerald-900 shadow-md space-y-8">
                        <div>
                            <h2 className="font-serif text-xl font-bold text-white mb-2">
                                Bošnjačka zajednica kulture općinsko društvo Vitez
                            </h2>
                            <p className="text-xs text-emerald-200/80 leading-relaxed">
                                Bošnjačka zajednica kulture općinsko društvo Vitez djeluje u cilju unapređenja kulture, tradicije, pismenosti i obrazovanja na području općine Vitez i šire regije.
                            </p>
                        </div>

                        <div className="space-y-4 text-xs">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                                <div>
                                    <strong className="block text-white">Adresa sjedišta</strong>
                                    <span className="text-emerald-100/80">
                    Vatrogasni dom - / Prostorije BZK, 72250 Vitez, Bosna i Hercegovina
                  </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                                <div>
                                    <strong className="block text-white">Elektronska pošta</strong>
                                    <span className="text-emerald-100/80">kemalbeganovic77@gmail.com</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                                <div>
                                    <strong className="block text-white">Telefon</strong>
                                    <span className="text-emerald-100/80">+387 61 533 890</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-emerald-900/80 pt-6">
                            <h3 className="font-serif font-bold text-sm text-amber-300 mb-2">
                                Radno vrijeme čitaonice
                            </h3>
                            <ul className="text-xs text-emerald-100/80 space-y-1">
                                <li className="flex justify-between">
                                    <span>Ponedjeljak – Petak:</span>
                                    <span className="font-semibold text-white">16:00 – 18:00</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Subota (arhivski rad):</span>
                                    <span className="font-semibold text-white">10:00 – 14:00</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Nedjelja i državni praznici:</span>
                                    <span className="text-amber-400/80">Zatvoreno</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-7 bg-white rounded-2xl p-8 border border-stone-200/90 shadow-sm">
                        {submitted ? (
                            <div className="text-center py-12 space-y-4">
                                <CheckCircle2 className="w-16 h-16 text-emerald-700 mx-auto" />
                                <h3 className="font-serif font-bold text-2xl text-stone-900">
                                    Poruka je uspješno poslana!
                                </h3>
                                <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                                    Zahvaljujemo se na javljanju. Vaš upit je proslijeđen bibliotekaru Bošnjačke zajednice – Općinsko društvo Vitez. Odgovorićemo u najkraćem roku na navedeni email.
                                </p>
                                <button
                                    onClick={() => {
                                        setSubmitted(false);
                                        setFormData({
                                            imePrezime: '',
                                            email: '',
                                            telefon: '',
                                            predmet: 'Upit za posudbu / konsultaciju',
                                            poruka: '',
                                        });
                                    }}
                                    className="px-6 py-2 rounded-lg bg-emerald-950 text-amber-300 font-semibold text-xs"
                                >
                                    Pošalji novu poruku
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <h2 className="font-serif font-bold text-lg text-stone-900 border-b border-stone-100 pb-2">
                                    Kontakt obrazac
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                                            Ime i prezime *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.imePrezime}
                                            onChange={(e) => setFormData({ ...formData, imePrezime: e.target.value })}
                                            placeholder="npr. Kenan Hadžić"
                                            className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                                            Email adresa *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="npr. ime@domena.ba"
                                            className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/50"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                                            Broj telefona (opcionalno)
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.telefon}
                                            onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                                            placeholder="+387 61 000 000"
                                            className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                                            Predmet upita
                                        </label>
                                        <select
                                            value={formData.predmet}
                                            onChange={(e) => setFormData({ ...formData, predmet: e.target.value })}
                                            className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/50 bg-white"
                                        >
                                            <option value="Upit za posudbu / konsultaciju">Upit za posudbu / konsultaciju</option>
                                            <option value="Istraživanje zavičajne građe">Istraživanje zavičajne građe</option>
                                            <option value="Donacija knjiga biblioteci">Donacija knjiga biblioteci</option>
                                            <option value="Ispravka bibliografskog podatka">Ispravka bibliografskog podatka</option>
                                            <option value="Ostalo">Ostalo</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                                        Vaša poruka *
                                    </label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={formData.poruka}
                                        onChange={(e) => setFormData({ ...formData, poruka: e.target.value })}
                                        placeholder="Napišite pojedinosti o naslovu ili temi koja vas interesuje..."
                                        className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/50"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>{isSubmitting ? 'Slanje...' : 'Pošalji poruku biblioteci'}</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};