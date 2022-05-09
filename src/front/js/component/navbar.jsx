import React from "react";
import { useHistory } from "react-router-dom";

const Navbar = () => {
	const history = useHistory();

	function deleteToken() {
		localStorage.removeItem("token");
		history.push("/");
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<form className="container-fluid justify-content-center">
				<button
					className="btn btn-success me-2"
					type="button"
					onClick={deleteToken}>
					Logout
				</button>
			</form>
		</nav>
	);
};

export default Navbar;
