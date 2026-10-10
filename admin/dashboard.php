<?php
session_start();
require '../includes/db.php';
require '../includes/functions.php';
require_login();

$animalsCount = $pdo->query("SELECT COUNT(*) FROM animals")->fetchColumn();
$newsCount = $pdo->query("SELECT COUNT(*) FROM news")->fetchColumn();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Админка — Счастливая история</title>
    <style>
        body { font-family: sans-serif; background: #f5f5f5; margin: 0; }
        .header { background: #1a5c2a; color: #fff; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; }
        .header h1 { margin: 0; font-size: 1.3rem; }
        .header a { color: #ffd200; text-decoration: none; margin-left: 20px; }
        .container { max-width: 1100px; margin: 40px auto; padding: 0 20px; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .stat { background: #fff; padding: 30px; border-radius: 16px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .stat-number { font-size: 2.5rem; color: #e86c3a; font-weight: 700; display: block; }
        .stat-label { color: #777; margin-top: 10px; }
        .actions { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
        .action { background: #fff; padding: 25px; border-radius: 16px; text-decoration: none; color: #2c2c2c; box-shadow: 0 2px 10px rgba(0,0,0,0.05); transition: transform 0.2s; display: block; }
        .action:hover { transform: translateY(-3px); }
        .action h3 { margin: 0 0 10px; color: #1a5c2a; }
        .action p { margin: 0; color: #777; font-size: 0.9rem; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🐾 Админка — Счастливая история</h1>
        <div>
            <span>Привет, <?= e($_SESSION['admin_login']) ?></span>
            <a href="logout.php">Выйти</a>
        </div>
    </div>

    <div class="container">
        <div class="stats">
            <div class="stat">
                <span class="stat-number"><?= $animalsCount ?></span>
                <div class="stat-label">Животных</div>
            </div>
            <div class="stat">
                <span class="stat-number"><?= $newsCount ?></span>
                <div class="stat-label">Новостей</div>
            </div>
        </div>

        <h2>Управление</h2>
        <div class="actions">
            <a href="animals.php" class="action">
                <h3>🐱 Животные</h3>
                <p>Добавить, редактировать, удалить</p>
            </a>
        </div>
    </div>
</body>
</html>