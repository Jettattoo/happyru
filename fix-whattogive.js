// ============================================
// fix-whattogive.js — делает блок "Что можно передать" компактным
// 4 карточки в один ряд
// Фонд "Счастливая история"
// ============================================

const fs = require('fs');

console.log('=== Обновление блока "Что можно передать" ===\n');

// ---------- 1. Новый CSS ----------
const whattogiveCss = `.whattogive-section {
    padding: 70px 0;
    background: #fff;
}

.whattogive-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 40px;
}

.whattogive-card {
    background: #fafafa;
    border-radius: 16px;
    padding: 25px 20px;
    transition: transform 0.2s, box-shadow 0.2s;
}

.whattogive-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

.whattogive-icon {
    font-size: 2.2rem;
    margin-bottom: 12px;
    display: block;
}

.whattogive-card h3 {
    font-size: 1.05rem;
    margin-bottom: 12px;
    color: #2c2c2c;
}

.whattogive-card ul {
    list-style: none;
    padding: 0;
}

.whattogive-card li {
    color: #666;
    font-size: 0.88rem;
    line-height: 1.5;
    padding-left: 18px;
    position: relative;
    margin-bottom: 6px;
}

.whattogive-card li::before {
    content: "✔️";
    position: absolute;
    left: 0;
    font-size: 0.75rem;
}

.whattogive-note {
    text-align: center;
    color: #666;
    font-size: 0.95rem;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.7;
    padding: 25px;
    background: #fff8e1;
    border-radius: 12px;
    border-left: 4px solid #ffd200;
}

.whattogive-note a {
    color: #e86c3a;
    font-weight: 600;
    text-decoration: none;
}

.whattogive-note a:hover {
    text-decoration: underline;
}

/* ===== АДАПТИВ ===== */
@media (max-width: 900px) {
    .whattogive-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 500px) {
    .whattogive-grid {
        grid-template-columns: 1fr;
    }
}
`;

// ---------- 2. Запись ----------
fs.writeFileSync('css/whattogive.css', whattogiveCss, 'utf8');
console.log('[+] css/whattogive.css — обновлён');

// ---------- 3. Проверка подключения в index.html ----------
let indexHtml = fs.readFileSync('index.html', 'utf8');

if (indexHtml.includes('css/whattogive.css')) {
    console.log('[=] index.html — CSS уже подключён');
} else {
    indexHtml = indexHtml.replace(
        '<link rel="stylesheet" href="css/howtohelp.css">',
        '<link rel="stylesheet" href="css/howtohelp.css">\n    <link rel="stylesheet" href="css/whattogive.css">'
    );
    fs.writeFileSync('index.html', indexHtml, 'utf8');
    console.log('[~] index.html — CSS-ссылка добавлена');
}

console.log('\n=== ГОТОВО ===');
console.log('Что изменилось:');
console.log('  • 4 карточки теперь в один ряд (на широких экранах)');
console.log('  • На планшете (до 900px) — 2 карточки в ряд');
console.log('  • На телефоне (до 500px) — 1 карточка в ряд');
console.log('  • Карточки стали компактнее (padding, шрифт)');
console.log('\nОбновите страницу в браузере (Ctrl + F5).');