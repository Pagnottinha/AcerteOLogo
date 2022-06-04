const highscoreList = document.getElementById("highscoreList");
const highscores = JSON.parse(sessionStorage.getItem("highscores")) || [];

highscoreList.innerHTML = highscores.map((score) => `<li>${score.username} - ${score.score}</li>`).join('');