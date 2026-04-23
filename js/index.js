
    const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section, .glass-card, .cat-card').forEach(el => {
    el.classList.add('fade-in-scroll');
    observer.observe(el);
});
