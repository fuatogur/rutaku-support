<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function show(string $slug): Response
    {
        $locale = app()->getLocale();

        $category = Category::where('slug', $slug)->firstOrFail();

        $articles = $category->articles()
            ->where('published', true)
            ->latest()
            ->get()
            ->map(function ($article) use ($locale) {
                return [
                    'id' => $article->id,
                    'title' => $article->getTranslation('title', $locale),
                    'slug' => $article->slug,
                    'content' => $article->getTranslation('content', $locale),
                    'created_at' => $article->created_at->toISOString(),
                ];
            });

        return Inertia::render('Categories/Show', [
            'category' => [
                'id' => $category->id,
                'name' => $category->getTranslation('name', $locale),
                'description' => $category->getTranslation('description', $locale),
            ],
            'articles' => $articles,
        ]);
    }
}
