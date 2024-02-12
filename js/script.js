const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        Swal.fire({
            icon: 'info',
            title: 'Time off!',
            text: `${correctWord.toUpperCase()} was the correct word`,
            showConfirmButton: false,
            timer: 2000 // Automatically close after 2 seconds
        }).then(() => {
            initGame();
        });
    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}
initGame();

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if(!userWord) return Swal.fire('Error', 'Please enter the word to check!', 'error');
    if(userWord !== correctWord) return Swal.fire('Oops!', `${userWord} is not the correct word`, 'error');
    Swal.fire('Congrats!', `${correctWord.toUpperCase()} is the correct word`, 'success').then(() => {
        initGame();
    });
}


refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);


document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.body.style.userSelect = 'none';
document.body.style.webkitUserSelect = 'none';
document.body.style.MozUserSelect = 'none';
document.body.style.msUserSelect = 'none';