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

