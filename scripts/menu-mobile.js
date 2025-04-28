document.addEventListener('DOMContentLoaded', () => {
    const menuMobile = document.querySelector('.menu-mobile');

    if (!menuMobile) {
        return console.warn('DOM: element ".menu-mobile" not found');
    }

    const menuMobileButton = document.querySelector('.menu-mobile-button');

    if (!menuMobileButton) {
        return console.warn('DOM: element ".menu-mobile-button" not found');
    }

    const body = document.querySelector('body');

    menuMobileButton.addEventListener('click', () => {
        if (menuMobile.classList.contains('transparent')) {
            showMenuMobile();
        } else {
            hideMenuMobile();
        }
    });

    document.addEventListener('click', (e) => {        
        if (!menuMobileButton.contains(e.target) && !menuMobile.contains(e.target)) {
            hideMenuMobile();
        }
    });

    menuLinks = menuMobile.querySelectorAll('.menu-mobile__item-link');

    menuLinks.forEach(link => link.addEventListener('click', hideMenuMobile));

    function showMenuMobile() {
        menuMobileButton.classList.add('menu-mobile-button_active');
        menuMobile.classList.remove('transparent');
        body.classList.add('noscroll');
    }

    function hideMenuMobile() {
        menuMobileButton.classList.remove('menu-mobile-button_active');
        menuMobile.classList.add('transparent');
        body.classList.remove('noscroll');
    }
});