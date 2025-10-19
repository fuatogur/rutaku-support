<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $locale = app()->getLocale();

        $categories = Category::withCount('articles')
            ->get()
            ->map(function ($category) use ($locale) {
                return [
                    'id' => $category->id,
                    'name' => $category->getTranslation('name', $locale),
                    'slug' => $category->slug,
                    'description' => $category->getTranslation('description', $locale),
                    'articles_count' => $category->articles_count,
                ];
            });

        $recentArticles = Article::with('category')
            ->where('published', true)
            ->latest()
            ->limit(6)
            ->get()
            ->map(function ($article) use ($locale) {
                return [
                    'id' => $article->id,
                    'title' => $article->getTranslation('title', $locale),
                    'slug' => $article->slug,
                    'content' => $article->getTranslation('content', $locale),
                    'category' => [
                        'name' => $article->category->getTranslation('name', $locale),
                        'slug' => $article->category->slug,
                    ],
                    'created_at' => $article->created_at->toISOString(),
                ];
            });

        return Inertia::render('home', [
            'categories' => $categories,
            'recentArticles' => $recentArticles,
        ]);
    }

    public function search(Request $request): Response
    {
        $query = $request->q;
        $locale = app()->getLocale();

        $articles = Article::with('category')
            ->where('published', true)
            ->where(function ($q) use ($query, $locale) {
                $q->where("title->{$locale}", 'like', "%{$query}%")
                    ->orWhere("content->{$locale}", 'like', "%{$query}%");
            })
            ->latest()
            ->get()
            ->map(function ($article) use ($locale) {
                return [
                    'id' => $article->id,
                    'title' => $article->getTranslation('title', $locale),
                    'slug' => $article->slug,
                    'content' => $article->getTranslation('content', $locale),
                    'category' => [
                        'name' => $article->category->getTranslation('name', $locale),
                        'slug' => $article->category->slug,
                    ],
                    'created_at' => $article->created_at->toISOString(),
                ];
            });

        return Inertia::render('search', [
            'articles' => $articles,
            'query' => $query,
        ]);
    }
}
