// Sirovi zapis iz dataset-a (JSON)
export interface RawBookRecord {
    naslov?: string;
    autori?: string;
    autor?: string;
    cover?: string | null;
    žanr?: string;
    zanr?: string;
    izdavac?: string;
    izdavači?: string;
    izdanje?: string | number;
    broj?: string | number;
    jezik?: string;
    jezici?: string;
    isbn?: string | number;
    isbnun?: string;
    isbniz?: string;
    isbnk?: string;
    issn?: string | number;
    'cobisbih-id'?: string | number;
    cobisbih_id?: string | number;
    ciphr?: string | number;
    urednici?: string | string[];
    urednik?: string;
    kolekcija?: string;
    tip?: string;
    digital_resurs?: string;
    [key: string]: any;
}

// Normalizovani oblik knjige spreman za prikaz
export interface NormalizedBook {
    id: string;
    naslov: string;
    autori: string[];
    cover: string | null;
    zanr: string;
    izdavac: string;
    izdanje: string;
    godina: number | null;
    jezici: string[];
    isbn: string | null;
    isbnun: string | null;
    isbniz: string | null;
    issn: string | null;
    cobisbihId: string | null;
    ciphr: string | null;
    broj: string | null;
    urednici: string[];
    kolekcija: string | null;
    tip: string | null;
    digitalResurs: string | null;
    rawRecord: RawBookRecord;
}

// Statistika bibliotečkog fonda
export interface DatasetStats {
    totalRawRecords: number;
    validBooksCount: number;
    skippedInvalidCount: number;
    genresCount: number;
    publishersCount: number;
}

// Stanje filtera u katalogu
export interface FilterState {
    searchQuery: string;
    selectedGenre: string;
    selectedPublisher: string;
    selectedLanguage: string;
    selectedYearRange: string;
    sortBy: 'title_asc' | 'title_desc' | 'author_asc' | 'year_desc' | 'year_asc';
}