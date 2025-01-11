
import { useState } from 'react';
import Form from './Form';
import BalanceStatus from './BalanceStatus';
import Income from './Income';
import Expense from './Expense';

export default function Hero() {
    const [type, setType] = useState('Expense');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [date, setDate] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncome] = useState([]);

    // Handle form submission and update income/expense totals
    const handleFormSubmit = (formData) => {
        const { type, category, amount, date } = formData;
        const parsedAmount = parseFloat(amount);
        setCategory('');
        setAmount('');
        setDate('');

        if (type === 'Income') {
            setTotalIncome((prevIncome) => prevIncome + parsedAmount);
            setIncome((prevIncomes) => [
                ...prevIncomes,
                { category, date, amount: parsedAmount },
            ]);
        } else if (type === 'Expense') {
            setTotalExpense((prevExpense) => prevExpense + parsedAmount);
            setExpenses((prevExpenses) => [
                ...prevExpenses,
                { category, date, amount: parsedAmount },
            ]);
        }
    };

    // Calculate the current balance
    const balance = totalIncome - totalExpense;

    // Toggle between Income and Expense
    const handleTypeChange = () => {
        setType((prevType) => (prevType === 'Expense' ? 'Income' : 'Expense'));
    };
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);
    const handleDateChange = (e) => setDate(e.target.value);

    const categories = {
        Expense: [
            'Education',
            'Food',
            'Health',
            'Bill',
            'Insurance',
            'Tax',
            'Transport',
            'Telephone',
        ],
        Income: ['Salary', 'Outsourcing', 'Bond', 'Dividend'],
    };

    const categoryElements = categories[type].map((cat, index) => (
        <option key={index} value={cat}>
            {cat}
        </option>
    ));

    return (
        <div>
            <main className="relative mx-auto mt-10 w-full max-w-7xl">
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Form Component */}
                    <Form
                        type={type}
                        onSubmit={handleFormSubmit}
                        onTypeChange={handleTypeChange}
                        onCategoryChange={handleCategoryChange}
                        categoryElements={categoryElements}
                        category={category}
                        onAmountChange={handleAmountChange}
                        amount={amount}
                        onDateChange={handleDateChange}
                        date={date}
                    />

                    {/* Balance and Income/Expense Summary */}
                    <div className="lg:col-span-2">
                        <BalanceStatus
                            balance={balance}
                            income={totalIncome}
                            expense={totalExpense}
                        />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                          <Income incomes={incomes} />
                          <Expense expenses={expenses} />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
