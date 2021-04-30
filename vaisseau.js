class Vaisseau{
    constructor(x, y) {
        this.x = x || hasard(WIDTH/5, 4*WIDTH/5);
        this.y = y || hasard(HEIGHT-150, HEIGHT-100);
        this.compteur = 0;
        this.flag = true;
        this.lasers = [];
        this.img = vaisseau_img;
        this.width = 45;
        this.height = 85;
        this.vies = 3;
        this.score = 0;
    }
    img_bouge_pas(){
        let temp = this.img.src.split('_');
        this.img.src = `${temp[0]}_${this.vies}.png`;
    }
    dessine(){
        ctx.drawImage(this.img, this.x, this.y);
        this.compteur += 1;
        if (this.compteur >= 30){
            this.compteur = 0;
            this.flag = true;
        }
    }
    changeImage() {
        let temp = this.img.src.split('_');
        this.img.src = `${temp[0]}_${this.vies}.png`;
    }
    init() {
        this.x = hasard(WIDTH/5, 4*WIDTH/5);
        this.y = hasard(HEIGHT-150, HEIGHT-100);
        this.score = 0;
        this.vies = 3;
        vaisseau_img.src = './images/vaisseau_3.png';
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
            document.getElementById('audio_laser').play();
            for(let i = 1; i <= this.score/500 + 1; i++){
                lasers.unshift(new Laser(this.x+25, this.y + i*10, couleurs[hasard(0, couleurs.length-1)]));
            }
            this.flag = false;
            this.compteur = 0;
        }
    }
}
class Vaisseau_Clone extends Vaisseau {
    constructor(x, y){
        super(x, y);
        this.img.src = './images/vaisseau_3.png';
        this.compteur_limite = 0;
    }
}
