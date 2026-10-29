import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'ebiblioteka_vitez_omiljene';

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>(() => {
        try {
            const stored = localStorage.getItem(FAVORITES_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        } catch {
            // ignore storage errors
        }
    }, [favorites]);

    const toggleFavorite = (bookId: string) => {
        setFavorites(prev =>
            prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
        );
    };

    const isFavorite = (bookId: string) => favorites.includes(bookId);

    const removeFavorite = (bookId: string) => {
        setFavorites(prev => prev.filter(id => id !== bookId));
    };

    return {
        favorites,
        toggleFavorite,
        isFavorite,
        removeFavorite,
        favoritesCount: favorites.length,
    };
}