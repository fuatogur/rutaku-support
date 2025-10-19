<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function show(Article $article): Response
    {
        $article->load('category');

//        abort_if(!$article->is_published, 404);

        $locale = app()->getLocale();

        return Inertia::render('Articles/Show', [
            'article' => [
                'id' => $article->id,
                'title' => $article->getTranslation('title', $locale),
                'content' => $article->getTranslation('content', $locale),
                'category' => [
                    'id' => $article->category->id,
                    'name' => $article->category->getTranslation('name', $locale),
                    'slug' => $article->category->slug,
                ],
                'created_at' => $article->created_at->toISOString(),
            ],
        ]);
    }
}
