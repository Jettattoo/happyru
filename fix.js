// ============================================
// fix.js — диагностика и починка проекта
// Фонд "Счастливая история"
// ============================================

const fs = require('fs');
const path = require('path');

console.log('=== ДИАГНОСТИКА ПРОЕКТА ===\n');

let issues = [];
let fixes = [];

// ============================================
// 1. Проверка файлов
// ============================================
console.log('📁 Проверка файлов...\n');

const requiredFiles = [
    // HTML-модули
    'modules/header.html',
    'modules/slider.html',
    'modules/about.html',
    'modules/help.html',
    'modules/programs.html',
    'modules/stats.html',
    'modules/news.html',
    'modules/howtohelp.html',
    'modules/whattogive.html',
    'modules/donation-modal.html',
    'modules/footer.html',
    // CSS
    'css/base.css',
    'css/header.css',
    'css/slider.css',
    'css/about.css',
    'css/help.css',
    'css/programs.css',
    'css/stats.css',
    'css/news.css',
    'css/howtohelp.css',
    'css/whattogive.css',
    'css/donation-modal.css',
    'css/footer.css',
    // JS
    'js/loader.js',
    'js/slider.js',
    'js/help-carousel.js',
    'js/stats.js',
    'js/howtohelp.js',
    'js/donation-modal.js',
    // Главные
    'index.html'
];

