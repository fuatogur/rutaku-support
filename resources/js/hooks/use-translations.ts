import { usePage } from '@inertiajs/react';

interface PageProps {
    locale: string
    translations: {
        [key: string]: {
            [key: string]: string
        }
    }
}

function useTranslation() {
    const {locale, translations} = usePage<PageProps>().props;

    // @ts-ignore
    function t(key, params: null | object = null) {
        // @ts-ignore

        if (params) {
            let translation = translations[locale][key] || translations['en'][key] || key;
            Object.keys(params).forEach(paramKey => {
                if (paramKey === 'count') {
                    // handle cases like {count} article | {count} articles

                    const parts = translation.split('|').map(part => part.trim());
                    translation = params[paramKey] === 1 ? parts[0] : parts[1];
                }

                const regex = new RegExp(`{${paramKey}}`, 'g');
                translation = translation.replace(regex, params[paramKey]);
            });
            return translation;
        }

        return translations[locale]?.[key] || translations.en?.[key] || key;
    }

    return { t };
}

const useTranslations = useTranslation

export { useTranslations, useTranslation }

export default useTranslation;
