// Smooth scrolling pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Cacher l'indicateur de scroll après avoir scrollé
/*window.addEventListener('scroll', () => {
    const indicator = document.querySelector('.scroll-indicator');
    if (window.scrollY > 100) {
        indicator.style.opacity = '0';
    } else {
        indicator.style.opacity = '0.6';
    }
}); */

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
    const images = document.querySelectorAll('.hero-image img, .about-image img, .project-image img');
    images.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.5;
            const yPos = -(rect.top * speed);
            img.style.transform = `translateY(${yPos}px) scale(1.1)`;
        }
    });
});

// Slider Photographie
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let index = 0;

function showSlide(i) {
  if (i < 0) index = images.length - 1;
  else if (i >= images.length) index = 0;
  else index = i;

  slides.style.transform = `translateX(${-index * 100}%)`;
}

prev.addEventListener('click', () => showSlide(index - 1));
next.addEventListener('click', () => showSlide(index + 1));



// Animation au scroll pour les cartes
const cards = document.querySelectorAll('.info-card');

function checkCards() {
  const triggerBottom = window.innerHeight * 0.85;
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom) {
      card.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkCards);
checkCards(); // pour lancer au chargement


document.querySelectorAll('.info-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const { offsetX, offsetY, target } = e;
    const x = (offsetX / target.offsetWidth - 0.5) * 10; 
    const y = (offsetY / target.offsetHeight - 0.5) * 10;
    card.style.transform = `rotateX(${-y}deg) rotateY(${x}deg) scale(1.03)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
  });
});
