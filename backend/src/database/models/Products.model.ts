import { DECIMAL, Optional } from "sequelize";
import { Table, Model, Column } from "sequelize-typescript";

export interface ProductAtributes {
	id: number;
	name: string;
	brand: string;
	model: string;
	price: number;
	color: string;
}

interface ProductCreationAttributes extends Optional<ProductAtributes, "id"> {}

@Table
class Products extends Model<ProductAtributes, ProductCreationAttributes> {
	@Column
	name!: string;

	@Column
	brand!: string;

	@Column
	model!: string;

	@Column({
		type: DECIMAL(10, 2),
	})
	price!: number;

	@Column
	color!: string;
}

export default Products;
