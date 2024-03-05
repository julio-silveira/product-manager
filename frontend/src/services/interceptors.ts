import useAuthStore from "@/stores/auth.store";
import { getToken } from "@/utils";
import Router from "next/router";

import {
	AxiosDefaults,
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";

type SetAuthorizationHeaderParams = {
	request: AxiosDefaults | AxiosRequestConfig;
	token: string;
};

export function setAuthorizationHeader(params: SetAuthorizationHeaderParams) {
	const { request, token } = params;
	(request.headers as Record<string, unknown>).Authorization =
		`Bearer ${token}`;
}

export function onRequest(config: AxiosRequestConfig) {
	const token = getToken();

	if (token) {
		setAuthorizationHeader({ request: config, token });
	}

	return config as InternalAxiosRequestConfig;
}

export function onRequestError(error: AxiosError): Promise<AxiosError> {
	return Promise.reject(error);
}

export function onResponse(response: AxiosResponse): AxiosResponse {
	return response;
}

type ErrorCode = {
	message: string;
	code: string;
};

export function onResponseError(
	error: AxiosError<ErrorCode>,
): Promise<AxiosError | AxiosResponse> {
	if (error.response?.status === 401) {
		console.error("Unauthorized request");
		useAuthStore.getState().logout();
		toast.info("Session expired, please login again", {
			toastId: "session-expired",
		});
		Router.push("/");
	}
	return Promise.reject(error);
}
