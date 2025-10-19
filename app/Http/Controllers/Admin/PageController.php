<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePageRequest;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function index(): Response
    {
        $pages = Page::latest()
            ->get()
            ->map(function ($page) {
                return [
                    'id' => $page->id,
                    'title' => $page->getTranslations('title'),
                    'slug' => $page->slug,
                    'created_at' => $page->created_at->toISOString(),
                ];
            });

        return Inertia::render('Admin/Pages/Index', [
            'pages' => $pages,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Pages/Create');
    }

    public function store(StorePageRequest $request): RedirectResponse
    {
        Page::create($request->validated());

        return redirect()->route('admin.pages.index')
            ->with('success', 'Page created successfully.');
    }

    public function edit(Page $page): Response
    {
        return Inertia::render('Admin/Pages/Edit', [
            'page' => [
                'id' => $page->id,
                'title' => $page->getTranslations('title'),
                'slug' => $page->slug,
                'content' => $page->getTranslations('content'),
            ],
        ]);
    }

    public function update(StorePageRequest $request, Page $page): RedirectResponse
    {
        $page->update($request->validated());

        return redirect()->route('admin.pages.index')
            ->with('success', 'Page updated successfully.');
    }

    public function destroy(Page $page): RedirectResponse
    {
        $page->delete();

        return redirect()->route('admin.pages.index')
            ->with('success', 'Page deleted successfully.');
    }
}
