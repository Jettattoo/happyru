// ============================================
// fix-modal.js — приводит модальное окно донатов в порядок
// Фонд "Счастливая история"
// ============================================

const fs = require('fs');

console.log('=== Приведение модального окна в порядок ===\n');

// ---------- 1. CSS модального окна ----------
const modalCss = `/* ===== Модальное окно донатов ===== */

.donation-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20px;
}

.donation-modal-overlay.active {
    opacity: 1;
    visibility: visible;
}

.donation-modal {
    position: relative;
    width: 400px;
    max-width: 100%;
    max-height: 90vh;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    transform: translateX(120%);
    transition: transform 0.4s ease-out;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.donation-modal-overlay.active .donation-modal {
    transform: translateX(0);
}

.donation-modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(255,255,255,0.9);
    border: none;
    font-size: 1.8rem;
    color: #333;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    transition: background 0.2s, transform 0.2s;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.donation-modal-close:hover {
    background: #fff;
    transform: scale(1.1);
}

.donation-modal-header {
    background: #ffd200;
    padding: 30px 25px 25px;
    text-align: center;
    border-radius: 20px 20px 0 0;
}

.donation-modal-header h3 {
    font-size: 1.25rem;
    color: #222;
    margin-bottom: 8px;
    line-height: 1.3;
}

.donation-modal-header p {
    color: #555;
    font-size: 0.9rem;
}

.donation-modal-body {
    padding: 25px;
    overflow-y: auto;
    flex-grow: 1;
}

.donation-amounts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 20px;
}

.amount-btn {
    background: #ffd200;
    border: 2px solid #ffd200;
    color: #222;
    padding: 15px 5px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
}

.amount-btn:hover {
    background: #e6bd00;
}

.amount-btn.active {
    background: #1a5c2a;
    color: #fff;
    border-color: #1a5c2a;
}

.donation-custom {
    margin-bottom: 20px;
}

.donation-custom label {
    display: block;
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 8px;
}

.custom-input-wrapper {
    position: relative;
}

.custom-input-wrapper input {
    width: 100%;
    padding: 14px 40px 14px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
}

.custom-input-wrapper input:focus {
    border-color: #ffd200;
}

.custom-input-wrapper .currency {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-weight: 600;
}

.donation-checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    margin-bottom: 25px;
    color: #555;
    font-size: 0.95rem;
}

.donation-checkbox input {
    width: 18px;
    height: 18px;
    accent-color: #1a5c2a;
    cursor: pointer;
    flex-shrink: 0;
}

.donation-user-data {
    margin-bottom: 25px;
}

.user-data-title {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 10px;
}

.donation-user-data input {
    width: 100%;
    padding: 14px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
    margin-bottom: 10px;
    box-sizing: border-box;
}

.donation-user-data input:focus {
    border-color: #ffd200;
}

.donation-submit {
    width: 100%;
    background: #1a5c2a;
    color: #fff;
    border: none;
    padding: 18px;
    border-radius: 30px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    letter-spacing: 1px;
}

.donation-submit:hover {
    background: #13451e;
}

.donation-submit:active {
    transform: scale(0.98);
}

.donation-note {
    color: #999;
    font-size: 0.8rem;
    text-align: center;
    margin-top: 15px;
    line-height: 1.5;
}

/* ===== АДАПТИВ ===== */
@media (max-width: 600px) {
    .donation-modal-overlay {
        padding: 0;
        justify-content: center;
        align-items: flex-end;
    }
    .donation-modal {
        width: 100%;
        max-height: 90vh;
        border-radius: 20px 20px 0 0;
        transform: translateY(100%);
    }
    .donation-modal-overlay.active .donation-modal {
        transform: translateY(0);
    }
    .donation-modal-header {
        border-radius: 20px 20px 0 0;
    }
}
`;

fs.writeFileSync('css/donation-modal.css', modalCss, 'utf8');
console.log('[+] css/donation-modal.css — обновлён');

