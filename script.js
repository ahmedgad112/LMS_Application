/**
 * جامعة برج العرب - Simple Landing Page
 * Clean and simple functionality
 */

// Application URLs configuration
const APPLICATION_URLS = {
    grade1: 'https://batechu.com/applications/create',
    grade2: 'https://batechu.com/grade-two-applications/create',
    grade3: 'https://batechu.com/grade-three-applications/create',
    grade4: 'https://batechu.com/grade-four-applications/create',
    complaints: 'Problem.htm',
    vodafoneCash: 'https://vf.eg/vfcash?id=mt&qrId=vreiwg',
    signUpAfterPayment: 'https://forms.gle/QRXBAxtk1UwCVCzW6',
    // الدفع: محفظة (عرض الرقم) أو انستا باي (رابط)
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
 * Redirect to Tap by payment method (wallets or instapay)
 */
function goToTapPayment(method) {
    closePaymentModal();
    if (method === 'wallets') {
        var num = APPLICATION_URLS.walletPhoneNumber;
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
        var url = APPLICATION_URLS.instaPayUrl;
        if (url) {
            showButtonLoader();
            setTimeout(function () {
                window.location.href = url;
            }, 200);
        }
    }
}

/**
 * Initialize payment modal (Tap: محافظ إلكترونية / انستا باي)
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

    function close() {
        closePaymentModal();
    }

    if (backdrop) backdrop.addEventListener('click', close);
    if (closeBtn) closeBtn.addEventListener('click', close);

    modal.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
    });

    if (walletBtn) walletBtn.addEventListener('click', function () { goToTapPayment('wallets'); });
    if (instaPayBtn) instaPayBtn.addEventListener('click', function () { goToTapPayment('instapay'); });
}

/**
 * Initialize all buttons
 */
function initializeButtons() {
    // Grade application buttons
    addButtonListener('btn1', () => redirectToUrl(APPLICATION_URLS.grade1, 'btn1'));
    addButtonListener('btn2', () => redirectToUrl(APPLICATION_URLS.grade2, 'btn2'));
    addButtonListener('btn3', () => redirectToUrl(APPLICATION_URLS.grade3, 'btn3'));
    addButtonListener('btn4', () => redirectToUrl(APPLICATION_URLS.grade4, 'btn4'));
    
    // Coordination results buttons
    // Complaints button
    addButtonListener('complaints-btn', () => redirectToUrl(APPLICATION_URLS.complaints, 'complaints-btn'));

    // Payment: open Tap modal (اضغط هنا للدفع)
    initializePaymentModal();
}

/**
 * Initialize page
 */
function initializePage() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPage);
    } else {
        initPage();
    }
}


/**
 * Main initialization
 */
function initPage() {
    // Hide loader
    setTimeout(() => {
        hidePageLoader();
    }, 500);

    // Initialize buttons
    initializeButtons();

    console.log('Page loaded successfully');
}

// Start
initializePage();
