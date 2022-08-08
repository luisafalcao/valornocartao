const dollar = document.querySelector('#original-price')
const form = document.querySelector('#form')
const finalValue = document.querySelector('#final-value')

form.addEventListener("submit", event => {
    event.preventDefault();
    
    fetch("https://v6.exchangerate-api.com/v6/04600a74c0c3ef3c39eb89c3/latest/USD")
        .then(response => response.json())
        .then(data => {
            const taxaDoDia = data.conversion_rates.BRL
            const valorEmReal = dollar.value * taxaDoDia
            const valorIof = 0.06 * valorEmReal
   
            finalValue.textContent = `R$ ${(valorEmReal + valorIof).toFixed(2)}`
        })
        .catch(error => {
            console.error(error)
        })
})