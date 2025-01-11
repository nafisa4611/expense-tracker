import { useState } from 'react';

export default function Form({
    type,
    onSubmit,
    onTypeChange,
    onCategoryChange,
    categoryElements,
    category,
    onAmountChange,
    amount,
    onDateChange,
    date,
}) {
    const [errors, setErrors] = useState({});

    // Helper function to validate date
    const isValidDate = (date) => !isNaN(new Date(date).getTime());

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!amount) newErrors.amount = 'Amount is required.';
        if (!category) newErrors.category = 'Category is required.';
        if (!date || !isValidDate(date)) newErrors.date = 'Please enter a valid date.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit({ type, category, amount, date });
        setErrors({});
        
    };

    return (
        <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
            <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
                Expense Tracker
            </h2>

            <form onSubmit={handleSubmit}>
                {/* Toggle between Expense and Income */}
                <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
                    <div
                        className={`cursor-pointer text-center flex-1 px-4 py-2 ${
                            type === 'Expense' ? 'hover:bg-slate-50 hover:text-slate-900 active ' : ''
                        }`}
                        onClick={onTypeChange}
                    >
                        Expense
                    </div>
                    <div
                        className={`cursor-pointer text-center flex-1 px-4 py-2 ${
                            type === 'Income' ? 'hover:bg-slate-50 hover:text-slate-900 active ' : ''
                        }`}
                        onClick={onTypeChange}
                    >
                        Income
                    </div>
                </div>

                {/* Category Dropdown */}
                <div className="mt-3">
                    <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                        Category
                    </label>
                    <div className="mt-2">
                        <select
                            id="category"
                            name="category"
                            onChange={onCategoryChange}
                            value={category}
                            aria-label="Select a category"
                            aria-invalid={!!errors.category}
                            className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 ${
                                errors.category ? 'ring-red-500' : ''
                            }`}
                        >
                            <option value="">Select Category</option>
                            {categoryElements}
                        </select>
                        {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                    </div>
                </div>

                {/* Amount Input */}
                <div className="mt-3">
                    <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                        Amount
                    </label>
                    <div className="mt-2">
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            value={amount}
                            onChange={onAmountChange}
                            placeholder={`Enter ${type} Amount`}
                            aria-label="Enter amount"
                            aria-invalid={!!errors.amount}
                            className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 ${
                                errors.amount ? 'ring-red-500' : ''
                            }`}
                        />
                        {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount}</p>}
                    </div>
                </div>

                {/* Date Input */}
                <div className="mt-3">
                    <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                        Date
                    </label>
                    <div className="mt-2">
                        <input
                            type="date"
                            name="date"
                            id="date"
                            value={date}
                            onChange={onDateChange}
                            aria-label="Select a date"
                            aria-invalid={!!errors.date}
                            className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 ${
                                errors.date ? 'ring-red-500' : ''
                            }`}
                        />
                        {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    class="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
                >
                    Save
                </button>
            </form>
        </div>
    );
}