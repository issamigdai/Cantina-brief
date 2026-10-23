const button = document.getElementById('Ajouter');
const popup = document.getElementById('popupdiv');
const annuler = document.getElementById('Annuler');

function showPopup() {
    popup.classList.remove('hidden');
}
function annulerPopup() {
    popup.classList.add('hidden');
}

button.addEventListener('click', showPopup);
annuler.addEventListener('click', annulerPopup);