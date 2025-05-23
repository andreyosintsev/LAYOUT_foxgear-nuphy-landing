document.addEventListener('DOMContentLoaded', () => {
    filterOptions();
    
    const checkboxCategories = document.querySelectorAll('.panel-categories__checkbox');
    checkboxCategories.forEach(checkbox => checkbox.addEventListener('change', getOptions));
    
    function getOptions() {
        optionsArray = Array.from(document.querySelectorAll('.panel-categories__checkbox:checked'))
            .map(checkbox => checkbox.id);

        filterCards(optionsArray);
        filterOptions();
    }

    function filterCards(optionsArray) {
        console.log('options', optionsArray);
        const cards = document.querySelectorAll('.card-product');

        cards.forEach(card => {
            const specsArray = card.dataset.specs ? card.dataset.specs.split(' ') : [];

            if (matches = optionsArray.length === 0 || optionsArray.every(option => specsArray.includes(option))) {
                console.log('card specs:', specsArray, ' show: true');
                card.classList.remove('hidden');
            } else {
                console.log('card specs:', specsArray, ' show: false');
                card.classList.add('hidden');
            }
        })
    }

    function filterOptions() {
        const cards = Array.from(document.querySelectorAll('.card-product:not(.hidden)'));
        const specs = Array.from(
            new Set(
                cards
                .map(card => card.dataset.specs)
                .filter(Boolean)
                .join(' ')
                .split(' ')
            )
        );

        const checkboxes = document.querySelectorAll('.panel-categories__checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.parentElement.classList.add('hidden');
        })

        specs.forEach(spec => {
            const checkbox = document.querySelector(`.panel-categories__checkbox#${spec}`);
            if (checkbox) {
                checkbox.parentElement.classList.remove('hidden');
            }
        })
    }
})