/**
 * جامعة برج العرب - الصفحة الرئيسية
 * التقديم حسب الفرقة، الدفع (محفظة / انستا باي)، الشكاوى
 */

const APPLICATION_URLS = {
    grade1: 'https://batechu.com/applications/create',
    grade2: 'https://batechu.com/grade-two-applications/create',
    grade3: 'https://batechu.com/grade-three-applications/create',
    grade4: 'https://batechu.com/grade-four-applications/create',
    complaints: 'Problem.htm',
    walletPhoneNumber: '01019747118',
    instaPayUrl: 'https://ipn.eg/S/ahmedgadmeeza/instapay/71my1N'
};

/**
 * Hide page loader
 */
function hidePageLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 400);
    }
}

/**
 * Show button loader
 */
function showButtonLoader() {
    const loader = document.getElementById('button-loader');
    if (loader) {
        loader.classList.add('show');
    }
}

/**
 * Hide button loader
 */
function hideButtonLoader() {
    const loader = document.getElementById('button-loader');
    if (loader) {
        loader.classList.remove('show');
    }
}

/**
 * Set button loading state
 */
function setButtonLoading(button) {
    if (button) {
        button.classList.add('loading');
        button.disabled = true;
    }
}

/**
 * Remove button loading state
 */
function removeButtonLoading(button) {
    if (button) {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

/**
 * Simple redirect function
 */
function redirectToUrl(url, buttonId = null) {
    if (!url) {
        console.error('No URL provided');
        return;
    }

    const button = buttonId ? document.getElementById(buttonId) : null;
    
    if (button) {
        setButtonLoading(button);
        showButtonLoader();
    }

    setTimeout(() => {
        window.location.href = url;
    }, 200);
}

/**
 * Add button listener
 */
function addButtonListener(buttonId, callback) {
    const button = document.getElementById(buttonId);
    if (!button) {
        // Silently skip if button doesn't exist (e.g., commented out payment section)
        return;
    }

    button.addEventListener('click', function(event) {
        event.preventDefault();
        callback();
    });

    // Keyboard support
    button.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            button.click();
        }
    });
}

/**
 * Payment modal: open
 */
function openPaymentModal() {
    const modal = document.getElementById('payment-modal');
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.getElementById('payment-modal-close').focus();
}

/**
 * Payment modal: close
 */
function closePaymentModal() {
    const modal = document.getElementById('payment-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

/**
 * معالجة اختيار طريقة الدفع: محفظة (عرض الرقم) أو انستا باي (انتقال للرابط)
 */
function goToTapPayment(method) {
    closePaymentModal();
    if (method === 'wallets') {
        const num = APPLICATION_URLS.walletPhoneNumber;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(num).then(function () {
                alert('رقم المحفظة: ' + num + '\n\nتم نسخ الرقم للحافظة.');
            }).catch(function () {
                alert('رقم المحفظة: ' + num);
            });
        } else {
            alert('رقم المحفظة: ' + num);
        }
    } else {
        const url = APPLICATION_URLS.instaPayUrl;
        if (url) {
            showButtonLoader();
            setTimeout(function () { window.location.href = url; }, 200);
        }
    }
}

/**
 * تهيئة نافذة اختيار طريقة الدفع (محفظة / انستا باي)
 */
function initializePaymentModal() {
    const triggerBtn = document.getElementById('payment-btn1');
    const modal = document.getElementById('payment-modal');
    const backdrop = document.getElementById('payment-modal-backdrop');
    const closeBtn = document.getElementById('payment-modal-close');
    const walletBtn = document.getElementById('payment-method-wallets');
    const instaPayBtn = document.getElementById('payment-method-instapay');

    if (!triggerBtn || !modal) return;

    triggerBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openPaymentModal();
    });

    function closeModal() {
        closePaymentModal();
    }

    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });

    if (walletBtn) walletBtn.addEventListener('click', function () { goToTapPayment('wallets'); });
    if (instaPayBtn) instaPayBtn.addEventListener('click', function () { goToTapPayment('instapay'); });
}

/**
 * ربط أزرار الصفحة
 */
function initializeButtons() {
    addButtonListener('btn1', () => redirectToUrl(APPLICATION_URLS.grade1, 'btn1'));
    addButtonListener('btn2', () => redirectToUrl(APPLICATION_URLS.grade2, 'btn2'));
    addButtonListener('btn3', () => redirectToUrl(APPLICATION_URLS.grade3, 'btn3'));
    addButtonListener('btn4', () => redirectToUrl(APPLICATION_URLS.grade4, 'btn4'));
    addButtonListener('complaints-btn', () => redirectToUrl(APPLICATION_URLS.complaints, 'complaints-btn'));
    initializePaymentModal();
}

/**
 * تهيئة الصفحة عند جاهزية DOM
 */
function initPage() {
    setTimeout(hidePageLoader, 500);
    initializeButtons();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