// ---------- 2. JS модального окна ----------
const modalJs = `// ===== Модальное окно донатов =====

function initDonationModal() {
    const overlay = document.getElementById('donationModalOverlay');
    const closeBtn = document.getElementById('donationModalClose');
    const submitBtn = document.getElementById('donationSubmit');
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmount = document.getElementById('customAmount');
    const monthlyCheckbox = document.getElementById('monthlyDonation');
    const donorName = document.getElementById('donorName');
    const donorEmail = document.getElementById('donorEmail');

    if (!overlay) {
        console.warn('Модальное окно не найдено в DOM');
        return;
    }

    // Функция открытия
    window.openDonationModal = function() {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Функция закрытия
    window.closeDonationModal = function() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Закрытие по крестику
    if (closeBtn) closeBtn.addEventListener('click', window.closeDonationModal);

    // Закрытие по клику вне окна
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) window.closeDonationModal();
    });

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            window.closeDonationModal();
        }
    });

    // Клик по быстрой сумме
    amountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            amountBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (customAmount) customAmount.value = btn.dataset.amount;
        });
    });

    // Кнопка ПОМОЧЬ — заглушка до подключения API
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const amount = customAmount ? customAmount.value : '';
            const name = donorName ? donorName.value : '';
            const email = donorEmail ? donorEmail.value : '';
            const monthly = monthlyCheckbox ? monthlyCheckbox.checked : false;

            if (!amount || amount < 1) {
                alert('Пожалуйста, введите сумму пожертвования');
                return;
            }
            if (!name.trim()) {
                alert('Пожалуйста, введите ваше имя');
                return;
            }
            if (!email.trim() || !email.includes('@')) {
                alert('Пожалуйста, введите корректный email');
                return;
            }

            console.log('Данные для отправки в банк:', {
                amount: amount,
                name: name,
                email: email,
                monthly: monthly
            });

            alert(\`Спасибо, \${name}!\\n\\nСумма: \${amount} ₽\${monthly ? ' (ежемесячно)' : ''}\\nEmail для чека: \${email}\\n\\n⚠️ Платёжная система будет подключена позже.\`);

            window.closeDonationModal();
        });
    }

    // Привязка к кнопкам «Помочь»
    const helpLinks = document.querySelectorAll('.btn-green, .help-btn-card');
    helpLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.openDonationModal();
        });
    });

    // Кнопка «Стать волонтёром» — пока тоже открывает окно (потом заменим на форму)
    const volunteerBtn = document.querySelector('.btn-white');
    if (volunteerBtn) {
        volunteerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.openDonationModal();
        });
    }

    console.log('✅ Модальное окно донатов инициализировано');
}
`;

fs.writeFileSync('js/donation-modal.js', modalJs, 'utf8');
console.log('[+] js/donation-modal.js — обновлён');

// ---------- 3. Проверка index.html ----------
let indexHtml = fs.readFileSync('index.html', 'utf8');
let indexFixed = false;

// Проверяем CSS-ссылку на donation-modal.css
if (!indexHtml.includes('css/donation-modal.css')) {
    indexHtml = indexHtml.replace(
        '</head>',
        '    <link rel="stylesheet" href="css/donation-modal.css">\n</head>'
    );
    console.log('[~] index.html: добавлена CSS-ссылка');
    indexFixed = true;
}

// Проверяем слот
if (!indexHtml.includes('donation-modal-slot')) {
    indexHtml = indexHtml.replace(
        '<div id="footer-slot"></div>',
        '<div id="footer-slot"></div>\n    <div id="donation-modal-slot"></div>'
    );
    console.log('[~] index.html: добавлен слот');
    indexFixed = true;
}

// Проверяем скрипт
if (!indexHtml.includes('js/donation-modal.js')) {
    indexHtml = indexHtml.replace(
        '</body>',
        '    <script src="js/donation-modal.js"></script>\n</body>'
    );
    console.log('[~] index.html: добавлен скрипт');
    indexFixed = true;
}

if (indexFixed) {
    fs.writeFileSync('index.html', indexHtml, 'utf8');
    console.log('[+] index.html обновлён');
} else {
    console.log('[=] index.html — всё уже на месте');
}

// ---------- 4. Проверка loader.js ----------
let loaderJs = fs.readFileSync('js/loader.js', 'utf8');
let loaderFixed = false;

// Проверяем загрузку модуля
if (!loaderJs.includes("loadModule('modules/donation-modal.html', 'donation-modal-slot')")) {
    loaderJs = loaderJs.replace(
        "await loadModule('modules/footer.html', 'footer-slot');",
        "await loadModule('modules/donation-modal.html', 'donation-modal-slot');\n    await loadModule('modules/footer.html', 'footer-slot');"
    );
    console.log('[~] loader.js: добавлена загрузка модуля');
    loaderFixed = true;
}

// Проверяем вызов initDonationModal
if (!loaderJs.includes('initDonationModal')) {
    loaderJs = loaderJs.replace(
        "if (typeof initHelpCarousel === 'function') initHelpCarousel();",
        "if (typeof initHelpCarousel === 'function') initHelpCarousel();\n    if (typeof initDonationModal === 'function') initDonationModal();"
    );
    console.log('[~] loader.js: добавлен вызов initDonationModal');
    loaderFixed = true;
}

if (loaderFixed) {
    fs.writeFileSync('js/loader.js', loaderJs, 'utf8');
    console.log('[+] loader.js обновлён');
} else {
    console.log('[=] loader.js — всё уже на месте');
}

// ---------- 5. Итог ----------
console.log('\n=== ГОТОВО ===');
console.log('Что сделано:');
console.log('  • css/donation-modal.css — обновлён (окно-карточка с отступами)');
console.log('  • js/donation-modal.js — обновлён (функция initDonationModal)');
console.log('  • index.html — проверен и обновлён при необходимости');
console.log('  • js/loader.js — проверен и обновлён при необходимости');
console.log('\nЧто дальше:');
console.log('  1. Сохраните все файлы в VS Code (Ctrl + S)');
console.log('  2. Обновите страницу в браузере (Ctrl + F5)');
console.log('  3. Нажмите на кнопку «Помочь» — окно должно выехать справа');
console.log('  4. Проверьте закрытие: крестик, клик вне окна, Escape');