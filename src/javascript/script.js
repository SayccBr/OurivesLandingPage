/* Mobile menu toggle com jQuery 
$(document).ready(function() { 
    $('#mobile_btn').on('click', function() { 
        $('#mobile_menu').toggleClass('active'); 
        $('#mobile_btn').find('i').toggleClass('fa-xmark fa-bars'); 
        }); 
    }); 
*/

/* JavaScript puro para toggle do menu mobile */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

    const btn = document.getElementById("mobile_btn");
    const menu = document.getElementById("mobile_menu");
    const icon = btn.querySelector("i");

    function closeMobileMenu() {
        menu.classList.remove("active");
        document.body.classList.remove("menu-open");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
        btn.setAttribute("aria-expanded", "false");
        btn.setAttribute("aria-label", "Abrir menu");
    }

    btn.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = menu.classList.toggle("active");

        document.body.classList.toggle("menu-open", isOpen);
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);
        btn.setAttribute("aria-expanded", String(isOpen));
        btn.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    menu.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    document.addEventListener("click", (event) => {
        if (!menu.classList.contains("active")) return;
        if (menu.contains(event.target) || btn.contains(event.target)) return;

        closeMobileMenu();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menu.classList.contains("active")) {
            closeMobileMenu();
        }
    });

    // Jquery Scroll spy para adicionar classe active nos links de navegação
    $(window).on('scroll', function() {
        const header = $('header');
        var scrollPos = $(window).scrollTop() + 100;
        var currentSection = '#home';

        if (scrollPos <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.5)');
        }

        $('#navi_links .navi-item, #mobile_links .mobile-item').removeClass('active');

        $('main section[id]').each(function() {
            var section = $(this);

            if (section.position().top <= scrollPos) {
                currentSection = '#' + section.attr('id');
            }
        });

        $('#navi_links a[href="' + currentSection + '"], #mobile_links a[href="' + currentSection + '"]').parent().addClass('active');
    });

    // Smooth scroll para links de navegação
    $('a[href^="#"]').on('click', function(event) {
        var target = $($(this).attr('href'));
        if (target.length) {
            event.preventDefault();
            closeMobileMenu();
            $('html, body').animate({
                scrollTop: target.offset().top - 15
            }, 1000);
        }
    }); 

    // Scroll reveal para animação de fade-in
    ScrollReveal().reveal('.about-tittle', {
        origin: 'left', 
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#about_card', {
        origin: 'bottom', 
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.grid-top', {
        origin: 'left', 
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.grid-bottom', {
        origin: 'right', 
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.contact-info', {
        origin: 'left', 
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.contact-location', {
        origin: 'right', 
        duration: 2000,
        distance: '20%'
    });

// =====================
    // COUNTER ANIMATION 
    // =====================
    function animateCounter(element, target, duration = 2000, suffix = '') {
        let startTime = null;

        const easeOut = (t) => 1 - Math.pow(1 - t, 3);

        function update(currentTime) {
            if (!startTime) startTime = currentTime;

            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = easeOut(progress);

            const value = Math.floor(easedProgress * target);
            element.textContent = value + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target + suffix;
            }
        }

        requestAnimationFrame(update);
    }

    // OBSERVER
    const counters = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = +el.getAttribute('data-target');
                const suffix = el.getAttribute('data-suffix') || '';

                animateCounter(el, target, 2000, suffix);

                obs.unobserve(el);
            }
        });
    }, {
        threshold: 0.7
    });

    counters.forEach(counter => observer.observe(counter));

    // Configuração do Slick Carousel pego do codepen
    $(document).ready(function(){
        if (!$('.slider').length || typeof $.fn.slick !== 'function') return;

            $('.slider').slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                arrows: true,
                dots: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            arrows: false
                        }
                    }
                ]
            });
        });
});

