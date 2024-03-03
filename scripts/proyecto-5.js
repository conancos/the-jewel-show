function checkCashRegister(price, cash, cid) {

    price *= 100;
    /* console.log("Price sucio: ", price) */
    price = parseFloat(price.toFixed(2));
    /* console.log("Price limpio: ", price) */
    cash *= 100;
    /* console.log("Cash sucio: ", cash) */
    cash = parseFloat(cash.toFixed(2));
    /* console.log("Cash limpio: ", cash) */
    let change = cash - price;
    console.log("Change simulated :", change / 100);

    let devolution = [ [ "ONE HUNDRED", 0 ], [ "TWENTY", 0 ], [ "TEN", 0 ],
    [ "FIVE", 0 ], [ "ONE", 0 ], [ "QUARTER", 0 ],
        [ "DIME", 0 ], [ "NICKEL", 0 ], [ "PENNY", 0 ] ];
    
    const diamonds = confetti.shapeFromText({ text: '💎' }); /*🌟  💍 💲 ✨*/
    const scalar = 2;

    for (let i = 0; i < cid.length; i++) {
        cid[ i ][ 1 ] *= 100;
        /* console.log("cid[i][1] sucio: ", cid[ i ][ 1 ]) */
        cid[ i ][ 1 ] = parseFloat(cid[ i ][ 1 ].toFixed(2));
        /* console.log("cid[i][1] * 100 limpio : ", cid[ i ][ 1 ]) */
    }
    cid = Array.from(cid).reverse();
    /* cid = Array(cid).reverse(); */

    const coins = [ 10000, 2000, 1000, 500, 100, 25, 10, 5, 1 ];

    for (let i = 0; i < cid.length; i++) {
        while (change >= coins[ i ] && cid[ i ][ 1 ] >= coins[ i ]) {
            change -= coins[ i ];
            cid[ i ][ 1 ] -= coins[ i ];
            devolution[ i ][ 1 ] += coins[ i ];
        }
    }

    for (let i = 0; i < devolution.length; i++) {
        devolution[ i ][ 1 ] /= 100;
    }

    let totalCash = 0;
    for (let i = 0; i < cid.length; i++) {
        cid[ i ][ 1 ] /= 100
        /* cid[i][1] = parseFloat(cid[i][1].toFixed(2)) //Redondeo para solventar perversiones. */
        totalCash += parseFloat(cid[ i ][ 1 ].toFixed(2));
    }

    totalCash = parseFloat(totalCash.toFixed(2));
    console.log("totalCash", totalCash);

    let result = {
        status: "",
        change: [],
    };

    if (change > 0 || totalCash < 0) {
        result.status = "INSUFFICIENT FUNDS to return! You went too far, come back later.";
        
        
    } else if (change === 0 && totalCash === 0) {
        result.status = "CLOSED";

        confetti({
            particleCount: 125,
            spread: 100,
            /* colors: [ "#0f0", "#ff0", "#006" ], */
            shapes: [ diamonds ], scalar
        })
        
        //jewels.js => tryOffer()  **************************
        

    } else if (price > cash) {
        return "Introduce more money, please...";
        // añadido, si no inserta dinero suficiente.
    
    } else {
        result.status = "OPEN";
        for (let i = 0; i < devolution.length; i++) {
            if (devolution[ i ][ 1 ] > 0) {
                result.change.push(devolution[ i ]);
            }
        }
        /* for (let i = 0; i < cid.length; i++) {
            cid[i][1] = cid[ i ][ 1 ] / 100;
            console.log(cid[ i ][ 1 ]);
        } */
        /* console.log("cid", cid);
        cidRest = cid.reverse();
        addDevolutionToCashFunds(cidRest); */
        confetti({
            particleCount: 200,
            spread: 100,
            colors: ["#0ff", "#00f", "#003", "#0f0", "#f0f"]
        })
    }

    return result;
}

// Desde aquí no debo llamar a la función.
/* const devolutionToUse = selectedDevolution || devolutions[ 0 ]; para ir probando */
/* console.log(checkCashRegister(19.5, 20, selectedDevolution || devolutions[0] )); */

/* console.log(checkCashRegister(`${ selectedJewel }`, 20, `${ selectedDevolution }`)) */

/* console.log(checkCashRegister(price, cash, cid)); */