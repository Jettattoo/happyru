async function loadModule(modulePath, targetId) {
    try {
        const response = await fetch(modulePath);
        if (!response.ok) throw new Error(`Не удалось загрузить ${modulePath}`);
        const html = await response.text();
        document.getElementById(targetId).innerHTML = html;
    } catch (error) {
        console.error('Ошибка загрузки модуля:', error);
        document.getElementById(targetId).innerHTML = `<p style="color:red;">Ошибка загрузки модуля: ${modulePath}</p>`;
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
    await loadModule('modules/stories.html', 'stories-slot');
    await loadModule('modules/documents.html', 'documents-slot');
    await loadModule('modules/whattogive.html', 'whattogive-slot');
    await loadModule('modules/donation-modal.html', 'donation-modal-slot');
    await loadModule('modules/footer.html', 'footer-slot');

    // Инициализация модулей ПОСЛЕ их загрузки
    if (typeof initSlider === 'function') initSlider();
    if (typeof initHelpCarousel === 'function') initHelpCarousel();
    if (typeof initDonationModal === 'function') initDonationModal();
});