import React, { Suspense, lazy } from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Catalogue = lazy(() => import('./pages/Catalogue').then(m => ({ default: m.Catalogue })));
const BookDetails = lazy(() => import('./pages/BookDetails').then(m => ({ default: m.BookDetails })));
const Favorites = lazy(() => import('./pages/Favorites').then(m => ({ default: m.Favorites })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader: React.FC = () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#FDFBF7]">
        <div className="w-10 h-10 border-4 border-emerald-900/20 border-t-emerald-900 rounded-full animate-spin mb-4" />
        <span className="text-xs font-serif text-stone-600">Učitavanje eBiblioteke...</span>
    </div>
);

const App: React.FC = () => {
    return (
        <Theme appearance="inherit" radius="large" scaling="100%">
            <Router>
                <div className="min-h-screen flex flex-col font-sans bg-[#FDFBF7] text-stone-900 antialiased selection:bg-amber-400 selection:text-emerald-950">
                    <Navbar />
                    <main className="flex-1">
                        <Suspense fallback={<PageLoader />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/biblioteka" element={<Catalogue />} />
                                <Route path="/knjiga/:id" element={<BookDetails />} />
                                <Route path="/omiljene-knjige" element={<Favorites />} />
                                <Route path="/o-biblioteci" element={<About />} />
                                <Route path="/kontakt" element={<Contact />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Suspense>
                    </main>
                    <Footer />
                    <ToastContainer
                        position="bottom-right"
                        autoClose={3000}
                        newestOnTop
                        closeOnClick
                        pauseOnHover
                    />
                </div>
            </Router>
        </Theme>
    );
};

export default App;