import { SearchForm } from '@/components/search-form';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/app-card';
import { useTranslations } from '@/hooks/use-translations';
import { MainLayout } from '@/layouts/main-layout';
import { Head, Link } from '@inertiajs/react';
import { Book, Calendar, ChevronLeft, Search } from 'lucide-react';

export default function SearchPage({ articles, query }) {
    const { t } = useTranslations();
    const title = `Search Results for "${query}" - Rutaku Help Center`;
    const description = "Search for help articles and answers about Rutaku game accounts.";
    return (
        <MainLayout>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>

            <div className="flex-1">
                <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <Link
                            href={route('home')}
                            className="hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            {t('help_center')}
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900 dark:text-gray-100">
                            {t('search')}
                        </span>
                    </nav>

                    {/* Back Button */}
                    <Link
                        href={route('home')}
                        className="mb-6 inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span>{t('back_to_help_center')}</span>
                    </Link>

                    {/* Search Header */}
                    <div className="mb-8">
                        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
                            {t('search_help_articles')}
                        </h1>
                        <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                            {t('find_answers_to_your_questions')}
                        </p>

                        {/* Search Form */}
                        <div className="max-w-2xl">
                            <SearchForm />
                        </div>
                    </div>

                    {/* Search Results */}
                    <div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                {t('search_results_for', { query })}
                            </h2>
                            <p className="mt-1 text-gray-600 dark:text-gray-400">
                                {t('found_articles', {
                                    count: articles?.length || 0,
                                })}
                            </p>
                        </div>

                        {articles?.length > 0 ? (
                            <div className="space-y-6">
                                {articles?.map((article) => (
                                    <Link
                                        key={article.id}
                                        href={route('articles.show', [
                                            article.slug,
                                        ])}
                                    >
                                        <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                                            <CardHeader>
                                                <div className="mb-2 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <Book className="h-4 w-4" />
                                                    <span>
                                                        {article.category.name}
                                                    </span>
                                                    <Calendar className="ml-auto h-4 w-4" />
                                                    <time>
                                                        {new Date(
                                                            article.created_at,
                                                        ).toLocaleDateString()}
                                                    </time>
                                                </div>
                                                <CardTitle className="text-lg hover:text-blue-600 dark:hover:text-blue-400">
                                                    {article.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {article.content
                                                        .replace(/[#*]/g, '')
                                                        .substring(0, 200)}
                                                    ...
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <Search className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                                    {t('no_articles_found')}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {t('try_different_keywords')}
                                </p>
                                <Link
                                    href={route('home')}
                                    className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                >
                                    {t('browse_categories')}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
