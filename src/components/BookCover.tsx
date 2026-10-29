import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface BookCoverProps {
    coverUrl: string | null;
    title: string;
    author: string;
    className?: string;
    aspectRatio?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({
                                                        coverUrl,
                                                        title,
                                                        author,
                                                        className = '',
                                                        aspectRatio = 'aspect-[2/3]',
                                                    }) => {
    const [imageError, setImageError] = useState(false);

    if (coverUrl && !imageError) {
        return (
            <div className={`relative overflow-hidden rounded-md bg-stone-100 shadow-md ${aspectRatio} ${className}`}>
                <img
                    src={coverUrl}
                    alt={`Naslovnica: ${title}`}
                    loading="lazy"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
        );
    }

    // Cultural Bosnian fallback book cover with geometric ornament and clear typography
    return (
        <div
            className={`relative overflow-hidden rounded-md bg-emerald-950 text-white flex flex-col justify-between p-4 shadow-md border border-emerald-800/40 ${aspectRatio} ${className}`}
        >
            {/* Decorative Islamic-inspired geometric pattern overlay */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]"
            />
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-500/20 to-transparent pointer-events-none" />

            {/* Header crest */}
            <div className="relative z-10 flex items-center justify-between border-b border-emerald-800/60 pb-2">
        <span className="text-[10px] uppercase tracking-widest text-amber-300/90 font-medium">
          eBiblioteka Vitez
        </span>
                <BookOpen className="w-4 h-4 text-amber-400" />
            </div>

            {/* Title & Author */}
            <div className="relative z-10 my-auto py-2 text-center">
                <h4 className="font-serif font-bold text-sm sm:text-base leading-snug text-emerald-50 line-clamp-3">
                    {title}
                </h4>
                <div className="w-8 h-0.5 bg-amber-400/80 mx-auto my-2" />
                <p className="text-xs text-emerald-200/90 font-medium line-clamp-2">
                    {author}
                </p>
            </div>

            {/* Footer insignia */}
            <div className="relative z-10 border-t border-emerald-800/60 pt-2 text-center">
        <span className="text-[9px] text-emerald-300/70 tracking-wider uppercase">
          Bošnjačka zajednica Vitez
        </span>
            </div>
        </div>
    );
};