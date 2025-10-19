import { Card, CardContent, CardHeader } from '@/components/ui/app-card';
import { useTranslations } from '@/hooks/use-translations';
import { MainLayout } from '@/layouts/main-layout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, ChevronLeft, User } from 'lucide-react';
import Markdown from '@/components/ui/markdown';

interface Article {
    id: string;
    title: string;
    content: string;
    category: {
        id: string;
        name: string;
        slug: string;
    };
    created_at: string;
}

interface Props {
    article: Article;
}

export default function Show({ article }: Props) {
    const { t } = useTranslations();
    return (
        <MainLayout>
            <Head>
                <title>{`${article.title} - Rutaku Help Center`}</title>
                <meta name="description" content={article.content.substring(0, 160)} />
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
                        <Link
                            href={route('categories.show', [
                                article.category.slug,
                            ])}
                            className="hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            {article.category.name}
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900 dark:text-white">
                            {article.title}
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

                    {/* Article Card */}
                    <Card>
                        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>
                                            {new Date(
                                                article.created_at,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <User className="h-4 w-4" />
                                        <span>{t('rutaku_team')}</span>
                                    </div>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {article.title}
                                </h1>
                                <div className="inline-block">
                                    <Link
                                        href={route('categories.show', [
                                            article.category.slug,
                                        ])}
                                        className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                                    >
                                        {article.category.name}
                                    </Link>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="pt-6">
                            <div className="prose prose-lg max-w-none">
                                <Markdown>{article.content}</Markdown>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Help Footer */}
                    <div className="mt-8 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                            {t('was_this_article_helpful')}
                        </h3>
                        <p className="mb-4 text-gray-600 dark:text-gray-300">
                            {t('if_you_need_additional_assistance')}
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href={route('home')}
                                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                {t('browse_more_articles')}
                            </Link>
                            <a
                                href="mailto:support@rutaku.com"
                                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                            >
                                {t('contact_support')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
