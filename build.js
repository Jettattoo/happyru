// ============================================
// build.js — сборка модулей сайта в UTF-8
// Фонд "Счастливая история"
// ============================================

const fs = require('fs');
const path = require('path');

console.log('=== Сборка модулей сайта ===\n');

// ===== HTML-МОДУЛИ =====

const headerHtml = `<header>
    <div class="top-bar">
        <div class="container top-bar-inner">
            <div class="logo">
                <span class="logo-icon">🐾</span>
                <span>Счастливая<br>история</span>
            </div>
            <div class="top-actions">
                <a href="#" class="btn-white">Стать волонтёром</a>
                <a href="#help" class="btn-green">Помочь</a>
            </div>
        </div>
    </div>
    <div class="main-nav">
        <div class="container main-nav-inner">
            <a href="#">Главная</a>
            <a href="#about">О нас</a>
            <a href="#programs">Программы фонда</a>
            <a href="#news">Новости</a>
            <a href="#">Ищут дом</a>
            <a href="#">Полезное</a>
            <a href="#">Мероприятия</a>
            <a href="#help">Виды помощи</a>
            <a href="#contacts">Контакты</a>
        </div>
    </div>
</header>`;

const sliderHtml = `<section class="slider-section">
    <div class="container">
        <div class="slider-container">
            <div class="slider-track" id="sliderTrack">
                <div class="slide">Фото 1</div>
                <div class="slide">Фото 2</div>
                <div class="slide">Фото 3</div>
            </div>
            <button class="slider-btn prev" onclick="moveSlide(-1)">&#10094;</button>
            <button class="slider-btn next" onclick="moveSlide(1)">&#10095;</button>
            <div class="slider-dots" id="dots">
                <div class="dot active" onclick="goToSlide(0)"></div>
                <div class="dot" onclick="goToSlide(1)"></div>
                <div class="dot" onclick="goToSlide(2)"></div>
            </div>
        </div>
    </div>
</section>`;

const aboutHtml = `<section class="about-section" id="about">
    <div class="container">
        <h2 class="section-title">Об организации</h2>
        <p class="section-subtitle">Мы верим, что каждая жизнь заслуживает счастья</p>

        <div class="about-content">
            <div class="about-text">
                <p>Автономная некоммерческая организация помощи животным «Счастливая история» (АНО ПЖ «Счастливая история») создана в 2026 году в Ставрополе. Наша главная цель — предотвращение жестокого обращения с животными, гуманное регулирование их численности и формирование в обществе ответственного отношения к братьям нашим меньшим.</p>
                <p>Мы не проходим мимо. Мы лечим, стерилизуем, вакцинируем и находим новый дом для собак и кошек, оказавшихся в беде. Наша команда — это люди, которым не всё равно.</p>
                <p class="about-location">📍 Ставрополь и Ставропольский край • Вся Россия</p>
                <a href="#" class="btn-about">Стать частью команды</a>
            </div>
            <div class="about-image">🐾</div>
        </div>
    </div>
</section>`;

