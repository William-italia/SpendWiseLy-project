const list = document.getElementById('list');
const itemsList = list.getElementsByTagName('li');
const btn = document.querySelector('.btn');
const body = document.body;
const boxTheme = document.getElementById('box-theme');
const history = document.getElementById('history');

function modeTheme() {

    body.classList.toggle('dark');

    if(body.classList.contains('dark')) {
        boxTheme.innerHTML = ' <i class="fa-solid fa-sun text-[#FFD900]"></i>';
    } else {
        boxTheme.innerHTML = ' <img src="./assets/imgs/moon-yellow.svg" alt="box theme">';
    }

}

function checkListLength() {
    let classe = 'h-[270px] bg-zinc-200 p-4';

    if(itemsList.length > 0) {
        history.classList.remove('hidden');
    }

    if(itemsList.length > 4) {
        // list.parentElement.classList.add('h-[270px]');
        list.parentElement.classList.add('h-[200px]');
    }

}



boxTheme.addEventListener('click', modeTheme);
checkListLength();