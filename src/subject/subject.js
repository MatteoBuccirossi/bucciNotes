const fs = require('fs');
const os = require('os');
const path = require('path');
const { Document, Packer, Paragraph, TextRun } =  require("docx");
const dir = localStorage.getItem('dir');


let target = document.querySelector('.directories');
let btn1 =  document.querySelector('.more1');
let btn2 =  document.querySelector('.more');
let covered =  document.querySelector('.covered');
let input = document.querySelector('.under');
let back = document.querySelector('#back');
let subject = document.querySelector('#subject');

back.onclick = function(e){
    localStorage.removeItem('dir');
}

subject.innerText = dir;

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

    let repos = fs.readdirSync(subjPath, { withFileTypes: true }).filter(dirent => !dirent.isDirectory());
    return repos;
}

function renderRepos(repos){
    let width = window.innerWidth;
    back.setAttribute('style', `margin-right: ${width - 150}px;`);
    subject.setAttribute('style', `margin-right: ${width - 260}px;`);
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
                let actualname = repo.name.split('.')[0];
                let fig = document.createElement('div');
                let img = document.createElement('img');
                let caption = document.createElement('p');
                img.src = 'file.png';
                caption.innerText = actualname;
                fig.appendChild(img);
                fig.appendChild(caption);
                fig.onclick = function(e){
                    localStorage.setItem('file', repo.name);
                    window.location.replace(`../../src/writing/writing.html`);
                }
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
    if(covered.style.display == 'block'){
        covered.style.display = 'none'; 
    }else{
        covered.style.display = 'block';
    }
    btn1.style.margnTop = '1rem';
}



btn2.onclick = async function(e){
    let repoName = input.value.trim();
    if(repoName != '' && repoName != ' '){
        await saveDocument(repoName, '');
    }
    input.value = '';
    covered.style.display = 'none';
}

async function saveDocument(title, text){
    let subjPath = path.join(os.homedir(), 'appunti', dir, `${title}.txt`);
    fs.writeFileSync(subjPath, text);
}



renderRepos(getSubjectRepos());
setInterval(function() {renderRepos(getSubjectRepos());}, 200);