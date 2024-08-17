const display = document.getElementById("display");

function exibirNoDisplay(input) {
    let valorNoDisplay = display.value;
    //Limpa o display se houver "Erro"
    if(valorNoDisplay === "Erro") limpar();
    // Adicionar "0." se o display estiver vazio ou após um operador
    if(input === '.') {
        // Impede adicionar "." após ")" ou após outro "."
        if(/[)]$/.test(valorNoDisplay) || valorNoDisplay.slice(-1) === '.' || /[-+*/%]$/.test(valorNoDisplay)) {
            return; // Não faz nada
        }
        else if(!valorNoDisplay || /[-+*/(]$/.test(valorNoDisplay)) display.value += '0.';
        else if(!/\.\d*$/.test(valorNoDisplay)) display.value += '.';
    } 
    //Adiciona multiplicação antes do "(" se necessário
    else if(input === '(') {
        if(/[\d)]$/.test(valorNoDisplay) ) display.value += '*(';
        else display.value += '(';
    }
    // Fecha parênteses se houver um aberto e o último caractere antes não for operador
    else if(input === ')') {
        const abreParentese = (valorNoDisplay.match(/\(/g) || []).length;
        const fechaParentese = (valorNoDisplay.match(/\)/g) || []).length;
        if(abreParentese > fechaParentese && !/[+\-*/(.]$/.test(valorNoDisplay)) {
            display.value += ')';
        }
    }
    // Permite operadores após um parêntese fechado e impede o uso repetido de operadores
    else if(/[-+*/%]/.test(input)) {
        // Adiciona operador se último caractere for ")" ou um dígito
        if(/[)\d]$/.test(valorNoDisplay)) display.value += input;
        // Substitui operador se último caractere for outro operador
        else if(/[-+*/%]$/.test(valorNoDisplay)) display.value = display.value.slice(0, -1) + input;
    }
    else display.value += input;
};

function limpar() { display.value = ""; }

function calcular() {
    try {
        let result = eval(display.value);
        display.value = formatarNumero(result);
    }
    catch(error) { display.value = "Erro"; }
}

function formatarNumero(num) {
    const [parteIntegral, parteDecimal] = num.toString().split('.');
    return parteDecimal 
        ? parteIntegral.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + parteDecimal 
        : parteIntegral.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function exibirOperador(operador) {
    let valorNoDisplay = display.value;

    if(valorNoDisplay === "Erro") limpar();

    if(/\d$/.test(valorNoDisplay)) display.value += operador;
    else if(/[-+*/]$/.test(valorNoDisplay)) display.value = valorNoDisplay.slice(0, -1) + operador;
}

function negativo() {
    let valorNoDisplay = display.value;

    if(valorNoDisplay === "Erro") limpar();

    const match = valorNoDisplay.match(/(-?\d+\.?\d*)$/);
    if(match) {
        const number = match[0];
        if(number.startsWith('-')) display.value = valorNoDisplay.slice(0, -number.length) + number.slice(1);
        else display.value = valorNoDisplay.slice(0, -number.length) + '-' + number;
    }
}

function exibirPorcentagem() {
    let valorNoDisplay = display.value;

    if(valorNoDisplay === "Erro") limpar();

    const match = valorNoDisplay.match(/(\d+\.?\d*)$/);
    if(match) {
        const number = match[0];
        display.value = valorNoDisplay.slice(0, -number.length) + `(${number}/100)*`;
    }
}

function apagarUltimo() {
    if(display.value === "Erro") limpar();
    else display.value = display.value.slice(0, -1);
}
