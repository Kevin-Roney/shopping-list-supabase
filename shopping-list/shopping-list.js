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

logoutButton.addEventListener('click', () => {
    logout();
});
