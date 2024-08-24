document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    let expenses = [];

    // Check for saved expenses in local storage
    if (localStorage.getItem('expenses')) {
        expenses = JSON.parse(localStorage.getItem('expenses'));
        renderExpenses();
    }

    // Function to render expenses
    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(function (expense, index) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${expense.description}</span>
                <span>$${expense.amount}</span>
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    }

    // Function to add 
    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const description = document.getElementById('expense-description').value;
        const amount = parseFloat(document.getElementById('expense-amount').value);

        if (description.trim() === '' || isNaN(amount) || amount <= 0) {
            alert('Please enter a valid description and amount.');
            return;
        }

        const expense = {
            description,
            amount
        };

        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
        expenseForm.reset();
    });

    // Function to delete 
    window.deleteExpense = function (index) {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    };

    // Function to render expenses
function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach(function (expense, index) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.description}</span>
            <span>$${expense.amount}</span>
            <button onclick="editExpense(${index})">Edit</button>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);
    });

    // Update total amount
    let total = 0;
    expenses.forEach(function (expense) {
        total += expense.amount;
    });
    document.getElementById('total-amount').innerText = `$${total.toFixed(2)}`;
}

    // Function to edit expense
    window.editExpense = function (index) {
        const newDescription = prompt('Enter new description:');
        const newAmount = parseFloat(prompt('Enter new amount:'));

        if (newDescription && newAmount && !isNaN(newAmount) && newAmount > 0) {
            expenses[index].description = newDescription;
            expenses[index].amount = newAmount;
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
        } else {
            alert('Invalid input. Please try again.');
        }
    };
});
