import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/app-card';
import { useTranslations } from '@/hooks/use-translations';
import { MainLayout } from '@/layouts/main-layout';
import { Head, Link } from '@inertiajs/react';
import { Book, Calendar, ChevronLeft } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    description: string;
}

interface Article {
    id: string;
    title: string;
    slug: string;
    content: string;
    created_at: string;
}

interface Props {
    category: Category;
    articles: Article[];
}

export default function Show({ category, articles }: Props) {
    const { t } = useTranslations();
    return (
        <MainLayout>
            <Head>
                <title>{`${category.name} - Rutaku Help Center`}</title>
                <meta name="description" content={category.description} />
            </Head>

            <div className="flex-1">
                <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <Link
                            href={route('home')}
                            className="hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            {t('help_center')}
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900 dark:text-white">
                            {category.name}
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

                    {/* Category Header */}
                    <div className="mb-8">
                        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                            {category.name}
                        </h1>
                        {category.description && (
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                {category.description}
                            </p>
                        )}
                    </div>

                    {/* Articles */}
                    {articles.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {articles.map((article) => (
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
                                                <span>{category.name}</span>
                                                <Calendar className="ml-auto h-4 w-4" />
                                                <span>
                                                    {new Date(
                                                        article.created_at,
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <CardTitle className="text-lg hover:text-blue-600 dark:hover:text-blue-400">
                                                {article.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                                                {article.content
                                                    .replace(/[#*]/g, '')
                                                    .substring(0, 150)}
                                                ...
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <Book className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                                {t('no_articles_found')}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                {t('no_articles_in_category_description')}
                            </p>
                            <Link
                                href="/"
                                className="mt-4 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                            >
                                {t('browse_other_categories')}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
