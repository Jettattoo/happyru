// ============================================
// add-documents.js — добавляет модуль "Официальные документы"
// Фонд "Счастливая история"
// ============================================

const fs = require('fs');

console.log('=== Добавление модуля "Официальные документы" ===\n');

// ---------- 1. HTML-модуль ----------
const documentsHtml = `<section class="documents-section" id="documents">
    <div class="container">
        <h2 class="section-title">Официальные документы</h2>
        <p class="section-subtitle">С уважением к закону и вашим данным</p>

        <div class="documents-grid">
            <a href="#" class="document-card">
                <span class="document-icon">📄</span>
                <h3>Устав организации</h3>
                <p>Основной документ, определяющий цели и задачи.</p>
                <span class="document-link">Скачать PDF →</span>
            </a>

            <a href="#" class="document-card">
                <span class="document-icon">📜</span>
                <h3>Лист записи ЕГРЮЛ</h3>
                <p>Документ о государственной регистрации организации.</p>
                <span class="document-link">Скачать PDF →</span>
            </a>

            <a href="#" class="document-card">
                <span class="document-icon">📋</span>
                <h3>Выписка из ЕГРН</h3>
                <p>Выписка из Единого государственного реестра налогоплательщиков.</p>
                <span class="document-link">Скачать PDF →</span>
            </a>

            <a href="#" class="document-card">
                <span class="document-icon">🔒</span>
                <h3>Политика обработки ПД</h3>
                <p>Как мы собираем, используем и защищаем ваши данные.</p>
                <span class="document-link">Скачать PDF →</span>
            </a>

            <a href="#" class="document-card">
                <span class="document-icon">✅</span>
                <h3>Согласие на обработку ПД</h3>
                <p>Документ, который вы принимаете при заполнении форм.</p>
                <span class="document-link">Скачать PDF →</span>
            </a>

            <a href="#" class="document-card">
                <span class="document-icon">🤝</span>
                <h3>Договор о конфиденциальности</h3>
                <p>Условия неразглашения конфиденциальной информации.</p>
                <span class="document-link">Скачать PDF →</span>
            </a>

            <a href="#" class="document-card">
                <span class="document-icon">📜</span>
                <h3>Публичная оферта</h3>
                <p>Предложение заключить договор пожертвования.</p>
                <span class="document-link">Открыть →</span>
            </a>
        </div>
    </div>
</section>`;

// ---------- 2. CSS ----------
const documentsCss = `.documents-section {
    padding: 70px 0;
    background: #fff;
}

.documents-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
}

.document-card {
    background: #fff;
    border: 2px solid #f0f0f0;
    border-radius: 16px;
    padding: 30px 25px;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    display: flex;
    flex-direction: column;
    min-height: 200px;
}

.document-card:hover {
    border-color: #ffd200;
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

.document-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    display: block;
}

.document-card h3 {
    font-size: 1.1rem;
    margin-bottom: 10px;
    color: #2c2c2c;
    line-height: 1.3;
}

.document-card p {
    font-size: 0.9rem;
    color: #666;
    line-height: 1.6;
    flex-grow: 1;
    margin-bottom: 15px;
}

.document-link {
    color: #1a5c2a;
    font-weight: 600;
    font-size: 0.9rem;
    transition: color 0.2s;
}

.document-card:hover .document-link {
    color: #e86c3a;
}

@media (max-width: 768px) {
    .documents-grid {
        grid-template-columns: 1fr;
    }
}`;

// ---------- 3. Запись файлов ----------
fs.writeFileSync('modules/documents.html', documentsHtml, 'utf8');
console.log('[+] modules/documents.html');

fs.writeFileSync('css/documents.css', documentsCss, 'utf8');
console.log('[+] css/documents.css');

// ---------- 4. Обновление index.html ----------
let indexHtml = fs.readFileSync('index.html', 'utf8');
let indexFixed = false;

if (!indexHtml.includes('css/documents.css')) {
    indexHtml = indexHtml.replace(
        '<link rel="stylesheet" href="css/stories.css">',
        '<link rel="stylesheet" href="css/stories.css">\n    <link rel="stylesheet" href="css/documents.css">'
    );
    console.log('[~] index.html: добавлена CSS-ссылка');
    indexFixed = true;
}

if (!indexHtml.includes('documents-slot')) {
    indexHtml = indexHtml.replace(
        '<div id="stories-slot"></div>',
        '<div id="stories-slot"></div>\n    <div id="documents-slot"></div>'
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

if (!loaderJs.includes("loadModule('modules/documents.html', 'documents-slot')")) {
    loaderJs = loaderJs.replace(
        "await loadModule('modules/stories.html', 'stories-slot');",
        "await loadModule('modules/stories.html', 'stories-slot');\n    await loadModule('modules/documents.html', 'documents-slot');"
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
console.log('Новый блок появится после "Счастливых историй".');