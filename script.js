const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery-img');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    let currentIndex = 0;
    let intervalId;

    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
        currentIndex = index;
        updateIndicators();
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    function createIndicators() {
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'gallery-indicators';
        
        images.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = `gallery-indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => showImage(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        document.querySelector('.gallery-container').appendChild(indicatorsContainer);
    }

    
    function updateIndicators() {
        const indicators = document.querySelectorAll('.gallery-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    function startSlideshow() {
        intervalId = setInterval(nextImage, 5000); 
    }
    
    function pauseSlideshow() {
        clearInterval(intervalId);
    }
    
    nextBtn.addEventListener('click', () => {
        nextImage();
        pauseSlideshow();
    });

    prevBtn.addEventListener('click', () => {
        prevImage();
        pauseSlideshow();
    });

    document.querySelector('.gallery-container').addEventListener('mouseenter', pauseSlideshow);
    document.querySelector('.gallery-container').addEventListener('mouseleave', startSlideshow);

    createIndicators();
    startSlideshow();
});