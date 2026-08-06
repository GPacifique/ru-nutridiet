<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

/**
 * HomeController
 *
 * Supplies every piece of content the Home.jsx page renders:
 * hero copy, the stat strip, the three approach pillars, the shop
 * product cards, and the testimonial. Kept as plain arrays here so
 * front-end and back-end shapes match exactly (same keys used in
 * Home.jsx: id, name, price, tag, focus, format, serving, pairsWith, img).
 *
 * Swap the array building below for real Eloquent models
 * (e.g. Product::query()->where('active', true)->get()) once the
 * catalog is backed by a database.
 */
class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home', [
            'hero'       => $this->hero(),
            'stats'      => $this->stats(),
            'pillars'    => $this->pillars(),
            'products'   => $this->products(),
            'testimonial'=> $this->testimonial(),
        ]);
    }

    protected function hero(): array
    {
        return [
            'eyebrow' => 'Clinical Nutrition Studio · Est. 2016',
            'heading' => 'Food, read like lab results — not guesswork.',
            'lede'    => 'We pair registered dietitians with real bloodwork to build '
                . 'eating plans that fit your actual life. No detoxes, no restriction '
                . 'theatre — just a protocol you can follow on a Tuesday.',
            'note'    => '01 — Assess · 02 — Plan · 03 — Adjust',
            'image'   => 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=900&q=80&auto=format&fit=crop',
            'caseNote'=> [
                'label' => 'Case note, wk 4',
                'text'  => 'Iron panel normalized. Energy self-rating up from 3/10 to 8/10.',
            ],
        ];
    }

    protected function stats(): array
    {
        return [
            ['value' => '1,200+', 'label' => 'Clients guided'],
            ['value' => '4.9',    'label' => 'Average rating'],
            ['value' => '92%',    'label' => 'Return for a 2nd protocol'],
            ['value' => '3',      'label' => 'Registered dietitians on staff'],
        ];
    }

    protected function pillars(): array
    {
        return [
            [
                'title' => 'Assess',
                'copy'  => 'Bloodwork, intake history, and a real conversation before '
                    . 'anything is ever recommended.',
                'icon'  => 'assess',
            ],
            [
                'title' => 'Plan',
                'copy'  => "A written protocol built around your kitchen, your schedule, "
                    . "and your labs — not a generic sheet.",
                'icon'  => 'plan',
            ],
            [
                'title' => 'Adjust',
                'copy'  => "Monthly check-ins to re-test, re-tune, and retire anything "
                    . "that isn't earning its place.",
                'icon'  => 'adjust',
            ],
        ];
    }

    protected function products(): array
    {
        return [
            [
                'id'        => '01',
                'name'      => 'Daily Greens Concentrate',
                'price'     => '38',
                'tag'       => 'Best seller',
                'focus'     => 'Micronutrient gap-filling',
                'format'    => 'Powder · 30 servings',
                'serving'   => '1 scoop, morning',
                'pairsWith' => 'Citrus or ginger',
                'img'       => 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&q=80&auto=format&fit=crop',
            ],
            [
                'id'        => '02',
                'name'      => 'Gut Reset Fiber Blend',
                'price'     => '32',
                'tag'       => 'Practitioner formulated',
                'focus'     => 'Digestive regularity',
                'format'    => 'Powder · 21 servings',
                'serving'   => '1 tbsp, with water',
                'pairsWith' => 'Oats or yogurt',
                'img'       => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80&auto=format&fit=crop',
            ],
            [
                'id'        => '03',
                'name'      => 'Adaptogen Calm Tonic',
                'price'     => '42',
                'tag'       => 'New',
                'focus'     => 'Stress & sleep support',
                'format'    => 'Tincture · 30ml',
                'serving'   => '20 drops, evening',
                'pairsWith' => 'Warm water or tea',
                'img'       => 'https://images.unsplash.com/photo-1495195129352-aeb325a55b65?w=600&q=80&auto=format&fit=crop',
            ],
            [
                'id'        => '04',
                'name'      => 'Iron & B12 Complex',
                'price'     => '29',
                'tag'       => 'Clinic favorite',
                'focus'     => 'Energy, common deficiency',
                'format'    => 'Capsules · 60ct',
                'serving'   => '2 caps, with food',
                'pairsWith' => 'Vitamin C source',
                'img'       => 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&q=80&auto=format&fit=crop',
            ],
        ];
    }

    protected function testimonial(): array
    {
        return [
            'quote' => "It's the first plan that survived contact with my actual "
                . "calendar. Three months in, my labs — and my energy — finally "
                . "agree with each other.",
            'cite'  => 'Client, ongoing since 2024',
        ];
    }
}