const helpHtml = `<section class="help-carousel-section" id="animals">
    <div class="container">
        <h2 class="section-title">🚨 Им нужна ваша помощь</h2>
        <p class="section-subtitle">Каждая минута на счету. Пожалуйста, не проходите мимо.</p>

        <div class="carousel-wrapper">
            <button class="carousel-arrow prev" id="helpPrev" onclick="moveHelpCarousel(-1)">&#10094;</button>

            <div class="carousel-track-container">
                <div class="carousel-track" id="helpTrack">
                    <div class="help-card">
                        <div class="help-card-img">🐱</div>
                        <div class="help-card-body">
                            <h3>Пушок: лечение и операция</h3>
                            <div class="help-progress-info">
                                <span>Собрано: <strong>100 ₽</strong></span>
                                <span>Нужно: <strong>15 000 ₽</strong></span>
                            </div>
                            <div class="help-progress-bar"><div class="help-progress-fill" style="width: 1%;"></div></div>
                            <a href="#" class="help-btn-card">Помочь</a>
                        </div>
                    </div>
                    <div class="help-card">
                        <div class="help-card-img">🐱</div>
                        <div class="help-card-body">
                            <h3>Зая: две операции</h3>
                            <div class="help-progress-info">
                                <span>Собрано: <strong>100 ₽</strong></span>
                                <span>Нужно: <strong>28 000 ₽</strong></span>
                            </div>
                            <div class="help-progress-bar"><div class="help-progress-fill" style="width: 1%;"></div></div>
                            <a href="#" class="help-btn-card">Помочь</a>
                        </div>
                    </div>
                    <div class="help-card">
                        <div class="help-card-img">🐶</div>
                        <div class="help-card-body">
                            <h3>Корм для приютов</h3>
                            <div class="help-progress-info">
                                <span>Собрано: <strong>0 ₽</strong></span>
                                <span>Нужно: <strong>20 000 ₽</strong></span>
                            </div>
                            <div class="help-progress-bar"><div class="help-progress-fill" style="width: 0%;"></div></div>
                            <a href="#" class="help-btn-card">Помочь</a>
                        </div>
                    </div>
                    <div class="help-card">
                        <div class="help-card-img">🐶</div>
                        <div class="help-card-body">
                            <h3>Стерилизация: 3 собаки</h3>
                            <div class="help-progress-info">
                                <span>Собрано: <strong>776 ₽</strong></span>
                                <span>Нужно: <strong>19 000 ₽</strong></span>
                            </div>
                            <div class="help-progress-bar"><div class="help-progress-fill" style="width: 4%;"></div></div>
                            <a href="#" class="help-btn-card">Помочь</a>
                        </div>
                    </div>
                </div>
            </div>

            <button class="carousel-arrow next" id="helpNext" onclick="moveHelpCarousel(1)">&#10095;</button>
        </div>
    </div>
</section>`;

const programsHtml = `<section class="programs-section" id="programs">
    <div class="container">
        <h2 class="section-title">Наши программы</h2>
        <p class="section-subtitle">Что мы делаем каждый день</p>

        <div class="programs-grid">
            <div class="program-card">
                <div class="program-icon">💊</div>
                <h3>Лечение</h3>
                <p>Оплачиваем лечение бездомных животных в клиниках, покупаем лекарства и проводим операции.</p>
            </div>
            <div class="program-card">
                <div class="program-icon">✂️</div>
                <h3>Стерилизация</h3>
                <p>Оплачиваем стерилизацию и кастрацию, чтобы на улицах не появлялись новые щенки и котята.</p>
            </div>
            <div class="program-card">
                <div class="program-icon">🏠</div>
                <h3>Поиск дома</h3>
                <p>Помогаем животным найти хозяев. Социализируем, фотографируем, публикуем и ищем любящую семью.</p>
            </div>
            <div class="program-card">
                <div class="program-icon">📦</div>
                <h3>Поддержка приютов</h3>
                <p>Привозим корма, лекарства и вещи в частные и муниципальные приюты Ставропольского края.</p>
            </div>
            <div class="program-card">
                <div class="program-icon">🎓</div>
                <h3>Уроки доброты</h3>
                <p>Проводим занятия для детей о том, как правильно и безопасно общаться с животными.</p>
            </div>
            <div class="program-card">
                <div class="program-icon">🎉</div>
                <h3>Мероприятия</h3>
                <p>Организуем фестивали и акции, где животные находят новый дом, а люди — новых друзей.</p>
            </div>
        </div>
    </div>
</section>`;

const statsHtml = `<section class="stats" id="about">
    <div class="container">
        <h2 class="section-title">Помощь в цифрах</h2>
        <p class="section-subtitle">Мы только начинаем, но каждый шаг важен</p>
        <div class="stats-grid">
            <div><span class="stat-number">2</span><div class="stat-label">животных на попечении</div></div>
            <div><span class="stat-number">12</span><div class="stat-label">волонтёров в команде</div></div>
            <div><span class="stat-number">5</span><div class="stat-label">партнёрских приютов</div></div>
            <div><span class="stat-number">2</span><div class="stat-label">операции оплачено</div></div>
        </div>
    </div>
</section>`;

