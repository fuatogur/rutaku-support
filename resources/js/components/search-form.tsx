import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';
import useTranslations from '@/hooks/use-translations'

export function SearchForm() {
    const [searchQuery, setSearchQuery] = useState('');

    const {t} = useTranslations();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get(route('search') + `?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                <Input
                    type="text"
                    placeholder={t('Search for articles...')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 py-4 text-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg border-gray-200 dark:border-gray-600"
                />
            </div>
        </form>
    );
}
