import React, { useState, useEffect } from 'react';

export default function Modal({ isOpen, onClose, onSave, item, type }) {
    const [category, setCategory] = useState(item?.category || '');
    const [amount, setAmount] = useState(item?.amount || '');
    const [date, setDate] = useState(item?.date || '');

    useEffect(() => {
        setCategory(item?.category || '');
        setAmount(item?.amount || '');
        setDate(item?.date || '');
    }, [item]);

    const handleSave = () => {
        if (!category.trim() || isNaN(amount) || parseFloat(amount) <= 0 || !date) {
            alert('Please fill in all fields correctly.');
            return;
        }

        onSave({ ...item, category, amount: parseFloat(amount), date });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Edit {type}</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-md"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                        type="number"
                        className="w-full px-4 py-2 border rounded-md"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        className="w-full px-4 py-2 border rounded-md"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
