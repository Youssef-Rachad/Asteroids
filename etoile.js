// Class pour les étoiles dans l'arrière-plan
class Etoile{
    constructor(x, y, c, couleur, vitesse) {
        // coordonnées (x,y)
        this.x = x;
        this.y = y;
        // longueur de côté
        this.c = c;

        this.vitesse = vitesse;
        this.couleur = couleur;
    }
    // calculer le déplacement de l'étoile
    bouge(){
        this.y = (this.y + this.vitesse)%HEIGHT;
    }
    // dessiner un rectangle selon les paramètres donnés
    dessine(){
        ctx.fillStyle = this.couleur;
        ctx.fillRect(this.x, this.y, this.c, this.c);
    }
}

