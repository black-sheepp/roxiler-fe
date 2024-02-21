const Statistics = ({ totalSale, totalSoldItems, totalNotSoldItems }) => {
	return (
		<div className='container w-96 mx-auto px-4 mt-8 bg-yellow-200 rounded-xl'>
			<div className='my-2 flex justify-between'>
				<h2 className='text-lg font-semibold mb-2'>Total Sale</h2>
				<p className='text-lg font-medium text-gray-700'>{totalSale}</p>
			</div>
			<div className='my-2 flex justify-between'>
				<h2 className='text-lg font-semibold mb-2'>Total Sold Items</h2>
				<p className='text-lg font-medium text-gray-700'>{totalSoldItems}</p>
			</div>
			<div className='my-2 flex justify-between'>
				<h2 className='text-lg font-semibold mb-2'>Total Not Sold Items</h2>
				<p className='text-lg font-medium text-gray-700'>{totalNotSoldItems}</p>
			</div>
		</div>
	);
};

export default Statistics;
