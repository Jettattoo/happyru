<?php
require 'includes/db.php';
require 'includes/functions.php';

$animals = $pdo->query("SELECT * FROM animals ORDER BY created_at DESC")->fetchAll();

$page_title = 'Ищут дом';
$extra_css = ['help'];
require 'includes/header.php';
?>

<section style="padding: 70px 0;">
    <div class="container">
        <h1 class="section-title">Ищут дом</h1>
        <p class="section-subtitle">Эти животные ждут свою семью</p>

        <?php if (empty($animals)): ?>
            <p style="text-align:center;color:#777;">Пока нет животных в базе.</p>
        <?php else: ?>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:30px;">
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
                            <p><?= e(excerpt($a['description'], 120)) ?></p>
                            <a href="#" class="help-btn-card" onclick="openDonationModal('<?= e($a['name']) ?>'); return false;">Помочь</a>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>

<?php require 'includes/footer.php'; ?>