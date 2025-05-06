$(document).ready(function() {
    /* Карусель с товарами и выбором карточки по клику на превью */

    if ($('.single-slider__cards').length > 0) {
        $(document).ready(function(){
            const $carousel = $('.single-slider__cards').owlCarousel(
            {
                items: 1,
                margin: 16,
                loop: true,
                autoplay: false,
                nav: false,
                dots: false,
                pullDrag: true,
                touchDrag: true,
                smartSpeed: 0,
                slideTransition: '' 
            });
            $(".single-slider__button_next").click(function() {
                $carousel.trigger("next.owl.carousel");
            });

            $(".single-slider__button_prev").click(function() {
                $carousel.trigger("prev.owl.carousel");
            });
        });
    }
});