const button = document.getElementById('Ajouter');
const popup = document.getElementById('popupdiv');
const annuler = document.getElementById('Annuler');
const platName = document.getElementById('platName');
const dishPrice = document.getElementById('Price');
const recipesContainer = document.getElementById('recipesContainer');
const Add = document.getElementById('Add');
const popupTitle = popup.querySelector('h3');

const daysContainer = document.querySelector('.menu').children[1];
const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
const categories = ['Entrée', 'Plat principal', 'Dessert'];
const recipes = [];
let editingIndex = -1;

function getColor(category) {
    if (category === 'Entrée') {
        return 'orange';
    }
    if (category === 'Plat principal') {
        return 'blue';
    }
    return 'purple';
}

function getRecipeInSlot(day, category) {
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].day === day && recipes[i].category === category) {
            return recipes[i];
        }
    }
    return null;
}

function createCard(recipe, index) {
    const color = getColor(recipe.category);

    const card = document.createElement('div');
    if (recipe.day === null) {
        card.className = 'flex-1 min-w-[200px] max-w-[280px] flex flex-col gap-2 p-3 h-[180px] rounded-lg border border-slate-300 bg-white text-slate-900';
    } else {
        card.className = 'flex-1 min-w-[200px] max-w-[280px] flex flex-col gap-2 p-3 h-[180px] rounded-lg border border-dashed border-slate-300 bg-slate-100 text-slate-500 opacity-70';
    }

    const title = document.createElement('h4');
    title.className = 'text-[15px] font-semibold';
    title.textContent = recipe.name;
    card.appendChild(title);

    const tags = document.createElement('div');
    tags.className = 'flex flex-wrap gap-1.5';
    card.appendChild(tags);

    const categoryTag = document.createElement('small');
    categoryTag.className = 'rounded-full px-2.5 py-0.5 text-xs font-medium bg-' + color + '-100 text-' + color + '-700';
    categoryTag.textContent = recipe.category;
    tags.appendChild(categoryTag);

    const badgeTag = document.createElement('small');
    badgeTag.className = 'rounded-full px-2.5 py-0.5 text-xs font-medium bg-slate-200 text-slate-700 capitalize';
    badgeTag.textContent = recipe.badge;
    tags.appendChild(badgeTag);

    const price = document.createElement('h4');
    price.className = 'text-sm font-medium';
    price.textContent = recipe.price + ' DH';
    card.appendChild(price);

    if (recipe.day !== null) {
        const status = document.createElement('small');
        status.className = 'text-xs font-bold text-indigo-600';
        status.textContent = 'Assigné : ' + days[recipe.day] + ' / ' + recipe.category;
        card.appendChild(status);
    }

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'flex gap-1.5 mt-auto';
    card.appendChild(buttonsDiv);

    const editButton = document.createElement('button');
    editButton.className = 'btn-edit h-10 px-3 rounded-lg border border-slate-300 bg-white text-[13px] text-slate-700';
    editButton.textContent = 'Modifier';
    editButton.setAttribute('data-index', index);
    buttonsDiv.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn-delete h-10 px-3 rounded-lg border border-red-300 bg-white text-[13px] text-red-600';
    deleteButton.textContent = 'Supprimer';
    deleteButton.setAttribute('data-index', index);
    buttonsDiv.appendChild(deleteButton);

    return card;
}

function showReserve() {
    recipesContainer.innerHTML = '';
    for (let i = 0; i < recipes.length; i++) {
        recipesContainer.appendChild(createCard(recipes[i], i));
    }
}

