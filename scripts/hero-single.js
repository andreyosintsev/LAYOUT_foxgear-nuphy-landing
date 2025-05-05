document.addEventListener('DOMContentLoaded', () => {
    console.log('hero-single.js loaded!');
    
    const carousel = document.querySelector('.hero-single__images');
    console.log('carousel', carousel);

    if (!carousel) {
        return console.error('DOM: no carousel .hero-single__image element found');
    }

    const galleryImages = document.querySelector('.hero-single__gallery-images');
    console.log('gallery images', galleryImages);
    
    if (!galleryImages) {
        return console.error('DOM: no gallery .hero-single__gallery-images element found');
    }
    
    galleryImages.addEventListener('click', (e) => {
        const currentImage = e.target;
        if (!currentImage) {
            return console.error('DOM: no current image .hero-single__gallery-image element found');
        }

        const index = currentImage.dataset.index;
        console.log(index);

        if (!index) return;
        
        carousel.trigger('to.owl.carousel', [index, 300]);
    });
});