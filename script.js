// Add event listeners to each button
document.getElementById('btn1').addEventListener('click', function() {
    // Redirect to Google
    window.location.href = 'https://batechu.it-club.top/applications/create';
});


document.getElementById('btn2').addEventListener('click', function() {
    // Redirect to YouTube
    window.location.href = 'https://batechu.com/grade-two-applications/create';
});

document.getElementById('btn3').addEventListener('click', function() {
    // Redirect to Facebook
    window.location.href = 'https://batechu.com/grade-three-applications/create';
});

document.getElementById('btn4').addEventListener('click', function() {
    // Redirect to Twitter (now X, but using the old URL for simplicity)
    window.location.href = 'https://batechu.com/grade-four-applications/create';
});

// Optional: Add a simple alert on page load to show JavaScript is working
window.onload = function() {
    console.log('Landing page loaded successfully!');
    // You can add more JS here, like animations or form handling if needed.
};

