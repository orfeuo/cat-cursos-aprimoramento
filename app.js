document.addEventListener('DOMContentLoaded', function () {

    // 1. CURSOR INTERATIVO
    const cursor = document.querySelector('.cursor');
    const links = document.querySelectorAll('a, button');
    window.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    links.forEach(link => {
        link.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        link.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));

    // 2. PARTÍCULAS NO BANNER
    tsParticles.load("particles-js", {
        fpsLimit: 120, background: { color: { value: "transparent" } },
        particles: { number: { value: 40 }, color: { value: "#fff" }, shape: { type: "circle" }, opacity: { value: 0.3, random: true }, size: { value: 2, random: true }, links: { color: "#fff", distance: 150, enable: true, opacity: 0.15, width: 1 }, move: { enable: true, speed: 0.8, direction: "none", out_mode: "out" }, },
        interactivity: { events: { onhover: { enable: true, mode: "repulse" } }, modes: { repulse: { distance: 80, duration: 0.4 } } },
        detectRetina: true,
    });

    // 3. ANIMAÇÕES DE ROLAGEM
    const sr = ScrollReveal({ origin: 'bottom', distance: '50px', duration: 1000, delay: 200, easing: 'cubic-bezier(0.5, 0, 0, 1)', reset: false });
    sr.reveal('.header-logo', { delay: 300, origin: 'top', scale: 0.9 });
    sr.reveal('.headline', { delay: 500, origin: 'top' });
    sr.reveal('.subtitle', { delay: 700 });
    sr.reveal('.hero-button', { delay: 900, scale: 0.9 });
    sr.reveal('.stats-grid');
    sr.reveal('.section-title, .section-subtitle');
    sr.reveal('.curso-card', { interval: 150 });
    sr.reveal('.ead-section');
    sr.reveal('.contato-info', { origin: 'left' });
    sr.reveal('.contato-form', { origin: 'right' });
    sr.reveal('.footer');

    // 4. EFEITO DE INCLINAÇÃO DOS CARDS
    VanillaTilt.init(document.querySelectorAll(".curso-card"), { max: 8, speed: 400, glare: true, "max-glare": 0.1 });

    // 5. CONTADOR ANIMADO
    const counters = document.querySelectorAll('.counter');
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; let start = null;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            counter.innerText = Math.floor(progress * target).toLocaleString('pt-BR');
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => { observer.observe(counter); });

    // 6. BOTÃO "VOLTAR AO TOPO"
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) backToTopButton.classList.add('visible');
        else backToTopButton.classList.remove('visible');
    });

    // 7. SUBTÍTULO ROTATIVO
    const rotatingText = document.getElementById('rotating-subtitle');
    if (rotatingText) {
        const phrases = [
            "Transformando carreiras desde 2005 com qualificação de ponta.",
            "Cursos práticos para as demandas reais do mercado.",
            "Sua evolução profissional é a nossa principal missão.",
            "Qualidade e experiência que abrem portas para o futuro."
        ];
        let currentIndex = 0;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % phrases.length;
            rotatingText.style.opacity = 0;
            
            setTimeout(() => {
                rotatingText.textContent = phrases[currentIndex];
                rotatingText.style.opacity = 1;
            }, 500); // Tempo para a transição de fade-out
        }, 4000); // Muda a cada 4 segundos
    }
});