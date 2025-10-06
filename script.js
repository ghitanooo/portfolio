// Smooth scrolling pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Cacher l'indicateur de scroll après avoir scrollé
window.addEventListener('scroll', () => {
    const indicator = document.querySelector('.scroll-indicator');
    if (window.scrollY > 100) {
        indicator.style.opacity = '0';
    } else {
        indicator.style.opacity = '0.6';
    }
}); 

// Intersection Observer pour les animations au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer tous les éléments qui doivent apparaître progressivement
document.querySelectorAll('.skill-category, .project-item, .education-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Effet parallaxe sur les images
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const images = document.querySelectorAll('.hero-image img, .about-image img');
    images.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.5;
            const yPos = -(rect.top * speed);
            img.style.transform = `translateY(${yPos}px) scale(1.1)`;
        }
    });
});

// Lightbox pour la galerie photo
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const photoItems = document.querySelectorAll('.photo-item');
const closeBtn = lightbox.querySelector('.lightbox-close');
const prevBtn = lightbox.querySelector('.lightbox-prev');
const nextBtn = lightbox.querySelector('.lightbox-next');

let currentPhotoIndex = 0;
const photos = Array.from(photoItems).map(item => item.querySelector('img').src);

// Ouvrir le lightbox
photoItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentPhotoIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightbox.classList.add('active');
    lightboxImg.src = photos[currentPhotoIndex];
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fermer le lightbox
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Navigation dans le lightbox
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    lightboxImg.src = photos[currentPhotoIndex];
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    lightboxImg.src = photos[currentPhotoIndex];
});

// Navigation au clavier
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    }
});