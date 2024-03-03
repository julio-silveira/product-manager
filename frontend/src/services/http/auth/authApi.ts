import { LoginFormValues, LoginResult } from ".";
import { api } from "../../api";

const COMMON_PATH = "/auth";

const login = async (body: LoginFormValues): Promise<LoginResult> => {
	const { data } = await api.post(`${COMMON_PATH}/login`, body);
	return data;
};

const Api = {
	login,
};

export default Api;
