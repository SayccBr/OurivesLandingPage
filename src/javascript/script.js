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

    btn.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("active");

        document.body.classList.toggle("menu-open", isOpen);
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);
        btn.setAttribute("aria-expanded", String(isOpen));
        btn.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
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
    ScrollReveal().reveal('#cta', {
        origin: 'left', 
        duration: 2000,
        distance: '20%'
    });

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
