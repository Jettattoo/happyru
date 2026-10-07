// ============================================
// add-donation-modal.js — добавляет модальное окно донатов
// Фонд "Счастливая история"
// ============================================

const fs = require('fs');

console.log('=== Добавление модального окна донатов ===\n');

// ---------- 1. HTML модального окна ----------
const modalHtml = `<!-- Модальное окно пожертвования -->
<div class="donation-modal-overlay" id="donationModalOverlay">
    <div class="donation-modal">
        <button class="donation-modal-close" id="donationModalClose" aria-label="Закрыть">×</button>

        <div class="donation-modal-header">
            <h3>Помогите бездомным животным</h3>
            <p>Благотворительный фонд «Счастливая история»</p>
        </div>

        <div class="donation-modal-body">
            <!-- Быстрые суммы -->
            <div class="donation-amounts">
                <button class="amount-btn" data-amount="500">500 ₽</button>
                <button class="amount-btn" data-amount="1000">1000 ₽</button>
                <button class="amount-btn" data-amount="2000">2000 ₽</button>
            </div>

            <!-- Своя сумма -->
            <div class="donation-custom">
                <label for="customAmount">Или введите свою сумму:</label>
                <div class="custom-input-wrapper">
                    <input type="number" id="customAmount" placeholder="1000" min="1">
                    <span class="currency">₽</span>
                </div>
            </div>

            <!-- Регулярный платёж -->
            <label class="donation-checkbox">
                <input type="checkbox" id="monthlyDonation">
                <span>Переводить раз в месяц</span>
            </label>

            <!-- Данные для чека -->
            <div class="donation-user-data">
                <p class="user-data-title">Введите данные для чека:</p>
                <input type="text" id="donorName" placeholder="Имя">
                <input type="email" id="donorEmail" placeholder="Email">
            </div>

            <!-- Кнопка ПОМОЧЬ -->
            <button class="donation-submit" id="donationSubmit">ПОМОЧЬ</button>

            <!-- Примечание -->
            <p class="donation-note">🔒 Ваши данные защищены. Платёж обрабатывается через защищённое соединение.</p>
        </div>
    </div>
</div>`;

// ---------- 2. CSS модального окна ----------
const modalCss = `.donation-modal-overlay {
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
}

.donation-modal-overlay.active {
    opacity: 1;
    visibility: visible;
}

.donation-modal {
    position: absolute;
    top: 0;
    right: 0;
    width: 400px;
    max-width: 100%;
    height: 100%;
    background: #fff;
    box-shadow: -5px 0 30px rgba(0,0,0,0.15);
    transform: translateX(100%);
    transition: transform 0.3s ease-out;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.donation-modal-overlay.active .donation-modal {
    transform: translateX(0);
}

.donation-modal-close {
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    font-size: 2rem;
    color: #999;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    transition: background 0.2s, color 0.2s;
    z-index: 10;
}

.donation-modal-close:hover {
    background: #f0f0f0;
    color: #333;
}

.donation-modal-header {
    background: #ffd200;
    padding: 30px 25px 25px;
    text-align: center;
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

@media (max-width: 500px) {
    .donation-modal {
        width: 100%;
    }
}`;

// ---------- 3. JS модального окна ----------
const modalJs = `// ===== Модальное окно донатов =====

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('donationModalOverlay');
    const closeBtn = document.getElementById('donationModalClose');
    const submitBtn = document.getElementById('donationSubmit');
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmount = document.getElementById('customAmount');
    const monthlyCheckbox = document.getElementById('monthlyDonation');
    const donorName = document.getElementById('donorName');
    const donorEmail = document.getElementById('donorEmail');

    if (!overlay) return;

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
    closeBtn.addEventListener('click', window.closeDonationModal);

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
            customAmount.value = btn.dataset.amount;
        });
    });

    // Кнопка ПОМОЧЬ — заглушка до подключения API
    submitBtn.addEventListener('click', () => {
        const amount = customAmount.value;
        const name = donorName.value;
        const email = donorEmail.value;
        const monthly = monthlyCheckbox.checked;

        // Валидация
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

        // Здесь позже будет подключение к API банка
        console.log('Данные для отправки в банк:', {
            amount: amount,
            name: name,
            email: email,
            monthly: monthly
        });

        alert(\`Спасибо, \${name}!\\n\\nСумма: \${amount} ₽\${monthly ? ' (ежемесячно)' : ''}\\nEmail для чека: \${email}\\n\\n⚠️ Платёжная система будет подключена позже.\`);
        
        // Закрываем окно
        window.closeDonationModal();
    });
});

// Автоматически подключаем модальное окно к кнопкам "Помочь"
document.addEventListener('DOMContentLoaded', () => {
    // Ищем все ссылки и кнопки с текстом "Помочь" или href="#help"
    const helpLinks = document.querySelectorAll('a[href="#help"], .btn-green, .help-btn-card');
    helpLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Не перехватываем, если это ссылка на другой раздел
            if (link.getAttribute('href') === '#help' && link.closest('.main-nav')) return;
            
            e.preventDefault();
            if (typeof window.openDonationModal === 'function') {
                window.openDonationModal();
            }
        });
    });
});`;

// ---------- 4. Запись файлов ----------
fs.writeFileSync('modules/donation-modal.html', modalHtml, 'utf8');
console.log('[+] modules/donation-modal.html');

fs.writeFileSync('css/donation-modal.css', modalCss, 'utf8');
console.log('[+] css/donation-modal.css');

fs.writeFileSync('js/donation-modal.js', modalJs, 'utf8');
console.log('[+] js/donation-modal.js');

// ---------- 5. Обновление index.html ----------
let indexHtml = fs.readFileSync('index.html', 'utf8');

if (!indexHtml.includes('css/donation-modal.css')) {
    indexHtml = indexHtml.replace(
        '<link rel="stylesheet" href="css/footer.css">',
        '<link rel="stylesheet" href="css/footer.css">\n    <link rel="stylesheet" href="css/donation-modal.css">'
    );
    console.log('[~] index.html: добавлена CSS-ссылка');
}

// Модальное окно — в самый конец body
if (!indexHtml.includes('donation-modal-slot')) {
    indexHtml = indexHtml.replace(
        '<div id="footer-slot"></div>',
        '<div id="footer-slot"></div>\n    <div id="donation-modal-slot"></div>'
    );
    console.log('[~] index.html: добавлен слот модального окна');
}

if (!indexHtml.includes('js/donation-modal.js')) {
    indexHtml = indexHtml.replace(
        '<script src="js/howtohelp.js"></script>',
        '<script src="js/howtohelp.js"></script>\n    <script src="js/donation-modal.js"></script>'
    );
    console.log('[~] index.html: подключён скрипт модального окна');
}

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('[+] index.html обновлён');

// ---------- 6. Обновление loader.js ----------
let loaderJs = fs.readFileSync('js/loader.js', 'utf8');

if (!loaderJs.includes('donation-modal.html')) {
    loaderJs = loaderJs.replace(
        "await loadModule('modules/footer.html', 'footer-slot');",
        "await loadModule('modules/footer.html', 'footer-slot');\n    await loadModule('modules/donation-modal.html', 'donation-modal-slot');"
    );
    console.log('[~] js/loader.js: добавлена загрузка модального окна');
}

fs.writeFileSync('js/loader.js', loaderJs, 'utf8');
console.log('[+] js/loader.js обновлён');

console.log('\n=== Готово! ===');
console.log('Обновите страницу в браузере (Ctrl+F5)');
console.log('Кнопки "Помочь" теперь открывают модальное окно справа.');