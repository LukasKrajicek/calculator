// Proměnné
let display = document.getElementById('display');
let history = document.getElementById('history');
let currentInput = '';
let operator = '';
let previousInput = '';

// Přidávání čísel
function appendNumber(number) {
    currentInput += number;
    display.value = currentInput;
}

// Zpracování operátorů
function operate(op) {
    if (currentInput === '') return;
    if (previousInput !== '') calculate();
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateHistory(`${previousInput} ${operator}`);
}

// Výpočet výsledku
function calculate() {
    if (!currentInput || !previousInput || !operator) return;
    let result;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 !== 0 ? num1 / num2 : 'Error';
            break;
    }

    updateHistory(`${previousInput} ${operator} ${currentInput} = ${result}`);
    display.value = result;
    currentInput = result.toString();
    previousInput = '';
    operator = '';
}

// Vymazání displeje
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.value = '';
}

// Aktualizace historie
function updateHistory(text) {
    const entry = document.createElement('div');
    entry.textContent = text;
    history.appendChild(entry);
    history.scrollTop = history.scrollHeight;
}

// Obsluha klikání myší
document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculate();
        } else if (['+', '-', '*', '/'].includes(value)) {
            operate(value);
        } else {
            appendNumber(value);
        }
    });
});

// Podpora klávesnice pro vstup
document.addEventListener('keydown', (e) => {
    const key = e.key;

    // Písmena a čísla
    if (!isNaN(key) || key === '.') appendNumber(key);

    // Operátory
    if (['+', '-', '*', '/'].includes(key)) operate(key);

    // Výpočet
    if (key === '=' || key === 'Enter') calculate();

    // Vymazání
    if (key === 'C' || key === 'c' || key === 'Escape') clearDisplay();
});

// Tlačítko pro vymazání historie
document.getElementById('clear-history').addEventListener('click', () => {
    history.innerHTML = '';
});

// Přepínání mezi světlým a tmavým režimem
const themeSwitch = document.getElementById('themeSwitch');
themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});
