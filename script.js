// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menú móvil
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Scroll suave para navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Cambiar estilo del navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Animaciones de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.artist-card, .album-card, .news-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        observer.observe(el);
    });

    // Botones de reproducción
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Simular reproducción
            this.innerHTML = '<i class="fas fa-pause"></i>';
            this.style.background = '#f7931e';
            
            // Volver al estado original después de 3 segundos
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-play"></i>';
                this.style.background = '#ff6b35';
            }, 3000);
            
            // Mostrar notificación
            showNotification('¡Reproduciendo música!');
        });
    });

    // CTA Button funcionalidad
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        document.querySelector('#artists').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        if (name && email && message) {
            showNotification('¡Mensaje enviado correctamente!');
            this.reset();
        } else {
            showNotification('Por favor, completa todos los campos.', 'error');
        }
    });

    // Enlaces de "Leer más"
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Funcionalidad de noticias en desarrollo');
        });
    });

    // Efectos de hover adicionales
    const artistCards = document.querySelectorAll('.artist-card');
    artistCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Paralax efecto para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Contador de reproducciones simulado
    let playCount = 0;
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            playCount++;
            updatePlayStats();
        });
    });

    function updatePlayStats() {
        const stats = document.querySelectorAll('.artist-stats span:last-child');
        stats.forEach(stat => {
            const currentPlays = parseInt(stat.textContent.replace(/\D/g, ''));
            stat.innerHTML = `<i class="fas fa-play"></i> ${currentPlays + 1}M`;
        });
    }

    // Sistema de notificaciones
    function showNotification(message, type = 'success') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Estilos de la notificación
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#e74c3c' : '#ff6b35'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            font-weight: 600;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(notification);
        
        // Mostrar notificación
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Ocultar y eliminar notificación
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Loading de contenido dinámico
    function loadContent() {
        const loadingElements = document.querySelectorAll('.artist-card, .album-card');
        loadingElements.forEach((element, index) => {
            element.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
        });
    }

    // Llamar a la función de carga
    setTimeout(loadContent, 500);

    // Manejo de errores para imágenes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Imagen placeholder en caso de error
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
            this.alt = 'Imagen no disponible';
        });
    });

    // Efecto de escritura para el título hero
    const heroTitle = document.querySelector('.hero-content h1');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 1000);

    // Easter egg - Konami Code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > 10) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            showNotification('¡Easter egg encontrado! 🎵');
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });

    // Añadir animación rainbow al CSS dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Lazy loading para imágenes
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    // Aplicar lazy loading a todas las imágenes
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });

    console.log('🎵 Música Urbana Website - Totalmente cargado!');
});