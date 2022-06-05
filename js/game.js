const timerProgression = document.getElementById("timerProgression"),
    timerHTML = document.getElementById("timer"),
    questionProgressHTML = document.getElementById('questionProgress'),
    scoreHTML = document.getElementById('score'),
    brandName = document.getElementById('brandName'),
    images = Array.from(document.querySelectorAll("img")),
    buttons = Array.from(document.querySelectorAll("main button")),
    userNameInput = document.getElementById("userName");

const questions = [
    [
        'Amazon',
        './images/Amazon/PngFake/amazonFake01.png',
        './images/Amazon/PngReal/amazonReal.png',
        './images/Amazon/PngFake/amazonFake02.png',
        './images/Amazon/PngFake/amazonFake03.png',
        2
    ],
    [
        'Coca-Cola',
        './images/Coca-Cola/PngFake/cocaColaFake01.png',
        './images/Coca-Cola/PngFake/cocaColaFake02.png',
        './images/Coca-Cola/PngFake/cocaColaFake03.png',
        './images/Coca-Cola/PngReal/cocaColaReal.png',
        4
    ],
    [
        'Dolly',
        './images/Dolly/PngReal/dollyReal.png',
        './images/Dolly/PngFake/dollyFake01.png',
        './images/Dolly/PngFake/dollyFake02.png',
        './images/Dolly/PngFake/dollyFake03.png',
        1
    ],
    [
        'Ebay',
        './images/Ebay/PngFake/ebayFake01.png',
        './images/Ebay/PngFake/ebayFake02.png',
        './images/Ebay/PngReal/ebayReal.png',
        './images/Ebay/PngFake/ebayFake03.png',
        3
    ],
    [
        'KFC',
        './images/KFC/PngFake/KFCFake01.png',
        './images/KFC/PngReal/KFCReal.png',
        './images/KFC/PngFake/KFCFake02.png',
        './images/KFC/PngFake/KFCFake03.png',
        2
    ],
    [
        'McDonalds',
        './images/McDonalds/PngFake/McDonaldsFake01.png',
        './images/McDonalds/PngFake/McDonaldsFake02.png',
        './images/McDonalds/PngReal/McDonaldsReal.png',
        './images/McDonalds/PngFake/McDonaldsFake03.png',
        3
    ],
    [
        'Nutella',
        './images/Nutella/PngFake/NutellaFake01.png',
        './images/Nutella/PngFake/NutellaFake02.png',
        './images/Nutella/PngReal/NutellaReal.png',
        './images/Nutella/PngFake/NutellaFake03.png',
        3
    ],
    [
        'RedBull',
        './images/RedBull/PngFake/redbullFake01.png',
        './images/RedBull/PngFake/redbullFake02.png',
        './images/RedBull/PngFake/redbullFake03.png',
        './images/RedBull/PngReal/redbullReal.png',
        4
    ],
    [
        'Rolls-Royce',
        './images/Rolls/PngFake/rollsFake01.png',
        './images/Rolls/PngFake/rollsFake02.png',
        './images/Rolls/PngReal/rollsReal.png',
        './images/Rolls/PngFake/rollsFake03.png',
        3
    ],
    [
        'Shakhtar Donetsk',
        './images/Shakhtar/PngReal/shakhtarReal.png',
        './images/Shakhtar/PngFake/shakhtarFake01.png',
        './images/Shakhtar/PngFake/shakhtarFake02.png',
        './images/Shakhtar/PngFake/shakhtarFake03.png',
        1
    ],
    [
        'Tommy Hilfiger',
        './images/Tommy/PngReal/tommyReal.png',
        './images/Tommy/PngFake/tommyFake01.png',
        './images/Tommy/PngFake/tommyFake02.png',
        './images/Tommy/PngFake/tommyFake03.png',
        1
    ],
    [
        'Starbucks',
        './images/Starbucks/PngReal/StarbucksReal.png',
        './images/Starbucks/PngFake/StarbucksFake01.png',
        './images/Starbucks/PngFake/StarbucksFake02.png',
        './images/Starbucks/PngFake/StarbucksFake03.png',
        1
    ],
];

const MAX_QUESTIONS = 10;

let countQuestions,
    availableQuestions,
    score,
    rightQuestions = 0,
    currentQuestion,
    acceptingQuestions,
    timer,
    tempo,
    username;

