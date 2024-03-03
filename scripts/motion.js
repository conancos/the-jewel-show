document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const codec = document.querySelector('.codec-js');
        const children = codec.children;
        
        codec.style.display = "flex";
        for (let i = 0; i < children.length; i++)
        {
            const currentChild = children[i];
            currentChild.style.display = "flex";
        }

        //Meto en cashFunds la primera random devolution.
        addDevolutionToCashFunds(selectedDevolution);

    }, 7000);

    // Activo las animaciones para los elementos de la app.

    // Brillo imagen background:
    function brilloFondo() {
        document.body.style.backdropFilter = "brightness(20%)";
    }
    setTimeout(brilloFondo, 2500);


    // Sube .container-image y su brillo animation:
    function brilloContainerImage() {
        const containerImage = document.querySelector('.container-image');
        const windowHeight = window.innerHeight;
        if (windowHeight >= 1035) {
            document.documentElement.style.overflow = "hidden";
            // Desactivo Scroll si la pantalla es mas alta, así no salta y mueve la web.
            document.querySelector('aside').children[ 0 ].onanimationend = () => {
                document.documentElement.style.overflow = "";       //scroll auto
            }
        }
        containerImage.style.animation = "motion 4s ease forwards, machine-shine .1s infinite";
    }
    setTimeout(brilloContainerImage, 4500);


    // Aparece el cuadro .explication:
    setTimeout(() => {
        document.querySelector('.explication').style.filter = "opacity(1)"
    }, 6500);


    // Aparece el footer:
    function brilloFooter() {
        document.querySelector('.footer').style.filter = "opacity(1)";
    }
    setTimeout(brilloFooter, 6500);


    // Destello en h1, la 1ªvez 4s+animation-delay:6s =10s, la 2ª 7s+6s= 13s
    function flashH1() {
        const h1Flash = document.querySelector('h1');
        if (h1Flash) {
            h1Flash.classList.toggle('flash');
        }
        const spanFlash = document.querySelector('h1 span');
        if (spanFlash) {
            spanFlash.classList.toggle('flash');
        }
    }
    setTimeout(() => {
        flashH1();
        setInterval(flashH1, 7000)
    }, 4000);

    // Destello del span, hijo del h1, "joya reward dinámica";
    /* function flashSpan() {
        const spanFlash = document.querySelector('h1 span');
        if (spanFlash) {
            spanFlash.classList.toggle('flash');
        }
    }
    setTimeout(() => {
        flashSpan();
        setInterval(flashSpan, 7000)
    }, 4000); */


    // Prevengo el contextmenu en imágenes.
    const mainMachine = document.querySelector('.main-machine');
    mainMachine.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });

});