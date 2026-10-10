// ============================================
// cleanup.js — очистка проекта от мусора
// Создаёт бэкап перед удалением
// ============================================

const fs = require('fs');
const path = require('path');

const ROOT = 'E:/happyru';
const BACKUP = 'E:/happyru-backup-' + Date.now();

console.log('=== Очистка проекта от мусора ===\n');

// ===== СПИСОК НА УДАЛЕНИЕ =====
const toDelete = [
    // Отработавшие скрипты
    'build.js',
    'build-hybrid.js',
    'build-wp-theme.js',
    'add-donation-modal.js',
    'add-doc-links.js',
    'add-documents.js',
    'add-stories.js',
    'add-whattogive.js',
    'fix.js',
    'fix-modal.js',
    'fix-whattogive.js',
    'fix-donation-html.js',
    'fix-donation-v2.js',
    'create-structure.js',
    // Старые HTML
    'index.html',
    'index-old.html',
    // Папка модулей
    'modules',
];

// ===== ПОКАЗЫВАЕМ ЧТО БУДЕТ УДАЛЕНО =====
console.log('Файлы и папки для удаления:\n');
let totalSize = 0;

toDelete.forEach(item => {
    const fullPath = path.join(ROOT, item);
    if (fs.existsSync(fullPath)) {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            const size = getDirSize(fullPath);
            totalSize += size;
            console.log(`  [папка]  ${item}  (${(size / 1024).toFixed(1)} КБ)`);
        } else {
            totalSize += stat.size;
            console.log(`  [файл]   ${item}  (${(stat.size / 1024).toFixed(1)} КБ)`);
        }
    }
});

console.log(`\nОбщий размер: ${(totalSize / 1024).toFixed(1)} КБ\n`);

// ===== СОЗДАЁМ БЭКАП =====
console.log(`Создаю бэкап в: ${BACKUP}`);
fs.mkdirSync(BACKUP, { recursive: true });

toDelete.forEach(item => {
    const src = path.join(ROOT, item);
    const dst = path.join(BACKUP, item);
    if (fs.existsSync(src)) {
        const stat = fs.statSync(src);
        if (stat.isDirectory()) {
            copyDir(src, dst);
        } else {
            fs.copyFileSync(src, dst);
        }
    }
});
console.log('[+] Бэкап создан\n');

// ===== УДАЛЯЕМ =====
console.log('Удаляю...');
toDelete.forEach(item => {
    const fullPath = path.join(ROOT, item);
    if (fs.existsSync(fullPath)) {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            fs.rmSync(fullPath, { recursive: true, force: true });
        } else {
            fs.unlinkSync(fullPath);
        }
        console.log(`  [-] ${item}`);
    }
});

console.log('\n=== ГОТОВО! ===');
console.log(`Бэкап: ${BACKUP}`);
console.log('Если что-то удалилось зря — восстановите из бэкапа.');

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function getDirSize(dir) {
    let size = 0;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            size += getDirSize(fullPath);
        } else {
            size += stat.size;
        }
    });
    return size;
}

function copyDir(src, dst) {
    fs.mkdirSync(dst, { recursive: true });
    fs.readdirSync(src).forEach(file => {
        const srcPath = path.join(src, file);
        const dstPath = path.join(dst, file);
        const stat = fs.statSync(srcPath);
        if (stat.isDirectory()) {
            copyDir(srcPath, dstPath);
        } else {
            fs.copyFileSync(srcPath, dstPath);
        }
    });
}