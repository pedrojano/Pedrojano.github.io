const form = document.getElementById('form');
const valorInput = document.getElementById('valor'); 
const moedaOrigemSelect = document.querySelector('[name="coins-origin"]');
const moedaDestinoSelect = document.querySelector('[name="coins-exit"]'); 
const resultadoDiv = document.querySelector('.result');
let taxasCambio = {};
let ultimaAtualizacao = '';

async function buscarTaxasCambio(moedaBase) {
    try {
        resultadoDiv.textContent = 'Buscando cotações...';
        const resposta = await fetch(`https://api.frankfurter.app/latest?from=${moedaBase}`); 

        if (!resposta.ok) {
            throw new Error('Erro ao buscar taxas de câmbio');
        }

        const dados = await resposta.json(); 
        taxasCambio = dados.rates;
        ultimaAtualizacao = new Date(dados.date).toLocaleDateString('pt-BR');

        return true;
    } catch (erro) { 
        console.error('Erro na requisição:', erro);
        resultadoDiv.textContent = 'Erro ao buscar cotações. Tente novamente mais tarde.';
        return false;
    }
}

function converterMoeda(valor, moedaOrigem, moedaDestino) {
    if (moedaOrigem === moedaDestino) {
        return valor;
    }
    if (!taxasCambio[moedaDestino]) {
        throw new Error(`Taxa para ${moedaDestino} não disponível`); 
    }
    return valor * taxasCambio[moedaDestino];
}

function formatarMoeda(valor, codigoMoeda) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: codigoMoeda,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor);
}

function mostrarResultado(valor, moedaOrigem, moedaDestino, valorConvertido) {
    const valorFormatado = formatarMoeda(valor, moedaOrigem);
    const valorConvertidoFormatado = formatarMoeda(valorConvertido, moedaDestino);
    const taxa = moedaOrigem === moedaDestino ? 1 : taxasCambio[moedaDestino];
    
    resultadoDiv.innerHTML = `
        <div class="resultado-conversao">
            ${valorFormatado} = <strong>${valorConvertidoFormatado}</strong>
        </div>
        <div class="taxa-cambio">
            1 ${moedaOrigem} = ${taxa.toFixed(6)} ${moedaDestino}
        </div>
        <div class="atualizacao">
            Cotação atualizada em: ${ultimaAtualizacao}
        </div>
    `;
}

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const valor = parseFloat(valorInput.value);
    const moedaOrigem = moedaOrigemSelect.value;
    const moedaDestino = moedaDestinoSelect.value;

    if (isNaN(valor) || valor <= 0) {
        resultadoDiv.textContent = 'Por favor, insira um valor válido maior que zero';
        return;
    }

    if (Object.keys(taxasCambio).length === 0 || moedaOrigemSelect.value !== 'BRL') {
        const sucesso = await buscarTaxasCambio(moedaOrigem);
        if (!sucesso) return;
    }
    
    try {
        const valorConvertido = converterMoeda(valor, moedaOrigem, moedaDestino);
        mostrarResultado(valor, moedaOrigem, moedaDestino, valorConvertido);
    } catch (erro) {
        resultadoDiv.textContent = erro.message;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    buscarTaxasCambio('BRL');
});