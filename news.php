<?php
require 'includes/db.php';
require 'includes/functions.php';

$news = $pdo->query("SELECT * FROM news ORDER BY published_at DESC")->fetchAll();

$page_title = 'Новости';
$extra_css = ['news'];
require 'includes/header.php';
?>

<section style="padding: 70px 0;">
    <div class="container">
        <h1 class="section-title">Новости организации</h1>
        <p class="section-subtitle">Будьте в курсе событий</p>

        <?php if (empty($news)): ?>
            <p style="text-align:center;color:#777;">Пока нет новостей.</p>
        <?php else: ?>
            <div class="news-grid">
                <?php foreach ($news as $n): ?>
                    <article class="news-card">
                        <div class="news-date"><?= date('d.m.Y', strtotime($n['published_at'])) ?></div>
                        <h3><?= e($n['title']) ?></h3>
                        <p><?= e(excerpt($n['content'], 150)) ?></p>
                        <a href="/news-item.php?id=<?= $n['id'] ?>" class="news-link">Читать далее →</a>
                    </article>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>

<?php require 'includes/footer.php'; ?>