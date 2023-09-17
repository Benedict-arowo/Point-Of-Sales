import { NavLink } from "react-router-dom";
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
			className="w-28 min-w-full h-full flex flex-col justify-between items-center py-8">
			<span
				className="text-text_orange cursor-pointer text-4xl"
				id="Logo">
				POS
			</span>

			<section className="font-[poppins] flex gap-2 flex-col items-center min-w-full">
				<NavLink
					to={"./"}
					className="flex flex-col items-center cursor-pointer justify-center hover:text-text_orange transition-all duration-300 w-[90px] h-[80px]">
					<Home_icon />
					<h4 className="">Home</h4>
				</NavLink>

				<NavLink
					to={"./Reports"}
					className="flex flex-col items-center cursor-pointer justify-center hover:text-text_orange transition-all duration-300 w-[90px] h-[80px]">
					<Dollar_icon />
					<h4 className="">Reports</h4>
				</NavLink>

				<NavLink
					to={"./Inventory"}
					className="flex flex-col items-center cursor-pointer justify-center hover:text-text_orange transition-all duration-300 w-[90px] h-[80px]">
					<Pie_icon />
					<h4 className="">Inventory</h4>
				</NavLink>

				<NavLink
					to={"./Orders"}
					className="flex flex-col items-center cursor-pointer justify-center hover:text-text_orange transition-all duration-300 w-[90px] h-[80px]">
					<Pocket_icon />
					<h4 className="">Orders</h4>
				</NavLink>

				<NavLink
					to={"./Settings"}
					className="flex flex-col items-center cursor-pointer justify-center hover:text-text_orange transition-all duration-300 w-[90px] h-[80px]">
					<Settings_icon />
					<h4 className="">Settings</h4>
				</NavLink>
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