const newsHtml = `<section class="news-section" id="news">
    <div class="container">
        <h2 class="section-title">Новости организации</h2>
        <p class="section-subtitle">Будьте в курсе событий в Ставропольском крае</p>

        <div class="news-grid">
            <article class="news-card">
                <div class="news-date">Июнь 2026</div>
                <h3>Урок доброты в школе № 45, Ставрополь</h3>
                <p>Рассказали детям о том, как заботиться о животных.</p>
                <a href="#" class="news-link">Читать далее →</a>
            </article>
            <article class="news-card">
                <div class="news-date">Июнь 2026</div>
                <h3>Фестиваль «Хвосты и лапы» в Пятигорске</h3>
                <p>Более 200 гостей, животные нашли новый дом.</p>
                <a href="#" class="news-link">Читать далее →</a>
            </article>
            <article class="news-card">
                <div class="news-date">Май 2026</div>
                <h3>Сбор корма для приютов Ставропольского края</h3>
                <p>Мы собрали корм и лекарства для приютов.</p>
                <a href="#" class="news-link">Читать далее →</a>
            </article>
        </div>
    </div>
</section>`;

const howtohelpHtml = `<section id="help">
    <div class="container">
        <h2 class="section-title">Как помочь</h2>
        <p class="section-subtitle">Выберите удобный способ</p>
        <div class="help-grid">
            <a href="#" class="help-item"><span class="help-icon">❤️</span><h3>Пожертвовать</h3><p>Любая сумма пойдёт на лечение и корм</p></a>
            <a href="#" class="help-item"><span class="help-icon">📦</span><h3>Передать корм</h3><p>Корм, игрушки, амуниция, лекарства</p></a>
            <a href="#" class="help-item"><span class="help-icon">🤝</span><h3>Стать волонтёром</h3><p>Выгул, социализация, помощь на мероприятиях</p></a>
            <a href="#" class="help-item"><span class="help-icon">🏠</span><h3>Взять питомца</h3><p>Дайте шанс на счастливую жизнь</p></a>
        </div>
    </div>
</section>`;

const footerHtml = `<footer id="contacts">
    <div class="container">
        <div class="footer-grid">
            <div>
                <h4>🐾 Счастливая история</h4>
                <p>АНО помощи животным<br>Ставрополь и Ставропольский край</p>
            </div>
            <div>
                <h4>Контакты</h4>
                <a href="mailto:info@happy-stories.ru">info@happy-stories.ru</a>
            </div>
            <div>
                <h4>Реквизиты</h4>
                <p>ИНН: 2634117299<br>ОГРН: 1262600005887</p>
            </div>
        </div>
        <div class="footer-bottom">© 2026 АНО ПЖ «Счастливая история». Все права защищены.</div>
    </div>
</footer>`;

// ===== ЗАПИСЬ HTML-МОДУЛЕЙ =====

const modules = {
    'modules/header.html': headerHtml,
    'modules/slider.html': sliderHtml,
    'modules/about.html': aboutHtml,
    'modules/help.html': helpHtml,
    'modules/programs.html': programsHtml,
    'modules/stats.html': statsHtml,
    'modules/news.html': newsHtml,
    'modules/howtohelp.html': howtohelpHtml,
    'modules/footer.html': footerHtml
};

// Создаём папку modules, если её нет
if (!fs.existsSync('modules')) fs.mkdirSync('modules');

for (const [filePath, content] of Object.entries(modules)) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[+] ${filePath}`);
}

// ===== ЗАПИСЬ CSS =====

const cssFiles = {
    'css/base.css': `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
    background: #fff;
    line-height: 1.6;
}

.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 20px;
}

section {
    padding: 70px 0;
}

.section-title {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 15px;
    color: #2c2c2c;
}

.section-subtitle {
    text-align: center;
    color: #777;
    margin-bottom: 45px;
}`,

    'css/about.css': `.about-section { padding: 70px 0; }

.about-content {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 50px;
    align-items: center;
}

.about-text p {
    color: #555;
    margin-bottom: 20px;
    font-size: 1.05rem;
    line-height: 1.7;
}

.about-location {
    color: #e86c3a !important;
    font-weight: 600;
    margin-bottom: 30px !important;
}

.btn-about {
    display: inline-block;
    background: #ffd200;
    color: #222;
    padding: 14px 35px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 700;
    transition: background 0.2s, transform 0.2s;
}
.btn-about:hover { background: #e6bd00; transform: translateY(-2px); }

.about-image {
    background: linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%);
    border-radius: 20px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8rem;
}

