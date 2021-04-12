let pages = document.querySelectorAll('textarea');
let title = document.querySelector('input');
console.log(title);
let docTitle = 'nuts';
let docValue = '';
let firstPage = pages[0];
title.value = docTitle;

const delay = ms => new Promise(res => setTimeout(res, ms));

title.onkeydown = updateTitle;


function initTextAreas(){
    pages = document.querySelectorAll('textarea');
    let width = window.innerWidth;
    pages.forEach((pag)=>{
        let prevHeight = pag.offsetHeight;
        pag.style.width = `${(width/2) - 50}px`;
        pag.onkeydown = paginationEffect;

    });
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
    console.log(docValue);
}

async function updateTitle(e){
    await delay(200);
    docTitle =  this.value;
    console.log(docTitle);
}

initTextAreas();
initTextAreaValue(docValue);
setInterval(function() { initTextAreas(); }, 200);