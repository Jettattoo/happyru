// ============================================
// add-whattogive.js — добавляет модуль "Что можно передать"
// Фонд "Счастливая история"
// ============================================

const fs = require('fs');

console.log('=== Добавление модуля "Что можно передать" ===\n');

// ---------- 1. HTML-модуль ----------
const whattogiveHtml = `<section class="whattogive-section" id="whattogive">
    <div class="container">
        <h2 class="section-title">📦 Что можно передать?</h2>
        <p class="section-subtitle">Пока у нас нет своего приюта, мы активно поддерживаем частные приюты, кураторов и волонтёров в Ставрополе и Ставропольском крае. Им часто не хватает ресурсов, чтобы самостоятельно оплачивать лечение, кормление и передержку для своих подопечных.</p>

        <div class="whattogive-grid">
            <div class="whattogive-card">
                <div class="whattogive-icon">🍖</div>
                <h3>Питание</h3>
                <ul>
                    <li>Качественные сухие корма и консервы</li>
                    <li>Ветеринарные диеты</li>
                    <li>Крупы: гречка, рис, овсянка</li>
                </ul>
            </div>

            <div class="whattogive-card">
                <div class="whattogive-icon">💊</div>
                <h3>Здоровье</h3>
                <ul>
                    <li>Ветеринарные препараты</li>
                    <li>Препараты от блох, клещей, глистов</li>
                    <li>Впитывающие пелёнки</li>
                </ul>
            </div>

            <div class="whattogive-card">
                <div class="whattogive-icon">🦮</div>
                <h3>Амуниция и быт</h3>
                <ul>
                    <li>Ошейники, шлейки, поводки</li>
                    <li>Миски, игрушки, лакомства, когтеточки</li>
                    <li>Пластиковые переноски</li>
                </ul>
            </div>

            <div class="whattogive-card">
                <div class="whattogive-icon">🧹</div>
                <h3>Обустройство и уход</h3>
                <ul>
                    <li>Моющие, дезинфицирующие средства</li>
                    <li>Мешки для мусора (от 60–120 л)</li>
                    <li>Стройматериалы, инструменты, утеплители</li>
                </ul>
            </div>
        </div>

        <p class="whattogive-note">Всё перечисленное можно передать нашим волонтёрам или доставить самостоятельно. Для этого напишите нам на почту <a href="mailto:info@happy-stories.ru">info@happy-stories.ru</a>, и мы подскажем, куда и когда можно привезти помощь.</p>
    </div>
</section>`;

// ---------- 2. CSS ----------
const whattogiveCss = `.whattogive-section {
    padding: 70px 0;
    background: #fff;
}

.whattogive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
}

.whattogive-card {
    background: #fafafa;
    border-radius: 16px;
    padding: 30px 25px;
    transition: transform 0.2s, box-shadow 0.2s;
}

.whattogive-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

.whattogive-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    display: block;
}

.whattogive-card h3 {
    font-size: 1.15rem;
    margin-bottom: 15px;
    color: #2c2c2c;
}

.whattogive-card ul {
    list-style: none;
    padding: 0;
}

.whattogive-card li {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.6;
    padding-left: 20px;
    position: relative;
    margin-bottom: 8px;
}

.whattogive-card li::before {
    content: "✔️";
    position: absolute;
    left: 0;
    font-size: 0.8rem;
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

@media (max-width: 768px) {
    .whattogive-grid {
        grid-template-columns: 1fr;
    }
}`;

// ---------- 3. Запись файлов ----------
fs.writeFileSync('modules/whattogive.html', whattogiveHtml, 'utf8');
console.log('[+] modules/whattogive.html');

fs.writeFileSync('css/whattogive.css', whattogiveCss, 'utf8');
console.log('[+] css/whattogive.css');

// ---------- 4. Обновление index.html ----------
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Добавляем CSS, если ещё нет
if (!indexHtml.includes('css/whattogive.css')) {
    indexHtml = indexHtml.replace(
        '<link rel="stylesheet" href="css/footer.css">',
        '<link rel="stylesheet" href="css/whattogive.css">\n    <link rel="stylesheet" href="css/footer.css">'
    );
    console.log('[~] index.html: добавлена CSS-ссылка');
}

// Добавляем слот, если ещё нет
if (!indexHtml.includes('whattogive-slot')) {
    indexHtml = indexHtml.replace(
        '<div id="footer-slot"></div>',
        '<div id="whattogive-slot"></div>\n    <div id="footer-slot"></div>'
    );
    console.log('[~] index.html: добавлен слот');
}

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('[+] index.html обновлён');

// ---------- 5. Обновление loader.js ----------
let loaderJs = fs.readFileSync('js/loader.js', 'utf8');

if (!loaderJs.includes('whattogive.html')) {
    loaderJs = loaderJs.replace(
        "await loadModule('modules/footer.html', 'footer-slot');",
        "await loadModule('modules/whattogive.html', 'whattogive-slot');\n    await loadModule('modules/footer.html', 'footer-slot');"
    );
    console.log('[~] js/loader.js: добавлена загрузка модуля');
}

fs.writeFileSync('js/loader.js', loaderJs, 'utf8');
console.log('[+] js/loader.js обновлён');

console.log('\n=== Готово! ===');
console.log('Обновите страницу в браузере (Ctrl+F5)');