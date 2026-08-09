import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);

    const languages = [
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "fr", name: "Français", flag: "🇫🇷" },
        { code: "rw", name: "Kinyarwanda", flag: "🇷🇼" },
    ];

    const currentLang = languages.find(
        (l) => l.code === i18n.language
    ) || languages[0];

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
        setOpen(false);
        localStorage.setItem("language", code);
    };

    return (
        <div className="relative inline-block text-left">

            {/* BUTTON */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
            >
                <span className="text-lg">{currentLang.flag}</span>
                <span className="text-sm font-medium">
                    {currentLang.name}
                </span>

                <svg
                    className="w-4 h-4 ml-1 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* DROPDOWN */}
            {open && (
                <div className="absolute mt-2 w-48 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 transition"
                        >
                            <span className="text-lg">{lang.flag}</span>
                            <span className="text-sm">
                                {lang.name}
                            </span>

                            {i18n.language === lang.code && (
                                <span className="ml-auto text-green-500 text-xs">
                                    ●
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}