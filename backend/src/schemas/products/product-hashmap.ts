export interface ProductUniqueParams {
	brand: string;
	model: string;
	color: string;
}

export interface ProductHashMap {
	[key: string]: ProductUniqueParams;
}
