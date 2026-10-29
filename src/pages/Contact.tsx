import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

interface FormData {
    imePrezime: string;
    email: string;
    telefon: string;
    predmet: string;
    poruka: string;
}

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        imePrezime: '',
        email: '',
        telefon: '',
        predmet: 'Upit za posudbu / konsultaciju',
        poruka: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    // OVDJE UNESITE VAŠ ACCESS KEY SA WEB3FORMS.COM
                    access_key: 'f2e2c4ca-8f71-4d08-a36b-822ac548a73d',
                    subject: `[eBiblioteka Vitez] ${formData.predmet}`,
                    from_name: formData.imePrezime,
                    replyto: formData.email,
                    Ime_i_Prezime: formData.imePrezime,
                    Email: formData.email,
                    Telefon: formData.telefon || 'Nije naveden',
                    Predmet_Upita: formData.predmet,
                    Poruka: formData.poruka,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitted(true);
                toast.success('Poruka je uspješno poslana!');
            } else {
                toast.error('Došlo je do greške pri slanju poruke.');
            }
        } catch (error) {
            console.error('Slanje poruke nije uspjelo:', error);
            toast.error('Mrežna greška. Provjerite internet konekciju.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                {/* Header */}
                <div className="mb-10">
                    <nav className="text-xs text-stone-500 mb-2">
                        <span>Početna</span> / <span className="text-emerald-800 font-semibold">Kontakt</span>
                    </nav>
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                        Kontaktirajte biblioteku
                    </h1>
                    <p className="text-sm text-stone-600 mt-1">
                        Imate pitanja o posudbi, istraživanju zavičajne građe ili donaciji knjiga? Javite nam se.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Informacije o društvu */}
                    <div className="lg:col-span-5 bg-emerald-950 text-white rounded-2xl p-8 shadow-sm space-y-6">
                        <h2 className="font-serif font-bold text-xl text-amber-300 border-b border-emerald-900 pb-3">
                            Bošnjačka zajednica kulture
                        </h2>
                        <p className="text-xs text-stone-300 leading-relaxed">
                            Općinsko društvo Vitez – Zavičajna bibliotečka zbirka i arhivska građa.
                        </p>

                        <div className="space-y-4 pt-2">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                                <div className="text-xs">
                                    <p className="font-semibold text-stone-200">Adresa:</p>
                                    <p className="text-stone-400">Kulturni centar, Vitez 72270, BiH</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                                <div className="text-xs">
                                    <p className="font-semibold text-stone-200">E-mail adresa:</p>
                                    <p className="text-stone-400">bzkpreporodvitez@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                                <div className="text-xs">
                                    <p className="font-semibold text-stone-200">Telefon:</p>
                                    <p className="text-stone-400">+387 (0)30 711 000</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                                <div className="text-xs">
                                    <p className="font-semibold text-stone-200">Radno vrijeme:</p>
                                    <p className="text-stone-400">Ponedjeljak – Petak: 08:00 – 16:00h</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Panel */}
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