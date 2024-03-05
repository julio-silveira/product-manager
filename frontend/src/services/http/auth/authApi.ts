import { LoginFormValues, LoginResult, RegisterFormValues } from ".";
import { api } from "../../api";

const COMMON_PATH = "/auth";

const login = async (body: LoginFormValues): Promise<LoginResult> => {
	const { data } = await api.post(`${COMMON_PATH}/login`, body);
	return data;
};

const register = async (body: RegisterFormValues): Promise<LoginResult> => {
	const { data } = await api.post(`${COMMON_PATH}/register`, body);
	return data;
};

const Api = {
	login,
	register,
};

export default Api;
