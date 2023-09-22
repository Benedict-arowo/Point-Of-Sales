import { useEffect, useState } from "react";
import DisplayOrders from "../Components/Orders Page/DisplayOrders";
import { Order } from "../Types";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const Orders = () => {
	const [orders, setOrders] = useState<Order[]>([]);
	const [err, setErr] = useState<undefined | string>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [searchBar, setSearchBar] = useState<string>("");
	const [tab, setTab] = useState<string>("");
	// const [startDate, setStartDate] = useState<Date>(new Date());

	const fetchOrders = () => {
		return fetch("http://localhost:3000/orders")
			.then((response) => response.json())
			.then((data) => setOrders(data.data))
			.catch((err) => setErr(() => err.message))
			.finally(() => setIsLoading(() => false));
	};

	useEffect(() => {
		(async () => {
			setIsLoading(() => true);
			await fetchOrders();
			//* Checks session storage, and if a tab is saved on there, it automatically opens the tab instead of resetting it.
			const defaultTab = sessionStorage.getItem("tab");
			setTab(() => (defaultTab === null ? "all" : defaultTab));
		})();
	}, []);

	const updateTab = (tab: string) => {
		//* Updates tab, while also updating it on the sessionStorage.
		setTab(() => tab);
		sessionStorage.setItem("tab", tab);
	};

	return isLoading ? (
		<div>Loading...</div>
	) : err !== undefined ? (
		// TODO: A functional error component
		<div>
			Error {err}
			<button type="button" onClick={fetchOrders}>
				Refresh
			</button>
		</div>
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
						onClick={() => updateTab("all")}>
						All
					</p>
					<p
						className={`px-6 py-1 border hover:bg-text_orange hover:text-white duration-300 rounded-md hover:scale-105 cursor-pointer ${
							tab === "cash" ? "bg-text_orange text-white" : ""
						}`}
						onClick={() => updateTab("cash")}>
						Cash
					</p>
					<p
						className={`px-6 py-1 border hover:bg-text_orange hover:text-white duration-300 rounded-md hover:scale-105 cursor-pointer ${
							tab === "transfer"
								? "bg-text_orange text-white"
								: ""
						}`}
						onClick={() => updateTab("transfer")}>
						Transfer
					</p>
					<p
						className={`px-6 py-1 border hover:bg-text_orange hover:text-white duration-300 rounded-md hover:scale-105 cursor-pointer ${
							tab === "card" ? "bg-text_orange text-white" : ""
						}`}
						onClick={() => updateTab("card")}>
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
					<DisplayOrders
						searchBar={searchBar}
						orders={orders}
						tab={tab}
					/>
				</div>
			</section>
		</div>
	);
};

export default Orders;
