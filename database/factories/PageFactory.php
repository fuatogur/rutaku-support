<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Page>
 */
class PageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $titleEn = fake()->unique()->sentence(3);

        return [
            'slug' => Str::slug($titleEn),
            'title' => [
                'en' => $titleEn,
                'tr' => 'TR '.Str::title($titleEn),
            ],
            'content' => [
                'en' => fake()->paragraphs(2, true),
                'tr' => 'TR '.fake()->paragraphs(2, true),
            ],
        ];
    }
}
