const buttons = document.getElementById('buttons').children;
const display = document.getElementById('display');
const currentOperation = document.getElementById('show-operation');

for(let button of buttons){
    button.addEventListener('click', displayValue);
}

let num1;
let num2;
let indicator = 1;

// ---------- display values ---------- //

function displayValue(){
    if(!display.textContent){
        display.textContent = '0';
        currentOperation.textContent = '';
        display.style.cssText = 'background-image: none';
        currentOperation.style.justifyContent = 'right';
    }

    if(display.textContent.length>10 && /\d/.test(+this.value) && indicator>0) return;

    if(!isNaN(+this.value) || this.value==='.'){
        addNumber(this.value);
    }else if(this.value === 'ac'){
        clear();
    }else if(this.value === 'del'){
        if(currentOperation.textContent.includes('=')){
            clear();
        }else if(display.textContent.split('').length===1 || indicator<0){
            display.textContent = '0';
        }else{
            let splitted = display.textContent.split('');
            splitted.pop();
            display.textContent = splitted.join('');
        }

        
    }else{
        doOperation(this.value);
    }
}

function addNumber(num){
    if(num==='.' && display.textContent.includes('.')) return;
    if(currentOperation.textContent.includes('=')) clear();

    if(display.textContent==='0' && num!==0 && num!=='.' || indicator<0){
        display.textContent = num;
        indicator = 1;
    }else{
        display.textContent += num;
    }
}

// ---------- do selected operation ---------- //

function doOperation(operation){

    if((!currentOperation.textContent && operation!=='=') || (currentOperation.textContent.includes('=') && operation!=='=')){
        num1 = display.textContent;
        num2 = 0;
        
        currentOperation.textContent = `${num1} ${operation}`;
        indicator = -1;

    }else if((currentOperation.textContent && operation==='=' && !currentOperation.textContent.includes('=')) && indicator>0){
        num1 = currentOperation.textContent.split(' ').shift();
        num2 = display.textContent;
        let op = currentOperation.textContent.split('').pop();

        currentOperation.textContent = `${num1} ${op} ${num2} =`
        let result = op==='+' ? `${+num1 + +num2}` :
                        op==='-' ? `${num1-num2}` :
                        op==='*' ? `${num1*num2}` :
                        op==='/' ? `${num1/num2}` :
                        op==='%' ? `${(num1/100)*num2}` :
                        'ERROR!';

        if(result==='Infinity' || result==='ERROR' || isNaN(result)){
            clear();
            display.textContent = '';
            currentOperation.textContent = 'BOOM!'
            display.style.cssText = 'background-image: url(./img/boom.png); background-repeat: no-repeat; background-position: center; background-size: 94px;';
            currentOperation.style.justifyContent = 'center';

        }else{
            let shortResult = result.split('').slice(0,12);

            display.textContent = shortResult.join('');
            indicator = -1;
        }
        
        
    }else if(!currentOperation.textContent.includes('=') && operation!=='=' && indicator>0){
        let op = currentOperation.textContent.split('').pop();
        num1 = currentOperation.textContent.split(' ').shift();
        num2 = display.textContent;

        let result = op==='+' ? `${+num1 + +num2}` :
                        op==='-' ? `${num1-num2}` :
                        op==='*' ? `${num1*num2}` :
                        op==='/' ? `${num1/num2}` :
                        op==='%' ? `${(num1/100)*num2}` :
                        'ERROR!';
        
        if(result==='Infinity' || result==='ERROR' || isNaN(result)){
            clear();
            display.textContent = '';
            currentOperation.textContent = 'BOOM!'
            display.style.cssText = 'background-image: url(./img/boom.png); background-repeat: no-repeat; background-position: center; background-size: 94px;';
            currentOperation.style.justifyContent = 'center';

        }else{
            let shortResult = result.split('').slice(0,12).join('');

            currentOperation.textContent = `${shortResult} ${operation}`;
            indicator = -1;
        }
    }


}

// ---------- Clear ---------- //

function clear(){
    currentOperation.textContent = '';
    display.textContent = '0';
    num1 = '';
    num2 = '';
}

// ---------- keyboard support ---------- //

window.addEventListener('keydown', (event) => {
    event.preventDefault();

    switch (event.key){
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '.':
        case 'Enter':
        case '/':
        case '*':
        case '-':
        case '+':
        case '%':
        case 'Delete':
        case 'Backspace':
            displayKeyValue(event.key);
            break;
        default: return;
    }
});

function displayKeyValue(val){
    if(!display.textContent){
        display.textContent = '0';
        currentOperation.textContent = '';
        display.style.cssText = 'background-image: none';
        currentOperation.style.justifyContent = 'right';
    }

    if(display.textContent.length>10 && /\d/.test(+val) && indicator>0) return;

    if(/\d/.test(+val) || val==='.'){
        addNumber(val);
  }else if(val === 'Delete'){
        clear();
    }else if(val === 'Backspace'){
        if(currentOperation.textContent.includes('=')){
            clear();
        }else if(display.textContent.split('').length===1 || indicator<0){
            display.textContent = '0';
        }else{
            let splitted = display.textContent.split('');
            splitted.pop();
            display.textContent = splitted.join('');
        }
    }else{
        if(val==='Enter') val='=';
        doOperation(val);
    }

}

