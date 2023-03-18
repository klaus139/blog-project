import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './login.css'
import "./login.module.css";
import { apiPost } from "../../utils/api/axios";
import { toast } from "react-toastify";

const Login = () => {
	const [formData, setFormData] = useState({});
	const navigate = useNavigate();

	const handleChange = (e) => {
		console.log("changing data");
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		console.log(formData);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// riderRegisterConfig(formData);

			await apiPost("auth/login", formData)
				.then((res) => {
					const signature = res.data.signature;
					const role = res.data.role;
					const userName = res.data.name;
					// const photo = res.data.image;

					if (signature !== null) {
						localStorage.setItem("signature", signature);
						localStorage.setItem("role", role);
						localStorage.setItem("userName", userName);
						// localStorage.setItem("photo", photo);
						toast.success(res.data.message);
						setTimeout(() => {
							if (res.data.role === "user") {
								navigate("/");
								// } else if (res.data.role === "admin") {
								// 	navigate("/admin-dashboard");
							} else if (res.data.role === "admin") {
								navigate("/admin-dashboard");
							}
							// navigate("/user-dashboard");
						}, 2000);
					}
				})
                
				.catch((err) => {
					console.log(err);
					toast.error(err.response.data.Error);
				});
		} catch (error) {
			console.log(error);
		}
	};

// 	return (
// 		<div className={loginFormStyle.login_f_section}>
// 			<div className={loginFormStyle.login_form_data_container}>
// 				<div className={loginFormStyle.login_form_image}>
// 					<h1 className={loginFormStyle.login_section_h1}>
// 						Login to your account
// 					</h1>
// 					{/* <img src={image} /> */}
// 				</div>
// 			</div>

// 			<div className={loginFormStyle.login_form_ctainer}>
// 				<div className={loginFormStyle.login_form_ctainer_innerDiv}>
// 					<div className={loginFormStyle.login_logo_div}>
// 						<Link to="/" style={{ textDecoration: "none" }}>
// 							<div className={loginFormStyle.login_form_logo}>
// 								{/* <img src={logodesign} alt="logo" /> */}
// 								<span>
// 									Olean
// 									<br />
// 									Project
// 								</span>
// 							</div>
// 						</Link>
// 					</div>
// 					<form className={loginFormStyle.login_form} onSubmit={handleSubmit}>
// 						<div className={loginFormStyle.login_form_data_content}>
// 							<h1 className={loginFormStyle.login_form_title}>Login</h1>

// 							<div className={loginFormStyle.login_form_label_ctn}>
// 								<div className={loginFormStyle.login_form_fieldctn}>
// 									<label className={loginFormStyle.login_form_label}>Email</label>
// 									<b className={`fa fa-envelope login_form_s_input`}><input
// 										placeholder="Enter your email"
// 										className={loginFormStyle.login_form_input}
// 										type="email"
// 										id="email"
// 										name="email"
// 										onChange={handleChange}
// 									/></b>
// 									<br />
// 									<label className={loginFormStyle.login_form_label}>Password</label>

// 									<b className="fa fa-lock" ><input
// 										placeholder="Enter your password"
// 										className={loginFormStyle.login_form_input}
// 										type="password"
// 										id="password"
// 										name="password"
// 										onChange={handleChange}
// 									/></b>
// 									<br />
// 									{/* <p className={loginFormStyle.login_form_a}>
// 										<Link
// 											to="/forgotpasswordd"
// 											className={loginFormStyle.login_form_a}
// 										>
// 											Forgot Password?
// 										</Link>
// 									</p> */}
// 									<input
// 										className={`${loginFormStyle.login_form_input} ${loginFormStyle.login_form_s_input}`}
// 										type="submit"
// 										value="Login"
// 									/>
// 									<div>
// 										<p className={loginFormStyle.login_form_p}>
// 											Don't have an account?{" "}
// 											<Link to="/register">
// 												Create account
// 											</Link>
// 										</p>
// 									</div>
// 								</div>
// 							</div>
// 						</div>

// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };


return (
    <div className='login-container'>
            <div className="login-intro">
                <p>Lets get started</p>
            </div>
            
            <div className='login-detail'>
        
           
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" placeholder="Enter your email" onChange={handleChange}/>
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password"  placeholder="Enter your password" onChange={handleChange}/>
                </div>
               

                <div>
                  <div></div>
                  <div className='login-container'>
                    <button type="submit">Login</button>
                  </div>
                </div>
                <p className='login-p'>Don't have an account? <button onClick={() => { window.location.href = '/'}}>Register</button></p>
                
              </form>
              </div>
 

           
        </div>
    
  )
}
export default Login;
