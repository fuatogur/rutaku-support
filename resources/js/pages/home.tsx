import { SearchForm } from '@/components/search-form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/app-card';
import { useTranslations } from '@/hooks/use-translations';
import { MainLayout } from '@/layouts/main-layout';
import { Head, Link } from '@inertiajs/react';
import { Book, ChevronRight } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    articles_count: number;
}

interface Article {
    id: string;
    title: string;
    slug: string;
    content: string;
    category: {
        name: string;
        slug: string;
    };
    created_at: string;
}

interface Props {
    categories: Category[];
    recentArticles: Article[];
}

export default function Home({ categories, recentArticles }: Props) {
    const { t } = useTranslations();
    return (
        <MainLayout>
            <Head>
                <title>Rutaku Help Center</title>
                <meta name="description" content="Find answers to your questions about Rutaku." />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Rutaku Help Center" />
                <meta property="og:description" content="Find answers to your questions about Rutaku." />
                <meta property="og:url" content="https://support.rutaku.com" />
                <meta property="og:site_name" content="Rutaku Help Center" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Rutaku Help Center" />
                <meta name="twitter:description" content="Find answers to your questions about Rutaku." />
            </Head>

            <div className="flex-1">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white dark:from-blue-700 dark:to-blue-900">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <h1 className="mb-4 text-4xl font-bold">
                            {t('how_can_we_help_you')}
                        </h1>
                        <p className="mb-8 text-xl text-blue-100">
                            {t('find_answers')}
                        </p>

                        {/* Search Bar */}
                        <SearchForm />
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    {/* Categories */}
                    <section className="mb-12">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {t('browse_by_category')}
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={route('categories.show', [
                                        category.slug,
                                    ])}
                                >
                                    <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                <span>{category.name}</span>
                                                <ChevronRight className="h-4 w-4" />
                                            </CardTitle>
                                            <CardDescription>
                                                {category.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {t('articles_count', {
                                                    count: category.articles_count,
                                                })}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Recent Articles */}
                    <section>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {t('recent_articles')}
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {recentArticles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={route('articles.show', [
                                        article.slug,
                                    ])}
                                >
                                    <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
                                        <CardHeader>
                                            <div className="mb-2 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                                <Book className="h-4 w-4" />
                                                <span>
                                                    {article.category.name}
                                                </span>
                                            </div>
                                            <CardTitle className="text-lg">
                                                {article.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                                                {article.content.substring(
                                                    0,
                                                    150,
                                                )}
                                                ...
                                            </p>
                                            <p className="mt-2 text-xs text-gray-400">
                                                {new Date(
                                                    article.created_at,
                                                ).toLocaleDateString()}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </MainLayout>
    );
}
