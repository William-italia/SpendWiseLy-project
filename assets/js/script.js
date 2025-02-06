const body = document.body;
const list = document.getElementById('list');
const itemsList = list.getElementsByTagName('li');
const btn = document.querySelector('.btn');
const boxTheme = document.getElementById('box-theme');
const history = document.getElementById('history');
const form = document.getElementById('form');
const itemTitle = document.getElementById('item-title');
const itemAmount = document.getElementById('item-amount');


function modeTheme() {

    body.classList.toggle('dark');

    if(body.classList.contains('dark')) {
        boxTheme.innerHTML = ' <i class="fa-solid fa-sun text-[#FFD900]"></i>';
        body.style.backgroundColor = '#0D0D0D';
    } else {
        boxTheme.innerHTML = ' <img src="./assets/imgs/moon-yellow.svg" alt="box theme">';
        body.style.backgroundColor = '#F2F2F2';
    }

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

    if(itemsList.length > 4) {
        // list.parentElement.classList.add('h-[270px]');
        list.parentElement.classList.add('h-[200px]');
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

function onAddItemSubmit(e) {
    e.preventDefault();


    const itemT = itemTitle.value;
    const itemA = itemAmount.value;


    if (itemT !== '' && itemA !== '') {
        
        if(itemA.charAt(0) === '-') {
            const amount = formataNum(itemA);
            const item = createItem(itemT, amount, 'bg-red-color');
            list.prepend(item);
        }

        if(itemA.charAt(0) > 0) {
            const amount = formataNum(itemA);
            const item = createItem(itemT, amount, 'bg-green-color');
            list.prepend(item);
        }

        itemTitle.value = '';
        itemAmount.value = '';

        itemTitle.focus();
    }
    
    checkListLength();
}

function init() {

    boxTheme.addEventListener('click', modeTheme);
    form.addEventListener('submit', onAddItemSubmit);
    checkListLength();
}


init();






