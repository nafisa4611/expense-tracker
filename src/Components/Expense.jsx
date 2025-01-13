import React, { useState, useEffect } from 'react';

export default function Expense({ id, expenses, onEdit, onDelete }) {
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortOrder, setSortOrder] = useState('');

    // Sorting and filtering dropdowns
    const toggleSortDropdown = () => {
        setIsSortOpen((prev) => !prev);
        setIsFilterOpen(false); // Close filter dropdown if open
    };
    
    
    //Toggle filter dropdown
    const toggleFilterDropdown = () => {
        setIsFilterOpen((prev) => !prev);
        setIsSortOpen(false); // Close sort dropdown if open
    };

    // Handle category selection for filtering
    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category) // Remove if already selected
                : [...prev, category] // Add if not selected
        );
    };

    // Filter expenses based on selected categories
    const filteredExpenses = expenses.filter((expense) =>
        selectedCategories.length === 0 || selectedCategories.includes(expense.category)
    );

    // Handle Sorting by Low to High or High to Low
    const handleSort = (order) => {
        setSortOrder(order);
    };

    // Sort expenses based on selected sort order
    const sortedExpenses = [...filteredExpenses].sort((a, b) => {
        if (sortOrder === 'lowToHigh') {
            return a.amount - b.amount; // Sort from low to high
        } else if (sortOrder === 'highToLow') {
            return b.amount - a.amount; // Sort from high to low
        }
        return 0; // No sorting if no order is selected
    });

    return (
        <>
            <div className="border rounded-md">
                <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-pink-600 text-white rounded-md text-center object-center place-content-center text-base">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mx-auto"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M17 8v-3a1 1 0 0 0 -1 -1h-8m-3.413 .584a2 2 0 0 0 1.413 3.416h2m4 0h6a1 1 0 0 1 1 1v3" />
                                <path d="M19 19a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                <path d="M16 12h4v4m-4 0a2 2 0 0 1 -2 -2" />
                                <path d="M3 3l18 18" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold leading-7 text-gray-800">Expense</h3>
                        </div>
                    </div>

                    <div>
                        {/* Sorting Dropdown */}
                        <div className="relative inline-block text-left">
                            <div>
                                <button
                                    onClick={toggleSortDropdown}
                                    type="button"
                                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    id="menu-button"
                                    aria-expanded={isSortOpen ? "true" : "false"}
                                    aria-haspopup="true"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="icon icon-tabler icons-tabler-outline icon-tabler-sort-descending"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M4 6l9 0" />
                                        <path d="M4 12l7 0" />
                                        <path d="M4 18l7 0" />
                                        <path d="M15 15l3 3l3 -3" />
                                        <path d="M18 6l0 12" />
                                    </svg>
                                </button>
                            </div>

                            {isSortOpen && (
                                <div
                                    className="absolute z-10 mt-2 left-0 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                                >
                                    <button
                                         onClick={() => handleSort("lowToHigh")}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        Low to High
                                    </button>
                                    <button
                                        onClick={() => handleSort("highToLow")}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        High to Low
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Filter Dropdown */}
                        <div className="relative inline-block text-left">
                            <div>
                                <button
                                    onClick={toggleFilterDropdown}
                                    type="button"
                                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    id="filter-button"
                                    aria-expanded={isFilterOpen ? "true" : "false"}
                                    aria-haspopup="true"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="icon icon-tabler icons-tabler-outline icon-tabler-adjustments-alt"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M4 8h4v4h-4z" />
                                        <path d="M6 4l0 4" />
                                        <path d="M6 12l0 8" />
                                        <path d="M10 14h4v4h-4z" />
                                        <path d="M12 4l0 10" />
                                        <path d="M12 18l0 2" />
                                        <path d="M16 5h4v4h-4z" />
                                        <path d="M18 4l0 1" />
                                        <path d="M18 9l0 11" />
                                    </svg>
                                </button>
                            </div>

                            {isFilterOpen && (
                                <div className="absolute z-10 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="py-1">
                                        {['Education', 'Food', 'Health'].map((category) => (
                                            <label key={category} className="flex items-center px-4 py-2 text-sm text-gray-700">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(category)} // Ensure checkbox state is controlled
                                                    onChange={() => handleCategoryChange(category)} // Handle category toggle
                                                    className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                                                />
                                                <span className="ml-2">{category}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-4 divide-y">
                    {sortedExpenses.length === 0 ? (
                        <p className="text-center text-gray-500">No expenses recorded yet.</p>
                    ) : (
                        sortedExpenses.map((expense, index) => (
                            <div className="flex justify-between items-center py-2 relative group cursor-pointer">
                                <div>
                                    <h3 className="text-base font-medium leading-7 text-gray-600">{expense.category}</h3>
                                    <p className="text-xs text-gray-600">{expense.date}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
                                        {expense.amount}
                                    </p>
                                    <div
                                        className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all"
                                    >
                                        <button
                                            onClick={() => onEdit('Expense', expense.id)}
                                            className="hover:text-teal-600"
                                            role="button"
                                            title="Edit Button"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                                                <path d="M13.5 6.5l4 4" />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={() => onDelete('Expense', expense.id)}  // Add 'Expense' type here
                                            className="hover:text-red-600"
                                            role="button"
                                            title="Delete">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M4 7l16 0" />
                                                <path d="M10 11l0 6" />
                                                <path d="M14 11l0 6" />
                                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}