const buttons = document.getElementById('buttons').children;
const display = document.getElementById('display');
const currentOperation = document.getElementById('show-operation');

for(let button of buttons){
    button.addEventListener('click', displayValue);
}

let operation = '';

function displayValue(){

    if(+this.value || this.value==='.'){
        console.log(+this.value);
        addNumber(this.value);
    }else{
        console.log(this.value);
    }
}

function addNumber(num){
    if(num==='.' && display.textContent.includes('.')) return;

    if(display.textContent==='0' && num!=='0'){
        display.textContent = num;
    }else{
        display.textContent += num;
    }
}