// Fotos do mostruário: no mouse, zoom estilo Mercado Livre (lente cinza sobre a foto
// e painel grande ao lado); no toque, a foto abre em tela cheia.
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".option-visual img");
    if (!images.length) return;

    // Toque (celular/tablet): abre a foto em tela cheia
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const viewer = document.createElement("div");
        viewer.className = "photo-viewer";
        viewer.setAttribute("role", "dialog");
        viewer.setAttribute("aria-modal", "true");
        viewer.innerHTML = '<button type="button" class="photo-viewer-close" aria-label="Fechar foto">&times;</button><img alt=""><p class="photo-viewer-caption"></p>';
        document.body.appendChild(viewer);

        const viewerImg = viewer.querySelector("img");
        const caption = viewer.querySelector(".photo-viewer-caption");

        function closeViewer() {
            viewer.classList.remove("is-open");
            document.body.classList.remove("viewer-open");
        }

        images.forEach((img) => {
            img.parentElement.classList.add("tappable");
            img.addEventListener("click", () => {
                viewerImg.src = img.dataset.zoom || img.currentSrc || img.src;
                viewerImg.alt = img.alt;
                const title = img.closest(".option-card")?.querySelector("h4");
                caption.textContent = title ? title.textContent : "";
                viewer.classList.add("is-open");
                document.body.classList.add("viewer-open");
            });
        });

        // fecha ao tocar fora da foto, no X ou com Esc
        viewer.addEventListener("click", (event) => {
            if (event.target !== viewerImg) closeViewer();
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeViewer();
        });
        return;
    }

    const panel = document.createElement("div");
    panel.className = "zoom-panel";
    panel.setAttribute("aria-hidden", "true");
    document.body.appendChild(panel);

    const LENS_RATIO = 0.4; // lente ocupa 40% da largura da foto
    const GAP = 16;
    const HEADER = 90;

    images.forEach((img) => {
        const box = img.parentElement;
        const lens = document.createElement("div");
        lens.className = "zoom-lens";
        box.classList.add("zoomable");
        box.appendChild(lens);

        function update(event) {
            const rect = box.getBoundingClientRect();
            const panelW = Math.min(480, window.innerWidth * 0.38);
            const panelH = panelW * (rect.height / rect.width);

            const lensW = rect.width * LENS_RATIO;
            const lensH = lensW * (panelH / panelW);
            const x = Math.max(0, Math.min(event.clientX - rect.left - lensW / 2, rect.width - lensW));
            const y = Math.max(0, Math.min(event.clientY - rect.top - lensH / 2, rect.height - lensH));
            lens.style.cssText = `width:${lensW}px;height:${lensH}px;left:${x}px;top:${y}px`;

            // painel à direita do card; se não couber, vai para a esquerda
            const card = box.closest(".option-card") || box;
            const cardRect = card.getBoundingClientRect();
            let left = cardRect.right + GAP;
            if (left + panelW > window.innerWidth - GAP) left = cardRect.left - GAP - panelW;
            const top = Math.max(HEADER, Math.min(rect.top, window.innerHeight - panelH - GAP));

            const scale = panelW / lensW;
            panel.style.width = `${panelW}px`;
            panel.style.height = `${panelH}px`;
            panel.style.left = `${left}px`;
            panel.style.top = `${top}px`;
            panel.style.backgroundImage = `url("${img.dataset.zoom || img.currentSrc || img.src}")`;
            panel.style.backgroundSize = `${rect.width * scale}px ${rect.height * scale}px`;
            panel.style.backgroundPosition = `${-x * scale}px ${-y * scale}px`;
        }

        box.addEventListener("mouseenter", (event) => {
            box.classList.add("is-zooming");
            panel.classList.add("is-visible");
            update(event);
        });
        box.addEventListener("mousemove", update);
        box.addEventListener("mouseleave", () => {
            box.classList.remove("is-zooming");
            panel.classList.remove("is-visible");
        });
    });

    window.addEventListener("scroll", () => {
        panel.classList.remove("is-visible");
        document.querySelectorAll(".option-visual.is-zooming").forEach((el) => el.classList.remove("is-zooming"));
    }, { passive: true });
});
