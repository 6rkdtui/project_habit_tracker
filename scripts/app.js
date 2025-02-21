'use strict'

// массив куда будут загружаться данные
let habbits = [];
const HABBIT_KEY = 'HABBIT_KEY';

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