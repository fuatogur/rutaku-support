<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $nameEn = fake()->unique()->words(2, true);
        $nameTr = 'TR '.Str::title($nameEn);

        return [
            'name' => [
                'en' => Str::title($nameEn),
                'tr' => $nameTr,
            ],
            'slug' => Str::slug($nameEn),
            'description' => [
                'en' => fake()->sentence(8),
                'tr' => 'TR '.fake()->sentence(8),
            ],
        ];
    }
}
