document.addEventListener('DOMContentLoaded', function() {
    /*// Мобильное меню
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
        
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }
     
    // Типы ремонта
    const typeOptions = document.querySelectorAll('.type-option');
    typeOptions.forEach(option => {
        option.addEventListener('click', function() {
            typeOptions.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Калькулятор стоимости
    const areaSlider = document.getElementById('area-slider');
    const calculateBtn = document.getElementById('calculate-btn');
    const calculateFinalBtn = document.getElementById('calculate-final-btn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            document.querySelector('.section-calculator').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    if (calculateFinalBtn) {
        calculateFinalBtn.addEventListener('click', function() {
            const activeType = document.querySelector('.type-option.active');
            const selectedType = activeType ? activeType.textContent.trim() : 'Комплексный';
            const area = areaSlider ? areaSlider.value : 5;
            const glazingType = document.getElementById('glazing-type');
            const selectedGlazing = glazingType ? glazingType.options[glazingType.selectedIndex].text : '';

            let basePrice = 0;
            switch(selectedType) {
                case 'Остекление': basePrice = 80; break;
                case 'Утепление': basePrice = 25; break;
                case 'Отделка': basePrice = 30; break;
                case 'Комплексный': basePrice = 350; break;
                default: basePrice = 0;
            }

            let totalPrice = basePrice * area;
            if (['Остекление', 'Комплексный'].includes(selectedType) && selectedGlazing.includes('ПВХ')) {
                totalPrice *= 1.2;
            }

            const formattedPrice = new Intl.NumberFormat('ru-RU').format(Math.round(totalPrice));
            alert(`Предварительная стоимость: ${formattedPrice} BYN\n\nТип ремонта: ${selectedType}\nПлощадь: ${area} м²\nТип остекления: ${selectedGlazing}\n\nДля точного расчета рекомендуем заказать бесплатный замер.`);
        });
    }
    
    // Фильтрация портфолио
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            portfolioItems.forEach(item => {
                item.style.display = filter === 'all' ? 'block' : 
                    item.dataset.category.split(' ').includes(filter) ? 'block' : 'none';
            });
        });
    });
    
    // Слайдер отзывов
    const reviewsSlider = document.getElementById('reviews-slider');
    const reviewPrev = document.getElementById('review-prev');
    const reviewNext = document.getElementById('review-next');
    const reviewCards = document.querySelectorAll('.review-card');
    let currentReview = 0;
    
    function showReview(n) {
        reviewCards.forEach(card => card.style.display = 'none');
        if (reviewCards[n]) reviewCards[n].style.display = 'block';
    }
    
    if (reviewCards.length > 0) showReview(currentReview);
    
    if (reviewPrev) {
        reviewPrev.addEventListener('click', () => {
            currentReview = currentReview <= 0 ? reviewCards.length - 1 : currentReview - 1;
            showReview(currentReview);
        });
    }
    
    if (reviewNext) {
        reviewNext.addEventListener('click', () => {
            currentReview = currentReview >= reviewCards.length - 1 ? 0 : currentReview + 1;
            showReview(currentReview);
        });
    }
    
    // Дополнительные элементы
    const leaveReviewBtn = document.getElementById('leave-review-btn');
    if (leaveReviewBtn) {
        leaveReviewBtn.addEventListener('click', () => {
            alert('Отзывы взяты из сообщений клиентов в мессенджерах.');
        });
    }
    
    const viewPriceListBtn = document.getElementById('view-price-list-btn');
    if (viewPriceListBtn) {
        viewPriceListBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = 'docs/remont-balkonov-price-list.pdf';
            link.download = 'Ремонт балконов прайс-лист.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    
    const viewMoreProjectsBtn = document.getElementById('view-more-projects-btn');
    if (viewMoreProjectsBtn) {
        viewMoreProjectsBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = 'docs/remont-balkonov-catalog.pdf';
            link.download = 'Ремонт балконов каталог.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});*/