<?php
require 'includes/db.php';
require 'includes/functions.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$stmt = $pdo->prepare("SELECT * FROM animals WHERE id = ?");
$stmt->execute([$id]);
$animal = $stmt->fetch();

if (!$animal) {
    header('HTTP/1.0 404 Not Found');
    die('Животное не найдено');
}

$page_title = $animal['name'];
$extra_css = ['help'];
require 'includes/header.php';
?>

<section style="padding: 70px 0;">
    <div class="container">
        <a href="/animals.php" style="color:#e86c3a;text-decoration:none;">← Все животные</a>
        <h1 class="section-title" style="margin-top:20px;"><?= e($animal['name']) ?></h1>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:40px;">
            <div style="background:#f0f0f0;border-radius:20px;min-height:400px;display:flex;align-items:center;justify-content:center;font-size:6rem;overflow:hidden;">
                <?php if ($animal['photo']): ?>
                    <img src="/uploads/animals/<?= e($animal['photo']) ?>" alt="<?= e($animal['name']) ?>" style="width:100%;height:100%;object-fit:cover;">
                <?php else: ?>
                    🐱
                <?php endif; ?>
            </div>
            <div>
                <?php if ($animal['age']): ?>
                    <p style="color:#e86c3a;font-weight:600;margin-bottom:15px;">Возраст: <?= e($animal['age']) ?></p>
                <?php endif; ?>
                <p><?= nl2br(e($animal['description'])) ?></p>

                <?php if ($animal['target_amount'] > 0): ?>
                    <div style="margin-top:30px;">
                        <div class="help-progress-info">
                            <span>Собрано: <strong><?= number_format($animal['collected_amount'], 0, ',', ' ') ?> ₽</strong></span>
                            <span>Нужно: <strong><?= number_format($animal['target_amount'], 0, ',', ' ') ?> ₽</strong></span>
                        </div>
                        <div class="help-progress-bar">
                            <div class="help-progress-fill" style="width: <?= min(100, $animal['target_amount'] > 0 ? $animal['collected_amount'] / $animal['target_amount'] * 100 : 0) ?>%;"></div>
                        </div>
                    </div>
                <?php endif; ?>

                <a href="#" class="help-btn-card" style="margin-top:30px;display:inline-block;" onclick="openDonationModal('<?= e($animal['name']) ?>'); return false;">Помочь</a>
            </div>
        </div>
    </div>
</section>

<?php require 'includes/footer.php'; ?>