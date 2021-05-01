// Outils

// fonction rendre un nombre au hasard
// min & max inclusifs
function hasard(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// jeu de couleurs
const couleurs = ['blue', 'red', 'green', 'yellow'];

// fonction pour écrire sur le canvas
function ecriture(x, y, texte){
    ctx.save();
    ctx.font = "25px Ubuntu Mono";
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    //default is alphabetic
    ctx.textBaseline = "middle";
    ctx.fillText(texte, x+10, y+10);
    ctx.restore();
}

// Javascript modulo bug
//https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
function modulo(a, b) {
    return ((a % b) + b) % b;
}
// Vérifier s'il y a collision
// 1. l'extrémité droit intersecte le côté gauche d'un rectangle
// 2. l'extrémité côté gauche intersecte le côté droit d'un rectangle
// 3. l'extrémité côté bas intersecte le côté haut d'un rectangle
// 3. l'extrémité côté haut intersecte le côté bas d'un rectangle
function collision_cercle_rectangle(cercle, rectangle) {
    if (
        cercle.x + 25 >= rectangle.x &&
        cercle.x - 25 <= rectangle.x + rectangle.width &&
        cercle.y + 25 >= rectangle.y &&
        cercle.y -25 <= rectangle.y + rectangle.height
    )
    {return true;}
}

