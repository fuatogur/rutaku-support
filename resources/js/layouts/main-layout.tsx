import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Globe, Home } from 'lucide-react';
import {ThemeToggle} from "@/components/theme-toggle";
import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from '@/hooks/use-translations';

interface Props {
    children: React.ReactNode;
}

export function MainLayout({ children }: Props) {
    const { locales, locale } = usePage().props as any;
    const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);
    const langDropdownRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslations();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
                setLangDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [langDropdownRef]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href={route('home')} className="flex items-center space-x-2">
                            <BookOpen className="h-8 w-8 text-blue-600" />
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Rutaku</h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{t('help_center')}</p>
                            </div>
                        </Link>

                        <nav className="flex items-center space-x-1">
                            <div className="relative" ref={langDropdownRef}>
                                <button
                                    onClick={() => setLangDropdownOpen(!isLangDropdownOpen)}
                                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 px-3 py-2 rounded-md"
                                >
                                    <Globe className="h-4 w-4" />
                                    <span>{locales[locale].native}</span>
                                </button>
                                {isLangDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                                        {Object.values(locales).map((locale: any) => (
                                            <a
                                                key={locale.code}
                                                href={locale.url}
                                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                {locale.native}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <ThemeToggle />
                        </nav>
                    </div>
                </div>
            </header>

            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <p>&copy; 2025 Rutaku. {t('all_rights_reserved')}</p>
                        <p className="mt-2 text-sm">
                            {t('need_more_help')}{' '}
                            <a href="mailto:support@rutaku.com"
                               className="text-blue-600 dark:text-blue-400 hover:underline">
                                {t('contact_support_team')}
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
