$(document).ready(function() {
    /* Карусель с товарами и выбором карточки по клику на превью */

    $('.hero-single__images').owlCarousel(
        {
            loop: true,
            autoplay: false,
            nav: false,
            dots: false,
            center: true,
            pullDrag: true,
            responsive: {
                0: {
                    items: 1.7,
                    margin: 10
                },
                768: {
                    items: 1,
                    margin: 0
                }
            }
        });
});