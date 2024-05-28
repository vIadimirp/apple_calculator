const out = document.querySelector('span#out');
const buttons = document.querySelector('div#buttons');
const clearButton = document.querySelectorAll('button.btn')[0];
let expression = '0';
let clearLater = false;
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operations = ['+', '-', '×', '÷'];


function clearButtonConfig() {
    if (['0', '0.', '-0', '-0.'].includes(out.textContent)) {
        clearButton.textContent = 'AC';
        clearButton.onclick = function() {expression = '0'; clearLater = false; clearButtonConfig();}
    } else {
        clearButton.textContent = 'C';
        clearButton.onclick = function() {out.textContent = '0'; clearButtonConfig();}
    }
}


out.textContent = '0';
buttons.addEventListener('click', e => {
    if (e.target.id === 'buttons') {return}
    let buttonText = e.target.textContent.toString();
    if (digits.includes(buttonText)) {
        expression = expression === '0' ? buttonText : expression + buttonText;
        out.textContent = out.textContent === '0' ? buttonText : out.textContent === '-0' ? `-${buttonText}` : out.textContent + buttonText;
        if (clearLater) {clearLater = false; out.textContent = buttonText;}
    } else if (operations.includes(buttonText)) {
        if (operations.includes(expression.slice(-1))) {
            expression = expression.slice(0, expression.length - 1) + buttonText;
        } else {
            expression += buttonText;
        }
        clearLater = true;
    } else if (buttonText === '±') {
        expression = !out.textContent.startsWith('-') ? expression.slice(0, expression.length - out.textContent.length) + '-' + out.textContent : expression.slice(0, expression.length - out.textContent.length) + out.textContent.slice(1, out.textContent.length);
        out.textContent = !out.textContent.startsWith('-') ? `-${out.textContent}` : out.textContent.slice(1, out.textContent.length);
    } else if (buttonText === '.' && !out.textContent.includes('.')) {
        expression += buttonText;
        out.textContent = out.textContent === '0' ? '0.' : out.textContent + buttonText;
        if (clearLater) {clearLater = false; out.textContent = '0.';}
    } else if (buttonText === '%') {
        expression = expression.slice(0, expression.length - out.textContent.length) + +out.textContent / 100;
        out.textContent = +out.textContent / 100;
    }
    if (buttonText === '=') {
        out.textContent = eval(expression.replace('×', '*').replace('÷', '/'));
        clearLater = true;
        // expression = '0';
    }
    clearButtonConfig();
});
