</main>

<footer id="contacts">
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
</footer>

<?php if (!empty($extra_js)): foreach ($extra_js as $js): ?>
    <script src="/js/<?= $js ?>.js"></script>
<?php endforeach; endif; ?>


<!-- ===== Модальное окно донатов ===== -->
<style>
#donationModalOverlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:9999;align-items:center;justify-content:center;padding:20px;overflow-y:auto}
#donationModalOverlay.active{display:flex}
#donationModalOverlay .donation-modal{background:#fff;border-radius:20px;padding:40px;max-width:480px;width:100%;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.3);max-height:90vh;overflow-y:auto}
#donationModalOverlay h2{margin:0 0 25px;color:#2c2c2c;font-size:1.5rem;text-align:center}
#donationModalClose{position:absolute;top:15px;right:15px;width:36px;height:36px;border:none;background:#f0f0f0;border-radius:50%;font-size:1.4rem;color:#555;cursor:pointer;line-height:1;transition:background .2s}
#donationModalClose:hover{background:#e0e0e0}
.donation-amounts{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px}
.amount-btn{padding:14px 5px;background:#ffd200;color:#222;border:2px solid #ffd200;border-radius:10px;font-weight:700;font-size:.95rem;cursor:pointer;transition:all .2s}
.amount-btn:hover,.amount-btn.active{background:#1a5c2a;color:#fff;border-color:#1a5c2a}
#donationModalOverlay label{display:block;margin-bottom:6px;color:#555;font-weight:600;font-size:.9rem}
#donationModalOverlay input[type=number],#donationModalOverlay input[type=text],#donationModalOverlay input[type=email]{width:100%;padding:12px 14px;border:2px solid #eee;border-radius:8px;font-size:1rem;box-sizing:border-box;margin-bottom:16px}
#donationModalOverlay input:focus{outline:none;border-color:#ffd200}
.donation-monthly{display:flex!important;align-items:center;gap:8px;margin-bottom:16px;font-weight:400!important;cursor:pointer}
.donation-monthly input{width:auto;margin:0}
.donation-submit{width:100%;padding:16px;background:#1a5c2a;color:#fff;border:none;border-radius:10px;font-size:1.05rem;font-weight:700;cursor:pointer;transition:background .2s;margin-top:5px}
.donation-submit:hover{background:#13451e}
.donation-note{text-align:center;color:#888;font-size:.85rem;margin:15px 0 0}
@media(max-width:500px){.donation-amounts{grid-template-columns:repeat(2,1fr)}}
</style>

<div id="donationModalOverlay">
    <div class="donation-modal">
        <button id="donationModalClose" type="button">×</button>
        <h2>🐾 Помочь животному</h2>

        <div class="donation-amounts">
            <button class="amount-btn" data-amount="100" type="button">100 ₽</button>
            <button class="amount-btn" data-amount="300" type="button">300 ₽</button>
            <button class="amount-btn" data-amount="500" type="button">500 ₽</button>
            <button class="amount-btn" data-amount="1000" type="button">1000 ₽</button>
        </div>

        <label>Своя сумма, ₽</label>
        <input type="number" id="customAmount" placeholder="Введите сумму" min="1">

        <label class="donation-monthly">
            <input type="checkbox" id="monthlyDonation">
            Ежемесячно
        </label>

        <label>Ваше имя</label>
        <input type="text" id="donorName" placeholder="Как к вам обращаться">

        <label>Email (для чека)</label>
        <input type="email" id="donorEmail" placeholder="your@email.com">

        <button id="donationSubmit" class="donation-submit" type="button">Перевести</button>

        <p class="donation-note">🔒 Перевод через СБП или по реквизитам</p>
    </div>
</div>

<script src="/js/donation-modal.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function () {
    if (typeof initDonationModal === 'function') {
        initDonationModal();
    } else {
        console.warn('initDonationModal не найдена');
    }
});
</script>

</body>
</html>