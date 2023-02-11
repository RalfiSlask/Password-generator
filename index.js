const boxes = document.querySelectorAll(".box");
const checkmarks = document.querySelectorAll(".box svg");
const charnumber = document.querySelector(".number");
const slider = document.querySelector(".slider");
const copyIcon = document.querySelector(".copyIcon");
const strengthOfPassword = document.querySelector(".panel-small p");
const columns = document.querySelectorAll(".column");
const generatorBtn = document.querySelector(".panel-generator");
const password = document.querySelector(".password");

// variables containing letters, numbers and symbols //

let alphabetLower = "abcdefghijklmnopqrstuvxyzabcd";
let alphabetUpper = alphabetLower.toUpperCase();
let numbers = "01234567890123456789012345678";
let symbols = "~`!@#$%^&*()_-+={[}]|:;',>.?/"; 
let arrayPassword = [];
let count = 0;

const generatingPassword = () => {
    generatorBtn.onclick = () => {
        let randNumbers;
        let randarray = []; 
        let arrayPassword = [];
        let number = document.querySelectorAll(".checked").length;
        for(let i = 1; i <= slider.value; i++) {
            // generating a random variable for each iteration in the loop //
            randNumbers = Math.floor(Math.random() * 29);   
                if(arrayPassword.length < 10) {
                    randarray = [];
                    if(boxes[0].classList.contains("checked")) {
                        randarray.push(alphabetUpper);
                    }
                    if(boxes[1].classList.contains("checked")) {
                        randarray.push(alphabetLower);
                    }
                    if(boxes[2].classList.contains("checked")) {
                        randarray.push(numbers);
                    }
                    if(boxes[3].classList.contains("checked")) {
                        randarray.push(symbols);
                    } 
                    arrayPassword.push(randarray[(Math.floor(Math.random() * number))][randNumbers])
                }  
                password.innerHTML = arrayPassword.join("");
    }
}
}

const passwordstrengthOfPassword = () => {
    let length = document.querySelectorAll(".checked").length;
    let finalscore;

    // Points that are added to the strengthOfPassword of the password //

    let Ch_number =  slider.value * 4;  // +(n*4) number of characters //
    let letter_score = (slider.value - (slider.value)/length) * 2; // +((len-n)*2) total of uppercase/lowercase letters //
    let numbers_score = (slider.value)/length * 4;   // +(n*4) total of numbers //
    let symbols_score = (slider.value)/length * 6;   // +(n*6) total of symbols//

    // Points that are subtracted to the strengthOfPassword of the password //

    let letter_number_only = slider.value * -1; // -n letters/numbers only //
    let consecutive_char = slider.value * -2;   // -(n*2) consecutive letters/numbers //
    for(let i = 0; i < boxes.length; i++) {
        let upper = boxes[0].classList.contains("checked");
        let lower = boxes[1].classList.contains("checked");
        let numbr = boxes[2].classList.contains("checked");
        let symbol = boxes[3].classList.contains("checked");

        // calculating the score depending how many boxes has been checked //

        if(length == 0) {
            finalscore = Ch_number;
        } else if(length == 1 && boxes[i].classList.contains("checked")) {
            if(boxes[i] == boxes[0] || boxes[i] == boxes[1] || boxes[i] == boxes[2]) {
                finalscore = Ch_number + letter_number_only + consecutive_char;
            } else if(boxes[i] == boxes[3]) {
                let symbols_score = 6 * slider.value;
                finalscore = Ch_number + symbols_score;
            }
        } else if(length == 2)  {
            if(upper && lower) {
                finalscore = letter_score + letter_score + letter_number_only + Ch_number;
            } else if(upper && numbr || lower && numbr) {
                finalscore = letter_score + numbers_score + Ch_number;
            } else if(upper && symbol || lower && symbol) {
                finalscore = letter_score + symbols_score + Ch_number;
            } else if(numbr && symbol) {
                finalscore = numbers_score + symbols_score + Ch_number;
            }
        } else if(length == 3)  {
            if(upper == false || lower == false) {
                finalscore = letter_score + numbers_score + symbols_score + Ch_number;
            } else if(numbr == false) {
                finalscore = letter_score + letter_score + symbols_score + Ch_number;
            } else if(symbol == false) {
                finalscore = letter_score + letter_score + numbers_score + Ch_number;
            } 
        } else if(length == 4) {
                finalscore = Ch_number + symbols_score + numbers_score + letter_score + letter_score;
        }

        // Determining which score determines how strong the password should be and changing the HTML text thereafter //
        }
        if(finalscore < 45) {
            strengthOfPassword.innerHTML = "VERY WEAK";
        } else if(finalscore < 55) {
            strengthOfPassword.innerHTML = "WEAK";
        } else if(finalscore < 75) {
            strengthOfPassword.innerHTML = "MEDIUM";
        } else if(finalscore < 150) {
            strengthOfPassword.innerHTML = "STRONG";
        }
}

