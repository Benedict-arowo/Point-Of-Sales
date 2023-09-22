import { format } from "timeago.js";
import { Items, Order } from "../../Types";

type Props = {
	searchBar: string;
	orders: Order[];
	tab: string;
};

const DisplayOrders = (props: Props) => {
	const { searchBar, orders, tab } = props;

	let displayingOrders;
	if (searchBar) {
		displayingOrders = orders.filter((order: Order) => {
			if (searchBar.startsWith("#")) {
				return order.id.toString().startsWith(searchBar.slice(1));
			} else {
				return (
					(order.name &&
						order.name
							.toLowerCase()
							.startsWith(searchBar.toLowerCase())) ||
					order.id.toString().startsWith(searchBar)
				);
			}
		});
	} else {
		displayingOrders = orders;
	}

	if (tab !== "all")
		displayingOrders = displayingOrders.filter(
			(order: Order) =>
				order.paymentMethod.toLowerCase() === tab.toLowerCase()
		);

	// TODO: Support date filtering.
	// if (startDate)
	// 	displayingOrders = displayingOrders.filter(
	// 		(order: Order) =>
	// 			new Date(order.createdDate).getDay() >
	// 			new Date(startDate).getDay()
	// 	);

	return displayingOrders.map((order: Order) => {
		const { name, paymentMethod, id, items, total, createdDate } = order;

		const ItemsDisplay = () => {
			return items.slice(0, 3).map((item: Items) => {
				const {
					id,
					quantity,
					item: { name, pricePerUnit },
				} = item;
				return (
					<div key={id}>
						<div>
							<h6 className="font-semibold text-xl">{name}</h6>
							<div className="flex flex-row justify-between text-gray-600">
								<p>&#8358; {pricePerUnit}</p>
								<p>Qty: {quantity}</p>
							</div>
						</div>
					</div>
				);
			});
		};

		return (
			<div
				key={id + name}
				className="bg-white p-4 orderContainer w-80 flex flex-col justify-between h-fit">
				<header>
					<h4 className="font-semibold text-3xl">Order #{id}</h4>
					<p className="text-sm uppercase font-semibold">{name}</p>
					<div className="flex flex-row justify-between">
						<span className="text-gray-400 font-light text-lg">
							{format(createdDate)}
						</span>
						<p className="py-1 px-2 rounded-md bg-text_orange text-white h-fit w-fit text-sm">
							{paymentMethod}
						</p>
					</div>
				</header>

				<div>
					<div className="border my-6 border-gray-200"></div>

					<div className="flex flex-col gap-6 mb-6">
						<ItemsDisplay />
					</div>

					<div className="border my-6 border-gray-200"></div>
				</div>

				<footer className="font-semibold">
					<p className="text-sm text-gray-600">
						x{items.length} Item{items.length > 1 ? "s" : ""}
					</p>
					<div className="flex flex-row justify-between items-center">
						<h6 className="text-2xl">Total:</h6>
						<p className="text-xl">{total}</p>
					</div>
				</footer>
			</div>
		);
	});
};

export default DisplayOrders;
