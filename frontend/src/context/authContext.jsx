import React,{ createContext } from 'react';
import { toast } from "react-toastify";
import { apiPost } from '../utils/api/axios';


export const dataContext = createContext();

const DataProvider = ({ children }) => {
	/* ========= Register =========== */
	const registerConfig = async (FormData) => {
		try {
			const registerData = {
				name: FormData.firstName,
				email: FormData.email,
				password: FormData.password,
				confirm_password: FormData.confirm_password,
				phone: FormData.phone,
				
			};
			await apiPost("/auth/signup", registerData)
				.then((res) => {
					toast.success(res.data.message);
					localStorage.setItem("signature", res.data.signature);
					setTimeout(() => {
						window.localStorage.href = "/login";
					}, 2000);
				})
				.catch((err) => {
					toast.error(err.response.data.Error);
				});
		} catch (err) {
			console.log(err);
		}
	};

	return { registerConfig };
};

export const useAuth = () => {
	const context = React.useContext(dataContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within the auth provider");
	}
	return context;
};
export default DataProvider;
