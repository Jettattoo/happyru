// ============================================
// add-doc-links.js — подставляет ссылки на PDF в documents.html
// Фонд "Счастливая история"
// ============================================

const fs = require('fs');

console.log('=== Подстановка ссылок на PDF ===\n');

if (!fs.existsSync('docs')) {
    console.error('❌ Папка docs не найдена.');
    process.exit(1);
}

const files = fs.readdirSync('docs').filter(f => f.toLowerCase().endsWith('.pdf'));

if (files.length === 0) {
    console.error('❌ В папке docs нет PDF-файлов.');
    process.exit(1);
}

console.log('Найдены PDF-файлы:');
files.forEach(f => console.log(`  • ${f}`));
console.log('');

const documentMap = {
    'Устав организации': 'docs/charter.pdf',
    'Лист записи ЕГРЮЛ': 'docs/egrul-list.pdf',
    'Выписка из ЕГРН': 'docs/egrn1.pdf',
    'Политика обработки ПД': 'docs/privacy-policy.pdf',
    'Согласие на обработку ПД': 'docs/consent.pdf',
    'Договор о конфиденциальности': 'docs/confidentiality.pdf',
    'Публичная оферта': 'docs/oferta.pdf'
};

let html = fs.readFileSync('modules/documents.html', 'utf8');
let replaced = 0;

for (const [title, link] of Object.entries(documentMap)) {
    const filePath = link.replace('docs/', '');
    if (!files.includes(filePath)) {
        console.log(`⚠️  Файл не найден: ${link} (для «${title}»)`);
        continue;
    }

    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(
        `(<a\\s+href=")[^"]*("[^>]*>[\\s\\S]*?<h3>${escapedTitle}</h3>)`,
        'g'
    );

    const before = html;
    html = html.replace(regex, `$1${link}" target="_blank$2`);

    if (html !== before) {
        console.log(`[+] ${title} → ${link}`);
        replaced++;
    } else {
        console.log(`⚠️  Не удалось заменить для: ${title}`);
    }
}

if (replaced > 0) {
    fs.writeFileSync('modules/documents.html', html, 'utf8');
    console.log(`\n✅ Обновлено ${replaced} ссылок в modules/documents.html`);
} else {
    console.log('\n⚠️  Ничего не заменено. Проверьте documents.html вручную.');
}

console.log('\n=== ГОТОВО ===');
console.log('Обновите страницу в браузере (Ctrl + F5).');