'use strict';
let textArea = document.querySelector('textarea');
let addNote = document.querySelector('#add_btn');
let delNote = document.getElementById('del_btn');
let saveNote = document.querySelector('#save_btn');
const upAddNote = document.querySelector('#add_note');
const myNotes = document.querySelector('#my_notes');
let objKeys = Object.keys(localStorage).map((x) => Number(x));

function compareKey(a, b) {
    return a - b;
};
objKeys.sort(compareKey);

if (localStorage.getItem(0)) {
    objKeys.sort(compareKey).shift();
};

let lastElem = objKeys[objKeys.length - 1];

function addkey(len, value) {
    localStorage.setItem(len, value);
};

function saveItem(area, add_btn) {
    if(localStorage.length == 0) {
        add_btn.addEventListener('click', function() {
            localStorage.setItem('1', area.value);
            location.reload();
        });
    } else {
        add_btn.addEventListener('click', function() {
            if (localStorage.getItem(0) == null) {
                localStorage.setItem(lastElem + 1, area.value);
            } else {
                localStorage.setItem(lastElem + 2, area.value);
                localStorage.removeItem(0);
            };
            location.reload();
        });
    };  
};

function ChangeState(ad_link, main_link) {
    let getElem = document.getElementById('new_note');
    let remElem = document.getElementById('all_notes');

    ad_link.addEventListener('click', function() {
        remElem.classList.remove('active');
        getElem.classList.add('active');
    });

    main_link.addEventListener('click', function() {
        getElem.classList.remove('active');
        remElem.classList.add('active');
    });
};

let allNotes = document.createElement("div");
allNotes.className = "all_notes active";
allNotes.id = "all_notes";
allNotes.innerHTML = `<div class='container_main' id='new'></div>`;
document.body.append(allNotes);


let getElem = document.querySelector(".container_main");

function prependChild(parent, newChild) {
    if (parent.firstChild) {
      parent.insertBefore(newChild, parent.firstChild);
    } else {
      parent.appendChild(newChild);
    };
  };

objKeys.forEach((key) => {

    let wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.id = `wrapper${key}`;
    prependChild(getElem, wrapper);

    let title = document.createElement("div");
    title.className = "title";
    let block = document.createElement("div");
    block.className = "block";
    title.append(`Заметка ${key}`);
    block.append(`${localStorage.getItem(key)}`);
    
    let btnWrapper = document.createElement("div");
    btnWrapper.className = "btn_wrap";
    btnWrapper.id = "btn_wrap";

    let changeBtn = document.createElement("button");
    changeBtn.className = "btn";
    changeBtn.id = "chn_btn";
    changeBtn.innerHTML = "Редактировать";
    changeBtn.classList.add(`btn${key}`);

    let delBtn = document.createElement("button");
    delBtn.className = "btn";
    delBtn.id = "del_btn";
    delBtn.innerHTML = "Удалить";
    delBtn.classList.add(`btn${key}`);
    
    let getWrapper = document.getElementById(wrapper.id);
    getWrapper.appendChild(title);
    getWrapper.appendChild(block);
    getWrapper.appendChild(btnWrapper);

    let getbtnWrapper = document.getElementById(btnWrapper.id);
    getbtnWrapper.appendChild(changeBtn);
    getbtnWrapper.appendChild(delBtn);
 
});

function DeleteFunction() {
    localStorage.clear();
    location.reload();
};

if (localStorage.length != 0) {
    let elements = document.querySelectorAll('#del_btn');
    let changeNotes = document.querySelectorAll('#chn_btn');

    elements.forEach((item) => {
        item.addEventListener('click', function() {
            let tempKey = this.classList[1].match(/\d+/);
            if (tempKey == String(lastElem)) {
                localStorage.removeItem(tempKey);
                localStorage.setItem(0, true);
                
            } else {
                localStorage.removeItem(tempKey);
            };
            location.reload();
        });
    });

    changeNotes.forEach((item) => {
        item.addEventListener('click', function() {
            document.querySelector('.all_notes').classList.remove('active');
            document.querySelector('.new_note').classList.add('active');
            addNote.classList.add('disabled');
            saveNote.classList.remove('disabled');
            document.querySelector('.new').innerHTML = 'Редактирование заметки';

            let tempKey = this.classList[1].match(/\d+/);
            document.querySelector('#message').innerHTML = `${localStorage.getItem(tempKey)}`;
            
            saveNote.addEventListener('click', function () {
                let content = document.querySelector('#message');
                localStorage.setItem(tempKey, content.value);
                location.reload();
            });

        });
    });

};

ChangeState(upAddNote, myNotes);
saveItem(textArea, addNote);