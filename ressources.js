// ---IMAGES--- \\
var vaisseau_img = new Image();
vaisseau_img.src = './images/vaisseau_3.png';

var vaisseau_clone_img = new Image();
vaisseau_clone_img.src = './images/vaisseau_3.png';

const ville = new Image();
ville.addEventListener('load', () => {
    return;
});
ville.src='./images/ville.png';

// ---AUDIO --\\
document.getElementById('audio_musique').loop = true;
// On divise la valeur du contrôle par 100
// car, le volume varie entre 0 et 1

// Traiter les controles de la musique
document.getElementById('audio_controle_musique').addEventListener('input', (e)=>{
    document.getElementById('audio_musique').volume = document.getElementById('audio_controle_musique').value/100;
});
// Traiter les controles des effets sonores
document.getElementById('audio_controle_sfx').addEventListener('click', (e)=>{
    let temp = document.getElementById('audio_controle_sfx').value/100;
    document.getElementById('audio_a_sur_v').volume = temp;
    document.getElementById('audio_l_sur_a').volume = temp;
    document.getElementById('audio_laser').volume = temp;
});
