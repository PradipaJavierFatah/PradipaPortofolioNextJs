"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, DICTIONARY } from "./dictionary";

type LanguageContextType = {
    locale: Locale;
    toggleLanguage: () => void;
    t: typeof DICTIONARY['en'];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<Locale>('en');

    // Optional: Persist language choice
    useEffect(() => {
        const saved = localStorage.getItem('locale') as Locale;
        if (saved && (saved === 'en' || saved === 'id')) {
            setLocale(saved);
        }
    }, []);

    const toggleLanguage = () => {
        const newLocale = locale === 'en' ? 'id' : 'en';
        setLocale(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    const t = DICTIONARY[locale];

    return (
        <LanguageContext.Provider value={{ locale, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
