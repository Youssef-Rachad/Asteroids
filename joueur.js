class Joueur {
    constructor(){
        this.vaisseaux = [];
    }
    monte = () => {
        for (vaisseau of this.vaisseaux) {
            vaisseau.monte();
        }}
    descend = () => {
        for (vaisseau of this.vaisseaux) {
            vaisseau.descend();
        }}
    droite = () => {
        for (vaisseau of this.vaisseaux) {
            vaisseau.droite();
        }}
    gauche = () => {
        for (vaisseau of this.vaisseaux) {
            vaisseau.gauche();
        }}
    tirer = () => {
        for (vaisseau of this.vaisseaux) {
            vaisseau.tirer();
        }
    }
    dessine = () => {
        for (vaisseau of this.vaisseaux) {
            vaisseau.dessine();
        }
    }
}
