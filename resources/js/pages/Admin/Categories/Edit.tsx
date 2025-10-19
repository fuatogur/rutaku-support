import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { slugify } from '@/lib/utils';
import AppLayout from '@/layouts/app-layout';

interface Category {
  id: string;
  name: { en: string; tr: string };
  slug: string;
  description: { en: string; tr: string };
}

interface Props {
  category: Category;
}

export default function Edit({ category }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: category.name,
    slug: category.slug,
    description: category.description,
  });

  const [activeTab, setActiveTab] = useState<'en' | 'tr'>('en');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    put(`/admin/categories/${category.id}`);
  };

  const handleNameChange = (lang: 'en' | 'tr', value: string) => {
    setData((prev) => ({
      ...prev,
      name: { ...prev.name, [lang]: value },
    }));
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Edit Category</h1>

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
                Name ({activeTab.toUpperCase()})
              </label>
              <input
                type="text"
                value={data.name[activeTab]}
                onChange={(e) => handleNameChange(activeTab, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
              {errors[`name.${activeTab}`] && (
                <p className="mt-1 text-sm text-red-600">{errors[`name.${activeTab}`]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description ({activeTab.toUpperCase()})
              </label>
              <textarea
                value={data.description[activeTab]}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    description: { ...prev.description, [activeTab]: e.target.value },
                  }))
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
              {errors[`description.${activeTab}`] && (
                <p className="mt-1 text-sm text-red-600">{errors[`description.${activeTab}`]}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Slug
            </label>
            <input
              type="text"
              value={data.slug}
              onChange={(e) => setData('slug', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            />
            {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={processing}>
              Update Category
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
