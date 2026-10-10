<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= isset($page_title) && $page_title ? e($page_title) . ' — Счастливая история' : 'Счастливая история' ?></title>
    <link rel="stylesheet" href="/css/base.css">
    <link rel="stylesheet" href="/css/header.css">
    <link rel="stylesheet" href="/css/footer.css">
    <link rel="stylesheet" href="/css/donation-modal.css">
    <?php if (!empty($extra_css)): foreach ($extra_css as $css): ?>
        <link rel="stylesheet" href="/css/<?= $css ?>.css">
    <?php endforeach; endif; ?>
</head>
<body>

<header>
    <div class="top-bar">
        <div class="container top-bar-inner">
            <a href="/" class="logo">
                <span class="logo-icon">🐾</span>
                <span>Счастливая<br>история</span>
            </a>
            <div class="top-actions">
                <a href="/help.php" class="btn-white">Стать волонтёром</a>
                <a href="/help.php" class="btn-green">Помочь</a>
            </div>
        </div>
    </div>
    <div class="main-nav">
        <div class="container main-nav-inner">
            <a href="/">Главная</a>
            <a href="/animals.php">Ищут дом</a>
            <a href="/news.php">Новости</a>
            <a href="/help.php">Как помочь</a>
            <a href="/contacts.php">Контакты</a>
        </div>
    </div>
</header>

<main>