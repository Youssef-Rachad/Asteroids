// Fonction de jeu principale
function jeu_arcade(){
    // Controler 60 images par seconde
    t_1 = Date.now();
    delta_t = t_1 - t_0;
    if(delta_t > INTERVALE){
        // On traite l'entrée du clavier
        toucheClavier();
        // On garde l'état initial
        ctx.save();
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // Déplacer les étoiles
        for(i = 0; i < etoiles.length; i++){
            etoiles[i].bouge();
            etoiles[i].dessine();
        }
        // dessiner la terre (après les étoiles)
        ctx.drawImage(ville, 0.5*(WIDTH-ville.width), HEIGHT - 140);
        // Déplacer les vaisseau.lasers
        for(i = 0; i < lasers.length; i++) {
            lasers[i].bouge();
            lasers[i].dessine();
        }
        // Déplacer les astéroïdes
        for(i = 0; i < asteroides.length; i++){
            asteroides[i].bouge();
            asteroides[i].dessine();
            // On perd une vie si on heurte un astéroïde
            // ou un astéroïde atteint la base
            if(collision_cercle_rectangle(asteroides[i], vaisseau) || asteroides[i].y +23 >= HEIGHT){
                // On enlève l'astéroïdes en collision
                document.getElementById('audio_a_sur_v').play();
                asteroides[i] = null;
                asteroides.splice(i, 1);
                // On perd une vie, changer l'image
                vaisseau.vies -= 1;
                vaisseau.changeImage();
                // Vérifier si on a perdu
                if (vaisseau.vies == 0){
                    // arrete le jeu
                    cancelAnimationFrame(jeu_arcade);
                    // mettre à jour le score
                    if(getMeilleurScore("score_arcade")<vaisseau.score) setMeilleurScore("score_arcade", vaisseau.score);
                    document.getElementById('scores_arcade_span').innerText = getMeilleurScore("score_arcade");
                    // effacer le canvas
                    ctx.fillStyle = 'black';
                    ctx.fillRect(0, 0, WIDTH, HEIGHT);
                    // afficher les fenetres «perdu» et «depart»
                    document.getElementById('en_avant').style.visibility = 'visible';
                    document.getElementById('perdu').style.visibility = 'visible';
                    document.getElementById('perdu_score_span').innerText = vaisseau.score;
                    document.getElementsByClassName('perdu_texte')[0].style.animation = 'ecrire 5s steps(20, jump-end), clignoteur .5s step-end infinite';
                    setTimeout(()=>{document.getElementsByClassName('perdu_texte')[0].style.animation = ''}, 5000);
                    // effacer les astéroïdes et le clône
                    asteroides = null;
                    if(vaisseau_clone) vaisseau_clone = null;
                    // réinitialiser
                    vaisseau.init();
                    // prévenir animationFrame de continuer
                    return
                }
                // aussi mettre a jour le clone
                if(vaisseau_clone) {
                    vaisseau_clone.vies -= 1;
                    vaisseau_clone.changeImage();
                }
            }
            // si le clône heurte un astéroïde
            // il se désintègre
            if(vaisseau_clone && asteroides[i] && collision_cercle_rectangle(asteroides[i], vaisseau_clone)) {
                vaisseau_clone = null;
                document.getElementById('audio_a_sur_v').play();
                // on enlève l'astéroïde
                asteroides[i] = null;
                asteroides.splice(i, 1);
                // on crée un nouvel astéroïde
                let b6412 = new Asteroide(hasard(0, WIDTH), -1 * hasard(500, 1500));
                asteroides.push(b6412);
            }
            // Si un laser atteint un météore, les deux sont éliminés
            for(j=0; j < lasers.length; j++){
                if(asteroides[i] && collision_cercle_rectangle(asteroides[i], lasers[j])){
                    asteroides[i].vies -= 1;
                    document.getElementById('audio_l_sur_a').play();
                    if(asteroides[i].vies == 0) {
                        // On remplace l'astéroïde
                        asteroides[i] = null;
                        asteroides.splice(i, 1);
                        let b6412 = new Asteroide(hasard(0, WIDTH), -1 * hasard(500, 1500));
                        asteroides.push(b6412);
                    }
                    // On enlève le laser
                    lasers[j] = null;
                    lasers.splice(j, 1);
                    // Et gagne des points
                    vaisseau.score += 10;

                }
            }
        }

        // Déplacer les vaisseaux
        vaisseau.dessine();
        if (vaisseau_clone){
            vaisseau_clone.dessine();
            vaisseau_clone.compteur_limite++;
        }

        // déplacer et dessiner les pouvoirs
        trousse_secours.dessine();
        trousse_secours.bouge();
        cloneur.dessine();
        cloneur.bouge();

        // On revient à l'état initial
        ctx.restore();

        // Controle de fps
        t_0 = t_1 - (delta_t%INTERVALE);

        // ---ARITHMETIQUES--- \\\
        // Vérifier si le vaisseau attrape une trousse de secours
        if (collision_cercle_rectangle(trousse_secours, vaisseau)){
            trousse_secours.y = -2 * HEIGHT;
            if(vaisseau.vies < 3){
                vaisseau.vies += 1;
                vaisseau.changeImage();
            }
        }
        // Vérifier si le vaisseau attrape un clone
        if (collision_cercle_rectangle(cloneur, vaisseau)){
            cloneur.y = -5 * HEIGHT;
            if (!vaisseau_clone){
                vaisseau_clone = new Vaisseau_Clone(vaisseau.x + 50, vaisseau.y);
            }
            else {
                // s'il y a déjà un clone, on ajoute du temps ( millisecondes)
                vaisseau_clone.compteur_limite -= 600;
            }
        }
        // Tous les vaisseau.lasers hors de la page sont éliminés
        while(lasers[0] && lasers[0].y <= 30){
            lasers.pop()
        }
        // apres un temps, on enlève le clone
        if (vaisseau_clone && vaisseau_clone.compteur_limite>=1800){
            vaisseau_clone.compteur_limite=0;
            vaisseau_clone = null;
        }
        // ---ECRITURE--- \\
        // écrire les varaibles (interference avec les dessins précédents)
        ecriture(0.8*WIDTH, 0.05*HEIGHT, `score: ${vaisseau.score}`);
        ecriture(0.8*WIDTH, 0.1*HEIGHT, `vies: ${vaisseau.vies}`);

    }
    // RÉCURSIF
    requestAnimationFrame(jeu_arcade);
}

