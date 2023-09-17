// import Icons from "../assets/index.tsx";
import { useEffect, useState } from "react";

import { Item } from "../Pages/Home";

type Props = {
	Cart: Item[];
	setCart: React.Dispatch<React.SetStateAction<Item[]>>;
};

enum paymentMethodList {
	CARD = "CARD",
	CASH = "CASH",
	TRANSFER = "TRANSFER",
}

const Sidebar = (props: Props) => {
	const { Cart, setCart } = props;
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [paymentMethod, setPaymentMethod] = useState<paymentMethodList>();

	const incrementAmount = (id: number) => {
		setCart((currItems: Item[]) => {
			const x = currItems.map((item: Item) => {
				if (item.id === id) {
					return { ...item, quantity: item.quantity + 1 };
				} else return item;
			});
			return x;
		});
	};

	const decrementAmount = (id: number) => {
		setCart((currItems: Item[]) => {
			const newItemList: Item[] = [];
			currItems.forEach((item: Item) => {
				if (item.id === id && item.quantity <= 1) {
					return;
				} else if (item.id === id) {
					newItemList.push({
						...item,
						quantity: item.quantity - 1,
					});
				} else {
					newItemList.push(item);
				}
			});
			return newItemList;
		});
	};

	const clearOrder = () => {
		setCart(() => []);
		setPaymentMethod(() => undefined);
	};

	const updatePaymentMethod = (method: paymentMethodList) => {
		setPaymentMethod(() => method);
	};

	const CartDisplay = () => {
		// console.log(Cart);
		return Cart.map((cartItem: Item) => {
			const { quantity, name, pricePerUnit, id } = cartItem;
			return (
				<div
					key={id}
					className="flex flex-row justify-between items-center px-4 py-1 h-24">
					<h6 className="font-bold text-lg text-center">{name}</h6>
					<div className="flex flex-row gap-2 items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8 cursor-pointer"
							onClick={() => incrementAmount(id)}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span className="font-bold">{quantity}</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8 cursor-pointer"
							onClick={() => decrementAmount(id)}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<span className="font-bold">&#8358; {pricePerUnit}</span>
				</div>
			);
		});
	};

	const SaveOrder = () => {
		if (!paymentMethod || Cart.length === 0) return;
		// TODO: Support for customers nume
		const data = {
			items: Cart,
			paymentMethod: paymentMethod,
			name: "Test",
		};
		console.log(data);
		fetch("http://localhost:3000/orders", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((responseData) => console.log(responseData));
		clearOrder();
	};

	//** Maps over all the items in the cart and adds up and returns the total price.
	useEffect(() => {
		setTotalPrice(() => {
			let initialValue: number = 0;
			Cart.forEach((item) => {
				initialValue += item.quantity * item.pricePerUnit;
			});
			return initialValue;
		});
	}, [Cart]);
	// const { jollof_icon } = Icons;

	return (
		<div className="flex flex-col justify-between h-screen py-6">
			<header className="flex w-full flex-row justify-between px-2">
				<section className="flex gap-2">
					<h3 className="font-bold">Order Number:</h3>
					<span className="text-text_orange font-medium">
						#300102LP
					</span>
				</section>
				<button
					className="text-[#FF3636] bg-[#FD4D4D61] px-4 py-1 rounded-lg text-sm font-semibold cursor-pointer hover:scale-105 duration-300 transition-all"
					onClick={clearOrder}>
					Clear Order
				</button>
			</header>

			<section className="px-4 flex flex-col gap-2 overflow-auto h-[100%] my-6">
				<CartDisplay />
			</section>

			<footer className="px-4 mt-4">
				<div className="flex flex-row justify-between mb-6">
					<h6 className="font-semibold">Total</h6>
					<span className="text-text_orange font-bold">
						&#8358;{totalPrice}
					</span>
				</div>

				<div>
					<h4 className="font-semibold text-lg">Payment Method</h4>
					<div className="flex flex-row gap-4 mt-6 justify-center">
						<div
							className={`bg-[#2D2D2D17] border border-[#D6D6D6] p-6 cursor-pointer flex flex-col items-center justify-center w-32 h-24 ${
								paymentMethod === undefined
									? "hover:bg-background_orange "
									: ""
							} transition-all duration-300 ${
								paymentMethod === "CASH"
									? "bg-background_orange"
									: ""
							}`}
							onClick={() =>
								updatePaymentMethod(paymentMethodList.CASH)
							}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-8 h-8">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
								/>
							</svg>

							<p className="text-sm">CASH</p>
						</div>

						<div
							className={`bg-[#2D2D2D17] border border-[#D6D6D6] p-6 cursor-pointer flex flex-col items-center justify-center w-32 h-24 ${
								paymentMethod === undefined
									? "hover:bg-background_orange "
									: ""
							} transition-all duration-300 ${
								paymentMethod === "CARD"
									? "bg-background_orange"
									: ""
							}`}
							onClick={() =>
								updatePaymentMethod(paymentMethodList.CARD)
							}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-8 h-8">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
								/>
							</svg>
							<div>CARD</div>
						</div>

						<div
							className={`bg-[#2D2D2D17] border border-[#D6D6D6] w-32 h-24 cursor-pointer flex flex-col items-center justify-center ${
								paymentMethod === undefined
									? "hover:bg-background_orange "
									: ""
							} transition-all duration-300 ${
								paymentMethod === "TRANSFER"
									? "bg-background_orange"
									: ""
							}`}
							onClick={() =>
								updatePaymentMethod(paymentMethodList.TRANSFER)
							}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-8 h-8">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
								/>
							</svg>

							<p>TRANSFER</p>
						</div>
					</div>
				</div>

				<div className="flex flex-row justify-center gap-6 mt-8">
					<button
						type="button"
						className="font-medium text-white bg-text_orange px-8 py-2 rounded-md hover:scale-105 transition-all duration-300">
						Hold Order
					</button>
					<button
						type="button"
						onClick={SaveOrder}
						className="font-semibold text-white bg-green-700 px-8 py-2 rounded-md hover:scale-105 transition-all duration-300">
						Print Bill
					</button>
				</div>
			</footer>
		</div>
	);
};

export default Sidebar;
