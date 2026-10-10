<?php
session_start();
require '../includes/db.php';
require '../includes/functions.php';
require_login();

// Удаление
if (isset($_GET['delete'])) {
    $stmt = $pdo->prepare("DELETE FROM animals WHERE id = ?");
    $stmt->execute([(int)$_GET['delete']]);
    header('Location: animals.php');
    exit;
}

$animals = $pdo->query("SELECT * FROM animals ORDER BY created_at DESC")->fetchAll();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Животные — Админка</title>
    <style>
        body { font-family: sans-serif; background: #f5f5f5; margin: 0; }
        .header { background: #1a5c2a; color: #fff; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; }
        .header h1 { margin: 0; font-size: 1.3rem; }
        .header a { color: #ffd200; text-decoration: none; margin-left: 20px; }
        .container { max-width: 1100px; margin: 40px auto; padding: 0 20px; }
        .btn { display: inline-block; padding: 12px 25px; background: #ffd200; color: #222; text-decoration: none; border-radius: 8px; font-weight: 600; margin-bottom: 20px; }
        .btn:hover { background: #e6bd00; }
        table { width: 100%; background: #fff; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        th, td { padding: 15px 20px; text-align: left; border-bottom: 1px solid #eee; }
        th { background: #f9f9f9; color: #555; font-size: 0.9rem; }
        tr:last-child td { border-bottom: none; }
        .actions a { color: #e86c3a; text-decoration: none; margin-right: 15px; font-weight: 600; }
        .actions a:hover { text-decoration: underline; }
        .empty { background: #fff; padding: 40px; border-radius: 12px; text-align: center; color: #777; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🐱 Управление животными</h1>
        <div>
            <a href="dashboard.php">← Назад</a>
            <a href="logout.php">Выйти</a>
        </div>
    </div>

    <div class="container">
        <a href="animal-edit.php" class="btn">+ Добавить животное</a>

        <?php if (empty($animals)): ?>
            <div class="empty">Пока нет животных. Нажмите «Добавить животное».</div>
        <?php else: ?>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Возраст</th>
                        <th>Цель, ₽</th>
                        <th>Собрано, ₽</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($animals as $a): ?>
                        <tr>
                            <td><?= $a['id'] ?></td>
                            <td><strong><?= e($a['name']) ?></strong></td>
                            <td><?= e($a['age']) ?></td>
                            <td><?= number_format($a['target_amount'], 0, ',', ' ') ?></td>
                            <td><?= number_format($a['collected_amount'], 0, ',', ' ') ?></td>
                            <td class="actions">
                                <a href="animal-edit.php?id=<?= $a['id'] ?>">Изменить</a>
                                <a href="animals.php?delete=<?= $a['id'] ?>" onclick="return confirm('Удалить?')">Удалить</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
</body>
</html>