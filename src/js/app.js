document.addEventListener("DOMContentLoaded", function () {
  scrollNav();
  fixedNavigation();
});

function scrollNav() {
    const links = document.querySelectorAll('.main-nav A');
    links.forEach( function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const seccion = document.querySelector(e.target.attributes.href.value);
            
            seccion.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function fixedNavigation() {
    const header = document.querySelector('.header');

    //Registrar el Intersection Observer
    const observer = new IntersectionObserver( function(entries) {
        if(entries[0].isIntersecting) {
            console.log('Elemento visible');
            header.classList.remove('fixed');
        } else {
            console.log('No visible');
            header.classList.add('fixed');
        }
    });

    //Elemento a observar
    observer.observe(document.querySelector('.info-festival'));
}
