// Variables du Canevas
var canvas=document.getElementById('monCanvas');
var ctx=canvas.getContext('2d');
const WIDTH=canvas.width;
const HEIGHT=canvas.height;


// Variables de animationFrame
const FPS = 60;
const INTERVALE = 1000/FPS;
var t_1;
var t_0 = Date.now();
var delta_t;

// Adaptation pour les navigateurs
window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;


// Joueur
const vaisseau = new Vaisseau();
var medecine = new Medkit();
// Tableau des entités de jeu
var etoiles = [];
var asteroides = [];
// Créer les étoiles
for(i = 0; i < 100; i++){
    let temp = new Etoile(hasard(0, WIDTH), hasard(-HEIGHT/4, 3*HEIGHT/4), hasard(1,3), couleurs[hasard(0, couleurs.length - 1)], hasard(50, 70)/100);
    etoiles.push(temp);
}

document.getElementById('audio_musique').loop = true;
// État initial du canevas
ctx.fillRect(0, 0, WIDTH, HEIGHT);

document.getElementById('btn_depart').addEventListener('click', () => {
    // On appuie plus le bouton
    document.getElementById('en_avant').style.visibility = 'hidden';
    document.getElementById('en_arriere').style.visibility = 'visible';
    document.getElementById('audio_musique').play();
});
// Bouton de départ
document.getElementById('btn_jouer').addEventListener('click', () => {
    // On appuie plus le bouton
    document.getElementById('en_arriere').style.visibility = 'hidden';
    // Lier le clavier au canevas, sans cliquer
    canvas.setAttribute('tabindex','0');
    canvas.focus();
    // varaibles initiales
    vaisseau.init();
    // Créer les astéroïdes
    asteroides = [];
    for(i = 0; i < 5; i++){
        let b6412 = new Asteroide(hasard(0, WIDTH), -1 * hasard(500, 1500));
        asteroides.push(b6412);
    }
    // on commence Animation Loop
    dessiner();
});

// Méthode pour traiter plusieurs touches
//https://medium.com/@dovern42/handling-multiple-key-presses-at-once-in-vanilla-javascript-for-game-controllers-6dcacae931b7
const clavier = {
    38 : {actif: false, action: vaisseau.monte},
    87 : {actif: false, action: vaisseau.monte},
    39 : {actif: false, action: vaisseau.droite},
    65 : {actif: false, action: vaisseau.gauche},
    40 : {actif: false, action: vaisseau.descend},
    83 : {actif: false, action: vaisseau.descend},
    37 : {actif: false, action: vaisseau.gauche},
    68 : {actif: false, action: vaisseau.droite},
    32 : {actif: false, action: vaisseau.tirer}
}
document.addEventListener('keydown', (e)=>{
    if(clavier[e.keyCode]) {
        clavier[e.keyCode].actif = true;
    }});
document.addEventListener('keyup', (e)=>{
    if(clavier[e.keyCode]) {
        clavier[e.keyCode].actif = false;
        vaisseau.img_bouge_pas();
    }});
// Pour chaque clé de l'objet « clavier » (une touche):
// on vérifie si elle est appuyée
// et on appel leur action()
function toucheClavier() {
    Object.keys(clavier).forEach((touche)=>{clavier[touche].actif && clavier[touche].action()})
}


// Fonction de jeu principale
function dessiner(){
    // Controler 60 images par seconde
    t_1 = Date.now();
    delta_t = t_1 - t_0;
    if(delta_t > INTERVALE){
        // On traite l'entrée du clavier
        toucheClavier();
        // On garde l'état initial
        ctx.save();
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // Déplacer les étoiles
        for(i = 0; i < etoiles.length; i++){
            etoiles[i].bouge();
            etoiles[i].dessine();
        }
        // Déplacer les vaisseau.lasers
        for(i = 0; i < vaisseau.lasers.length; i++){
            vaisseau.lasers[i].bouge();
            vaisseau.lasers[i].dessine();
        }
        // Déplacer les astéroïdes
        for(i = 0; i < asteroides.length; i++){
            asteroides[i].bouge();
            asteroides[i].dessine();
            // On perd le jeu si on heurte un astéroïde
            // ou un astéroïde atteint la base
            if(collision_cercle_rectangle(asteroides[i], vaisseau) || asteroides[i].y +23 >= HEIGHT){
                // On enlève l'astéroïdes en collision
                document.getElementById('audio_a_sur_v').play();
                asteroides[i] = null;
                asteroides.splice(i, 1);
                // On perd une vie, changer l'image
                vaisseau.vies -= 1;
                vaisseau.blessure(vaisseau.vies);
                // Vérifier si on a perdu
                if (vaisseau.vies == 0){
                    cancelAnimationFrame(dessiner);
                    ctx.fillStyle = 'black';
                    ctx.fillRect(0, 0, WIDTH, HEIGHT);
                    document.getElementById('en_avant').style.visibility = 'visible';
                    asteroides = null
                    vaisseau.init();
                    // prévenir la fonction de continuer
                    return
                }
            }

            // Si un laser atteint un météore, les deux sont éliminés
            for(j = 0; j < vaisseau.lasers.length; j++){
                if(asteroides[i] && collision_cercle_rectangle(asteroides[i], vaisseau.lasers[j])){
                    asteroides[i].vies -= 1;
                    document.getElementById('audio_l_sur_a').play();
                    if(asteroides[i].vies == 0) {
                        // On remplace l'astéroïde
                        asteroides[i] = null;
                        asteroides.splice(i, 1);
                        let b6412 = new Asteroide(hasard(0, WIDTH), -1 * hasard(500, 1500));
                        asteroides.push(b6412);
                    }
                    // On enlève le laser
                    vaisseau.lasers[j] = null;
                    vaisseau.lasers.splice(j, 1);
                    // Et gagne des points
                    vaisseau.score += 10;
                }
            }
        }
        // Déplacer le vaisseau
        vaisseau.trace();
        // La trousse de secours
        medecine.dessine();
        medecine.bouge();
        // On revient à l'état initial
        ctx.restore();

        // Controle de fps
        t_0 = t_1 - (delta_t%INTERVALE);
        // Vérifier si le vaisseau attrape une trousse de secours
        if (collision_cercle_rectangle(medecine, vaisseau)){
            medecine.y = -2 * HEIGHT;
            if(vaisseau.vies < 3){
                vaisseau.vies += 1;
            }
        }
        // Tous les vaisseau.lasers hors de la page sont éliminés
        while(vaisseau.lasers[0] && vaisseau.lasers[0].y <= 30){
            vaisseau.lasers.pop()
        }
        // écrire les varaibles
        ecriture(0.8*WIDTH, 0.05*HEIGHT, `score: ${vaisseau.score}`);
        ecriture(0.8*WIDTH, 0.1*HEIGHT, `vies: ${vaisseau.vies}`);
    }
    // RÉCURSIF
    requestAnimationFrame(dessiner);
}
