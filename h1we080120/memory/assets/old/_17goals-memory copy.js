const PATH = '/assets/images/17goals/';
const BOARD = document.getElementById('game');

let arrGoals = [
    { 
        goal: 1,
        title_uk: 'No Poverty',
        title_dk: 'Afskaf fattigdom',
        image: 'goal1-no-poverty.svg', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    },
    { 
        goal: 2,
        title_uk: 'Zero Hunger',
        title_dk: 'Stop sult',
        image: 'goal2-zero-hunger.svg', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    },
    { 
        goal: 3,
        title_uk: 'Good Health And Well Being',
        title_dk: 'Sundhed & Trivsel',
        image: 'goal3-good-health-and-well-being.svg', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    },
    { 
        goal: 4,
        title_uk: 'Quality Education',
        title_dk: 'Kvalitets-uddannelse',
        image: 'goal4-quality-education.svg', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    },
    { 
        goal: 5,
        title_uk: 'Gender Equality',
        title_dk: 'Ligestilling mellem kønnene',
        image: 'goal5-gender-equality.svg', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    },
    { 
        goal: 6,
        title_uk: 'Clean Water & Sanitation',
        title_dk: 'Rent vand & sanitet',
        image: 'goal6-clean-water-and-sanitation.svg', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    },
    { 
        goal: 7,
        title_uk: 'Affordable Clean Energy',
        title_dk: 'Bæredygtig energi',
        image: 'goal7-affordable-clean-energy.svg', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    },
    { 
        goal: 8,
        title_uk: 'Decent Work & Economic Growth',
        title_dk: 'Anstændige jobs & økonomisk vækst',
        image: 'goal8-decent-work-and-economic-growth.svg', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    },
    { 
        goal: 9,
        title_uk: 'Industry, Innovation & Infrastructure',
        title_dk: 'Industri, innovation & infrastruktur',
        image: 'goal9-industry-innovation-infrastructure.svg', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    },
    { 
        goal: 10,
        title_uk: 'Reduced Inequalities',
        title_dk: 'Mindre ulighed',
        image: 'goal10-reduced-inequalities.svg', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    },
    { 
        goal: 11,
        title_uk: 'Sustainable Cities & Communities',
        title_dk: 'Bæredygtige byer & lokalsamfund',
        image: 'goal11-sustainable-cities-communities.svg', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    },
    { 
        goal: 12,
        title_uk: 'Responsible Consumption',
        title_dk: 'Ansvarlig forbrug & produktion',
        image: 'goal12-responsible-consumption.svg', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    },
    { 
        goal: 13,
        title_uk: 'Climate Action',
        title_dk: 'Klima-indsats',
        image: 'goal13-climate-action.svg', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    },
    { 
        goal: 14,
        title_uk: 'Life Below Water',
        title_dk: 'Livet i havet',
        image: 'goal14-life-below-water.svg', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    },
    { 
        goal: 15,
        title_uk: 'Life On Land',
        title_dk: 'Livet på land',
        image: 'goal15-life-on-land.svg', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    },
    { 
        goal: 16,
        title_uk: 'Peace, Justice & Strong Institutions',
        title_dk: 'Fred, retfærdighed & stærke institutioner',
        image: 'goal16-peace-justice-strong-institutions.svg', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    },
    { 
        goal: 17,
        title_uk: 'Partnerships For All The Goals',
        title_dk: 'Partnerskab for handling',
        image: 'goal17-partnerships-for-the-goals.svg', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    }
]

const game = {
    init: () => {
        const flipped = [];
        const num_cards = 2;
        let pairs = 0;
        arrGoals = arrGoals.slice(0, num_cards);
        arrGoals = arrGoals.concat(arrGoals);
        shuffleArray(arrGoals);

        for(let item of arrGoals) {
            let card = document.createElement('div');
            card.innerHTML = `<img src="${PATH}${item.image}">`;
            BOARD.appendChild(card);
        }
        let cards = BOARD.querySelectorAll('div');
        for(let card of cards) {
            card.onclick = function() {
                this.classList.add('flipped');
                flipped.push(this);            
                if (flipped.length === 2) {
                    if(flipped[0].innerHTML === flipped[1].innerHTML) {
                        pairs++;
                        flipped.length = 0;

                        console.log(pairs);
                        if(pairs === num_cards) {
                            game.win();
                        }
                    } else {
                        setTimeout(() => {
                            for (let item of flipped) {
                                item.classList.replace("flipped", "closing");
                            }
                            flipped.length = 0;
                        }, 1000, setTimeout(() => {
                            let toRemoveClass = BOARD.querySelectorAll(".closing");                        
                            for (let rmClass of toRemoveClass) {
                                rmClass.classList.remove("closing");
                            }
                        }, 1400))
                    }
                }

            }
        }
    },
    win: () => {
        window.winner = document.createElement('div');
        winner.classList.add('winner');
        winner.innerHTML = `<h1>You Won</h1> <button onclick='game.reset()'><i class='material-icons'>refresh</i></button>`;
        var body = document.getElementsByTagName('body');
        body[0].appendChild(winner);
    },
    reset: () => {
        BOARD.innerHTML = "";
        winner.remove();
        pairs = 0;
        game.init();
    }
}

const shuffleArray = array => {
    let j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}

game.init();
