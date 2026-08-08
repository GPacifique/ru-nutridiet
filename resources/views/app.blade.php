<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    {{-- Basic SEO --}}
    <title inertia>{{ config('app.name', 'Runutridiet') }}</title>
<title inertia>{{ config('app.name', 'RUNUTRIDIET') }}</title>

<meta
    name="description"
    content="RUNUTRIDIET provides evidence-based clinical nutrition care, professional education, CPD courses, certifications, lifestyle coaching, and personalized nutrition programs."
/>

<meta name="keywords" content="nutrition, dietitian, clinical nutrition, CPD courses, nutrition education, lifestyle coaching, Rwanda, RUNUTRIDIET">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="RUNUTRIDIET">
<meta property="og:title" content="RUNUTRIDIET — Clinical Nutrition & Professional Education">
<meta
    property="og:description"
    content="Evidence-based nutrition care, accredited CPD training, professional certifications, and personalized health programs."
>
<meta property="og:url" content="https://runutridiet.com/">
<meta property="og:image" content="https://runutridiet.com/images/runutridiet-social-preview.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="RUNUTRIDIET — Clinical Nutrition & Professional Education">

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="RUNUTRIDIET — Clinical Nutrition & Professional Education">
<meta
    name="twitter:description"
    content="Evidence-based nutrition care, CPD training, professional certifications, and personalized nutrition programs."
>
<meta name="twitter:image" content="https://runutridiet.com/images/runutridiet-social-preview.jpg">

<!-- Mobile -->
<meta name="theme-color" content="#047857">
    <meta
        name="description"
        content="RUNUTRIDIET helps you improve your nutrition, fitness, healthy lifestyle and overall wellbeing through expert guidance, courses and personalized coaching."
    >

    <meta
        name="keywords"
        content="nutrition, diet, fitness, healthy lifestyle, weight management, wellness, nutrition coaching, fitness coaching, healthy eating, Runutridiet"
    >

    <meta name="author" content="RUNUTRIDIET">
    <meta name="publisher" content="RUNUTRIDIET">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow">
    <meta name="rating" content="general">
    <meta name="revisit-after" content="7 days">
    <meta name="theme-color" content="#16a34a">
    <meta name="color-scheme" content="light">
    <meta name="format-detection" content="telephone=no">

    {{-- Language / locale alternates --}}
    <link rel="alternate" hreflang="en" href="{{ url()->current() }}">
    <link rel="alternate" hreflang="x-default" href="{{ url('/') }}">

    {{-- Canonical URL --}}
    <link rel="canonical" href="{{ url()->current() }}">

    {{-- Favicon / App Icons --}}
    <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon-32x32.jpg') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('favicon-16x16.jpg') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-touch-icon.jpg') }}">
    <link rel="manifest" href="{{ asset('site.webmanifest') }}">

    {{-- Mobile / PWA meta --}}
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="RUNUTRIDIET">
    <meta name="application-name" content="RUNUTRIDIET">
    <meta name="msapplication-TileColor" content="#16a34a">
    <meta name="msapplication-config" content="{{ asset('browserconfig.xml') }}">

    {{-- Open Graph / Facebook / LinkedIn --}}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="RUNUTRIDIET">
    <meta property="og:locale" content="en_US">
    <meta property="og:title" content="RUNUTRIDIET | Nutrition, Fitness & Healthy Lifestyle">
    <meta
        property="og:description"
        content="Improve your nutrition, fitness and lifestyle with RUNUTRIDIET. Discover expert guidance, courses and practical wellness solutions."
    >
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:image" content="{{ asset('images/runutridiet-og.jpg') }}">
    <meta property="og:image:secure_url" content="{{ asset('images/runutridiet-og.jpg') }}">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="RUNUTRIDIET - Nutrition and Healthy Lifestyle">

    {{-- Twitter / X --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@runutridiet">
    <meta name="twitter:creator" content="@runutridiet">
    <meta name="twitter:title" content="RUNUTRIDIET | Nutrition, Fitness & Healthy Lifestyle">
    <meta
        name="twitter:description"
        content="Improve your nutrition, fitness and lifestyle with RUNUTRIDIET through expert guidance, courses and personalized coaching."
    >
    <meta name="twitter:image" content="{{ asset('images/runutridiet-og.jpg') }}">
    <meta name="twitter:image:alt" content="RUNUTRIDIET - Nutrition and Healthy Lifestyle">

    {{-- Structured Data (JSON-LD) --}}
    @php
        $jsonLd = [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => 'RUNUTRIDIET',
            'url' => url('/'),
            'logo' => asset('images/runutridiet-og.jpg'),
            'description' => 'RUNUTRIDIET helps you improve your nutrition, fitness, healthy lifestyle and overall wellbeing through expert guidance, courses and personalized coaching.',
        ];
    @endphp
    <script type="application/ld+json">{!! json_encode($jsonLd, JSON_UNESCAPED_SLASHES) !!}</script>

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
</head>
<body class="font-sans antialiased">
    @inertia
</body>
</html>