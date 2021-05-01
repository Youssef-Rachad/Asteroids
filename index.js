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
var vaisseau = new Vaisseau();
var vaisseau_clone;
var trousse_secours = new Secours();
var cloneur = new Clone();
var niveau = 1;

// Tableau des entités de jeu
var lasers = [];
var asteroides = [];
var etoiles = [];
// Créer les étoiles
for(i = 0; i < 100; i++){
    etoiles.push( new Etoile(hasard(0, WIDTH), hasard(-HEIGHT/4, 3*HEIGHT/4), hasard(1,3), couleurs[hasard(0, couleurs.length - 1)], hasard(50, 70)/100));
}

// État initial du canevas
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// ---Écouter les bouttons--- \\
// Bouton de départ
document.getElementById('btn_depart').addEventListener('click', () => {
    // On remplace la page avant avec la page arriere
    document.getElementById('en_avant').style.visibility = 'hidden';
    document.getElementById('en_arriere').style.visibility = 'visible';
    document.getElementById('audio_musique').volume = document.getElementById('audio_controle_musique').value/100;
    document.getElementById('audio_musique').play();
});
document.getElementById('btn_arcade').addEventListener('click', () => {
    // On affiche le jeu
    document.getElementById('en_arriere').style.visibility = 'hidden';
    // Lier le clavier au canevas, sans cliquer
    canvas.setAttribute('tabindex','0');
    canvas.focus();
    // initialiser le vaisseau
    vaisseau.init();
    // Créer les astéroïdes
    asteroides = [];
    for(i = 0; i < 5; i++){
        let b6412 = new Asteroide(hasard(WIDTH*0.1, 0.9*WIDTH), -1 * hasard(500, 1500));
        asteroides.push(b6412);
    }
    // on commence Animation Loop
    jeu_arcade();
});

// Bouton de départ
document.getElementById('btn_campagne').addEventListener('click', () => {
    // On affiche le jeu
    document.getElementById('en_arriere').style.visibility = 'hidden';
    // Lier le clavier au canevas, sans cliquer
    canvas.setAttribute('tabindex','0');
    canvas.focus();
    // initialiser le vaisseau
    vaisseau.init();
    // Créer les astéroïdes
    asteroides = [];
    for(i = 0; i < 5; i++){
        let b6412 = new Asteroide(hasard(WIDTH*0.1, 0.9*WIDTH), -1 * hasard(500, 1500));
        asteroides.push(b6412);
    }

    // on commence Animation Loop
    jeu_campagne();
});

document.getElementById('btn_perdu').addEventListener('click', () => {
    // effacer l'écran de «jeu perdu»
    document.getElementById('perdu').style.visibility = 'hidden';
});

// fonctions pour déplacer
// doivent être des fonctions flèches pour les callback
var monter = () => {
    vaisseau.monte();
    if(vaisseau_clone) vaisseau_clone.monte();
}
var descendre = () => {
    vaisseau.descend();
    if(vaisseau_clone) vaisseau_clone.descend();
}
var droiter = () => {
    vaisseau.droite();
    if(vaisseau_clone) vaisseau_clone.droite();
}
var gaucher = () => {
    vaisseau.gauche();
    if(vaisseau_clone) vaisseau_clone.gauche();
}
var tirer = () => {
    vaisseau.tirer();
    if(vaisseau_clone) vaisseau_clone.tirer();
}


// Méthode pour traiter plusieurs touches
const clavier = {
    38 : {actif: false, action: monter},
    87 : {actif: false, action: monter},
    39 : {actif: false, action: droiter},
    68 : {actif: false, action: droiter},
    65 : {actif: false, action: gaucher},
    37 : {actif: false, action: gaucher},
    40 : {actif: false, action: descendre},
    83 : {actif: false, action: descendre},
    32 : {actif: false, action: tirer}
}
document.addEventListener('keydown', (e)=>{
    if(clavier[e.keyCode]) clavier[e.keyCode].actif = true;
});
document.addEventListener('keyup', (e)=>{
    if(clavier[e.keyCode]) {
        clavier[e.keyCode].actif = false;
        // afficher la bonne image
        vaisseau.img_bouge_pas();
        if(vaisseau_clone) vaisseau_clone.img_bouge_pas();
    }});

// Pour chaque clé de l'objet « clavier » (une touche):
// on vérifie si elle est appuyée
// et on appel leur action()
function toucheClavier() {
    Object.keys(clavier).forEach((touche)=>{clavier[touche].actif && clavier[touche].action()})
}


