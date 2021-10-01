// Sætter konstanter til gameboard, scoreboard, 
const btn = document.getElementById('rolldiceBtn');
const gameboard = document.getElementById('gameboard');
const scoreboard = document.getElementById('scoreboard');
const num_dices = 5;
const arr_dices = [];
let total;
const dice_size = 100;

console.log(arr_dices);

rollDices();

/**
 * Event på button 
 */
btn.onclick = function() {
    rollDices();
    let score = setScore(arr_dices);
    setTimeout(() => {
        scoreboard.innerHTML = score;    
    }, 500) 
}

/**
 * Kaster terningerne
 */
function rollDices() {
    reset();
    for(let i = 1; i <= num_dices; i++) {
        let number = getRandomNumber();
        let dice = createDice(number);
        arr_dices.push(number);
        total += number;
        gameboard.appendChild(dice);
    }    
}

/**
 * Genererer svg html til terning
 * @param {number} num_eyes 
 * @returns {string} html streng med svg og dice face
 */
function createDice(num_eyes) {
    let mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); 
    mySvg.classList.add('dice');

    let myRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');

    myRect.setAttribute('x', 10);
    myRect.setAttribute('y', 10);
    myRect.setAttribute('width', dice_size);
    myRect.setAttribute('height', dice_size);
    myRect.setAttribute('rx', '20');
    myRect.setAttribute('fill', 'white');
    myRect.setAttribute('stroke', 'black');
    myRect.setAttribute('stroke-width', '3');

    mySvg.appendChild(myRect);

    switch (num_eyes) {
        case 1:
            mySvg.appendChild(drawCircle(50, 50));
            break;
        case 2:
            mySvg.appendChild(drawCircle(80, 20));
            mySvg.appendChild(drawCircle(20, 80));
            break;

        case 3:
            mySvg.appendChild(drawCircle(50, 50));
            mySvg.appendChild(drawCircle(80, 20));
            mySvg.appendChild(drawCircle(20, 80));
            break;

        case 4:
            mySvg.appendChild(drawCircle(20, 20));
            mySvg.appendChild(drawCircle(20, 80));
            mySvg.appendChild(drawCircle(80, 20));
            mySvg.appendChild(drawCircle(80, 80));
            break;

        case 5:
            mySvg.appendChild(drawCircle(50, 50));
            mySvg.appendChild(drawCircle(20, 20));
            mySvg.appendChild(drawCircle(20, 80));
            mySvg.appendChild(drawCircle(80, 20));
            mySvg.appendChild(drawCircle(80, 80));
            break;

        case 6:
            mySvg.appendChild(drawCircle(20, 20));
            mySvg.appendChild(drawCircle(20, 80));
            mySvg.appendChild(drawCircle(80, 20));
            mySvg.appendChild(drawCircle(80, 80));

            mySvg.appendChild(drawCircle(20, 50));
            mySvg.appendChild(drawCircle(80, 50));
            break;

        default:
    }


    return mySvg;


}

/**
 * Tegner øjne cirkler 
 * @param {number} x X position
 * @param {number} y Y position
 * @returns {string} html streng med svg circle
 */
function drawCircle(x, y) {
    let myCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    myCircle.setAttribute('r', '10');
    myCircle.setAttribute('cx', x + 10);
    myCircle.setAttribute('cy', y + 10);
    myCircle.setAttribute('fill', 'black');
    return myCircle;
}

/**
 * Henter tilfældigt tal mellem 1 og dynamisk variabel
 * @param {number} num_eyes Øverste grænse værdi
 * @returns number 
 */
function getRandomNumber(num_eyes = 6) {
    return Math.ceil(Math.random() * num_eyes)
}

/**
 * Sætter score og beregner resultat ud fra balut princippet
 * @returns {string} Tekst med score i et balut spil
 */
function setScore() {
    // Sætter var til score streng
    let score = '';
    // Reducerer array til nyt array med tilfælde 
    const dices_reduced = arr_dices.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    let arrMap = Array.from(dices_reduced.values());

    switch(arrMap.length) {
        case 1:
            score = 'Balut';
            break;
        case 2:
            // Ternary operator
            score = (arrMap.some(x => x === 3)) ? "Fuld hus" : "4 ens";
            break;
        case 3:
            if(arrMap.some(x => x === 3)) {
                score = '3 ens';
            } else {
                score = '2 par';
            }
            break;
        case 4:
            score = '1 par';
            break;
        case 5:
            arr_dices.sort();
            let arr_joined = arr_dices.join('');            
            if(arr_joined === '12345') {
                score = 'en lille straight';
            } else if(arr_joined === '23456') {
                score = 'en stor straight';
                console.log(score);
            } else {
                score = 'nada';
            }

            break;
    }
    return `Du har ${score}`;
}

/**
 * Nulstiller game
 */
function reset() {
    gameboard.innerText = '';
    scoreboard.innerText = '...';
    arr_dices.length = 0;
    total = '';
}
