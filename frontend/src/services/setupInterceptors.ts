import { AxiosInstance } from "axios";
import {
	onRequest,
	onRequestError,
	onResponse,
	onResponseError,
} from "./interceptors";

export function setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
	axiosInstance.interceptors.request.use(onRequest, onRequestError);
	axiosInstance.interceptors.response.use(onResponse, onResponseError);

	return axiosInstance;
}
