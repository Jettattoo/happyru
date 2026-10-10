<?php
session_start();
require '../includes/db.php';
require '../includes/functions.php';
require_login();

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$animal = [
    'name' => '',
    'age' => '',
    'description' => '',
    'photo' => '',
    'status' => 'active',
    'target_amount' => 0,
    'collected_amount' => 0,
];
$isEdit = false;

if ($id) {
    $stmt = $pdo->prepare("SELECT * FROM animals WHERE id = ?");
    $stmt->execute([$id]);
    $found = $stmt->fetch();
    if ($found) {
        $animal = $found;
        $isEdit = true;
    }
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $age = trim($_POST['age'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $status = $_POST['status'] ?? 'active';
    $target_amount = (int)($_POST['target_amount'] ?? 0);
    $collected_amount = (int)($_POST['collected_amount'] ?? 0);

    if (!$name) {
        $error = 'Введите имя животного';
    } else {
        // Загрузка фото
        $photoName = $animal['photo'];
        if (!empty($_FILES['photo']['name'])) {
            $ext = strtolower(pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION));
            $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
            if (in_array($ext, $allowed)) {
                $photoName = 'animal_' . time() . '_' . rand(1000, 9999) . '.' . $ext;
                $uploadPath = __DIR__ . '/../uploads/animals/' . $photoName;
                move_uploaded_file($_FILES['photo']['tmp_name'], $uploadPath);
            } else {
                $error = 'Недопустимый формат фото (разрешены jpg, jpeg, png, webp, gif)';
            }
        }

        if (!$error) {
            if ($isEdit) {
                $stmt = $pdo->prepare("UPDATE animals SET name=?, age=?, description=?, photo=?, status=?, target_amount=?, collected_amount=? WHERE id=?");
                $stmt->execute([$name, $age, $description, $photoName, $status, $target_amount, $collected_amount, $id]);
            } else {
                $stmt = $pdo->prepare("INSERT INTO animals (name, age, description, photo, status, target_amount, collected_amount) VALUES (?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([$name, $age, $description, $photoName, $status, $target_amount, $collected_amount]);
            }
            header('Location: animals.php');
            exit;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title><?= $isEdit ? 'Редактирование' : 'Новое животное' ?> — Админка</title>
    <style>
        body { font-family: sans-serif; background: #f5f5f5; margin: 0; }
        .header { background: #1a5c2a; color: #fff; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; }
        .header h1 { margin: 0; font-size: 1.3rem; }
        .header a { color: #ffd200; text-decoration: none; margin-left: 20px; }
        .container { max-width: 700px; margin: 40px auto; padding: 0 20px; }
        .card { background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        label { display: block; margin-bottom: 8px; color: #555; font-weight: 600; margin-top: 20px; }
        label:first-child { margin-top: 0; }
        input[type=text], input[type=number], textarea, select { width: 100%; padding: 12px; border: 2px solid #eee; border-radius: 8px; font-size: 1rem; box-sizing: border-box; font-family: inherit; }
        input:focus, textarea:focus, select:focus { outline: none; border-color: #ffd200; }
        textarea { min-height: 120px; resize: vertical; }
        .row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        button { margin-top: 25px; padding: 14px 30px; background: #1a5c2a; color: #fff; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; }
        button:hover { background: #13451e; }
        .error { background: #fee; color: #c00; padding: 12px; border-radius: 8px; margin-bottom: 20px; }
        .current-photo { margin-top: 10px; }
        .current-photo img { max-width: 200px; border-radius: 8px; }
    </style>
</head>
<body>
    <div class="header">
        <h1><?= $isEdit ? '✏️ Редактирование' : '➕ Новое животное' ?></h1>
        <div>
            <a href="animals.php">← Назад</a>
            <a href="logout.php">Выйти</a>
        </div>
    </div>

    <div class="container">
        <div class="card">
            <?php if ($error): ?>
                <div class="error"><?= e($error) ?></div>
            <?php endif; ?>

            <form method="post" enctype="multipart/form-data">
                <label>Имя *</label>
                <input type="text" name="name" value="<?= e($animal['name']) ?>" required>

                <div class="row">
                    <div>
                        <label>Возраст</label>
                        <input type="text" name="age" value="<?= e($animal['age']) ?>" placeholder="например, ~3 года">
                    </div>
                    <div>
                        <label>Статус</label>
                        <select name="status">
                            <option value="active" <?= $animal['status'] === 'active' ? 'selected' : '' ?>>Ищет дом</option>
                            <option value="adopted" <?= $animal['status'] === 'adopted' ? 'selected' : '' ?>>Нашёл дом</option>
                            <option value="archived" <?= $animal['status'] === 'archived' ? 'selected' : '' ?>>Архив</option>
                        </select>
                    </div>
                </div>

                <label>Описание</label>
                <textarea name="description"><?= e($animal['description']) ?></textarea>

                <div class="row">
                    <div>
                        <label>Нужно собрать, ₽</label>
                        <input type="number" name="target_amount" value="<?= (int)$animal['target_amount'] ?>">
                    </div>
                    <div>
                        <label>Уже собрано, ₽</label>
                        <input type="number" name="collected_amount" value="<?= (int)$animal['collected_amount'] ?>">
                    </div>
                </div>

                <label>Фото</label>
                <input type="file" name="photo" accept="image/*">
                <?php if ($animal['photo']): ?>
                    <div class="current-photo">
                        <p style="color:#777;font-size:0.9rem;">Текущее фото:</p>
                        <img src="/uploads/animals/<?= e($animal['photo']) ?>" alt="">
                    </div>
                <?php endif; ?>

                <button type="submit"><?= $isEdit ? 'Сохранить' : 'Добавить' ?></button>
            </form>
        </div>
    </div>
</body>
</html>