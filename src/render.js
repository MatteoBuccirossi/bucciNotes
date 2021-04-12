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
    if(repos.length != 0){
        if(repos.length !=  target.children.length){
            target.innerHTML = '';
            repos.forEach((repo)=>{
                let fig = document.createElement('div');
                let img = document.createElement('img');
                let caption = document.createElement('p');
                img.src = 'repo2.png';
                caption.innerText = repo.name;
                fig.appendChild(img);
                fig.appendChild(caption);
        
                target.appendChild(fig);
            });
        }
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