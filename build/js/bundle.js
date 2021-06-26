


document.addEventListener('DOMContentLoaded', function() {
    createGalery();
});

function createGalery() {
    const galery = document.querySelector('.content-galery');

    for (let n=1; n<13; n++) {
        const img= document.createElement('IMG');
        img.src = `./build/img/thumb/${n}.webp`;
        img.dataset.imagenId = n;
        img.onclick = showImage;

        const li= document.createElement('LI');
        li.appendChild(img);

        galery.appendChild(li);
    }
}

function showImage(e) {
    const id = parseInt(e.target.dataset.imagenId);
    
    //Generar la imagen
    const img = document.createElement('IMG');
    img.src = `./build/img/grande/${id}.webp`;
    
    const overlay = document.createElement('DIV');
    overlay.appendChild(img);
    overlay.classList.add('overlay');

    //Funcionalidad cerrar imagen
    const close_img = document.createElement('P');
    close_img.textContent = 'X';
    close_img.classList.add('btn-close');

    overlay.appendChild(close_img);

    close_img.onclick = function() {
        overlay.remove();
        body.classList.remove('hidden-body');
    }

    overlay.onclick = function() {
        overlay.remove();
        body.classList.remove('hidden-body');
    }

    //Mostrar en el HTML
    const body = document.querySelector('BODY');
    body.appendChild(overlay);
    body.classList.add('hidden-body');
}