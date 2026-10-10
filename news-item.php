<?php
require 'includes/db.php';
require 'includes/functions.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$stmt = $pdo->prepare("SELECT * FROM news WHERE id = ?");
$stmt->execute([$id]);
$item = $stmt->fetch();

if (!$item) {
    header('HTTP/1.0 404 Not Found');
    die('Новость не найдена');
}

$page_title = $item['title'];
$extra_css = ['news'];
require 'includes/header.php';
?>

<section style="padding: 70px 0;">
    <div class="container" style="max-width:800px;">
        <a href="/news.php" style="color:#e86c3a;text-decoration:none;">← Все новости</a>
        <div class="news-date" style="margin-top:20px;"><?= date('d.m.Y', strtotime($item['published_at'])) ?></div>
        <h1 style="margin:15px 0 30px;color:#2c2c2c;"><?= e($item['title']) ?></h1>
        <div style="font-size:1.05rem;line-height:1.7;color:#444;">
            <?= nl2br(e($item['content'])) ?>
        </div>
    </div>
</section>

<?php require 'includes/footer.php'; ?>