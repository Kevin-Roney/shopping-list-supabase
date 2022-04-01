import { 
    checkAuth,
    logout,
    createItem,
    deleteAllItems,
    getItems,
    buyItem
} from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';

checkAuth();

const itemEl = document.querySelector('.items');
const itemForm = document.querySelector('.item-form');
const deleteButton = document.querySelector('.delete-button');
const logoutButton = document.getElementById('logout');
const loadingEl = document.querySelector('.loading-spinner');

function toggleLoadingSpinner() {
    loadingEl.classList.toggle('invisible');
}

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async () => {
    await fetchAndDisplayList();
});

deleteButton.addEventListener('click', async () => {
    await deleteAllItems();
    fetchAndDisplayList();
});

itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(itemForm);
    const item = data.get('item');
    const quantity = data.get('quantity');
    await createItem(item, quantity);
    itemForm.reset();
    await fetchAndDisplayList();
});

async function fetchAndDisplayList() {
    toggleLoadingSpinner();
    const items = await getItems();
    itemEl.textContent = '';
    for (let item of items) {
        const itemObj = renderItem(item);
        itemObj.addEventListener('click', async () => {
            await buyItem(item.id);
            fetchAndDisplayList();
        });
        itemEl.append(itemObj);
    }
    toggleLoadingSpinner();
}