document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll('.skills-item');

    const observerOptions = {
        root: null, 
        rootMargin: "0px 0px -15% 0px", 
        threshold: 0 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    items.forEach(item => {
        observer.observe(item);
    });
});