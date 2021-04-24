// Jeu de couleur utilisé pour colorer les asteroïdes
const jdc = [
    ['#872201', '#8a4c38', '#654321', 'black', 'gray'],
    ['#18186b', '#7171f5', '#13599e', 'black', '#3eedad'],
    []
]
ellipse = (x, y, rx, ry, theta, couleur) => {
    ctx.fillStyle = couleur;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, theta, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
}
const dessinage = [
    // Style 1
    (x, y)=> {
        ellipse(x, y, 25, 25, 0, '#872201');
        ellipse(x-6, y, 15, 16, 0, '#8a4c38');
        ellipse(x-12, y, 7, 10, 0, '#654321')
        ellipse(x-12, y, 7, 8, 0, 'black')
        ellipse(x-12, y, 5, 7, 0, 'gray')
        ellipse(x+18, y-4, 6, 10, -Math.PI/6, '#654321')
        ellipse(x+18, y-4, 6, 9, -Math.PI/6, 'black')
        ellipse(x+18, y-4, 4, 8, -Math.PI/6, 'gray')
        ellipse(x+6, y+12, 6, 6, 0, 'black')
        ellipse(x+6, y+12, 4, 5, 0, 'gray')
        ellipse(x-2, y-16, 6, 6, 0, 'black');
        ellipse(x-2, y-16, 5, 5, 0, 'gray');
        ellipse(x-8, y+18, 6, 4, Math.PI/6, 'black');
        ellipse(x-9, y+18, 6, 3, Math.PI/6, 'gray');
        ctx.stroke();
    },
    // Style 2
    (x, y)=> {
        ellipse(x, y, 25, 25, 0, '#18186b');
        ellipse(x-6, y, 15, 16, 0, '#7171f5');
        ellipse(x-20, y, 8, 12, 0, '#13599e')
        ellipse(x-21, y, 6, 8, 0, 'black')
        ellipse(x-22, y, 5, 7, 0, '#3eedad')
        ellipse(x+19, y-6, 5, 10, -Math.PI/6, '#13599e')
        ellipse(x+19, y-6, 4, 7, -Math.PI/6, 'black')
        ellipse(x+19, y-6, 2, 6, -Math.PI/6, '#3eedad')
        ellipse(x+8, y+12, 7, 7, 0, 'black')
        ellipse(x+8, y+12, 5, 6, 0, '#3eedad')
        ellipse(x-2, y-10, 10, 10, 0, 'black');
        ellipse(x-2, y-10, 9, 9, 0, '#3eedad');
        ellipse(x-8, y+18, 8, 6, Math.PI/12, '#13599e')
        ellipse(x-8, y+18, 6, 4, Math.PI/12, 'black');
        ellipse(x-9, y+18, 6, 3, Math.PI/12, '#3eedad');
        ctx.stroke();
    },
    // Style 3
    (x, y)=> {
        ellipse(x, y, 25, 25, 0, '#b50704');
        ellipse(x-6, y, 15, 16, 0, '#fc5628');
        ellipse(x-20, y, 8, 12, 0, '#eb1010')
        ellipse(x-21, y, 6, 8, 0, 'black')
        ellipse(x-22, y, 5, 7, 0, '#ff0000')
        ellipse(x+19, y-6, 5, 10, -Math.PI/6, '#eb1010')
        ellipse(x+19, y-6, 4, 7, -Math.PI/6, 'black')
        ellipse(x+19, y-6, 2, 6, -Math.PI/6, '#ff0000')
        ellipse(x+8, y+12, 7, 7, 0, 'black')
        ellipse(x+8, y+12, 5, 6, 0, '#ff0000')
        ellipse(x-2, y-10, 10, 10, 0, 'black');
        ellipse(x-2, y-10, 9, 9, 0, '#ff0000');
        ellipse(x-8, y+18, 8, 6, Math.PI/12, '#eb1010')
        ellipse(x-8, y+18, 6, 4, Math.PI/12, 'black');
        ellipse(x-9, y+18, 6, 3, Math.PI/12, '#ff0000');
        ctx.stroke();
    }
    // Style 4
    /*
    (x, y)=> {
        ellipse(x, y, 25, 25, 0, '#18186b');
        ellipse(x-6, y, 15, 16, 0, '#7171f5');
        ellipse(x-20, y, 8, 12, 0, '#13599e')
        ellipse(x-21, y, 6, 8, 0, 'black')
        ellipse(x-22, y, 5, 7, 0, '#3eedad')
        ellipse(x+19, y-6, 5, 10, -Math.PI/6, '#13599e')
        ellipse(x+19, y-6, 4, 7, -Math.PI/6, 'black')
        ellipse(x+19, y-6, 2, 6, -Math.PI/6, '#3eedad')
        ellipse(x+8, y+12, 7, 7, 0, 'black')
        ellipse(x+8, y+12, 5, 6, 0, '#3eedad')
        ellipse(x-2, y-10, 10, 10, 0, 'black');
        ellipse(x-2, y-10, 9, 9, 0, '#3eedad');
        ellipse(x-8, y+18, 8, 6, Math.PI/12, '#13599e')
        ellipse(x-8, y+18, 6, 4, Math.PI/12, 'black');
        ellipse(x-9, y+18, 6, 3, Math.PI/12, '#3eedad');
        ctx.stroke();
    }
    */
]
class Asteroide{
    constructor(x, y) {
        // coordonnées (x,y) et angle de rotation
        this.x = x;
        this.y = y;
        this.angle = 0;
        // vitesse et vitess angulaire, au hasard
        this.vitesse_x = hasard(-1, 1);
        this.vitesse_y = hasard(75,200)/100;
        this.v_angulaire = hasard(10, 50)/10;
        // Couleur
        this.c = hasard(0,dessinage.length-1);
        // Au moins une vie :
        // donc, si on prend la couleur[0],
        // on a 1 vie
        this.vies = this.c + 1;
    }
    dessine(){
        // Se déplacer jusqu'à l'astéroïde et se tourne
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        // Dessiner selon le tableau
        dessinage[this.c](0, 0);
        // Défaire la transformation
        ctx.rotate(-this.angle * Math.PI / 180);
        ctx.translate(-this.x, -this.y);
        // incrémenter l'angle
        this.angle += this.v_angulaire;
    }
    bouge() {
        this.y += this.vitesse_y;
        this.x = modulo((this.x +this.vitesse_x),WIDTH);
    }
}

