// Array de Jewels: Benitoíta, Grandidierite, Diamante, Serendibita, Alejandrita, Rubí, Esmeralda, Tanzanita, Zafiro.
const jewels = [
    [ "Benitoite", 2998 ], [ "Grandidierite", 1990 ], [ "Diamond", 1499 ], [ "Serendibite", 1200 ], [ "Alexandrite", 1000 ], [ "Ruby", 780 ], [ "Emerald", 675 ], [ "Tanzanite", 615 ], [ "Shappire", 500 ]
];


const magic_button = document.getElementById('magic-button');
const inputWallet = document.getElementById('input-wallet');
const nameJewel = document.querySelector('.name-jewel');
const priceJewel = document.querySelector('.price-jewel');
const cashFunds = document.getElementById('cashFunds');
const returns = document.getElementById('returns');
/* const mystery = "? ? ? ? ?"; */
const mystery = {
    name: "Unknown",
    jewel: "? ? ? ? ?",
    url: "./images/mystery.jpg"
}
let selectedJewel;
let surprise;
let crazyLottery;

document.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        console.log(`%c Pressing ENTER =>`, 'color: #f00', "Go to click")
        magic_button.click();
    }
});

magic_button.addEventListener('click', async function () {
    console.log(`%c Click ON BUTTON`, 'color: #f50');
    try {
        magic_button.textContent === "Get Jewel" ||
            magic_button.textContent === "conseguir joya".toLowerCase() || 
            magic_button.textContent === "consigue joya".toLocaleLowerCase() ? getRandomJewels() : tryOffer();
    } catch (err) {
        console.error("Error:", err.stack);
    };
    
    function getRandomJewels() {
        magic_button.innerText = "Try Offer $";
        console.log(`%cChange to Try Offer`, 'color: #05f');
        
        const indexRandom = Math.floor(Math.random() * jewels.length);
        selectedJewel = jewels[ indexRandom ];
        setTimeout(() => {
            console.log(selectedJewel);
        }, 2500);
        
        nameJewel.innerText = mystery.jewel/* `${mystery}` */;
        priceJewel.value = "";
        inputWallet.value = "";
        inputWallet.style.cursor = "no-drop";

        for (let i = 0; i < jewels.length; i++) {
            if (selectedJewel[ 0 ] == jewels[ i ][ 0 ]) {
                const box = document.getElementById('box-jewel');
                box.style.animation = "none";
                box.style.background = "none";
                box.style.boxShadow = "none";
                
                // La magia
                setTimeout(() => {
                    box.classList = `aside__right ${ selectedJewel[ 0 ] }`;
                }, 10);
                
                box.ontransitionend = () => {
                    nameJewel.innerText = selectedJewel[ 0 ];
                    priceJewel.value = selectedJewel[ 1 ];
                    
                    inputWallet.removeAttribute('readonly');
                    inputWallet.style.cursor = "default";
                    inputWallet.focus();
                }
                // Este setTimeout está por si no salta la animación,
                // que alguna vez pasa, y: Puede desencadenar una FIESTA...
                surprise = setTimeout(() => {
                    if (nameJewel.innerText === mystery.jewel) {
                        inputWallet.removeAttribute('readonly');
                        inputWallet.focus();
                        /*while(nameJewel.innerText === mystery.jewel){
                        returns.innerHTML = "<p>✨ UNKNOWN JEWEL, HURRY UP ❗</p>"} */

                        crazyLottery = setTimeout(() => {
                            console.log("💥🎁💥 Surprise !");

                            const roulette = new Audio("./sounds/dispara-ruleta.mp3");
                            roulette.id = "auto-shot";

                            autoShot = document.getElementById('auto-shot');

                            if (!autoShot) {
                                document.body.appendChild(roulette);
                            }
                            returns.innerHTML = "<p>💥 CRAZY MODE ❗</p>"
                            roulette.play()
                            getRandomJewels();
                            
                        }, 31500);
                    }
                }, 10500);
            }
        }
        return selectedJewel;
    }

    function tryOffer() {
        try {
            const cashWallet = Number(inputWallet.value);
            console.log("cashWallet = ", cashWallet) // Puja efectiva.
           
            if (cashWallet < selectedJewel[ 1 ]) {
                
                const audioCoins = new Audio();
                audioCoins.src = "./sounds/mario-moneda.mp3";
                audioCoins.id = "moreCoins";
                moreCoins = document.getElementById('moreCoins');
                if (!moreCoins) {
                    document.body.appendChild(audioCoins)
                };
                /* audioCoins.onload = () => {
                    try {
                        console.log("Audio Coins charged !!")
                    } catch (err) {
                        alert(err.stack)
                    } finally {
                        alert("Ha ido bien, o ha ido mal?")
                    }
                }   // No carga igual un sonido que una imagen 👈 */
                returns.innerHTML = "<span class='more-money'>Insert coins 💲 please!</span>";
                audioCoins.play();

            } else {
                            
                const result = checkCashRegister(`${ selectedJewel[ 1 ] }`, `${ cashWallet }`, selectedDevolution);
                console.log("result ==> ", result);

                cashFunds.innerHTML = "";
                
                // addDevolutionToCashFunds:
                // Desde proyecto-5 usando cid, funciona mejor,
                // Aunque hay que llamarla desde aquí, y he realizado los cambios necesarios para que funcione igual. 

                returns.innerHTML = "";
                returns.innerHTML = `<p>${ result.status }</p>`;
                if (result.status === "OPEN") {
                    addDevolutionToCashFunds(selectedDevolution);
                    returns.classList = 'open';

                } else if (result.status === "CLOSED") {
                    cashFunds.innerHTML = "";
                    returns.classList = 'closed';

                    //Llamo a la función de los regalos con la joya obtenida, incluída la "desconocida/unknown".
                    if (nameJewel.innerText == mystery.jewel) {
                        setTimeout(preRewards, 1000, mystery.name)
                    } else {
                        setTimeout(preRewards, 1000, selectedJewel[0]);
                    }


                /*Para los otros casos:Insufficients funds */
                } else {
                    cashFunds.innerHTML = "";
                    /* inputWallet.value = ""; */
                    returns.classList = 'closed';

                    // carga el sonido desastre
                    const failAudio = new Audio();
                    failAudio.src = './sounds/mario-bros-game-over.mp3';
                    failAudio.id = 'game_overAudio';
                    const game_overAudio = document.getElementById('game_overAudio');
                    if (!game_overAudio) {
                        document.body.appendChild(failAudio);
                    };
                    failAudio.play();
                    
                    // Renicio el juego 💫
                    setTimeout(getRandomDevolution, 1000);
                    /* getRandomDevolution(); */
                    setTimeout(() => {
                        addDevolutionToCashFunds(selectedDevolution);
                        returns.innerHTML = "";
                        setTimeout(() => {
                            getRandomJewels();
                            magic_button.removeAttribute('style');
                        }, 2000);
                    }, 4000);
                };
                
                returnsToUser(result.change);

                console.log(`%c Change to Random Jewel`, 'color: #05f');
                magic_button.innerText = "Get Jewel";
                inputWallet.setAttribute('readonly', 'true');
            }
        } catch (err) {
                console.error("Error:", err.stack);
        };
    }
});
