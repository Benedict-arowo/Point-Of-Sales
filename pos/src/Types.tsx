export type Order = {
	id: string;
	name: string;
	items: Items[];
	paymentMethod: string;
	total: number;
	createdDate: Date;
};

export type Items = {
	name: string;
	paymentMethod: string;
	id: string;
	item: {
		name: string;
		pricePerUnit: number;
	};
	quantity: number;
	total: number;
	createdDate: string;
};
