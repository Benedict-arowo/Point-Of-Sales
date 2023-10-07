import React, { useState } from "react";

type UserCredentials = {
	username: string;
	password: string;
};

const Login = () => {
	const [userCredentials, setUserCredentials] = useState<UserCredentials>({
		username: "",
		password: "",
	});

	const signIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		console.log("Signing in...");
		console.log(userCredentials.username, userCredentials.password);
	};
	return (
		<div>
			<main className="grid place-content-center w-full h-screen">
				<form
					action=""
					method="post"
					className="p-4 bg-gray-200 flex flex-col gap-2 border border-blue-500">
					<h1 className="font-bold text-3xl my-2 text-text_orange mx-auto">
						Login
					</h1>
					<fieldset className="flex flex-col gap-2">
						<div className="flex flex-col gap-0">
							<label
								htmlFor="username"
								className="font-medium text-xl">
								Username
							</label>
							<input
								type="text"
								name="username"
								className="px-2 py-1 ml-2"
								value={userCredentials.username}
								onChange={(e) => {
									setUserCredentials(
										(prevUserCredentials) => {
											return {
												...prevUserCredentials,
												username: e.target.value,
											};
										}
									);
								}}
							/>
						</div>
						<div className="flex flex-col">
							<label
								htmlFor="password"
								className="font-medium text-xl ml-1 ">
								Password
							</label>
							<input
								type="password"
								name="password"
								className="px-2 py-1 ml-2"
								value={userCredentials.password}
								onChange={(e) => {
									setUserCredentials(
										(prevUserCredentials) => {
											return {
												...prevUserCredentials,
												password: e.target.value,
											};
										}
									);
								}}
							/>
						</div>
					</fieldset>
					<button
						type="submit"
						className="mt-2 bg-text_orange text-white hover:scale-105 mx-auto font-medium duration-300 w-fit py-1 px-6"
						onClick={signIn}>
						Submit
					</button>
				</form>
			</main>
		</div>
	);
};

export default Login;
