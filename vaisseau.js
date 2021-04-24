var vaisseau_img_3 = new Image();
vaisseau_img_3.onload = () =>{
    return;
}
vaisseau_img_3.src = './vaisseau_3.png';
var vaisseau_img_1 = new Image();
vaisseau_img_1.onload = () =>{
    return;
}
vaisseau_img_1.src = './vaisseau_1.png';
var vaisseau_img_2 = new Image();
vaisseau_img_2.onload = () =>{
    return;
}
vaisseau_img_2.src = './vaisseau_2.png';

class Vaisseau{
    constructor(x, y) {
        this.x = hasard(WIDTH/5, 4*WIDTH/5);
        this.y = hasard(HEIGHT-150, HEIGHT-100);
        this.compteur = 0;
        this.flag = true;
        this.lasers = [];
        this.img = vaisseau_img_3;
        this.width = this.img.width;
        this.height = this.img.height;
        this.vies = 0;
        this.score = 0;
    }
    img_bouge_pas(){
        let temp = this.img.src.split('_');
        this.img.src = `${temp[0]}_${this.vies}.png`;
    }
    trace(){
        ctx.drawImage(this.img, this.x, this.y);
        this.compteur += 1;
        if (this.compteur >= 30){
            this.compteur = 0;
            this.flag = true;
        }
    }
    blessure(nbr) {
        if(nbr == 1){
            this.img = vaisseau_img_1;
        }
        else if(nbr == 2){
            this.img = vaisseau_img_2;
        }
    }
    init() {
        this.x = hasard(WIDTH/5, 4*WIDTH/5);
        this.y = hasard(HEIGHT-150, HEIGHT-100);
        this.score = 0;
        this.vies = 3;
        this.img = vaisseau_img_3;
    }
    //fonctions en fleche pour les callbacks dans l'objet clavier
    descend = () => {
        this.y += 5;
        let temp = this.img.src.split('_');
        this.img.src = `${temp[0]}_${this.vies}_bouge.png`;
    }
    monte = () => {
        this.y -= 5;
        let temp = this.img.src.split('_');
        this.img.src = `${temp[0]}_${this.vies}_bouge.png`;
    }
    droite = () => {
        this.x = modulo(this.x + 5, WIDTH);
        let temp = this.img.src.split('_');
        this.img.src = `${temp[0]}_${this.vies}_bouge.png`;
    }
    gauche = () => {
        this.x = modulo(this.x - 5, WIDTH);
        let temp = this.img.src.split('_');
        this.img.src = `${temp[0]}_${this.vies}_bouge.png`;
    }
    tirer = (score) => {
        if (this.flag){
            let temp = this.img.src.split('_');
            this.img.src = `${temp[0]}_${this.vies}_bouge.png`;
            for(let i = 1; i <= this.score/500 + 1; i++){
                this.lasers.unshift(new Laser(vaisseau.x+25, vaisseau.y + i*10, couleurs[hasard(0, couleurs.length-1)]));
            }
            this.flag = false;
            this.compteur = 0;
        }
    }
}
class Laser{
    constructor(x, y, couleur) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 10;
        this.couleur = couleur;
    }
    bouge() {
        this.y -= 5;
    }
    dessine() {
        ctx.fillStyle = this.couleur;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
