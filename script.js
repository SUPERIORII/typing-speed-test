let url = './text.json';
let randomParagraph = document.querySelector('.random-paragraph');
let btn = document.querySelector('.btn');
let inputElem = document.querySelector('.input');
let inputField = document.querySelector('.input-field');
let time= document.querySelector('.time');
let mistake= document.querySelector('.mistake');
let wordPerMinutes= document.querySelector('.wpm');
let characterPerMinutes= document.querySelector('.cpm');


let letterIndex =0
let  mistakeNum = 0;
let duration = 60

let timerInterval = null;
let timerStatus = 'stopped';
//inputElem.disabled = true
inputElem.style.opacity = '0'


//timer function
let timer=()=> {
    if (duration >0) {
        duration--
        time.textContent = `${duration}S`
    }else {
        clearInterval(timerInterval)
        timerStatus = 'stopped'
        console.log(timerStatus);
    }

}


// start game
const startGame =()=>{
    //inputElem.disabled = false
    //inputElem.style.opacity = '1'
    
}

btn.addEventListener('click', startGame)

inputField.addEventListener('input', ()=>{
  let letterCharacter = randomParagraph.querySelectorAll('span');
  let letter = letterCharacter[letterIndex]
  let inputFieldValue = inputField.value.split('')[letterIndex];

  //starting the timer
  if (timerStatus === "stopped") {
    timerInterval= setInterval(timer, 1000)
    timerStatus = 'started';
    console.log(timerStatus);
  }

  //decrement the 
    if (inputFieldValue == null) {
        letterIndex--
        if (letter.classList.contains('wrong')) {
            mistakeNum--
        }
        letter.classList.remove('correct', 'wrong')
        console.log(letterIndex);
    } else {
        if (letter.innerHTML=== inputFieldValue) {
        letter.classList.add('correct')
        }else {
            mistakeNum++
            letter.classList.add('wrong')  
        }

        letterIndex++
    }
  letterCharacter.forEach(character => character.classList.remove('active'))
  letter.classList.add('active');

  mistake.textContent = mistakeNum;
  characterPerMinutes.textContent = letterIndex - mistakeNum + 'P/M'
  let totalCPM = letterIndex- mistakeNum;
  let totalTimeLeft = duration/60 

  let wpm  = Math.round((((letterIndex-mistakeNum)/5)/( n )))
  console.log(wpm);
  wordPerMinutes.textContent = wpm
  console.log(letterIndex);
  
})

document.addEventListener('keydown', ()=>inputField.focus())



//fetching json returning json data to be use later
 function fetchedData (){
   return fetch(url)
    .then(response => response.json())
    .then(data =>data)

}


//getting random number, creating a span element, and appending the span element to dom 
async function quotes(){
    const result =  await fetchedData();

   // console.log(newQuote);
    let randomQuote = Math.floor(Math.random()* result.length);
    let newQuote = result[randomQuote].quote;
    randomParagraph.innerHTML = '';

    newQuote.split('').forEach(letter => {
        let letterElem = document.createElement('span');
        letterElem.innerText = letter;
        randomParagraph.append(letterElem)
    });

}


quotes()