import { useEffect, useState } from "react";
import { format } from "timeago.js";

type Item = {
	id: string;
	name: string;
	description: string;
	pricePerUnit: number;
	priceBought: number;
	category: string;
	unitsInStock: number;
	reorderLevel: string;
	isOutOfStock: boolean;
	initialQuantity: number;
	estimatedProfit: number;
	created: Date;
	updated: Date;
};

const Inventory = () => {
	const [searchBar, setSearchBar] = useState<string>();
	const [inventoryData, setInventoryData] = useState<Item[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [err, setErr] = useState<string | undefined>();

	const fetchInventoryData = async () => {
		setIsLoading(() => true);
		return await fetch("http://localhost:3000/items")
			.then((res) => res.json())
			.then((data) => setInventoryData(data.data))
			.finally(() => setIsLoading(() => false))
			.catch((err) => setErr(err.message));
	};

	useEffect(() => {
		(async () => {
			await fetchInventoryData();
		})();
	}, []);

	const DisplayInventoryItems = () => {
		let Items: Item[];
		if (searchBar) {
			Items = inventoryData.filter(
				(item) =>
					item.name
						.toLowerCase()
						.startsWith(searchBar.toLowerCase()) ||
					item.name.toLowerCase().includes(searchBar.toLowerCase())
			);
		} else {
			Items = inventoryData;
		}

		return Items.map((item) => {
			const {
				id,
				name,
				description,
				pricePerUnit,
				priceBought,
				category,
				unitsInStock,
				reorderLevel,
				isOutOfStock,
				initialQuantity,
				estimatedProfit,
				created,
				updated,
			} = item;
			return (
				<div
					key={id}
					className="px-4 py-1 border rounded-sm shadow-md h-fit w-[280px]">
					<header className="flex flex-row justify-between items-center w-full my-2">
						<h6 className="font-semibold text-2xl text-center my-2 self-center">
							{name}
						</h6>
						{isOutOfStock ? (
							<p className="bg-green-600 text-white font-semibold w-fit h-fit px-2 py-1 text-xs rounded-md">
								IN STOCK
							</p>
						) : (
							<p className="bg-rose-500 text-white font-semibold w-fit h-fit px-2 py-1 text-xs rounded-md">
								OUT OF STOCK
							</p>
						)}
					</header>
					<p>{description}</p>
					<p>{category}</p>
					<div>
						<p>Price: {pricePerUnit}</p>
						<p>Price Bought: {priceBought}</p>
					</div>
					<div>
						<p>Units In Stock: {unitsInStock}</p>
						<p>Reorder Level: {reorderLevel}</p>
						<p>Initial Quantity: {initialQuantity}</p>
						<p>Estimated Profit: {estimatedProfit}</p>
						<p>Amount Sold: {initialQuantity - unitsInStock}</p>
						<p>Created: {format(created)}</p>
						<p>Updated: {format(updated)}</p>
					</div>
				</div>
			);
		});
	};
	return isLoading ? (
		<div>Loading...</div>
	) : err === null ? (
		<div>Error</div>
	) : (
		<div className="bg-[#ffffffbb] px-4 w-full h-screen overflow-y-scroll">
			<div className="px-2 py-2 mt-4 mx-auto max-w-xl flex flex-row justify-between border-2 border-[#8A8A8A] rounded-sm">
				<input
					className="text-gray-500 w-full outline-none"
					type="text"
					placeholder="Search Items..."
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

			{/* <section className="flex flex-gap-3 justify-center flex-wrap mt-6"> */}
			<section className="px-16 mt-8 flex flex-row flex-wrap gap-12 h-screen justify-center mb-8">
				<DisplayInventoryItems />
			</section>
		</div>
	);
};

export default Inventory;
