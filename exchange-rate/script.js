let currency_1 = document.getElementById('moneyType-1');
let currency_2 = document.getElementById('moneyType-2');
let input_1 = document.getElementById('input_1');
let input_2 = document.getElementById('input_2');
let button_swap = document.getElementById('button_swap');
let rateShow = document.getElementById('rateShow');

function calculate() {
    let currency_one = currency_1.value;
    let currency_two = currency_2.value;
    fetch("https://open.exchangerate-api.com/v6/latest")
        .then(res => res.json())
        .then(result => {
            let one = result.rates[currency_one];
            let two = result.rates[currency_two];
            let rate = two / one;
            rateShow.innerText = `1${currency_one}=${rate} ${currency_two}`;

            input_2.value = (input_1.value * rate).toFixed(2);
        })
}


currency_2.addEventListener('change', calculate);
currency_1.addEventListener('change', calculate);
input_1.addEventListener('input', calculate);

button_swap.addEventListener('click', () => {
    let currency_temp = currency_1.value;
    currency_1.value = currency_2.value;
    currency_2.value = currency_temp;
    calculate();
});

calculate();