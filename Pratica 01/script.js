const Modal = {
    open(){
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    },
    close(){
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}

const Transactions = {
    all: [
        {
            description: 'Luz',
            amount: -50000,
            date: '23/01/2021'
        }, 
        {
            description: 'Website',
            amount: 500000,
            date: '23/01/2021'
        },
        {
            description: 'Internet',
            amount: -20000,
            date: '23/01/2021'
        },
        {
            description: 'App',
            amount: 200000,
            date: '23/01/2021'
        },
    ],
    add(transactions) 
    {
        Transactions.all.push(transactions)

        App.reload()
    },

    remove(index) {
        Transactions.all.splice(index, 1)

        App.reload()
    },

    incomes() {
        let income = 0;
        //pegar todas as transacoes
        //para cada transacao,
        Transactions.all.forEach((transaction) => {
            //se ela for maior que zero
            if( transaction.amount > 0) {
                //somar a uma variavel e retornar a variavel
                income +=transaction.amount;
            }
        })
        return income;
    },

    expenses() {
        let expense = 0;
        //pegar todas as transacoes
        //para cada transacao,
        Transactions.all.forEach((transaction) => {
            //se ela for menor que zero
            if( transaction.amount < 0) {
            //somar a uma variavel e retornar a variavel
                expense +=transaction.amount;
            }
        })
        return expense;
    },

    total() {
        return Transactions.incomes() + Transactions.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)

    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="assets/minus.svg" alt="Remover Transação">
            </td>
        `

        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transactions.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transactions.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transactions.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML=""
    }
}

const Utils = {
    formatAmount(){
        value = Number(value) * 100
        
        return value
    },

    formatDate(date){
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

    return signal + value
    
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return{
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields() {
        const { description, amount, date } = Form.getValues()
        
        if( description.trim() === "" ||
            amount.trim() === "" ||
            date.trim() === "") {
                throw new error("Por favor, preencha todos os campos")
            }

},

    formatValues() {
        let { description, amount, date} = Form.getValues()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }
    },

    saveTransaction() {
        Transactions.add(transaction)
    },

    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },
    
    submit(event) {
        event.preventDefault()

        try {
            Form.validateField()
            // formatar os dados para salvar
            const transaction = Form.formatData()
            // salvar 
            Form.saveTransaction()
            // apagar os dados do formulario
            Form.clearFields()
            // modal feche
            // atualizar a aplicação

        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    Init() {
        
        Transactions.all.forEach(transactions => {
            DOM.addTransaction(transactions)
        })
        
        DOM.updateBalance()
        

    },
    reload() {
        DOM.clearTransactions()
        App.Init()
    },
}

App.Init()


