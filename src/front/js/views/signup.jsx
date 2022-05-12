import React, { useEffect, useState } from "react";
import "../../styles/index.css";
import propTypes from "prop-types";
import { useParams } from "react-router-dom";

const token =
	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0NTAzMDAyNywianRpIjoiOWEyNWEzNjEtNTcwOC00ZDdjLWJlZDUtZDAzN2M5NjIwYzBjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6OCwibmJmIjoxNjQ1MDMwMDI3LCJleHAiOjE2NDUwMzA5Mjd9.acEBRVknwW7c4729QjEYSsGGdWWWqYTQaxmaQkGTYMw";

export const Signup = () => {
	const [email, setEmail] = useState("");
	const [passw, setPassw] = useState("");

	function register() {
		fetch(			
			"https://3001-evanaranjo-authenticati-sgjjm35qvda.ws-eu44.gitpod.io/api/user/signup",
			
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
			.then((resp) => {
				resp.json();
			})
			.then((data) => {
				console.log(data); //guardar datos en variable estado
			})
			.catch((err) => console.log(err));

		// this.props.history.push('/private')
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
											Create an account
										</h2>

										<form>
											<div className="form-outline mb-4">
												<input
													onChange={(e) => {
														setEmail(
															e.target.value
														);
													}}
													type="email"
													id="form3Example3cg"
													className="form-control form-control-lg"
												/>
												<label
													className="form-label"
													htmlFor="form3Example3cg">
													Your Email
												</label>
											</div>

											<div className="form-outline mb-4">
												<input
													onChange={(e) => {
														setPassw(
															e.target.value
														);
													}}
													type="password"
													id="form3Example4cg"
													className="form-control form-control-lg"
												/>
												<label
													className="form-label"
													htmlFor="form3Example4cg">
													Password
												</label>
											</div>

											<div className="d-flex justify-content-center">
												<button
													onClick={register}
													type="button"
													className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
													Register
												</button>
											</div>
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
