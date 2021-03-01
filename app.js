
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .start");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .time_sec");
const timeline = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

const option_list = document.querySelector(".option_list");

//IF START QUIZ BUTTON CLICKED

start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //SHOW THE INFO BOX
}

//IF EXIT BUTTON CLICKED

exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //HIDE THE INFO BOX
}

//IF CONTINUE BUTTON CLICKED

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //HIDE THE INFO BOX
    quiz_box.classList.add("activeQuiz"); //SHOW THW QUIZ BOX
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");
    let que_count = 0;
    let que_numb = 1;
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Time Left";
}

quit_quiz.onclick = () => {
    window.location.reload();
}

//IF NEXT BUTTON CLICKED

next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time Left";
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Question Completed");
        showResultBox();
    }
}

//GETTING QUESTIONS AND OPTIONS FROM ARRAY

function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = ' <div><svg class="tick" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" /><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" /></svg></div>';
let crossIcon = '<div><svg class="cross" xmlns="http://www.w3.org/2000/svg" width="16" height="16"fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOption = option_list.children.length;
    if (userAns == correctAns) {
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("ANSWER IS CORRECT");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }
    else {
        answer.classList.add("incorrect");
        console.log("ANSWER IS WRONG");
        answer.insertAdjacentHTML("beforeend", crossIcon)

        //IF ANSWERS IS INCORRECT THEN AUTOMATICALLY SELECTED THE CORRCET ANSWER

        for (let i = 0; i < allOption; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    //ONCE USER SELECTED DISABLED ALL OPTIONS

    for (let i = 0; i < allOption; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function showResultBox() {
    info_box.classList.remove("activeInfo"); //HIDE THE INFO BOX
    quiz_box.classList.remove("activeQuiz"); //HIDE THE QUIZ BOX
    result_box.classList.add("activeResult"); //SHOW THE RESULT BOX
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) {
        let scoreTag = '<span>Congrats! You got <p>' + userScore + '</p>out of<p>5</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 1) {
        let scoreTag = '<span>Nice You got <p>' + userScore + '</p>out of<p>5</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = '<span>You got only <p>' + userScore + '</p>out of<p>5</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";

            let correctAns = questions[que_count].answer;
            let allOption = option_list.children.length;

            for (let i = 0; i < allOption; i++) {
                if (option_list.children[i].textContent == correctAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }

            
    for (let i = 0; i < allOption; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        timeline.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}


function queCounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' + index + '</p>OF<p>' + questions.length + '</p>Qestions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}