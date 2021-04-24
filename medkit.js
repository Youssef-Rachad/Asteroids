// Trousse de secours pour augmenter les vies du vaisseau
class Medkit {
    constructor() {
        this.x = WIDTH/2;
        this.y = hasard(0, HEIGHT/2);
        // angle pour la position -> pas de rotation
        this.angle = 0;
        // rayon
        this.r = 15;
    }
    dessine () {
        ctx.fillStyle = 'white';
        // important, sinon la couleur persiste
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2* Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    bouge () {
        this.y = (this.y + 1)%HEIGHT;
        this.x += 7*Math.cos(0.25*this.angle);
        this.angle = (this.angle + 1) % 360;
    }
}
