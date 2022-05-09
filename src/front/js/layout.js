import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop.jsx";

import { Signup } from "./views/signup.jsx";
import { Login } from "./views/login.jsx";
import { Private } from "./views/private.jsx";
import Navbar from "./component/navbar.jsx";

const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/">
							<Login />
						</Route>
						<Route exact path="/user/signup">
							<Signup />
						</Route>
						<Route exact path="/user/login">
							<Login />
						</Route>
						<Route exact path="/private">
							<Private />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default Layout;