const fillingColumns = () => {
    for(let i = 0; i < columns.length; i++) {
        if(strengthOfPassword.innerHTML == "VERY WEAK") {
            columns[0].style.backgroundColor = "#FB7C58";
            columns[1].style.backgroundColor = "#18171F";
            columns[2].style.backgroundColor = "#18171F";
            columns[3].style.backgroundColor = "#18171F";
        } else if(strengthOfPassword.innerHTML == "WEAK") {
            columns[0].style.backgroundColor = "#FB7C58";
            columns[1].style.backgroundColor = "#FB7C58";
        } else if(strengthOfPassword.innerHTML == "MEDIUM") {
            columns[0].style.backgroundColor = "#FB7C58";
            columns[1].style.backgroundColor = "#FB7C58";
            columns[2].style.backgroundColor = "#FB7C58";
            columns[3].style.backgroundColor = "#18171F";
        } else if(strengthOfPassword.innerHTML == "STRONG") {
            columns[i].style.backgroundColor = "#FB7C58";
        }
    }

}

const clickingBoxes = () => {
    for(let i = 0; i < boxes.length; i++) {
        boxes[i].onclick = () => {
            if(slider.value == 1) {
                if(boxes[i].classList.contains("checked") == false && count == 0) {
                    boxes[i].style.backgroundColor = "#A4FFAF";
                    checkmarks[i].classList.remove("hidden");
                    boxes[i].classList.add("checked");
                    count++;         
                } else if(boxes[i].classList.contains("checked")) {
                    boxes[i].style.backgroundColor = "#24232C";
                    checkmarks[i].classList.add("hidden");
                    boxes[i].classList.remove("checked");
                    count--;
                }
            } else if(slider.value == 2) {
                    if(boxes[i].classList.contains("checked") == false) {
                        if(count == 0 || count == 1) {
                            boxes[i].style.backgroundColor = "#A4FFAF";
                            checkmarks[i].classList.remove("hidden");
                            boxes[i].classList.add("checked");
                            count++;
                        }
                    } else if(boxes[i].classList.contains("checked")) {
                        boxes[i].style.backgroundColor = "#24232C";
                        checkmarks[i].classList.add("hidden");
                        boxes[i].classList.remove("checked");
                        count--;
                    }
            } else if(slider.value == 3) {
                if(boxes[i].classList.contains("checked") == false) {
                    if(count == 0 || count == 1 || count == 2) {
                        boxes[i].style.backgroundColor = "#A4FFAF";
                        checkmarks[i].classList.remove("hidden");
                        boxes[i].classList.add("checked");
                        count++;
                    }
                } else if(boxes[i].classList.contains("checked")) {
                    boxes[i].style.backgroundColor = "#24232C";
                    checkmarks[i].classList.add("hidden");
                    boxes[i].classList.remove("checked");
                    count--;
                } 
            } else if(slider.value > 3) {
                if(boxes[i].classList.contains("checked") == false) {
                        boxes[i].style.backgroundColor = "#A4FFAF";
                        checkmarks[i].classList.remove("hidden");
                        boxes[i].classList.add("checked");
                        count++;
                } else if(boxes[i].classList.contains("checked")) {
                    boxes[i].style.backgroundColor = "#24232C";
                    checkmarks[i].classList.add("hidden");
                    boxes[i].classList.remove("checked");
                    count--;
                } 
            }
    } 
    }
}



const adjustSlider = () => {

    // making the slider two colored with a linear gradient //
    const minVal = slider.min;
    const maxVal = slider.max;
    const val = ((slider.value - minVal) * 100) / (maxVal - minVal)
    const fillLeft = "#A4FFAF";
    const fillRight = "#18171F";
    slider.style.background = `linear-gradient(to right, ${fillLeft} ${val}%, ${fillRight} ${val}%)`
}

const adjustCharLength = () => {
    charnumber.innerHTML = slider.value;
}

document.addEventListener("DOMContentLoaded", () => {
    generatingPassword();
    setInterval(passwordstrengthOfPassword, 0);
    setInterval(fillingColumns, 0);
    clickingBoxes();
    slider.addEventListener("input", adjustSlider);
    adjustSlider();
    setInterval(adjustCharLength, 0)
})

