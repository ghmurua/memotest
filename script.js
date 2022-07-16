const root = document.querySelector('.root');
let oldDeck = ['A','A',2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,'J','J','Q','Q','K','K'];
let deck = [];
let valueCard1 = '';
let valueCard2 = '';
let card1;
let card2;

const flipToShow = (card,value) => {
    card.classList.add('flipToShowStep1');
    setTimeout(()=>{
        card.innerText = value;
        card.classList.add('flipToShowStep2');
        card.classList.remove('flipToShowStep1');
    }, 400);
    setTimeout(()=>{
        card.classList.remove('flipToShowStep2');
    }, 800);
}

const flipToHide = (card) => {
    card.classList.add('flipToHideStep1');
    setTimeout(()=>{
        card.innerText = '';
        card.classList.add('flipToHideStep2');
        card.classList.remove('flipToHideStep1');
    }, 400);
    setTimeout(()=>{
        card.classList.remove('flipToHideStep2');
    }, 800);
}

const seeCard = (e) => {
    let id = e.target.id;
    if ((valueCard2 === '') && !(e.target.classList.contains('exposed'))) {
        if (valueCard1 === '') {
            valueCard1 = deck[id.slice(2)-1];
            card1 = document.getElementById(`${id}`);
            card1.classList.add('exposed');
            flipToShow(card1, valueCard1);
            return;
        }
    
        valueCard2 = deck[id.slice(2)-1];
        card2 = document.getElementById(`${id}`);
        card2.classList.add('exposed');
        flipToShow(card2, valueCard2);

        if (valueCard1 === valueCard2) {
            console.log('found pair of',valueCard1);
            valueCard1 = '';
            valueCard2 = '';
            return;
        }
    
        setTimeout(()=>{
            valueCard1 = '';
            valueCard2 = '';
            flipToHide(card1);
            flipToHide(card2);
            card1.classList.toggle('exposed');
            card2.classList.toggle('exposed');
        },1000);
    }
}

// shuffling deck
do {
    let index = Math.floor(Math.random() * (oldDeck.length-1));
    deck.push(oldDeck[index]);
    oldDeck.splice(index,1);
} while (oldDeck.length > 0)

// painting shuffled deck
for ( let i=0; i<deck.length ; i++ ) {
    root.innerHTML += `<div id='id${(i+1)}' class='card'></div>`;
}

// adding listeners
for ( let j=0; j<deck.length ; j++ ) {
    document.querySelector(`#id${(j+1)}`).addEventListener('click', seeCard);
}
