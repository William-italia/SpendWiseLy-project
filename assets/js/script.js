const body = document.body;
const list = document.getElementById('list');
const itemsList = list.getElementsByTagName('li');
const btn = document.querySelector('.btn');
const boxTheme = document.getElementById('box-theme');
const history = document.getElementById('history');
const form = document.getElementById('form');
const text = document.getElementById('item-title');
const amount = document.getElementById('item-amount');
const balance = document.getElementById('balance');
const income = document.getElementById('renda');
const expense = document.getElementById('gasto');
let transactions = getLocalStorage();




function toggleTheme() {

    const savedTheme = localStorage.getItem('theme');

    if(savedTheme === 'dark') {
        body.classList.add('dark');
        body.style.backgroundColor = '#0D0D0D';

    } else {
        body.classList.remove('dark');
        body.style.backgroundColor = '#F2F2F2';

    }

}

function onClickTheme() {

    body.classList.toggle('dark');

    if (body.classList.contains('dark')) {
        boxTheme.innerHTML = ' <i class="fa-solid fa-sun text-[#FFD900]"></i>';
        body.style.backgroundColor = '#0D0D0D';
        localStorage.setItem('theme', 'dark'); 
    } else {
        boxTheme.innerHTML = ' <img src="./assets/imgs/moon-yellow.svg" alt="box theme">';
        body.style.backgroundColor = '#F2F2F2';
        localStorage.setItem('theme', ''); 
    }
}

function validateNumber(input) {
    // Permite apenas um '-' no início e números
    input.value = input.value.replace(/(?!^-)[^0-9]/g, '');
}



function createLi() {
    const li = document.createElement('li');
    li.classList = 'relative flex items-center justify-between  pl-5 pr-4 py-2 text-lg shadow rounded-lg bg-light dark:bg-[#16161D]';

    return li;
}

function createDiv() {
    const div = document.createElement('div');
    div.classList = 'flex flex-row items-center justify-center';

    return div;
}

function createSpan() {
    const span = document.createElement('span');
    span.id = 'amount';
    span.classList = 'mr-4 text-lg';

    return span;
}

function createButton() {
    const button = document.createElement('button');
    button.classList = 'remove-item flex';

    return button;
}

function createIcon() {
    const icon = document.createElement('i');
    icon.classList = 'fa-solid fa-x text-sm text-red-color';

    return icon;
}

function createMark() {
    const mark = document.createElement('div');
    mark.classList = 'absolute w-3 h-[100%] rounded-l-lg top-0 left-0';
    mark.id = 'mark';

    return mark;
}

function generateId() {
    return Math.floor(Math.random() * 100000000)
}

function createObj(title, amount) {
    return {id: crypto.randomUUID(), title: title, amount: amount };
}

function createItem(title, amount, colorMark) {

    const icon = createIcon();
    const li = createLi();
    const div = createDiv();
    const span = createSpan();
    const button = createButton();
    const mark = createMark();

    span.textContent = amount;
    button.appendChild(icon);

    mark.classList.add(colorMark);

    li.textContent = title;

    div.appendChild(span);
    div.appendChild(button);
    li.appendChild(div);

    li.appendChild(mark);

    return li;
}

function checkListLength() {

    if(itemsList.length > 0) {
        history.classList.remove('hidden');
    }

    if(itemsList.length > 3) {
        // list.parentElement.classList.add('h-[270px]');
        list.parentElement.classList.add('h-[150px]');
    }

    if(itemsList.length < 1) {
        history.classList.add('hidden');
    }

}

function formataNum(num) {

    if(parseFloat(num) > 0) {
        return `+ ${num}`;
    } 
    
    if(num.charAt(0) === '-') {
        return `- ${num.slice(1)}`;
    }

}


function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('transactions')) || [];
}

function onAddItemSubmit(e) {

    e.preventDefault();

    if(text.value === '' || amount.value === '') {

        alert('Por favor preencha todos os campos!');

    } else {

        const transaction = createObj(text.value, amount.value);

        transactions.push(transaction);

        const item = createItem(transaction.title, transaction.amount, transaction.id);

        addItemToDOM(item);
        updateLocalStorage();
        checkListLength()
        updateValues();

        text.value = '';
        amount.value = '';

        text.focus();
    }

}

function verifiedAmount(amount) {

    const sign = amount < 0 ? `- ${amount.slice(1)}` : `+ ${amount}`;
    return sign;

}

function createItem(title, amount, id) {

    const icon = createIcon();
    const li = createLi();
    const div = createDiv();
    const span = createSpan();
    const button = createButton();
    const mark = createMark();


    span.textContent = verifiedAmount(amount);
    button.appendChild(icon);

    if(amount.charAt(0) == '-') {
        mark.classList.add('bg-red-color');
    } else {
        mark.classList.add('bg-green-color');
    }

    li.id = id;
    li.textContent = title;

    div.appendChild(span);
    div.appendChild(button);
    li.appendChild(div);

    li.appendChild(mark);

    return li;
}


function addItemToDOM(item) {
    list.prepend(item);
}

function removeItemLocalStorage(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    checkListLength();
    updateValues();

}

function onClickItem(e) {

    if(e.target && e.target.parentElement.classList.contains('remove-item')) {
        const item = e.target.closest('li');

        const id = item.getAttribute('id');
        
        removeItemLocalStorage(id);
        item.remove();

        updateLocalStorage();
        checkListLength();
        updateValues();
    }
}

function displayItems() {
    const itemsFromStorage = getLocalStorage();

    
    itemsFromStorage.forEach((item) => {
        const I = createItem(item.title, item.amount, item.id);
        addItemToDOM(I);
    });

    checkListLength();
    updateValues();
}

function updateValues() {

    let transactions = getLocalStorage();

    const amounts = transactions.map(transaction => Number(transaction.amount));

    if (amounts.length > 0) {
        // Se houver transações, calcula os totais
        const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
        const renda = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
        const gasto = amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0).toFixed(2);

        balance.innerHTML = total;
        income.innerHTML = renda;
        expense.innerHTML = gasto;
        
    } else {
        balance.innerHTML = "0.00";
        income.innerHTML = "0.00";
        expense.innerHTML = "0.00";
    }

}

function init() {
    boxTheme.addEventListener('click', onClickTheme);
    form.addEventListener('submit', onAddItemSubmit);
    list.addEventListener('click', onClickItem);
    document.addEventListener('DOMContentLoaded', displayItems);
    
    toggleTheme();
    checkListLength();
    updateValues();
} 

updateValues();
init();




