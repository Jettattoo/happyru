// ============================================
// add-stories.js — добавляет модуль "Счастливые истории"
// Фонд "Счастливая история"
// ============================================

const fs = require('fs');

console.log('=== Добавление модуля "Счастливые истории" ===\n');

// ---------- 1. HTML-модуль ----------
const storiesHtml = `<section class="stories-section" id="stories">
    <div class="container">
        <h2 class="section-title">Счастливые истории</h2>
        <p class="section-subtitle">Реальные истории спасения в Ставропольском крае</p>

        <div class="stories-grid">
            <article class="story-card">
                <div class="story-photo">🐶</div>
                <div class="story-body">
                    <h3>Рекс нашёл семью</h3>
                    <p class="story-text">«Мы взяли Рекса. Это самый преданный пёс! Спасибо организации!»</p>
                    <p class="story-author">— Семья Ивановых, Ставрополь</p>
                </div>
            </article>

            <article class="story-card">
                <div class="story-photo">🐱</div>
                <div class="story-body">
                    <h3>Мурка стала королевой</h3>
                    <p class="story-text">«Мурку вылечили от тяжёлой инфекции. Теперь она счастлива.»</p>
                    <p class="story-author">— Анна К., Пятигорск</p>
                </div>
            </article>

            <article class="story-card">
                <div class="story-photo">🐕</div>
                <div class="story-body">
                    <h3>Бим — новый друг</h3>
                    <p class="story-text">«Биму 8 лет, мы взяли его пожилым. Он стал нашим ангелом.»</p>
                    <p class="story-author">— Олег и Марина, Кисловодск</p>
                </div>
            </article>
        </div>
    </div>
</section>`;

// ---------- 2. CSS ----------
const storiesCss = `.stories-section {
    padding: 70px 0;
    background: #fff;
}

.stories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.story-card {
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    flex-direction: column;
}

.story-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.12);
}

.story-photo {
    height: 200px;
    background: linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
}

.story-body {
    padding: 25px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.story-body h3 {
    font-size: 1.2rem;
    color: #2c2c2c;
    margin-bottom: 15px;
}

.story-text {
    color: #555;
    font-size: 1rem;
    line-height: 1.6;
    font-style: italic;
    margin-bottom: 15px;
    flex-grow: 1;
}

.story-author {
    color: #e86c3a;
    font-size: 0.9rem;
    font-weight: 600;
}

@media (max-width: 768px) {
    .stories-grid {
        grid-template-columns: 1fr;
    }
}`;

// ---------- 3. Запись файлов ----------
fs.writeFileSync('modules/stories.html', storiesHtml, 'utf8');
console.log('[+] modules/stories.html');

fs.writeFileSync('css/stories.css', storiesCss, 'utf8');
console.log('[+] css/stories.css');

// ---------- 4. Обновление index.html ----------
let indexHtml = fs.readFileSync('index.html', 'utf8');
let indexFixed = false;

// CSS-ссылка
if (!indexHtml.includes('css/stories.css')) {
    indexHtml = indexHtml.replace(
        '<link rel="stylesheet" href="css/news.css">',
        '<link rel="stylesheet" href="css/news.css">\n    <link rel="stylesheet" href="css/stories.css">'
    );
    console.log('[~] index.html: добавлена CSS-ссылка');
    indexFixed = true;
}

// Слот
if (!indexHtml.includes('stories-slot')) {
    indexHtml = indexHtml.replace(
        '<div id="news-slot"></div>',
        '<div id="news-slot"></div>\n    <div id="stories-slot"></div>'
    );
    console.log('[~] index.html: добавлен слот');
    indexFixed = true;
}

if (indexFixed) {
    fs.writeFileSync('index.html', indexHtml, 'utf8');
    console.log('[+] index.html обновлён');
} else {
    console.log('[=] index.html — всё уже на месте');
}

// ---------- 5. Обновление loader.js ----------
let loaderJs = fs.readFileSync('js/loader.js', 'utf8');
let loaderFixed = false;

if (!loaderJs.includes("loadModule('modules/stories.html', 'stories-slot')")) {
    loaderJs = loaderJs.replace(
        "await loadModule('modules/howtohelp.html', 'howtohelp-slot');",
        "await loadModule('modules/howtohelp.html', 'howtohelp-slot');\n    await loadModule('modules/stories.html', 'stories-slot');"
    );
    console.log('[~] loader.js: добавлена загрузка модуля');
    loaderFixed = true;
}

if (loaderFixed) {
    fs.writeFileSync('js/loader.js', loaderJs, 'utf8');
    console.log('[+] loader.js обновлён');
} else {
    console.log('[=] loader.js — всё уже на месте');
}

console.log('\n=== ГОТОВО ===');
console.log('Обновите страницу в браузере (Ctrl + F5)');
console.log('Новый блок появится после "Новостей".');