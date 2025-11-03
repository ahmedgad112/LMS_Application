/**
 * جامعة برج العرب - Simple Landing Page
 * Clean and simple functionality
 */

// Application URLs configuration
const APPLICATION_URLS = {
    grade1: 'https://batechu.it-club.top/applications/create',
    grade2: 'https://batechu.com/grade-two-applications/create',
    grade3: 'https://batechu.com/grade-three-applications/create',
    grade4: 'https://batechu.com/grade-four-applications/create',
    coordinationResult: 'https://batechu.it-club.top/applications/coordination-result',
    updateStudentData: 'https://batechu.it-club.top/applications/update-student-data',
    complaints: 'https://forms.gle/BdLbTkaWogQHpduZ8',
    instapay: 'https://ipn.eg/S/ahmedgadmeeza/instapay/71my1N',
    vodafoneCash: 'https://vf.eg/vfcash?id=mt&qrId=vreiwg',
    signUpAfterPayment: 'https://forms.gle/QRXBAxtk1UwCVCzW6'
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
        console.warn(`Button "${buttonId}" not found`);
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
 * Initialize all buttons
 */
function initializeButtons() {
    addButtonListener('btn1', () => redirectToUrl(APPLICATION_URLS.grade1, 'btn1'));
    addButtonListener('btn2', () => redirectToUrl(APPLICATION_URLS.grade2, 'btn2'));
    addButtonListener('btn3', () => redirectToUrl(APPLICATION_URLS.grade3, 'btn3'));
    addButtonListener('btn4', () => redirectToUrl(APPLICATION_URLS.grade4, 'btn4'));
    addButtonListener('coordination-btn1', () => redirectToUrl(APPLICATION_URLS.coordinationResult, 'coordination-btn1'));
    addButtonListener('coordination-btn2', () => redirectToUrl(APPLICATION_URLS.updateStudentData, 'coordination-btn2'));
    addButtonListener('complaints-btn', () => redirectToUrl(APPLICATION_URLS.complaints, 'complaints-btn'));
    addButtonListener('instapay-btn', () => redirectToUrl(APPLICATION_URLS.instapay, 'instapay-btn'));
    addButtonListener('vodafone-cash-btn', () => redirectToUrl(APPLICATION_URLS.vodafoneCash, 'vodafone-cash-btn'));
    addButtonListener('sign-up-btn', () => redirectToUrl(APPLICATION_URLS.signUpAfterPayment, 'sign-up-btn'));
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
