// function constructora x regalo/s
class SoundTrack {
    constructor(jewel, track) {
        this.jewel = jewel;
        this.track = track;
    }
}

// creo objeto para almacenar las instancias nuevas.
const soundTracks = {};

// Creo función que maneja las instancias, porque los sonidos no pueden saltar automáticamente, 
// la llamaré más abajo, con el click de un botón.
function createHowls() {
    soundTracks["Benitoite"] = new SoundTrack("Benitoite", "./sounds/cinematic-trailer-daub-LIBRE-pixabay.mp3");
    soundTracks["Grandidierite"] = new SoundTrack("Grandidierite", "./sounds/clip_08_power_of_preenfm-LIBRE-pixabay.mp3");
    soundTracks["Diamond"] = new SoundTrack("Diamond", "./sounds/promo-logo-LIBRE-pixabay.mp3");
    soundTracks["Serendibite"] = new SoundTrack("Serendibite", "./sounds/dubstep-logo-LIBRE-pixabay.mp3");
    soundTracks["Alexandrite"] = new SoundTrack("Alexandrite", "./sounds/stylish-rock-intro-only-hot-and-dangerous-LIBRE-pixabay.mp3");
    soundTracks["Ruby"] = new SoundTrack("Ruby", "./sounds/brass-short-story-LIBRE-pixabay.mp3");
    soundTracks["Emerald"] = new SoundTrack("Emerald", "./sounds/modern-intro-LIBRE-pixabay.mp3");
    soundTracks["Tanzanite"] = new SoundTrack("Tanzanite", "./sounds/mysterious-sci-fi-LIBRE-pixabay.mp3");
    soundTracks["Shappire"] = new SoundTrack("Shappire", "./sounds/the-mask-logo-short-electro-M-CI-pixabay.mp3");
    soundTracks["Unknown"] = new SoundTrack("Unknown", "./sounds/epic-trailer-the-last-one-standing-LIBRE-pixabay.mp3");
}


function preRewards(jewel) {
    
    magic_button.innerText = "Out of Service";
    magic_button.style.cursor = "not-allowed";
    magic_button.setAttribute('readonly', '');

    console.log(`jewel : %c${jewel}`, 'color: #f0f; background: #0af; border-radius: 5%; padding: 5px 3px')
    

    let rewardButton = document.createElement('button');
    rewardButton.classList = ("reward-button");
    rewardButton.textContent = "CONGRATULATIONS!";
    rewardButton.style.cursor = ("no-drop");
    cashFunds.appendChild(rewardButton);
    /* inputWallet.value = ""; */
    
    
    let reward
    // CARGA DE IMAGEN, quizás mejore el rendimiento.
    try {
        reward = new Image();
        
        // Parece que los archivos js toman su relativa desde el html?
        reward.src = `./images/${jewel}-512.jpg`;

        reward.onload = () => {
            try {
                console.log("La imagen se ha cargado ✅");
                
            } catch (err) {
                console.error(err.stack)
            }
        }
    } catch (err) {
        alert(err.stack);
        console.log("Hubo algo raro 🚨🚨🚨")
    } finally {
        console.log("Si no han aparecido errores arriba, TODO va OK 👌")
    }
    
    
    // CLICK REWARD BUTTON
    setTimeout(() => {
        try {
            rewardButton.style.removeProperty('cursor');
            console.log("rewardButton cursor no-drop REMOVED");
        } catch (err) {
            console.error("rewardButton NO REMOVED cursor", err)
        }
        rewardButton.addEventListener('click', function () {
            try {
                const explication = document.querySelector('.explication');
                const mainMachine = document.querySelector('.main-machine');
                const footer = document.querySelector('.footer');
                explication.remove();
                mainMachine.remove();
                footer.remove();

                clearTimeout(surprise); // Detengo la comprobación.
                clearTimeout(crazyLottery); // Detengo la ruleta loca.
                console.log("explication, main-machine & footer are DISSABLED")
                
                // Aquí pruebo cargar AUDIO => new Audio()
                /* let audioRewards = new Audio(`./sounds/${jewel}.mp3`); */
                /* if (jewel === "Unknown") {
                    audioRewards = new Audio(`./sounds/stranger-things.mp3`)
                } else {
                    audioRewards = new Audio(`./sounds/the-avengers.mp3`)
                } */
                /* document.body.appendChild(audioRewards); */

                createHowls();
                let audioRewards = new Audio(soundTracks[jewel].track);
                // llamo a Howls para activarla, y sustituir la pregarga new Audio()
                

                console.log("llamada a entrega de premios... y play la BandaSonora");
                
                audioRewards.play();
                entregaDePremios(jewel, reward);
                
            } catch (err) {
                console.error(err.stack)
            }
        })
    }, 2000);
}
///////////////////////////////////////////////////////////////////////////////
//voy a quitar del header, explication
//del main, main-machine
//Y del footer, childnodes--------a ver si funciona y quita los 2 ankors
///////////////////////////////////////////////////////////////////////////////