@media (max-width: 768px) {
    .about-content { grid-template-columns: 1fr; gap: 30px; }
    .about-image { height: 200px; font-size: 5rem; }
}`,

    'css/programs.css': `.programs-section { padding: 70px 0; background: #fff; }

.programs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
}

.program-card {
    background: #fff;
    border: 2px solid #f0f0f0;
    border-radius: 16px;
    padding: 35px 25px;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}
.program-card:hover {
    border-color: #ffd200;
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

.program-icon { font-size: 2.5rem; margin-bottom: 15px; display: block; }

.program-card h3 { font-size: 1.15rem; margin-bottom: 10px; color: #2c2c2c; }
.program-card p { font-size: 0.95rem; color: #666; line-height: 1.6; }`,

    'css/news.css': `.news-section { padding: 70px 0; background: #fafafa; }

.news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.news-card {
    background: #fff;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    flex-direction: column;
}
.news-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }

.news-date {
    color: #e86c3a;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
}

.news-card h3 { font-size: 1.15rem; color: #2c2c2c; margin-bottom: 12px; line-height: 1.4; }
.news-card p { color: #666; font-size: 0.95rem; margin-bottom: 20px; flex-grow: 1; }

.news-link {
    color: #1a5c2a;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    transition: color 0.2s;
    align-self: flex-start;
}
.news-link:hover { color: #e86c3a; }`
};

if (!fs.existsSync('css')) fs.mkdirSync('css');

for (const [filePath, content] of Object.entries(cssFiles)) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[+] ${filePath}`);
}

// ===== ОБНОВЛЕНИЕ index.html =====

const indexHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Счастливая история — фонд помощи животным</title>
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/slider.css">
    <link rel="stylesheet" href="css/about.css">
    <link rel="stylesheet" href="css/help.css">
    <link rel="stylesheet" href="css/programs.css">
    <link rel="stylesheet" href="css/stats.css">
    <link rel="stylesheet" href="css/news.css">
    <link rel="stylesheet" href="css/howtohelp.css">
    <link rel="stylesheet" href="css/footer.css">
</head>
<body>

    <div id="header-slot"></div>
    <div id="slider-slot"></div>
    <div id="about-slot"></div>
    <div id="help-slot"></div>
    <div id="programs-slot"></div>
    <div id="stats-slot"></div>
    <div id="news-slot"></div>
    <div id="howtohelp-slot"></div>
    <div id="footer-slot"></div>

    <script src="js/loader.js"></script>
    <script src="js/slider.js"></script>
    <script src="js/help-carousel.js"></script>
    <script src="js/stats.js"></script>
    <script src="js/howtohelp.js"></script>

</body>
</html>`;

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('[+] index.html');

// ===== ОБНОВЛЕНИЕ js/loader.js =====

const loaderJs = `async function loadModule(modulePath, targetId) {
    try {
        const response = await fetch(modulePath);
        if (!response.ok) throw new Error(\`Не удалось загрузить \${modulePath}\`);
        const html = await response.text();
        document.getElementById(targetId).innerHTML = html;
    } catch (error) {
        console.error('Ошибка загрузки модуля:', error);
        document.getElementById(targetId).innerHTML = \`<p style="color:red;">Ошибка загрузки модуля: \${modulePath}</p>\`;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadModule('modules/header.html', 'header-slot');
    await loadModule('modules/slider.html', 'slider-slot');
    await loadModule('modules/about.html', 'about-slot');
    await loadModule('modules/help.html', 'help-slot');
    await loadModule('modules/programs.html', 'programs-slot');
    await loadModule('modules/stats.html', 'stats-slot');
    await loadModule('modules/news.html', 'news-slot');
    await loadModule('modules/howtohelp.html', 'howtohelp-slot');
    await loadModule('modules/footer.html', 'footer-slot');

    if (typeof initSlider === 'function') initSlider();
    if (typeof initHelpCarousel === 'function') initHelpCarousel();
});`;

fs.writeFileSync('js/loader.js', loaderJs, 'utf8');
console.log('[+] js/loader.js');

console.log('\n=== Готово! Все файлы записаны в UTF-8 ===');
console.log('Обновите страницу в браузере (Ctrl+F5)');