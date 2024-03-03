import { LoginFormValues, authApi } from "@/services/http";
import { createSessionCookies, getToken, removeSessionCookies } from "@/utils";
import { AxiosError } from "axios";
import { create } from "zustand";

type User = {
	token: string | null;
	isLoading: boolean;
	isAuthenticated: boolean;
};

type LoginResult = {
	message: string;
	success: boolean;
};

type AuthActions = {
	login: (params: LoginFormValues) => Promise<LoginResult>;
	logout: () => void;
	checkAuth: () => void;
};

const useAuthStore = create<User & AuthActions>((set, get) => ({
	token: null,
	isLoading: false,
	isAuthenticated: false,
	login: async (data) => {
		set({ isLoading: true });
		try {
			const result = await authApi.login(data);
			createSessionCookies({ token: result.token });
			const message = result.message || "Logged in successfully";

			const loginResult: LoginResult = {
				message,
				success: true,
			};
			set({ isLoading: false });
			return loginResult;
		} catch (error) {
			removeSessionCookies();
			const e = error as AxiosError<{ message: string }>;
			const result = {
				message: e.response?.data.message || "Failed to login",
				success: false,
			};
			set({ isLoading: false });
			return result;
		} finally {
			get().checkAuth();
		}
	},
	checkAuth: () => {
		const token = getToken();
		if (token) {
			set({ token, isAuthenticated: true });
		} else {
			set({ token: null, isAuthenticated: false });
		}
	},
	logout: () => {
		removeSessionCookies();
		set({ token: null, isAuthenticated: false });
	},
}));

export default useAuthStore;
