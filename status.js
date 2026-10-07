// ============================================
// status.js — проверка состояния проекта
// Фонд "Счастливая история"
// ============================================

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n========================================');
console.log('  СТАТУС ПРОЕКТА: СЧАСТЛИВАЯ ИСТОРИЯ');
console.log('========================================\n');

// ===== 1. СТРУКТУРА ПРОЕКТА =====

const expectedStructure = {
    'index.html': 'файл',
    'index-old.html': 'файл',
    'build.js': 'файл',
    'make-readme.js': 'файл',
    'status.js': 'файл',
    'README.md': 'файл',
    'css/base.css': 'файл',
    'css/header.css': 'файл',
    'css/slider.css': 'файл',
    'css/about.css': 'файл',
    'css/help.css': 'файл',
    'css/programs.css': 'файл',
    'css/stats.css': 'файл',
    'css/news.css': 'файл',
    'css/howtohelp.css': 'файл',
    'css/footer.css': 'файл',
    'js/loader.js': 'файл',
    'js/slider.js': 'файл',
    'js/help-carousel.js': 'файл',
    'js/stats.js': 'файл',
    'js/howtohelp.js': 'файл',
    'modules/header.html': 'файл',
    'modules/slider.html': 'файл',
    'modules/about.html': 'файл',
    'modules/help.html': 'файл',
    'modules/programs.html': 'файл',
    'modules/stats.html': 'файл',
    'modules/news.html': 'файл',
    'modules/howtohelp.html': 'файл',
    'modules/footer.html': 'файл'
};

console.log('📁 СТРУКТУРА ПРОЕКТА:\n');

let missing = [];
let total = 0;
let present = 0;

for (const [filePath, type] of Object.entries(expectedStructure)) {
    total++;
    if (fs.existsSync(filePath)) {
        present++;
        const stats = fs.statSync(filePath);
        const size = (stats.size / 1024).toFixed(1);
        console.log(`  ✅ ${filePath} (${size} КБ)`);
    } else {
        missing.push(filePath);
        console.log(`  ❌ ${filePath} — ОТСУТСТВУЕТ`);
    }
}

console.log(`\n  Итого: ${present} из ${total} файлов на месте.`);

if (missing.length > 0) {
    console.log(`\n  ⚠️  Отсутствуют:`);
    missing.forEach(f => console.log(`     - ${f}`));
}

// ===== 2. СТАТУС GIT =====

console.log('\n\n🔧 СТАТУС GIT:\n');

function runGit(cmd) {
    try {
        return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
    } catch (e) {
        return null;
    }
}

// Есть ли .git папка
if (fs.existsSync('.git')) {
    console.log('  ✅ Git инициализирован (.git существует)');
} else {
    console.log('  ❌ Git НЕ инициализирован. Введите: git init');
}

// Есть ли коммиты
const logOutput = runGit('git log --oneline');
if (logOutput) {
    const commits = logOutput.split('\n');
    console.log(`  ✅ Коммитов: ${commits.length}`);
    console.log(`     Последний: ${commits[0]}`);
} else {
    console.log('  ❌ Коммитов нет. Нужно: git add . && git commit -m "First commit"');
}

// Настроен ли remote
const remoteOutput = runGit('git remote -v');
if (remoteOutput) {
    console.log('  ✅ Remote настроен:');
    remoteOutput.split('\n').forEach(line => console.log(`     ${line}`));
} else {
    console.log('  ❌ Remote не настроен. Нужно: git remote add origin https://github.com/Jettattoo/happyru.git');
}

// Текущая ветка
const branchOutput = runGit('git branch --show-current');
if (branchOutput) {
    console.log(`  ✅ Текущая ветка: ${branchOutput}`);
} else {
    console.log('  ⚠️  Ветка не определена');
}

// Статус (что не закоммичено)
const statusOutput = runGit('git status --short');
if (statusOutput) {
    const lines = statusOutput.split('\n').filter(l => l.trim());
    console.log(`  ⚠️  Незакоммиченных изменений: ${lines.length}`);
} else if (logOutput) {
    console.log('  ✅ Все файлы закоммичены');
}

// ===== 3. ЧТО ДАЛЬШЕ =====

console.log('\n\n🎯 ЧТО ДЕЛАТЬ ДАЛЬШЕ:\n');

const actions = [];

if (!fs.existsSync('.git')) {
    actions.push('git init — инициализировать репозиторий');
}

if (!logOutput) {
    actions.push('git add . — добавить все файлы');
    actions.push('git commit -m "First commit: foundation website" — создать коммит');
}

if (!remoteOutput) {
    actions.push('git remote add origin https://github.com/Jettattoo/happyru.git — связать с GitHub');
}

if (logOutput && remoteOutput) {
    // Проверим, есть ли связь с origin/main
    const tracking = runGit('git rev-parse --abbrev-ref main@{upstream}');
    if (!tracking) {
        actions.push('git push -u origin main — отправить на GitHub');
    } else {
        actions.push('git push — отправить новые изменения (если есть)');
    }
}

if (actions.length === 0) {
    console.log('  🎉 Всё сделано! Проект готов.');
    console.log('  Сайт доступен по адресу: https://jettattoo.github.io/happyru/');
} else {
    actions.forEach((action, i) => {
        console.log(`  ${i + 1}. ${action}`);
    });
}

// ===== 4. ИТОГ =====

console.log('\n\n========================================');
console.log('  КРАТКИЙ ИТОГ');
console.log('========================================');
console.log(`  Файлов на месте:   ${present}/${total}`);
console.log(`  Git инициализирован: ${fs.existsSync('.git') ? 'ДА' : 'НЕТ'}`);
console.log(`  Есть коммит:         ${logOutput ? 'ДА' : 'НЕТ'}`);
console.log(`  Remote настроен:     ${remoteOutput ? 'ДА' : 'НЕТ'}`);
console.log('========================================\n');