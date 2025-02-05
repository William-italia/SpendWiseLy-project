const list = document.getElementById('list');
const itemsList = list.getElementsByTagName('li');
const btn = document.querySelector('.btn');
const body = document.body;
const boxTheme = document.getElementById('box-theme');


function modeTheme() {
    body.classList.toggle('dark');
}

function checkListLength() {
    let classe = 'h-[270px] bg-zinc-200 p-4';

    if(itemsList.length > 5) {
        // list.parentElement.classList.add('h-[270px]');
        list.parentElement.classList.add('h-[320px]');
    }

}



boxTheme.addEventListener('click', modeTheme);
checkListLength();