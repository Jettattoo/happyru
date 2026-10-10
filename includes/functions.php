<?php
/**
 * Вспомогательные функции
 */

// Безопасный вывод HTML
function e($text) {
    return htmlspecialchars($text ?? '', ENT_QUOTES, 'UTF-8');
}

// Обрезать текст
function excerpt($text, $length = 150) {
    $text = strip_tags($text);
    if (mb_strlen($text) <= $length) return $text;
    return mb_substr($text, 0, $length) . '...';
}

// Проверка авторизации
function is_logged_in() {
    return isset($_SESSION['admin_id']);
}

// Требовать авторизацию
function require_login() {
    if (!is_logged_in()) {
        header('Location: /admin/index.php');
        exit;
    }
}