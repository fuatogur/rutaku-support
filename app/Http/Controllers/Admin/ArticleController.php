<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArticleRequest;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function index(): Response
    {
        $articles = Article::with('category')
            ->latest()
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->getTranslations('title'),
                    'slug' => $article->slug,
                    'published' => $article->published,
                    'category' => [
                        'id' => $article->category->id,
                        'name' => $article->category->getTranslations('name'),
                    ],
                    'created_at' => $article->created_at->toISOString(),
                ];
            });

        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles,
        ]);
    }

    public function create(): Response
    {
        $categories = Category::orderBy('name->en')->get()->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->getTranslations('name'),
            ];
        });

        return Inertia::render('Admin/Articles/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(StoreArticleRequest $request): RedirectResponse
    {
        Article::create($request->validated());

        return redirect()->route('admin.articles.index')
            ->with('success', 'Article created successfully.');
    }

    public function edit(Article $article): Response
    {
        $categories = Category::orderBy('name->en')->get()->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->getTranslations('name'),
            ];
        });

        return Inertia::render('Admin/Articles/Edit', [
            'article' => [
                'id' => $article->id,
                'title' => $article->getTranslations('title'),
                'slug' => $article->slug,
                'content' => $article->getTranslations('content'),
                'published' => $article->published,
                'category_id' => $article->category_id,
            ],
            'categories' => $categories,
        ]);
    }

    public function update(StoreArticleRequest $request, Article $article): RedirectResponse
    {
        $article->update($request->validated());

        return redirect()->route('admin.articles.index')
            ->with('success', 'Article updated successfully.');
    }

    public function destroy(Article $article): RedirectResponse
    {
        $article->delete();

        return redirect()->route('admin.articles.index')
            ->with('success', 'Article deleted successfully.');
    }
}
