import { checkAuth,
    logout,
    createItem,
    deleteAllItems,
    getItems,
    buyItem
} from '../fetch-utils.js';

import { renderItem } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});
