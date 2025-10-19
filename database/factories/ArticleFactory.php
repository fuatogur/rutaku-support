<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $titleEn = fake()->unique()->sentence(3);
        $titleTr = 'TR '.Str::title($titleEn);

        return [
            'title' => [
                'en' => $titleEn,
                'tr' => $titleTr,
            ],
            'slug' => Str::slug($titleEn).'-'.Str::random(5),
            'content' => [
                'en' => fake()->paragraphs(3, true),
                'tr' => 'TR '.fake()->paragraphs(3, true),
            ],
            'published' => fake()->boolean(70),
            'category_id' => Category::factory(),
        ];
    }
}
