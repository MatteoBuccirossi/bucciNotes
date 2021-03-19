let mainB = document.getElementById('mainB');
let target = document.querySelector('#fib');
console.log(mainB);

let current = 1;
let prev = 0;
mainB.onclick = clickHandler;

function clickHandler(e){
    let p = document.createElement('p');
    p.className = 'num';
    let next = current + prev;
    p.innerText = next;
    target.appendChild(p);
    current = next;
    prev = current;
}