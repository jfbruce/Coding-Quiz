const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// highScores.forEach(score => {
//     highScoresList.appendChild( "<li>class='high-scores'${score.name}-${score.score}</li>");
// });
    

// highScores.map(score => {
//     highScoresList.appendChild( "<li>class='high-scores'${score.name}-${score.score}</li>");
// });

highScoresList.innerHTML = highScores
.map(score => {
    return "<li class='high-score'>" + score.name + "-" + score.score + "</li>";
  })
  .join("");