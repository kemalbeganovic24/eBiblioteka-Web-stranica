import { rawLibraryData } from '../data/ebibliotekaDataset';
import { NormalizedBook, DatasetStats, RawBookRecord } from '../types/library';

/**
 * Strips Bosnian diacritics for seamless search (č, ć, ž, š, đ -> c, c, z, s, dj/d)
 */
export function normalizeDiacritics(text: string): string {
    if (!text) return '';
    return text
        .toLowerCase()
        .replace(/č/g, 'c')
        .replace(/ć/g, 'c')
        .replace(/ž/g, 'z')
        .replace(/š/g, 's')
        .replace(/đ/g, 'dj')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Extracts a 4-digit publication year if present in 'izdanje' or text
 */
function extractYear(val: unknown): number | null {
    if (typeof val === 'number' && val >= 1000 && val <= 2100) {
        return val;
    }
    if (typeof val === 'string') {
        const match = val.match(/\b(18\d{2}|19\d{2}|20\d{2})\b/);
        if (match) {
            return parseInt(match[1], 10);
        }
    }
    return null;
}

/**
 * Formats authors into a clean array
 */
function normalizeAuthors(val: unknown): string[] {
    if (Array.isArray(val)) {
        return val.filter(a => typeof a === 'string' && a.trim().length > 0).map(a => a.trim());
    }
    if (typeof val === 'string' && val.trim().length > 0) {
        return val.split(',').map(a => a.trim()).filter(Boolean);
    }
    return ['Nepoznat autor'];
}

/**
 * Formats languages into a string array
 */
function normalizeLanguages(jezik: unknown, jezici: unknown): string[] {
    const result: string[] = [];
    if (typeof jezik === 'string' && jezik.trim()) {
        result.push(jezik.trim());
    }
    if (Array.isArray(jezici)) {
        jezici.forEach(j => {
            if (typeof j === 'string' && j.trim() && !result.includes(j.trim())) {
                result.push(j.trim());
            }
        });
    } else if (typeof jezici === 'string' && jezici.trim() && !result.includes(jezici.trim())) {
        result.push(jezici.trim());
    }
    return result.length > 0 ? result : ['Bosanski'];
}

/**
 * Stable ID generator prioritizing official identifiers, falling back to slug
 */
function generateStableBookId(raw: RawBookRecord, index: number): string {
    const cobiss = raw['cobisbih-id'] ?? raw.cobisbih_id;
    if (cobiss !== undefined && cobiss !== null) {
        const cleanCobiss = String(cobiss).replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        if (cleanCobiss.length > 2) return cleanCobiss;
    }
    if (raw.ciphr !== undefined && raw.ciphr !== null) {
        const cleanCip = String(raw.ciphr).replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        if (cleanCip.length > 2) return cleanCip;
    }
    if (raw.isbn !== undefined && raw.isbn !== null) {
        const cleanIsbn = String(raw.isbn).replace(/[^0-9X]/gi, '').toLowerCase();
        if (cleanIsbn.length > 5) return `isbn-${cleanIsbn}`;
    }

    const slug = (raw.naslov || 'knjiga')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    return `${slug || 'zapis'}-${index + 1}`;
}

/**
 * Ingest, validate and normalize the dataset
 */
class LibraryDataService {
    private validBooks: NormalizedBook[] = [];
    private stats: DatasetStats = {
        totalRawRecords: 0,
        validBooksCount: 0,
        skippedInvalidCount: 0,
        genresCount: 0,
        publishersCount: 0,
    };

    constructor() {
        this.processDataset(rawLibraryData);
    }

    private processDataset(data: (RawBookRecord | null | undefined)[]) {
        this.stats.totalRawRecords = data.length;
        let skipped = 0;
        const normalized: NormalizedBook[] = [];

        data.forEach((item, index) => {
            if (!item || typeof item !== 'object') {
                skipped++;
                return;
            }

            const naslov = typeof item.naslov === 'string' ? item.naslov.trim() : '';
            if (!naslov) {
                skipped++;
                return;
            }

            const id = generateStableBookId(item, index);
            const autori = normalizeAuthors(item.autori || item.autor);
            const cover = typeof item.cover === 'string' && item.cover.startsWith('http') ? item.cover : null;
            const zanr = (typeof item.žanr === 'string' && item.žanr.trim()) ||
                (typeof item.zanr === 'string' && item.zanr.trim()) ||
                'Opća zbirka';
            const izdavac = typeof item.izdavac === 'string' && item.izdavac.trim()
                ? item.izdavac.trim()
                : typeof item.izdavači === 'string' && item.izdavači.trim()
                    ? item.izdavači.trim()
                    : 'Bošnjačka zajednica Vitez';
            const izdanje = item.izdanje !== undefined && item.izdanje !== null ? String(item.izdanje).trim() : 'Nije specificirano';
            const godina = extractYear(item.izdanje);
            const jezici = normalizeLanguages(item.jezik, item.jezici);

            const urednici = Array.isArray(item.urednici)
                ? item.urednici.filter(u => typeof u === 'string').map(u => u.trim())
                : typeof item.urednici === 'string' && item.urednici.trim()
                    ? [item.urednici.trim()]
                    : typeof item.urednik === 'string' && item.urednik.trim()
                        ? [item.urednik.trim()]
                        : [];

            const cobissVal = item['cobisbih-id'] ?? item.cobisbih_id;

            const normalizedBook: NormalizedBook = {
                id,
                naslov,
                autori,
                cover,
                zanr,
                izdavac,
                izdanje,
                godina,
                jezici,
                isbn: item.isbn !== undefined && item.isbn !== null ? String(item.isbn) : null,
                isbnun: typeof item.isbnun === 'string' ? item.isbnun : null,
                isbniz: typeof item.isbniz === 'string' ? item.isbniz : null,
                issn: item.issn !== undefined && item.issn !== null ? String(item.issn) : null,
                cobisbihId: cobissVal !== undefined && cobissVal !== null ? String(cobissVal) : null,
                ciphr: item.ciphr !== undefined && item.ciphr !== null ? String(item.ciphr) : null,
                broj: item.broj !== undefined && item.broj !== null ? String(item.broj) : null,
                urednici,
                kolekcija: typeof item.kolekcija === 'string' ? item.kolekcija : null,
                tip: typeof item.tip === 'string' ? item.tip : null,
                digitalResurs: typeof item.digital_resurs === 'string' ? item.digital_resurs : null,
                rawRecord: item,
            };

            normalized.push(normalizedBook);
        });

        this.validBooks = normalized;
        this.stats.validBooksCount = normalized.length;
        this.stats.skippedInvalidCount = skipped;

        const uniqueGenres = new Set(normalized.map(b => b.zanr));
        const uniquePublishers = new Set(normalized.map(b => b.izdavac));
        this.stats.genresCount = uniqueGenres.size;
        this.stats.publishersCount = uniquePublishers.size;
    }

    public getAllBooks(): NormalizedBook[] {
        return [...this.validBooks];
    }

    public getBookById(id: string): NormalizedBook | undefined {
        return this.validBooks.find(b => b.id === id);
    }

    public getStats(): DatasetStats {
        return { ...this.stats };
    }

    public getGenres(): string[] {
        const genres = Array.from(new Set(this.validBooks.map(b => b.zanr)));
        return genres.sort((a, b) => a.localeCompare(b, 'bs'));
    }

    public getPublishers(): string[] {
        const pubs = Array.from(new Set(this.validBooks.map(b => b.izdavac)));
        return pubs.sort((a, b) => a.localeCompare(b, 'bs'));
    }

    public getFeaturedBooks(limit = 4): NormalizedBook[] {
        return this.validBooks
            .filter(b => b.cover !== null)
            .slice(0, limit);
    }

    public getRelatedBooks(book: NormalizedBook, limit = 3): NormalizedBook[] {
        return this.validBooks
            .filter(b => b.id !== book.id && (b.zanr === book.zanr || b.autori.some(a => book.autori.includes(a))))
            .slice(0, limit);
    }

    public searchAndFilter(params: {
        query?: string;
        genre?: string;
        publisher?: string;
        language?: string;
        yearRange?: string;
        sortBy?: 'title_asc' | 'title_desc' | 'author_asc' | 'year_desc' | 'year_asc';
    }): NormalizedBook[] {
        let result = [...this.validBooks];

        if (params.query && params.query.trim()) {
            const q = normalizeDiacritics(params.query.trim());
            result = result.filter(book => {
                const titleMatch = normalizeDiacritics(book.naslov).includes(q);
                const authorMatch = book.autori.some(a => normalizeDiacritics(a).includes(q));
                const genreMatch = normalizeDiacritics(book.zanr).includes(q);
                const publisherMatch = normalizeDiacritics(book.izdavac).includes(q);
                const cobissMatch = book.cobisbihId && normalizeDiacritics(book.cobisbihId).includes(q);
                const cipMatch = book.ciphr && normalizeDiacritics(book.ciphr).includes(q);
                const isbnMatch = (book.isbn && book.isbn.includes(q)) || (book.isbnun && book.isbnun.includes(q));
                const editorMatch = book.urednici.some(u => normalizeDiacritics(u).includes(q));
                const collectionMatch = book.kolekcija && normalizeDiacritics(book.kolekcija).includes(q);

                return (
                    titleMatch ||
                    authorMatch ||
                    genreMatch ||
                    publisherMatch ||
                    cobissMatch ||
                    cipMatch ||
                    isbnMatch ||
                    editorMatch ||
                    collectionMatch
                );
            });
        }

        if (params.genre && params.genre !== 'all') {
            result = result.filter(b => b.zanr === params.genre);
        }

        if (params.publisher && params.publisher !== 'all') {
            result = result.filter(b => b.izdavac === params.publisher);
        }

        if (params.language && params.language !== 'all') {
            result = result.filter(b => b.jezici.includes(params.language!));
        }

        if (params.yearRange && params.yearRange !== 'all') {
            if (params.yearRange === 'before_1950') {
                result = result.filter(b => b.godina !== null && b.godina < 1950);
            } else if (params.yearRange === '1950_1990') {
                result = result.filter(b => b.godina !== null && b.godina >= 1950 && b.godina <= 1990);
            } else if (params.yearRange === '1991_2010') {
                result = result.filter(b => b.godina !== null && b.godina >= 1991 && b.godina <= 2010);
            } else if (params.yearRange === 'after_2010') {
                result = result.filter(b => b.godina !== null && b.godina > 2010);
            }
        }

        switch (params.sortBy) {
            case 'title_desc':
                result.sort((a, b) => b.naslov.localeCompare(a.naslov, 'bs'));
                break;
            case 'author_asc':
                result.sort((a, b) => (a.autori[0] || '').localeCompare(b.autori[0] || '', 'bs'));
                break;
            case 'year_desc':
                result.sort((a, b) => (b.godina ?? 0) - (a.godina ?? 0));
                break;
            case 'year_asc':
                result.sort((a, b) => (a.godina ?? 9999) - (b.godina ?? 9999));
                break;
            case 'title_asc':
            default:
                result.sort((a, b) => a.naslov.localeCompare(b.naslov, 'bs'));
                break;
        }

        return result;
    }
}

export const libraryService = new LibraryDataService();