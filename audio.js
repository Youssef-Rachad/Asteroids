// Traiter les controles sonores
document.getElementById('audio_controle_musique').addEventListener('input', (e)=>{
    document.getElementById('audio_musique').volume = document.getElementById('audio_controle_musique').value/100;
});
document.getElementById('audio_controle_sfx').addEventListener('click', (e)=>{
    let temp = document.getElementById('audio_controle_sfx').value/100;
    document.getElementById('audio_a_sur_v').volume = temp;
    document.getElementById('audio_l_sur_a').volume = temp;
    document.getElementById('audio_laser').volume = temp;
});
