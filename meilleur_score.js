// obtenir les scores enregistrer
function getMeilleurScore(score) {
    return JSON.parse(localStorage.getItem(score));
}
// enregistrer les scores
function setMeilleurScore(score, valeur) {
    localStorage.setItem(score, valeur);
}
// Si les scores ne sont pas déjà créés
if(!localStorage.getItem("score_campagne")) {
    setMeilleurScore("score_arcade", 0);
    setMeilleurScore("score_campagne", 0);
}
// Afficher les scores
document.getElementById('scores_arcade_span').innerText = getMeilleurScore("score_arcade");
document.getElementById('scores_campagne_span').innerText = getMeilleurScore("score_campagne");
