document.addEventListener('DOMContentLoaded', function() {
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
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const sections = document.querySelectorAll('section');
    
    function highlightNavLink() {
        let scrollPosition = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');       
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
            }
        });
    }
    let isScrolling;
    window.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            highlightNavLink();
        }, 50);
    });
    
    highlightNavLink();
    class ImageSlider {
        constructor(container) {
            this.container = container;
            this.images = this.container.querySelectorAll('.gallery-img');
            this.prevBtn = this.container.querySelector('.gallery-prev');
            this.nextBtn = this.container.querySelector('.gallery-next');
            this.indicatorsContainer = this.container.querySelector('.gallery-indicators');
            this.currentIndex = 0;
            this.intervalId = null;
            this.touchStartX = 0;
            this.touchEndX = 0;
            this.init();
        }
        
        init() {
            this.createIndicators();
            this.preloadImages().then(() => {
                this.container.querySelector('.gallery-loading').style.display = 'none';
                this.showImage(this.currentIndex);
                this.startSlideshow();
            }).catch(error => {
                console.error('Error loading images:', error);
                this.container.querySelector('.gallery-loading').style.display = 'none';
                this.showImage(this.currentIndex);
            });
            this.prevBtn.addEventListener('click', () => this.prevImage());
            this.nextBtn.addEventListener('click', () => this.nextImage());
            this.container.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
            }, {passive: true});
            this.container.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, {passive: true});
            this.container.addEventListener('mouseenter', () => this.pauseSlideshow());
            this.container.addEventListener('mouseleave', () => this.startSlideshow());
        }
        
        preloadImages() {
            return new Promise((resolve, reject) => {
                let loadedCount = 0;
                const totalImages = this.images.length;
                if (totalImages === 0) {
                    reject('No images found');
                    return;
                }
                this.images.forEach(img => {
                    const tempImg = new Image();
                    tempImg.src = img.src;
                    tempImg.onload = () => {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            resolve();
                        }
                    };
                    tempImg.onerror = () => {
                        loadedCount++;
                        console.error(`Failed to load image: ${img.src}`);
                        if (loadedCount === totalImages) {
                            resolve(); // Resolve even if some images fail
                        }
                    };
                });
            });
        }
        
        showImage(index) {
            if (index < 0) index = this.images.length - 1;
            if (index >= this.images.length) index = 0;
            this.images.forEach(img => img.classList.remove('active'));
            this.images[index].classList.add('active');
            this.currentIndex = index;
            this.updateIndicators();
        }
        
        nextImage() {
            this.showImage(this.currentIndex + 1);
            this.pauseSlideshow();
            this.startSlideshow();
        }
        
        prevImage() {
            this.showImage(this.currentIndex - 1);
            this.pauseSlideshow();
            this.startSlideshow();
        }
        
        createIndicators() {
            this.indicatorsContainer.innerHTML = '';
            this.images.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.className = 'gallery-indicator';
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => {
                    this.showImage(index);
                    this.pauseSlideshow();
                    this.startSlideshow();
                });
                this.indicatorsContainer.appendChild(indicator);
            });
        }
        
        updateIndicators() {
            const indicators = this.indicatorsContainer.querySelectorAll('.gallery-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
            });
        }
        
        startSlideshow() {
            this.pauseSlideshow();
            this.intervalId = setInterval(() => this.nextImage(), 5000);
        }
        
        pauseSlideshow() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }
        
        handleSwipe() {
            if (this.touchEndX < this.touchStartX - 50) this.nextImage(); // 
            if (this.touchEndX > this.touchStartX + 50) this.prevImage(); // 
        }
    }
    
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        new ImageSlider(galleryContainer);
    }
});