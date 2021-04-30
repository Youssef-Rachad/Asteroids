function getMeilleurScore(score) {
    return JSON.parse(localStorage.getItem(score));
}
function setMeilleurScore(score, valeur) {
    localStorage.setItem(score, valeur);
}
if(!localStorage.getItem("score_campagne")) {
    setMeilleurScore("score_arcade", 0);
    setMeilleurScore("score_campagne", 0);
}
document.getElementById('scores_arcade_span').innerText = getMeilleurScore("score_arcade");
document.getElementById('scores_campagne_span').innerText = getMeilleurScore("score_campagne");
