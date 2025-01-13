import { useState } from 'react';
import Form from './Form';
import BalanceStatus from './BalanceStatus';
import Income from './Income';
import Expense from './Expense';
import Modal from './Modal';

export default function Hero() {
    const [type, setType] = useState('Expense');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [balance, setBalance] = useState(0);
    const [date, setDate] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const recalculate = (newExpenses, newIncomes) => {
        const totalExp = newExpenses.reduce((sum, item) => sum + item.amount, 0);
        const totalInc = newIncomes.reduce((sum, item) => sum + item.amount, 0);
        setTotalExpense(totalExp);
        setTotalIncome(totalInc);
        setBalance(totalInc - totalExp);
    };

    const handleFormSubmit = (formData) => {
        const { type, category, amount, date } = formData;
        const parsedAmount = parseFloat(amount);
        if (!category || isNaN(parsedAmount) || parsedAmount <= 0 || !date) {
            alert('Please fill in all fields correctly.');
            return;
        }

        setCategory('');
        setAmount('');
        setDate('');

        if (type === 'Income') {
            const updatedIncomes = [
                ...incomes,
                { id: crypto.randomUUID(), category, date, amount: parsedAmount },
            ];
            setIncomes(updatedIncomes);
            recalculate(expenses, updatedIncomes);
        } else {
            const updatedExpenses = [
                ...expenses,
                { id: crypto.randomUUID(), category, date, amount: parsedAmount },
            ];
            setExpenses(updatedExpenses);
            recalculate(updatedExpenses, incomes);
        }
    };

    const editItem = (type, id) => {
        const item = type === 'Income'
            ? incomes.find((item) => item.id === id)
            : expenses.find((item) => item.id === id);
        setSelectedItem({ ...item, type });
        setIsModalOpen(true);
    };

    const saveEditedItem = (editedItem) => {
        if (editedItem.type === 'Income') {
            const updatedIncomes = incomes.map((item) =>
                item.id === editedItem.id ? { ...item, ...editedItem } : item
            );
            setIncomes(updatedIncomes);
            recalculate(expenses, updatedIncomes);
        } else {
            const updatedExpenses = expenses.map((item) =>
                item.id === editedItem.id ? { ...item, ...editedItem } : item
            );
            setExpenses(updatedExpenses);
            recalculate(updatedExpenses, incomes);
        }
        setIsModalOpen(false);
    };

    const deleteItem = (type, id) => {
        if (type === 'Income') {
            const updatedIncomes = incomes.filter((item) => item.id !== id);
            setIncomes(updatedIncomes);
            recalculate(expenses, updatedIncomes);
        } else {
            const updatedExpenses = expenses.filter((item) => item.id !== id);
            setExpenses(updatedExpenses);
            recalculate(updatedExpenses, incomes);
        }
    };

    const handleTypeChange = () => {
        setType((prevType) => (prevType === 'Expense' ? 'Income' : 'Expense'));
        setCategory('');
    };

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
                    <Form
                        type={type}
                        onSubmit={handleFormSubmit}
                        onTypeChange={handleTypeChange}
                        onCategoryChange={(e) => setCategory(e.target.value)}
                        categoryElements={categoryElements}
                        category={category}
                        onAmountChange={(e) => setAmount(e.target.value)}
                        amount={amount}
                        onDateChange={(e) => setDate(e.target.value)}
                        date={date}
                    />
                    <div className="lg:col-span-2">
                        <BalanceStatus
                            balance={balance}
                            income={totalIncome}
                            expense={totalExpense}
                        />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                            <Income incomes={incomes} onEdit={editItem} onDelete={deleteItem} />
                            <Expense expenses={expenses} onEdit={editItem} onDelete={deleteItem} />
                        </div>
                        <Modal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSave={saveEditedItem}
                            item={selectedItem}
                            type={selectedItem?.type || 'Expense'}
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}