function createDayCard(day) {
    const card = document.createElement('div');
    card.className = 'flex-1 flex flex-col gap-2 p-3 border border-slate-300 rounded-lg bg-white';

    const title = document.createElement('h4');
    title.className = 'text-sm font-bold';
    title.textContent = days[day];
    card.appendChild(title);

    for (let c = 0; c < categories.length; c++) {
        const category = categories[c];
        const color = getColor(category);

        const box = document.createElement('div');
        box.className = 'flex flex-col gap-1 p-2 rounded-lg bg-' + color + '-50';

        const select = document.createElement('select');
        select.className = 'h-8 w-full border border-slate-700 rounded-md bg-white px-2 text-xs';
        select.id = 'slot-' + day + '-' + c;
        select.setAttribute('data-day', day);
        select.setAttribute('data-category', category);

        const label = document.createElement('label');
        label.className = 'text-[11px] font-bold text-' + color + '-700';
        label.textContent = category.toUpperCase();
        label.setAttribute('for', select.id);

        const firstOption = document.createElement('option');
        firstOption.value = 'reserve';
        firstOption.textContent = 'En réserve';
        select.appendChild(firstOption);

        const current = getRecipeInSlot(day, category);
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            if (recipe.category === category && (recipe.day === null || recipe === current)) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = recipe.name + ' (' + recipe.price + ' DH)';
                select.appendChild(option);
            }
        }

        if (current !== null) {
            select.value = recipes.indexOf(current);
        } else {
            select.value = 'reserve';
        }

        box.appendChild(label);
        box.appendChild(select);
        card.appendChild(box);
    }

    return card;
}

function showMenu() {
    daysContainer.innerHTML = '';
    for (let d = 0; d < days.length; d++) {
        daysContainer.appendChild(createDayCard(d));
    }
}

function showAll() {
    showReserve();
    showMenu();
}


recipesContainer.addEventListener('click', function (e) {
    const clicked = e.target;
    const isEdit = clicked.classList.contains('btn-edit');
    const isDelete = clicked.classList.contains('btn-delete');

    if (isEdit === false && isDelete === false) {
        return;
    }

    const index = Number(clicked.getAttribute('data-index'));
    const recipe = recipes[index];

    if (recipe.day !== null) {
        alert('"' + recipe.name + '" est dans le menu. Choisis d\'abord "En réserve" dans le menu.');
        return;
    }

    if (isEdit) {
        openModal(index);
    } else {
        if (confirm('Supprimer "' + recipe.name + '" ?')) {
            recipes.splice(index, 1);
            showAll();
        }
    }
});

daysContainer.addEventListener('change', function (e) {
    const select = e.target;
    const day = Number(select.getAttribute('data-day'));
    const category = select.getAttribute('data-category');
    const oldRecipe = getRecipeInSlot(day, category);

    if (oldRecipe !== null) {
        oldRecipe.day = null;
    }

    if (select.value !== 'reserve') {
        const newRecipe = recipes[Number(select.value)];
        newRecipe.day = day;
    }

    showAll();
});

function openModal(index) {
    editingIndex = index;
    popup.reset();

    if (index === -1) {
        popupTitle.textContent = 'Ajouter une recette';
        Add.textContent = 'Ajouter';
    } else {
        const recipe = recipes[index];
        platName.value = recipe.name;
        dishPrice.value = recipe.price;
        document.querySelector('input[name="category"][value="' + recipe.category + '"]').checked = true;
        document.querySelector('input[name="quality"][value="' + recipe.badge + '"]').checked = true;
        popupTitle.textContent = 'Modifier la recette';
        Add.textContent = 'Enregistrer';
    }

    popup.classList.remove('hidden');
}

function closeModal() {
    popup.classList.add('hidden');
}

button.addEventListener('click', function () {
    openModal(-1);
});
annuler.addEventListener('click', closeModal);

popup.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = platName.value;
    const price = Number(dishPrice.value);
    const category = document.querySelector('input[name="category"]:checked').value;
    const badge = document.querySelector('input[name="quality"]:checked').value;

    if (editingIndex === -1) {
        recipes.push({ name: name, category: category, price: price, badge: badge, day: null });
    } else {
        recipes[editingIndex].name = name;
        recipes[editingIndex].category = category;
        recipes[editingIndex].price = price;
        recipes[editingIndex].badge = badge;
    }

    showAll();
    closeModal();
});
showAll();