const root = document.querySelector('.root');
let deck = ['A','A',2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,'J','J','Q','Q','K','K'];
let shuffledDeck = [];
let valueCard1 = '';
let valueCard2 = '';
let match = false;
let card1;
let card2;

const flipingCard = (e) => {
    let id = e.target.id;
                               // si la carta ya está 'expose' no entra
    if ((valueCard2 === '') && !(e.target.classList.contains('expose'))) {
        if (valueCard1 === '') {
            valueCard1 = shuffledDeck[id.slice(2)-1];
            card1 = document.getElementById(`${id}`);
            card1.classList.add('expose');
            card1.innerText = valueCard1;
            return;
        }
    
        if (valueCard2 === '') {
            valueCard2 = shuffledDeck[id.slice(2)-1];
            card2 = document.getElementById(`${id}`);
            card2.classList.add('expose');
            card2.innerText = valueCard2;

            if (valueCard1 === valueCard2) match = true
        }
    
        if ((valueCard2 != '') && (match == false)) {
            setTimeout(()=>{
                valueCard1 = '';
                valueCard2 = '';
                card1.innerText = '';
                card1.classList.toggle('expose');
                card2.innerText = '';
                card2.classList.toggle('expose');
            },1000);
        }

        if (match) {
            console.log('found pair of',valueCard1);
            valueCard1 = '';
            valueCard2 = '';
            match = false;
        }
    }
}

// shuffling deck
do {
    let index = Math.floor(Math.random() * (deck.length-1));
    shuffledDeck.push(deck[index]);
    deck.splice(index,1);
} while (deck.length > 0)

// painting shuffled deck
for ( let i=0; i<shuffledDeck.length ; i++ ) {
    root.innerHTML += `<div id='id${(i+1)}' class='card'></div>`;
}

// adding listeners
for ( let j=0; j<shuffledDeck.length ; j++ ) {
    document.querySelector(`#id${(j+1)}`).addEventListener('click', flipingCard);
}
