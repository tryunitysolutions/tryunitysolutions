import React, { createContext, useState, useContext, useEffect } from 'react';
import enTranslations from './locales/en.json';
import urTranslations from './locales/ur.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en'); // Default language is English

  const translations = {
    en: enTranslations,
    ur: urTranslations,
  };

  const t = (key) => {
    try {
      const keys = key.split('.');
      let result = translations[lang];
      
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = result[k];
        } else {
          console.warn(`Translation key '${key}' not found for language '${lang}'`);
          return key;
        }
      }
      
      // If we reached here, result is the final value. Return it regardless of type.
      return result;
    } catch (error) {
      console.error(`Error translating key '${key}':`, error);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext); 