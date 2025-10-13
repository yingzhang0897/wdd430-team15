/**
 * User Orders Page
 * 
 * Shows the user's order history with status and tracking
 */
export default function UserOrders() {
	// Mock order data
	const orders = [
		{
			id: 'ORD-001',
			date: '2024-10-10',
			status: 'Delivered',
			total: '$89.99',
			items: [
				{ name: 'Elegant Athena Ring', price: '$89.99', quantity: 1 }
			]
		},
		{
			id: 'ORD-002',
			date: '2024-10-05',
			status: 'Shipped',
			total: '$45.50',
			items: [
				{ name: 'Silver Moon Earrings', price: '$45.50', quantity: 1 }
			]
		},
		{
			id: 'ORD-003',
			date: '2024-09-28',
			status: 'Processing',
			total: '$120.00',
			items: [
				{ name: 'Heart Bezel Necklace', price: '$75.00', quantity: 1 },
				{ name: 'Crystal Bracelet', price: '$45.00', quantity: 1 }
			]
		}
	]

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Delivered':
				return 'bg-green-100 text-green-800'
			case 'Shipped':
				return 'bg-blue-100 text-blue-800'
			case 'Processing':
				return 'bg-yellow-100 text-yellow-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	return (
		<main className='pt-32 min-h-screen bg-gray-50'>
			<div className='container mx-auto max-w-4xl px-6 py-8'>
				{/* Page Header */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						My Orders
					</h1>
					<p className='text-gray-600'>
						Track and manage your order history
					</p>
				</div>

				{/* Orders List */}
				<div className='space-y-6'>
					{orders.map((order) => (
						<div key={order.id} className='bg-white rounded-lg shadow-md p-6'>
							{/* Order Header */}
							<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4'>
								<div>
									<h3 className='text-lg font-semibold text-gray-900'>
										Order #{order.id}
									</h3>
									<p className='text-sm text-gray-600'>
										Placed on {order.date}
									</p>
								</div>
								<div className='flex items-center gap-4 mt-2 sm:mt-0'>
									<span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
										{order.status}
									</span>
									<span className='text-lg font-bold text-gray-900'>
										{order.total}
									</span>
								</div>
							</div>

							{/* Order Items */}
							<div className='border-t pt-4'>
								{order.items.map((item, index) => (
									<div key={index} className='flex justify-between items-center py-2'>
										<div>
											<p className='font-medium text-gray-900'>{item.name}</p>
											<p className='text-sm text-gray-600'>Quantity: {item.quantity}</p>
										</div>
										<p className='font-semibold text-gray-900'>{item.price}</p>
									</div>
								))}
							</div>

							{/* Action Buttons */}
							<div className='flex gap-3 mt-4 pt-4 border-t'>
								<button className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'>
									View Details
								</button>
								{order.status === 'Delivered' && (
									<button className='bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors'>
										Leave Review
									</button>
								)}
								{order.status === 'Shipped' && (
									<button className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors'>
										Track Package
									</button>
								)}
							</div>
						</div>
					))}
				</div>

				{/* Empty State (if no orders) */}
				{orders.length === 0 && (
					<div className='text-center py-12'>
						<svg className='mx-auto h-12 w-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
						</svg>
						<h3 className='mt-2 text-sm font-medium text-gray-900'>No orders yet</h3>
						<p className='mt-1 text-sm text-gray-500'>Start shopping to see your orders here!</p>
						<div className='mt-6'>
							<a href='/products' className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'>
								Browse Products
							</a>
						</div>
					</div>
				)}
			</div>
		</main>
	)
}