// import React from "react";
import Menu from "./Components/Menu.tsx";
import Home from "./Pages/Home.tsx";
import { Routes, Route, Outlet } from "react-router-dom";
import Inventory from "./Pages/Inventory.tsx";
import Reports from "./Pages/Reports.tsx";
import Settings from "./Pages/Settings.tsx";
import Orders from "./Pages/Orders.tsx";
import Login from "./Pages/Login.tsx";

const App = () => {
	return (
		<Routes>
			<Route element={<MenuElement />}>
				<Route path="/" element={<Home />} />
				<Route path="/inventory" element={<Inventory />} />
				<Route path="/orders" element={<Orders />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/reports" element={<Reports />} />
			</Route>
			<Route path="/login" element={<Login />} />
		</Routes>
	);
};

//* For pages like login where the menu is not needed.
const MenuElement = () => {
	return (
		<div className="flex h-screen text-black">
			<div className="w-28">
				<Menu />
			</div>
			<Outlet />
		</div>
	);
};

export default App;
