document.addEventListener('DOMContentLoaded', function() {
    const TOKEN = '7873217731:AAHZa7FLViCn-qyd4h2fFbXwy-TAac4rkp4';
    const CHAT_ID = '-1002512801230';
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    
    // Элементы модального окна
    const callModal = document.getElementById('call-modal');
    const modalClose = document.getElementById('modal-close');
    const orderMeasureBtn = document.getElementById('order-measure-btn');
    const callButton = document.getElementById('call-button');

    // Функции для работы с модальным окном
    function openModal() {
        if (callModal) {
            callModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (callModal) {
            callModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // Обработчики для открытия модалки
    if (orderMeasureBtn) {
        orderMeasureBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }

    if (callButton) {
        callButton.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }

    // Закрытие модалки
    if (modalClose) {
        modalClose.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
        });
    }

    // Закрытие по клику вне модалки
    if (callModal) {
        callModal.addEventListener('click', function(e) {
            if (e.target === callModal) {
                closeModal();
            }
        });
    }

    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && callModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Проверка номера телефона
    function isValidPhoneNumber(phone) {
        // Проверяем формат: +375 (29|33|44|25) XXX-XX-XX
        const phoneRegex = /^\+375\s\((29|33|44|25)\)\s\d{3}-\d{2}-\d{2}$/;
        return phoneRegex.test(phone);
    }

    const form = document.getElementById('contact-form');
    const successElement = document.querySelector('.succes');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Получаем элементы формы
            const nameInput = document.getElementById('name');
            const phoneInput = document.getElementById('phone');
            const messageInput = document.getElementById('message');

            // Проверка существования элементов
            if (!nameInput || !phoneInput || !messageInput) {
                console.error('Один из элементов формы не найден!');
                return;
            }

            // Проверка номера телефона
            if (!isValidPhoneNumber(phoneInput.value)) {
                alert('Вы ввели некорректный номер телефона. Номер должен начинаться с +375 (29, 33, 44 или 25)');
                return;
            }

            // Формируем сообщение
            const messageText = `📌 Новая заявка!\n\n<b>Имя:</b> ${nameInput.value}\n<b>Телефон:</b> ${phoneInput.value}\n<b>Сообщение:</b> ${messageInput.value || 'Не указано'}\n\n#Заявки`;

            // Отправка в Telegram
            axios.post(URL_API, new URLSearchParams({
                chat_id: CHAT_ID,
                parse_mode: 'HTML',
                text: messageText
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(() => {
                alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
                form.reset();
            })
            .catch(error => {
                console.error('Ошибка отправки:', error);
                showSuccessMessage(successElement, 'Ошибка при отправке. Пожалуйста, попробуйте ещё раз.');
            });
        });
    }

    // Обработка формы в модальном окне
    const callForm = document.getElementById('call-form');
    if (callForm) {
        callForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('modal-name');
            const phone = document.getElementById('modal-phone');
            const time = document.getElementById('modal-time');

            if (!name || !phone || !time) {
                console.error('Не найдены поля модальной формы');
                return;
            }

            // Проверка номера телефона
            if (!isValidPhoneNumber(phone.value)) {
                alert('Вы ввели некорректный номер телефона. Номер должен начинаться с +375 (29, 33, 44 или 25)');
                return;
            }

            const timeMapping = {
                any: 'Любое время',
                morning: '9:00 - 12:00',
                day: '12:00 - 15:00',
                evening: '15:00 - 19:00'
            };

            const messageText = `📞 Заказ обратного звонка!\n\nИмя: ${name.value}\nТелефон: ${phone.value}\nУдобное время: ${timeMapping[time.value]} \n\n#Звонки`;
            
            axios.post(URL_API, new URLSearchParams({
                chat_id: CHAT_ID,
                parse_mode: 'HTML',
                text: messageText
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(() => {
                alert('Спасибо! Мы свяжемся с вами в указанное время.');
                callForm.reset();
                closeModal();
            })
        });
    }

    // Маски для телефонов с валидацией операторов
    function initPhoneMask(selector) {
        const phoneField = document.getElementById(selector);
        if (phoneField) {
            phoneField.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                // Проверяем, чтобы номер начинался с 375
                if (!value.startsWith('375') && value.length > 0) {
                    e.target.value = '';
                    return;
                }
                
                if (value.startsWith('375')) value = '+' + value;
                
                // Проверяем оператора (29, 33, 44, 25)
                if (value.length >= 6) {
                    const operator = value.substring(4, 6);
                    const validOperators = ['29', '33', '44', '25'];
                    
                    if (!validOperators.includes(operator)) {
                        e.target.value = e.target.value.substring(0, e.target.value.length - 1);
                        return;
                    }
                }
                
                const matches = value.match(/^(\+375)(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);
                
                if (matches) {
                    e.target.value = `${matches[1]} (${matches[2]}) ${matches[3]}-${matches[4]}-${matches[5]}`.trim();
                }
            });
            
            // Добавляем проверку при потере фокуса
            phoneField.addEventListener('blur', function(e) {
                if (e.target.value && !isValidPhoneNumber(e.target.value)) {
                    alert('Вы ввели некорректный номер телефона. Номер должен начинаться с +375 (29, 33, 44 или 25)');
                    e.target.value = '';
                    e.target.focus();
                }
            });
        }
    }

    // Инициализация масок
    initPhoneMask('phone');
    initPhoneMask('modal-phone');
});