// $(document).ready(function() {
//     /* Карусель с товарами и выбором карточки по клику на превью */

//     if ($('.single-slider__cards').length > 0) {
//         $(document).ready(function(){
//             const $carousel = $('.single-slider__cards').owlCarousel(
//             {
//                 items: 1,
//                 margin: 16,
//                 loop: true,
//                 autoplay: false,
//                 nav: false,
//                 dots: false,
//                 pullDrag: true,
//                 touchDrag: true,
//                 smartSpeed: 0,
//                 slideTransition: '' 
//             });
//             $(".single-slider__button_next").click(function() {
//                 $carousel.trigger("next.owl.carousel");
//             });

//             $(".single-slider__button_prev").click(function() {
//                 $carousel.trigger("prev.owl.carousel");
//             });
//         });
//     }
// });

$(document).ready(function() {
    // Для каждого слайдера на странице
    $('.single-slider').each(function() {
        const $slider = $(this);
        const $carousel = $slider.find('.single-slider__cards');
        const $slides = $carousel.find('.single-slider__card');
        
        // Проверяем количество слайдов
        if ($slides.length > 1) {
            // Инициализируем карусель только если больше одного слайда
            const owl = $carousel.owlCarousel({
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
            
            // Находим кнопки внутри этого слайдера
            $slider.find(".single-slider__button_next").click(function() {
                owl.trigger("next.owl.carousel");
            });

            $slider.find(".single-slider__button_prev").click(function() {
                owl.trigger("prev.owl.carousel");
            });
            
            // Показываем кнопки навигации
            $slider.find('.single-slider__button').show();
        } else {
            // Скрываем кнопки навигации, если только один слайд
            $slider.find('.single-slider__button').hide();
        }
    });
});