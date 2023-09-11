// import React from "react";
import Icons from "../assets/index.tsx";

const Menu = () => {
	const {
		Dollar_icon,
		Home_icon,
		Pie_icon,
		Pocket_icon,
		Settings_icon,
		profile_picture,
		Logout_icon,
	} = Icons;

	return (
		<div
			id="Sidebar"
			className="w-full h-full flex flex-col justify-between items-center py-8">
			<span
				className="text-text_orange cursor-pointer text-4xl"
				id="Logo">
				POS
			</span>

			<section className="font-[poppins] flex gap-4 flex-col items-center">
				<div className="flex flex-col items-center border rounded-md text-text_orange py-3 px-4 cursor-pointer bg-background_orange">
					<Home_icon />
					<h4 className="">Home</h4>
				</div>

				<div className="flex flex-col items-center cursor-pointer py-2 px-4 hover:text-text_orange transition-all duration-300">
					<Dollar_icon />
					<h4 className="">Reports</h4>
				</div>

				<div className="flex flex-col items-center cursor-pointer py-2 px-4 hover:text-text_orange transition-all duration-300">
					<Pie_icon />
					<h4 className="">Inventory</h4>
				</div>

				<div className="flex flex-col items-center cursor-pointer py-2 px-4 hover:text-text_orange transition-all duration-300">
					<Pocket_icon />
					<h4 className="">Bills</h4>
				</div>

				<div className="flex flex-col items-center cursor-pointer py-2 px-4 hover:text-text_orange transition-all duration-300">
					<Settings_icon />
					<h4 className="">Settings</h4>
				</div>
			</section>

			<section className="flex flex-col gap-2 items-center">
				<img
					className="w-16 aspect-auto cursor-pointer transition-all duration-300 hover:scale-105"
					src={profile_picture}
					alt="User's profile picture"
				/>

				<div className="flex flex-col items-center cursor-pointer hover:text-text_orange transition-all duration-300">
					<Logout_icon />
					<h5 className="text-sm">Logout</h5>
				</div>
			</section>
		</div>
	);
};

export default Menu;
