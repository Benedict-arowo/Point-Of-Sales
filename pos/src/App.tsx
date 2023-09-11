// import React from "react";
import Menu from "./Components/Menu.tsx";
import Home from "./Pages/Home.tsx";

const App = () => {
	return (
		<div className="flex h-screen text-black">
			<div className="w-28">
				<Menu />
			</div>
			{/* Routing here */}
			<Home />
		</div>
	);
};

export default App;