// Crea la estructura y agrega los elementos.
function entregaDePremios(jewel, reward) {
    console.log(`%cEntrega de premios : ${jewel}`, "color:#5df");
    
    try {
        // Crear el contenedor y elemento img
        const premioFigure = document.createElement('figure');
            premioFigure.classList.add("clase-figure");
        const premioImg = document.createElement('img');
            premioImg.classList.add("clase-premio")
            premioImg.src = reward.src;
            premioImg.alt = "Imagen de la joya conseguida";
            
        // Creo el span de la JOYA y lo agrego bajo el h1.
        // HEADER > h1 > span
        document.querySelector('header').classList.add('headerAwards')
        const h1Element = document.querySelector('h1');
        const spanJewel = document.createElement('span');
        spanJewel.innerHTML = `<br>${jewel}`;
        h1Element.appendChild(spanJewel);
        spanJewel.classList.add('title-name-jewel', 'flash');
        h1Element.classList.add('title-name', 'flash');
        

        // Agrego el contenedor de la JOYA al main.
        // MAIN > premiFigure > premioImg
        const main = document.querySelector('main');
        main.appendChild(premioFigure);
        main.classList.add('mainAwards');
        premioFigure.appendChild(premioImg);
        setTimeout(() => {
            premioFigure.style.filter = "opacity(1)";
            premioImg.style.filter = "opacity(1)";
        }, 2000);

        
        // Creo el footer y lo agrego al body
        // BODY > HEADER ~ MAIN ~ FOOTER > button
        const footer = document.createElement('footer');
        console.log("footer creado => ", footer);

        footer.classList.add('footerDownload');
        console.log('class = "footerDownload"')
        const body = document.querySelector('body')
        body.classList.add('bodyAwards');
        console.log('body class="bodyAwards"');
        body.appendChild(footer)
        console.log('footer in body ************')
        
        // Buttons DOWNLOAD & EXIT
        const download = document.createElement('button');
        download.textContent = "DOWNLOAD";
        download.classList.add("download");

        const downloadJewel = document.createElement('a');
        downloadJewel.href = `./images/${jewel}-512.jpg`;
        downloadJewel.setAttribute("download", "");
        footer.appendChild(downloadJewel);
        downloadJewel.appendChild(download)

        
        const exit = document.createElement('button');
        exit.textContent = "EXIT";
        exit.classList.add("exit");

        const exitToIndex = document.createElement('a');
        exitToIndex.href = "../../index.html";
        /* exitToIndex.target = "_blank"; */
        footer.appendChild(exitToIndex);
        exitToIndex.appendChild(exit);

        
        setTimeout(() => {
            footer.style.filter = "opacity(1)";
        }, 5000)
        
        body.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });
    
    } catch (err) {
        console.log(err.stack)
    } finally {
        console.log(`%cSi no hay errores hasta aquí, parece que todo ha ido bien, %cENHORABUENA!`, "color: white; font-weight: bolder; font-size: 1rem", "color: gold; font-weight: bold; font-size: 1.3rem");
    }
}





