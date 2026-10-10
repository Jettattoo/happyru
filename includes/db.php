<?php
/**
 * Подключение к базе данных
 */
$db_host = 'localhost';
$db_name = 'happyru_site';
$db_user = 'root';
$db_pass = '12345678';

try {
    $pdo = new PDO(
        "mysql:host={$db_host};dbname={$db_name};charset=utf8mb4",
        $db_user,
        $db_pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    die('Ошибка подключения к базе: ' . $e->getMessage());
}