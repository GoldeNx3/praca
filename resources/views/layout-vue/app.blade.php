<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @if (config('app.env') == 'production')
    <!-- Google Tag Manager -->
    <!-- End Google Tag Manager  -->
    @endif

    <title>Biuro podróży NEPTUN</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <!-- Favicon -->
    <link rel="icon" href="{{ asset('img/travel/favicon.png') }}">

    <!-- <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet"> -->
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">

    @if (config('app.env') == 'production')
    <!-- Google Tag Manager -->

    <!-- End Google Tag Manager  -->
    @endif

</head>

<body>

    <div id="app">

    </div>
    <script src="{{ asset('js/main.js') }}"></script>

    @if (config('app.env') == 'production')
    <!-- Google Tag Manager (noscript) -->
    <!-- End Google Tag Manager (noscript) -->
    @endif
</body>

</html>
