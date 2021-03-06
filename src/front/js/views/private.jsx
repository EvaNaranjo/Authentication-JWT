import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const Private = () => {
	const [email, setEmail] = useState("");
	const [id, setId] = useState("");
	const history = useHistory();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token == null) {
			history.push("/user/login");
		} else {
			fetch(
				"https://3001-evanaranjo-authenticati-gp3t0smv8tg.ws-eu45.gitpod.io/api/user",
				{
					mode: "no-cors",
					method: "GET",
					headers: {
						Authorizaton: `Bearer ${token}`,
					},
				}
			)
				.then((res) => res.json())
				.then((user) => {
					setEmail(user["email"]);
					setId(user["id"]);
				}) //guardar datos en variable de estado o variable global
				.catch((err) => {
					console.log(err);
					history.push("/user/login");
				});
		}
	}, []);

	return (
		<div>
			<h1>Bienvenido {email}</h1>
		</div>
	);
};