function loseFocus()
{
    if (userNameInput.value !== "") return userNameInput.focus();
}

function containsSpecialChars(string)
{
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(string);
}

function start()
{
    const p = document.querySelector('#div-getUserName p')
    if (userNameInput.value === "")
    {
        p.style.opacity = '1';
        return p.innerText = 'Digite um nome.';
    }
    if (containsSpecialChars(userNameInput.value))
    {
        p.style.opacity = '1';
        return p.innerText = 'Sem caracteres especiais!';
    }
    username = userNameInput.value;

    const divStart = document.getElementById("div-getUserName");
    document.body.removeChild(divStart);

    score = 0;
    countQuestions = 0;
    availableQuestions = questions;
    tempo = 15;

    getQuestion();
}

function setTimer()
{
    timer = setInterval(() =>
    {
        tempo--;
        if (tempo <= 9)
        {
            timerHTML.innerHTML = `00:0${tempo}`;
        }
        else
        {
            timerHTML.innerHTML = `00:${tempo}`;
        }
        if (tempo <= 0)
        {
            selection(0);
        }
    }, 1000);
}

function resetTimer()
{
    timerProgression.classList.remove('timerProgression');
    timerProgression.classList.remove('stopProgession');
    tempo = 15;
    timerProgression.offsetWidth;
    timerHTML.innerText = "00:15";
}

function getQuestion()
{
    if (availableQuestions.length == 0 || countQuestions >= MAX_QUESTIONS)
    {
        clearInterval(timer);

        setHighScore();

        const main = document.querySelector("main");
        document.body.removeChild(main);

        const results = document.createElement('div');
        results.id = "results";
        results.className = 'center-div';
        results.innerHTML = `
            <h1 id="textResult">
                ${username}, você acertou ${rightQuestions} de ${MAX_QUESTIONS}, com uma pontuação de ${score}!
            </h1>
            <div class="links">
                <a href="./game.html">
                    Jogar novamente
                </a>
                <a href="./index.html">
                    Home
                </a>
            </div>
        `;
        document.body.appendChild(results);

        const sound = document.createElement('audio');
        sound.src = './audios/applause.mp3';
        sound.autoplay = 'true';
        sound.volume = "0.15";
        document.body.appendChild(sound);
    }
    else
    {
        countQuestions++;
        questionProgressHTML.innerText = `${countQuestions}/${MAX_QUESTIONS}`;

        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[randomIndex];

        brandName.innerText = currentQuestion[0];

        images.forEach((image, index) =>
        {
            image.src = currentQuestion[index + 1];
        });

        availableQuestions.splice(randomIndex, 1);

        acceptingQuestions = true;
        timerProgression.classList.add('timerProgression');
        setTimer();
    }
}

function selection(playerAnswer)
{
    if (!acceptingQuestions) return;

    clearInterval(timer);
    timerProgression.classList.add('stopProgession');

    acceptingQuestions = false;
    const answerSound = document.createElement('audio');

    answer = currentQuestion[currentQuestion.length - 1];
    if (playerAnswer == answer)
    {
        score += 100 + tempo * 2;
        scoreHTML.innerText = `Pontuação: ${score}`;
        rightQuestions++;
        answerSound.src = './audios/correct.mp3';
    }
    else
    {
        answerSound.src = './audios/wrong.mp3';
    }

    answerSound.autoplay = 'true';
    answerSound.volume = "0.15";
    document.body.appendChild(answerSound);

    images.forEach((image, index) =>
    {
        if (index == answer - 1)
        {
            buttons[index].classList.add('correct');
        }
        else
        {
            buttons[index].classList.add('wrong');
        }
    })

    setTimeout(() => 
    {
        images.forEach((image, index) =>
        {
            if (index == answer - 1)
            {
                buttons[index].classList.remove('correct');
            }
            else
            {
                buttons[index].classList.remove('wrong');
            }
        });
        document.body.removeChild(answerSound);
        resetTimer();
        getQuestion();
    }, 3000);
}

function setHighScore()
{
    const highscores = JSON.parse(sessionStorage.getItem('highscores')) || [];

    const highscore = {
        score,
        username
    };

    highscores.push(highscore);
    highscores.sort((a, b) => { return b.score - a.score; });
    highscores.splice(10);

    sessionStorage.setItem('highscores', JSON.stringify(highscores));
}