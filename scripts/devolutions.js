// Array de devolutiones en caja.
const devolutions = [
    [ [ "PENNY", 0.5 ], [ "NICKEL", 0 ], [ "DIME", 0 ], [ "QUARTER", 0 ], [ "ONE", 1 ], [ "FIVE", 0 ], [ "TEN", 0 ], [ "TWENTY", 0 ], [ "ONE HUNDRED", 0 ] ],
    [ [ "PENNY", 0.01 ], [ "NICKEL", 2.05 ], [ "DIME", 0 ], [ "QUARTER", 0 ], [ "ONE", 100 ], [ "FIVE", 500 ], [ "TEN", 0 ], [ "TWENTY", 0 ], [ "ONE HUNDRED", 900 ] ],
    [ [ "PENNY", 5.01 ], [ "NICKEL", 0 ], [ "DIME", 0 ], [ "QUARTER", 0 ], [ "ONE", 10 ], [ "FIVE", 5 ], [ "TEN", 10000 ], [ "TWENTY", 20 ], [ "ONE HUNDRED", 0 ] ],
    [ [ "PENNY", 0.01 ], [ "NICKEL", 0.05 ], [ "DIME", 0.1 ], [ "QUARTER", 0.25 ], [ "ONE", 1 ], [ "FIVE", 5 ], [ "TEN", 10 ], [ "TWENTY", 20 ], [ "ONE HUNDRED", 100 ] ]
];

let selectedDevolution
function getRandomDevolution() {
    let indexRandom = Math.floor(Math.random() * devolutions.length);
    /* selectedDevolution = devolutions[ indexRandom ].slice(); //Creo copia para no perder el valor dado que el código asincrónico, como el que involucra setTimeout, puede causar que las variables cambien antes de que se ejecute el código dentro de los setTimeout. Y creo la variable global con let para poder asignarla cuando la llame como parámetro cid, pues si no, cambia de valor. */
    selectedDevolution = JSON.parse(JSON.stringify(devolutions[indexRandom])); //copia Profunda

    console.log(`%c  Cash Funds random = %c${ JSON.stringify(selectedDevolution) }`,
        'text-shadow: 0 0 3px #0f0', 'color: #0f0; text-shadow: 0 0 2px #ff0');
    
    let total = 0;    // Esto solo pretende mostrar el TOTAL sumado en consola.
    for (let i = 0; i < selectedDevolution.length; i++) {
        total += parseFloat(selectedDevolution[ i ][ 1 ].toFixed(2));
    }
    console.log(`%c $ ${ total }`, 'text-shadow: 0 0 3px #0f0');
    if (total === 0) {
        getRandomDevolution();
    }
    return selectedDevolution;
}
//Obtengo la primera selectedDevolution, al principio.
getRandomDevolution();


// Creo listas y añado el elemento random de devolutions.
function createListItem(label, value) {
    const elementList = document.createElement('li');
    elementList.textContent = `${ label } : ${ value }`;
    
    if (value === 0) {
        elementList.style.color = "#050";
        
    } else {
        elementList.style.color = "#0f0";
        elementList.style.filter = "brightness(180%)";
        
    }
    return elementList;
}


// Añado los elementos li a cashFunds con los valores aleatorios de getRandomDevolution()
function addDevolutionToCashFunds(randomDevolution_or_cid) {
    
    /* const elementsList = []; */

    randomDevolution_or_cid.forEach(([ label, value ], i) => {
        setTimeout(() => {
            const elementList = createListItem(label, Number(value));
            cashFunds.appendChild(elementList);
            /* elementsList.push(elementsList); */
            /* beep3.play() */
            // sonido ahora con restricciones en la política de google...
            // Si quiero meterlo tengo que poner algo para que el usuario interactue primero.

        }, i * 100);
    })
    /* return elementsList; */
}

function returnsToUser(change) {
    
    change.forEach(([ label, value ], i) => {
    
        setTimeout(() => {
            const elementList = createListItem(label, value);
            elementList.style.filter = "brightness(180%)";
            elementList.style.fontWeight = "normal";
            returns.appendChild(elementList)
        
        }, i * 300);
    }) 
}
