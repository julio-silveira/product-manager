import { getToken } from "@/utils";
import {
	AxiosDefaults,
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";

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
	return Promise.reject(error);
}