for (const file of requiredFiles) {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} — ОТСУТСТВУЕТ`);
        issues.push(`Файл не найден: ${file}`);
    }
}

// ============================================
// 2. Проверка index.html
// ============================================
console.log('\n📄 Проверка index.html...\n');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Проверяем CSS-ссылки
const requiredCss = [
    'css/base.css',
    'css/header.css',
    'css/slider.css',
    'css/about.css',
    'css/help.css',
    'css/programs.css',
    'css/stats.css',
    'css/news.css',
    'css/howtohelp.css',
    'css/whattogive.css',
    'css/donation-modal.css',
    'css/footer.css'
];

for (const css of requiredCss) {
    if (indexHtml.includes(css)) {
        console.log(`✅ CSS подключён: ${css}`);
    } else {
        console.log(`❌ CSS НЕ подключён: ${css}`);
        issues.push(`В index.html нет ссылки на ${css}`);
    }
}

// Проверяем слоты
const requiredSlots = [
    'header-slot',
    'slider-slot',
    'about-slot',
    'help-slot',
    'programs-slot',
    'stats-slot',
    'news-slot',
    'howtohelp-slot',
    'whattogive-slot',
    'donation-modal-slot',
    'footer-slot'
];

for (const slot of requiredSlots) {
    if (indexHtml.includes(`id="${slot}"`)) {
        console.log(`✅ Слот есть: ${slot}`);
    } else {
        console.log(`❌ Слот ОТСУТСТВУЕТ: ${slot}`);
        issues.push(`В index.html нет слота ${slot}`);
    }
}

// Проверяем скрипты
const requiredScripts = [
    'js/loader.js',
    'js/slider.js',
    'js/help-carousel.js',
    'js/stats.js',
    'js/howtohelp.js',
    'js/donation-modal.js'
];

for (const script of requiredScripts) {
    if (indexHtml.includes(script)) {
        console.log(`✅ Скрипт подключён: ${script}`);
    } else {
        console.log(`❌ Скрипт НЕ подключён: ${script}`);
        issues.push(`В index.html нет скрипта ${script}`);
    }
}

// ============================================
// 3. Проверка js/loader.js
// ============================================
console.log('\n📄 Проверка js/loader.js...\n');

let loaderJs = fs.readFileSync('js/loader.js', 'utf8');

const requiredModules = [
    ['modules/header.html', 'header-slot'],
    ['modules/slider.html', 'slider-slot'],
    ['modules/about.html', 'about-slot'],
    ['modules/help.html', 'help-slot'],
    ['modules/programs.html', 'programs-slot'],
    ['modules/stats.html', 'stats-slot'],
    ['modules/news.html', 'news-slot'],
    ['modules/howtohelp.html', 'howtohelp-slot'],
    ['modules/whattogive.html', 'whattogive-slot'],
    ['modules/donation-modal.html', 'donation-modal-slot'],
    ['modules/footer.html', 'footer-slot']
];

for (const [modulePath, slot] of requiredModules) {
    const searchStr = `loadModule('${modulePath}', '${slot}')`;
    if (loaderJs.includes(searchStr)) {
        console.log(`✅ Загружается: ${modulePath} → ${slot}`);
    } else {
        console.log(`❌ НЕ загружается: ${modulePath} → ${slot}`);
        issues.push(`В loader.js нет загрузки ${modulePath}`);
    }
}

// ============================================
// 4. Проверка js/donation-modal.js
// ============================================
console.log('\n📄 Проверка js/donation-modal.js...\n');

let modalJs = fs.readFileSync('js/donation-modal.js', 'utf8');

// Проверяем ключевые функции
const checks = [
    ['openDonationModal', 'Функция открытия модального окна'],
    ['closeDonationModal', 'Функция закрытия'],
    ['donationModalOverlay', 'ID модального окна'],
    ['donationSubmit', 'Кнопка ПОМОЧЬ'],
    ['btn-green', 'Привязка к зелёным кнопкам'],
    ['help-btn-card', 'Привязка к кнопкам в карточках']
];

for (const [keyword, description] of checks) {
    if (modalJs.includes(keyword)) {
        console.log(`✅ ${description}`);
    } else {
        console.log(`❌ ${description} — НЕТ`);
        issues.push(`В donation-modal.js нет: ${keyword}`);
    }
}

// ============================================
// 5. ИСПРАВЛЕНИЯ
// ============================================
console.log('\n\n=== ИСПРАВЛЕНИЯ ===\n');

if (issues.length === 0) {
    console.log('✅ Всё в порядке, проблем не найдено!');
    console.log('\nЕсли окно всё равно не работает:');
    console.log('1. Нажмите Ctrl + F5 в браузере (сброс кэша)');
    console.log('2. Откройте консоль (F12) и посмотрите ошибки');
    console.log('3. Проверьте, что Live Server запущен');
    process.exit(0);
}

console.log(`Найдено проблем: ${issues.length}\n`);

// ---- ИСПРАВЛЕНИЕ 1: index.html ----
let indexFixed = false;

// Добавляем отсутствующие CSS
for (const css of requiredCss) {
    if (!indexHtml.includes(css) && fs.existsSync(css)) {
        // Вставляем перед footer.css или в конец head
        const insertBefore = '<link rel="stylesheet" href="css/footer.css">';
        if (indexHtml.includes(insertBefore)) {
            indexHtml = indexHtml.replace(
                insertBefore,
                `<link rel="stylesheet" href="${css}">\n    ${insertBefore}`
            );
        } else {
            indexHtml = indexHtml.replace(
                '</head>',
                `    <link rel="stylesheet" href="${css}">\n</head>`
            );
        }
        console.log(`[+] Добавлена CSS-ссылка: ${css}`);
        indexFixed = true;
    }
}

// Добавляем отсутствующие слоты
for (const slot of requiredSlots) {
    if (!indexHtml.includes(`id="${slot}"`)) {
        // Вставляем перед footer-slot или в конец body
        const insertBefore = '<div id="footer-slot"></div>';
        if (indexHtml.includes(insertBefore)) {
            indexHtml = indexHtml.replace(
                insertBefore,
                `<div id="${slot}"></div>\n    ${insertBefore}`
            );
        } else {
            indexHtml = indexHtml.replace(
                '</body>',
                `    <div id="${slot}"></div>\n</body>`
            );
        }
        console.log(`[+] Добавлен слот: ${slot}`);
        indexFixed = true;
    }
}

// Добавляем отсутствующие скрипты
for (const script of requiredScripts) {
    if (!indexHtml.includes(script) && fs.existsSync(script)) {
        indexHtml = indexHtml.replace(
            '</body>',
            `    <script src="${script}"></script>\n</body>`
        );
        console.log(`[+] Добавлен скрипт: ${script}`);
        indexFixed = true;
    }
}

if (indexFixed) {
    fs.writeFileSync('index.html', indexHtml, 'utf8');
    console.log('✅ index.html исправлен\n');
}

// ---- ИСПРАВЛЕНИЕ 2: loader.js ----
let loaderFixed = false;

for (const [modulePath, slot] of requiredModules) {
    const searchStr = `loadModule('${modulePath}', '${slot}')`;
    if (!loaderJs.includes(searchStr) && fs.existsSync(modulePath)) {
        // Вставляем перед loadModule('modules/footer.html'...)
        const beforeFooter = "await loadModule('modules/footer.html', 'footer-slot');";
        if (loaderJs.includes(beforeFooter)) {
            loaderJs = loaderJs.replace(
                beforeFooter,
                `await ${searchStr};\n    ${beforeFooter}`
            );
        } else {
            loaderJs = loaderJs.replace(
                '});',
                `    await ${searchStr};\n});`
            );
        }
        console.log(`[+] Добавлена загрузка: ${modulePath}`);
        loaderFixed = true;
    }
}

if (loaderFixed) {
    fs.writeFileSync('js/loader.js', loaderJs, 'utf8');
    console.log('✅ js/loader.js исправлен\n');
}

// ============================================
// 6. ИТОГ
// ============================================
console.log('\n=== ГОТОВО ===\n');
console.log('Что было исправлено:');
if (indexFixed) console.log('  • index.html — добавлены недостающие ссылки и слоты');
if (loaderFixed) console.log('  • js/loader.js — добавлены недостающие модули');

console.log('\nЧто делать дальше:');
console.log('1. Обновите страницу в браузере (Ctrl + F5)');
console.log('2. Нажмите на кнопку «Помочь» — окно должно выехать');
console.log('3. Если не работает — откройте консоль (F12) и посмотрите ошибки');