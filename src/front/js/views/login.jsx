import React, { useEffect, useState } from "react";
import "../../styles/index.css";
import propTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const token =
	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0NTAzMDAyNywianRpIjoiOWEyNWEzNjEtNTcwOC00ZDdjLWJlZDUtZDAzN2M5NjIwYzBjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6OCwibmJmIjoxNjQ1MDMwMDI3LCJleHAiOjE2NDUwMzA5Mjd9.acEBRVknwW7c4729QjEYSsGGdWWWqYTQaxmaQkGTYMw";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [passw, setPassw] = useState("");
	const history = useHistory();

	function login() {
		fetch(			
			"https://3001-evanaranjo-authenticati-gp3t0smv8tg.ws-eu45.gitpod.io/api/user/login",

			{
				mode: "no-cors",
				method: "POST",
				body: JSON.stringify({
					email: email,
					password: passw,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((resp) => resp.json())
			.then((data) => {
				localStorage.setItem("token", JSON.stringify(data));
				console.log(JSON.parse(localStorage.getItem("token")));
				history.push("/private");
			})
			.catch((err) => console.log(err));
	}
	return (
		<div>
			<section
				className="vh-100 bg-image"
				style={{
					backgroundImage:
						"https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp",
				}}>
				<div className="mask d-flex align-items-center h-100 gradient-custom-3">
					<div className="container h-100">
						<div className="row d-flex justify-content-center align-items-center h-100">
							<div className="col-12 col-md-9 col-lg-7 col-xl-6">
								<div
									className="card"
									style={{ borderRadius: "15px" }}>
									<div className="card-body p-5">
										<h2 className="text-uppercase text-center mb-5">
											LOGIN
										</h2>

										<form>
											<div className="form-outline mb-4">
												<input
													type="email"
													id="form3Example3cg"
													className="form-control form-control-lg"
													onChange={(e) =>
														setEmail(e.target.value)
													}
												/>
												<label
													className="form-label"
													htmlFor="form3Example3cg">
													Your Email
												</label>
											</div>

											<div className="form-outline mb-4">
												<input
													type="password"
													id="form3Example4cg"
													className="form-control form-control-lg"
													onChange={(e) =>
														setPassw(e.target.value)
													}
												/>
												<label
													className="form-label"
													htmlFor="form3Example4cg">
													Password
												</label>
											</div>

											<div className="d-flex justify-content-center">
												<button
													onClick={login}
													type="button"
													className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
													Login
												</button>
											</div>

											<p className="text-center text-muted mt-5 mb-0">
												Dont have an account?{" "}
												<Link
													to="/user/signup"
													href="#!"
													className="fw-bold text-body">
													<u>Register here</u>
												</Link>
											</p>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};