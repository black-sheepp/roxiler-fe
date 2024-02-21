import { useEffect, useState } from "react";
import Statistics from "./Statistics";
import ChartBar from "./ChartBar";

const Table = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedMonth, setSelectedMonth] = useState(2);
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/transtations-month/${monthNames[selectedMonth].toLowerCase()}`
				);
				const data = await response.json();
				setTransactions(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [selectedMonth]);

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const handleMonthChange = (e) => {
		setSelectedMonth(parseInt(e.target.value));
	};

	const handleKeyPress = async (e) => {
		if (e.key === "Enter") {
			try {
				const response = await fetch(`http://localhost:8080/transtations-search/${searchQuery}`);
				const data = await response.json();
				setTransactions(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}
	};

	// Calculate total sale, total sold items, and total not sold items
	const totalSale = transactions.reduce((total, transaction) => {
		return total + transaction.price;
	}, 0);

	const totalSoldItems = transactions.filter((transaction) => transaction.sold).length;

	const totalNotSoldItems = transactions.filter((transaction) => !transaction.sold).length;

	return (
		<div className='container mx-auto px-4 my-8'>
			<div className='flex justify-between mb-4'>
				<div className='w-full max-w-md'>
					<input
						type='text'
						placeholder='Search'
						className='w-7xl px-3 py-2 border border-none text-center bg-yellow-200 text-black rounded-full'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onKeyPress={handleKeyPress}
					/>
				</div>
				<div className='flex items-center bg-yellow-200 px-4 rounded-lg'>
					<p className='mr-2'>Month</p>
					<select
						value={selectedMonth}
						onChange={handleMonthChange}
						className='px-3 py-2 bg-yellow-200 border-none rounded-md'>
						{monthNames.map((month, index) => (
							<option key={index} value={index}>
								{month}
							</option>
						))}
					</select>
				</div>
			</div>
			<table className='table-auto w-full border border-gray-300 bg-yellow-200'>
				<thead>
					<tr>
						<th className='px-4 py-2 border border-gray-300'>ID</th>
						<th className='px-4 py-2 border border-gray-300'>Title</th>
						<th className='px-4 py-2 border border-gray-300'>Description</th>
						<th className='px-4 py-2 border border-gray-300'>Price</th>
						<th className='px-4 py-2 border border-gray-300'>Category</th>
						<th className='px-4 py-2 border border-gray-300'>Sold</th>
						<th className='px-4 py-2 border border-gray-300'>Image</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction) => (
						<tr key={transaction.id}>
							<td className='px-4 py-2 border border-gray-300'>{transaction.id}</td>
							<td className='px-4 py-2 border border-gray-300'>{transaction.title}</td>
							<td className='px-4 py-2 border border-gray-300'>{transaction.description}</td>
							<td className='px-4 py-2 border border-gray-300'>{transaction.price}</td>
							<td className='px-4 py-2 border border-gray-300'>{transaction.category}</td>
							<td className='px-4 py-2 border border-gray-300'>
								{transaction.sold ? (
									<span className='text-green-500'>Sold</span>
								) : (
									<span className='text-red-500'>Not Sold</span>
								)}
							</td>
							<td className='px-4 py-2 border border-gray-300'>
								<img src={transaction.image} alt='img' className='w-12' />
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{/* Pass calculated statistics to Statistics component */}
			<Statistics
				totalSale={totalSale}
				totalSoldItems={totalSoldItems}
				totalNotSoldItems={totalNotSoldItems}
			/>
            <ChartBar />
		</div>
	);
};

export default Table;
