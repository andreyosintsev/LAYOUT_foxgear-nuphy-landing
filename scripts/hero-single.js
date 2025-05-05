document.addEventListener('DOMContentLoaded', () => {
    console.log('hero-single.js loaded!');
    
    const singleImg = document.querySelector('.hero-single__image');
    console.log('singleImg', singleImg);

    if (!singleImg) {
        return console.error('DOM: no .hero-single__image element found');
    }

    const singlePhotos = document.querySelector('.hero-single__gallery-images');
    console.log('singlePhotos', singlePhotos);
    
    if (!singlePhotos) {
        return console.error('DOM: no .hero-single__gallery-image element found');
    }
    
    singlePhotos.addEventListener('click', (e) => {
        const currentPhoto = e.target;
        if (!currentPhoto) {
            return console.error('DOM: no .hero-single__gallery-image element found');
        }

        if (!currentPhoto.hasAttribute('src')) return;
        
        singleImg.src = currentPhoto.src;
    });
});