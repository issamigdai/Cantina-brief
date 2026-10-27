const button = document.getElementById('Ajouter');
const popup = document.getElementById('popupdiv');
const annuler = document.getElementById('Annuler');
const platName = document.getElementById('platName');
const dishPrice = document.getElementById('Price');
const recipesContainer = document.getElementById('recipesContainer');
const Add = document.getElementById('Add');


function showPopup() {
    popup.classList.remove('hidden');
}
function annulerPopup() {
    popup.classList.add('hidden');
}
popup.addEventListener('submit', (e) => {
    e.preventDefault();
    create();
    popup.reset();
    annulerPopup();
});

button.addEventListener('click', showPopup);
annuler.addEventListener('click', annulerPopup);

function create() {
    const checkedCat = document.querySelector('input[name="category"]:checked')?.value;
    const checkedTy = document.querySelector('input[name="quality"]:checked')?.value;

    const createmainDiv = document.createElement("div");
    createmainDiv.classList.add('card', 'flex-1', 'flex', 'flex-col', 'gap-2', 'p-3', 'h-[180px]', 'rounded-lg', 'border', 'border-slate-300', 'bg-white');

    const createTitle = document.createElement("h4");
    createTitle.textContent = platName.value;
    createTitle.classList.add('text-[15px]', 'font-semibold', 'text-slate-900');
    createmainDiv.appendChild(createTitle);

    const createcatDiv = document.createElement("div");
    createcatDiv.classList.add('tags', 'flex', 'flex-wrap', 'gap-1.5');
    createmainDiv.appendChild(createcatDiv);

    const smalltextFirst = document.createElement('small');
    smalltextFirst.classList.add('rounded-full', 'px-2.5', 'py-0.5', 'text-xs', 'font-medium', 'bg-orange-100', 'text-orange-700');
    smalltextFirst.textContent = checkedCat;
    createcatDiv.appendChild(smalltextFirst);

    const smalltextSecond = document.createElement('small');
    smalltextSecond.classList.add('rounded-full', 'px-2.5', 'py-0.5', 'text-xs', 'font-medium', 'bg-orange-100', 'text-orange-700');
    smalltextSecond.textContent = checkedTy;
    createcatDiv.appendChild(smalltextSecond);

    const Price = document.createElement("h4");
    Price.textContent = dishPrice.value + ' DH';
    Price.classList.add('text-sm', 'font-medium');
    createmainDiv.appendChild(Price);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add('buttons', 'flex', 'gap-1.5', 'mt-auto');
    createmainDiv.appendChild(buttonsDiv);

    const buttonModify = document.createElement('button');
    buttonModify.classList.add('h-10', 'px-3', 'rounded-lg', 'border', 'text-[13px]', 'border-slate-300', 'bg-white', 'text-slate-700');
    buttonModify.textContent = "Modifier";
    buttonsDiv.appendChild(buttonModify);

    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('h-10', 'px-3', 'rounded-lg', 'border', 'text-[13px]', 'border-red-300', 'bg-white', 'text-red-600');
    buttonDelete.textContent = "Supprimer";
    buttonsDiv.appendChild(buttonDelete);

    recipesContainer.appendChild(createmainDiv);
}