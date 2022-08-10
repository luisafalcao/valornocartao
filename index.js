const dollar = document.querySelector('#original-price')
const form = document.querySelector('#form')
const finalValue = document.querySelector('#final-value')
const details = document.querySelector('#details')
const title = document.querySelector('.title')
const select = document.querySelector('#banks')
const infoIcon = document.querySelector('#info-icon')
const info = document.querySelector('#info')

const getValue = event => {
    event.preventDefault();
    
    fetch("https://v6.exchangerate-api.com/v6/04600a74c0c3ef3c39eb89c3/latest/USD")
        .then(response => response.json())
        .then(data => {
            let spread;
            switch (select.value) {
                case 'inter':
                    spread = 0.01
                    break;
                case 'nubank':
                case 'xp':
                case 'btg':
                case 'c6':
                case 'original':
                case 'bb':
                    spread = 0.04
                    break;
                case 'next':
                case 'pagbank':
                    spread = 0.05
                    break;
                case 'itau':
                case 'bradesco':
                case 'amex':
                    spread = 0.055
                    break;
                case 'santander':
                    spread = 0.06
                    break; 
            }

            const ptax = data.conversion_rates.BRL + (data.conversion_rates.BRL * spread)
            const real = dollar.value * ptax
            const iofFee = 0.0638 * real

            finalValue.style.display = 'block';
            title.style.display = 'block';
            finalValue.textContent = `R$ ${(real + iofFee + spread).toFixed(2)}`
            details.textContent = `(Compra: R$ ${real.toFixed(2)} | IOF: R$ ${iofFee.toFixed(2)})`
        })
        .catch(error => {
            console.error(error)
        })
}

form.addEventListener("submit", getValue);

infoIcon.addEventListener("click", () => {
    info.classList.toggle('show')
    console.log(info)
})