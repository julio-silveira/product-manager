import { Optional } from "sequelize";
import { Table, Model, Column } from "sequelize-typescript";
import db from "../db";

interface ProductAtributes {
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

	@Column
	price!: number;

	@Column
	color!: string;
}

db.addModels([Products]);

export default Products;
