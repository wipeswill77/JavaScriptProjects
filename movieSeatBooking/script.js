let seatsCanBeSelected = document.querySelectorAll(".container .seat:not(.occupied) ");
let count = document.getElementById('count');
let total = document.getElementById('total');
const movieSelected = document.getElementById('movie');
const container = document.querySelector('.container');
let ticketPrice = +movieSelected.value;
let ticketCount = 0;
updateBan();

function updateContent() {
    let seatSelected = document.querySelectorAll('.container .seat.selected');
    let list = [...seatSelected].map(seat => [...seatsCanBeSelected].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(list));
    ticketCount = seatSelected.length;
    ticketPrice = +movieSelected.value;

    updateTicketInfor();
    updateBan();
}

function updateTicketInfor() {
    localStorage.setItem('ticketCount', ticketCount.toString());
    localStorage.setItem('ticketPrice', ticketPrice.toString());
}

function updateBan() {
    let selectedseats=JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedseats!=null&&selectedseats.length>0) {
        seatsCanBeSelected.forEach((seat,index) => {
            if (selectedseats.indexOf(index)>-1) {
                seat.classList.add('selected');
            }
        });
    }

    let tc=localStorage.getItem('ticketCount');
    let tp=localStorage.getItem('ticketPrice');
    count.innerText = tc;
    let totalvalue= tc*tp;
    total.innerText = totalvalue.toString();
}

movieSelected.addEventListener('change', (e) => {
    updateContent();
})

container.addEventListener('click', (e) => {
    if (!e.target.classList.contains('occupied') && e.target.classList.contains('seat')) {
        e.target.classList.toggle('selected');
        updateContent();
    }

})

