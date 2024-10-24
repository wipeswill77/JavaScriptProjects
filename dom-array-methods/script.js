const addUserButton = document.getElementById("add-user");
const main = document.getElementById("main");
const doubleButton = document.getElementById("double");
const showMillionaire = document.getElementById("show-millionaires");
const sortByMoney=document.getElementById("sort");
const calculateAllWealth = document.getElementById("calculate-wealth");
let dataList = [];

addRandomUser();
addRandomUser();
addRandomUser();

async function addRandomUser() {
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();
    const person = data.results[0];
    const newOne = {
        name: `${person.name.first} ${person.name.last}`,
        money: Math.floor(Math.random() * 10000)
    }
    dataList.push(newOne);

    updateDOM();
}

function doubleMoney() {
    dataList = dataList.map(item => {
        return {
            ...item,
            money: item.money * 2
        }
    })
    updateDOM();
}

function showMillionaires() {
    dataList = dataList.map(item => {
        if (item.money >= 1000000) {
            return item;
        }
    })
    updateDOM();
}

function sortbymoney(){
    dataList.sort((a, b) => b.money - a.money);//逻辑上有点反直觉，总之，>0 => b放前面，<0 => a放前面。
    updateDOM();
}

function calculateWealth(){
    let totalWealth = 0;
    dataList.forEach(item => {
        totalWealth += item.money;
    })

    const totalWealthBar=document.createElement('h3');
    totalWealthBar.innerHTML=`Total Wealth: <strong>${formatMoney(totalWealth)}</strong>`;

    main.appendChild(totalWealthBar);

}

addUserButton.addEventListener("click", addRandomUser);
doubleButton.addEventListener("click", doubleMoney);
showMillionaire.addEventListener("click", showMillionaires);
sortByMoney.addEventListener("click", sortbymoney);
calculateAllWealth.addEventListener("click",calculateWealth);

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


function updateDOM() {
    console.log(dataList);
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    dataList.forEach(item => {
        const row = document.createElement("div");
        row.classList.add("person");
        row.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(row);
    })
}