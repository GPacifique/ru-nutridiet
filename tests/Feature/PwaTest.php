<?php

it('serves the service worker from the application root', function () {
    $this->get('/sw.js')
        ->assertOk()
        ->assertHeader('Content-Type', 'application/javascript; charset=UTF-8')
        ->assertHeader('Service-Worker-Allowed', '/')
        ->assertSee('runutridiet-pwa-v2', false);
});

it('provides installable manifest icons', function () {
    $manifest = json_decode(
        file_get_contents(public_path('site.webmanifest')),
        true,
        flags: JSON_THROW_ON_ERROR
    );

    expect($manifest['id'])->toBe('/')
        ->and($manifest['start_url'])->toBe('/')
        ->and($manifest['display'])->toBe('standalone')
        ->and($manifest['icons'])->toContain(
            [
                'src' => '/images/pwa-icon-192.png',
                'sizes' => '192x192',
                'type' => 'image/png',
                'purpose' => 'any',
            ],
            [
                'src' => '/images/pwa-icon-512.png',
                'sizes' => '512x512',
                'type' => 'image/png',
                'purpose' => 'any',
            ],
            [
                'src' => '/images/pwa-icon-512.png',
                'sizes' => '512x512',
                'type' => 'image/png',
                'purpose' => 'maskable',
            ]
        );
});
