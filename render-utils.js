export function renderItem(item) {
    const itemEl = document.createElement('div');
    const itemObj = document.createElement('p');
    const quantObj = document.createElement('p');
    if (item.is_bought) {
        itemEl.classList.add('is_bought');
    } else {
        itemEl.classList.add('isnt_bought');
    }
    itemEl.classList.add('item');
    itemObj.textContent = item.item;
    quantObj.textContent = item.quantity;
    itemEl.append(itemObj, quantObj);
    return itemEl;
}