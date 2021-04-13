const fs = require('fs');
const os = require('os');
const path = require('path');
const dir = localStorage.getItem('dir');
let file = localStorage.getItem('file');

let pages = document.querySelectorAll('textarea');
let title = document.querySelector('input');
let back = document.querySelector('#back');
let save = document.querySelector('#save');

console.log(title);
let docTitle = file.split('.')[0] || '';
let docValue = fs.readFileSync(path.join(os.homedir(), 'appunti', dir, file), 'utf8') || '';

save.onclick = function(e){
    let file = localStorage.getItem('file');
    let subjoPath = path.join(os.homedir(), 'appunti', dir, file);
    fs.writeFileSync(subjoPath, docValue);
}


let firstPage = pages[0];
title.value = docTitle;

const delay = ms => new Promise(res => setTimeout(res, ms));

title.onkeydown = updateTitle;

back.onclick = function(e){
    localStorage.removeItem('file');
}


function initTextAreas(){
    pages = document.querySelectorAll('textarea');
    let width = window.innerWidth;
    pages.forEach((pag)=>{
        let prevHeight = pag.offsetHeight;
        pag.style.width = `${(width/2) - 50}px`;
        pag.onkeydown = paginationEffect;

    });
    back.setAttribute('style', `margin-right: ${width - 150}px;`);
    save.setAttribute('style', `margin-right: ${width - 250}px;`);

}

function initTextAreaValue(value){
    let height = window.innerHeight;
    firstPage.value = value;
    firstPage.style.height = `${height + 10}px`;
}





async function paginationEffect(event){
    if(this.clientHeight < this.scrollHeight){
        let prevHeight = this.clientHeight;
        this.style.height = `${prevHeight + 40}px`;        
    }
    await delay(200);
    docValue =  this.value;
}

async function updateTitle(e){
    await delay(200);
    file = localStorage.getItem('file');
    let filePath = path.join(os.homedir(), 'appunti', dir, file);
    docTitle =  this.value;
    let res = await fs.renameSync(filePath,path.join(os.homedir(), 'appunti', dir, docTitle + '.txt'));
    localStorage.setItem('file', docTitle + '.txt');
}

initTextAreas();
initTextAreaValue(docValue);
setInterval(function() { initTextAreas(); }, 200);