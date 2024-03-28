let tableEntries = [];
let show = localStorage.getItem('expense');

if (show) {
    let out = JSON.parse(show);
    tableEntries = out;
}

function updateSummary() {
    let totalIncome = tableEntries.reduce((t, e) => {
        if (e.type === 1) t += e.amount;
        return t;
    }, 0);
    let totalExpense = tableEntries.reduce((ex, e) => {
        if (e.type === 0) ex += e.amount;
        return ex;
    }, 0);
    updatedInc.innerText = totalIncome+'₹';
    updatedExp.innerText = totalExpense+'₹';
    updatedBal.innerText = totalIncome - totalExpense+'₹';
}

function addItem() {
    let type = document.getElementById('itemType').value;
    let name = document.getElementById("name");
    let amount = document.getElementById("amount");
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let yr = date.getFullYear();

    if (name.value === "" || Number(amount.value) === 0)
        return alert("Incorrect Input");
    if (Number(amount.value) <= 0)
        return alert(
            "Incorrect amount! can't add negative"
        );
    tableEntries.push({
        type: Number(type),
        name: name.value,
        amount: Number(amount.value),
        Date: `${day}-${month + 1}-${yr}`
});
    localStorage.setItem('expense', JSON.stringify(tableEntries))
    updateTable();
    name.value = "";
    amount.value = '';
}



function loadItems(e, i) {
    let cls;
    let table = document.getElementById("table");
    let row = table.insertRow(i + 1);
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let c3 = row.insertCell(3);
    let c4 = row.insertCell(4);
    let c5 = row.insertCell(5);
    cell0.innerHTML = i + 1;
    cell1.innerHTML = e.name;
    cell2.innerHTML = e.amount+'₹';
    c5.innerHTML = "🗑";
    c5.classList.add("zoom");
    c5.addEventListener("click", () => del(e));
    c4.innerHTML = e.Date
    if (e.type == 0) {
        c5.style.color='red'
        cls = "red";
        c3.innerHTML = "expense";
    } else {
        c5.style.color='green'
        cls = "green";
        c3.innerHTML = "income";
    }
    c3.style.color = cls;
}
function remove() {
    while (table.rows.length > 1) table.deleteRow(-1);
}



function del(e1) {
    remove();
    let show = localStorage.getItem('expense');
    let out = JSON.parse(show)
    tableEntries = out.filter(e => e.name !== e1.name);
    localStorage.setItem('expense', JSON.stringify(tableEntries));
    out = JSON.parse(localStorage.getItem('expense'));
    out.map((e, i) => loadItems(e, i));
    updateSummary();
}

function updateTable() {
    let show = localStorage.getItem('expense');
    let out = JSON.parse(show)
    remove();
    out.map((e, i) => {
        loadItems(e, i);
    });
    updateSummary();
}
updateTable();


