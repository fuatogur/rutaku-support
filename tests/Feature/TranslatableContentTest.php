<?php

use App\Models\Article;
use App\Models\Category;

it('creates translatable category and article and resolves translations', function (): void {
    $category = Category::factory()->create();

    expect($category->getTranslation('name', 'en'))
        ->not()->toBeEmpty()
        ->and($category->getTranslation('name', 'tr'))
        ->not()->toBeEmpty();

    $article = Article::factory()->for($category)->create([
        'published' => true,
    ]);

    expect($article->category->is($category))->toBeTrue()
        ->and($article->getTranslation('title', 'en'))
        ->not()->toBeEmpty()
        ->and($article->getTranslation('title', 'tr'))
        ->not()->toBeEmpty();
});
