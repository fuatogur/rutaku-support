import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import Markdown from '@/components/ui/markdown';
import { slugify } from '@/lib/utils';

interface Category {
  id: string;
  name: { en: string; tr: string };
}

interface Props {
  categories: Category[];
}

interface FormData {
  title: { en: string; tr: string };
  slug: string;
  content: { en: string; tr: string };
  category_id: string;
  published: boolean;
}

export default function Create({ categories }: Props) {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    title: { en: '', tr: '' },
    slug: '',
    content: { en: '', tr: '' },
    category_id: categories?.[0]?.id ?? '',
    published: false,
  });

  const [activeTab, setActiveTab] = useState<'en' | 'tr'>('en');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/admin/articles');
  };

  const handleTitleChange = (lang: 'en' | 'tr', value: string) => {
    setData((prev) => ({
      ...prev,
      title: { ...prev.title, [lang]: value },
      slug: lang === 'en' && !prev.slug ? slugify(value) : prev.slug,
    }));
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Create Article</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-6">
          <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setActiveTab('en')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'en'
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tr')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'tr'
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Turkish
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title ({activeTab.toUpperCase()})
              </label>
              <input
                type="text"
                value={data.title[activeTab]}
                onChange={(e) => handleTitleChange(activeTab, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
              {errors[`title.${activeTab}`] && (
                <p className="mt-1 text-sm text-red-600">{errors[`title.${activeTab}`]}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content ({activeTab.toUpperCase()})</label>
                <textarea
                  value={data.content[activeTab]}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      content: { ...prev.content, [activeTab]: e.target.value },
                    }))
                  }
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                />
                {errors[`content.${activeTab}`] && (
                  <p className="mt-1 text-sm text-red-600">{errors[`content.${activeTab}`]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview ({activeTab.toUpperCase()})</label>
                <div className="prose max-h-[340px] overflow-auto border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-gray-900">
                  <Markdown>{data.content[activeTab] || ''}</Markdown>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug</label>
              <input
                type="text"
                value={data.slug}
                onChange={(e) => setData('slug', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
              {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select
                value={data.category_id}
                onChange={(e) => setData('category_id', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name.en} / {c.name.tr}
                  </option>
                ))}
              </select>
              {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
            </div>

            <div className="flex items-center gap-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={data.published}
                  onChange={(e) => setData('published', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Published</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={processing}>
              Create Article
            </Button>
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
