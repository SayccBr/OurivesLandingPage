/* 
  Mobile menu toggle com jQuery
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

    btn.addEventListener("click", () => {
        menu.classList.toggle("active");
        
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    });

    // Jquery Scroll spy para adicionar classe active nos links de navegação
    $(window).on('scroll', function() {
        const header = $('header');
        var scrollPos = $(window).scrollTop() + 100; // offset para considerar o header

        if (scrollPos <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.5)');
        }

        // Remover active de todos
        $('#navi_links .navi-item, #mobile_links .mobile-item').removeClass('active');

        // Verificar cada link, ignorando #home
        $('#navi_links .navi-item a, #mobile_links .mobile-item a').each(function() {
            var currLink = $(this);
            var href = currLink.attr("href");
            if (href !== "#home") {
                var refElement = $(href);
                if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                    currLink.parent().addClass('active');
                }
            }
        });
    });

    
    // Smooth scroll para links de navegação
    $('a[href^="#"]').on('click', function(event) {
        var target = $($(this).attr('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 15 // ajuste para o header
            }, 1000);
        }
    }); 

});
