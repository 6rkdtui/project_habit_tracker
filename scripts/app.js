'use strict'

// массив куда будут загружаться данные
let habbits = [];
const HABBIT_KEY = 'HABBIT_KEY';

/* page */ 
const page = {
    menu: document.querySelector('.menu_list'),
    header: {
        h1: document.querySelector('.h1'),
        progressPercent: document.querySelector('.progress_percent'),
        progressCoverBar: document.querySelector('.progress_cover-bar')
    }
}

/* utils */

// функция получения данных от пользователя 
function loadData() {
    const habbitsString = localStorage.getItem(HABBIT_KEY);
    const habbitsArray = JSON.parse(habbitsString);
    if (Array.isArray(habbitsArray)){
        habbits = habbitsArray;
    }
}

// функция сохранения данных
function saveData() {
    localStorage.setItem(HABBIT_KEY, JSON.stringify(habbits));
}

/* render */

// функция рендера бокового меню
function rerenderMenu(activeHabbit) {
    if(!activeHabbit){
        return;
    }
    for (const habbit of habbits) {
        const existed = document.querySelector(`[menu-habbit-id="${habbit.id}"]`);
        if (!existed) {
            const element = document.createElement('button');
            element.setAttribute('menu-habbit-id', habbit.id);
            element.classList.add('menu_item');
            element.addEventListener('click', (() => rerender(habbit.id)));
            element.innerHTML = `<img src="images/${habbit.icon}.svg" alt="${habbit.name}">`;
            if (activeHabbit.id === habbit.id) {
                element.classList.add('menu_item_active');
            }
            page.menu.appendChild(element);
            continue;
        }
        if (activeHabbit.id === habbit.id) {
            existed.classList.add('menu_item_active');
        } else {
            existed.classList.remove('menu_item_active');
        }
    }
}

// функция рендера шапки 
function rerenderHead(activeHabbit) {
    if(!activeHabbit){
        return;
    }
    page.header.h1.innerHTML = activeHabbit.name;
    const progress = activeHabbit.days.length / activeHabbit.target > 1 
        ? 100
        : activeHabbit.days.length / activeHabbit.target * 100;
    page.header.progressPercent.innerText = progress.toFixed(0) + '%';
    page.header.progressCoverBar.setAttribute('style', `width: ${progress}%`)
}

// функция рендера
function rerender(activeHabbitId) {
    const activeHabbit = habbits.find(habbit => habbit.id === activeHabbitId);
    rerenderMenu(activeHabbit);
    rerenderHead(activeHabbit);
}

/* init */
(()=> {
    loadData();
    rerender(habbits[0].id)
})();