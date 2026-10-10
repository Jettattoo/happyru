<?php
require 'includes/db.php';
require 'includes/functions.php';

// Животные для блока "Им нужна помощь"
$animals = $pdo->query("SELECT * FROM animals WHERE status = 'active' ORDER BY created_at DESC LIMIT 6")->fetchAll();

// Последние новости
$news = $pdo->query("SELECT * FROM news ORDER BY published_at DESC LIMIT 3")->fetchAll();

$page_title = '';
$extra_css = ['slider', 'about', 'help', 'news', 'howtohelp'];
$extra_js = ['slider', 'help-carousel'];

require 'includes/header.php';
?>

<!-- Слайдер -->
<section class="slider-section">
    <div class="container">
        <div class="slider-container">
            <div class="slider-track" id="sliderTrack">
                <div class="slide">Фото 1</div>
                <div class="slide">Фото 2</div>
                <div class="slide">Фото 3</div>
            </div>
            <button class="slider-btn prev" onclick="moveSlide(-1)">&#10094;</button>
            <button class="slider-btn next" onclick="moveSlide(1)">&#10095;</button>
            <div class="slider-dots" id="dots">
                <div class="dot active" onclick="goToSlide(0)"></div>
                <div class="dot" onclick="goToSlide(1)"></div>
                <div class="dot" onclick="goToSlide(2)"></div>
            </div>
        </div>
    </div>
</section>

<!-- О фонде -->
<section class="about-section" id="about">
    <div class="container">
        <h2 class="section-title">Об организации</h2>
        <p class="section-subtitle">Мы верим, что каждая жизнь заслуживает счастья</p>
        <div class="about-content">
            <div class="about-text">
                <p>Автономная некоммерческая организация помощи животным «Счастливая история» создана в 2026 году в Ставрополе. Наша главная цель — предотвращение жестокого обращения с животными и формирование ответственного отношения к братьям нашим меньшим.</p>
                <p>Мы лечим, стерилизуем, вакцинируем и находим новый дом для собак и кошек, оказавшихся в беде.</p>
                <p class="about-location">📍 Ставрополь и Ставропольский край • Вся Россия</p>
                <a href="/help.php" class="btn-about">Стать частью команды</a>
            </div>
            <div class="about-image">🐾</div>
        </div>
    </div>
</section>

<!-- Им нужна помощь -->
<?php if (!empty($animals)): ?>
<section class="help-carousel-section" id="animals">
    <div class="container">
        <h2 class="section-title">🚨 Им нужна ваша помощь</h2>
        <p class="section-subtitle">Каждая минута на счету. Пожалуйста, не проходите мимо.</p>

        <div class="carousel-wrapper">
            <button class="carousel-arrow prev" onclick="moveHelpCarousel(-1)">&#10094;</button>
            <div class="carousel-track-container">
                <div class="carousel-track" id="helpTrack">
                    <?php foreach ($animals as $a): ?>
                        <div class="help-card">
                            <div class="help-card-img">
                                <?php if ($a['photo']): ?>
                                    <img src="/uploads/animals/<?= e($a['photo']) ?>" alt="<?= e($a['name']) ?>" style="width:100%;height:100%;object-fit:cover;">
                                <?php else: ?>
                                    🐱
                                <?php endif; ?>
                            </div>
                            <div class="help-card-body">
                                <h3><?= e($a['name']) ?></h3>
                                <p><?= e(excerpt($a['description'], 100)) ?></p>
                                <?php if ($a['target_amount'] > 0): ?>
                                    <div class="help-progress-info">
                                        <span>Собрано: <strong><?= number_format($a['collected_amount'], 0, ',', ' ') ?> ₽</strong></span>
                                        <span>Нужно: <strong><?= number_format($a['target_amount'], 0, ',', ' ') ?> ₽</strong></span>
                                    </div>
                                    <div class="help-progress-bar">
                                        <div class="help-progress-fill" style="width: <?= min(100, $a['target_amount'] > 0 ? $a['collected_amount'] / $a['target_amount'] * 100 : 0) ?>%;"></div>
                                    </div>
                                <?php endif; ?>
                                <a href="#" class="help-btn-card" onclick="openDonationModal('<?= e($a['name']) ?>'); return false;">Помочь</a>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            <button class="carousel-arrow next" onclick="moveHelpCarousel(1)">&#10095;</button>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- Новости -->
<?php if (!empty($news)): ?>
<section class="news-section" id="news">
    <div class="container">
        <h2 class="section-title">Новости организации</h2>
        <p class="section-subtitle">Будьте в курсе событий</p>
        <div class="news-grid">
            <?php foreach ($news as $n): ?>
                <article class="news-card">
                    <div class="news-date"><?= date('d.m.Y', strtotime($n['published_at'])) ?></div>
                    <h3><?= e($n['title']) ?></h3>
                    <p><?= e(excerpt($n['content'], 120)) ?></p>
                    <a href="/news-item.php?id=<?= $n['id'] ?>" class="news-link">Читать далее →</a>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<?php require 'includes/footer.php'; ?>