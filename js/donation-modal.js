// ===== Модальное окно донатов =====

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

            alert(`Спасибо, ${name}!\n\nСумма: ${amount} ₽${monthly ? ' (ежемесячно)' : ''}\nEmail для чека: ${email}\n\n⚠️ Платёжная система будет подключена позже.`);

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
