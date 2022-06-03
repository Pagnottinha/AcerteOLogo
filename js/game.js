const timerProgression = document.getElementById("timerProgression"),
    timerHTML = document.getElementById("timer"),
    questionProgressHTML = document.getElementById('questionProgress'),
    scoreHTML = document.getElementById('score'),
    brandName = document.getElementById('brandName'),
    images = Array.from(document.querySelectorAll("img")),
    buttons = Array.from(document.querySelectorAll("button"));

const questions = [
    [
        'Starbucks',
        './images/Starbucks/PngReal/Starbucks-RealLogo.png',
        './images/Starbucks/PngFake/Starbucks-FakeLogo01 (1).png',
        './images/Starbucks/PngFake/Starbucks-FakeLogo01 (1).png',
        './images/Starbucks/PngFake/Starbucks-FakeLogo01 (1).png',
        1
    ],
    [
        'Teste',
        './images/Starbucks/PngFake/Starbucks-FakeLogo01 (1).png',
        './images/Starbucks/PngFake/Starbucks-FakeLogo01 (1).png',
        './images/Starbucks/PngReal/Starbucks-RealLogo.png',
        './images/Starbucks/PngFake/Starbucks-FakeLogo01 (1).png',
        3
    ]
];

const MAX_QUESTIONS = questions.length;

let countQuestions,
    availableQuestions,
    score,
    rightQuestions = 0,
    currentQuestion,
    acceptingQuestions,
    timer,
    tempo = 15;

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
    setTimer();
    timerHTML.innerText = "00:15";
}

function start()
{
    score = 0;
    countQuestions = 0;
    availableQuestions = questions;

    setTimer();
    getQuestion();
}

function getQuestion()
{
    if (availableQuestions.length == 0 || countQuestions > MAX_QUESTIONS)
    {
        clearInterval(timer);
        const main = document.querySelector("main");
        document.body.removeChild(main);

        const results = document.createElement('div');
        results.id = "results";
        results.innerHTML = `
            <h1 id="textResult">
                O seu resultado final foi de ${score} pontos, você acertou ${rightQuestions} de ${MAX_QUESTIONS}!
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
        scoreHTML.innerText = `Score: ${score}`;
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

start();