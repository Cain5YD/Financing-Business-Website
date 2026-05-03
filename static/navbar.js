const navLinks = document.querySelectorAll('.nav-item a');

navLinks.forEach(link => {
    link.parentElement.classList.remove('active');
    
    if (link.href === window.location.href) {
        link.parentElement.classList.add('active');
    }
});