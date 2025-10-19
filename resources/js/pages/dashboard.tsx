import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardTitle } from '@/components/ui/card';
import { FileText, FolderOpen } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Üst Grid – Hızlı Erişim Kartları */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <Link href="/admin/categories">
                        <Card className="relative aspect-video overflow-hidden border border-sidebar-border/70 dark:border-sidebar-border hover:shadow-lg transition-shadow cursor-pointer">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10" />
                            <div className="absolute inset-0 flex flex-col justify-between p-6">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        Categories
                                    </CardTitle>
                                    <FolderOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Manage article categories
                                </p>
                            </div>
                        </Card>
                    </Link>

                    <Link href="/admin/articles">
                        <Card className="relative aspect-video overflow-hidden border border-sidebar-border/70 dark:border-sidebar-border hover:shadow-lg transition-shadow cursor-pointer">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10" />
                            <div className="absolute inset-0 flex flex-col justify-between p-6">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        Articles
                                    </CardTitle>
                                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Create and edit articles
                                </p>
                            </div>
                        </Card>
                    </Link>

                    {/*<Link href="/admin/pages">*/}
                    {/*    <Card className="relative aspect-video overflow-hidden border border-sidebar-border/70 dark:border-sidebar-border hover:shadow-lg transition-shadow cursor-pointer">*/}
                    {/*        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10" />*/}
                    {/*        <div className="absolute inset-0 flex flex-col justify-between p-6">*/}
                    {/*            <div className="flex items-center justify-between">*/}
                    {/*                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">*/}
                    {/*                    Pages*/}
                    {/*                </CardTitle>*/}
                    {/*                <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />*/}
                    {/*            </div>*/}
                    {/*            <p className="text-sm text-gray-600 dark:text-gray-400">*/}
                    {/*                Manage static pages*/}
                    {/*            </p>*/}
                    {/*        </div>*/}
                    {/*    </Card>*/}
                    {/*</Link>*/}
                </div>

                {/* Ana İçerik Alanı */}
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <div className="relative p-6">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Welcome to your help center admin panel
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
