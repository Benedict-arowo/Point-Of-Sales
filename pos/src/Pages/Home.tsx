import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar.tsx";

export type Item = {
	id: number;
	imageLink: string;
	pricePerUnit: number;
	name: string;
	category: string;
	amountLeftInStock: number;
	amountInCart: number;
};

type itemField = {
	name: string;
	price: number;
	quantity: number;
};

// enum categoryList {
// 	FOOD = "FOOD",
// 	DRINK = "DRINK",
// 	GAMES = "GAMES",
// }

const Home = () => {
	useEffect(() => {
		(async () => {
			// await fetch("localhost:3000/items")
			// 	.then((items) => items.json())
			// 	.then((items) => console.log(items));
			const response = await fetch("http://localhost:3000/items");
			const data = await response.json();
			setItems(() => data.data);
		})();

		updateCategoryFilter("");
		setIsLoading(() => false);
	}, []);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [searchBar, setSearchBar] = useState("");
	const [category, setCategory] = useState<string>("");
	const [Items, setItems] = useState([]);
	const [cart, setCart] = useState<Item[]>([]);
	const [showCustomItemMenu, setShowCustomItemMenu] =
		useState<boolean>(false);
	const [customItemField, setCustomItemField] = useState<itemField>({
		name: "",
		price: 0,
		quantity: 1,
	});

	const addToCart = (newItem: Item) => {
		setCart((cartItems: Item[]) => {
			//* Tries to find if the item already exists, and If it does it returns an index, else it returns -1.
			let Items: Item[];
			const index = cartItems.findIndex((item) => item.id === newItem.id);

			if (index === -1) {
				//* If the item does not exist yet.
				newItem.amountInCart = 1;
				Items = [...cartItems, newItem];
				return Items;
			} else {
				//* Item exists already, and we need to update the amount
				cartItems[index].amountInCart =
					cartItems[index].amountInCart + 1;
				Items = [...cartItems];

				return Items;
			}
		});
	};

	const ItemDisplay = () => {
		let displayingItems;
		//* For filtering purposes
		if (searchBar.length > 0) {
			console.log();
			displayingItems = Items.filter((item: Item) =>
				item.name.toLowerCase().startsWith(searchBar.toLowerCase())
			);
		} else {
			displayingItems = Items;
		}

		if (category) {
			displayingItems = displayingItems.filter(
				(item: Item) => item.category === category
			);
		}
		if (displayingItems.length === 0) {
			return (
				<div className="text-center">
					<h6 className="font-bold">Ummmmm...</h6>
					<p className="font-light">
						Sorry, I could not find what you're looking for.
					</p>
				</div>
			);
		}
		//* Loops over the Items array, for displaying them.
		return displayingItems.map((item): JSX.Element => {
			const { id, pricePerUnit, name, description, unitsInStock } = item;
			console.log(item);

			return (
				<div
					key={id}
					onClick={() => addToCart(item)}
					className="decentShadow bg-white p-3 flex flex-col justify-center items-center gap-2 rounded-md border-2 cursor-pointer h-fit w-60 ">
					{/* <img className="w-48 aspect-auto" src={imageLink} alt="" /> */}
					<h5 className="font-medium text-2xl">{name}</h5>
					<p className="text-center font-light text-lg">
						{description}
					</p>
					<div className="mt-4 flex flex-row justify-between w-full items-center">
						<p>In Stock: {unitsInStock}</p>
						<span className="font-light text-lg">
							&#8358; {pricePerUnit}
						</span>
					</div>
				</div>
			);
		});
	};

	const updateCategoryFilter = (category: string) => {
		setCategory(() => category);
	};

	const addCustomItem = () => {
		// TODO: Not fully decided on yet.
		// setCart((prev: Item[]) => {
		// 	return [
		// 		...prev,
		// 		{
		// 			amountInCart: customItemField.quantity,
		// 			id: 0,
		// 			amountLeftInStock: 0,
		// 			category: "",
		// 			imageLink: jollof_icon,
		// 			name: customItemField.name,
		// 			price: customItemField.price,
		// 		},
		// 	];
		// });
	};

	const handleCloseCustomItemMenu = () => {
		//* Resets the field, and closes the menu by updating the state.
		setCustomItemField(() => {
			return { name: "", price: 0, quantity: 1 };
		});
		setShowCustomItemMenu(() => false);
	};

	const updateCustomItemField = (newValue: object) => {
		//* A controlled component, that basically updates the state whenever the value is updated/changed.
		setCustomItemField((prev) => {
			return { ...prev, ...newValue };
		});
	};

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className="flex flex-row w-full">
			<div className="flex-1 relative">
				{/* Overlay */}
				<section
					className={`absolute w-full h-full bg-[#ffffffbb] grid place-content-center ${
						showCustomItemMenu ? "grid" : "hidden"
					}`}>
					<form
						action=""
						className="bg-white px-8 py-4 sm:w-96 lg:w-[35rem] rounded decentShadow">
						<h3 className="text-center w-full font-bold text-xl uppercase">
							Addding an Item
						</h3>
						<div className="flex gap-3 mt-6 flex-col w-full">
							<div>
								<label
									htmlFor="itemName"
									className="font-medium text-xl flex">
									Name:
								</label>
								<input
									type="text"
									name="itemName"
									id="itemName"
									className="border px-3 py-1 w-full"
									value={customItemField.name}
									onChange={(e) =>
										updateCustomItemField({
											name: e.target.value,
										})
									}
								/>
							</div>

							<div>
								<label
									htmlFor="itemPrice"
									className="font-medium text-xl flex">
									Price:
								</label>
								<input
									type="number"
									name="itemPrice"
									id="itemPrice"
									className="border px-3 py-1 w-full"
									value={customItemField.price}
									onChange={(e) =>
										updateCustomItemField({
											price: e.target.value,
										})
									}
								/>
							</div>

							<div>
								<label
									htmlFor="itemQuantity"
									className="font-medium text-xl flex">
									Quantity:
								</label>
								<input
									type="number"
									name="itemQuantity"
									id="itemQuantity"
									className="border px-3 py-1 w-full"
									value={customItemField.quantity}
									onChange={(e) =>
										updateCustomItemField({
											quantity: e.target.value,
										})
									}
								/>
							</div>
							<div className="flex gap-4 mt-2 flex-row">
								<button
									type="button"
									className="bg-text_orange text-white px-8 font-medium rounded-sm py-1 w-full"
									onClick={addCustomItem}>
									Save
								</button>
								<button
									type="button"
									className="bg-rose-500 text-white px-8 font-medium rounded-sm py-1 w-full"
									onClick={handleCloseCustomItemMenu}>
									Close
								</button>
							</div>
						</div>
					</form>
				</section>

				<div className="px-2 py-2 mt-4 mx-auto max-w-xl flex flex-row justify-between border-2 border-[#8A8A8A] rounded-sm">
					<input
						className="text-gray-500 w-full outline-none"
						type="text"
						placeholder="Search Products..."
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

				<section className="flex w-full justify-around items-center mt-4">
					<div className="flex flex-row gap-4 justify-center">
						<p
							onClick={() => updateCategoryFilter("")}
							className="border-2 rounded-lg max-w-fit px-4 py-1 border-[#2D2D2D] bg-background_orange cursor-pointer hover:scale-105 duration-300">
							All
						</p>
						<p
							onClick={() => updateCategoryFilter("FOOD")}
							className="border rounded-lg max-w-fit px-4 py-1 border-[#D6D6D6] bg-white cursor-pointer hover:scale-105 duration-300">
							Foods
						</p>
						<p
							onClick={() => updateCategoryFilter("DRINK")}
							className="border rounded-lg max-w-fit px-4 py-1 border-[#D6D6D6] bg-white cursor-pointer hover:scale-105 duration-300">
							Drinks
						</p>
						<p
							onClick={() => updateCategoryFilter("ROOMS")}
							className="border rounded-lg max-w-fit px-4 py-1 border-[#D6D6D6] bg-white cursor-pointer hover:scale-105 duration-300">
							Rooms
						</p>
						<p
							onClick={() => updateCategoryFilter("GAMES")}
							className="border rounded-lg max-w-fit px-4 py-1 border-[#D6D6D6] bg-white cursor-pointer hover:scale-105 duration-300">
							Games
						</p>
					</div>

					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8 hover:text-text_orange duration-300 cursor-pointer"
							onClick={() => setShowCustomItemMenu(() => true)}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
				</section>

				<section className="px-16 mt-8 flex flex-row flex-wrap gap-12 overflow-auto max-h-full justify-center">
					<ItemDisplay />
				</section>
			</div>
			{/* Left Sidebar */}
			<div
				id="Sidebar-2"
				className="w-1/3 bg-white border-l-2 border-light_gray">
				<Sidebar Cart={cart} setCart={setCart} />
			</div>
		</div>
	);
};

export default Home;
