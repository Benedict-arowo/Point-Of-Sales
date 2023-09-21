import { useEffect, useState } from "react";
import { format } from "timeago.js";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

type Order = {
	id: string;
	name: string;
	items: Items[];
	paymentMethod: string;
	total: number;
	createdDate: Date;
};

type Items = {
	name: string;
	paymentMethod: string;
	id: string;
	item: {
		name: string;
		pricePerUnit: number;
	};
	quantity: number;
	total: number;
	createdDate: string;
};

const Orders = () => {
	const [orders, setOrders] = useState<Order[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [searchBar, setSearchBar] = useState<string>("");
	const [tab, setTab] = useState<string>("");
	// const [startDate, setStartDate] = useState<Date>(new Date());

	useEffect(() => {
		setIsLoading(() => true);
		fetch("http://localhost:3000/orders")
			.then((response) => response.json())
			.then((data) => setOrders(data.data))
			.finally(() => setIsLoading(() => false));
		// TODO: Error handling
		setTab(() => "all");
	}, []);

	const DisplayOrders = () => {
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
			const { name, paymentMethod, id, items, total, createdDate } =
				order;

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
								<h6 className="font-semibold text-xl">
									{name}
								</h6>
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
						<p className="text-sm uppercase font-semibold">
							{name}
						</p>
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
	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className="bg-[#ffffffbb] px-4 w-full h-screen overflow-y-scroll">
			<div className="px-2 py-2 mt-4 mx-auto max-w-xl flex flex-row justify-between border-2 border-[#8A8A8A] rounded-sm">
				<input
					className="text-gray-500 w-full outline-none"
					type="text"
					placeholder="Search Orders..."
					id=""
					value={searchBar}
					onChange={(e) => setSearchBar(e.target.value)}
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6 text-text_orange">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>
			</div>

			<div className="lg:px-8 mt-6">
				<div className="flex flex-row gap-4 items-center justify-center text-gray-700 font-medium text-sm">
					<p
						className={`px-6 py-1 border hover:bg-text_orange hover:text-white duration-300 rounded-md hover:scale-105 cursor-pointer ${
							tab === "all" ? "bg-text_orange text-white" : ""
						}`}
						onClick={() => setTab("all")}>
						All
					</p>
					<p
						className={`px-6 py-1 border hover:bg-text_orange hover:text-white duration-300 rounded-md hover:scale-105 cursor-pointer ${
							tab === "cash" ? "bg-text_orange text-white" : ""
						}`}
						onClick={() => setTab("cash")}>
						Cash
					</p>
					<p
						className={`px-6 py-1 border hover:bg-text_orange hover:text-white duration-300 rounded-md hover:scale-105 cursor-pointer ${
							tab === "transfer"
								? "bg-text_orange text-white"
								: ""
						}`}
						onClick={() => setTab("transfer")}>
						Transfer
					</p>
					<p
						className={`px-6 py-1 border hover:bg-text_orange hover:text-white duration-300 rounded-md hover:scale-105 cursor-pointer ${
							tab === "card" ? "bg-text_orange text-white" : ""
						}`}
						onClick={() => setTab("card")}>
						Card
					</p>
				</div>
				{/* TODO: Add date sorting */}
				{/* <DatePicker
					selected={startDate}
					className="border-2 px-2 py-1 border-gray-400"
					onChange={(date: Date) => setStartDate(date)}
				/> */}
			</div>

			<section className="my-12 mx-6">
				<div className="flex flex-row justify-center flex-wrap gap-12">
					<DisplayOrders />
				</div>
			</section>
		</div>
	);
};

export default Orders;
