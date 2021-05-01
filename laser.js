class Laser{
    constructor(x, y, couleur) {
        // position (x, y)
        this.x = x;
        this.y = y;
        // dimensions fixtes
        this.width = 5;
        this.height = 10;
        // couleur
        this.couleur = couleur;
    }
    // faire avancer le laser
    bouge() {
        this.y -= 5;
    }
    // dessiner un rectangle selon
    // la position, les dimensions et la couleur
    dessine() {
        ctx.fillStyle = this.couleur;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

