const fs = require('fs');
const os = require('os');
const path = require('path');

const dir = localStorage.getItem('dir');


let target = document.querySelector('.directories');
let btn1 =  document.querySelector('.more1');
let btn2 =  document.querySelector('.more');
let covered =  document.querySelector('.covered');
let input = document.querySelector('.under');
let back = document.querySelector('#back');

back.onclick = function(e){
    localStorage.removeItem('dir');
}

function getSubjectRepos(){
    let subjPath = path.join(os.homedir(), 'appunti', dir);
    if(!fs.existsSync(subjPath)){
        fs.mkdir(path.join(os.homedir(), 'appunti',dir), (e)=>{
            if(e){
                throw new Error(e);
            }
        });
        console.log('created directory at ' + subjPath);
    }

    let repos = fs.readdirSync(subjPath, { withFileTypes: true }).filter(dirent => dirent.isDirectory());
    return repos;
}

function renderRepos(repos){
    let width = window.innerWidth;
    back.setAttribute('style', `margin-right: ${width - 150}px;`);
    let subjs = [];
    for(let i = 0; i < target.children.length; i++){
        if(target.children[i].nodeName == 'DIV'){
            subjs.push(target.children[i]);
        }
    }
    if(repos.length != 0){
        if(repos.length !=  subjs.length){
            target.innerHTML = '';
            repos.forEach((repo)=>{
                let fig = document.createElement('div');
                let img = document.createElement('img');
                let caption = document.createElement('p');
                img.src = 'file.png';
                caption.innerText = repo.name;
                fig.appendChild(img);
                fig.appendChild(caption);
                target.appendChild(fig);
            });
        }
    }else{
        target.innerHTML = '';
        let p = document.createElement('p');
        p.innerText = "You don't have any notes yet! Add some.";
        target.appendChild(p);
    }
}

btn1.onclick = function(e){
    console.log('click');
    if(covered.style.display == 'block'){
        covered.style.display = 'none'; 
    }else{
        covered.style.display = 'block';
    }
    btn1.style.margnTop = '1rem';
}

btn2.onclick = function(e){
    let repoName = input.value.trim();
    if(repoName != '' && repoName != ' '){
        fs.mkdir(path.join(os.homedir(), 'appunti', dir, repoName), (e)=>{
            if(e){
                throw new Error(e);
            }
        });
    }
    input.value = '';
    covered.style.display = 'none';
}



renderRepos(getSubjectRepos());
setInterval(function() {renderRepos(getSubjectRepos());}, 200);