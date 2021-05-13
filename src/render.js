const fs = require('fs');
const os = require('os');
const path = require('path');


let target = document.querySelector('.directories');
let btn1 =  document.querySelector('.more1');
let btn2 =  document.querySelector('.more');
let covered =  document.querySelector('.covered');
let input = document.querySelector('.under');


function getSubjectRepos(){
    let subjPath = path.join(os.homedir(), 'appunti');
    if(!fs.existsSync(subjPath)){
        fs.mkdir(path.join(os.homedir(), 'appunti'), (e)=>{
            if(e){
                throw new Error(e);
            }
        });
        console.log('created');
    }

    let repos = fs.readdirSync(subjPath, { withFileTypes: true }).filter(dirent => dirent.isDirectory());
    return repos;
}

function renderRepos(repos){
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
                img.src = 'folder.svg';
                caption.innerText = repo.name;
                fig.appendChild(img);
                fig.appendChild(caption);
                fig.onclick = function(e){
                    localStorage.setItem('dir', repo.name);
                    window.location.replace(`${path.join(__dirname, 'subject', 'subject.html')}`);
                }
                target.appendChild(fig);
            });
        }
    }else{
        target.innerHTML = '';
        let p = document.createElement('p');
        p.innerText = "You don't have any subjects yet! Add some.";
        target.appendChild(p);
    }
}

btn1.onclick = function(e){
    console.log('click');
    if(covered.style.display == 'block'){
        covered.style.display = 'none'; 
        btn1.innerHTML = '+';
    }else{
        covered.style.display = 'block';
        btn1.innerHTML = '-';
    }
    btn1.style.margnTop = '1rem';
}

btn2.onclick = function(e){
    let repoName = input.value.trim();
    if(repoName != '' && repoName != ' '){
        fs.mkdir(path.join(os.homedir(), 'appunti', repoName), (e)=>{
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