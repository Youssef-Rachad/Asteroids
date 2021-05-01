// Trousse de secours pour augmenter les vies du vaisseau
class Pouvoir {
    constructor() {
        // position (x, y)
        this.x = hasard(WIDTH/4, 3*WIDTH/4) -100;
        this.y = hasard(0, HEIGHT/2);
        // pour le déplacement
        this.theta = hasard(1, 10);
        // rayon
        this.r = 15;
    }
    dessine () {/*chaque pouvoir a sa methode de dessin*/ }
    bouge () {
        this.y = (this.y + 1)%HEIGHT;
        this.x += 7*Math.cos(0.25*this.theta);
        this.x = modulo(this.x, canvas.width + 200);
        this.theta = (this.theta + 1) % 360;
    }
}
class Secours extends Pouvoir {
    dessine() {
        ctx.fillStyle = 'white';
        // important, sinon la couleur persiste
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2* Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x - 0.25*this.r,this.y -  0.75*this.r, this.r/2, 1.5*this.r);
        ctx.fillRect(this.x - 0.75*this.r,this.y -  0.25*this.r, 1.5*this.r, 0.5*this.r);
    }
}
class Clone extends Pouvoir {
    dessine() {
        ctx.fillStyle = 'white';
        // important, sinon la couleur persiste
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2* Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'red';
        ctx.lineWidth = 5;
        ctx.moveTo(this.x - 0.5*this.r, this.y + 0.5*this.r);
        ctx.lineTo(this.x + 0.5*this.r, this.y + 0.5*this.r);
        ctx.lineTo(this.x, this.y - 0.5*this.r);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
}
