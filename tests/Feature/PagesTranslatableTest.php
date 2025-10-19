<?php

use App\Models\Page;

it('creates a translatable page and fetches localized content', function (): void {
    $page = Page::factory()->create();

    expect($page->getTranslation('title', 'en'))->not()->toBeEmpty()
        ->and($page->getTranslation('title', 'tr'))->not()->toBeEmpty()
        ->and($page->getTranslation('content', 'en'))->not()->toBeEmpty()
        ->and($page->getTranslation('content', 'tr'))->not()->toBeEmpty();
});
