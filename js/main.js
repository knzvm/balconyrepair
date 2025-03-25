document.addEventListener('DOMContentLoaded', function() {
    // Конфигурация Telegram
    const SERVER_URL = 'https://ваш-сервер.ru/send-to-telegram'; // Замените на ваш URL
    const DEFAULT_MESSAGE = 'Нет сообщения';

    // Мобильное меню
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
    
    // Калькулятор
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
                default: basePrice = 400;
            }

            let totalPrice = basePrice * area;
            if (['Остекление', 'Комплексный'].includes(selectedType) && selectedGlazing.includes('ПВХ')) {
                totalPrice *= 1.2;
            }

            const formattedPrice = new Intl.NumberFormat('ru-RU').format(Math.round(totalPrice));
            alert(`Предварительная стоимость: ${formattedPrice} BYN\n\nТип ремонта: ${selectedType}\nПлощадь: ${area} м²\nТип остекления: ${selectedGlazing}\n\nДля точного расчета рекомендуем заказать бесплатный замер.`);
        });
    }
    
    // Портфолио
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
    
    // Отзывы
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
    
    // Модалки
    const callButton = document.getElementById('call-button');
    const callModal = document.getElementById('call-modal');
    const modalClose = document.getElementById('modal-close');
    const orderMeasureBtn = document.getElementById('order-measure-btn');
    
    function openModal() {
        if (callModal) callModal.classList.add('active');
    }
    
    function closeModal() {
        if (callModal) callModal.classList.remove('active');
    }
    
    if (callButton) callButton.addEventListener('click', openModal);
    if (orderMeasureBtn) orderMeasureBtn.addEventListener('click', openModal);
    if (modalClose) modalClose.addEventListener('click', closeModal);
    
    if (callModal) {
        callModal.addEventListener('click', (event) => {
            if (event.target === callModal) closeModal();
        });
    }
    
    // Отправка форм
    async function sendToTelegram(formData) {
        try {
            const response = await fetch(SERVER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            return response.ok;
        } catch (error) {
            console.error('Ошибка отправки:', error);
            return false;
        }
    }

    // Форма заказа звонка
    const callForm = document.getElementById('call-form');
    if (callForm) {
        callForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const formData = {
                name: document.getElementById('modal-name').value,
                phone: document.getElementById('modal-phone').value,
                message: 'Заказ звонка',
                formType: 'callback'
            };

            if (await sendToTelegram(formData)) {
                alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
                closeModal();
            } else {
                alert('Ошибка при отправке формы!');
            }
        });
    }
    
    // Форма обратной связи
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value || DEFAULT_MESSAGE,
                formType: 'contact'
            };

            if (await sendToTelegram(formData)) {
                alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
                contactForm.reset();
            } else {
                alert('Ошибка при отправке формы!');
            }
        });
    }
    
    // Кнопка отзыва
    const leaveReviewBtn = document.getElementById('leave-review-btn');
    if (leaveReviewBtn) {
        leaveReviewBtn.addEventListener('click', () => {
            alert('Форма отзыва будет доступна после авторизации.');
        });
    }
    
    // Прайс-лист
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
    
    // Каталог проектов
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
});