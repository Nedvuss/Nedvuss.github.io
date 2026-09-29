document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialisation des traductions
    if (typeof setLanguage === 'function') {
        setLanguage(window.currentLang);
        const langBtn = document.getElementById('lang-toggle');
        if (langBtn) {
            langBtn.addEventListener('click', () => {
                setLanguage(window.currentLang === 'fr' ? 'en' : 'fr');
            });
        }
    }

    // 2. Initialisation de l'interface (Machines à écrire, animations, menus)
    if (typeof initUI === 'function') {
        initUI();
    }

    // 3. Initialisation du Terminal
    if (typeof initTerminal === 'function') {
        initTerminal();
    }

    // 4. Initialisation de l'easter egg (Snake)
    if (typeof initSnakeEvents === 'function') {
        initSnakeEvents();
    }
});