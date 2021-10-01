// Game container
const container = document.getElementById('container');
// Antal terninger
const num_dice = 5;
// Total sum af øjne
let total = 0;
// Array til terningekast
let arr_dice = [];

// Button Element
 const button = document.createElement('button');
 // Tilføjer click event
 button.addEventListener('click', () => {
     rollDice()
 });
 // Tilføjer button til game container
 container.appendChild(button);
 
// Diceboard wrapper til terninger med id gameboard
const diceboard = document.createElement('div');
diceboard.setAttribute('id', 'gameboard');

// Scoreboard wrapper til resultat med id scoreboard og værdi 0
const scoreboard = document.createElement('div');
scoreboard.setAttribute('id', 'scoreboard');
scoreboard.innerText = 0;
container.appendChild(scoreboard);

// App Initialize
rollDice(6);

/**
 * Kast terningerne
 */
function rollDice(fixedEyes = null) {
    reset(); // Nulstiller elementer

    // Looper antal terninger og henter øjne og bygger svg
    for(let i = 1; i <= num_dice; i++) {
        let dice_face = (!fixedEyes) ? getRandomNumber() : fixedEyes;
        total += dice_face;
        arr_dice.push(dice_face);
        let dice = createDice(dice_face);
        diceboard.prepend(dice);
    }
    
    // Forsinker visning af scvore til at passe med terning animation
    setTimeout(() => {
        scoreboard.innerText = (!fixedEyes) ? getScore(arr_dice) : 0;
    }, 500)
    // Skifter tekst på knap
    button.innerText = !fixedEyes ? 'Kast igen' : 'Kast terningerne';
    container.prepend(diceboard);
}

/**
 * Henter et tilfældigt tal
 * @param {number} num_eyes Antal øjne - default er 6 
 * @returns {number} Tilfældigt tal mellem et og num_eyes
 */
function getRandomNumber(num_eyes = 6) {
    return Math.ceil(Math.random() * num_eyes);
}

/**
 * Henter balut score 
 * @param {array} arr_dice 
 */
function getScore(arr_dice) {
    // Reducerer array til nyt array med antal tilfælde 
    const dices_reduced = arr_dice.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    let arrMap = Array.from(dices_reduced.values());
    //console.log(arrMap);
    let str_score = '';

    // switcher antal tilfælde og beregner score ud fra disse
    switch(arrMap.length) {
        default: 
            str_score = 'Dette er ikke et korrekt slag!';
            break;
        case 1:
            str_score = 'Balut!!!';
            break;
        case 2:
            str_score = arrMap.includes(3) ? 'Fuld hus' : '4 ens';
            break;
        case 3:
            str_score = arrMap.includes(3) ? '3 ens' : '2 par';
            break;
        case 4:
            str_score = '1 par';
            break;
        case 5:
            switch(total) {
                default: 
                    str_score = 'Chance';
                    break;
                case 15: 
                    str_score = 'Lille straight';
                    break;
                case 20:
                    str_score = 'Stor straight';
                    break;
            }   
            break;        
    }
    return str_score;
}

/**
 * Nulstiller gameboard og total
 */
function reset() {
    diceboard.innerHTML = null;
    total = 0;
    arr_dice = [];
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
    myRect.setAttribute('width', 100);
    myRect.setAttribute('height', 100);
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