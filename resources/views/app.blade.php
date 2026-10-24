<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    @php
        $pageComponent = data_get($page, 'component', '');
        $pageProps = data_get($page, 'props', []);
        $pagePath = '/' . ltrim(request()->path(), '/');
        $pageTitle = 'RUNUTRIDIET | Nutrition, Wellness & Professional Education';
        $pageDescription = 'Evidence-based nutrition care, wellness services, professional education, CPD courses, and personalized nutrition programs in Rwanda.';
        $shareImage = asset('images/flyer.png');
        $shareImageAlt = 'RUNUTRIDIET — Nutrition and healthy lifestyle services in Rwanda';
        $ogType = 'website';

        if ($pageComponent === 'Home') {
            $pageTitle = data_get($pageProps, 'brand.slogan', $pageTitle) . ' | RUNUTRIDIET';
        } elseif (str_starts_with($pagePath, '/services')) {
            $pageTitle = 'Nutrition & Wellness Services | RUNUTRIDIET';
        } elseif (str_starts_with($pagePath, '/courses')) {
            $pageTitle = 'CPD Courses & Nutrition Education | RUNUTRIDIET';
        } elseif (str_starts_with($pagePath, '/shop') || str_starts_with($pagePath, '/products')) {
            $pageTitle = 'Nutrition Shop | RUNUTRIDIET';
        } elseif (str_starts_with($pagePath, '/blog') || str_starts_with($pagePath, '/articles')) {
            $pageTitle = 'Nutrition Articles & Research | RUNUTRIDIET';
        } elseif (str_starts_with($pagePath, '/contact')) {
            $pageTitle = 'Contact RUNUTRIDIET';
        }

        $content = [];
        if ($pageComponent === 'Blog/Show') {
            $content = data_get($pageProps, 'article', data_get($pageProps, 'post', []));
            $ogType = 'article';
        } elseif ($pageComponent === 'Shop/Show') {
            $content = data_get($pageProps, 'product', []);
        } elseif ($pageComponent === 'Courses/Show') {
            $content = data_get($pageProps, 'course', []);
        }

        $contentTitle = data_get($content, 'title');
        $contentDescription = data_get($content, 'excerpt')
            ?: data_get($content, 'description')
            ?: data_get($content, 'short_description');

        if ($contentTitle) {
            $pageTitle = $contentTitle . ' | RUNUTRIDIET';
        }

        if ($contentDescription) {
            $pageDescription = $contentDescription;
        }

        $pageDescription = trim(preg_replace('/\s+/', ' ', strip_tags($pageDescription)));
        if (mb_strlen($pageDescription) > 200) {
            $pageDescription = mb_substr($pageDescription, 0, 197) . '...';
        }

        $imageCandidate = data_get($content, 'thumbnail')
            ?: data_get($content, 'image_url')
            ?: data_get($content, 'image');

        if ($imageCandidate) {
            if (preg_match('/^https?:\/\//i', $imageCandidate)) {
                $shareImage = $imageCandidate;
            } elseif (str_starts_with($imageCandidate, '//')) {
                $shareImage = request()->getScheme() . ':' . $imageCandidate;
            } elseif (str_starts_with($imageCandidate, '/')) {
                $shareImage = url($imageCandidate);
            } elseif (str_starts_with($imageCandidate, 'images/') || str_starts_with($imageCandidate, 'storage/')) {
                $shareImage = asset($imageCandidate);
            } else {
                $shareImage = asset('storage/' . ltrim($imageCandidate, '/'));
            }
            $shareImageAlt = $contentTitle ?: $shareImageAlt;
        }

        $imageExtension = strtolower(pathinfo(parse_url($shareImage, PHP_URL_PATH), PATHINFO_EXTENSION));
        $imageMimeType = [
            'gif' => 'image/gif',
            'png' => 'image/png',
            'webp' => 'image/webp',
        ][$imageExtension] ?? 'image/jpeg';

        $canonicalUrl = url($pagePath);
        $logoUrl = asset('images/logoru.jpg');
        $structuredData = [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => 'RUNUTRIDIET',
            'url' => url('/'),
            'logo' => $logoUrl,
            'description' => 'Evidence-based nutrition care, wellness services, and professional education in Rwanda.',
            'areaServed' => [
                '@type' => 'Country',
                'name' => 'Rwanda',
            ],
        ];
    @endphp

    <title inertia>{{ $pageTitle }}</title>
    <meta name="description" content="{{ $pageDescription }}">
    <meta name="keywords" content="nutrition, dietitian, clinical nutrition, wellness, CPD courses, nutrition education, Rwanda">
    <meta name="author" content="RUNUTRIDIET">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow">
    <meta name="color-scheme" content="light">
    <meta name="theme-color" content="#047857">
    <meta name="format-detection" content="telephone=no">

    <link rel="canonical" href="{{ $canonicalUrl }}">
    <link rel="alternate" hreflang="en" href="{{ $canonicalUrl }}">
    <link rel="alternate" hreflang="x-default" href="{{ url('/') }}">

    <meta property="og:type" content="{{ $ogType }}">
    <meta property="og:site_name" content="RUNUTRIDIET">
    <meta property="og:locale" content="en_RW">
    <meta property="og:title" content="{{ $pageTitle }}">
    <meta property="og:description" content="{{ $pageDescription }}">
    <meta property="og:url" content="{{ $canonicalUrl }}">
    <meta property="og:image" content="{{ $shareImage }}">
    <meta property="og:image:secure_url" content="{{ $shareImage }}">
    <meta property="og:image:alt" content="{{ $shareImageAlt }}">
    <meta property="og:image:type" content="{{ $imageMimeType }}">
    @if ($shareImage === asset('images/flyer.png'))
        <meta property="og:image:width" content="1672">
        <meta property="og:image:height" content="944">
    @endif

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@runutridiet">
    <meta name="twitter:title" content="{{ $pageTitle }}">
    <meta name="twitter:description" content="{{ $pageDescription }}">
    <meta name="twitter:image" content="{{ $shareImage }}">
    <meta name="twitter:image:alt" content="{{ $shareImageAlt }}">

    <script type="application/ld+json">{!! json_encode($structuredData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT) !!}</script>

    <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
    <link rel="icon" type="image/jpeg" sizes="32x32" href="{{ asset('favicon-32x32.jpg') }}">
    <link rel="icon" type="image/jpeg" sizes="16x16" href="{{ asset('favicon-16x16.jpg') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('images/apple-touch-icon.png') }}">
    <link rel="manifest" href="{{ asset('site.webmanifest') }}">

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="RUNUTRIDIET">
    <meta name="application-name" content="RUNUTRIDIET">
    <meta name="msapplication-TileColor" content="#047857">

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-BS1KYRKYJ4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-BS1KYRKYJ4');
</script>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9210012838252778"
     crossorigin="anonymous"></script>
     <meta name="google-adsense-account" content="ca-pub-9210012838252778">
    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link
        href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap"
        rel="stylesheet"
    >

    {{-- Scripts --}}
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead
    @env ('local')
        <script src="http://localhost:3000/browser-sync/browser-sync-client.js"></script>
    @endenv
</head>
<body class="font-sans antialiased">
    @inertia
</body>
</html>