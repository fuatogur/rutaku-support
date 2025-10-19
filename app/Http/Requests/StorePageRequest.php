<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $pageId = $this->route('page')?->id;

        return [
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('pages', 'slug')->ignore($pageId),
            ],
            'title' => ['required', 'array'],
            'title.en' => ['required', 'string', 'max:255'],
            'title.tr' => ['required', 'string', 'max:255'],
            'content' => ['nullable', 'array'],
            'content.en' => ['nullable', 'string'],
            'content.tr' => ['nullable', 'string'],
        ];
    }

    /**
     * Get custom attribute names for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'title.en' => 'title (English)',
            'title.tr' => 'title (Turkish)',
            'content.en' => 'content (English)',
            'content.tr' => 'content (Turkish)',
        ];
    }
}
