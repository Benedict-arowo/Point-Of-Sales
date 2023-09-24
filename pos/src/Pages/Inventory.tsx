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
			console.log(item);
			const {
				id,
				name,
				pricePerUnit,
				category,
				description,
				unitsInStock,
				isOutOfStock,
				initialQuantity,
				created,
				updated,
			} = item;
			return (
				<div
					key={id}
					className="px-4 py-1 border rounded-sm shadow-md h-fit w-full pb-2 max-w-4xl">
					<header className="flex flex-row justify-between items-center w-full my-2">
						<h6 className="font-semibold cursor-pointer text-2xl text-center my-2 self-center">
							{name}
						</h6>
						{isOutOfStock ? (
							<p className="bg-green-600 cursor-default text-white font-semibold w-fit h-fit px-2 py-1 text-xs rounded-md">
								IN STOCK
							</p>
						) : (
							<p className="bg-rose-500 cursor-default text-white font-semibold w-fit h-fit px-2 py-1 text-xs rounded-md">
								OUT OF STOCK
							</p>
						)}
					</header>
					<div className="border w-full mb-2 mt-1 border-[#E5E5E5]"></div>
					{description && (
						<div className="w-full text-sm mb-2">{description}</div>
					)}
					<main className="w-full flex flex-row justify-between cursor-default">
						<div>
							<div className="flex flex-row gap-2 items-center font-light">
								<p className="font-medium text-lg">Price: </p>
								<span>&#8358;{pricePerUnit}</span>
							</div>

							<div className="flex flex-row gap-2 items-center font-light">
								<p className="font-medium text-lg">
									Amount Sold:
								</p>
								<span> {initialQuantity - unitsInStock}</span>
							</div>

							<div className="flex flex-row gap-2 items-center font-light">
								<p className="font-medium text-lg">
									Amount Sold Today:
								</p>
								<span>{initialQuantity - unitsInStock}</span>
							</div>
						</div>

						<div>
							<div className="flex flex-row gap-2 items-center">
								<p className="font-medium text-lg">
									Last Restock:
								</p>
								<span className="font-light">
									{pricePerUnit}
								</span>
							</div>
							<div className="flex flex-row gap-2 items-center">
								<p className="font-medium text-lg">Category:</p>
								<span className="font-light">{category}</span>
							</div>
							{/* <div className="flex flex-row gap-2 items-center">
								<p className="font-medium text-lg">Created:</p>
								<span className="font-light">
									{format(created)}
								</span>
							</div> */}
						</div>
					</main>
					<div className="border w-full mt-1 border-[#E5E5E5]"></div>
					<footer className="mt-2 text-xs flex flex-row justify-between w-full">
						<div className="flex flex-row gap-2">
							<p className="font-medium">Created:</p>
							<span className="">{format(created)}</span>
						</div>
						{created !== updated && (
							<div className="flex flex-row gap-2">
								<p className="font-medium">Last Updated:</p>
								<span className="">{format(updated)}</span>
							</div>
						)}
					</footer>{" "}
				</div>
			);
		});
	};
	return isLoading ? (
		<div>Loading...</div>
	) : err === null ? (
		<div>Error</div>
	) : (
		<div className="bg-[#ffffffbb] w-full h-screen px-4 overflow-y-scroll">
			<div className="px-2 py-2 mt-4 mx-auto max-w-lg flex flex-row justify-between border-2 border-[#8A8A8A] rounded-sm">
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

			<div>{/* IN STOCK && OUT OF STOCK SORTING */}</div>

			{/* <section className="flex flex-gap-3 justify-center flex-wrap mt-6"> */}
			<section className="px-16 mt-8 flex flex-col gap-12 items-center mb-8">
				<DisplayInventoryItems />
			</section>
		</div>
	);
};

export default Inventory;
