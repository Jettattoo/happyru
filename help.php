<?php
require 'includes/functions.php';
$page_title = 'Как помочь';
$extra_css = ['howtohelp'];
require 'includes/header.php';
?>

<section style="padding: 70px 0;">
    <div class="container">
        <h1 class="section-title">Как помочь</h1>
        <p class="section-subtitle">Выберите удобный способ</p>

        <div class="help-grid">
            <div class="help-item">
                <span class="help-icon">❤️</span>
                <h3>Пожертвовать</h3>
                <p>Любая сумма пойдёт на лечение и корм</p>
            </div>
            <div class="help-item">
                <span class="help-icon">📦</span>
                <h3>Передать корм</h3>
                <p>Корм, игрушки, амуниция, лекарства</p>
            </div>
            <div class="help-item">
                <span class="help-icon">🤝</span>
                <h3>Стать волонтёром</h3>
                <p>Выгул, социализация, помощь на мероприятиях</p>
            </div>
            <div class="help-item">
                <span class="help-icon">🏠</span>
                <h3>Взять питомца</h3>
                <p>Дайте шанс на счастливую жизнь</p>
            </div>
        </div>

        <h2 class="section-title" style="margin-top:70px;">Реквизиты для перевода</h2>
        <div style="max-width:600px;margin:0 auto;background:#fafafa;padding:30px;border-radius:16px;">
            <p><strong>Получатель:</strong> АНО ПЖ «Счастливая история»</p>
            <p><strong>ИНН:</strong> 2634117299</p>
            <p><strong>ОГРН:</strong> 1262600005887</p>
            <p><strong>Расчётный счёт:</strong> 40703810956000000407</p>
            <p><strong>БИК:</strong> 040702752</p>
            <p><strong>Банк:</strong> ФИЛИАЛ «СТАВРОПОЛЬСКИЙ» АО «АЛЬФА-БАНК»</p>
            <p style="margin-top:20px;color:#777;font-size:0.9rem;">В назначении платежа: «Пожертвование на уставную деятельность»</p>
        </div>
    </div>
</section>

<?php require 'includes/footer.php'; ?>