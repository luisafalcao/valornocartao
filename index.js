const dollar = document.querySelector('#original-price')
const form = document.querySelector('#form')
const finalValue = document.querySelector('#final-value')
const details = document.querySelector('#details')
const title = document.querySelector('.title')

form.addEventListener("submit", event => {
    event.preventDefault();
    
    fetch("https://v6.exchangerate-api.com/v6/04600a74c0c3ef3c39eb89c3/latest/USD")
        .then(response => response.json())
        .then(data => {
            const taxaDoDia = data.conversion_rates.BRL
            const valorEmReal = dollar.value * taxaDoDia
            const valorIof = 0.06 * valorEmReal
            
            finalValue.style.display = 'block';
            title.style.display = 'block';
            finalValue.textContent = `R$ ${(valorEmReal + valorIof).toFixed(2)}`
            details.textContent = `(Compra: R$ ${valorEmReal.toFixed(2)} | IOF: R$ ${valorIof.toFixed(2)})`
        })
        .catch(error => {
            console.error(error)
        })
})