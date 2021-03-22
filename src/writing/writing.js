let pages = document.querySelectorAll('textarea');
let firstPage = pages[0];
function initTextAreas(){
    pages = document.querySelectorAll('textarea');
    let height = window.innerHeight;
    let width = window.innerWidth;
    pages.forEach((pag)=>{
        pag.setAttribute("style", `width: ${(width/2) - 50}px; height: ${height - 30}px;`);
        pag.onkeydown = paginationEffect;

    });
}

function initTextAreaValue(value){
    firstPage.value = value;
}




function paginationEffect(event){
    let ourPages = document.querySelectorAll('textarea');
    let currentPag = 0;
    for(let pag in ourPages){
        if(ourPages[pag] == this) currentPag = pag;
    }
    let key = event.keyCode || event.charCode;

    //handling overflow
    if(this.clientHeight < this.scrollHeight){
        if(key != 8 && key != 46){
            if(ourPages[parseInt(currentPag) +1] == undefined){
                console.log(currentPag, currentPag +1);
                let newPage = document.createElement('textarea');
                newPage.setAttribute("style", `width: ${this.clientWidth}px; height: ${this.clientHeight}px;`);
                newPage.classList.add('page');
                document.body.appendChild(newPage);
                newPage.focus();
            }else{
                ourPages[parseInt(currentPag) + 1 ].focus();
            }
        }
    }
    //handling backspace from appended textarea
    if((key == 8 || key == 46) && this.value == ''){
        if(parseInt(currentPag) != 0){
            ourPages[parseInt(currentPag)].remove();
            ourPages[parseInt(currentPag)-1].focus();
        }
    }
}

initTextAreas();
initTextAreaValue('there must be more to life than stereotypes!');
setInterval(function() { initTextAreas(); }, 200);