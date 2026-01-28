/* 
  Mobile menu toggle com jQuery
*/
$(document).ready(function() {
    $('#mobile_btn').on('click', function() {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-xmark fa-bars');
    });
});


/* JavaScript puro para toggle do menu mobile 

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("mobile_btn");
    const menu = document.getElementById("mobile_menu");
    const icon = btn.querySelector("i");

    btn.addEventListener("click", () => {
        menu.classList.toggle("active");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    });
});
*/
